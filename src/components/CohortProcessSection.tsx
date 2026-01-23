"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const processImages = [
  "/images/process-image-1-bw.webp",
  "/images/process-image-1-c.webp",
  "/images/process-image-2-bw.webp",
  "/images/process-image-2-c.webp",
];

// Week 1 accordion items (5 days)
const weekOneItems = [
  {
    year: "",
    title: "Day 1 - The Tavern Opens",
    desc: "Open to all who seek entry. RaidGuild orientation, introductions, and expectation setting. Receive your Cohort role and access to guild channels.",
  },
  {
    year: "",
    title: "Day 2 - Raider Showcase",
    desc: "Meet the veteran mercenaries. See how seasoned members operate. Join the weekly All Hands and witness the guild in action.",
  },
  {
    year: "",
    title: "Day 3 - Tales of Glory",
    desc: "Last month's cohort presents at Demo Day. Watch them recount their completed missions—your benchmark for what's possible.",
  },
  {
    year: "",
    title: "Day 4 - Ideation & Workshops",
    desc: "Strategy sessions and skill-building training. Begin charting what you'll build.",
  },
  {
    year: "",
    title: "Day 5 - Choose Your Mission",
    desc: "Project selection and team formation. Some missions have full crews and clear maps. Others need pathfinders—you'll help chart the course. Choose wisely.",
  },
];

// Journey accordion items (5 items)
const journeyItems = [
  {
    year: "",
    title: "Weeks 2-4: The Campaign",
    desc: "Build. Learn. Conquer.\n\nExecute your mission with your party. Seek counsel from mentors. Join open sessions and knowledge shares. The trustless realm is treacherous—this is where you prove your mettle.",
  },
  {
    year: "",
    title: "Fast Track",
    desc: "Already battle-tested? Skip the cohort mission and advance straight into paid client raids.",
  },
  {
    year: "",
    title: "Week 5: Demo Day",
    desc: "Your moment. Recount your deeds.\n\nPresent your achievements to RaidGuild members. Demonstrate your valor and unlock the door to what comes next.",
  },
  {
    year: "",
    title: "Beyond the Cohort",
    desc: "- Take on paid client raids and earn competitive bounties\n- Join internal guild initiatives known as RIPs\n- Champion your own projects and secure guild backing\n- Build relationships with members who can sponsor your full membership",
  },
  {
    year: "",
    title: "Full Membership: The Citadel",
    desc: "Earned, not given.\n\nYou need a champion—a current member who stakes their honor on you. Once sponsored and approved, you gain voting rights, profit-sharing, and complete guild access. No timeline. Just consistent quality work.",
  },
];

// Icons for Week 1 accordions (5 icons)
const weekOneIconNames = [
  "community",
  "raidguild",
  "education",
  "learningnewthings",
  "consultations",
];

// Icons for Journey accordions (5 icons)
const journeyIconNames = [
  "fullstackdev",
  "tipofthespear",
  "designsprints",
  "daodesign",
  "cartelculture",
];

export default function CohortProcessSection() {
  // Deterministic image selection based on 18-minute intervals
  const interval = Math.floor(Date.now() / (1000 * 60 * 18));
  const imageSrc = processImages[interval % processImages.length];

  return (
    <section id="cohort-process" className="relative bg-moloch-800">
      <div className="container-custom relative min-h-[953px]">
        {/* Image on the left side */}
        <div className="absolute top-0 md:bottom-0 md:top-auto lg:top-0 lg:bottom-auto left-0 z-0 pointer-events-none max-w-[632px]">
          <Image
            src={imageSrc}
            alt="Process Background"
            width={632}
            height={843}
            className="object-contain object-bottom"
            priority={false}
          />
        </div>

        <div className="relative z-10 pt-[520px] pb-12 md:py-12 lg:py-24">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Empty column for image spacing on left */}
            <div className="hidden lg:col-span-6 lg:flex lg:justify-center"></div>

            {/* Accordions on the right */}
            <div className="flex flex-col gap-8 lg:col-span-6">
              <div className="text-center lg:text-left">
                <h2 className="text-heading-lg text-scroll-100 mb-8">
                  Your Path to Membership
                </h2>
                <p className="text-body-lg text-scroll-200">
                  From the tavern to the citadel—a structured journey where you
                  prove yourself through completed work, not promises.
                </p>
              </div>

              {/* First accordion set - Week 1 */}
              <div>
                <h3 className="text-heading-sm text-scroll-100 mb-4">
                  Week 1: Assembly
                </h3>
                <p className="text-body-md text-scroll-200 mb-4">
                  Daily sessions. Meet your crew. Forge your path.
                </p>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {weekOneItems.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`week1-${idx}`}
                      className="rounded-md overflow-hidden"
                    >
                      <AccordionTrigger className="bg-scroll-700 px-8 py-4 flex justify-between items-center hover:no-underline hover:bg-scroll-700 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md rounded-b-none [&>svg]:hidden">
                        <span className="text-scroll-100 font-display font-bold text-[20px] md:text-[28px] lg:text-[36px] leading-[1.4] md:leading-[1.3] lg:leading-[1.2]">
                          {item.title}
                        </span>
                        <Image
                          src={`/images/icon-og-${weekOneIconNames[idx]}.svg`}
                          alt={item.title}
                          width={36}
                          height={36}
                          className="w-9 h-9"
                          style={{ width: "36px", height: "36px" }}
                        />
                      </AccordionTrigger>
                      {item.desc && (
                        <AccordionContent className="bg-scroll-100 px-8 py-5 pt-5 pb-5 border-2 border-scroll-700 rounded-md rounded-t-none">
                          <p className="text-body-lg text-moloch-800 whitespace-pre-line">
                            {item.desc}
                          </p>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Second accordion set - Journey */}
              <div className="mt-8">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {journeyItems.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`journey-${idx}`}
                      className="rounded-md overflow-hidden"
                    >
                      <AccordionTrigger className="bg-scroll-700 px-8 py-4 flex justify-between items-center hover:no-underline hover:bg-scroll-700 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md rounded-b-none [&>svg]:hidden">
                        <span className="text-scroll-100 font-display font-bold text-[20px] md:text-[28px] lg:text-[36px] leading-[1.4] md:leading-[1.3] lg:leading-[1.2]">
                          {item.title}
                        </span>
                        <Image
                          src={`/images/icon-og-${journeyIconNames[idx]}.svg`}
                          alt={item.title}
                          width={36}
                          height={36}
                          className="w-9 h-9"
                          style={{ width: "36px", height: "36px" }}
                        />
                      </AccordionTrigger>
                      {item.desc && (
                        <AccordionContent className="bg-scroll-100 px-8 py-5 pt-5 pb-5 border-2 border-scroll-700 rounded-md rounded-t-none">
                          <p className="text-body-lg text-moloch-800 whitespace-pre-line">
                            {item.desc}
                          </p>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Two column section below */}
            <div className="lg:col-span-12 pt-6 md:pt-12 lg:pt-12">
              <h2 className="text-heading-lg text-scroll-100 mb-8 text-center">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left column */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-heading-sm text-scroll-100 mb-2">
                      Timeline
                    </h3>
                    <p className="text-body-md text-scroll-200">
                      Cohorts launch on the{" "}
                      <strong>first Monday of each month</strong>. Applications
                      reviewed on a rolling basis.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-heading-sm text-scroll-100 mb-2">
                      Time Commitment
                    </h3>
                    <ul className="text-body-md text-scroll-200 space-y-1">
                      <li>
                        <strong>Week 1</strong>: Daily sessions, 1-2 hours each
                      </li>
                      <li>
                        <strong>Weeks 2-4</strong>: 10-20 hours per week on
                        your mission
                      </li>
                      <li>
                        <strong>Demo Day</strong>: 2-3 hours
                      </li>
                      <li>
                        <strong>After</strong>: Flexible based on your
                        availability
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-heading-sm text-scroll-100 mb-2">
                      What This Demands
                    </h3>
                    <p className="text-body-md text-scroll-200">
                      No coin required upfront, but the cohort demands
                      dedication—your time, focus, and follow-through. This is
                      your opportunity to prove yourself alongside talented
                      builders.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-heading-sm text-scroll-100 mb-2">
                      After You Apply
                    </h3>
                    <p className="text-body-md text-scroll-200">
                      Strong applications receive word within 5-7 days. If
                      accepted, you&apos;ll receive your cohort invitation,
                      Discord access, and kickoff details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
