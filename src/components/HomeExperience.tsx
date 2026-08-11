"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HireUs from "@/components/HireUs";
import { mercenaries } from "@/lib/data/members";
import styles from "./HomeExperience.module.css";

const disciplines = [
  {
    index: "01",
    title: "Shape the unknown",
    copy: "Product strategy, systems thinking, and prototypes that turn a strange idea into a world people can enter.",
    tag: "DISCOVERY / DESIGN",
  },
  {
    index: "02",
    title: "Forge the machine",
    copy: "Battle-tested engineering across smart contracts, full-stack products, AI, and the infrastructure between them.",
    tag: "PROTOCOL / ENGINEERING",
  },
  {
    index: "03",
    title: "Release the signal",
    copy: "Launch systems, creative direction, and growth loops built to help remarkable products find their people.",
    tag: "LAUNCH / MOMENTUM",
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
    name: "Louchi",
    role: "Brand Steward",
    href: "https://estudioblanco.org",
    project: "ESTUDIO BLANCO",
    initials: "LO",
  },
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
  onEnter: () => void;
  onJoin: () => void;
};

function PortalOverlay({ open, forming, closing, onClose, onEnter, onJoin }: PortalOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.innerWidth < 900;
    const particleCount = reducedMotion ? 80 : compact ? 190 : 260;
    const palette = ["238,60,120", "109,230,223", "239,233,215", "215,227,77"];
    const pointer = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let renderScale = 1;
    let frame = 0;
    let lastTime = performance.now();
    const startTime = lastTime;

    const particles = Array.from({ length: particleCount }, (_, index) => {
      const lane = Math.pow(Math.random(), 1.55);
      return {
        angle: lane * Math.PI * 9 + (Math.random() - 0.5) * 0.8,
        lane,
        drift: (Math.random() - 0.5) * 0.2,
        speed: (0.22 + Math.random() * 0.58) * (Math.random() > 0.08 ? 1 : -0.45),
        size: 0.45 + Math.random() * 1.8,
        portalIndex: index % 2,
        colorIndex: index % 2 === 0 ? (index % 4 === 0 ? 0 : 2) : (index % 4 === 1 ? 1 : 3),
        phase: Math.random() * Math.PI * 2,
      };
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderScale = reducedMotion ? 0.6 : compact ? 0.72 : Math.min(window.devicePixelRatio || 1, 1);
      canvas.width = Math.floor(width * renderScale);
      canvas.height = Math.floor(height * renderScale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(renderScale, 0, 0, renderScale, 0, 0);
    };

    const trackPointer = (event: PointerEvent) => {
      pointer.x = event.clientX / width - 0.5;
      pointer.y = event.clientY / height - 0.5;
    };

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, width, height);

      const centerY = height * (compact ? 0.32 : 0.49) + pointer.y * 12;
      const radiusX = Math.min(width * (compact ? 0.14 : 0.105), 175);
      const radiusY = Math.min(height * (compact ? 0.19 : 0.31), 330);
      const elapsed = time * 0.001;
      const bootProgress = Math.min(1, Math.max(0, (time - startTime - 180) / 3150));
      const bootEase = 1 - Math.pow(1 - bootProgress, 3);

      const batches = palette.map(() => Array.from({ length: 3 }, () => ({
        dots: new Path2D(),
        trails: new Path2D(),
      })));

      particles.forEach((particle) => {
        particle.angle += particle.speed * delta * (reducedMotion ? 0.08 : 0.12 + bootEase * 0.88);
        const turbulence = Math.sin(elapsed * 1.7 + particle.phase) * (5 + particle.lane * 18);
        const laneRadius = 0.78 + particle.lane * 0.38;
        const depth = (Math.sin(particle.angle) + 1) / 2;
        const centerX = width * (compact ? (particle.portalIndex === 0 ? 0.29 : 0.71) : (particle.portalIndex === 0 ? 0.59 : 0.82)) + pointer.x * (particle.portalIndex === 0 ? 14 : -14);
        const ignitionScale = 0.08 + bootEase * 0.92;
        const x = centerX + Math.cos(particle.angle) * (radiusX * laneRadius + turbulence) * ignitionScale + particle.drift * radiusX * ignitionScale;
        const y = centerY + Math.sin(particle.angle) * (radiusY * laneRadius) * ignitionScale + Math.cos(elapsed + particle.phase) * 7 * bootEase;
        const stretch = 3 + depth * 13 + particle.lane * 5;
        const size = particle.size * (0.55 + depth * 1.15);
        const depthBucket = Math.min(2, Math.floor(depth * 3));
        const batch = batches[particle.colorIndex][depthBucket];

        batch.trails.moveTo(x - Math.cos(particle.angle) * stretch, y - Math.sin(particle.angle) * stretch * 1.7);
        batch.trails.lineTo(x, y);
        batch.dots.moveTo(x + size, y);
        batch.dots.arc(x, y, size, 0, Math.PI * 2);
      });

      context.globalCompositeOperation = "lighter";
      batches.forEach((depthBatches, colorIndex) => {
        depthBatches.forEach((batch, depthBucket) => {
          const depthAlpha = (0.22 + depthBucket * 0.23) * bootEase;
          context.strokeStyle = `rgba(${palette[colorIndex]},${depthAlpha * 0.72})`;
          context.lineWidth = 0.55 + depthBucket * 0.35;
          context.stroke(batch.trails);
          context.fillStyle = `rgba(${palette[colorIndex]},${depthAlpha})`;
          context.fill(batch.dots);
        });
      });
      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", trackPointer, { passive: true });
    frame = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", trackPointer);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`${styles.portalOverlay} ${forming ? styles.portalForming : ""} ${closing ? styles.portalClosing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="RaidGuild transit portal"
    >
      <canvas className={styles.portalCanvas} ref={canvasRef} aria-hidden="true" />
      <div className={styles.portalAtmosphere} aria-hidden="true" />
      <button
        className={`${styles.portalMachine} ${styles.portalHire}`}
        type="button"
        onClick={onEnter}
        disabled={forming}
        aria-label="Hire RaidGuild"
      >
        <span className={styles.portalHalo} />
        <span className={styles.portalThreshold}><Sigil /></span>
        <span className={styles.portalChoiceLabel}><small>01 / COMMISSION</small>HIRE THE GUILD <i>↗</i></span>
      </button>
      <button
        className={`${styles.portalMachine} ${styles.portalJoin}`}
        type="button"
        onClick={onJoin}
        disabled={forming}
        aria-label="Join RaidGuild in a new tab"
      >
        <span className={styles.portalHalo} />
        <span className={styles.portalThreshold}><Sigil /></span>
        <span className={styles.portalChoiceLabel}><small>02 / PARTICIPATE</small>JOIN THE GUILD <i>↗</i></span>
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
          <p><span /> Two transit windows open</p>
          <h2>CHOOSE YOUR<br /><em>PORTAL.</em></h2>
          <small>COMMISSION A RAID OR ENTER THE GUILD</small>
        </div>
      )}
      <p className={styles.portalCoordinates}>39°44′N / 104°59′W<br />DESTINATION: UNMAPPED</p>
    </div>
  );
}

export default function HomeExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeField, setActiveField] = useState(0);
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalForming, setPortalForming] = useState(false);
  const [portalClosing, setPortalClosing] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const fieldTrackRef = useRef<HTMLDivElement>(null);
  const horizontalPanRef = useRef(0);
  const portalTimerRef = useRef<number | null>(null);
  const portalFormTimerRef = useRef<number | null>(null);

  const openPortal = () => {
    if (portalFormTimerRef.current) window.clearTimeout(portalFormTimerRef.current);
    setPortalOpen(true);
    setPortalForming(true);
    portalFormTimerRef.current = window.setTimeout(() => setPortalForming(false), 3400);
  };

  const dismissPortal = (enter = false) => {
    if (portalClosing) return;
    if (portalFormTimerRef.current) window.clearTimeout(portalFormTimerRef.current);
    setPortalForming(false);
    setPortalClosing(true);
    portalTimerRef.current = window.setTimeout(() => {
      setPortalOpen(false);
      setPortalClosing(false);
      if (enter) document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, enter ? 920 : 620);
  };

  const joinGuild = () => {
    window.open("https://portal.raidguild.org", "_blank", "noopener,noreferrer");
    dismissPortal(false);
  };

  useEffect(() => () => {
    if (portalTimerRef.current) window.clearTimeout(portalTimerRef.current);
    if (portalFormTimerRef.current) window.clearTimeout(portalFormTimerRef.current);
  }, []);

  const scrollFields = (direction: number) => {
    const track = fieldTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.78, behavior: "smooth" });
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
      const horizontal = event.clientX / window.innerWidth;
      const leftReveal = 1 - horizontal;
      const rightReveal = horizontal;
      root.style.setProperty("--neo-pointer-x", x.toFixed(3));
      root.style.setProperty("--neo-pointer-y", y.toFixed(3));
      root.style.setProperty("--neo-sky-x", `${(x * 10).toFixed(1)}px`);
      root.style.setProperty("--neo-land-x", `${(x * -10).toFixed(1)}px`);
      root.style.setProperty("--neo-fore-left-x", `${(-120 - leftReveal * 115).toFixed(1)}px`);
      root.style.setProperty("--neo-fore-right-x", `${(90 + rightReveal * 110).toFixed(1)}px`);
      root.style.setProperty("--neo-title-x", `${(x * 8).toFixed(1)}px`);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  useEffect(() => {
    const updateHorizontalPan = (event: WheelEvent) => {
      const hero = heroRef.current;
      if (!hero || Math.abs(event.deltaX) < Math.abs(event.deltaY) || Math.abs(event.deltaX) < 1) return;

      const bounds = hero.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

      event.preventDefault();
      horizontalPanRef.current = Math.min(1, Math.max(-1, horizontalPanRef.current + event.deltaX * 0.0018));
      const pan = horizontalPanRef.current;
      const root = document.documentElement;
      root.style.setProperty("--neo-track-title-x", `${(pan * 72).toFixed(1)}px`);
      root.style.setProperty("--neo-track-land-x", `${(pan * -34).toFixed(1)}px`);
      root.style.setProperty("--neo-track-sky-x", `${(pan * -14).toFixed(1)}px`);
      root.style.setProperty("--neo-track-fore-x", `${(pan * 6).toFixed(1)}px`);
    };

    window.addEventListener("wheel", updateHorizontalPan, { passive: false });
    return () => window.removeEventListener("wheel", updateHorizontalPan);
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
    <main className={`${styles.site} ${portalForming ? styles.siteGlitching : ""}`}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="RaidGuild home">
          <Sigil />
          <span>RAID<br />GUILD</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary navigation">
          <a href="#practice" onClick={() => setMenuOpen(false)}>Our craft</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Field notes</a>
          <a href="#guild" onClick={() => setMenuOpen(false)}>The guild</a>
          <a
            className={styles.navCta}
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              openPortal();
            }}
          >
            Open a portal ↗
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
        <div className={styles.heroStage}>
          <div className={styles.heroCelestial} aria-hidden="true">
            <span className={styles.moonLarge} />
            <span className={styles.moonSmall} />
            <span className={styles.orbitLine} />
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <Image
              src="/images/neo/raidguild-panorama.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroWash} />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> Independent digital mercenaries</p>
            <h1>VENTURE<br /><em>BEYOND.</em></h1>
          </div>
          <div className={styles.heroSupplement}>
            <p className={styles.heroDek}>
              We are a builder-owned collective turning ambitious ideas into digital worlds worth inhabiting.
            </p>
            <a href="#practice" className={styles.discover}>
              <span>Enter the world</span>
              <i>↓</i>
            </a>
          </div>
          <div className={styles.heroIndex}>
            <span>TRANSMISSION</span>
            <strong>001</strong>
            <small>SCROLL TO DESCEND</small>
          </div>
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
          <span>STRATEGY</span><i>✦</i><span>DESIGN</span><i>✦</i><span>ENGINEERING</span><i>✦</i>
          <span>SMART CONTRACTS</span><i>✦</i><span>AI SYSTEMS</span><i>✦</i><span>STRATEGY</span><i>✦</i>
          <span>DESIGN</span><i>✦</i><span>ENGINEERING</span><i>✦</i>
        </div>
      </div>

      <section className={styles.prologue} id="guild">
        <div className={styles.prologueMark}>
          <div className={styles.orbit}><Sigil /></div>
          <span>THE MANY / AS ONE</span>
        </div>
        <div className={styles.prologueCopy}>
          <p className={styles.sectionLabel}>[ THE GUILD ]</p>
          <h2>Many disciplines.<br />One expert <em>party.</em></h2>
          <div className={styles.prologueBody}>
            <p>
              Since 2019, we’ve gathered rare designers, engineers, strategists, and operators around one table. No layers. No handoffs into the void. The people imagining the work are the people making it real.
            </p>
            <p className={styles.stat}><strong>70+</strong><span>raids shipped<br />across the frontier</span></p>
          </div>
        </div>
        <div className={styles.guildRoster}>
          <div className={styles.rosterHeading}>
            <div>
              <p className={styles.sectionLabel}>[ CURRENT STEWARDS ]</p>
              <h3>Keepers of the signal.</h3>
            </div>
            <div className={styles.rosterAside}>
              <p>Five active stewards hold the guild&apos;s shared context, rituals, infrastructure, and public voice.</p>
              <a href="https://portal.raidguild.org" target="_blank" rel="noreferrer">Open the join portal <span>↗</span></a>
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
                    {steward.image ? (
                      <Image src={steward.image} alt="" fill sizes="180px" />
                    ) : (
                      <span>{steward.initials}</span>
                    )}
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

          <div className={styles.memberMarquee}>
            <div className={styles.memberRail}>
              {[...guildMembers, ...guildMembers].map((member, index) => {
                const content = (
                  <>
                    <Image src={member.imagePath} alt="" width={58} height={58} />
                    <span><strong>{member.name}</strong><small>{member.title}</small></span>
                  </>
                );
                return member.link ? (
                  <a href={member.link} target="_blank" rel="noreferrer" key={`${member.name}-${index}`}>{content}<i>↗</i></a>
                ) : (
                  <div key={`${member.name}-${index}`}>{content}</div>
                );
              })}
            </div>
          </div>
          <p className={styles.rosterFootnote}>DRAG TO EXPLORE · HOVER TO HOLD THE TRANSMISSION · SELECT A MEMBER TO FOLLOW THEIR WORK</p>
        </div>
      </section>

      <section className={styles.practice} id="practice">
        <div className={styles.practiceHeading}>
          <p className={styles.sectionLabel}>[ OUR CRAFT ]</p>
          <h2>From first signal<br />to <em>living system.</em></h2>
          <div className={styles.practiceAside}>
            <p>Bring us the problem that won’t leave you alone.</p>
            <a href="#contact">Open a hire portal <span>↘</span></a>
          </div>
        </div>
        <div className={styles.disciplineGrid}>
          {disciplines.map((item) => (
            <article className={styles.discipline} key={item.index}>
              <div className={styles.disciplineTop}>
                <span>{item.index}</span>
                <i>↗</i>
              </div>
              <div className={styles.disciplineGlyph} aria-hidden="true"><span /><span /><span /></div>
              <p className={styles.disciplineTag}>{item.tag}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fieldNotes} id="work">
        <div className={styles.fieldIntro}>
          <p className={styles.sectionLabel}>[ SELECTED EXPEDITIONS ]</p>
          <h2>Proof from<br />the <em>frontier.</em></h2>
          <div className={styles.fieldAside}>
            <p>Artifacts, protocols, and communities built with people brave enough to go first.</p>
            <a href="https://portal.raidguild.org/posts" target="_blank" rel="noreferrer">Open the full blog <span>↗</span></a>
          </div>
        </div>

        <div className={styles.fieldControls}>
          <p><strong>{String(activeField + 1).padStart(2, "0")}</strong> / {String(fieldNotes.length).padStart(2, "0")}</p>
          <div>
            <button type="button" onClick={() => scrollFields(-1)} aria-label="Previous field note">←</button>
            <button type="button" onClick={() => scrollFields(1)} aria-label="Next field note">→</button>
          </div>
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
                <a href="#contact">Portal dispatch <span>↗</span></a>
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

      <section className={styles.contact} id="contact">
        <div className={styles.contactIntro}>
          <p className={styles.sectionLabel}>[ BEGIN A TRANSMISSION ]</p>
          <h2>What impossible thing<br />are you <em>building?</em></h2>
          <p className={styles.contactDek}>Send the first signal. Tell us who you are, what world you&apos;re trying to make, and what it will take to get there.</p>
          <dl className={styles.contactProtocol}>
            <div><dt>RESPONSE</dt><dd>WITHIN 48 HOURS</dd></div>
            <div><dt>CHANNEL</dt><dd>SECURE / HUMAN</dd></div>
            <div><dt>STATUS</dt><dd><span /> RECEIVING</dd></div>
          </dl>
        </div>
        <div className={styles.contactFormShell}>
          <div className={styles.formCoordinates}><span>RG—INTAKE / 001</span><span>ENCRYPTION: OPEN</span></div>
          <HireUs />
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#top"><Sigil /><span>RAID<br />GUILD</span></a>
        <p>WE BUILD THE ROADS<br />THROUGH UNMAPPED TERRITORY.</p>
        <div className={styles.socials}>
          <a href="https://github.com/raid-guild">GITHUB ↗</a>
          <a href="https://x.com/RaidGuild">X / TWITTER ↗</a>
          <a href="https://discord.gg/2vx47gT95y">DISCORD ↗</a>
        </div>
        <small>© 2019—2026 RAIDGUILD · EARTH &amp; ELSEWHERE</small>
      </footer>

      <PortalOverlay
        open={portalOpen}
        forming={portalForming}
        closing={portalClosing}
        onClose={() => dismissPortal(false)}
        onEnter={() => dismissPortal(true)}
        onJoin={joinGuild}
      />
    </main>
  );
}
