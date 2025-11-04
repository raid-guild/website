"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { shuffledMercenaries } from "@/lib/data/members";

export default function MercenariesSection() {

  return (
    <section id="mercenaries" className="py-24">
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
              <h2 className="text-heading-lg font-bold text-moloch-800 mb-4">
                Meet Your Mercenaries
              </h2>
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
                    <div className="flex flex-col gap-1">
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

      {/* Mercenaries Scroller */}
      <div className="bg-[#534A13] border-t-[10px] border-moloch-800 py-5 overflow-hidden mt-24">
        <div className="flex gap-4 justify-center items-center">
          {shuffledMercenaries.map((mercenary) => (
            <div key={mercenary.name} className="flex items-center gap-8">
              <div className="w-8 h-8 border border-scroll-100 rounded"></div>
              <span className="text-heading-sm text-scroll-100 whitespace-nowrap">
                {mercenary.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
