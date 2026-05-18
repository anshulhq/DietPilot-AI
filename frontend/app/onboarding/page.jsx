"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiTarget, FiArrowRight, FiCompass } from "react-icons/fi";

const OnboardingPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        goal: "maintenance",
        height_cm: "",
        weight_kg: "",
        age: "",
        gender: "male",
        activity_level: "sedentary",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!session?.user?.id) {
            setError("Could not get user ID. Please try logging in again.");
            setIsLoading(false);
            return;
        }
        const userId = session.user.id;

        if (!formData.height_cm || !formData.weight_kg || !formData.age) {
            setError("Please fill out your height, weight, and age.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:8000/users/${userId}/onboard`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    height_cm: parseFloat(formData.height_cm),
                    weight_kg: parseFloat(formData.weight_kg),
                    age: parseInt(formData.age),
                }),
            });

            if (res.ok) {
                router.replace("/dashboard?welcome=true");
            } else {
                const data = await res.json();
                if (res.status === 422 && data.detail && Array.isArray(data.detail) && data.detail.length > 0) {
                    const firstError = data.detail[0];
                    const fieldName = Array.isArray(firstError.loc) && firstError.loc.length > 1 ? firstError.loc[1] : 'field';
                    const errorMsg = firstError.msg || 'Invalid input';
                    setError(`Validation Error: ${errorMsg} (Field: ${fieldName})`);
                } else if (data.detail && typeof data.detail === 'string') {
                    setError(data.detail);
                } else {
                    setError("Onboarding failed. Please try again.");
                }
            }
        } catch (err) {
            setError("Could not connect to the server. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative z-10">
                <div className="hidden lg:flex flex-col justify-center items-center p-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5" />
                    <div className="relative z-10 max-w-md text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 mx-auto mb-8">
                            <FiTarget size={28} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                            Just a few more <span className="glow-text">details</span>...
                        </h1>
                        <p className="text-[#8888a8] text-lg leading-relaxed">
                            Your answers help us create a personalized nutrition plan tailored to your unique goals.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center p-6">
                    <div className="w-full max-w-lg">
                        <div className="lg:hidden text-center mb-8">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <FiCompass size={18} className="text-indigo-400" />
                                <span className="font-bold text-white">DietPilot AI</span>
                            </div>
                        </div>

                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold text-white text-center mb-2 tracking-tight">
                                Create Your Profile
                            </h2>
                            <p className="text-[#8888a8] text-sm text-center mb-6">Step 2 of 2</p>

                            <div className="flex items-center gap-2 mb-8">
                                <div className="flex-1 h-1 rounded-full bg-indigo-500" />
                                <div className="flex-1 h-1 rounded-full bg-indigo-500" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-[#8888a8] mb-2">Your Goal</label>
                                        <select name="goal" value={formData.goal} onChange={handleChange} className="input-dark w-full px-4 py-3 text-sm">
                                            <option value="maintenance">Maintenance</option>
                                            <option value="weight_loss">Weight Loss</option>
                                            <option value="muscle_gain">Muscle Gain</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-[#8888a8] mb-2">Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} className="input-dark w-full px-4 py-3 text-sm">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-[#8888a8] mb-2">Height (cm)</label>
                                        <input
                                            required min="1" type="number" name="height_cm"
                                            value={formData.height_cm} onChange={handleChange}
                                            placeholder="e.g., 175"
                                            className="input-dark w-full px-4 py-3 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-[#8888a8] mb-2">Weight (kg)</label>
                                        <input
                                            required min="1" type="number" name="weight_kg"
                                            value={formData.weight_kg} onChange={handleChange}
                                            placeholder="e.g., 70"
                                            className="input-dark w-full px-4 py-3 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-[#8888a8] mb-2">Age</label>
                                        <input
                                            required min="1" type="number" name="age"
                                            value={formData.age} onChange={handleChange}
                                            placeholder="e.g., 25"
                                            className="input-dark w-full px-4 py-3 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-[#8888a8] mb-2">Activity Level</label>
                                        <select name="activity_level" value={formData.activity_level} onChange={handleChange} className="input-dark w-full px-4 py-3 text-sm">
                                            <option value="sedentary">Sedentary</option>
                                            <option value="light">Light (1-3 days/week)</option>
                                            <option value="moderate">Moderate (3-5 days/week)</option>
                                            <option value="active">Active (6-7 days/week)</option>
                                            <option value="very_active">Very Active (daily)</option>
                                        </select>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs px-4 py-3 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="gradient-btn w-full py-3.5 text-sm flex items-center justify-center gap-2 group mt-2"
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    ) : (
                                        <>
                                            Save & Go to Dashboard
                                            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
