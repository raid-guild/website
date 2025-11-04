"use client";

const services = [
  "Smart Contract Engineering",
  "Full-Stack dApp Development",
  "Token Systems",
  "DevOps & Infrastructure",
  "Smart Contract Auditing",
  "Hardhat & Testing",
  "React & Next.js",
  "UX/UI Design",
  "Product Strategy",
  "Design Systems",
  "Brand Identity",
  "User Research",
  "Responsive Design",
  "DAO Architecture",
  "Governance Frameworks",
  "Discord Bot Development",
  "Tokenomics",
  "Voting Mechanisms",
  "Treasury Management",
  "Multi-sig Security",
  "Content Strategy",
  "Short-Form Video",
  "Developer Relations",
  "Brand & Creative",
  "Partnership Development",
  "Event Design",
  "PR & Media",
  "Growth Campaigns",
  "Educational Content",
];

export default function ServicesBanner() {
  // Duplicate services for seamless looping
  const duplicatedServices = [...services, ...services];

  return (
    <div className="bg-moloch-800 border-t-[10px] border-accent py-5 overflow-hidden">
      <div className="flex gap-9 animate-scroll">
        {duplicatedServices.map((service, index) => (
          <span
            key={index}
            className="text-body-lg font-bold text-scroll-100 whitespace-nowrap"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}
