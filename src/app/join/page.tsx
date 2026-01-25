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
  const themeAnchors = [
    { id: "cohort-hero", theme: "moloch-800" as const },
    { id: "cohort-process", theme: "moloch-500" as const },
    { id: "cohort-value", theme: "scroll-700" as const },
    { id: "join-us", theme: "moloch-500" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header themeAnchors={themeAnchors} />

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
