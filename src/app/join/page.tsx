import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CohortHero from "@/components/CohortHero";
import CohortHeroBanner from "@/components/CohortHeroBanner";
import CohortProcessSection from "@/components/CohortProcessSection";
import CohortValueBanner from "@/components/CohortValueBanner";
import CohortValueSection from "@/components/CohortValueSection";
import CohortJoinBanner from "@/components/CohortJoinBanner";
import HeaderJoin from "@/components/HeaderJoin";
import JoinUsSection from "@/components/JoinUsSection";

export const metadata: Metadata = {
  title: { absolute: "Join a RaidGuild Cohort — 4-Week Web3 Proving Ground" },
  description:
    "A free monthly cohort for intermediate+ developers, designers, and operators. Build a real Web3 project with experienced guild members. Paths out: paid raids, recruitment, ventures, or membership.",
  alternates: { canonical: "/join" },
  openGraph: {
    title: "Join a RaidGuild Cohort — 4-Week Web3 Proving Ground",
    description:
      "A free monthly cohort for intermediate+ developers, designers, and operators. Build a real Web3 project with experienced guild members.",
    url: "https://www.raidguild.org/join",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderJoin />

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
