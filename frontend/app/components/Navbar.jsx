"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AvatarDropdown from './AvatarDropdown';
import { FiMenu, FiX, FiActivity, FiBookOpen, FiMessageCircle, FiCompass } from 'react-icons/fi';
import { useState } from 'react';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: FiActivity },
    { href: '/recipes', label: 'Recipes', icon: FiBookOpen },
    { href: '/recipes/chat', label: 'AI Chat', icon: FiMessageCircle },
];

const Navbar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (status === 'loading') {
        return <div className="h-16 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl" />;
    }

    return (
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                <FiCompass size={16} className="text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">
                                Diet<span className="glow-text">Pilot</span> AI
                            </span>
                        </Link>

                        {session && (
                            <nav className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? 'text-white bg-white/[0.08] shadow-sm'
                                                    : 'text-[#8888a8] hover:text-white hover:bg-white/[0.04]'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {session ? (
                            <>
                                <div className="hidden md:block">
                                    <AvatarDropdown />
                                </div>
                                <button
                                    className="md:hidden p-2 rounded-lg text-[#8888a8] hover:text-white hover:bg-white/[0.06] transition-colors"
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                >
                                    {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="ghost-btn px-4 py-2 text-sm">Log in</Link>
                                <Link href="/signup" className="gradient-btn px-4 py-2 text-sm">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {session && mobileOpen && (
                <div className="md:hidden border-t border-white/[0.06] bg-[#0a0a0f]/95 backdrop-blur-xl">
                    <nav className="max-w-7xl mx-auto px-4 py-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                        isActive
                                            ? 'text-white bg-white/[0.08]'
                                            : 'text-[#8888a8] hover:text-white hover:bg-white/[0.04]'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon size={18} />
                                    {link.label}
                                </Link>
                            );
                        })}
                        <div className="pt-2 mt-2 border-t border-white/[0.06]">
                            <AvatarDropdown />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
