"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Mercenary } from "@/lib/data/members";
import styles from "./HomeExperience.module.css";

export default function TeamWall({ members }: { members: Mercenary[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const hover = useRef(false);
  const focused = useRef(false);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const resumeAt = useRef(0);
  const suppressClick = useRef(false);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 50);
      previous = now;
      if (visible && !document.hidden && !motion.matches && !paused.current && !hover.current && !focused.current && !drag.current && now > resumeAt.current) {
        const group = element.firstElementChild?.firstElementChild as HTMLElement | null;
        const distance = group ? group.getBoundingClientRect().width + 14 : 0;
        if (distance > 0) {
          position = (position + elapsed * .018) % distance;
          element.scrollLeft = position;
        }
      } else {
        position = element.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  return (
    <div className={styles.teamWall}>
      <div
        ref={viewport}
        className={styles.memberMarquee}
        role="region"
        aria-label="Guild members; swipe or drag to explore"
        tabIndex={0}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") hover.current = true; }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") { hover.current = false; if (drag.current && !drag.current.moved) drag.current = null; } }}
        onFocusCapture={() => { focused.current = true; }}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) focused.current = false; }}
        onWheel={() => { resumeAt.current = performance.now() + 2500; }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          suppressClick.current = false;
          drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start || event.pointerType !== "mouse") return;
          const delta = event.clientX - start.x;
          if (Math.abs(delta) > 5) {
            start.moved = true;
            suppressClick.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.scrollLeft = start.scroll - delta;
          }
        }}
        onPointerUp={() => { drag.current = null; resumeAt.current = performance.now() + 2500; }}
        onPointerCancel={() => { drag.current = null; resumeAt.current = performance.now() + 2500; }}
        onLostPointerCapture={() => { drag.current = null; }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); suppressClick.current = false; } }}
      >
        <div className={styles.memberLoop}>
          {[0, 1].map((copy) => (
            <div className={styles.memberRail} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {members.map((member) => {
                const content = <><Image src={member.imagePath} alt="" width={58} height={58} draggable={false} /><span><strong>{member.name}</strong><small>{member.title}</small></span></>;
                return member.link
                  ? <a href={member.link} target="_blank" rel="noreferrer" key={member.name} tabIndex={copy === 1 ? -1 : undefined}>{content}<i>↗</i></a>
                  : <div key={member.name}>{content}</div>;
              })}
            </div>
          ))}
        </div>
      </div>
      <button className={styles.teamMotionToggle} type="button" aria-pressed={isPaused} onClick={() => { paused.current = !isPaused; setPaused(!isPaused); }}>
        {isPaused ? "Resume movement" : "Pause movement"}
      </button>
    </div>
  );
}
