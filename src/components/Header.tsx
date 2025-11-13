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
    navActiveText: "text-moloch-100",
    menuSurface: "bg-moloch-500",
    logoPath: "/images/logo-RG-moloch-800.svg",
  },
  "moloch-800": {
    background: "bg-moloch-800",
    borderAccent: "border-moloch-500",
    text: "text-scroll-100",
    navHover: "hover:bg-moloch-500",
    navActive: "bg-moloch-500",
    navActiveText: "text-moloch-100",
    menuSurface: "bg-moloch-800/95",
    logoPath: "/images/logo-RG-moloch-500.svg",
  },
  "scroll-700": {
    background: "bg-scroll-700",
    borderAccent: "border-moloch-800",
    text: "text-moloch-100",
    navHover: "hover:bg-moloch-800",
    navActive: "bg-moloch-800",
    navActiveText: "text-scroll-100",
    menuSurface: "bg-scroll-700",
    logoPath: "/images/logo-RG-moloch-800.svg",
  },
};

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";
const DESKTOP_TALL_HEIGHT = 256;
const DESKTOP_THIN_HEIGHT = 96;
const MOBILE_HEADER_HEIGHT = 72;
const NAV_HYSTERESIS = 40;

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

  const [initialTheme] = useState<HeaderTheme>(() => {
    if (!allowDynamic) return "moloch-500";

    const themes: HeaderTheme[] = ["moloch-500", "moloch-800", "scroll-700"];
    const now = Date.now();
    const seconds = Math.floor(now / 30000); // Changes every 30 seconds
    return themes[seconds % themes.length];
  });

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
    navAnchorIds,
    themeAnchors,
  });

  const theme = THEME_CONFIG[currentTheme];

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
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      const targetTop = window.scrollY + target.getBoundingClientRect().top - 1;
      const offset = headerHeightRef.current ?? DESKTOP_THIN_HEIGHT;
      const safeOffset = Math.max(offset - (isDesktop ? 16 : 12), 0);
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
        "sticky top-0 z-50 border-t-[10px] transition-colors duration-500 motion-reduce:transition-none",
        theme.background,
        theme.borderAccent,
        theme.text,
      ].join(" ")}
    >
      <div className="container-custom">
        <div className="hidden lg:block">
          {/* Container that interpolates padding based on shrinkProgress */}
          <div
            style={{
              paddingTop: `${1.25 + (1 - shrinkProgress) * 1.75}rem`,
              paddingBottom: `${1.25 + (1 - shrinkProgress) * 1.75}rem`,
              transition: 'padding 300ms ease-out',
            }}
          >
            <div style={{ position: 'relative' }}>
              {/* Tall header overlay - purely visual, fades out from scroll 46-146px */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: shrinkProgress < 0.3 ? 1 : shrinkProgress > 0.7 ? 0 : 1 - ((shrinkProgress - 0.3) / 0.4),
                  pointerEvents: 'none',
                  transition: 'opacity 300ms ease-out',
                }}
                className={theme.background}
              >
                <HeaderDesktopTall
                  theme={theme}
                  activeAnchorId={activeAnchorId}
                  onNavigate={handleNavigate}
                  staticAppearance={staticAppearance}
                />
              </div>

              {/* Thin header - the real functional header, always present */}
              <HeaderDesktopThin
                theme={theme}
                activeAnchorId={activeAnchorId}
                onNavigate={handleNavigate}
                staticAppearance={staticAppearance}
              />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <HeaderMobile
            theme={theme}
            isMenuOpen={mobileMenu.isOpen}
            panelId={panelId}
            onToggleMenu={mobileMenu.toggle}
            triggerRef={triggerRef}
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
};

function HeaderDesktopTall({
  theme,
  activeAnchorId,
  onNavigate,
  staticAppearance,
}: HeaderLayoutProps) {
  return (
    <div className="flex items-end justify-between gap-10">
      <div className="-mb-[122px]">
        <Logo variant="tall" logoPath={theme.logoPath} />
      </div>
      <NavLinks
        theme={theme}
        activeAnchorId={activeAnchorId}
        onNavigate={onNavigate}
        variant="desktop"
        staticAppearance={staticAppearance}
      />
    </div>
  );
}

function HeaderDesktopThin({
  theme,
  activeAnchorId,
  onNavigate,
  staticAppearance,
}: HeaderLayoutProps) {
  return (
    <div className="flex items-center justify-between gap-8">
      <Logo variant="thin" logoPath={theme.logoPath} />
      <NavLinks
        theme={theme}
        activeAnchorId={activeAnchorId}
        onNavigate={onNavigate}
        variant="desktop"
        staticAppearance={staticAppearance}
      />
    </div>
  );
}

type HeaderMobileProps = {
  theme: ThemeConfig;
  isMenuOpen: boolean;
  panelId: string;
  onToggleMenu: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

function HeaderMobile({
  theme,
  isMenuOpen,
  panelId,
  onToggleMenu,
  triggerRef,
}: HeaderMobileProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <Logo variant="mobile" logoPath={theme.logoPath} />
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
        "flex items-center gap-2 transition-all duration-200 motion-reduce:transition-none",
        variant === "desktop"
          ? "flex-wrap justify-end text-sm uppercase tracking-[0.1em]"
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
                "text-label-md rounded-md px-5 py-2 text-center transition-colors duration-200 motion-reduce:transition-none",
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
                "text-label-md rounded-md px-5 py-2 text-center transition-colors duration-200 motion-reduce:transition-none",
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
};

function Logo({ variant, logoPath }: LogoProps) {
  const baseClasses =
    "w-auto transition-all duration-300 motion-reduce:transition-none";

  const sizeClasses =
    variant === "tall" ? "h-[150px]" : variant === "thin" ? "h-12" : "h-10";

  return (
    <Image
      src={logoPath}
      alt="Raid Guild Logo"
      width={632}
      height={166}
      priority
      className={[baseClasses, sizeClasses].join(" ")}
    />
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
          "px-4 py-6 w-full max-w-[16rem] origin-top overflow-hidden rounded-b-lg text-display-md transition-all duration-300 motion-reduce:transition-none",
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
      const scrollPosition = window.scrollY + headerHeight;

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
  headerRef,
  allowDynamic,
}: UseHeaderSizeOptions): HeaderSizeState {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [shrinkProgress, setShrinkProgress] = useState<number>(1); // 0 = tall, 1 = thin

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

    // Fixed scroll thresholds: 46px (start fade) to 146px (fully shrunk)
    const FADE_START = 46;
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
