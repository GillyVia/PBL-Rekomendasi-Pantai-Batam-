"use client";

import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { FeaturedBeachesNew } from "@/components/ui/FeaturedBeachesNew";
import { BeachesByDistrict } from "@/components/ui/BeachesByDistrict";
import { StatsSection } from "@/components/ui/StatsSection";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedBeachesNew />
      <BeachesByDistrict />
      <StatsSection />
    </main>
  );
}