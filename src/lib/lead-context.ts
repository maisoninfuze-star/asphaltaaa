/**
 * Capture UTM parameters, referrer and landing page for CRM/GoHighLevel routing.
 * Client-only; returns {} during SSR.
 */
export type LeadContext = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;
};

const KEY = "aaa-lead-ctx";

export function captureLeadContext(): void {
  if (typeof window === "undefined") return;
  try {
    // Only capture once per session (first-touch attribution).
    if (sessionStorage.getItem(KEY)) return;
    const p = new URLSearchParams(window.location.search);
    const ctx: LeadContext = {
      utm_source: p.get("utm_source") || undefined,
      utm_medium: p.get("utm_medium") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
      utm_content: p.get("utm_content") || undefined,
      utm_term: p.get("utm_term") || undefined,
      landing_page: window.location.pathname,
      referrer: document.referrer || undefined,
    };
    sessionStorage.setItem(KEY, JSON.stringify(ctx));
  } catch {}
}

export function getLeadContext(): LeadContext {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
