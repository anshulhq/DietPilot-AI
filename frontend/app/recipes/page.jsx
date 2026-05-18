"use client";

import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";
import { FiSearch, FiClock, FiZap } from "react-icons/fi";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [maxMinutes, setMaxMinutes] = useState("");
    const [maxCalories, setMaxCalories] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const body = {
                    query: searchTerm || "",
                    max_minutes: maxMinutes ? parseInt(maxMinutes) : null,
                    max_calories: maxCalories ? parseFloat(maxCalories) : null,
                };

                const res = await fetch("http://localhost:8000/recipes/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                if (!res.ok) throw new Error("Failed to fetch recipes");
                const data = await res.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchRecipes();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, maxMinutes, maxCalories]);

    return (
        <Layout>
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Explore <span className="glow-text">Recipes</span>
                        </h1>
                        <p className="text-[#8888a8] mt-1.5 text-sm">Discover meals that match your goals</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <aside className="lg:col-span-1">
                            <div className="glass-card p-5 sticky top-24 space-y-5">
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>

                                <div>
                                    <label className="block text-xs font-medium text-[#8888a8] mb-2">Search</label>
                                    <div className="relative">
                                        <FiSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555570]" />
                                        <input
                                            type="text"
                                            placeholder="e.g., Chicken Soup"
                                            className="input-dark w-full pl-10 pr-4 py-2.5 text-sm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-[#8888a8] mb-2 flex items-center gap-1.5">
                                        <FiClock size={12} /> Max Time (min)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 30"
                                        className="input-dark w-full px-4 py-2.5 text-sm"
                                        value={maxMinutes}
                                        onChange={(e) => setMaxMinutes(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-[#8888a8] mb-2 flex items-center gap-1.5">
                                        <FiZap size={12} /> Max Calories
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 500"
                                        className="input-dark w-full px-4 py-2.5 text-sm"
                                        value={maxCalories}
                                        onChange={(e) => setMaxCalories(e.target.value)}
                                    />
                                </div>
                            </div>
                        </aside>

                        <main className="lg:col-span-3">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                                </div>
                            ) : recipes.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {recipes.map((recipe) => (
                                        <RecipeCard key={recipe.id} recipe={recipe} />
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card p-12 text-center">
                                    <p className="text-[#8888a8]">No recipes found matching your filters.</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecipesPage;
