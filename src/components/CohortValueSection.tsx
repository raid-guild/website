"use client";

import Image from "next/image";
import { useState } from "react";
import SkillsBannerAlt from "./SkillsBannerAlt";

const arsenalImages = [
  "/images/arsenal-image-1-bw.webp",
  "/images/arsenal-image-1-c.webp",
  "/images/arsenal-image-2-bw.webp",
  "/images/arsenal-image-2-c.webp",
];

const valueData = [
  {
    id: 1,
    title: "Battle-Tested Builders",
    description:
      "Train alongside mercenaries who've conquered campaigns for Gitcoin, Gnosis, MetaCartel, and Unlock Protocol. Gain real experience on meaningful blockchain projects.",
    testimonial:
      "I journeyed from freelance designer to leading $50k raids in 4 months. The cohort revealed what's possible.",
    author: "Member Name",
    role: "Role",
  },
  {
    id: 2,
    title: "Build Reputation & Earn Bounties",
    description:
      "Every completed mission strengthens your reputation in the permissionless realm. Progress to paid raids and claim competitive bounties while sharpening your craft.",
    testimonial:
      "I met my co-founder in the cohort. We've been raiding together for over a year.",
    author: "Member Name",
    role: "Role",
  },
  {
    id: 3,
    title: "A Meritocracy, Not a Hierarchy",
    description:
      "No gatekeepers. No noble houses. Do what you vow. Deliver what you pledge. Earn your place through quality deeds.",
    testimonial:
      "I've ventured through a dozen distributed communities. RaidGuild is the only one where people truly build together.",
    author: "Member Name",
    role: "Role",
  },
];

type ValueItem = (typeof valueData)[number];

const ITEM_SHIFT_PERCENT = 51;

function ValueCard({ item }: { item: ValueItem }) {
  return (
    <div className="bg-scroll-100 rounded-md overflow-hidden">
      <div className="bg-scroll-700 p-4 flex items-center justify-center min-h-[80px]">
        <h3 className="text-heading-md text-scroll-100 text-center">
          {item.title}
        </h3>
      </div>
      <div className="bg-moloch-800 p-6 border-t-2 border-scroll-100 flex flex-col min-h-[280px]">
        <p className="text-body-lg text-scroll-100 mb-4 flex-grow">
          {item.description}
        </p>
        <div className="border-l-4 border-scroll-500 pl-4">
          <p className="text-body-lg text-scroll-200 italic mb-3">
            &ldquo;{item.testimonial}&rdquo;
          </p>
          <p className="text-body-md text-scroll-300">
            — {item.author}, {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CohortValueSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Deterministic image selection based on 19-minute intervals for arsenal section
  const arsenalInterval = Math.floor(Date.now() / (1000 * 60 * 19)); // 19 minutes
  const arsenalImageSrc = arsenalImages[arsenalInterval % arsenalImages.length];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % valueData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + valueData.length) % valueData.length);
  };

  return (
    <section id="cohort-value">
      {/* Section 1: Why Join the Guild? */}
      <div id="cohort-why" className="bg-scroll-100 py-12 lg:py-24">
        <div className="container-custom">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center mb-6 lg:mb-12">
              <h2 className="text-heading-lg text-moloch-800 mb-8">
                Why Join the Guild?
              </h2>
              <p className="text-body-lg text-moloch-700">
                We offer a fellowship forged in battle. Discover why builders
                across the realm choose to sharpen their blades and forge their
                legend with RaidGuild.
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              {/* Desktop Carousel */}
              <div className="relative hidden lg:block [&]:!hidden [&]:lg:!block">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out gap-4"
                    style={{
                      transform: `translateX(-${currentIndex * ITEM_SHIFT_PERCENT}%)`,
                    }}
                  >
                    {valueData.map((item) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0"
                        style={{ width: "calc(50% - 8px)" }}
                      >
                        <ValueCard item={item} />
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
              {/* Mobile/Tablet Grid */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 [&]:!grid [&]:lg:!hidden">
                {valueData.map((item) => (
                  <div key={item.id} className="col-span-4">
                    <ValueCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Banner */}
      <SkillsBannerAlt />

      {/* Section 2: Who Should Answer the Call */}
      <div id="cohort-call" className="bg-scroll-700 py-12 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <h2 className="text-heading-lg text-scroll-100 mb-8">
                Who Should Answer the Call?
              </h2>

              {/* The Arsenal We Seek */}
              <div className="mb-8">
                <h3 className="text-heading-md text-scroll-100 mb-4">
                  The Arsenal We Seek
                </h3>
                <div className="text-body-lg text-scroll-200 space-y-2">
                  <p>
                    <strong>Development Wizards:</strong> Frontend, Backend,
                    Smart Contracts, DevOps
                  </p>
                  <p>
                    <strong>Design Archers:</strong> UX, Visual Design, Brand
                    Strategy
                  </p>
                  <p>
                    <strong>Strategy Monks:</strong> Product Management, DAO
                    Consulting, Operations
                  </p>
                  <p>
                    <strong>Business Clerics:</strong> Account Management,
                    BizDev, Legal
                  </p>
                  <p>
                    <strong>Community Bards:</strong> Community Management,
                    Content, Marketing
                  </p>
                  <p>
                    <strong>Specialist Druids:</strong> Treasury Management,
                    Data Science, Analytics
                  </p>
                </div>
                <p className="text-body-lg text-scroll-200 mt-4">
                  <strong>Experience Level:</strong> Intermediate or higher.
                  We&apos;re not teaching fundamentals—show us deeds you&apos;re
                  proud of.
                </p>
              </div>

              {/* The Guild Code */}
              <div className="mb-8">
                <h3 className="text-heading-md text-scroll-100 mb-4">
                  The Guild Code
                </h3>
                <p className="text-body-lg text-scroll-200">
                  <strong>Honor your word. Deliver on your oath.</strong>{" "}
                  You&apos;re a fit if you take ownership and create solutions,
                  communicate with honesty and transparency, stand by your
                  commitments, lift your allies through collaboration, and care
                  deeply about the quality of your craft.
                </p>
              </div>

              {/* Self-Assessment */}
              <div>
                <h3 className="text-heading-md text-scroll-100 mb-4">
                  Self-Assessment
                </h3>
                <p className="text-body-lg text-scroll-200">
                  Can you commit 10-20 hours per week to the campaign? Do you
                  have victories that showcase your skills? Are you ready to be
                  judged by your deeds? Do you thrive charting your own course
                  in async realms? If yes, you&apos;re ready to raid.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <Image
                src={arsenalImageSrc}
                alt="Arsenal"
                width={632}
                height={843}
                className="w-full max-w-[632px] h-auto object-contain"
                style={{ width: "100%", height: "auto", maxWidth: "632px" }}
                sizes="(min-width: 1024px) 632px, 100vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
