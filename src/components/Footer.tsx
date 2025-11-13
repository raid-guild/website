import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t-[10px] border-moloch-500 bg-moloch-800 mt-24">
      <div className="container-custom py-10">
        <div className="flex flex-col gap-6 items-start">
          <Image
            src="/images/logo-RG-scroll-100.svg"
            alt="Raid Guild"
            width={200}
            height={53}
          />
          <p className="text-heading-lg text-scroll-100">
            Elite Raiders Conquering the Web3 Realm
          </p>
          <p className="text-heading-sm text-scroll-100">© 2025 RaidGuild</p>
        </div>
      </div>
    </footer>
  );
}
