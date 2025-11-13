"use client";

import ScrollingBanner from "./ScrollingBanner";

const traits = [
  {
    src: "/images/icon-alchemy-01.svg",
    alt: "Bold",
    width: 38,
    height: 38,
  },
  "Bold",
  {
    src: "/images/icon-alchemy-02.svg",
    alt: "Collaborative",
    width: 38,
    height: 38,
  },
  "Collaborative",
  {
    src: "/images/icon-alchemy-03.svg",
    alt: "Resilient",
    width: 38,
    height: 38,
  },
  "Resilient",
  {
    src: "/images/icon-alchemy-04.svg",
    alt: "Innovative",
    width: 38,
    height: 38,
  },
  "Innovative",
  {
    src: "/images/icon-alchemy-05.svg",
    alt: "Decentralized",
    width: 38,
    height: 38,
  },
  "Decentralized",
  {
    src: "/images/icon-alchemy-06.svg",
    alt: "Strategic",
    width: 38,
    height: 38,
  },
  "Strategic",
  {
    src: "/images/icon-alchemy-07.svg",
    alt: "Transparent",
    width: 38,
    height: 38,
  },
  "Transparent",
  {
    src: "/images/icon-alchemy-08.svg",
    alt: "Pioneering",
    width: 38,
    height: 38,
  },
  "Pioneering",
  {
    src: "/images/icon-alchemy-09.svg",
    alt: "Versatile",
    width: 38,
    height: 38,
  },
  "Versatile",
  {
    src: "/images/icon-alchemy-10.svg",
    alt: "Community-Driven",
    width: 38,
    height: 38,
  },
  "Community-Driven",
  {
    src: "/images/icon-alchemy-01.svg",
    alt: "Dynamic",
    width: 38,
    height: 38,
  },
  "Dynamic",
  {
    src: "/images/icon-alchemy-02.svg",
    alt: "Sovereign",
    width: 38,
    height: 38,
  },
  "Sovereign",
  {
    src: "/images/icon-alchemy-03.svg",
    alt: "Impactful",
    width: 38,
    height: 38,
  },
  "Impactful",
  {
    src: "/images/icon-alchemy-04.svg",
    alt: "Agile",
    width: 38,
    height: 38,
  },
  "Agile",
  {
    src: "/images/icon-alchemy-05.svg",
    alt: "Visionary",
    width: 38,
    height: 38,
  },
  "Visionary",
  {
    src: "/images/icon-alchemy-06.svg",
    alt: "Meritocratic",
    width: 38,
    height: 38,
  },
  "Meritocratic",
  {
    src: "/images/icon-alchemy-07.svg",
    alt: "Relentless",
    width: 38,
    height: 38,
  },
  "Relentless",
  {
    src: "/images/icon-alchemy-08.svg",
    alt: "Open-Source",
    width: 38,
    height: 38,
  },
  "Open-Source",
  {
    src: "/images/icon-alchemy-09.svg",
    alt: "Creative",
    width: 38,
    height: 38,
  },
  "Creative",
  {
    src: "/images/icon-alchemy-10.svg",
    alt: "Trustless",
    width: 38,
    height: 38,
  },
  "Trustless",
];

export default function TraitsBanner() {
  return (
    <ScrollingBanner
      items={traits}
      bgColor="bg-moloch-500"
      borderColor="border-scroll-700"
      textColor="text-moloch-800"
      gap="gap-10"
      scrollDuration={68}
    />
  );
}
