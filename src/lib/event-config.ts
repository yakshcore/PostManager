import type { EventConfig } from "./types";

export const DEFAULT_EVENT: EventConfig = {
  name: "Google H2S Bootcamp 2025",
  organizer: "Google for Developers",
  hashtags: ["#GoogleH2S", "#GoogleDevelopers", "#TechBootcamp2025", "#CloudSkills"],
  linkedinUrl: "https://linkedin.com/company/google",
  twitterUrl: "https://x.com/GoogleDevs",
  websiteUrl: "https://developers.google.com/events/h2s-bootcamp",
  guidance:
    "Learned scalable cloud architecture, built with Gemini API, and collaborated with 200+ top engineering fellows.",
  location: "Mountain View Campus & Global Hybrid",
  dateLabel: "March 2025",
};

export function normalizeHashtag(raw: string): string | null {
  const tag = raw.trim().replace(/^#+/, "").replace(/[^\p{L}\p{N}_]/gu, "");
  return tag ? `#${tag}` : null;
}

export function sanitizeEvent(input: unknown): EventConfig | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;
  const str = (k: keyof EventConfig, max = 500) =>
    typeof o[k] === "string" ? (o[k] as string).slice(0, max) : DEFAULT_EVENT[k as never];
  const hashtags = Array.isArray(o.hashtags)
    ? o.hashtags
        .filter((t): t is string => typeof t === "string")
        .map(normalizeHashtag)
        .filter((t): t is string => !!t)
        .slice(0, 10)
    : DEFAULT_EVENT.hashtags;
  return {
    name: str("name", 120),
    organizer: str("organizer", 120),
    hashtags,
    linkedinUrl: str("linkedinUrl", 300),
    twitterUrl: str("twitterUrl", 300),
    websiteUrl: str("websiteUrl", 300),
    guidance: str("guidance", 1000),
    location: str("location", 120),
    dateLabel: str("dateLabel", 60),
  };
}

export function eventSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "event";
}

/** Accepts either a full URL or a bare @handle for X. */
export function twitterHref(value: string): string {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  return `https://x.com/${v.replace(/^@/, "")}`;
}

export function twitterHandle(value: string): string {
  const v = value.trim().replace(/\/+$/, "");
  return v.split("/").pop()?.replace(/^@/, "") || v;
}
