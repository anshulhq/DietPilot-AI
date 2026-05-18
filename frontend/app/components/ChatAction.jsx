import Link from 'next/link';
import { FiMessageSquare } from 'react-icons/fi';

const ChatAction = () => {
    return (
        <Link href="/recipes/chat" className="glass-card glow-border p-6 group block">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <FiMessageSquare size={22} className="text-indigo-400" />
            </div>
            <h2 className="text-white font-semibold mb-1.5">Chat with AI Assistant</h2>
            <p className="text-[#8888a8] text-sm">Get personalized recipe ideas now</p>
        </Link>
    );
};

export default ChatAction;
