"use client";

import ScrollingBanner from "./ScrollingBanner";

const traits = [
  {
    src: "/images/icon-alchemy-01.svg",
    alt: "Creative",
    width: 25,
    height: 38,
  },
  "Creative",
  {
    src: "/images/icon-alchemy-02.svg",
    alt: "Dynamic",
    width: 25,
    height: 38,
  },
  "Dynamic",
  {
    src: "/images/icon-alchemy-03.svg",
    alt: "Visionary",
    width: 30,
    height: 38,
  },
  "Visionary",
  {
    src: "/images/icon-alchemy-04.svg",
    alt: "Collaborative",
    width: 30,
    height: 38,
  },
  "Collaborative",
  {
    src: "/images/icon-alchemy-05.svg",
    alt: "Innovative",
    width: 36,
    height: 38,
  },
  "Innovative",
  {
    src: "/images/icon-alchemy-06.svg",
    alt: "Relentless",
    width: 20,
    height: 38,
  },
  "Relentless",
];

export default function TraitsBanner() {
  return (
    <ScrollingBanner
      items={traits}
      bgColor="bg-moloch-400"
      borderColor="border-[#534A13]"
      textColor="text-moloch-800"
      gap="gap-11"
      scrollDuration={25}
    />
  );
}
