"use client";

import ScrollingBanner from "./ScrollingBanner";

const services = [
  "Smart Contract Engineering",
  "Full-Stack dApp Development",
  "Token Systems",
  "DevOps & Infrastructure",
  "Smart Contract Auditing",
  "Hardhat & Testing",
  "React & Next.js",
  "UX/UI Design",
  "Product Strategy",
  "Design Systems",
  "Brand Identity",
  "User Research",
  "Responsive Design",
  "DAO Architecture",
  "Governance Frameworks",
  "Discord Bot Development",
  "Tokenomics",
  "Voting Mechanisms",
  "Treasury Management",
  "Multi-sig Security",
  "Content Strategy",
  "Short-Form Video",
  "Developer Relations",
  "Brand & Creative",
  "Partnership Development",
  "Event Design",
  "PR & Media",
  "Growth Campaigns",
  "Educational Content",
];

export default function ServicesBanner() {
  return (
    <ScrollingBanner
      items={services}
      bgColor="bg-moloch-800"
      borderColor="border-accent"
      gap="gap-10"
      scrollDuration={100}
    />
  );
}
