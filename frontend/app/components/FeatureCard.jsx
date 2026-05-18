const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="glass-card glow-border p-7 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-indigo-500/20 transition-colors">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                {title}
            </h3>
            <p className="text-[#8888a8] text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
