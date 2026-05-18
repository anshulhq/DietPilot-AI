import pandas as pd
import ast
from sentence_transformers import SentenceTransformer
from sqlalchemy.orm import Session
from tqdm import tqdm
import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

load_dotenv()

from app.db.session import SessionLocal
from app.db.models import Recipe

DATA_FILE_PATH = "recipes.csv"
MODEL_NAME = 'all-MiniLM-L6-v2'
PINECONE_INDEX_NAME = "dietpilot"
MAX_RECIPES = 10000
EMBED_BATCH_SIZE = 256
UPSERT_BATCH_SIZE = 500

print("Loading embedding model...")
model = SentenceTransformer(MODEL_NAME)

print("Initializing Pinecone client...")
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

existing_indexes = [idx['name'] for idx in pc.list_indexes()]
if PINECONE_INDEX_NAME in existing_indexes:
    print(f"Deleting existing Pinecone index: {PINECONE_INDEX_NAME}...")
    pc.delete_index(PINECONE_INDEX_NAME)

print(f"Creating Pinecone index: {PINECONE_INDEX_NAME}...")
pc.create_index(
    name=PINECONE_INDEX_NAME,
    dimension=384,
    metric='cosine',
    spec=ServerlessSpec(cloud='aws', region='us-east-1')
)

index = pc.Index(PINECONE_INDEX_NAME)
print("Pinecone initialized.")

print(f"Loading data from {DATA_FILE_PATH}...")
df = pd.read_csv(DATA_FILE_PATH)

columns_to_keep = [
    'id', 'name', 'minutes', 'tags', 'n_steps', 'n_ingredients',
    'description', 'ingredients', 'nutrition', 'steps'
]
df = df[columns_to_keep]
df = df.dropna(subset=['name', 'ingredients', 'steps'])
df = df.head(MAX_RECIPES)
print(f"Using {len(df)} recipes (sampled).")

def parse_nutrition(nutrition_str):
    try:
        values = ast.literal_eval(nutrition_str)
        while len(values) < 7:
            values.append(None)
        return pd.Series(values[:7], index=['calories', 'total_fat_pdv', 'sugar_pdv', 'sodium_pdv', 'protein_pdv', 'saturated_fat_pdv', 'carbohydrates_pdv'])
    except (ValueError, SyntaxError):
        return pd.Series([None]*7, index=['calories', 'total_fat_pdv', 'sugar_pdv', 'sodium_pdv', 'protein_pdv', 'saturated_fat_pdv', 'carbohydrates_pdv'])

nutrition_df = df['nutrition'].apply(parse_nutrition)
df = pd.concat([df.drop('nutrition', axis=1), nutrition_df], axis=1)

def clean_tags(tags_str):
    try:
        return tags_str.replace("[", "").replace("]", "").replace("'", "").replace("-", " ").replace(", ", " ")
    except AttributeError:
        return ""

df['embedding_text'] = df['name'].fillna('').astype(str) + '. Tags: ' + \
                       df['tags'].apply(clean_tags).fillna('') + '. Description: ' + \
                       df['description'].fillna('').astype(str) + '. Ingredients: ' + \
                       df['ingredients'].str.replace(r'[\[\]\']', '', regex=True).fillna('')
print("Data loaded and preprocessed.")

print("Populating SQLite database (bulk insert)...")
db: Session = SessionLocal()
db.query(Recipe).delete()
db.commit()
batch = []
for _, row in tqdm(df.iterrows(), total=df.shape[0], desc="SQLite"):
    recipe = Recipe(
        id=row['id'],
        name=row['name'],
        minutes=row['minutes'],
        tags=row['tags'],
        n_steps=row['n_steps'],
        n_ingredients=row['n_ingredients'],
        ingredients=row['ingredients'],
        description=row['description'],
        steps=row['steps'],
        calories=row['calories'],
        total_fat_pdv=row['total_fat_pdv'],
        sugar_pdv=row['sugar_pdv'],
        sodium_pdv=row['sodium_pdv'],
        protein_pdv=row['protein_pdv'],
        saturated_fat_pdv=row['saturated_fat_pdv'],
        carbohydrates_pdv=row['carbohydrates_pdv']
    )
    batch.append(recipe)
    if len(batch) >= 1000:
        db.add_all(batch)
        db.commit()
        batch = []

if batch:
    db.add_all(batch)
    db.commit()
db.close()
print("SQLite populated successfully.")

print("Generating embeddings and uploading to Pinecone...")
all_texts = df['embedding_text'].tolist()
all_ids = df['id'].astype(str).tolist()

all_embeddings = model.encode(all_texts, batch_size=EMBED_BATCH_SIZE, show_progress_bar=True, normalize_embeddings=True)

vectors = []
for i in range(len(all_ids)):
    vectors.append({
        'id': all_ids[i],
        'values': all_embeddings[i].tolist(),
    })

for i in tqdm(range(0, len(vectors), UPSERT_BATCH_SIZE), desc="Upserting to Pinecone"):
    index.upsert(vectors=vectors[i:i + UPSERT_BATCH_SIZE])

print("Pinecone populated successfully.")
print(f"\n--- Data migration complete! {len(df)} recipes loaded. ---")
