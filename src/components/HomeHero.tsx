"use client";

import Image from "next/image";
import PartnerLogoBanner from "./PartnerLogoBanner";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const homeImages = [
  "/images/home-image-1-bw.webp",
  "/images/home-image-1-c.webp",
  "/images/home-image-2-bw.webp",
  "/images/home-image-2-c.webp",
];

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";
const DESKTOP_THIN_HEIGHT = 96;
const MOBILE_HEADER_HEIGHT = 72;

export default function HomeHero() {
  // Deterministic image selection based on 10-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 10)); // 10 minutes
  const imageSrc = homeImages[interval % homeImages.length];

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
    <section id="about" className="relative">
      <div className="container-custom min-h-795px]">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-[60px] order-2 lg:order-1">
            <div className="flex flex-col gap-10">
              <h1 className="text-heading-lg text-scroll-700 text-center lg:pt-44 pt-12">
                BUILDING WEB3
                <br />
                ONE RAID AT A TIME
              </h1>
              <p className="text-heading-sm text-moloch-800 text-center">
                RaidGuild is a decentralized collective of mercenaries
                <br />
                ready to slay your web3 product demons
              </p>
              <p className="text-body-lg text-moloch-800 text-center">
                We&apos;re a battle-tested squad for full-stack development —
                smart contracts,
                <br />
                dApps, DAO tooling, and public goods – built for real impact
              </p>
            </div>
            <Image
              src="/images/home-divider.svg"
              alt="Divider"
              width={300}
              height={36}
            />
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <Button
                variant="primary"
                className="w-full md:flex-1"
                data-click="hire-us-hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("#hire-us");
                }}
              >
                <span className="text-label text-scoll-100">HIRE US</span>
              </Button>
              <Button
                variant="secondary"
                className="w-full md:flex-1"
                data-click="case-studies-hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("#case-studies");
                }}
              >
                <span className="text-label">VIEW OUR WORK</span>
              </Button>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 order-1 lg:order-2 lg:pt-32 pt-12">
            <Image
              src={imageSrc}
              alt="Raid Guild Hero"
              width={632}
              height={632}
              className="w-full max-w-[632px] h-auto mx-auto"
              style={{ width: "100%", height: "auto", maxWidth: "632px" }}
              sizes="(min-width: 1024px) 632px, 100vw"
            />
          </div>
        </div>
      </div>

      {/* Partner Logo Banner */}
      <div className="container-custom mt-10 mb-1">
        <p className="text-body-lg text-moloch text-left w-full italic">
          Partners, clients, and member-built DApps
        </p>
      </div>
      <PartnerLogoBanner />
    </section>
  );
}
