"use client";

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiSend, FiCpu } from 'react-icons/fi';

const Chat = () => {
    const { data: session } = useSession();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello! I'm your personal nutrition assistant. What can I help you find today?" }
    ]);
    const [sessionId, setSessionId] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setSessionId(crypto.randomUUID());
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || !session?.user?.id) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('http://127.0.0.1:8000/recipes/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: currentInput,
                    user_id: session.user.id,
                    session_id: sessionId
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || 'Something went wrong.');
            }

            const data = await res.json();
            const botMessage = { sender: 'bot', text: data.response };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            const errorMessage = { sender: 'error', text: `Sorry, an error occurred: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card overflow-hidden h-[85vh] flex flex-col" style={{ borderRadius: '20px' }}>
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <FiCpu size={16} className="text-white" />
                </div>
                <div>
                    <h3 className="text-white font-semibold text-sm">DietPilot Assistant</h3>
                    <p className="text-[#555570] text-xs">Powered by RAG AI</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
                    <span className="text-xs text-emerald-400 font-medium">Online</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                            <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                message.sender === 'user'
                                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-md'
                                    : message.sender === 'error'
                                    ? 'bg-red-500/10 text-red-300 border border-red-500/20 rounded-bl-md'
                                    : 'bg-white/[0.05] text-[#c0c0d8] border border-white/[0.06] rounded-bl-md'
                            }`}>
                                <div className="prose prose-sm prose-invert break-words max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_code]:text-indigo-300 [&_code]:bg-white/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_ul]:list-disc [&_ol]:list-decimal">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {message.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/[0.05] border border-white/[0.06] px-5 py-3.5 rounded-2xl rounded-bl-md">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{animationDelay: '0s'}} />
                                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{animationDelay: '0.15s'}} />
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{animationDelay: '0.3s'}} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2">
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-2 focus-within:border-indigo-500/40 focus-within:bg-white/[0.06] transition-all">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={session ? "Ask for a recipe suggestion..." : "Please log in to chat"}
                        className="flex-1 bg-transparent text-sm text-white placeholder-[#555570] outline-none py-1.5"
                        disabled={isLoading || !session}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading || !session}
                        className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/30 transition-all shrink-0"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        ) : (
                            <FiSend size={14} />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
