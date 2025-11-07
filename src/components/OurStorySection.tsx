import { timelineIconNames, timelineItems } from "@/lib/data/content";
import TimelineAccordion from "./TimelineAccordion";
import { Button } from "./ui/button";

export default function OurStorySection() {
  // Split timeline items: first 3 on left, remaining on right
  const leftTimelineItems = timelineItems.slice(0, 3);
  const rightTimelineItems = timelineItems.slice(3);

  return (
    <section id="our-story" className="my-24">
      <div className="container-custom">
        <div className="grid-custom gap-4">
          {/* Row 1: Our Story - 6 columns on left, empty on right (large) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-1 mb-[60px]">
            <h2 className="text-heading-lg text-moloch-500 mb-8 text-center">
              Our Story
            </h2>
            <p className="text-body-lg">
              From rebels to builders of the sovereign internet, RaidGuild was
              born in the fires of decentralization to slay Moloch and create
              tools and systems that return power to the people.
            </p>
          </div>

          {/* Row 2: Accordion - single merged accordion on medium/small, split on large */}
          {/* Single merged accordion for medium/small screens */}
          <div className="col-span-4 md:col-span-8 lg:hidden">
            <TimelineAccordion
              items={timelineItems}
              iconNames={timelineIconNames}
              startIndex={0}
            />
          </div>
          {/* Split accordion for large screens */}
          <div className="hidden lg:block col-span-6 lg:col-start-1">
            <TimelineAccordion
              items={leftTimelineItems}
              iconNames={timelineIconNames}
              startIndex={0}
            />
          </div>
          <div className="hidden lg:block col-span-6 lg:col-start-7">
            <TimelineAccordion
              items={rightTimelineItems}
              iconNames={timelineIconNames}
              startIndex={3}
            />
          </div>

          {/* Row 3: Join the Guild - 6 columns on right, empty on left (large) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:items-end">
            <div className="w-full">
              <h2 className="text-heading-lg text-moloch-500 mb-4 text-center">
                Join the Guild
              </h2>
              <p className="text-body-lg mb-8">
                Ready to join the ranks? Our Cohort Onboarding Program is the
                gateway into Raid Guild—where the finest builders shape the
                future of Web3.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="flex-">
                  <a
                    href="https://contact.raidguild.org/join-us"
                    target="_blank"
                    rel="noreferrer"
                    className="text-label text-scoll-100"
                  >
                    APPLY TO A COHORT
                  </a>
                </Button>
                <Button variant="secondary" className="flex-1 text-label">
                  <a
                    href="https://discord.gg/2vx47gT95y"
                    target="_blank"
                    rel="noreferrer"
                    className="text-label"
                  >
                    JOIN DISCORD
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
