import type { Metadata } from "next";
import HomeExperience from "@/components/HomeExperience";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "RaidGuild — Venture Beyond",
  description:
    "A builder-owned collective designing and shipping ambitious onchain products.",
};

export const dynamic = "force-dynamic";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RaidGuild",
  url: "https://www.raidguild.org",
  description:
    "A builder-owned collective shipping smart contracts, digital products, AI systems, and DAO tooling since 2019.",
  foundingDate: "2019",
  sameAs: [
    "https://github.com/raid-guild",
    "https://x.com/RaidGuild",
    "https://discord.gg/2vx47gT95y",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HomeExperience />
    </>
  );
}
