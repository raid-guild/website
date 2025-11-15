import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t-[10px] border-moloch-500 bg-moloch-800">
      <div className="container-custom py-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:justify-between">
          <Image
            src="/images/logo-RG-scroll-100.svg"
            alt="Raid Guild"
            width={200}
            height={53}
          />
          <p className="text-scroll-100 text-center font-display font-bold text-[20px] md:text-[28px] lg:text-[36px] leading-[1.4] md:leading-[1.3] lg:leading-[1.2]">
            Elite Raiders Conquering the Web3 Realm
          </p>
          <p className="text-heading-sm text-scroll-100">© 2025 RaidGuild</p>
        </div>
      </div>
    </footer>
  );
}
