import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const engagementSteps = [
  {
    title: "Map the Work",
    description:
      "We learn how your team actually coordinates, where the drag lives, and what needs to keep moving.",
  },
  {
    title: "Design the System",
    description:
      "We shape practical automations, integrations, and operating patterns around your existing workflow.",
  },
  {
    title: "Deploy With You",
    description:
      "Forward Deployed Engineers build, tune, and hand off tooling alongside the people who will use it.",
  },
];

export const metadata: Metadata = {
  title: "Workflow Automation Contact | Raid Guild",
  description:
    "Request a lightweight consultation for workflow automation, operational tooling, and AI-native process management.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-scroll-100 text-moloch-800">
      <Header staticAppearance />

      <main className="pt-12 md:pt-16">
        <section className="py-6 lg:py-12">
          <div className="container-custom relative">
            <div className="grid-custom gap-4 items-start">
              <div className="col-span-4 mb-8 text-center md:col-span-8 lg:col-span-6 lg:mb-12 lg:text-left">
                <h1 className="mb-8 text-heading-lg text-moloch-500">
                  Ready to Build Something Legendary?
                </h1>
                <p className="text-body-lg">
                  Raid Guild&apos;s Forward Deployed Engineers design and deploy
                  workflow automation and operational systems, adapted to the
                  way your organization works.
                </p>
              </div>
              <div className="col-span-4 flex justify-center md:col-span-8 lg:col-span-6 lg:justify-end">
                <Image
                  src="/images/ship-front-c.webp"
                  alt="Raid Guild ship"
                  width={900}
                  height={620}
                  priority
                  className="h-auto w-full max-w-[632px] flex-shrink-0 object-contain"
                />
              </div>
            </div>

            <div className="grid-custom gap-4 items-start pt-6">
              <div className="col-span-4 mb-8 text-center md:col-span-8 lg:col-span-6 lg:mb-12 lg:text-left">
                <h2 className="mb-8 text-heading-md font-bold text-moloch-500">
                  How We Engage
                </h2>
                <div className="space-y-6">
                  {engagementSteps.map((step, index) => (
                    <div key={step.title}>
                      <h3 className="mb-1 text-label-md">
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className="text-body-lg">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-4 pl-0 md:pl-10 md:col-span-8 lg:col-span-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
