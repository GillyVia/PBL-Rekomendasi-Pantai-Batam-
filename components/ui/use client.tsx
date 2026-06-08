"use client";

import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { FeaturedBeachesNew } from "@/components/ui/FeaturedBeachesNew";
import { BeachesByDistrict } from "@/components/ui/BeachesByDistrict";
import { StatsSection } from "@/components/ui/StatsSection";
import { RecommendationPreview } from "@/components/ui/RecommendationPreview";
import { MapPreview } from "@/components/ui/MapPreview";
import { Footer } from "@/components/ui/Footer";
import { CompareThreeBeaches } from "@/components/ui/CompareThreeBeaches";
import { ChatbotSection } from "@/components/ui/ChatbotSection";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <HeroSection />
            <FeaturedBeachesNew />
            <BeachesByDistrict />
            <StatsSection />
            <RecommendationPreview />
            <CompareThreeBeaches />
            <MapPreview />
            <ChatbotSection />
            <Footer />
        </main>
    );
}
