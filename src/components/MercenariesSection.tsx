"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mercenaries, type Mercenary } from "@/lib/data/members";

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
    useState<Mercenary[]>(mercenaries);

  useEffect(() => {
    // Shuffle on client side only to avoid hydration mismatch
    setShuffledMercenaries(shuffleArray(mercenaries));
  }, []);

  return (
    <section id="mercenaries" className="my-24">
      <div className="container-custom">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Image
              src="/images/mercenaries-image-1-c.png"
              alt="Mercenaries"
              width={632}
              height={632}
              className="min-w-[632px] h-auto"
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-full">
              {shuffledMercenaries.map((mercenary) => (
                <Tooltip key={mercenary.name}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="relative w-[68px] h-[68px] rounded-md overflow-hidden border-2 border-scroll-100 group-hover:border-moloch-400 transition-colors bg-scroll-100">
                        <Image
                          src={mercenary.imagePath}
                          alt={mercenary.name}
                          fill
                          className="object-cover"
                          sizes="68px"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-xs bg-moloch-800 p-5"
                  >
                    <div className="flex flex-col gap-1 text-code-md">
                      <p className="font-semibold">{mercenary.name}</p>
                      <p className="text-xs opacity-90">{mercenary.title}</p>
                      {mercenary.link && (
                        <Link
                          href={mercenary.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs underline opacity-80 hover:opacity-100 mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Profile
                        </Link>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
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
                <a
                  href="#hire-us"
                  className="flex-1 bg-moloch-400 text-scroll-100 px-8 py-3 rounded-md text-label transition-colors hover:bg-moloch-800 text-center"
                >
                  HIRE US
                </a>
                <a
                  href="#testimonials"
                  className="flex-1 bg-scroll-100 border-2 border-moloch-800 text-moloch-800 px-8 py-3 rounded-md text-label transition-colors hover:bg-moloch-800 hover:text-scroll-100 text-center"
                >
                  WHAT OTHERS SAY
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
