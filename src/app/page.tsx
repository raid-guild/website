import type { Metadata } from "next";
import HomeExperience from "@/components/HomeExperience";

const publicAssetOrigin = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : "https://www.raidguild.org";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "RaidGuild — Venture Beyond",
  description:
    "A builder-owned collective designing and shipping ambitious onchain products.",
  openGraph: {
    type: "website",
    url: "https://www.raidguild.org",
    siteName: "RaidGuild",
    title: "RaidGuild — Venture Beyond",
    description:
      "A builder-owned collective turning ambitious ideas into digital worlds worth inhabiting.",
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
      "A builder-owned collective turning ambitious ideas into digital worlds worth inhabiting.",
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
