import "./globals.css";
import Navbar from "./components/Navbar";
import SessionWrapper from "./components/SessionWrapper";

export const metadata = {
  title: "DietPilot AI",
  description: "Your AI-powered nutrition assistant",
  icons: {
    icon: "./public/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen">
        <SessionWrapper>
          <div className="ambient-orb w-[600px] h-[600px] bg-indigo-600/20 -top-[200px] -left-[200px]" />
          <div className="ambient-orb w-[400px] h-[400px] bg-purple-600/15 top-[50%] -right-[100px]" />
          <div className="ambient-orb w-[300px] h-[300px] bg-cyan-600/10 -bottom-[100px] left-[30%]" />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
