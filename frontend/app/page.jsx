import { Suspense } from "react";
import HeroSection from "./components/HeroSection";
import LoggedInHero from "./components/LoggedInHero";
import FeaturesSection from "./components/FeaturesSection";
import ProductShowcase from "./components/ProductShowcase";
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";

export default function HomePage() {
    return (
        <div>
            <main>
                <Suspense>
                    <HeroSection />
                </Suspense>
                <LoggedInHero />
                <FeaturesSection />
                <ProductShowcase />
                <HowItWorks />
                <CTASection />
            </main>
        </div>
    );
}
