"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

export default function HomeExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeField, setActiveField] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const fieldTrackRef = useRef<HTMLDivElement>(null);
  const horizontalPanRef = useRef(0);

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
      root.style.setProperty("--neo-pan-progress", Math.abs(pan).toFixed(3));
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
          root.style.setProperty("--neo-land-y", `${(distance * 0.12).toFixed(1)}px`);
          root.style.setProperty("--neo-copy-y", `${(distance * -0.3).toFixed(1)}px`);
          root.style.setProperty("--neo-meta-y", `${(distance * -0.18).toFixed(1)}px`);
          root.style.setProperty("--neo-coord-y", `${(distance * 0.22).toFixed(1)}px`);
          root.style.setProperty("--neo-fore-y", `${(distance * -0.3).toFixed(1)}px`);
          root.style.setProperty("--neo-copy-opacity", (1 - progress * 0.72).toFixed(3));
          root.style.setProperty("--neo-meta-opacity", (1 - progress).toFixed(3));
          root.style.setProperty("--neo-coord-opacity", (0.7 - progress * 0.7).toFixed(3));
          root.style.setProperty("--neo-meter-opacity", (0.65 - progress * 0.5).toFixed(3));
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
    <main className={styles.site}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="RaidGuild home">
          <Sigil />
          <span>RAID<br />GUILD</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary navigation">
          <a href="#practice" onClick={() => setMenuOpen(false)}>Our craft</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Field notes</a>
          <a href="#guild" onClick={() => setMenuOpen(false)}>The guild</a>
          <a className={styles.navCta} href="#contact" onClick={() => setMenuOpen(false)}>Open a portal ↗</a>
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
          <div className={styles.coordinates}>39°44′N · 104°59′W<br />EST. BLOCK 8,212,019</div>
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
          <div className={styles.depthMeter} aria-hidden="true">
            <span>TWO-FINGER PAN</span><i /><small>↔</small>
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
          <h2>Not an agency.<br />A <em>party</em> of experts.</h2>
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
            <p>Five active stewards hold the guild&apos;s shared context, rituals, infrastructure, and public voice.</p>
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
          <p>Bring us the problem that won’t leave you alone.</p>
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
          <p>Artifacts, protocols, and communities built with people brave enough to go first.</p>
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
        <div>
          <p className={styles.sectionLabel}>[ BEGIN A TRANSMISSION ]</p>
          <h2>What impossible thing<br />are you <em>building?</em></h2>
        </div>
        <a href="mailto:hello@raidguild.org" className={styles.portalLink}>
          <span>Tell us everything</span>
          <i>↗</i>
        </a>
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
    </main>
  );
}
