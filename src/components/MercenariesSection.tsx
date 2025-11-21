"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { mercenaries, type Mercenary } from "@/lib/data/members";

const mercenariesImages = [
  "/images/mercenaries-image-1-bw.webp",
  "/images/mercenaries-image-1-c.webp",
  "/images/mercenaries-image-2-bw.webp",
  "/images/mercenaries-image-2-c.webp",
];

function shuffleArray(array: Mercenary[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MercenariesSection() {
  const [shuffledMercenaries, setShuffledMercenaries] =
    useState<Mercenary[]>([]);
  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);

  // Deterministic image selection based on 20-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 20)); // 20 minutes
  const imageSrc = mercenariesImages[interval % mercenariesImages.length];

  useEffect(() => {
    // Shuffle on client side only to avoid hydration mismatch, limit to 24
    const shuffled = shuffleArray(mercenaries);
    setShuffledMercenaries(shuffled.slice(0, 24));
  }, []);

  return (
    <section id="mercenaries" className="relative">
      <div className="container-custom relative min-h-[953px]">
        <div className="grid-custom gap-4 py-12 lg:py-24">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Image
              src={imageSrc}
              alt="Mercenaries"
              width={632}
              height={632}
              className="w-full max-w-[632px] h-auto mx-auto"
              style={{ width: '100%', height: 'auto', maxWidth: '632px' }}
              sizes="(min-width: 1024px) 632px, 100vw"
            />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-[60px]">
            <div className="text-center">
              <h2 className="text-heading-lg mb-8">Meet Your Mercenaries</h2>
              <p className="text-body-lg text-moloch-800">
                Elite operators with specialized expertise and proven chops.
                Battle-tested talent. Uncompromising quality.
              </p>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 ">
              {shuffledMercenaries.map((mercenary) => {
                const link = mercenary.link || "https://x.com/RaidGuild";
                const isOpen = openTooltipId === mercenary.name;
                const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 1023px)").matches;

                const handleClick = (e: React.MouseEvent) => {
                  // On mobile and tablet (below lg breakpoint), first tap opens tooltip only
                  if (window.matchMedia("(max-width: 1023px)").matches) {
                    e.preventDefault();
                    if (!isOpen) {
                      setOpenTooltipId(mercenary.name);
                    }
                  }
                  // On desktop (lg and above), single click follows the link
                };

                return (
                  <Tooltip key={mercenary.name} open={isOpen} onOpenChange={(open) => {
                    if (!open) setOpenTooltipId(null);
                    else setOpenTooltipId(mercenary.name);
                  }}>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center gap-2 cursor-pointer group">
                        {isMobile ? (
                          <button
                            onClick={handleClick}
                            className="relative w-[72px] h-[72px] rounded-md overflow-hidden border-2 border-scroll-100 bg-scroll-100"
                          >
                            <Image
                              src={mercenary.imagePath}
                              alt={mercenary.name}
                              fill
                              className="object-cover"
                              sizes="72px"
                            />
                          </button>
                        ) : (
                          <Link
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-[72px] h-[72px] rounded-md overflow-hidden border-2 border-scroll-100 bg-scroll-100 block"
                          >
                            <Image
                              src={mercenary.imagePath}
                              alt={mercenary.name}
                              fill
                              className="object-cover"
                              sizes="72px"
                            />
                          </Link>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs bg-moloch-800 p-0 lg:p-2"
                    >
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 lg:p-2 lg:pointer-events-none"
                      >
                        <div className="flex flex-col leading-none text-center">
                          <p className="leading-none text-base font-bold mb-1">{mercenary.name}</p>
                          <p className="text-sm leading-none mb-1">{mercenary.title}</p>
                          <p className="text-sm text-scroll-100 hover:text-moloch-500 transition-colors lg:hidden mt-0.5 underline italic">
                            Delve
                          </p>
                        </div>
                      </Link>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
            <Image
              src="/images/mercenaries-divider.svg"
              alt="Divider"
              width={450}
              height={28}
              className="hidden lg:block"
            />
            <div className="flex flex-col gap-8 w-full">
              <p className="text-body-lg text-moloch-800 text-center">
                Have questions or ready to start a project? We&apos;re here to
                help you achieve your goals and bring your vision to life.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="primary" className="w-full md:flex-1">
                  <a href="#hire-us" className="text-label text-scoll-100">
                    HIRE US
                  </a>
                </Button>
                <Button variant="secondary" className="w-full md:flex-1">
                  <a href="#testimonials" className="text-label">
                    WHAT OTHERS SAY
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
