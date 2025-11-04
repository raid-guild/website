"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NavItem from "./NavItem";

export default function Header() {
  const [isThinNav, setIsThinNav] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const thresholdRef = useRef<number | null>(null);

  useEffect(() => {
    // Capture initial thick header height on first render

    const calculateThreshold = () => {
      const partnerBanner = document.getElementById("partner-logo-banner");

      if (partnerBanner) {
        // TODO: handle in mobile views
        const THICK_HEADER_HEIGHT = 80; // Adjust based on your actual header height

        const partnerBannerOffsetTop = partnerBanner.offsetTop;

        thresholdRef.current = partnerBannerOffsetTop - THICK_HEADER_HEIGHT;
      }
    };
    const checkNavState = () => {
      if (thresholdRef.current !== null) {
        const scrollY = window.scrollY;

        const HYSTERESIS = 50;

        setIsThinNav((prev) => {
          if (prev) {
            return scrollY >= thresholdRef.current! - HYSTERESIS;
          } else {
            return scrollY >= thresholdRef.current! + HYSTERESIS;
          }
        });
      }
    };

    const handleScroll = () => {
      checkNavState();
    };

    calculateThreshold();
    checkNavState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        calculateThreshold();
        checkNavState();
      },
      { passive: true }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkNavState);
    };
  }, []);

  // Handle smooth scrolling for nav links
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');

      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("click", handleNavClick);
      return () => {
        nav.removeEventListener("click", handleNavClick);
      };
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`bg-moloch-400 border-t-[10px] border-[#534A13] sticky top-0 z-50 transition-all duration-200 ${
        isThinNav ? "py-5" : "pt-24 pb-14"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4">
          <div
            className={`transition-all duration-200 ${
              isThinNav ? "-mb-1" : "-mb-[158px]"
            }`}
          >
            <Image
              src="/images/logo-RG-home-large.svg"
              alt="Raid Guild Logo"
              width={632}
              height={166}
              className={`transition-all duration-200 ${
                isThinNav ? "h-auto w-auto max-h-12" : "h-[166px] w-auto"
              }`}
              priority
            />
          </div>
          <nav
            ref={navRef}
            className={`flex items-center transition-all duration-200 ${
              isThinNav ? "text-sm" : ""
            }`}
          >
            <NavItem href="#about">About</NavItem>
            <NavItem href="#services">SERVICES</NavItem>
            <NavItem href="#case-studies">CASE STUDIES</NavItem>
            <NavItem href="#hire-us">HIRE US</NavItem>
          </nav>
        </div>
      </div>
    </header>
  );
}
