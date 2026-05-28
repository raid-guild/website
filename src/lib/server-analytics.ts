import { track } from "@vercel/analytics/server";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

export const serverAnalyticsEvents = {
  consultationSubmitted: "Consultation Submitted",
  consultationSubmitFailed: "Consultation Submit Failed",
} as const;

export async function trackServerAnalyticsEvent(
  eventName: string,
  properties?: AnalyticsProperties,
  request?: Request
) {
  try {
    await track(
      eventName,
      properties,
      request ? { request: { headers: request.headers } } : undefined
    );
  } catch (error) {
    console.error("Vercel Analytics server event failed:", eventName, error);
  }
}
