import Image from "next/image";
import ServiceCard from "./ServiceCard";
import ServicesBanner from "./ServicesBanner";

const services = [
  {
    title: "Full-Stack Development",
    bodyText:
      "Our software developers and smart contract engineers build everything from dApps to Discord bots. If it powers the decentralized Web, we build it.",
    iconSrc: "/images/services-wizard-1.svg",
    iconAlt: "Wizard",
  },
  {
    title: "Product & System Design",
    bodyText:
      "We build intuitive user experiences and workflow-optimized dApps. Making Web3 accessible, from DAO tooling to token systems.",
    iconSrc: "/images/services-archer-2.svg",
    iconAlt: "Archer",
  },
  {
    title: "Marketing & Content Strategy",
    bodyText:
      "We create engaging content and growth strategies with lasting impact to help Web3 projects educate, inform, and activate their communities.",
    iconSrc: "/images/services-scribe-3.svg",
    iconAlt: "Bard",
  },
  {
    title: "DAO Consulting & Governance",
    bodyText:
      "We've built foundational Web3 tooling. We design DAOs, governance frameworks, and tokenomic models that help communities coordinate.",
    iconSrc: "/images/services-alchemist-4.svg",
    iconAlt: "Monk",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative mt-24">
      <Image
        src="/images/services-back.svg"
        alt="Services Background"
        fill
        className="object-cover opacity-30 -z-10"
      />
      <div className="container-custom">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center mb-[60px]">
            <h2 className="text-heading-lg text-moloch-400 font-bold mb-4">
              Arsenal of Expertise
            </h2>
            <p className="text-body-lg text-[#211E07]">
              Epic skills wielded by Web3 warriors. Precision tools for
              decentralized dominance. Mastery unmatched
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  bodyText={service.bodyText}
                  iconSrc={service.iconSrc}
                  iconAlt={service.iconAlt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Scroller */}
      <div className="mt-24">
        <ServicesBanner />
      </div>
    </section>
  );
}
