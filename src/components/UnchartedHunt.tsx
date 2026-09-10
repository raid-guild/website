"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./UnchartedHunt.module.css";

const artifacts = {
  portal: { name: "Portal Motion", clue: "I connect two places without being a road. What am I?", answer: "portal", url: "https://portal-artifacts-production.up.railway.app/portal-motion/" },
  ship: { name: "Rift Plot", clue: "A ship sends me across the void so others know where it is. I am a…", answer: "signal", url: "https://portal-artifacts-production.up.railway.app/veydrift-mission-explorer/" },
  walker: { name: "Desert Walker", clue: "Go fast alone. Go far…", answer: "together", url: "https://portal-artifacts-production.up.railway.app/desert-walker/" },
} as const;
type Key = keyof typeof artifacts;
const keys = Object.keys(artifacts) as Key[];
const storageKey = "raidguild.uncharted.v1";
const hints: Record<Key, string> = {
  portal: "A doorway between worlds. You just opened one.",
  ship: "Not the message itself, but what carries it. A distress _____.",
  walker: "Alone is fast. ________ is far.",
};
const welcome = String.raw`
 __        __ _____  _      ____   ___   __  __  _____
 \ \      / /| ____|| |    / ___| / _ \ |  \/  || ____|
  \ \ /\ / / |  _|  | |   | |    | | | || |\/| ||  _|
   \ V  V /  | |___ | |___| |___ | |_| || |  | || |___
    \_/\_/   |_____||_____|\____| \___/ |_|  |_||_____|

       A D V E N T U R E R
       ──────────────────
 Looking beneath the surface? You might be one of us.
 Three destinations. One uncharted path.

 raidguild.help()                 Start here
 raidguild.clue("portal")         Ask for a clue
 raidguild.hint("portal")         Get a stronger hint
 raidguild.solve("portal", "…")   Try an answer
 raidguild.progress()             Check your discoveries
 raidguild.reset()                Start again

 No downloads, wallets, or pasted scripts required.
 Prefer to explore visually? Follow the rabbit, then the ✧ marks.
 Meet the Guild: https://portal.raidguild.org
`;

type Hunt = { found: Key[]; solve: (key: Key, answer: string) => string; reset: () => void };
const HuntContext = createContext<Hunt | null>(null);

export function UnchartedHunt({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<Key[]>([]);
  const foundRef = useRef<Key[]>([]);
  function save(next: Key[]) {
    foundRef.current = next;
    setFound(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Play still works without storage. */ }
  }
  function solve(key: Key, answer: string) {
    if (!keys.includes(key) || typeof answer !== "string") return 'Try raidguild.clue("portal"), "ship", or "walker".';
    if (answer.trim().toLowerCase() !== artifacts[key].answer) return "Not quite. Follow the clue and try again.";
    if (!foundRef.current.includes(key)) save([...foundRef.current, key]);
    return `Discovered: ${artifacts[key].name}. ${artifacts[key].url}`;
  }
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) {
        const valid = keys.filter(key => saved.includes(key));
        foundRef.current = valid;
        setFound(valid);
      }
    } catch { /* Ignore invalid or unavailable storage. */ }
    const api = {
      help: () => 'Follow the rabbit in Open a Portal, then find ✧ beside the hero ship route and beneath the Creed. Glowing pixels offer extra hints. Commands: clue(key), hint(key), solve(key, answer), progress(), reset(). Keys: portal, ship, walker.',
      clue: (key: Key) => artifacts[key]?.clue || "Choose portal, ship, or walker.",
      hint: (key: Key) => hints[key] || "Choose portal, ship, or walker.",
      solve,
      progress: () => `${foundRef.current.length}/3 discovered: ${foundRef.current.join(", ") || "none yet"}`,
      reset: () => { save([]); return "The path is uncharted again."; },
    };
    const host = window as typeof window & { raidguild?: typeof api; __raidguildGreeting?: boolean };
    const previous = host.raidguild;
    host.raidguild = api;
    if (!host.__raidguildGreeting) { console.info(welcome); host.__raidguildGreeting = true; }
    return () => { if (host.raidguild === api) host.raidguild = previous; };
    // Commands read current discoveries through the ref, not a captured render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <HuntContext.Provider value={{ found, solve, reset: () => save([]) }}>{children}</HuntContext.Provider>;
}

export function HuntMarker({ artifact, label, rabbit = false }: { artifact: Key; label: string; rabbit?: boolean }) {
  const hunt = useContext(HuntContext);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  if (!hunt) return null;
  const unlocked = hunt.found.includes(artifact);
  return <details className={`${styles.marker} ${rabbit ? styles.rabbit : ""}`}>
    <summary aria-label={label}>
      {rabbit ? <svg viewBox="0 0 48 48" width="32" height="32" aria-hidden="true" fill="currentColor">
        <path d="M14 24C9 19 8 5 12 4c4-1 7 11 8 17 1-7 4-17 8-16 4 2-1 14-5 19 5 2 7 6 6 10 5 0 10 3 10 6H15C7 40 5 34 8 29c1-2 3-4 6-5Z" />
        <circle cx="8" cy="35" r="5" />
        <circle cx="22" cy="28" r="1.3" fill="#102d2c" />
      </svg> : "✧"} <span>{label}</span>
    </summary>
    <div className={styles.note}>
      <strong>The Uncharted Portal</strong>
      {rabbit && <p>Some trails begin beneath the surface. Inspect closely. Or follow the clues right here.</p>}
      <p>{artifacts[artifact].clue}</p>
      {!unlocked && <details className={styles.extraHint}>
        <summary>Another hint?</summary>
        <p>{hints[artifact]}</p>
      </details>}
      {!unlocked ? <form onSubmit={event => { event.preventDefault(); setMessage(hunt.solve(artifact, answer)); }}>
        <label>Your answer<input value={answer} onChange={event => setAnswer(event.target.value)} autoComplete="off" /></label>
        <button type="submit">Try the signal</button>
      </form> : <a href={artifacts[artifact].url} target="_blank" rel="noreferrer">Explore {artifacts[artifact].name} ↗</a>}
      <p role="status">{unlocked ? `Artifact discovered. ${hunt.found.length}/3 found.` : message}</p>
      <small>Opens an experimental Guild artifact in another tab. Progress stays on this device; visiting is optional.</small>
      {hunt.found.length === 3 && <p>The uncharted path is yours. <a href="https://portal.raidguild.org/modules?view=arcade" target="_blank" rel="noreferrer">Discover the arcade ↗</a> Games may require Portal membership.</p>}
      <button type="button" onClick={() => { hunt.reset(); setMessage(""); setAnswer(""); }}>Reset discoveries</button>
    </div>
  </details>;
}

export function HuntPixel({ artifact }: { artifact: Key }) {
  return <details className={`${styles.marker} ${styles.pixel}`}>
    <summary aria-label={`Reveal a hint for the ${artifact} puzzle`} title="A faint signal">
      <span aria-hidden="true" />
    </summary>
    <div className={styles.note}>
      <strong>A faint signal</strong>
      <p>{hints[artifact]}</p>
      <small>Try this clue at the nearby {artifact === "portal" ? "rabbit" : "✧ mark"}. Tap the glowing pixel again to close.</small>
    </div>
  </details>;
}
