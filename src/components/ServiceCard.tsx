import Image from "next/image";

interface ServiceCardProps {
  title: string;
  bodyText: string;
  iconSrc: string;
  iconAlt: string;
}

export default function ServiceCard({
  title,
  bodyText,
  iconSrc,
  iconAlt,
}: ServiceCardProps) {
  return (
    <div className="relative bg-moloch-800 p-8 flex flex-col items-center gap-5 rounded-md overflow-visible min-h-[400px]">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 rounded-md"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full flex-1">
        <div className="flex items-start justify-center w-full">
          <h3 className="text-heading-md text-scroll-100 text-center">
            {title}
          </h3>
        </div>

        {/* Gold Emblem */}
        <Image
          src="/images/services-divider-0.svg"
          alt="services icon"
          width={46}
          height={60}
          className="relative z-10"
        />

        {/* Body Text */}
        <p className="text-body-lg text-scroll-100 text-left px-2 flex-1">
          {bodyText}
        </p>

        {/* Icon - positioned at bottom, overlapping card edge */}
        <div className="mt-auto relative -mb-20">
          <div className="relative flex items-center justify-center">
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={112}
              height={112}
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
