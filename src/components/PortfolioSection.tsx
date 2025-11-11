"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { clientData } from "@/lib/data/clients";

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clientData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + clientData.length) % clientData.length
    );
  };

  const getTransform = () => {
    // On mobile: 1 item visible (100% width each)
    // On desktop: 2 items visible (50% width each + 1rem gap)
    // For 2 items: each is 50%, gap is ~1.25% of 1280px container, so move by ~51%
    const itemWidth = isMobile ? 100 : 51;
    return `translateX(-${currentIndex * itemWidth}%)`;
  };

  return (
    <section id="case-studies" className="py-24">
      <div className="container-custom">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center mb-[60px]">
            <h2 className="text-heading-lg mb-8">Completed Quests</h2>
            <p className="text-body-lg">
              Legendary campaigns executed with precision and proven results.
              War-forged strategies. Total precision.
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-4"
                  style={{
                    transform: getTransform(),
                  }}
                >
                  {clientData.map((client) => (
                    <div
                      key={client.id}
                      className="flex-shrink-0 w-full md:w-1/2"
                    >
                      <div className="bg-scroll-100 rounded-md  overflow-hidden">
                        <div className="bg-moloch-800 p-8 h-[140px] flex items-center">
                          <Image
                            src={client.logo}
                            alt={client.title}
                            width={234}
                            height={80}
                            className="h-10 w-auto"
                          />
                        </div>
                        <div className="bg-scroll-700 p-12 border-t-2 border-moloch-500 h-[300px] flex flex-col">
                          <h3 className="text-heading-md text-scroll-100 mb-4">
                            {client.title}
                          </h3>
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
          </div>
        </div>
      </div>
    </section>
  );
}
