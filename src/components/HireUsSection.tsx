import Image from "next/image";
import HireUsForm from "./HireUsForm";

export default function HireUsSection() {
  return (
    <section id="hire-us" className="py-24">
      <div className="container-custom">
        <div className="grid-custom gap-4 flex items-start">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 mb-[60px]">
            <h2 className="text-heading-lg font-bold text-moloch-400 mb-4">
              Ready to Build Something Legendary?
            </h2>
            <p className="text-body-lg text-[#534A13]">
              We operate as a DAO-powered Guild. Our members are experienced
              Web3 builders who collaborate on projects based on reputation and
              expertise. Every project gets a custom-assembled team with the
              exact skills you need.
            </p>
          </div>
          <div className="col-span-8 md:col-span-4 lg:col-span-6 flex justify-end">
            <Image
              src="/images/Logomark.svg"
              alt="Raid Guild"
              width={169}
              height={159}
              className="flex-shrink-0"
            />
          </div>
        </div>

        <div className="grid-custom gap-4 flex items-start">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 mb-[60px]">
            <h3 className="text-heading-lg font-bold text-moloch-400 mb-4">
              How It Works
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-body-lg text-[#534A13] font-semibold mb-2">
                  Step 1: Submit Your Request
                </h4>
                <p className="text-body-md text-[#534A13]">
                  Use this form to share your project requirements. The more
                  details you provide, the better we can capture your vision and
                  craft the perfect solution.
                </p>
              </div>
              <div>
                <h4 className="text-body-lg text-[#534A13] font-semibold mb-2">
                  Step 2: We Review & Respond
                </h4>
                <p className="text-body-md text-[#534A13]">
                  Our clerics assess your mission, identify the right Guild
                  members, and reach out to schedule a consultation. Expect to
                  hear from us within 48 hours.
                </p>
              </div>
              <div>
                <h4 className="text-body-lg text-[#534A13] font-semibold mb-2">
                  Step 3: Discovery Call
                </h4>
                <p className="text-body-md text-[#534A13]">
                  We dive deeper into your goals, timeline, and requirements. We
                  ask questions, offer insights, and ensure we&apos;re the right
                  fit. Calls typically run 30-60 minutes.
                </p>
              </div>
              <div>
                <h4 className="text-body-lg text-[#534A13] font-semibold mb-2">
                  Step 4: Custom Proposal
                </h4>
                <p className="text-body-md text-[#534A13]">
                  We assemble your raid party and deliver a detailed proposal
                  with scope, timeline, team structure, and pricing. Proposals
                  delivered within 3-5 days.
                </p>
              </div>
              <div>
                <h4 className="text-body-lg text-[#534A13] font-semibold mb-2">
                  Step 5: Kickoff & Build
                </h4>
                <p className="text-body-md text-[#534A13]">
                  Once approved, we begin bringing your vision to life.
                  You&apos;ll work directly with your dedicated team through
                  regular stand-ups until deployment.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <HireUsForm />
          </div>
        </div>
      </div>
    </section>
  );
}
