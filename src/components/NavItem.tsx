"use client";

import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  children: ReactNode;
  isActive?: boolean;
}

export default function NavItem({ href, children, isActive }: NavItemProps) {
  return (
    <a
      href={href}
      className={`flex items-center justify-center py-[10px] px-[30px] rounded-md text-body-base font-bold uppercase text-scroll-100 transition-colors ${
        isActive ? "bg-moloch-800" : ""
      } hover:bg-moloch-800 active:bg-moloch-800`}
    >
      {children}
    </a>
  );
}
