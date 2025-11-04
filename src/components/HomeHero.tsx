"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const homeImages = [
  "/images/home-image-1-bw.png",
  "/images/home-image-1-c.png",
  "/images/home-image-2-bw.png",
  "/images/home-image-2-c.png",
];

export default function HomeHero() {
  const [imageSrc, setImageSrc] = useState(homeImages[0]);

  useEffect(() => {
    // Randomly select an image on mount/refresh
    const randomIndex = Math.floor(Math.random() * homeImages.length);
    setImageSrc(homeImages[randomIndex]);
  }, []);

  return (
    <section id="about" className="relative">
      <div className="container-custom mb-9">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-[60px]">
            <div className="flex flex-col gap-10">
              <h1 className="text-heading-lg font-bold text-moloch-800 text-center pt-44">
                BUILDING WEB3
                <br />
                ONE RAID AT A TIME
              </h1>
              <p className="text-body-lg font-bold text-moloch-800 text-center">
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
              <button className="flex-1 bg-moloch-400 text-[#F1EFEE] px-8 py-3 rounded-md text-label">
                SUMMON A RAID
              </button>
              <button className="flex-1 bg-scroll-100 border-2 border-moloch-800 text-moloch-800 px-8 py-3 rounded-md text-label">
                VIEW OUR WORK
              </button>
            </div>
            <div>
              <p className="text-body-lg text-moloch-800 text-center">
                RaidGuild friends, partners, clients, allies, spawned protocol
                ecosystem
              </p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Image
              src={imageSrc}
              alt="Raid Guild Hero"
              width={632}
              height={632}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Partner Logo Banner */}
      <div
        id="partner-logo-banner"
        className="bg-moloch-400 border-t-[10px] border-[#534A13] py-5"
      >
        <div className="container-custom">
          <div className="flex items-center justify-center gap-16">
            <Image
              src="/images/logo-daohaus.svg"
              alt="DAOHaus"
              width={200}
              height={30}
              className="h-8 w-auto"
            />
            <Image
              src="/images/logo-Gitcoin.svg"
              alt="Gitcoin"
              width={200}
              height={30}
              className="h-8 w-auto"
            />
            <Image
              src="/images/logo-Gnosis.svg"
              alt="Gnosis"
              width={200}
              height={30}
              className="h-8 w-auto"
            />
            <Image
              src="/images/logo-Unlock.svg"
              alt="Unlock"
              width={200}
              height={30}
              className="h-8 w-auto"
            />
            <Image
              src="/images/logo-Pocket.svg"
              alt="Pocket"
              width={200}
              height={30}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
