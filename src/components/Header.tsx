"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NavItem from "./NavItem";

export default function Header() {
  const [isThinNav, setIsThinNav] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkNavState = () => {
      const header = headerRef.current;
      const partnerBanner = document.getElementById("partner-logo-banner");

      if (header && partnerBanner) {
        const headerRect = header.getBoundingClientRect();
        const headerBottom = headerRect.bottom;
        const partnerBannerTop = partnerBanner.getBoundingClientRect().top;

        // Transition to thin nav when Partner Logo Banner hits or passes header bottom
        setIsThinNav(partnerBannerTop <= headerBottom);
      }
    };

    const handleScroll = () => {
      checkNavState();
    };

    // Check initial state
    checkNavState();

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also check on resize in case header height changes
    window.addEventListener("resize", checkNavState, { passive: true });

    // Check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkNavState, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkNavState);
      clearTimeout(timeoutId);
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
            // Smooth scroll to target
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            // Update URL hash without triggering scroll
            window.history.pushState(null, "", href);

            // Check nav state after scroll completes
            setTimeout(() => {
              const header = headerRef.current;
              const partnerBanner = document.getElementById(
                "partner-logo-banner"
              );

              if (header && partnerBanner) {
                const headerRect = header.getBoundingClientRect();
                const headerBottom = headerRect.bottom;
                const partnerBannerTop =
                  partnerBanner.getBoundingClientRect().top;
                setIsThinNav(partnerBannerTop <= headerBottom);
              }
            }, 600);
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
      className={`bg-moloch-400 border-t-[10px] border-[#534A13] sticky top-0 z-50 transition-all duration-300 ${
        isThinNav ? "py-5" : "py-6"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4">
          <div
            className={`transition-all duration-300 ${
              isThinNav ? "-mb-1" : "-mb-[107px]"
            }`}
          >
            <Image
              src="/images/logo-RG-home-large.svg"
              alt="Raid Guild Logo"
              width={632}
              height={166}
              className={`h-auto w-auto transition-all duration-300 ${
                isThinNav ? "max-h-12" : "max-h-[166px]"
              }`}
              priority
            />
          </div>
          <nav
            ref={navRef}
            className={`flex items-center transition-all duration-300 ${
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
