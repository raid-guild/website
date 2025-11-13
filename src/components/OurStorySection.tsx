"use client";

import { timelineIconNames, timelineItems } from "@/lib/data/content";
import Image from "next/image";
import { useState } from "react";
import TimelineAccordion from "./TimelineAccordion";
import { Button } from "./ui/button";
import { DISCORD_INVITE_URL } from "@/lib/data/constants";
import Link from "next/link";

const storyImages = [
  "/images/story-image-1-bw.png",
  "/images/story-image-1-c.png",
  "/images/story-image-2-bw.png",
  "/images/story-image-2-c.png",
];

export default function OurStorySection() {
  const [imageSrc] = useState(() => {
    const now = Date.now();
    const seconds = Math.floor(now / 30000); // Changes every 30 seconds
    return storyImages[seconds % storyImages.length];
  });
  return (
    <section id="our-story" className="py-24">
      <div className="container-custom relative">
        <div className="absolute inset-0 z-0 pointer-events-none -my-24">
          <div className="absolute top-0 right-0 w-[632px] h-[843px]">
            <Image
              src={imageSrc}
              alt="Story Background"
              width={632}
              height={843}
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-8 lg:col-span-6">
            <div className="text-center lg:text-left">
              <h2 className="text-heading-lg text-moloch-500 mb-8">
                Our Story
              </h2>
              <p className="text-body-lg">
                From rebels to builders of the sovereign internet, RaidGuild was
                born in the fires of decentralization to slay Moloch and create
                tools and systems that return power to the people.
              </p>
            </div>
            <TimelineAccordion
              items={timelineItems}
              iconNames={timelineIconNames}
              startIndex={0}
            />
          </div>
          <div className="hidden lg:col-span-6 lg:flex lg:justify-center">
            {/* Background image now handled above */}
          </div>
          <div className="lg:hidden">
            <Image
              src="/images/mercenaries-divider.svg"
              alt="Decorative divider"
              width={450}
              height={28}
              className="mx-auto h-auto max-w-[320px]"
            />
          </div>
          <div className="lg:col-span-12">
            <div className="w-full text-center">
              <h2 className="text-heading-lg text-moloch-500 mb-4">
                Join the Guild
              </h2>
              <p className="text-body-lg mb-8">
                Ready to join the ranks? Our Cohort Onboarding Program is the
                gateway into Raid Guild—where the finest builders shape the
                future of Web3.
              </p>
              <div className="flex gap-4 justify-center">
                <Button>
                  <Link href="/join" className="text-label text-scoll-100">
                    APPLY TO A COHORT
                  </Link>
                </Button>
                <Button variant="secondary" className="text-label">
                  <a
                    href={DISCORD_INVITE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-label"
                  >
                    JOIN DISCORD
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
