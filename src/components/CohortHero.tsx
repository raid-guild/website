"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { analyticsEvents, trackAnalyticsEvent } from "@/lib/analytics";
import { PORTAL_JOIN_URL } from "@/lib/data/constants";

const cohortImages = [
  "/images/cohort-image-1-bw.webp",
  "/images/cohort-image-1-c.webp",
  "/images/cohort-image-2-bw.webp",
  "/images/cohort-image-2-c.webp",
];

export default function CohortHero() {
  // Deterministic image selection based on 10-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 10)); // 10 minutes
  const imageSrc = cohortImages[interval % cohortImages.length];

  const trackPortalJoinClick = () => {
    trackAnalyticsEvent(analyticsEvents.ctaClick, {
      location: "cohort_hero",
      destination: "portal_join",
    });
  };

  return (
    <section id="cohort-hero" className="relative bg-moloch-800">
      <div className="container-custom py-12 lg:py-24 lg:pt-36">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-[60px] order-2 lg:order-1">
            <div className="flex flex-col gap-10">
              <h1 className="text-heading-lg text-scroll-100 text-center">
                FORGE YOUR PATH.
                <br />
                EARN YOUR SEAT.
              </h1>
              <p className="text-heading-sm text-scroll-150 text-center">
                RaidGuild&apos;s monthly cohort is a 4-week proving ground where
                you embark on real projects, train with battle-tested builders,
                and claim your place in the premier design and dev collective of
                the decentralized realm.
              </p>
              <p className="text-body-lg text-scroll-150 text-center">
                Cohorts launch on the first Monday of each month. Limited seats.
              </p>
            </div>
            <Image
              src="/images/cohort-hero-divider.svg"
              alt="Divider"
              width={300}
              height={36}
            />
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-heading-md text-scroll-100 text-center">
                Pledge now, or venture forth for the full tale.
              </h2>
              <div className="flex justify-center">
                <Button asChild className="contact-btn-active">
                  <a href={PORTAL_JOIN_URL} onClick={trackPortalJoinClick}>
                    Begin My Quest
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 order-1 lg:order-2">
            <Image
              src={imageSrc}
              alt="Cohort Hero"
              width={632}
              height={632}
              className="w-full max-w-[632px] h-auto mx-auto"
              style={{ width: "100%", height: "auto", maxWidth: "632px" }}
              sizes="(min-width: 1024px) 632px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
