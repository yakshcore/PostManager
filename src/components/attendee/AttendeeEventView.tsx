"use client";

import { useEffect } from "react";
import { AttendeeGenerator } from "./AttendeeGenerator";
import { StatusCard } from "@/components/ui/StatusCard";
import { useEvent } from "@/hooks/useFirestoreData";
import { usePublishHeaderEvent } from "@/hooks/useHeaderEvent";
import { ensureSignedIn } from "@/lib/firebase/auth";
import { firebaseConfigured } from "@/lib/firebase/client";
import { recordVisit } from "@/lib/firebase/events";

export function AttendeeEventView({ eventId }: { eventId: string }) {
  const { data: event, loading, error } = useEvent(firebaseConfigured ? eventId : null);
  usePublishHeaderEvent(event);

  const found = !!event;
  useEffect(() => {
    if (!found) return;
    ensureSignedIn()
      .then(() => recordVisit(eventId))
      .catch(() => {});
  }, [found, eventId]);

  if (!firebaseConfigured) return <StatusCard icon="database" title="Firebase isn't configured" tone="error" />;
  if (loading) return <StatusCard icon="progress_activity" title="Loading event…" spinning />;
  if (error) return <StatusCard icon="cloud_off" title="Couldn't load this event" tone="error">{error}</StatusCard>;
  if (!event)
    return (
      <StatusCard icon="event_busy" title="Event not found">
        This link may be mistyped or the event was removed. Ask your organizer for a fresh link.
      </StatusCard>
    );

  return <AttendeeGenerator event={event} />;
}
