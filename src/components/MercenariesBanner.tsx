"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { mercenaries, type Mercenary } from "@/lib/data/members";

// Shuffle function (same as MercenariesSection)
function shuffleArray(array: Mercenary[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Organize mercenaries into 6 slots with 4 items each (24 total displayed at a time)
function organizeMercenariesIntoSlots(mercenaries: Mercenary[]) {
  const slots: Mercenary[][] = [];
  for (let i = 0; i < mercenaries.length; i += 4) {
    slots.push(mercenaries.slice(i, i + 4));
  }
  return slots.slice(0, 6); // Only take first 6 slots
}

// Animation delays for each slot (in seconds)
const slotDelays = [0, 4, 3, 1, 5, 2];

export default function MercenariesBanner() {
  const [mercenarySlots, setMercenarySlots] = useState<Mercenary[][]>([]);

  useEffect(() => {
    // Shuffle on client side only to avoid hydration mismatch, limit to 24
    const shuffled = shuffleArray(mercenaries);
    const selected = shuffled.slice(0, 24);
    setMercenarySlots(organizeMercenariesIntoSlots(selected));
  }, []);

  // Don't render slots until they're loaded to prevent flash
  if (mercenarySlots.length === 0) {
    return (
      <div className="bg-scroll-700 border-t-[10px] border-moloch-800 min-h-24 flex items-center">
        <div className="container-custom">
          <div className="grid-custom gap-4" style={{ opacity: 0 }}>
            {/* Placeholder to maintain layout */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-scroll-700 border-t-[10px] border-moloch-800 min-h-24 flex items-center">
      <div className="container-custom">
        <div className="grid-custom gap-4">
          {mercenarySlots.map((slot, slotIndex) => {
            // For tablet: manual column positioning for 3 across (columns 1-2, 3-4, 5-6, then repeat)
            const tabletColClass =
              slotIndex % 3 === 0 ? 'md:col-start-1' :
              slotIndex % 3 === 1 ? 'md:col-start-3' :
              'md:col-start-5';
            return (
            <div
              key={slotIndex}
              className={`col-span-2 ${tabletColClass} md:col-span-2 lg:col-start-auto lg:col-span-2 relative h-[60px] flex items-center justify-center`}
            >
              {/* Each slot contains 4 mercenaries stacked with absolute positioning */}
              {slot.map((mercenary: Mercenary, mercenaryIndex: number) => {
                const delay = slotDelays[slotIndex] + mercenaryIndex * 8;
                return (
                  <div
                    key={`${mercenary.name}-${slotIndex}-${mercenaryIndex}`}
                    className="absolute inset-0 flex items-center justify-center gap-4 animate-mercenary-rotate"
                    style={{
                      animationDelay: `${delay}s`,
                      opacity: 0,
                    }}
                  >
                    {mercenary.roleIcon && (
                      <Image
                        src={mercenary.roleIcon}
                        alt={mercenary.name}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                        style={{ width: '32px', height: '32px' }}
                      />
                    )}
                    <p className="text-body-lg font-bold text-scroll-100 whitespace-nowrap">
                      {mercenary.name}
                    </p>
                  </div>
                );
              })}
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
