import HeaderJoin from "@/components/HeaderJoin";

import Footer from "@/components/Footer";
import CohortHero from "@/components/CohortHero";
import CohortHeroBanner from "@/components/CohortHeroBanner";
import CohortProcessSection from "@/components/CohortProcessSection";
import CohortValueBanner from "@/components/CohortValueBanner";
import CohortValueSection from "@/components/CohortValueSection";
import CohortJoinBanner from "@/components/CohortJoinBanner";
import JoinUsSection from "@/components/JoinUsSection";

type JoinPageProps = {
  searchParams?: {
    ref?: string;
    referral?: string;
  };
};

export default function Home({ searchParams }: JoinPageProps) {
  const referral = searchParams?.referral ?? searchParams?.ref;

  return (
    <div className="min-h-screen bg-background">
      <HeaderJoin />

      <CohortHero />

      <CohortHeroBanner />

      <CohortProcessSection />

      <CohortValueBanner />

      <CohortValueSection />

      <CohortJoinBanner />

      <JoinUsSection referral={referral} />

      <Footer />
    </div>
  );
}
