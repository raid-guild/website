"use client";

import Image from "next/image";

// 18 logos organized into 6 slots with 3 logos each
const logoSlots = [
  // Slot 1: delay 0s
  [
    { src: "/images/logo-brightid.svg", alt: "BrightID" },
    { src: "/images/logo-collabland.svg", alt: "Collab.Land" },
    { src: "/images/logo-cookiejar.svg", alt: "CookieJar" },
  ],
  // Slot 2: delay 6s
  [
    { src: "/images/logo-daohaus.svg", alt: "DAOHaus" },
    { src: "/images/logo-delegatematch.svg", alt: "DelegateMatch" },
    { src: "/images/logo-Gitcoin.svg", alt: "Gitcoin" },
  ],
  // Slot 3: delay 3s
  [
    { src: "/images/logo-Gnosis.svg", alt: "Gnosis" },
    { src: "/images/logo-hats.svg", alt: "Hats" },
    { src: "/images/logo-Hypercerts.svg", alt: "Hypercerts" },
  ],
  // Slot 4: delay 1s
  [
    { src: "/images/logo-metacartel.svg", alt: "MetaCartel" },
    { src: "/images/logo-metafactory.svg", alt: "MetaFactory" },
    { src: "/images/logo-metagame.svg", alt: "MetaGame" },
  ],
  // Slot 5: delay 5s
  [
    { src: "/images/logo-Pocket.svg", alt: "Pocket Network" },
    { src: "/images/logo-Protocol.svg", alt: "Protocol Labs" },
    { src: "/images/logo-publicnouns.svg", alt: "Public Nouns" },
  ],
  // Slot 6: delay 2s
  [
    { src: "/images/logo-skungkwurks.svg", alt: "Skunkworks" },
    { src: "/images/logo-ultimatedominion.svg", alt: "Ultimate Dominion" },
    { src: "/images/logo-Unlock.svg", alt: "Unlock Protocol" },
  ],
];

// Animation delays for each slot (in seconds)
const slotDelays = [0, 6, 3, 1, 5, 2];

export default function PartnerLogoBanner() {
  return (
    <div
      id="partner-logo-banner"
      className="bg-foreground border-t-[10px] border-primary py-5"
    >
      <div className="container-custom">
        {/* 12-column grid: 92px columns, 16px gap, max-width 1280px */}
        {/* Desktop (1280px): 12 columns → 6 slots (2 columns each) */}
        {/* Tablet (768px): 6 columns → 6 slots (1 column each, 2 rows) */}
        {/* Mobile (320px+): 3 columns → 6 slots (varies, multiple rows) */}
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4 max-w-[1280px] mx-auto">
          {logoSlots.map((slot, slotIndex) => (
            <div
              key={slotIndex}
              className="col-span-1 md:col-span-1 lg:col-span-2 relative h-[60px] flex items-center justify-center"
            >
              {/* Each slot contains 3 logos stacked with absolute positioning */}
              {slot.map((logo, logoIndex) => {
                const delay = slotDelays[slotIndex] + logoIndex * 8;
                return (
                  <div
                    key={logoIndex}
                    className="absolute inset-0 flex items-center justify-center animate-logo-rotate"
                    style={{
                      animationDelay: `${delay}s`,
                      opacity: 0,
                    }}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={92}
                      height={60}
                      className="h-8 w-auto object-contain"
                      priority={slotIndex === 0 && logoIndex === 0}
                    />
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
