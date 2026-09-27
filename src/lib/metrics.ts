import type { CommunityPost } from "./types";

export interface EventMetrics {
  total: number;
  today: number;
  yesterday: number;
  /** % change today vs yesterday, null when there's no baseline. */
  delta: number | null;
  peakHour: string | null;
  published: number;
  photos: number;
  visits: number;
  /** Posts generated per portal visit, 0–100. */
  conversion: number;
  topTag: string | null;
  topTagShare: number;
}

const DAY = 86_400_000;

function formatHour(h: number) {
  const suffix = h < 12 ? "AM" : "PM";
  return `${h % 12 || 12}:00 ${suffix}`;
}

export function computeMetrics(posts: CommunityPost[], hashtags: string[], visits: number, now = Date.now()): EventMetrics {
  const startOfToday = new Date(now).setHours(0, 0, 0, 0);
  const todayPosts = posts.filter((p) => p.createdAt >= startOfToday);
  const yesterday = posts.filter((p) => p.createdAt >= startOfToday - DAY && p.createdAt < startOfToday).length;

  const hours = new Map<number, number>();
  todayPosts.forEach((p) => {
    const h = new Date(p.createdAt).getHours();
    hours.set(h, (hours.get(h) ?? 0) + 1);
  });
  const peak = [...hours.entries()].sort((a, b) => b[1] - a[1])[0];

  let topTag: string | null = null;
  let topCount = 0;
  for (const tag of hashtags) {
    const t = tag.toLowerCase();
    const count = posts.filter((p) => p.text.toLowerCase().includes(t)).length;
    if (count > topCount) [topTag, topCount] = [tag, count];
  }

  return {
    total: posts.length,
    today: todayPosts.length,
    yesterday,
    delta: yesterday ? Math.round(((todayPosts.length - yesterday) / yesterday) * 100) : null,
    peakHour: peak ? formatHour(peak[0]) : null,
    published: posts.filter((p) => p.status === "published").length,
    photos: posts.reduce((n, p) => n + p.imageCount, 0),
    visits,
    conversion: visits ? Math.min(100, Math.round((posts.length / visits) * 1000) / 10) : 0,
    topTag: topTag ?? hashtags[0] ?? null,
    topTagShare: posts.length ? Math.round((topCount / posts.length) * 100) : 0,
  };
}

export function compact(n: number): string {
  return new Intl.NumberFormat("en", { notation: n >= 10_000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(n);
}
