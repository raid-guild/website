import Image from "next/image";
import TimelineAccordion from "./TimelineAccordion";

export default function OurStorySection() {
  return (
    <section id="our-story" className="py-24">
      <div className="container-custom">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-16">
            <div>
              <h2 className="text-heading-lg text-[#534A13] mb-4">Our Story</h2>
              <p className="text-body-lg text-[#534A13]">
                From rebels to builders of the sovereign internet, RaidGuild was
                born in the fires of decentralization to slay Moloch and create
                tools and systems that return power to the people.
              </p>
            </div>
            <Image
              src="/images/art-divider-1.svg"
              alt="Divider"
              width={492}
              height={39}
              className="my-16"
            />
            <div>
              <h2 className="text-heading-lg text-[#534A13] mb-4">
                Join the Guild
              </h2>
              <p className="text-body-lg text-[#534A13] mb-8">
                Ready to join the ranks? Our Cohort Onboarding Program is the
                gateway into Raid Guild—where the finest builders shape the
                future of Web3.
              </p>
              <div className="flex gap-4">
                <button className="bg-moloch-400 text-[#F1EFEE] px-8 py-3 rounded-md text-label">
                  APPLY TO A COHORT
                </button>
                <button className="bg-scroll-100 border-2 border-moloch-800 text-moloch-800 px-8 py-3 rounded-md text-label">
                  JOIN DISCORD
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-16">
            <TimelineAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
