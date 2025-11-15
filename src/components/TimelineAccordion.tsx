"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface TimelineAccordionProps {
  items: TimelineItem[];
  iconNames: string[];
  startIndex?: number;
}

export default function TimelineAccordion({
  items,
  iconNames,
  startIndex = 0,
}: TimelineAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {items.map((item, idx) => {
        const globalIndex = startIndex + idx;
        return (
          <AccordionItem
            key={globalIndex}
            value={`item-${globalIndex}`}
            className="rounded-md overflow-hidden"
          >
            <AccordionTrigger className="bg-scroll-700 px-8 py-4 flex justify-between items-center hover:no-underline hover:bg-scroll-700 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md rounded-b-none [&>svg]:hidden">
              <span className="text-scroll-100 font-display font-bold text-[20px] md:text-[28px] lg:text-[36px] leading-[1.4] md:leading-[1.3] lg:leading-[1.2]">
                {item.year} {item.title}
              </span>
              <Image
                src={`/images/icon-og-${iconNames[globalIndex]}.svg`}
                alt={item.title}
                width={36}
                height={36}
                className="w-9 h-9"
                style={{ width: '36px', height: '36px' }}
              />
            </AccordionTrigger>
            {item.desc && (
              <AccordionContent className="bg-scroll-100 px-8 py-5 pt-5 pb-5 border-2 border-scroll-700 rounded-md rounded-t-none">
                <p className="text-body-lg text-moloch-800">{item.desc}</p>
              </AccordionContent>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
