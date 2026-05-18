"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiZap, FiTarget, FiTrendingUp, FiDroplet } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatCard = ({ title, consumed, target, unit, icon: Icon, color, gradient }) => {
    const percentage = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
    return (
        <div className="glass-card glow-border p-5 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] rounded-full blur-2xl" style={{ background: gradient }} />
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                    <Icon size={20} style={{ color }} />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${color}10`, color }}>
                    {Math.round(percentage)}%
                </span>
            </div>
            <p className="text-sm font-medium text-[#8888a8] mb-1">{title}</p>
            <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-2xl font-bold text-white tracking-tight">{Math.round(consumed)}</span>
                <span className="text-sm text-[#555570]">/ {target}</span>
                <span className="text-xs text-[#555570] ml-1">{unit}</span>
            </div>
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${percentage}%`, background: gradient }} />
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { data: session } = useSession();
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (session?.user?.id) {
            const fetchSummary = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(`http://127.0.0.1:8000/dashboard/summary/${session.user.id}`);
                    if (!res.ok) {
                        const errorData = await res.json();
                        throw new Error(errorData.detail || 'Failed to fetch summary');
                    }
                    const data = await res.json();
                    setSummary(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSummary();
        }
    }, [session]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-[#6366f1]/30 border-t-[#6366f1] animate-spin" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card p-6 border-red-500/20">
                <p className="text-red-400 text-sm">Error: {error}</p>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                    <FiTarget size={28} className="text-indigo-400" />
                </div>
                <p className="text-[#8888a8]">No summary data available. Start by logging a meal!</p>
            </div>
        );
    }

    const stats = [
        { title: 'Calories', consumed: summary.consumed_calories, target: summary.target_calories, unit: 'kcal', icon: FiZap, color: '#6366f1', gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)' },
        { title: 'Protein', consumed: summary.consumed_protein, target: summary.target_protein, unit: 'grams', icon: FiTrendingUp, color: '#34d399', gradient: 'linear-gradient(90deg, #34d399, #22d3ee)' },
        { title: 'Carbohydrates', consumed: summary.consumed_carbs, target: summary.target_carbs, unit: 'grams', icon: FiTarget, color: '#fbbf24', gradient: 'linear-gradient(90deg, #fbbf24, #f59e0b)' },
        { title: 'Fats', consumed: summary.consumed_fats, target: summary.target_fats, unit: 'grams', icon: FiDroplet, color: '#f43f5e', gradient: 'linear-gradient(90deg, #f43f5e, #ec4899)' },
    ];

    const chartData = {
        labels: ['Calories', 'Protein', 'Carbs', 'Fats'],
        datasets: [
            {
                label: 'Target',
                data: [summary.target_calories, summary.target_protein, summary.target_carbs, summary.target_fats],
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderColor: 'rgba(99, 102, 241, 0.4)',
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false,
            },
            {
                label: 'Consumed',
                data: [summary.consumed_calories, summary.consumed_protein, summary.consumed_carbs, summary.consumed_fats],
                backgroundColor: 'rgba(139, 92, 246, 0.5)',
                borderColor: 'rgba(139, 92, 246, 0.8)',
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#8888a8',
                    font: { family: 'Outfit', size: 12, weight: 500 },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                },
            },
            title: { display: false },
            tooltip: {
                backgroundColor: '#1a1a2e',
                titleColor: '#f0f0f5',
                bodyColor: '#8888a8',
                borderColor: 'rgba(255,255,255,0.06)',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                titleFont: { family: 'Outfit', weight: 600 },
                bodyFont: { family: 'Outfit' },
            },
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                ticks: { color: '#8888a8', font: { family: 'Outfit', size: 12, weight: 500 } },
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                ticks: { color: '#555570', font: { family: 'Outfit', size: 11 } },
            },
        },
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Nutritional Overview</h3>
                        <p className="text-sm text-[#8888a8] mt-0.5">Today's intake vs your targets</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#555570]">
                        <span className="w-2 h-2 rounded-full bg-indigo-500/40" />
                        Target
                        <span className="w-2 h-2 rounded-full bg-purple-500/70 ml-2" />
                        Consumed
                    </div>
                </div>
                <div className="h-[320px]">
                    <Bar options={chartOptions} data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
