"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { useEffect } from "react";
import { analyticsEvents, trackAnalyticsEvent } from "@/lib/analytics";

const redactUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url, window.location.origin);
    parsedUrl.search = "";
    parsedUrl.hash = "";
    return parsedUrl.toString();
  } catch {
    return url.split("?")[0].split("#")[0];
  }
};

export default function VercelAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest("[data-click]");
      if (!(trackedElement instanceof HTMLElement)) return;

      const cta = trackedElement.getAttribute("data-click");
      if (!cta) return;

      trackAnalyticsEvent(analyticsEvents.ctaClick, { cta });
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => ({
        ...event,
        url: redactUrl(event.url),
      })}
    />
  );
}
