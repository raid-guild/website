// Fathom.tsx
"use client";

import { load, trackEvent, trackPageview } from "fathom-client";
import { useEffect, Suspense, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const FATHOM_ID = "ASGWDEGI";

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the Fathom script on mount
  useEffect(() => {
    load(FATHOM_ID, {
      auto: false,
    });
    setIsLoaded(true);
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParams?.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  // Set up link listeners
  useEffect(() => {
    console.log("yolo");
    if (!isLoaded) return;

    // window.addEventListener("load", () => {
    document.querySelectorAll("[data-click]").forEach((item) => {
      item.addEventListener("click", () => {
        const tag = item.getAttribute("data-click");
        console.log("tag", tag);
        trackEvent(`link: ${tag}}`);
      });
    });
    // });
  }, [isLoaded]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
