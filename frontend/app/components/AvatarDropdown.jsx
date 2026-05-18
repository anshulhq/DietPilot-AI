"use client";

import { useSession, signOut } from "next-auth/react";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";

const AvatarDropdown = () => {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors">
                <div className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center overflow-hidden bg-white/[0.04]">
                    {session.user.image ? (
                        <img
                            alt="User Avatar"
                            src={session.user.image}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <RxAvatar className="w-5 h-5 text-[#8888a8]" />
                    )}
                </div>
                <span className="hidden sm:block text-sm font-medium text-[#c0c0d8] max-w-[100px] truncate">
                    {session.user.name}
                </span>
            </label>

            <ul
                tabIndex={0}
                className="menu dropdown-content mt-2 p-1.5 bg-[#1a1a2e] border border-white/[0.06] rounded-xl w-48 shadow-2xl shadow-black/40"
            >
                <li>
                    <a
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-red-400 hover:bg-red-500/10 rounded-lg text-sm flex items-center gap-2"
                    >
                        <FiLogOut size={14} />
                        Sign Out
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default AvatarDropdown;
