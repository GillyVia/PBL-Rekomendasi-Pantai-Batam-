import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { BeachesByDistrict } from "@/components/ui/BeachesByDistrict";
import { RecommendationPreview } from "@/components/ui/RecommendationPreview";
import { CompareThreeBeaches } from "@/components/ui/CompareThreeBeaches";
import { MapPreview } from "@/components/ui/MapPreview";
import { StatsSection } from "@/components/ui/StatsSection";
import { ChatbotSection } from "@/components/ui/ChatbotSection";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <BeachesByDistrict />
      <RecommendationPreview />
      <CompareThreeBeaches />
      <MapPreview />
      <StatsSection />
      <ChatbotSection />
      <Footer />
    </main>
  );
}
