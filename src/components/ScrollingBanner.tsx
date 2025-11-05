"use client";

import Image from "next/image";

export type BannerItem =
  | string
  | {
      src: string;
      alt: string;
      width: number;
      height: number;
      label?: string; // optional label if you want text next to image
    };

interface ScrollingBannerProps {
  items: BannerItem[];
  bgColor?: string; // Tailwind class for background
  borderColor?: string; // Tailwind class for top border
  gap?: string; // Tailwind gap-x
  scrollDuration?: number; // seconds
  textColor?: string;
}

export default function ScrollingBanner({
  items,
  bgColor = "bg-gray-800",
  borderColor = "border-gray-600",
  gap = "gap-10",
  scrollDuration = 30,
  textColor = "text-scroll-100",
}: ScrollingBannerProps) {
  // Duplicate items for seamless looping
  const duplicatedItems = [...items, ...items].map((item, i) => ({
    item,
    key: `item-${i}-${typeof item === "string" ? item : item.src}`,
  }));

  return (
    <div
      className={`${bgColor} border-t-[10px] ${borderColor} py-5 overflow-hidden`}
    >
      <div
        className={`flex items-center ${gap} animate-scroll`}
        style={{
          animationDuration: `${scrollDuration}s`,
          width: "max-content",
        }}
      >
        {duplicatedItems.map(({ item, key }) => (
          <div key={key} className={`flex items-center flex-shrink-0`}>
            {typeof item === "string" ? (
              <span
                className={`text-body-lg font-bold ${textColor} whitespace-nowrap`}
              >
                {item}
              </span>
            ) : (
              <>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  priority
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
