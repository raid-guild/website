import Header from "@/components/Header";

import Footer from "@/components/Footer";
import CohortHero from "@/components/CohortHero";
import CohortProcessSection from "@/components/CohortProcessSection";
import JoinUsSection from "@/components/JoinUsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header staticAppearance />

      <CohortHero />

      <CohortProcessSection />

      <JoinUsSection />

      <Footer />
    </div>
  );
}
