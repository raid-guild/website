"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { clientData } from "@/lib/data/clients";

const portfolioImages = [
  "/images/portfolio-image-1-bw.png",
  "/images/portfolio-image-1-c.png",
  "/images/portfolio-image-2-bw.png",
  "/images/portfolio-image-2-c.png",
];

type Client = (typeof clientData)[number];

const ITEM_SHIFT_PERCENT = 51;

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="bg-scroll-100 rounded-md overflow-hidden">
      <div className="bg-moloch-800 p-8 flex items-center h-32">
        <Image
          src={client.logo}
          alt={client.title}
          width={client.logoWidth}
          height={0}
        />
      </div>
      <div className="bg-scroll-700 p-12 border-t-2 border-moloch-500 flex flex-col">
        <h3 className="text-heading-md text-scroll-100 mb-4">{client.title}</h3>
        <p className="text-body-lg text-scroll-100 mb-8 flex-grow">
          {client.description}
        </p>
        <div className="flex gap-2.5 flex-wrap">
          {client.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImageSrc, setBackgroundImageSrc] = useState(portfolioImages[0]);

  useEffect(() => {
    const now = Date.now();
    const seconds = Math.floor(now / 30000); // Changes every 30 seconds
    setBackgroundImageSrc(portfolioImages[seconds % portfolioImages.length]);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clientData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + clientData.length) % clientData.length
    );
  };

  return (
    <section id="case-studies" className="relative">
      <div className="container-custom relative min-h-[843px]">
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none max-w-[632px]">
          <Image
            src={backgroundImageSrc}
            alt="Portfolio Background"
            width={632}
            height={843}
            className="h-auto object-contain object-bottom"
            priority={false}
          />
        </div>
        <div className="relative z-10 py-24">
          <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center mb-[60px]">
            <h2 className="text-heading-lg mb-8">Completed Quests</h2>
            <p className="text-body-lg">
              Legendary campaigns executed with precision and proven results.
              War-forged strategies. Total precision.
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="relative hidden lg:block">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-4"
                  style={{
                    transform: `translateX(-${currentIndex * ITEM_SHIFT_PERCENT}%)`,
                  }}
                >
                  {clientData.map((client) => (
                    <div key={client.id} className="flex-shrink-0 w-1/2">
                      <ClientCard client={client} />
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 z-10 hover:opacity-80 transition-opacity"
                aria-label="Previous slide"
              >
                <Image
                  src="/images/portfolio-arrow-left.svg"
                  alt="Previous"
                  width={23}
                  height={26}
                />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 z-10 hover:opacity-80 transition-opacity"
                aria-label="Next slide"
              >
                <Image
                  src="/images/portfolio-arrow-right.svg"
                  alt="Next"
                  width={23}
                  height={26}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
              {clientData.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
