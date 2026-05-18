import Layout from '../../components/Layout';
import Chat from '../../components/Chat';

export default function ChatPage() {
    return (
        <Layout>
            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            AI <span className="glow-text">Assistant</span>
                        </h1>
                        <p className="text-[#8888a8] mt-1.5 text-sm">Get personalized recipe ideas and nutrition advice</p>
                    </div>
                    <Chat />
                </div>
            </div>
        </Layout>
    );
}
