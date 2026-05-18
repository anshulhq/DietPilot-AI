"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { FiMail, FiLock, FiArrowRight, FiCompass } from "react-icons/fi";

const LoginPage = () => {
    const router = useRouter();
    const [warning, setWarning] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "" });

    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => setWarning(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [warning]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setWarning("Email and password are required");
            return;
        }

        const loginRes = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (loginRes.ok) {
            router.replace("/auth/callback");
        } else {
            setWarning("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <FiCompass size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Diet<span className="glow-text">Pilot</span> AI
                        </span>
                    </Link>
                    <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                    <p className="text-[#8888a8] mt-1 text-sm">Sign in to continue your journey</p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                        <div>
                            <label className="block text-xs font-medium text-[#8888a8] mb-2">Email</label>
                            <div className="relative">
                                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555570]" />
                                <input
                                    type="email"
                                    name="email"
                                    className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#8888a8] mb-2">Password</label>
                            <div className="relative">
                                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555570]" />
                                <input
                                    type="password"
                                    name="password"
                                    className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="gradient-btn w-full py-3 text-sm flex items-center justify-center gap-2 group">
                            Sign In
                            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {warning && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs px-4 py-3 rounded-xl mb-4">
                            {warning}
                        </div>
                    )}

                    <p className="text-center text-sm text-[#8888a8]">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Sign up
                        </Link>
                    </p>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/[0.06]" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-3 bg-[#1a1a2e] text-[#555570]">OR</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="ghost-btn w-full py-3 text-sm flex items-center justify-center gap-2.5"
                        onClick={() => signIn("google", { callbackUrl: "/auth/callback" })}
                    >
                        <FaGoogle size={14} />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
