import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import ServicesSection from "@/components/ServicesSection";
import MercenariesSection from "@/components/MercenariesSection";
import PortfolioSection from "@/components/PortfolioSection";
import PortfolioBanner from "@/components/PortfolioBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import TraitsBanner from "@/components/TraitsBanner";
import HireUsSection from "@/components/HireUsSection";
import OurStorySection from "@/components/OurStorySection";
import Footer from "@/components/Footer";
import OurStoryBanner from "@/components/OurStorySectionBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HomeHero />

      <ServicesSection />

      <MercenariesSection />

      <PortfolioSection />
      <PortfolioBanner />

      <TestimonialsSection />
      <TraitsBanner />

      <HireUsSection />

      <OurStoryBanner />
      <OurStorySection />
      <Footer />
    </div>
  );
}
