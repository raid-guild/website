"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TimelineAccordion() {
  const timelineItems = [
    {
      year: "2019",
      title: "THE SPARK",
      desc: "Raid Guild was founded at ETHDenver by a group of passionate rebels to support the DAOHaus ecosystem.",
    },
    {
      year: "2020",
      title: "EXPANDING THE ARSENAL",
      desc: "Raid Guild built SmartInvoice, a milestone-based escrow system for trustless payments for Web3 freelancers and DAOs.",
    },
    {
      year: "2020",
      title: "SMART ESCROW LAUNCH",
      desc: "The first cohort introduced a structured onboarding and new member education process.",
    },
    {
      year: "2021",
      title: "Strengthening the Guild",
      desc: "The birth of $RAID token established an alignment mechanism for both clients and guild members.",
    },
    {
      year: "2022",
      title: "Aligning Forces",
      desc: "The fight against Moloch never ends. To stay ahead, we rebranded and refined our services. We remain committed to building public goods, strengthening DAOs and pushing Web3 into a permissionless future.",
    },
  ];

  const iconNames = [
    "designsprints",
    "tipofthespear",
    "manifesto",
    "cartelculture",
    "experimentation",
    "fullstackdev",
  ];

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {timelineItems.map((item, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx}`}
          className="border-2 border-[#534A13] rounded-md overflow-hidden border-b-2 last:border-b-2"
        >
          <AccordionTrigger className="bg-[#534A13] px-8 py-4 flex justify-between items-center hover:no-underline hover:bg-[#534A13] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md rounded-b-none [&>svg]:hidden">
            <span className="text-heading-sm text-scroll-100">
              {item.year} {item.title}
            </span>
            <Image
              src={`/images/icon-og-${iconNames[idx]}.svg`}
              alt={item.title}
              width={36}
              height={36}
              className="w-9 h-9"
            />
          </AccordionTrigger>
          {item.desc && (
            <AccordionContent className="bg-scroll-100 px-8 py-5 pt-0 pb-5">
              <p className="text-body-lg text-moloch-800">{item.desc}</p>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
