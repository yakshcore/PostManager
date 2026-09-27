"use client";

import { useMemo } from "react";
import { MetricsGrid } from "./MetricsGrid";
import { EventConfigForm } from "./EventConfigForm";
import { LiveEventCard } from "./LiveEventCard";
import { RecentPostsTable } from "./RecentPostsTable";
import { WelcomeBar } from "./WelcomeBar";
import { SignInCard } from "@/components/auth/SignInCard";
import { StatusCard } from "@/components/ui/StatusCard";
import { isOrganizer, useAuth } from "@/lib/firebase/auth";
import { firebaseConfigured } from "@/lib/firebase/client";
import { updateEvent } from "@/lib/firebase/events";
import { useEventPosts, useOrganizerEvents } from "@/hooks/useFirestoreData";
import { usePublishHeaderEvent } from "@/hooks/useHeaderEvent";
import { computeMetrics } from "@/lib/metrics";
import { eventSlug } from "@/lib/event-config";
import type { CommunityPost, EventConfig } from "@/lib/types";

function toCsv(posts: CommunityPost[]) {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = posts.map((p) =>
    [p.name, p.role, new Date(p.createdAt).toISOString(), p.tone, p.status, String(p.imageCount), p.text].map(esc).join(","),
  );
  return ["name,role,created_at,tone,status,photos,text", ...rows].join("\n");
}

export function OrganizerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const organizer = isOrganizer(user) ? user : null;
  const { events, active, loading, error, select, newEvent } = useOrganizerEvents(organizer?.uid ?? null);
  const posts = useEventPosts(active?.id ?? null);
  usePublishHeaderEvent(active);

  const metrics = useMemo(
    () => computeMetrics(posts.data, active?.hashtags ?? [], active?.visits ?? 0),
    [posts.data, active?.hashtags, active?.visits],
  );

  if (!firebaseConfigured)
    return <StatusCard icon="database" title="Firebase isn't configured" tone="error">Set the NEXT_PUBLIC_FIREBASE_* variables in .env.local and restart.</StatusCard>;
  if (authLoading) return <StatusCard icon="progress_activity" title="Loading…" spinning />;
  if (!organizer) return <SignInCard />;
  if (error) return <StatusCard icon="cloud_off" title="Couldn't load your events" tone="error">{error}</StatusCard>;
  if (loading || !active) return <StatusCard icon="progress_activity" title="Setting up your dashboard…" spinning />;

  const save = (next: EventConfig) => updateEvent(active.id, next);

  const exportCsv = () => {
    const blob = new Blob([toCsv(posts.data)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${eventSlug(active.name)}-posts.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="flex flex-col w-full space-y-8">
      <WelcomeBar
        displayName={organizer.displayName || organizer.email?.split("@")[0] || "Organizer"}
        events={events}
        activeId={active.id}
        onSelect={select}
        onNewEvent={newEvent}
        onExport={exportCsv}
      />
      <MetricsGrid m={metrics} />
      <section id="event-config" className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start scroll-mt-24">
        {/* key: reset the form's draft when switching events */}
        <EventConfigForm key={active.id} saved={active} onSave={save} />
        <div className="lg:col-span-5 space-y-6">
          <LiveEventCard event={active} stats={{ published: metrics.published, photos: metrics.photos, visits: metrics.visits }} />
        </div>
      </section>
      <RecentPostsTable
        posts={posts.data}
        totalCount={posts.data.length}
        organizer={active.organizer}
        loading={posts.loading}
        error={posts.error}
      />
    </div>
  );
}
