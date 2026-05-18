"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Layout from "../../components/Layout";
import LogMealButton from "../../components/LogMealButton";
import { FiClock, FiHeart, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const RecipeDetailPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(`http://127.0.0.1:8000/recipes/${id}`);
                    if (!res.ok) throw new Error("Recipe not found");
                    const data = await res.json();
                    setRecipe(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchRecipe();
        }
    }, [id]);

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                </div>
            </Layout>
        );
    }

    if (!recipe) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto py-10 px-4">
                    <div className="glass-card p-8 text-center border-red-500/20">
                        <p className="text-red-300">Recipe not found.</p>
                    </div>
                </div>
            </Layout>
        );
    }

    const parseList = (str) => {
        try {
            return str.replace(/[\[\]']/g, "").split(", ");
        } catch {
            return [];
        }
    };

    const ingredients = parseList(recipe.ingredients);
    const steps = parseList(recipe.steps);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Link href="/recipes" className="inline-flex items-center gap-2 text-sm text-[#8888a8] hover:text-white transition-colors mb-6">
                    <FiArrowLeft size={14} />
                    Back to Recipes
                </Link>

                <div className="glass-card p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">{recipe.name}</h1>
                            <div className="flex items-center gap-4 text-sm text-[#8888a8]">
                                <span className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded-lg">
                                    <FiClock size={14} className="text-indigo-400" />
                                    {recipe.minutes} min
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded-lg">
                                    <FiHeart size={14} className="text-rose-400" />
                                    {Math.round(recipe.calories)} kcal
                                </span>
                            </div>
                        </div>
                        <LogMealButton recipeId={recipe.id} />
                    </div>

                    {recipe.description && (
                        <p className="text-[#8888a8] mb-8 leading-relaxed border-l-2 border-indigo-500/30 pl-4">{recipe.description}</p>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 rounded-full bg-indigo-500" />
                                Ingredients
                            </h3>
                            <ul className="space-y-2">
                                {ingredients.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-[#c0c0d8] text-sm py-1.5 px-3 rounded-lg bg-white/[0.02]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 rounded-full bg-purple-500" />
                                Steps
                            </h3>
                            <ol className="space-y-3">
                                {steps.map((step, index) => (
                                    <li key={index} className="flex gap-3 text-sm">
                                        <span className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span className="text-[#c0c0d8] leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecipeDetailPage;
