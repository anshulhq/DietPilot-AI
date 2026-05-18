import Layout from '@/app/components/Layout';
import Dashboard from '@/app/components/Dashboard';
import { FiCalendar } from 'react-icons/fi';

export default function DashboardPage() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <Layout>
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                Your Daily <span className="glow-text">Progress</span>
                            </h1>
                            <p className="text-[#8888a8] mt-1.5 text-sm">Track your nutrition goals and stay on target</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#555570] bg-white/[0.03] px-4 py-2 rounded-lg border border-white/[0.06]">
                            <FiCalendar size={14} />
                            {today}
                        </div>
                    </div>
                    <Dashboard />
                </div>
            </div>
        </Layout>
    );
}
