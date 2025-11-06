import Image from "next/image";
import ServiceCard from "./ServiceCard";
import { services } from "@/lib/data/content";

export default function ServicesSection() {
  return (
    <section id="services" className="relative mt-24 mb-44">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/services-back.svg"
          alt="Services Background"
          fill
          className="object-contain object-top opacity-30"
          priority={false}
        />
      </div>
      <div className="container-custom relative z-10">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center mb-[60px]">
            <h2 className="text-heading-lg text-moloch-400 mb-8">
              Arsenal of Expertise
            </h2>
            <p className="text-body-lg">
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
    </section>
  );
}
