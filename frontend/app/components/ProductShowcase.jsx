import { FiMessageCircle, FiBarChart2, FiCompass } from 'react-icons/fi';

const showcases = [
    {
        title: "AI-Powered Conversations",
        subtitle: "Chat naturally, eat smarter",
        description: "Our RAG-powered assistant understands context, dietary preferences, and your health goals. Ask anything — from quick dinner ideas to detailed meal prep plans.",
        image: "/ai_chat.png",
        icon: FiMessageCircle,
        color: 'indigo',
        gradient: 'from-indigo-500/20 to-purple-500/20',
        accent: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
    },
    {
        title: "Real-Time Progress Tracking",
        subtitle: "Your goals, visualized",
        description: "Monitor calories, protein, carbs, and fats with an intuitive dashboard that updates in real time. See exactly how each meal contributes to your daily targets.",
        image: "/dashboard.png",
        icon: FiBarChart2,
        color: 'emerald',
        gradient: 'from-emerald-500/20 to-cyan-500/20',
        accent: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
    },
    {
        title: "Discover Endless Recipes",
        subtitle: "Curated for your goals",
        description: "Browse a vast library of recipes filtered by calories, cooking time, and nutritional content. Every recipe is calibrated to fit seamlessly into your meal plan.",
        image: "/explore_recipe.png",
        icon: FiCompass,
        color: 'amber',
        gradient: 'from-amber-500/20 to-orange-500/20',
        accent: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
    },
];

const ProductShowcase = () => {
    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/[0.02] to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Product</span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Built for <span className="glow-text">Results</span>
                    </h2>
                    <p className="mt-4 text-[#8888a8] max-w-2xl mx-auto text-lg">
                        Every feature is designed to make nutrition tracking feel effortless
                    </p>
                </div>

                <div className="space-y-32">
                    {showcases.map((item, index) => {
                        const Icon = item.icon;
                        const isReversed = index % 2 !== 0;
                        return (
                            <div key={item.title} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                                <div className="w-full lg:w-1/2">
                                    <div className="relative">
                                        <div className={`absolute -inset-4 bg-gradient-to-br ${item.gradient} rounded-3xl blur-3xl opacity-30`} />
                                        <div className="relative glass-card overflow-hidden rounded-2xl border border-white/[0.06]">
                                            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.03] to-transparent" />
                                            <div className="flex items-center gap-1.5 px-4 pt-3 pb-1">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                            </div>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={`w-full lg:w-1/2 ${isReversed ? 'lg:text-right' : ''}`}>
                                    <div className={`inline-flex items-center gap-2 ${item.bg} ${item.border} border rounded-full px-3.5 py-1.5 mb-5`}>
                                        <Icon size={14} className={item.accent} />
                                        <span className={`text-xs font-medium ${item.accent}`}>{item.subtitle}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#8888a8] text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
