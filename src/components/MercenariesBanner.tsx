"use client";

import Image from "next/image";
import { mercenaries, type Mercenary } from "@/lib/data/members";

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
  const mercenarySlots = organizeMercenariesIntoSlots(mercenaries);

  return (
    <div className="bg-scroll-700 border-t-[10px] border-moloch-800 min-h-24 flex items-center">
      <div className="container-custom">
        <div className="grid-custom gap-4">
          {mercenarySlots.map((slot, slotIndex) => (
            <div
              key={slotIndex}
              className="col-span-1 md:col-span-1 lg:col-span-2 relative h-[60px] flex items-center justify-center"
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
          ))}
        </div>
      </div>
    </div>
  );
}
