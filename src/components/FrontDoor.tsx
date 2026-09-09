"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./FrontDoor.module.css";

export default function FrontDoor({ onEnter }: { onEnter: (destination: string) => void }) {
  const [opening, setOpening] = useState(false);
  const leaving = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<number | null>(null);
  const enter = useCallback((destination: string) => {
    if (leaving.current) return;
    leaving.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (destination !== "top" || reduced) {
      onEnter(destination);
      return;
    }
    setOpening(true);
    timer.current = setTimeout(() => onEnter(destination), 1450);
  }, [onEnter]);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.location.hash && window.location.hash !== "#top") {
      onEnter(window.location.hash.slice(1));
    }
    const wheel = (event: WheelEvent) => {
      if (event.deltaY > 20 && !event.ctrlKey) enter("top");
    };
    const key = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Escape"].includes(event.key)) {
        event.preventDefault();
        enter("top");
      }
    };
    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [enter, onEnter]);

  return (
    <section className={`${styles.door} ${opening ? styles.opening : ""}`} aria-label="Welcome to RaidGuild"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientY; }}
      onTouchEnd={(event) => {
        if (touchStart.current !== null && touchStart.current - event.changedTouches[0].clientY > 70
          && event.currentTarget.scrollHeight <= event.currentTarget.clientHeight + 2) enter("top");
        touchStart.current = null;
      }}>
      <div className={styles.canopy} aria-hidden="true">
        {[styles.upperLeft, styles.upperRight, styles.middleLeft, styles.middleRight, styles.lowerLeft, styles.lowerRight].map((cluster) => (
          <div className={`${styles.cluster} ${cluster}`} key={cluster}>
            <div className={`${styles.leaves} ${styles.left}`} />
            <div className={`${styles.leaves} ${styles.right}`} />
          </div>
        ))}
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.brand}>
          {/* Existing identity artwork; the foliage is also reused from the hero. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/neo/raidguild-swords.png" alt="" width="48" height="48" />
          <span>RAIDGUILD</span>
        </div>
        <h1>Creative minds.<br />Technical depth.</h1>
        <p>We’re a network of designers, engineers, and curious people solving ambitious problems together.</p>
        <div className={styles.services}>Digital products · Applied AI · Onchain systems · Placement services</div>
        <a className={styles.contact} href="#project-inquiry" onClick={(event) => { event.preventDefault(); enter("project-inquiry"); }}>
          Let’s talk about your project <span aria-hidden="true">↗</span>
        </a>
        <a className={styles.explore} href="#top" onClick={(event) => { event.preventDefault(); enter("top"); }}>
          Venture Beyond <span aria-hidden="true">↓</span>
          <small>Explore the people, the work, the Guild</small>
        </a>
      </div>
      <div className={styles.bottom}>
        <span>INDEPENDENT MINDS. SHARED AMBITION.</span>
        <a href="#guild" onClick={(event) => { event.preventDefault(); enter("guild"); }}>Here to join? Meet the Guild <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
