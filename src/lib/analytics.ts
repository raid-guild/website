"use client";

import { track } from "@vercel/analytics";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

export const analyticsEvents = {
  ctaClick: "CTA Click",
  hireFormViewed: "Hire Form Viewed",
  hireFormStepCompleted: "Hire Form Step Completed",
  hireFormSubmitAttempt: "Hire Form Submit Attempt",
  hireFormSubmitSuccess: "Hire Form Submit Success",
  hireFormSubmitError: "Hire Form Submit Error",
  joinSignupAttempt: "Join Signup Attempt",
  joinSignupSuccess: "Join Signup Success",
  joinSignupError: "Join Signup Error",
} as const;

export function trackAnalyticsEvent(
  eventName: string,
  properties?: AnalyticsProperties
) {
  try {
    track(eventName, properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Vercel Analytics event failed:", eventName, error);
    }
  }
}

