"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiCheckCircle, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const LogMealButton = ({ recipeId }) => {
    const { data: session } = useSession();
    const [status, setStatus] = useState('idle');
    const router = useRouter();

    const handleLogMeal = async () => {
        if (!session?.user?.id || !recipeId) return;

        setStatus('loading');
        try {
            const res = await fetch(`http://127.0.0.1:8000/dashboard/log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipe_id: recipeId,
                    user_id: session.user.id,
                }),
            });

            if (!res.ok) throw new Error('Failed to log meal');

            setStatus('success');
            router.replace('/dashboard');

        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    if (status === 'success') {
        return (
            <button className="gradient-btn px-6 py-3 text-sm flex items-center gap-2 opacity-80" disabled>
                <FiCheckCircle size={16} />
                Logged!
            </button>
        );
    }

    if (status === 'loading') {
        return (
            <button className="gradient-btn px-6 py-3 text-sm flex items-center gap-2" disabled>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Logging...
            </button>
        );
    }

    return (
        <button className="gradient-btn px-6 py-3 text-sm flex items-center gap-2 group" onClick={handleLogMeal}>
            <FiPlus size={16} className="group-hover:rotate-90 transition-transform" />
            Log this Meal
        </button>
    );
};

export default LogMealButton;
