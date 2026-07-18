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

const sanitizeCtaDestination = (destination: string) => {
  if (destination.startsWith("#")) return destination;

  try {
    const parsedUrl = new URL(destination, window.location.origin);
    parsedUrl.search = "";

    if (parsedUrl.origin === window.location.origin) {
      return `${parsedUrl.pathname}${parsedUrl.hash}`;
    }

    return parsedUrl.toString();
  } catch {
    return destination.split("?")[0];
  }
};

const getElementLabel = (element: HTMLElement) =>
  (
    element.getAttribute("aria-label") ||
    element.textContent ||
    element.getAttribute("title") ||
    ""
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

const getCtaDestination = (element: HTMLElement) => {
  const explicitDestination = element.getAttribute("data-click-destination");
  if (explicitDestination) return sanitizeCtaDestination(explicitDestination);

  const linkElement =
    element instanceof HTMLAnchorElement
      ? element
      : element.querySelector("a[href]") || element.closest("a[href]");

  if (linkElement instanceof HTMLAnchorElement) {
    return sanitizeCtaDestination(linkElement.href);
  }

  return undefined;
};

const getCtaLocation = (element: HTMLElement, ctaId: string) => {
  const explicitLocation = element.getAttribute("data-click-location");
  if (explicitLocation) return explicitLocation;

  if (ctaId.endsWith("-header")) return "header";
  if (ctaId.endsWith("-hero")) return "hero";
  if (ctaId.endsWith("-mercenaries")) return "mercenaries_section";

  return undefined;
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

      trackAnalyticsEvent(analyticsEvents.ctaClick, {
        cta_id: cta,
        label: getElementLabel(trackedElement),
        location: getCtaLocation(trackedElement, cta),
        destination: getCtaDestination(trackedElement),
      });
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
