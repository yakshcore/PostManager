"use client";

import { useMemo, useState } from "react";
import { MetricsGrid } from "./MetricsGrid";
import { EventConfigForm } from "./EventConfigForm";
import { LiveEventCard } from "./LiveEventCard";
import { RecentPostsTable } from "./RecentPostsTable";
import { WelcomeBar } from "./WelcomeBar";
import { useEventConfig } from "@/hooks/useEventConfig";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { sampleCommunityPosts } from "@/lib/sample-data";
import { eventSlug } from "@/lib/event-config";
import type { CommunityPost } from "@/lib/types";

// Stitch sample totals; locally generated posts are added on top.
const SAMPLE_TOTAL = 842;

function toCsv(posts: CommunityPost[]) {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = posts.map((p) =>
    [p.name, p.role, new Date(p.createdAt).toISOString(), p.tone, p.status, p.text].map((v) => esc(String(v))).join(","),
  );
  return ["name,role,created_at,tone,status,text", ...rows].join("\n");
}

export function OrganizerDashboard() {
  const [event, saveEvent] = useEventConfig();
  const { posts: localPosts } = useCommunityPosts();
  const [now] = useState(() => Date.now());

  const posts = useMemo(() => [...localPosts, ...sampleCommunityPosts(now)], [localPosts, now]);
  const published = localPosts.filter((p) => p.status === "published").length;

  const exportCsv = () => {
    const blob = new Blob([toCsv(posts)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${eventSlug(event.name)}-posts.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="flex flex-col w-full space-y-8">
      <WelcomeBar eventName={event.name} onExport={exportCsv} />
      <MetricsGrid topTag={event.hashtags[0] ?? "—"} />
      <section id="event-config" className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start scroll-mt-24">
        <EventConfigForm saved={event} onSave={saveEvent} />
        <div className="lg:col-span-5 space-y-6">
          <LiveEventCard event={event} postCount={SAMPLE_TOTAL + published} />
        </div>
      </section>
      <RecentPostsTable posts={posts} totalCount={SAMPLE_TOTAL + localPosts.length} organizer={event.organizer} />
    </div>
  );
}
