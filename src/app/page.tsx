import type { Metadata } from "next";
import HomeExperience from "@/components/HomeExperience";

const publicAssetOrigin = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : "https://www.raidguild.org";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "RaidGuild — Venture Beyond",
  description:
    "Explore RaidGuild, a builder-owned community of creative and technical people learning, experimenting, and building together.",
  openGraph: {
    type: "website",
    url: "https://www.raidguild.org",
    siteName: "RaidGuild",
    title: "RaidGuild — Venture Beyond",
    description:
      "Independent minds. Shared ambition. Explore the people, ideas, and specialist practices growing from the RaidGuild community.",
    images: [
      {
        url: `${publicAssetOrigin}/opengraph-image.png`,
        width: 1733,
        height: 908,
        alt: "Two RaidGuild travelers overlooking a coral citadel in an alien landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RaidGuild — Venture Beyond",
    description:
      "Independent minds. Shared ambition. Explore the people, ideas, and specialist practices growing from the RaidGuild community.",
    images: [`${publicAssetOrigin}/opengraph-image.png`],
  },
};

export const dynamic = "force-dynamic";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RaidGuild",
  url: "https://www.raidguild.org",
  description:
    "A builder-owned community of creative and technical people sharing knowledge, exploring technology, and building together since 2019.",
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
