"use client";

import ScrollingBanner from "./ScrollingBanner";

const traits = [
  "Oath Keeper",
  "Self-Starter",
  "Async Warrior",
  "Deadline Slayer",
  "Loot Sharer",
  "Quest Finisher",
  "Feedback Forged",
  "Chaos Resistant",
  "Party Player",
  "Ship It Mentality",
  "No Hand-Holding",
  "Dungeon Ready",
  "Proof of Work",
  "Honor Bound",
  "Battle Tested",
  "Guild Loyal",
  "Raid or Die",
  "Level Up Mindset",
];

export default function SkillsBanner() {
  return (
    <ScrollingBanner
      items={traits}
      bgColor="bg-moloch-500"
      textColor="text-scroll-100"
      borderColor="border-scroll-100"
      gap="gap-10"
      scrollDuration={80}
    />
  );
}
