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
  "/images/mercenaries-image-1-bw.png",
  "/images/mercenaries-image-1-c.png",
  "/images/mercenaries-image-2-bw.png",
  "/images/mercenaries-image-2-c.png",
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
    <section id="mercenaries" className="py-24">
      <div className="container-custom relative min-h-[843px]">
        <div className="grid-custom gap-4">
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 ">
              {shuffledMercenaries.map((mercenary) => {
                const link = mercenary.link || "https://x.com/RaidGuild";
                const isOpen = openTooltipId === mercenary.name;

                const handleClick = (e: React.MouseEvent) => {
                  // On mobile (touch devices), first click opens tooltip, second click follows link
                  if (window.matchMedia("(hover: none)").matches) {
                    if (!isOpen) {
                      e.preventDefault();
                      setOpenTooltipId(mercenary.name);
                    }
                    // If already open, let the link work normally
                  }
                };

                return (
                  <Tooltip key={mercenary.name} open={isOpen} onOpenChange={(open) => {
                    if (!open) setOpenTooltipId(null);
                    else setOpenTooltipId(mercenary.name);
                  }}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                        onClick={handleClick}
                      >
                        <div className="relative w-[72px] h-[72px] rounded-md overflow-hidden border-2 border-scroll-100 bg-scroll-100">
                          <Image
                            src={mercenary.imagePath}
                            alt={mercenary.name}
                            fill
                            className="object-cover"
                            sizes="72px"
                          />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs bg-moloch-800 p-2"
                    >
                      <div className="flex flex-col gap-1 text-body-md leading-none text-center">
                        <p className="leading-none text-base font-bold">{mercenary.name}</p>
                        <p className="text-sm leading-none">{mercenary.title}</p>
                      </div>
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
            />
            <div className="flex flex-col gap-8 w-full">
              <p className="text-body-lg text-moloch-800 text-center">
                Have questions or ready to start a project? We&apos;re here to
                help you achieve your goals and bring your vision to life.
              </p>
              <div className="flex gap-4">
                <Button variant="primary" className="flex-1">
                  <a href="#hire-us" className="text-label text-scoll-100">
                    HIRE US
                  </a>
                </Button>
                <Button variant="secondary" className="flex-1">
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
