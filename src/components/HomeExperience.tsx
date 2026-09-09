"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import FrontDoor from "./FrontDoor";
import TeamWall from "./TeamWall";
import PortalEnergy from "./PortalEnergy";
import HireUs from "@/components/HireUs";
import { mercenaries } from "@/lib/data/members";
import styles from "./HomeExperience.module.css";

const activeSpears = [
  {
    index: "01",
    title: "Applied AI",
    copy: "Forward-deployed AI systems that move from model capability to useful operation—agents, workflows, interfaces, and the infrastructure that makes them trustworthy.",
    tag: "ACTIVE SPEAR / RAIDGUILD.AI",
    status: "DEPLOYING",
    href: "https://raidguild.ai",
    cta: "Explore the AI practice",
    art: "/images/neo/spear-applied-ai-v1.webp",
    artAlt: "A field technologist working with an AI companion and portable systems",
  },
  {
    index: "02",
    title: "Onchain Systems",
    copy: "Protocols, products, governance, and ownership systems built by a network that has lived at the edge of open coordination since 2019.",
    tag: "ACTIVE SPEAR / ONCHAIN",
    status: "BATTLE-TESTED",
    href: "https://www.raidguild.org",
    cta: "Explore onchain work",
    art: "/images/neo/spear-onchain-v1.webp",
    artAlt: "Guild builders operating an onchain systems foundry",
  },
];

const fieldNotes = [
  {
    issue: "07",
    code: "RG—24.071",
    image: "/images/neo/sky-citadel.png",
    alt: "A cloaked traveler looks toward a floating coral citadel",
    type: "PROTOCOL DESIGN · PRODUCT · ENGINEERING",
    title: "Infrastructure for new worlds.",
    abstract:
      "How we turned complex coordination into an interface that feels inevitable—clear enough for day one, powerful enough for what comes next.",
    status: "LIVE",
    sector: "ONCHAIN",
    crew: "08",
  },
  {
    issue: "08",
    code: "RG—25.014",
    image: "/images/neo/field-protocol-garden.png",
    alt: "A guild cartographer studies a living network city",
    type: "SYSTEMS · IDENTITY · PROTOCOL",
    title: "Gardens, not platforms.",
    abstract:
      "A field study in designing protocols that grow through participation: legible incentives, composable paths, and room for the unexpected.",
    status: "ARCHIVED",
    sector: "NETWORKS",
    crew: "06",
  },
  {
    issue: "09",
    code: "RG—25.033",
    image: "/images/neo/field-signal-commons.png",
    alt: "A floating civic commons above the clouds",
    type: "GOVERNANCE · RESEARCH · EXPERIENCE",
    title: "A commons in the clouds.",
    abstract:
      "What changes when governance feels like a place? Notes on making collective decisions spatial, social, and unmistakably human.",
    status: "TRANSMITTING",
    sector: "COMMUNITIES",
    crew: "11",
  },
  {
    issue: "10",
    code: "RG—26.002",
    image: "/images/neo/field-autonomous-treasury.png",
    alt: "Two engineers inspect a monumental autonomous treasury",
    type: "TREASURY · AUTOMATION · AI",
    title: "The machine that stewards itself.",
    abstract:
      "Inside an autonomous treasury: observable agents, bounded authority, and financial infrastructure designed to earn trust over time.",
    status: "CLASSIFIED",
    sector: "AUTONOMY",
    crew: "05",
  },
];

const stewards = [
  {
    name: "Dekan",
    role: "Knowledge Steward",
    href: "https://x.com/DekanBro",
    project: "KNOWLEDGE SYSTEMS",
    image: "/images/member-dekan.png",
  },
  {
    name: "ECWireless",
    role: "Infrastructure Steward",
    href: "https://github.com/ECWireless",
    project: "GITHUB / ECWIRELESS",
    image: "/images/member-ecwireless.png",
  },
  {
    name: "Takekek",
    role: "Sync Steward",
    project: "PROFILE FORTHCOMING",
    image: "/images/member-takekek.png",
  },
  {
    name: "Pupcakes",
    role: "Participation Steward",
    href: "https://github.com/Fluffy9",
    project: "GITHUB / FLUFFY9",
    image: "/images/member-pupcakes.png",
  },
  {
    name: "Louchi",
    role: "Brand Steward",
    href: "https://estudioblanco.org",
    project: "ESTUDIO BLANCO",
    image: "/images/member-louchi.png",
  },
];

const stewardNames = new Set(stewards.map((steward) => steward.name.toLowerCase()));
const guildMembers = mercenaries.filter((member) => !stewardNames.has(member.name.toLowerCase()));

function Sigil() {
  return (
    <span className={styles.sigil} aria-hidden="true">
      <span className={styles.swordMark} />
    </span>
  );
}

type PortalOverlayProps = {
  open: boolean;
  forming: boolean;
  closing: boolean;
  onClose: () => void;
  onSpears: () => void;
  onProblem: () => void;
  onJoin: () => void;
};

function PortalOverlay({ open, forming, closing, onClose, onSpears, onProblem, onJoin }: PortalOverlayProps) {
  const [energized, setEnergized] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);


  if (!open) return null;

  return (
    <div
      className={`${styles.portalOverlay} ${forming ? styles.portalForming : ""} ${closing ? styles.portalClosing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="RaidGuild transit portal"
    >
      <div className={styles.portalAtmosphere} aria-hidden="true" />
      <button
        className={`${styles.portalMachine} ${styles.portalSpear}`}
        onPointerEnter={() => setEnergized("Spear")}
        onPointerLeave={() => setEnergized(null)}
        onFocus={() => setEnergized("Spear")}
        onBlur={() => setEnergized(null)}
        type="button"
        onClick={onSpears}
        disabled={forming}
        aria-label="Hire a specialist through a RaidGuild practice"
      >
        <PortalEnergy energized={energized === "Spear"} />
        <span className={styles.portalThreshold}><Sigil /></span>
        <span className={styles.portalChoiceLabel}>
          <small>01 / HIRE</small>
          <strong>HIRE A SPECIALIST</strong>
          <b>Choose an established practice</b>
          <i>↓</i>
        </span>
      </button>
      <button
        className={`${styles.portalMachine} ${styles.portalProblem}`}
        onPointerEnter={() => setEnergized("Problem")}
        onPointerLeave={() => setEnergized(null)}
        onFocus={() => setEnergized("Problem")}
        onBlur={() => setEnergized(null)}
        type="button"
        onClick={onProblem}
        disabled={forming}
        aria-label="Start a project with RaidGuild"
      >
        <PortalEnergy energized={energized === "Problem"} />
        <span className={styles.portalThreshold}><Sigil /></span>
        <span className={styles.portalChoiceLabel}>
          <small>02 / INQUIRE</small>
          <strong>START A PROJECT</strong>
          <b>Bring the Guild an ambitious problem</b>
          <i>↓</i>
        </span>
      </button>
      <button
        className={`${styles.portalMachine} ${styles.portalJoin}`}
        onPointerEnter={() => setEnergized("Join")}
        onPointerLeave={() => setEnergized(null)}
        onFocus={() => setEnergized("Join")}
        onBlur={() => setEnergized(null)}
        type="button"
        onClick={onJoin}
        disabled={forming}
        aria-label="Join the RaidGuild builder community in a new tab"
      >
        <PortalEnergy energized={energized === "Join"} />
        <span className={styles.portalThreshold}><Sigil /></span>
        <span className={styles.portalChoiceLabel}>
          <small>03 / JOIN</small>
          <strong>JOIN THE GUILD</strong>
          <b>Enter the builder community</b>
          <i>↗</i>
        </span>
      </button>
      <button className={styles.portalClose} type="button" onClick={onClose} aria-label="Close portal">
        <span>CLOSE</span> ×
      </button>
      <div className={styles.portalReadout} aria-hidden="true">
        <span>RG—TRANSIT / 001</span>
        <span>STABILITY 98.7%</span>
      </div>
      {forming && <p className={styles.portalBreach}>[ SPATIAL BREACH DETECTED ]</p>}
      {!forming && (
        <div className={styles.portalMessage}>
          <p><span /> Three transit windows open</p>
          <h2>CHOOSE YOUR<br /><em>PORTAL.</em></h2>
          <small>HIRE A SPECIALIST · START A PROJECT · JOIN THE GUILD</small>
          <b>Distinct practices. One accountable Guild.<br />Every engagement operates through RaidGuild LLC.</b>
        </div>
      )}
      <p className={styles.portalCoordinates}>39°44′N / 104°59′W<br />DESTINATION: UNMAPPED</p>
    </div>
  );
}

export default function HomeExperience() {
  const [frontDoorOpen, setFrontDoorOpen] = useState(true);
  const [entranceDestination, setEntranceDestination] = useState<string | null>(null);
  const enterFromFrontDoor = useCallback((destination: string) => {
    setEntranceDestination(destination);
    setFrontDoorOpen(false);
  }, []);

  useEffect(() => {
    if (frontDoorOpen || !entranceDestination) return;
    const target = document.getElementById(entranceDestination);
    if (!target) return;
    target.scrollIntoView({ behavior: "instant", block: "start" });
    const focusTarget = target.querySelector<HTMLElement>("input, a, button") || target;
    if (!focusTarget.hasAttribute("tabindex") && focusTarget === target) focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus({ preventScroll: true });
  }, [frontDoorOpen, entranceDestination]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeField, setActiveField] = useState(0);
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalForming, setPortalForming] = useState(false);
  const [portalClosing, setPortalClosing] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [arrivalTarget, setArrivalTarget] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const fieldTrackRef = useRef<HTMLDivElement>(null);
  const heroRevealTimerRef = useRef<number | null>(null);
  const portalTimerRef = useRef<number | null>(null);
  const portalFormTimerRef = useRef<number | null>(null);
  const arrivalTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visible = new Set<HTMLVideoElement>();
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-scene]"));
    const update = () => videos.forEach((video) => {
      const scene = video.dataset.scene;
      const matchesTheme = scene === "manifesto" || scene === (isNight ? "dark" : "light");
      if (!frontDoorOpen && !document.hidden && !preference.matches && matchesTheme && visible.has(video)) {
        void video.play().catch(() => { /* Poster remains available if autoplay is blocked. */ });
      } else video.pause();
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) visible.add(video);
        else visible.delete(video);
      });
      update();
    });
    videos.forEach((video) => observer.observe(video));
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [frontDoorOpen, isNight]);

  const revealHero = () => {
    if (heroRevealTimerRef.current) window.clearTimeout(heroRevealTimerRef.current);
    setHeroRevealed(true);
  };

  const restHero = () => {
    if (heroRevealTimerRef.current) window.clearTimeout(heroRevealTimerRef.current);
    heroRevealTimerRef.current = window.setTimeout(() => setHeroRevealed(false), 2200);
  };

  const scrollToSection = (destination: "guild" | "spears" | "work" | "contact") => {
    const target = document.getElementById(destination);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    if (arrivalTimerRef.current) window.clearTimeout(arrivalTimerRef.current);
    setArrivalTarget(destination);
    arrivalTimerRef.current = window.setTimeout(() => setArrivalTarget(null), reduceMotion ? 0 : 1800);
  };

  const followSectionLink = (
    event: MouseEvent<HTMLAnchorElement>,
    destination: "guild" | "spears" | "work" | "contact",
    departHero = false,
  ) => {
    event.preventDefault();
    if (departHero) setHeroRevealed(false);
    scrollToSection(destination);
  };

  const openPortal = () => {
    if (portalFormTimerRef.current) window.clearTimeout(portalFormTimerRef.current);
    setPortalOpen(true);
    setPortalForming(true);
    portalFormTimerRef.current = window.setTimeout(() => setPortalForming(false), 3400);
  };

  const dismissPortal = (destination?: "contact" | "spears") => {
    if (portalClosing) return;
    if (portalFormTimerRef.current) window.clearTimeout(portalFormTimerRef.current);
    setPortalForming(false);
    setPortalClosing(true);
    portalTimerRef.current = window.setTimeout(() => {
      setPortalOpen(false);
      setPortalClosing(false);
      if (destination) scrollToSection(destination);
    }, destination ? 920 : 620);
  };

  const joinGuild = () => {
    window.open("https://portal.raidguild.org", "_blank", "noopener,noreferrer");
    dismissPortal();
  };

  useEffect(() => () => {
    if (heroRevealTimerRef.current) window.clearTimeout(heroRevealTimerRef.current);
    if (portalTimerRef.current) window.clearTimeout(portalTimerRef.current);
    if (portalFormTimerRef.current) window.clearTimeout(portalFormTimerRef.current);
    if (arrivalTimerRef.current) window.clearTimeout(arrivalTimerRef.current);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = window.localStorage.getItem("raidguild-theme");
    const initialTheme = stored === "light" || stored === "dark"
      ? stored
      : media.matches ? "dark" : "light";

    root.dataset.theme = initialTheme;
    root.style.colorScheme = initialTheme;
    setIsNight(initialTheme === "dark");

    const followSystem = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem("raidguild-theme")) return;
      const theme = event.matches ? "dark" : "light";
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
      setIsNight(event.matches);
    };

    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  const toggleTheme = () => {
    const theme = isNight ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("raidguild-theme", theme);
    setIsNight(theme === "dark");
  };

  const updateActiveField = () => {
    const track = fieldTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const closest = cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.scrollLeft)
        ? index
        : best, 0);
    setActiveField(closest);
  };

  useEffect(() => {
    const root = document.documentElement;
    const updatePointer = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--neo-pointer-x", x.toFixed(3));
      root.style.setProperty("--neo-pointer-y", y.toFixed(3));
      root.style.setProperty("--neo-sky-x", `${(x * 10).toFixed(1)}px`);
      root.style.setProperty("--neo-land-x", `${(x * -10).toFixed(1)}px`);
      root.style.setProperty("--neo-title-x", `${(x * 8).toFixed(1)}px`);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (hero) {
          const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
          const distance = Math.min(Math.max(window.scrollY - hero.offsetTop, 0), travel);
          const progress = distance / travel;
          const root = document.documentElement;
          root.style.setProperty("--neo-progress", progress.toFixed(3));
          root.style.setProperty("--neo-sky-y", `${(distance * 0.035).toFixed(1)}px`);
          root.style.setProperty("--neo-fore-y", `${(distance * -0.34).toFixed(1)}px`);
          root.style.setProperty("--neo-copy-y", `${(distance * -0.3).toFixed(1)}px`);
          root.style.setProperty("--neo-meta-y", `${(distance * -0.18).toFixed(1)}px`);
      root.style.setProperty("--neo-copy-opacity", (1 - progress * 0.72).toFixed(3));
      root.style.setProperty("--neo-meta-opacity", (1 - progress).toFixed(3));
        }
        frame = 0;
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
    {frontDoorOpen && <FrontDoor onEnter={enterFromFrontDoor} />}
    <main inert={frontDoorOpen} className={`${styles.site} ${portalForming ? styles.siteGlitching : ""}`}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="RaidGuild home">
          <Sigil />
          <span>RAID<br />GUILD</span>
        </a>

        <button
          className={styles.celestialToggle}
          type="button"
          aria-label={`Switch to ${isNight ? "day" : "night"} mode`}
          aria-pressed={isNight}
          onClick={toggleTheme}
        >
          <span aria-hidden="true"><i /></span>
          <b>{isNight ? "NIGHT" : "DAY"}</b>
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary navigation">
          <a href="#guild" onClick={(event) => { setMenuOpen(false); followSectionLink(event, "guild"); }}>The guild</a>
          <a href="#spears" onClick={(event) => { setMenuOpen(false); followSectionLink(event, "spears"); }}>Active spears</a>
          <a href="#work" onClick={(event) => { setMenuOpen(false); followSectionLink(event, "work"); }}>Field notes</a>
          <a
            className={styles.brandArchiveLink}
            href="https://raidguild-brand-guide-production.up.railway.app/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Brand archive <span>↗</span>
          </a>
        </nav>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className={styles.hero} id="top" ref={heroRef}>
        <button className={styles.portalTrigger} type="button" onClick={openPortal}>
          <span className={styles.portalTriggerMark}><b className={styles.iconPortal} /><i /></span>
          <span className={styles.portalTriggerCopy}><small>TRANSIT READY</small>OPEN A PORTAL</span>
        </button>
        <div className={`${styles.heroStage} ${heroRevealed ? styles.heroExploring : ""}`}>
          <div className={styles.heroCelestial} aria-hidden="true">
            <span className={styles.moonLarge} />
            <span className={styles.moonSmall} />
            <span className={styles.orbitLine} />
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <Image
              className={styles.heroImage}
              src="/images/neo/hero-light-poster.png"
              alt=""
              fill
              sizes="100vw"
              priority
            />
            <video
              className={`${styles.heroImage} ${styles.heroNightImage}`}
              poster="/images/neo/hero-dark-poster.png"
              src="/videos/venture/hero-dark.mp4"
              data-scene="dark"
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div className={styles.heroWash} />
          <div className={styles.heroWayfinding}>
            <svg className={styles.heroOrbitMap} viewBox="0 0 1000 700" aria-hidden="true" preserveAspectRatio="none">
              <ellipse cx="535" cy="345" rx="286" ry="190" />
              <path d="M535 345C440 388 357 440 276 512" />
              <path d="M535 345C611 290 670 232 716 172" />
              <path d="M535 345C548 405 560 460 570 518" />
            </svg>

            <div className={styles.heroHub} aria-hidden="true">
              <i />
              <span>RAIDGUILD<br /><small>CENTER OF GRAVITY</small></span>
            </div>

            <a className={`${styles.heroWaypoint} ${styles.waypointShip}`} href="#contact" data-route="BRING A CHALLENGE" onClick={(event) => followSectionLink(event, "contact", true)} onMouseEnter={revealHero} onMouseLeave={restHero} onFocus={revealHero} onBlur={restHero}>
              <i />
              <span className={styles.waypointLabel}>
                <small>01 / SHARED INTAKE</small>
                <strong>Bring a challenge</strong>
                <em>We route the problem or assemble the crew.</em>
              </span>
            </a>

            <a className={`${styles.heroWaypoint} ${styles.waypointCitadel}`} href="#spears" data-route="EXPLORE PRACTICES" onClick={(event) => followSectionLink(event, "spears", true)} onMouseEnter={revealHero} onMouseLeave={restHero} onFocus={revealHero} onBlur={restHero}>
              <i />
              <span className={styles.waypointLabel}>
                <small>02 / ACTIVE SPEARS</small>
                <strong>Explore practices</strong>
                <em>Specialists working at the applied edge.</em>
              </span>
            </a>

            <a
              className={`${styles.heroWaypoint} ${styles.waypointProcession}`}
              href="#guild"
              data-route="MEET THE GUILD"
              onClick={(event) => followSectionLink(event, "guild", true)}
              onMouseEnter={revealHero}
              onMouseLeave={restHero}
              onFocus={revealHero}
              onBlur={restHero}
            >
              <i />
              <span className={styles.waypointLabel}>
                <small>03 / COMMUNITY</small>
                <strong>Meet the Guild</strong>
                <em>Discover the network, then enter through Portal.</em>
              </span>
            </a>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> Independent digital mercenaries</p>
            <div
              className={styles.heroTitle}
              onMouseEnter={revealHero}
              onMouseLeave={restHero}
            >
              <h1 tabIndex={0} onFocus={revealHero} onBlur={restHero}><span>VENTURE</span><br /><em>BEYOND</em></h1>
              <span>{heroRevealed ? "THE WORLD IS OPEN" : "HOVER TO LOOK BEYOND"}</span>
            </div>
          </div>
          <div className={styles.heroSupplement}>
            <p className={styles.heroDek}>
              We are a builder-owned collective turning ambitious ideas into digital worlds worth inhabiting.
            </p>
            <a href="#guild" className={styles.discover} onClick={(event) => followSectionLink(event, "guild", true)}>
              <span>Enter the world</span>
              <i>↓</i>
            </a>
          </div>
          <div className={styles.heroIndex}>
            <span>TRANSMISSION</span>
            <strong>001</strong>
          </div>
          <p className={styles.heroScrollCue} aria-hidden="true">&lt;&lt;&lt; SCROLL TO DESCEND</p>
          <div className={`${styles.heroForeground} ${styles.heroForegroundLeft}`} aria-hidden="true">
            <Image
              src="/images/neo/hero-foreground.png"
              alt=""
              fill
              priority
              sizes="110vw"
              className={styles.foregroundImage}
            />
          </div>
          <div className={`${styles.heroForeground} ${styles.heroForegroundRight}`} aria-hidden="true">
            <Image
              src="/images/neo/hero-foreground.png"
              alt=""
              fill
              priority
              sizes="110vw"
              className={styles.foregroundImage}
            />
          </div>
        </div>
      </section>

      <div className={styles.signalBar} aria-hidden="true">
        <div>
          <span>ONE GUILD</span><i /><span>MANY EDGES</span><i /><span>BUILDER-OWNED</span><i />
          <span>APPLIED AI</span><i /><span>ONCHAIN SYSTEMS</span><i /><span>OPEN EXPERIMENTS</span><i />
          <span>ONE GUILD</span><i /><span>MANY EDGES</span><i />
        </div>
      </div>

      <section className={`${styles.prologue} ${arrivalTarget === "guild" ? styles.sectionArriving : ""}`} id="guild">
        <div className={styles.guildVisual}>
          <Image
            className={styles.guildBuilders}
            src="/images/neo/guild-builders-v1.png"
            alt=""
            width={768}
            height={1024}
            sizes="600px"
            aria-hidden="true"
          />
        </div>
        <div className={styles.prologueCopy}>
          <p className={styles.sectionLabel}>[ THE GUILD ]</p>
          <h2>The network<br /><em>is the engine</em></h2>
          <div className={styles.prologueBody}>
            <p>
              <strong>RaidGuild</strong> is a builder-owned community exploring emerging technology together.{" "}
              <strong>Designers, engineers, researchers, strategists, and operators</strong> share knowledge, reputation, and infrastructure.
            </p>
            <p>Then assemble into specialized crews when ambitious work calls.</p>
          </div>
          <div className={styles.guildActions}>
            <a className={`${styles.pill} ${styles.pillFilled}`} href="https://portal.raidguild.org" target="_blank" rel="noreferrer">
              <span>Join the Guild</span>
              <i className={styles.pillIcon}><b className={styles.iconLogo} /></i>
            </a>
            <a className={`${styles.pill} ${styles.pillOutline}`} href="https://discord.gg/2vx47gT95y" target="_blank" rel="noreferrer">
              <span>Enter Discord</span>
              <i className={styles.pillIcon}><b className={styles.iconDiscord} /></i>
            </a>
          </div>
          <a className={styles.handbookLink} href="https://handbook.raidguild.org/docs/overview/what-is-raidguild" target="_blank" rel="noreferrer">Read the handbook ↗</a>
        </div>
        <div className={styles.statsBand} aria-label="RaidGuild statistics">
          <div><strong>150</strong><span>GLOBAL MEMBERS</span></div>
          <div><strong>88+</strong><span>RAIDS SHIPPED ACROSS THE FRONTIER</span></div>
          <div><strong>4999</strong><span>YEARS OF EXPERIENCE</span></div>
          <div><strong>2019</strong><span>BORN AND RAISED IN ADVERSITY</span></div>
        </div>
      </section>

      <section className={styles.keepers}>
        <div className={styles.guildRoster}>
          <div className={styles.rosterHeading}>
            <div>
              <p className={styles.sectionLabel}>[ CURRENT STEWARDS ]</p>
              <h3>Keepers of<br /><em>the signal</em></h3>
              <p>RaidGuild is a builder-owned community exploring emerging technology together.</p>
            </div>
            <div className={styles.rosterAside}>
              <a href="https://portal.raidguild.org" target="_blank" rel="noreferrer">Explore all members <span>↗</span></a>
            </div>
          </div>

          <div className={styles.stewardTrack}>
            {stewards.map((steward, index) => {
              const card = (
                <>
                  <div className={styles.stewardTop}>
                    <span>ST—{String(index + 1).padStart(2, "0")}</span>
                    <i>{steward.href ? "↗" : "·"}</i>
                  </div>
                  <div className={styles.stewardPortrait}>
                    <Image src={steward.image} alt="" fill sizes="180px" />
                  </div>
                  <p>{steward.role}</p>
                  <h4>{steward.name}</h4>
                  <small>{steward.project}</small>
                </>
              );

              return steward.href ? (
                <a className={styles.stewardCard} href={steward.href} target="_blank" rel="noreferrer" key={steward.name}>{card}</a>
              ) : (
                <div className={styles.stewardCard} key={steward.name}>{card}</div>
              );
            })}
          </div>

        </div>
      </section>

      <section className={styles.teamNetwork} id="team">
        <TeamWall members={guildMembers} />
        <div className={styles.teamCopy}>
          <p className={styles.sectionLabel}>[ THE TEAM ]</p>
          <h3>A WIDE NETWORK<br /><em>OF BUILDERS</em></h3>
          <p>RaidGuild is a builder-owned community exploring emerging technology together.</p>
          <a className={`${styles.pill} ${styles.pillOutline}`} href="https://discord.gg/2vx47gT95y" target="_blank" rel="noreferrer">
            <span>Enter Discord</span>
            <i className={styles.pillIcon}><b className={styles.iconDiscord} /></i>
          </a>
        </div>
      </section>

      <section className={`${styles.practice} ${arrivalTarget === "spears" ? styles.sectionArriving : ""}`} id="spears">
        <div className={styles.practiceHeading}>
          <p className={styles.sectionLabel}>[ ACTIVE SPEARS ]</p>
          <h2>Specialized at<br /><em>the applied edge</em></h2>
          <div className={styles.practiceAside}>
            <p>Independently led specialist practices operating through RaidGuild LLC, with shared contracts, treasury, infrastructure, and access to the Guild&apos;s builder network.</p>
            <a className={`${styles.pill} ${styles.pillOutlineNavy}`} href="#contact">
              <span>Bring us an edge problem</span>
              <i className={styles.pillIcon}><b className={styles.iconLogo} /></i>
            </a>
          </div>
        </div>
        <div className={`${styles.disciplineGrid} ${styles.spearGrid}`}>
          {activeSpears.map((item) => (
            <article className={styles.discipline} key={item.index}>
              <div className={styles.disciplineTop}>
                <span>SP—{item.index}</span>
                <i>{item.status}</i>
              </div>
              <div className={styles.disciplineArt}>
                <Image src={item.art} alt={item.artAlt} width={1024} height={768} />
              </div>
              <p className={styles.spearEndorsement}><Sigil /> RAIDGUILD PRACTICE / VERIFIED SPEAR</p>
              <p className={styles.disciplineTag}>{item.tag}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className={styles.spearActions}>
                <a href={item.href} target="_blank" rel="noreferrer">{item.cta} <span>↗</span><small>OPENS THE SPECIALIST PRACTICE SITE</small></a>
                <a href="#contact">Bring this problem to the Guild <span>↘</span></a>
              </div>
            </article>
          ))}
          <article className={styles.discipline} id="placement" style={{ scrollMarginTop: "80px" }}>
            <div className={styles.disciplineTop}><span>SP—03</span><i>PROPOSED</i></div>
            <div className={styles.disciplineArt}>
              <Image src="/images/neo/guild-builders-v1.png" alt="Creative and technical specialists working together" width={1024} height={768} />
            </div>
            <p className={styles.spearEndorsement}><Sigil /> RAIDGUILD NETWORK / PROPOSED SPEAR</p>
            <p className={styles.disciplineTag}>TALENT / PLACEMENT SERVICES</p>
            <h3>Talent &amp; Placement</h3>
            <p>The right people, on your team. Connect with designers, engineers, and specialists from the Guild’s network. Tell us what expertise you need and what you’re trying to achieve—let’s explore the right fit.</p>
            <div className={styles.spearActions}>
              <a href="#project-inquiry" onClick={(event) => {
                event.preventDefault();
                document.getElementById("project-inquiry")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
              }}>Find people for your team <span>↘</span><small>START A PLACEMENT INQUIRY</small></a>
            </div>
          </article>
          <article className={`${styles.discipline} ${styles.problemSpear}`}>
            <div className={styles.disciplineTop}><span>SP—??</span><i>UNMAPPED</i></div>
            <div className={styles.disciplineArt}>
              <Image
                src="/images/neo/spear-edge-problem-v1.webp"
                alt="A crew investigating an unfamiliar machine at the applied edge"
                width={1024}
                height={768}
              />
            </div>
            <p className={styles.spearEndorsement}><Sigil /> RAIDGUILD NETWORK / SHARED INTAKE</p>
            <p className={styles.disciplineTag}>GUILD-LEVEL DISCOVERY</p>
            <h3>Your edge problem</h3>
            <p>Not sure which practice fits? Tell us what you&apos;re trying to change. The Guild will identify the right edge and assemble the crew.</p>
            <a href="#contact">Start a transmission <span>↘</span></a>
          </article>
        </div>
      </section>

      <section className={`${styles.fieldNotes} ${arrivalTarget === "work" ? styles.sectionArriving : ""}`} id="work">
        <div className={styles.fieldIntro}>
          <p className={styles.sectionLabel}>[ SELECTED EXPEDITIONS ]</p>
          <h2>Proof from<br /><em>the frontier</em></h2>
          <div className={styles.fieldAside}>
            <p>Artifacts, protocols, and communities built with people brave enough to go first.</p>
            <a className={`${styles.pill} ${styles.pillOutlineGreen}`} href="https://portal.raidguild.org/posts" target="_blank" rel="noreferrer">
              <span>Open the full blog</span>
              <i className={styles.pillIcon}><b className={styles.iconLogo} /></i>
            </a>
          </div>
        </div>

        <div className={styles.fieldControls}>
          <p><strong>{String(activeField + 1).padStart(2, "0")}</strong> / {String(fieldNotes.length).padStart(2, "0")}</p>
        </div>

        <div className={styles.fieldTrack} ref={fieldTrackRef} onScroll={updateActiveField}>
          {fieldNotes.map((note) => (
            <article className={styles.featuredMission} key={note.code}>
              <div className={styles.missionArt}>
                <Image
                  src={note.image}
                  alt={note.alt}
                  fill
                  sizes="(max-width: 800px) 88vw, 48vw"
                  className={styles.missionImage}
                />
                <span className={styles.artBadge}>FIELD NOTE / {note.issue}</span>
              </div>
              <div className={styles.missionCopy}>
                <span className={styles.missionNumber}>{note.code}</span>
                <p className={styles.missionType}>{note.type}</p>
                <h3>{note.title}</h3>
                <p>{note.abstract}</p>
                <a href="https://portal.raidguild.org/posts" target="_blank" rel="noreferrer">Read the field notes <span>↗</span></a>
                <dl>
                  <div><dt>STATUS</dt><dd>{note.status}</dd></div>
                  <div><dt>SECTOR</dt><dd>{note.sector}</dd></div>
                  <div><dt>CREW</dt><dd>{note.crew}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.creed}>
        <Image
          className={styles.creedMoons}
          src="/images/neo/manifesto-backdrop.png"
          width={2200}
          height={940}
          alt=""
          aria-hidden="true"
        />
        <p className={styles.sectionLabel}>[ THE RAIDGUILD CREED ]</p>
        <blockquote>
          The future is not<br />something to predict.<br />It is something to <em>build.</em>
        </blockquote>
        <div className={styles.creedFooter}>
          <span>NO SPECTATORS</span>
          <Sigil />
          <span>OPEN TERRITORY</span>
        </div>
      </section>

      <section className={`${styles.contact} ${arrivalTarget === "contact" ? styles.sectionArriving : ""}`} id="contact">
        <div className={styles.contactIntro}>
          <Image
            className={styles.contactDruid}
            src="/images/neo/contact-druid.png"
            alt=""
            width={1518}
            height={1308}
            sizes="506px"
            aria-hidden="true"
          />
          <p className={styles.sectionLabel}>[ BEGIN A TRANSMISSION ]</p>
          <h2 className={styles.contactHeadline}>
            <span>What impossible thing</span>
            <em>are you building?</em>
          </h2>
          <p className={styles.contactDek}>Send the first signal. Tell us who you are, what world you&apos;re trying to make, and what it will take to get there.</p>
          <dl className={styles.contactProtocol}>
            <div><dt>RESPONSE</dt><dd>WITHIN 48 HOURS</dd></div>
            <div><dt>CHANNEL</dt><dd>SECURE / HUMAN</dd></div>
            <div><dt>STATUS</dt><dd><span /> RECEIVING</dd></div>
          </dl>
        </div>
        <div className={styles.contactFormShell} id="project-inquiry" style={{ scrollMarginTop: "30px" }}>
          <div className={styles.formCoordinates}><span>RG—INTAKE / 001</span><span>ENCRYPTION: OPEN</span></div>
          <HireUs />
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#top"><Sigil /><span>RAID<br />GUILD</span></a>
        <p>WE BUILD THE ROADS<br />THROUGH UNMAPPED TERRITORY.</p>
        <div className={styles.socials}>
          <a href="https://github.com/raid-guild">GITHUB</a>
          <a href="https://x.com/RaidGuild">X / TWITTER</a>
          <a href="https://discord.gg/2vx47gT95y">DISCORD</a>
        </div>
        <small>© 2019—2026 RAIDGUILD · EARTH &amp; ELSEWHERE</small>
      </footer>

      <PortalOverlay
        open={portalOpen}
        forming={portalForming}
        closing={portalClosing}
        onClose={() => dismissPortal()}
        onSpears={() => dismissPortal("spears")}
        onProblem={() => dismissPortal("contact")}
        onJoin={joinGuild}
      />
    </main>
    </>
  );
}
