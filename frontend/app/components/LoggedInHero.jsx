"use client";
import { useSession } from 'next-auth/react';
import ChatAction from './ChatAction';
import BrowseAction from './BrowseAction';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const LoggedInHero = () => {
    const { data: session, status } = useSession();

    if (status !== 'authenticated') {
        return null;
    }

    return (
        <section className="py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/[0.03] to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Welcome back, <span className="glow-text">{session.user.name}</span>
                    </h2>
                    <p className="text-[#8888a8] mt-2">Ready to find your next meal?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <ChatAction />
                    <BrowseAction />
                </div>
                <div className="text-center mt-8">
                    <Link href="/dashboard" className="gradient-btn px-6 py-3 text-sm inline-flex items-center gap-2 group">
                        View Dashboard
                        <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoggedInHero;
