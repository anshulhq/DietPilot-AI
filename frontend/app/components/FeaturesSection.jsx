import { GiBrain, GiChart, GiNotebook } from 'react-icons/gi';
import FeatureCard from './FeatureCard';

const features = [
    {
        icon: <GiBrain size={24} className="text-indigo-400" />,
        title: "AI-Powered Recipes",
        description: "Get intelligent recipe suggestions based on natural language. Our RAG-powered assistant understands what you're looking for."
    },
    {
        icon: <GiNotebook size={24} className="text-emerald-400" />,
        title: "Personalized Meal Plans",
        description: "Your profile and health goals drive personalized suggestions that help you achieve your targets — weight loss, muscle gain, or maintenance."
    },
    {
        icon: <GiChart size={24} className="text-amber-400" />,
        title: "Track Your Progress",
        description: "Log meals and visually track your daily calorie and macro intake against your personalized goals on an interactive dashboard."
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/[0.02] to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Features</span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Everything You Need for a <span className="glow-text">Healthier</span> Diet
                    </h2>
                    <p className="mt-4 text-[#8888a8] max-w-2xl mx-auto">
                        Powered by AI to make nutrition tracking effortless and personalized
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
