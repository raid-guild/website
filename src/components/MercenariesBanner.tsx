"use client";

import Image from "next/image";
import { mercenaries, type Mercenary } from "@/lib/data/members";

// Organize 22 mercenaries into 6 slots (4, 4, 4, 4, 3, 3)
function organizeMercenariesIntoSlots(mercenaries: Mercenary[]) {
  const slots: Mercenary[][] = [];
  for (let i = 0; i < mercenaries.length; i += 4) {
    slots.push(mercenaries.slice(i, i + 4));
  }
  // Adjust last slots to have 3 items each if needed
  if (slots.length > 4 && slots[slots.length - 1].length < 3) {
    const last = slots.pop()!;
    const secondLast = slots[slots.length - 1];
    secondLast.push(...last);
  }
  // Ensure last two slots have 3 items
  while (slots.length > 6) {
    const last = slots.pop()!;
    const secondLast = slots[slots.length - 1];
    secondLast.push(...last);
  }
  if (slots.length === 5) {
    // Split last slot into two slots of 3
    const last = slots.pop()!;
    const mid = Math.ceil(last.length / 2);
    slots.push(last.slice(0, mid), last.slice(mid));
  }
  return slots;
}

// Animation delays for each slot (in seconds)
const slotDelays = [0, 6, 3, 1, 5, 2];

export default function MercenariesBanner() {
  const mercenarySlots = organizeMercenariesIntoSlots(mercenaries);

  return (
    <div className="bg-[#534A13] border-t-[10px] border-moloch-800 py-5 overflow-hidden mt-24">
      <div className="flex gap-20 w-full">
        {mercenarySlots.map((slot, slotIndex) => (
          <div key={slotIndex} className="flex gap-20">
            {slot.map((mercenary: Mercenary, mercenaryIndex: number) => {
              const delay = slotDelays[slotIndex] + mercenaryIndex * 8;
              return (
                <div
                  key={`${mercenary.name}-${slotIndex}-${mercenaryIndex}`}
                  className="flex items-center gap-4 animate-logo-rotate"
                  style={{
                    animationDelay: `${delay}s`,
                    opacity: 0,
                  }}
                >
                  {mercenary.roleIcon && (
                    <Image
                      src={mercenary.roleIcon}
                      alt={mercenary.name}
                      width={31}
                      height={31}
                      className="w-8 h-8"
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
  );
}
