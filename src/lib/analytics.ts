"use client";

import { track } from "@vercel/analytics";

type AnalyticsPropertyValue = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;
type PlausibleEventOptions = {
  props?: Record<string, string | number | boolean | null>;
};

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: PlausibleEventOptions
    ) => void;
  }
}

export const analyticsEvents = {
  ctaClick: "CTA Click",
  hireFormViewed: "Hire Form Viewed",
  hireFormStepCompleted: "Hire Form Step Completed",
  hireFormSubmitAttempt: "Hire Form Submit Attempt",
  hireFormSubmitSuccess: "Hire Form Submit Success",
  hireFormSubmitError: "Hire Form Submit Error",
  contactFormSubmitAttempt: "Contact Form Submit Attempt",
  contactFormSubmitSuccess: "Contact Form Submit Success",
  contactFormSubmitError: "Contact Form Submit Error",
  joinSignupAttempt: "Join Signup Attempt",
  joinSignupSuccess: "Join Signup Success",
  joinSignupError: "Join Signup Error",
  cohortHeroEmailSignup: "Cohort Hero Email Signup",
  witchTriggered: "Witch Triggered",
} as const;

export function trackAnalyticsEvent(
  eventName: string,
  properties?: AnalyticsProperties
) {
  const safeProperties = normalizeAnalyticsProperties(properties);

  try {
    track(eventName, safeProperties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Vercel Analytics event failed:", eventName, error);
    }
  }

  try {
    if (typeof window === "undefined" || !window.plausible) return;

    window.plausible(eventName, { props: safeProperties });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Plausible Analytics event failed:", eventName, error);
    }
  }
}

function normalizeAnalyticsProperties(properties?: AnalyticsProperties) {
  if (!properties) return {};

  const normalized: Record<string, string | number | boolean | null> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (value === undefined) continue;

    const normalizedKey = normalizeAnalyticsKey(key);
    normalized[normalizedKey] = value;
  }

  return normalized;
}

function normalizeAnalyticsKey(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase();
}
