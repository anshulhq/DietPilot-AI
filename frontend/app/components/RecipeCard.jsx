import Link from 'next/link';
import { FiClock, FiHeart, FiArrowRight } from 'react-icons/fi';

const RecipeCard = ({ recipe }) => {
    return (
        <Link href={`/recipes/${recipe.id}`} className="glass-card glow-border p-5 group block">
            <div className="flex items-start justify-between mb-4">
                <h2 className="text-white font-semibold text-base leading-tight line-clamp-2 flex-1 pr-2 group-hover:text-indigo-300 transition-colors">
                    {recipe.name}
                </h2>
                <FiArrowRight size={14} className="text-[#555570] group-hover:text-indigo-400 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
            </div>
            <div className="flex items-center gap-4 text-xs text-[#8888a8]">
                <span className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1.5 rounded-lg">
                    <FiClock size={12} className="text-indigo-400" />
                    {recipe.minutes} min
                </span>
                <span className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1.5 rounded-lg">
                    <FiHeart size={12} className="text-rose-400" />
                    {Math.round(recipe.calories)} kcal
                </span>
            </div>
        </Link>
    );
};

export default RecipeCard;
