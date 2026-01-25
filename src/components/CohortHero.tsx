"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const cohortImages = [
  "/images/cohort-image-1-bw.webp",
  "/images/cohort-image-1-c.webp",
  "/images/cohort-image-2-bw.webp",
  "/images/cohort-image-2-c.webp",
];

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";
const DESKTOP_THIN_HEIGHT = 96;
const MOBILE_HEADER_HEIGHT = 72;

export default function CohortHero() {
  // Deterministic image selection based on 10-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 10)); // 10 minutes
  const imageSrc = cohortImages[interval % cohortImages.length];

  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    setIsDesktop(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) =>
      setIsDesktop(event.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleNavigate = (href: string) => {
    if (typeof window === "undefined" || !href.startsWith("#")) return;

    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    const targetTop = window.scrollY + target.getBoundingClientRect().top - 1;

    let offset;
    if (!isDesktop) {
      // Mobile: simple offset (72 - 12 = 60px)
      offset = MOBILE_HEADER_HEIGHT;
    } else {
      // Desktop: At scroll 0-20: offset = 96 + 100 = 196px, At scroll 21+: offset = 96px
      const headerShrinkAdjustment = window.scrollY <= 20 ? 100 : 0;
      offset = DESKTOP_THIN_HEIGHT + headerShrinkAdjustment;
    }

    const safeOffset = Math.max(offset - (isDesktop ? 16 : 12), 0);
    const destination = Math.max(targetTop - safeOffset, 0);

    window.scrollTo({
      top: destination,
      behavior: "smooth",
    });

    if (typeof window.history?.replaceState === "function") {
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <section id="cohort-hero" className="relative bg-moloch-800">
      <div className="container-custom min-h-[795px]">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-[60px] order-2 lg:order-1">
            <div className="flex flex-col gap-10">
              <h1 className="text-heading-lg text-scroll-100 text-center lg:pt-44 pt-12">
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
            <div className="flex flex-col md:flex-row gap-4 w-full pb-12 lg:pb-0">
              <Button
                variant="primary"
                className="w-full md:flex-1 cohort-btn-apply"
                data-click="apply-cohort-hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("#join-us");
                }}
              >
                <span className="text-label">APPLY NOW</span>
              </Button>
              <Button
                variant="secondary"
                className="w-full md:flex-1 cohort-btn-learn"
                data-click="learn-more-cohort-hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("#cohort-process");
                }}
              >
                <span className="text-label">LEARN MORE</span>
              </Button>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 order-1 lg:order-2 lg:pt-32 pt-12">
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
