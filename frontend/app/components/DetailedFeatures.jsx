"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const features = [
    {
        title: "Conversational Recipe Assistant",
        description:
            "Just ask! Our AI assistant understands natural language to find the perfect recipes based on your goals and chat history.",
        image: "/sliding_img1.png",
    },
    {
        title: "Interactive Progress Dashboard",
        description:
            "Stay motivated by visually tracking your daily calories, protein, carbs, and fats against your personalized targets.",
        image: "/sliding_img2.png",
    },
    {
        title: "Goal-Oriented Planning",
        description:
            "Whether your goal is weight loss or muscle gain, every suggestion is tailored to help you succeed.",
        image: "/sliding_img3.png",
    },
];

const SlidingFeatures = () => {
    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">How It Works</span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Features You'll <span className="glow-text">Love</span>
                    </h2>
                    <p className="mt-4 text-[#8888a8] max-w-2xl mx-auto">
                        A smarter, more personal way to manage your nutrition
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="w-full"
                >
                    {features.map((feature, index) => (
                        <SwiperSlide key={index}>
                            <div className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative bg-white/[0.02] p-8 lg:p-12 flex items-center justify-center min-h-[280px]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.03] to-purple-600/[0.03]" />
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="relative object-contain max-h-[240px] w-full rounded-lg"
                                    />
                                </div>
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold text-white tracking-tight mb-4">
                                        {feature.title}
                                    </h2>
                                    <p className="text-[#8888a8] leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SlidingFeatures;
