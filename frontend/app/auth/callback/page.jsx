"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (status === "authenticated") {
            if (session.user.onboardingComplete) {
                router.replace("/dashboard");
            } else {
                router.replace("/onboarding");
            }
        }

        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [session, status, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            </div>
        </div>
    );
}
