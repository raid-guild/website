"use client";

import Image from "next/image";
import PartnerLogoBanner from "./PartnerLogoBanner";
import { Button } from "./ui/button";

const homeImages = [
  "/images/home-image-1-bw.png",
  "/images/home-image-1-c.png",
  "/images/home-image-2-bw.png",
  "/images/home-image-2-c.png",
];

export default function HomeHero() {
  // Deterministic image selection based on 10-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 10)); // 10 minutes
  const imageSrc = homeImages[interval % homeImages.length];

  return (
    <section id="about" className="relative">
      <div className="container-custom min-h-[843px]">
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
            <div className="flex gap-4 flex-wrap w-full">
              <Button variant="primary" className="flex-1">
                <a href="#hire-us" className="text-label text-scoll-100">
                  SUMMON A RAID
                </a>
              </Button>
              <Button variant="secondary" className="flex-1">
                <a href="#case-studies" className="text-label">
                  VIEW OUR WORK
                </a>
              </Button>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 order-1 lg:order-2">
            <Image
              src={imageSrc}
              alt="Raid Guild Hero"
              width={632}
              height={632}
              className="w-full max-w-[632px] h-auto mx-auto"
              style={{ width: '100%', height: 'auto', maxWidth: '632px' }}
              sizes="(min-width: 1024px) 632px, 100vw"
            />
          </div>
        </div>
      </div>

      {/* Partner Logo Banner */}
      <div className="container-custom mt-10 mb-2">
        <p className="text-body-lg text-moloch text-left w-full">
          RaidGuild friends, partners, clients, allies, spawned protocol
          ecosystem
        </p>
      </div>
      <PartnerLogoBanner />
    </section>
  );
}
