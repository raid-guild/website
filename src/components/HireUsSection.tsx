import Image from "next/image";
import { hireUsSteps } from "@/lib/data/content";
import HireUs from "./HireUs";

export default function HireUsSection() {
  return (
    <section id="hire-us" className="py-24">
      <div className="container-custom">
        <div className="grid-custom gap-4 flex items-start">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 mb-[60px]">
            <h2 className="text-heading-lg text-moloch-500 mb-8">
              Ready to Build Something Legendary?
            </h2>
            <p className="text-body-lg">
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
            <h3 className="text-heading-lg font-bold text-moloch-500 mb-8">
              How It Works
            </h3>
            <div className="space-y-6">
              {hireUsSteps.map((step, index) => (
                <div key={index}>
                  <h4 className="text-heading-sm mb-1">
                    Step {index + 1}: {step.title}
                  </h4>
                  <p className="text-body-lg">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <HireUs />
          </div>
        </div>
      </div>
    </section>
  );
}
