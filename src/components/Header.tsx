"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RefObject } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";

type HeaderTheme = "moloch-500" | "moloch-800" | "scroll-700";

type ThemeConfig = {
  background: string;
  borderAccent: string;
  text: string;
  navHover: string;
  navActive: string;
  navActiveText: string;
  menuSurface: string;
  logoPath: string;
};

const NAV_ITEMS: Array<{ label: string; href: string; anchor: string }> = [
  { label: "About", href: "/", anchor: "#about" },
  { label: "Services", href: "/#services", anchor: "#services" },
  { label: "Case Studies", href: "/#case-studies", anchor: "#case-studies" },
  { label: "Hire Us", href: "/#hire-us", anchor: "#hire-us" },
];

const THEME_CONFIG: Record<HeaderTheme, ThemeConfig> = {
  "moloch-500": {
    background: "bg-moloch-500",
    borderAccent: "border-scroll-700",
    text: "text-scroll-100",
    navHover: "hover:bg-moloch-800",
    navActive: "bg-moloch-800",
    navActiveText: "text-scroll-100",
    menuSurface: "bg-moloch-500",
    logoPath: "/images/logo-RG-moloch-800.svg",
  },
  "moloch-800": {
    background: "bg-moloch-800",
    borderAccent: "border-moloch-500",
    text: "text-scroll-100",
    navHover: "hover:bg-moloch-500",
    navActive: "bg-moloch-500",
    navActiveText: "text-scroll-100",
    menuSurface: "bg-moloch-800/95",
    logoPath: "/images/logo-RG-moloch-500.svg",
  },
  "scroll-700": {
    background: "bg-scroll-700",
    borderAccent: "border-moloch-800",
    text: "text-scroll-100",
    navHover: "hover:bg-moloch-800",
    navActive: "bg-moloch-800",
    navActiveText: "text-scroll-100",
    menuSurface: "bg-scroll-700",
    logoPath: "/images/logo-RG-scroll-100.svg",
  },
};

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";
const DESKTOP_THIN_HEIGHT = 96;
const MOBILE_HEADER_HEIGHT = 72;

type HeaderProps = {
  /**
   * When enabled, use the thin header and moloch-500 theme for all viewports.
   * Intended for secondary routes that opt out of dynamic transitions.
   */
  staticAppearance?: boolean;
};

export default function Header({ staticAppearance = false }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const allowDynamic = !staticAppearance;

  // Deterministic theme selection based on 5-minute intervals (no flash, no hydration mismatch)
  const themes: HeaderTheme[] = ["moloch-500", "moloch-800", "scroll-700"];
  const interval = Math.floor(Date.now() / (1000 * 60 * 5)); // 5 minutes
  const initialTheme = allowDynamic
    ? themes[interval % themes.length]
    : "moloch-500";

  const { isDesktop, shrinkProgress } = useHeaderSize({
    headerRef,
    allowDynamic,
  });

  // Always use thin height for theme calculations to avoid circular dependency
  const headerHeight = isDesktop ? DESKTOP_THIN_HEIGHT : MOBILE_HEADER_HEIGHT;

  const headerHeightRef = useRef(headerHeight);
  useEffect(() => {
    headerHeightRef.current = headerHeight;
  }, [headerHeight]);

  const navAnchorIds = useMemo(
    () =>
      NAV_ITEMS.map((item) =>
        item.anchor.startsWith("#") ? item.anchor.slice(1) : null
      ).filter((value): value is string => Boolean(value)),
    []
  );

  const themeAnchors = useMemo(
    () => [
      { id: "services", theme: "moloch-800" as HeaderTheme },
      { id: "case-studies", theme: "scroll-700" as HeaderTheme },
      { id: "hire-us", theme: "moloch-500" as HeaderTheme },
    ],
    []
  );

  const { currentTheme, activeAnchorId } = useHeaderTheme({
    initialTheme,
    allowThemeTransitions: allowDynamic,
    headerHeight,
    shrinkProgress,
    navAnchorIds,
    themeAnchors,
  });

  const theme = THEME_CONFIG[currentTheme];

  // For scroll-700 theme: use moloch-800 logo when not fully shrunk (shrinkProgress < 1), scroll-100 when fully thin (shrinkProgress === 1)
  const logoPath =
    currentTheme === "scroll-700" && shrinkProgress !== 1
      ? "/images/logo-RG-moloch-800.svg"
      : theme.logoPath;

  const themeWithDynamicLogo = { ...theme, logoPath };

  const mobileMenu = useMobileMenu({
    panelRef,
    triggerRef,
  });

  const handleNavigate = useCallback(
    (href: string) => {
      if (typeof window === "undefined" || !href.startsWith("#")) {
        return;
      }

      const id = href.slice(1);

      // "about" should always scroll to top
      if (id === "about") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        if (typeof window.history?.replaceState === "function") {
          window.history.replaceState(null, "", href);
        }
        mobileMenu.close();
        return;
      }

      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      const targetTop = window.scrollY + target.getBoundingClientRect().top - 1;
      const offset = headerHeightRef.current ?? DESKTOP_THIN_HEIGHT;

      // On mobile, add extra 240px offset to account for positioning
      const mobileExtraOffset = !isDesktop ? 240 : 0;
      const safeOffset = Math.max(offset - (isDesktop ? 16 : 12) + mobileExtraOffset, 0);
      const destination = Math.max(targetTop - safeOffset, 0);

      window.scrollTo({
        top: destination,
        behavior: "smooth",
      });

      if (typeof window.history?.replaceState === "function") {
        window.history.replaceState(null, "", href);
      }
      mobileMenu.close();
    },
    [isDesktop, mobileMenu]
  );

  return (
    <header
      ref={headerRef}
      className={[
        "sticky top-0 z-50 border-t-[10px] border-b-2 border-b-scroll-100 transition-colors duration-500 motion-reduce:transition-none",
        theme.background,
        theme.borderAccent,
        theme.text,
      ].join(" ")}
    >
      <div className="container-custom">
        <div className="hidden lg:block">
          <HeaderDesktopAdaptive
            theme={themeWithDynamicLogo}
            activeAnchorId={activeAnchorId}
            onNavigate={handleNavigate}
            staticAppearance={staticAppearance}
            shrinkProgress={shrinkProgress}
          />
        </div>

        <div className="lg:hidden">
          <HeaderMobile
            theme={themeWithDynamicLogo}
            isMenuOpen={mobileMenu.isOpen}
            panelId={panelId}
            onToggleMenu={mobileMenu.toggle}
            triggerRef={triggerRef}
            staticAppearance={staticAppearance}
          />
          <MobileMenuPanel
            theme={theme}
            panelRef={panelRef}
            panelId={panelId}
            isOpen={mobileMenu.isOpen}
            activeAnchorId={activeAnchorId}
            onNavigate={handleNavigate}
            staticAppearance={staticAppearance}
          />
        </div>
      </div>
    </header>
  );
}

type HeaderLayoutProps = {
  theme: ThemeConfig;
  activeAnchorId: string | null;
  onNavigate: (href: string) => void;
  staticAppearance: boolean;
  shrinkProgress: number;
};

function HeaderDesktopAdaptive({
  theme,
  activeAnchorId,
  onNavigate,
  staticAppearance,
  shrinkProgress,
}: HeaderLayoutProps) {
  // Interpolate values based on shrinkProgress (0 = tall, 1 = thin)
  const paddingTop = 1.25 + (1 - shrinkProgress) * 4.75; // 6rem -> 1.25rem
  const paddingBottom = 1.25 + (1 - shrinkProgress) * 1.75; // 3rem -> 1.25rem
  const logoHeight = 48 + (1 - shrinkProgress) * 102; // 48px -> 150px
  const logoMarginBottom = -122 * (1 - shrinkProgress); // 0 -> -122px
  const gap = 8 + (1 - shrinkProgress) * 2; // 8 -> 10

  // items-end (flex-end) when tall, items-center when thin
  const alignItems = shrinkProgress < 0.5 ? "flex-end" : "center";

  return (
    <div
      style={{
        paddingTop: `${paddingTop}rem`,
        paddingBottom: `${paddingBottom}rem`,
        transition: "padding 300ms ease-out",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems,
          justifyContent: "space-between",
          gap: `${gap * 0.25}rem`,
          transition: "gap 300ms ease-out, align-items 300ms ease-out",
        }}
      >
{staticAppearance ? (
          <Link
            href="/"
            style={{
              marginBottom: `${logoMarginBottom}px`,
              transition: "margin-bottom 300ms ease-out",
              display: "block",
            }}
            aria-label="Go to home"
          >
            <div
              style={{
                height: `${logoHeight}px`,
                transition: "height 300ms ease-out",
              }}
            >
              <Image
                src={theme.logoPath}
                alt="Raid Guild Logo"
                width={632}
                height={166}
                priority
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </Link>
        ) : (
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            style={{
              marginBottom: `${logoMarginBottom}px`,
              transition: "margin-bottom 300ms ease-out",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label="Scroll to top"
          >
            <div
              style={{
                height: `${logoHeight}px`,
                transition: "height 300ms ease-out",
              }}
            >
              <Image
                src={theme.logoPath}
                alt="Raid Guild Logo"
                width={632}
                height={166}
                priority
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </button>
        )}
        <NavLinks
          theme={theme}
          activeAnchorId={activeAnchorId}
          onNavigate={onNavigate}
          variant="desktop"
          staticAppearance={staticAppearance}
        />
      </div>
    </div>
  );
}

type HeaderMobileProps = {
  theme: ThemeConfig;
  isMenuOpen: boolean;
  panelId: string;
  onToggleMenu: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  staticAppearance: boolean;
};

function HeaderMobile({
  theme,
  isMenuOpen,
  panelId,
  onToggleMenu,
  triggerRef,
  staticAppearance,
}: HeaderMobileProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <Logo variant="mobile" logoPath={theme.logoPath} staticAppearance={staticAppearance} />
      <MenuButton
        ref={triggerRef}
        isOpen={isMenuOpen}
        ariaControls={panelId}
        theme={theme}
        onToggle={onToggleMenu}
      />
    </div>
  );
}

type NavLinksProps = {
  theme: ThemeConfig;
  activeAnchorId: string | null;
  onNavigate: (href: string) => void;
  variant: "desktop" | "mobile";
  staticAppearance: boolean;
};

function NavLinks({
  theme,
  activeAnchorId,
  onNavigate,
  variant,
  staticAppearance,
}: NavLinksProps) {
  return (
    <nav
      className={[
        "flex items-center transition-all duration-200 motion-reduce:transition-none",
        variant === "desktop"
          ? "flex-wrap justify-end text-sm uppercase tracking-[0.1em] gap-5"
          : "flex-col items-stretch gap-3 text-base font-semibold uppercase tracking-[0.25em]",
      ].join(" ")}
    >
      {NAV_ITEMS.map(({ label, href, anchor }) => {
        const id = anchor.startsWith("#") ? anchor.slice(1) : anchor;
        const isActive = activeAnchorId === id;

        if (staticAppearance) {
          return (
            <Link
              key={href}
              href={href}
              className={[
                "text-label-md rounded-md px-8 py-1 text-center transition-colors duration-200 motion-reduce:transition-none",
                theme.navHover,
                isActive ? theme.navActive : "",
                isActive ? theme.navActiveText : "",
              ].join(" ")}
            >
              {" "}
              {label}
            </Link>
          );
        } else {
          return (
            <a
              key={anchor}
              href={anchor}
              onClick={(event) => {
                if (anchor.startsWith("#")) {
                  event.preventDefault();
                  onNavigate(anchor);
                }
              }}
              className={[
                "text-label-md rounded-md px-8 py-1 text-center transition-colors duration-200 motion-reduce:transition-none",
                theme.navHover,
                isActive ? theme.navActive : "",
                isActive ? theme.navActiveText : "",
              ].join(" ")}
            >
              {label}
            </a>
          );
        }
      })}
    </nav>
  );
}

type LogoProps = {
  variant: "tall" | "thin" | "mobile";
  logoPath: string;
  staticAppearance?: boolean;
};

function Logo({ variant, logoPath, staticAppearance = false }: LogoProps) {
  const baseClasses =
    "w-auto transition-all duration-300 motion-reduce:transition-none";

  const sizeClasses =
    variant === "tall" ? "h-[150px]" : variant === "thin" ? "h-12" : "h-10";

  if (staticAppearance) {
    return (
      <Link href="/" aria-label="Go to home">
        <Image
          src={logoPath}
          alt="Raid Guild Logo"
          width={632}
          height={166}
          priority
          className={[baseClasses, sizeClasses].join(" ")}
        />
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="bg-transparent border-0 p-0 cursor-pointer"
      aria-label="Scroll to top"
    >
      <Image
        src={logoPath}
        alt="Raid Guild Logo"
        width={632}
        height={166}
        priority
        className={[baseClasses, sizeClasses].join(" ")}
      />
    </button>
  );
}

type MenuButtonProps = {
  isOpen: boolean;
  ariaControls: string;
  theme: ThemeConfig;
  onToggle: () => void;
};

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButtonComponent(
    { isOpen, ariaControls, theme, onToggle }: MenuButtonProps,
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={ariaControls}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={onToggle}
        className={[
          "inline-flex items-center justify-center rounded-md px-3 py-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
          theme.navHover,
        ].join(" ")}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden />
        ) : (
          <Menu className="h-6 w-6" aria-hidden />
        )}
      </button>
    );
  }
);

type MobileMenuPanelProps = {
  theme: ThemeConfig;
  panelId: string;
  panelRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  activeAnchorId: string | null;
  onNavigate: (href: string) => void;
  staticAppearance: boolean;
};

function MobileMenuPanel({
  theme,
  panelId,
  panelRef,
  isOpen,
  activeAnchorId,
  onNavigate,
  staticAppearance,
}: MobileMenuPanelProps) {
  if (!isOpen) return;
  return (
    <div
      id={panelId}
      ref={panelRef}
      aria-hidden={!isOpen}
      className="relative flex justify-end bg-transparent transition-all duration-300 motion-reduce:transition-none"
    >
      <div
        className={[
          "px-4 py-6 w-full max-w-[16rem] origin-top overflow-hidden rounded-b-md text-display-md transition-all duration-300 motion-reduce:transition-none",
          theme.menuSurface,
          isOpen
            ? "mt-2 scale-y-100 opacity-100"
            : "mt-0 scale-y-95 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <NavLinks
          theme={theme}
          activeAnchorId={activeAnchorId}
          onNavigate={onNavigate}
          variant="mobile"
          staticAppearance={staticAppearance}
        />
      </div>
    </div>
  );
}

type UseHeaderThemeOptions = {
  initialTheme: HeaderTheme;
  allowThemeTransitions: boolean;
  headerHeight: number;
  shrinkProgress: number;
  navAnchorIds: string[];
  themeAnchors: Array<{ id: string; theme: HeaderTheme }>;
};

type HeaderThemeState = {
  currentTheme: HeaderTheme;
  activeAnchorId: string | null;
};

function useHeaderTheme({
  initialTheme,
  allowThemeTransitions,
  headerHeight,
  shrinkProgress,
  navAnchorIds,
  themeAnchors,
}: UseHeaderThemeOptions): HeaderThemeState {
  const [currentTheme, setCurrentTheme] = useState<HeaderTheme>(initialTheme);
  const [activeAnchorId, setActiveAnchorId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let rafId = 0;

    const evaluateState = () => {
      rafId = 0;

      // Calculate actual header height based on shrinkProgress
      // 256px (tall) -> 96px (thin)
      const actualHeaderHeight = 96 + (1 - shrinkProgress) * 160;
      const scrollPosition = window.scrollY + actualHeaderHeight;

      let nextTheme = initialTheme;
      let firstAvailableAnchor: string | null = null;
      let activeAnchor: string | null = null;

      for (const anchorId of navAnchorIds) {
        const element = document.getElementById(anchorId);
        if (!element) {
          continue;
        }

        if (firstAvailableAnchor === null) {
          firstAvailableAnchor = anchorId;
        }

        if (scrollPosition >= element.offsetTop - 4) {
          activeAnchor = anchorId;
        }
      }

      for (const { id, theme } of themeAnchors) {
        const element = document.getElementById(id);
        if (!element) {
          continue;
        }

        if (scrollPosition >= element.offsetTop - 4) {
          nextTheme = theme;
        }
      }

      setActiveAnchorId(activeAnchor ?? firstAvailableAnchor);
      setCurrentTheme(allowThemeTransitions ? nextTheme : initialTheme);
    };

    evaluateState();

    const handleScroll = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(evaluateState);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [
    allowThemeTransitions,
    headerHeight,
    shrinkProgress,
    initialTheme,
    navAnchorIds,
    themeAnchors,
  ]);

  return { currentTheme, activeAnchorId };
}

type UseHeaderSizeOptions = {
  headerRef: RefObject<HTMLElement | null>;
  allowDynamic: boolean;
};

type HeaderSizeState = {
  isDesktop: boolean;
  shrinkProgress: number;
};

function useHeaderSize({
  allowDynamic,
}: UseHeaderSizeOptions): HeaderSizeState {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [shrinkProgress, setShrinkProgress] = useState<number>(0); // 0 = tall, 1 = thin (start tall)

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

    const applyMatchState = (matches: boolean) => {
      setIsDesktop(matches);
      if (!matches) {
        setShrinkProgress(1);
      }
    };

    applyMatchState(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) =>
      applyMatchState(event.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", listener);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!allowDynamic) {
      setShrinkProgress(1);
      return;
    }

    if (!isDesktop) {
      setShrinkProgress(1);
      return;
    }

    // Fixed scroll thresholds: 0px (start fade) to 146px (fully shrunk)
    const FADE_START = 0;
    const FADE_END = 146;
    const FADE_RANGE = FADE_END - FADE_START;

    let rafId = 0;

    const evaluateScroll = () => {
      rafId = 0;
      const scrollY = window.scrollY;

      // Calculate progress from 0 (tall) to 1 (thin)
      if (scrollY <= FADE_START) {
        setShrinkProgress(0);
      } else if (scrollY >= FADE_END) {
        setShrinkProgress(1);
      } else {
        const progress = (scrollY - FADE_START) / FADE_RANGE;
        setShrinkProgress(progress);
      }
    };

    const handleScroll = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(evaluateScroll);
    };

    evaluateScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [allowDynamic, isDesktop]);

  return { isDesktop, shrinkProgress };
}

type UseMobileMenuOptions = {
  panelRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

type MobileMenuState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

function useMobileMenu({
  panelRef,
  triggerRef,
}: UseMobileMenuOptions): MobileMenuState {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((previous) => !previous), []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!isOpen) {
      return;
    }

    const panel = panelRef.current;
    const triggerNode = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.hasAttribute("disabled"))
      : [];

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (firstFocusable) {
      firstFocusable.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerNode?.focus();
    };
  }, [close, isOpen, panelRef, triggerRef]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const panel = panelRef.current;
      const trigger = triggerRef.current;
      const target = event.target as Node | null;

      if (!panel || !target) {
        return;
      }

      const isWithinPanel = panel.contains(target);
      const isWithinTrigger = trigger?.contains(target);

      if (!isWithinPanel && !isWithinTrigger) {
        close();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [close, isOpen, panelRef, triggerRef]);

  return { isOpen, open, close, toggle };
}
