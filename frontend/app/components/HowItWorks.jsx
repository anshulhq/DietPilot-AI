import { FiUserPlus, FiClipboard, FiZap } from 'react-icons/fi';

const steps = [
    {
        step: '01',
        icon: FiUserPlus,
        title: 'Create Your Profile',
        description: 'Tell us your goals, dietary preferences, and activity level. Our AI calibrates a personalized nutrition plan in seconds.',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        line: 'from-indigo-500/40',
    },
    {
        step: '02',
        icon: FiClipboard,
        title: 'Log & Discover Meals',
        description: 'Browse thousands of recipes or chat with our AI assistant to find meals that perfectly match your macros and taste.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        line: 'from-emerald-500/40',
    },
    {
        step: '03',
        icon: FiZap,
        title: 'Track & Achieve',
        description: 'Watch your daily progress in real-time. Hit your protein goals, stay within calorie limits, and build lasting healthy habits.',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        line: 'from-amber-500/40',
    },
];

const HowItWorks = () => {
    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/[0.02] to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">How It Works</span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Three Steps to a <span className="glow-text">Healthier</span> You
                    </h2>
                    <p className="mt-4 text-[#8888a8] max-w-xl mx-auto">
                        Getting started takes less than two minutes
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/20 via-emerald-500/20 to-amber-500/20 hidden lg:block" />

                    <div className="space-y-12 lg:space-y-0">
                        {steps.map((item, index) => {
                            const Icon = item.icon;
                            const isEven = index % 2 === 0;
                            return (
                                <div key={item.step} className="relative lg:grid lg:grid-cols-2 lg:gap-12 lg:py-8">
                                    <div className={`flex items-center gap-6 ${isEven ? 'lg:justify-end lg:text-right' : 'lg:order-2 lg:justify-start'}`}>
                                        <div className={`${item.bg} ${item.border} border w-16 h-16 rounded-2xl flex items-center justify-center shrink-0`}>
                                            <Icon size={24} className={item.color} />
                                        </div>
                                        <div>
                                            <span className={`text-xs font-bold ${item.color} uppercase tracking-widest`}>Step {item.step}</span>
                                            <h3 className="text-xl font-bold text-white mt-1 tracking-tight">{item.title}</h3>
                                            <p className="text-[#8888a8] text-sm leading-relaxed mt-2 max-w-sm">{item.description}</p>
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.line} shadow-lg`}>
                                        </div>
                                    </div>

                                    <div className={isEven ? 'lg:order-2' : ''} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
