"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { services } from "@/lib/data/content";

const servicesImages = [
  "/images/services-image-1-bw.png",
  "/images/services-image-1-c.png",
  "/images/services-image-2-bw.png",
  "/images/services-image-2-c.png",
];

export default function ServicesSection() {
  const [imageSrc, setImageSrc] = useState(servicesImages[0]);

  useEffect(() => {
    const now = Date.now();
    const seconds = Math.floor(now / 30000); // Changes every 30 seconds
    setImageSrc(servicesImages[seconds % servicesImages.length]);
  }, []);

  return (
    <section id="services" className="relative">
      <div className="container-custom relative min-h-[843px]">
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none max-w-[632px]">
          <Image
            src={imageSrc}
            alt="Services Background"
            width={632}
            height={843}
            className="h-auto object-contain object-bottom"
            priority={false}
          />
        </div>
        <div className="relative z-10 pt-24 pb-44">
          <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center mb-[60px]">
            <h2 className="text-heading-lg text-moloch-500 mb-8">
              Arsenal of Expertise
            </h2>
            <p className="text-body-lg">
              Epic skills wielded by Web3 warriors. Precision tools for
              decentralized dominance. Mastery unmatched
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-4">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  bodyText={service.bodyText}
                  iconSrc={service.iconSrc}
                  iconAlt={service.iconAlt}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
