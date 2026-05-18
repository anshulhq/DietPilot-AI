import Link from 'next/link';
import { FiArrowRight, FiCompass } from 'react-icons/fi';

const stats = [
    { value: '10K+', label: 'Recipes' },
    { value: 'AI', label: 'Powered' },
    { value: '100%', label: 'Free' },
];

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/[0.06] rounded-full blur-[150px]" />
                <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/[0.04] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="glass-card p-12 sm:p-16 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 mx-auto mb-8">
                        <FiCompass size={28} className="text-white" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        Ready to Take Control of Your <span className="glow-text">Nutrition</span>?
                    </h2>
                    <p className="text-[#8888a8] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Join thousands who are already eating smarter with DietPilot AI. It takes less than a minute to get started.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link
                            href="/signup"
                            className="gradient-btn px-8 py-4 text-sm font-semibold inline-flex items-center gap-2 group"
                        >
                            Get Started Free
                            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/recipes"
                            className="ghost-btn px-8 py-4 text-sm inline-flex items-center gap-2"
                        >
                            Browse Recipes
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-white/[0.06]">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-bold glow-text">{stat.value}</div>
                                <div className="text-xs text-[#555570] mt-1 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
