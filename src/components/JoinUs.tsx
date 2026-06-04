"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { analyticsEvents, trackAnalyticsEvent } from "@/lib/analytics";
import { PORTAL_JOIN_URL } from "@/lib/data/constants";

const joinUsImages = [
  "/images/join-image-1-bw.webp",
  "/images/join-image-1-c.webp",
  "/images/join-image-2-bw.webp",
  "/images/join-image-2-c.webp",
];

export default function JoinUs() {
  // Deterministic image selection based on 8-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 8)); // 8 minutes
  const imageSrc = joinUsImages[interval % joinUsImages.length];

  const trackPortalJoinClick = () => {
    trackAnalyticsEvent(analyticsEvents.ctaClick, {
      location: "join_us_section",
      destination: "portal_join",
    });
  };

  return (
    <section id="join-us" className="relative">
      <div className="container-custom relative min-h-[953px]">
        <div className="absolute top-0 md:top-1/2 md:-translate-y-1/2 right-0 z-0 pointer-events-none max-w-[632px]">
          <Image
            src={imageSrc}
            alt="Join Raid Guild"
            width={632}
            height={843}
            className="h-auto object-contain object-bottom md:object-center"
            priority={false}
          />
        </div>
        <div className="relative z-10 pt-[520px] pb-12 md:py-12 lg:py-24">
          <div className="grid-custom gap-4 min-h-[850px] items-center">
            {/* Left Column - Form */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <div className="space-y-8 max-w-[632px] mr-auto">
                {/* Header */}
                <div className="text-center md:text-left">
                  <h3 className="text-heading-lg font-bold text-moloch-500 mb-8">
                    Join Us! Let&apos;s Build Something Legendary Together
                  </h3>
                  <div className="space-y-4">
                    <p className="text-body-lg font-body">
                      Can you commit 10-20 hours per week to the campaign? Do
                      you have victories that showcase your skills? Are you
                      ready to be judged by your deeds? Do you thrive charting
                      your own course in async realms? If yes, you&apos;re ready
                      to raid.
                    </p>
                    <p className="text-body-lg font-body">
                      Embark on your journey through the RaidGuild Portal to see
                      the full application, cohort details, and everything you
                      need to get started.
                    </p>
                  </div>
                </div>

                <div className="pt-3">
                  <Button asChild className="contact-btn-active">
                    <a href={PORTAL_JOIN_URL} onClick={trackPortalJoinClick}>
                      Begin My Quest
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
