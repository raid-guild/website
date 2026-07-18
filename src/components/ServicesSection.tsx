"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { Button } from "./ui/button";
import { services } from "@/lib/data/content";

const servicesImages = [
  "/images/services-image-1-bw.webp",
  "/images/services-image-1-c.webp",
  "/images/services-image-2-bw.webp",
  "/images/services-image-2-c.webp",
];

export default function ServicesSection() {
  // Deterministic image selection based on 12-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 12)); // 12 minutes
  const imageSrc = servicesImages[interval % servicesImages.length];

  return (
    <section id="services" className="relative">
      <div className="container-custom relative min-h-[953px]">
        <div className="absolute top-0 md:bottom-0 md:top-auto left-0 z-0 pointer-events-none max-w-[632px]">
          <Image
            src={imageSrc}
            alt="Services Background"
            width={632}
            height={843}
            className="h-auto object-contain object-bottom"
            priority={false}
          />
        </div>
        <div className="relative z-10 pt-[520px] pb-[60px] md:pt-24 md:pb-44 lg:pt-24 lg:pb-44">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center lg:text-left mb-6 lg:mb-12">
              <p className="text-label-sm text-neutral-600 mb-2">Our Services</p>
              <h2 className="text-heading-lg text-moloch-500 mb-8">
                Arsenal of Expertise
              </h2>
              <p className="text-body-lg mb-3">
                Five service lines. One team assembled per project.
              </p>
              <p className="text-body-lg mb-3">
                Epic skills wielded by Web3 warriors.<br />Precision tools for
                decentralized dominance. Mastery unmatched.
              </p>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center lg:text-left mb-6 lg:mb-12">
              <p className="text-label-sm text-neutral-600 mb-2">&nbsp;</p>

              <h2 className="text-heading-lg text-moloch-500 mb-8">
                Looking for AI Solutions?
              </h2>
              <p className="text-body-lg mb-3">
                Forward Deployed AI Mercenaries.<br />Intelligence embedded where
                the work gets done.
              </p>
              <div className="flex flex-col gap-8">
                <p className="text-body-lg">
                  We place AI engineers inside your team to build and run
                  practical AI workflows.
                </p>

                <Button
                  asChild
                  variant="primary"
                  className="w-full lg:w-2/3"
                  data-click="services-raidguild-ai"
                  data-click-location="services_section"
                  data-click-destination="https://www.raidguild.ai/"
                  rightIcon={<ExternalLink aria-hidden="true" />}
                >
                  <a
                    href="https://www.raidguild.ai/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-label text-scroll-100">
                      EXPLORE AI SOLUTIONS
                    </span>
                  </a>
                </Button>
              </div>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-4">
                {services.map((service, index) => (
                  <div key={index}>
                    <ServiceCard
                      title={service.title}
                      bodyText={service.bodyText}
                      iconSrc={service.iconSrc}
                      iconAlt={service.iconAlt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
