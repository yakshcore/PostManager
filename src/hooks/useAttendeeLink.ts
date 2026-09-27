"use client";

import { useSyncExternalStore } from "react";
import { encodeEvent, eventSlug } from "@/lib/event-config";
import type { EventConfig } from "@/lib/types";

const noop = () => () => {};

/** Self-contained attendee link: the event config rides in `?e=` so no backend is needed. */
export function useAttendeeLink(event: EventConfig): string {
  const origin = useSyncExternalStore(noop, () => window.location.origin, () => "");
  return `${origin}/attendee/${eventSlug(event.name)}?e=${encodeEvent(event)}`;
}
