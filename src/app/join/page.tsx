import Header from "@/components/Header";

import Footer from "@/components/Footer";
import CohortHero from "@/components/CohortHero";
import CohortHeroBanner from "@/components/CohortHeroBanner";
import CohortProcessSection from "@/components/CohortProcessSection";
import CohortValueBanner from "@/components/CohortValueBanner";
import CohortValueSection from "@/components/CohortValueSection";
import CohortJoinBanner from "@/components/CohortJoinBanner";
import JoinUsSection from "@/components/JoinUsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header staticAppearance />

      <CohortHero />

      <CohortHeroBanner />

      <CohortProcessSection />

      <CohortValueBanner />

      <CohortValueSection />

      <CohortJoinBanner />

      <JoinUsSection />

      <Footer />
    </div>
  );
}
