"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCompass } from "react-icons/fi";

const HeroSection = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [welcomeMessage, setWelcomeMessage] = useState(false);

    useEffect(() => {
        const welcome = searchParams.get("welcome");
        if (welcome === "true") {
            setWelcomeMessage(true);
            const timer = setTimeout(() => {
                setWelcomeMessage(false);
                router.replace("/", { scroll: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [searchParams, router]);

    return (
        <section className="relative overflow-hidden py-20 md:py-32">
            {welcomeMessage && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-2xl shadow-indigo-500/30 z-50 animate-fade-out text-sm font-medium">
                    Welcome to DietPilot AI!
                </div>
            )}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/[0.07] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="text-center md:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-2 mb-8">
                            <FiCompass size={14} className="text-indigo-400" />
                            <span className="text-xs font-medium text-[#8888a8]">AI-Powered Nutrition Platform</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                            Cook <span className="glow-text">Smart</span>.
                            <br />
                            Cook <span className="glow-text">Fast</span>.
                            <br />
                            <span className="text-[#8888a8]">Discover recipes with what you have.</span>
                        </h1>
                        <p className="mt-6 text-lg text-[#8888a8] leading-relaxed max-w-lg">
                            DietPilot AI is your intelligent nutrition assistant that finds delicious recipes based on the ingredients you already have. Save time, reduce waste, and achieve your health goals.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link
                                href={session ? "/dashboard" : "/signup"}
                                className="gradient-btn px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 group"
                            >
                                {session ? "Go to Dashboard" : "Get Started Free"}
                                <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/recipes"
                                className="ghost-btn px-8 py-4 text-sm inline-flex items-center justify-center"
                            >
                                Browse Recipes
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
                        <img
                            src="./HeroImage.png"
                            alt="Healthy food bowl"
                            className="relative w-full max-h-[500px] object-contain animate-float"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
