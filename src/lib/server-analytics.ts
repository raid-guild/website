import { track } from "@vercel/analytics/server";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

const ANALYTICS_HEADER_ALLOWLIST = [
  "accept-language",
  "user-agent",
  "x-forwarded-for",
  "x-real-ip",
  "x-vercel-ip",
] as const;

export const serverAnalyticsEvents = {
  consultationSubmitted: "Consultation Submitted",
  consultationSubmitFailed: "Consultation Submit Failed",
} as const;

function getAnalyticsHeaders(request: Request) {
  const headers = new Headers();

  for (const key of ANALYTICS_HEADER_ALLOWLIST) {
    const value = request.headers.get(key);
    if (value) headers.set(key, value);
  }

  return headers;
}

export async function trackServerAnalyticsEvent(
  eventName: string,
  properties?: AnalyticsProperties,
  request?: Request
) {
  try {
    await track(
      eventName,
      properties,
      request ? { request: { headers: getAnalyticsHeaders(request) } } : undefined
    );
  } catch (error) {
    console.error("Vercel Analytics server event failed:", eventName, error);
  }
}
