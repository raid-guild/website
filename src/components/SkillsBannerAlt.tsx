"use client";

import ScrollingBanner from "./ScrollingBanner";

const skills = [
  "Smart Contract Engineer",
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UX Designer",
  "Visual Designer",
  "Brand Strategist",
  "Product Manager",
  "DAO Consultant",
  "Operations Lead",
  "Account Manager",
  "Business Developer",
  "Community Manager",
  "Content Creator",
  "Marketing Strategist",
  "Treasury Manager",
  "Data Scientist",
  "DevOps Engineer",
];

export default function SkillsBannerAlt() {
  return (
    <ScrollingBanner
      items={skills}
      bgColor="bg-scroll-100"
      textColor="text-scroll-700"
      borderColor="border-scroll-700"
      gap="gap-10"
      scrollDuration={80}
    />
  );
}
