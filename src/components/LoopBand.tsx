"use client";

import { useState, type ReactNode } from "react";
import styles from "./HomeExperience.module.css";

export default function LoopBand({ children, label, reverse = false }: { children: ReactNode; label: string; reverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  return <section className={`${styles.loopBand} ${reverse ? styles.metricBand : styles.wordBand}`} aria-label={label}>
    <div className={styles.loopViewport}>
      <div className={styles.loopTrack} style={{ animationPlayState: paused ? "paused" : undefined }}>
        <div className={styles.loopGroup}>{children}</div>
        <div className={styles.loopGroup} aria-hidden="true">{children}</div>
      </div>
    </div>
    <button type="button" className={styles.loopPause} onClick={() => setPaused(!paused)} aria-label={`${paused ? "Resume" : "Pause"} ${label}`} aria-pressed={paused}>{paused ? "▶" : "Ⅱ"}</button>
  </section>;
}
