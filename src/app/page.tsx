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
import ServicesBanner from "@/components/ServicesBanner";
import MercenariesBanner from "@/components/MercenariesBanner";

export const dynamic = 'force-dynamic';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RaidGuild",
  url: "https://www.raidguild.org",
  logo: "https://www.raidguild.org/images/logo-RG-moloch-500.svg",
  description:
    "A builder-owned collective shipping smart contracts, dApps, AI systems, and DAO tooling since 2019.",
  foundingDate: "2019",
  sameAs: [
    "https://github.com/raid-guild",
    "https://x.com/RaidGuild",
    "https://discord.gg/2vx47gT95y",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />

      <HomeHero />

      <ServicesSection />
      <ServicesBanner />

      <MercenariesSection />
      <MercenariesBanner />

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
