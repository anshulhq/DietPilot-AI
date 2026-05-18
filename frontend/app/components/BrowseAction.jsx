import Link from 'next/link';
import { FiGrid } from 'react-icons/fi';

const BrowseAction = () => {
    return (
        <Link href="/recipes" className="glass-card glow-border p-6 group block">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <FiGrid size={22} className="text-emerald-400" />
            </div>
            <h2 className="text-white font-semibold mb-1.5">Browse All Recipes</h2>
            <p className="text-[#8888a8] text-sm">Explore our full recipe library</p>
        </Link>
    );
};

export default BrowseAction;
