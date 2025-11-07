"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Drip {
  id: number;
  left: number;
  delay: number;
  duration: number;
  width: number;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const { isTriggered } = useLegacy();
  const [drips, setDrips] = useState<Drip[]>([]);
  const [poolHeight, setPoolHeight] = useState(0);
  const brandRgb = "189, 72, 45";

  useEffect(() => {
    if (isTriggered) {
      // Generate random drips
      const newDrips: Drip[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1000,
        duration: Math.random() * 1000 + 1500,
        width: Math.random() * 3 + 2,
      }));
      setDrips(newDrips);

      // Gradually fill the pool at bottom
      const poolInterval = setInterval(() => {
        setPoolHeight((prev) => Math.min(prev + 2, 100));
      }, 50);

      return () => clearInterval(poolInterval);
    }
  }, [isTriggered]);

  return (
    <>
      {children}

      {isTriggered && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Top blood source - dripping edge */}
          <div
            className="absolute top-0 left-0 right-0 h-8"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(${brandRgb}, 0.9) 0%, 
                rgba(${brandRgb}, 0.7) 50%,
                transparent 100%)`,
              boxShadow: `0 4px 20px rgba(${brandRgb}, 0.6)`,
              animation: "bloodSpread 1s ease-out forwards",
            }}
          />

          {/* Individual drips */}
          {drips.map((drip) => (
            <div
              key={drip.id}
              className="absolute top-0"
              style={{
                left: `${drip.left}%`,
                width: `${drip.width}px`,
                animation: `drip ${drip.duration}ms ease-in forwards`,
                animationDelay: `${drip.delay}ms`,
              }}
            >
              {/* Drip body */}
              <div
                style={{
                  width: "100%",
                  height: "100vh",
                  background: `linear-gradient(to bottom, 
                    rgba(${brandRgb}, 0.9) 0%, 
                    rgba(${brandRgb}, 0.8) 20%,
                    rgba(${brandRgb}, 0.6) 80%,
                    transparent 100%)`,
                  filter: "blur(0.5px)",
                }}
              />

              {/* Drip tip */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: `${drip.width * 1.5}px`,
                  height: `${drip.width * 2}px`,
                  background: `radial-gradient(circle, rgba(${brandRgb}, 0.95), transparent)`,
                  borderRadius: "50%",
                  animation: "dripTip 0.5s ease-in-out infinite",
                  animationDelay: `${drip.delay}ms`,
                }}
              />
            </div>
          ))}

          {/* Blood pool rising from bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-100"
            style={{
              height: `${poolHeight}%`,
              background: `linear-gradient(to top, 
                rgba(${brandRgb}, 0.95) 0%, 
                rgba(${brandRgb}, 0.85) 30%,
                rgba(${brandRgb}, 0.6) 70%,
                transparent 100%)`,
              boxShadow: `0 -10px 40px rgba(${brandRgb}, 0.5)`,
            }}
          />

          {/* Splatter effects */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`splatter-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60 + 20}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                background: `rgba(${brandRgb}, ${Math.random() * 0.4 + 0.5})`,
                borderRadius: `${Math.random() * 50}% ${Math.random() * 50}% ${
                  Math.random() * 50
                }% ${Math.random() * 50}%`,
                filter: "blur(1px)",
                opacity: 0,
                animation: `splatter 0.3s ease-out forwards`,
                animationDelay: `${Math.random() * 1500}ms`,
              }}
            />
          ))}

          {/* Vignette for mood */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.7) 100%)",
              animation: "fadeIn 2s ease-out forwards",
            }}
          />
        </div>
      )}
    </>
  );
}

function useLegacy() {
  const router = useRouter();
  const [isTriggered, setIsTriggered] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");
  const sequenceRef = useRef<string[]>([]);
  const triggerWord = "witch";
  const pattern = ["potion", "ball", "candle"];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Add the pressed key to our buffer
      const newTyped = typedKeys + e.key.toLowerCase();
      setTypedKeys(newTyped);

      // Clear the buffer after 2 seconds of no typing
      clearTimeout(timeout);
      timeout = setTimeout(() => setTypedKeys(""), 2000);

      // Check if the trigger word was typed
      if (newTyped.includes(triggerWord.toLowerCase())) {
        setIsTriggered(true);
        setTypedKeys("");

        // Wait for animation to complete before routing
        setTimeout(() => {
          router.push("/witch");
        }, 2000); // Adjust timing to match your animation duration
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const legacyId = target.getAttribute("data-legacy");

      // Only track clicks on elements with data-easter-egg attribute
      if (!legacyId) return;

      sequenceRef.current = [...sequenceRef.current, legacyId].slice(
        -pattern.length
      );

      if (sequenceRef.current.join(",") === pattern.join(",")) {
        setIsTriggered(true);
        sequenceRef.current = [];

        setTimeout(() => {
          router.push("/witch");
        }, 2000);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("click", handleClick);

      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedKeys, router]);

  return { isTriggered };
}
