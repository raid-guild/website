"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./FrontDoor.module.css";

export default function FrontDoor({ onEnter }: { onEnter: (destination: string) => void }) {
  const [opening, setOpening] = useState(false);
  const leaving = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        enter("top");
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", key);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [enter, onEnter]);

  return (
    <section className={`${styles.door} ${opening ? styles.opening : ""}`} aria-label="Welcome to RaidGuild">
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
        <h1>A community for<br />curious minds.</h1>
        <p>A builder-owned network of creative and technical people who like solving hard problems.</p>
        <p className={styles.homeNote}>Our community home—for shared work, experiments, and a little weirdness.</p>
        <nav className={styles.offerings} aria-label="Work with the network">
          <h2>Work with the network</h2>
          <a href="https://raidguild.ai/" target="_blank" rel="noreferrer">
            <span><strong>Applied AI</strong><small>Explore the AI practice · raidguild.ai</small></span><span aria-hidden="true">↗</span>
          </a>
          <a href="#project-inquiry" onClick={(event) => { event.preventDefault(); enter("project-inquiry"); }}>
            <span><strong>Onchain systems</strong><small>Bring us a protocol, product, or web3 challenge</small></span><span aria-hidden="true">↓</span>
          </a>
          <a href="#placement" onClick={(event) => { event.preventDefault(); enter("placement"); }}>
            <span><strong>Talent &amp; placement</strong><small>Find creative and technical people for your team</small></span><span aria-hidden="true">↓</span>
          </a>
        </nav>
        <a className={styles.explore} href="#top" onClick={(event) => { event.preventDefault(); enter("top"); }}>
          Venture Beyond <span aria-hidden="true">↓</span>
          <small>Meet the network. Explore our world.</small>
        </a>
        <a className={styles.join} href="#guild" onClick={(event) => { event.preventDefault(); enter("guild"); }}>Join the Guild <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
