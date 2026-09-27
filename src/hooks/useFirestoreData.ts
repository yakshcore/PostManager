"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createEvent, subscribeEvent, subscribeOwnerEvents } from "@/lib/firebase/events";
import { DEFAULT_EVENT } from "@/lib/event-config";
import { subscribePosts } from "@/lib/firebase/posts";
import type { CommunityPost, EventRecord } from "@/lib/types";

type Loadable<T> = { data: T; loading: boolean; error: string | null };

function friendly(err: Error): string {
  const code = (err as { code?: string }).code;
  if (code === "permission-denied") return "You don't have access to this data.";
  if (code === "unavailable") return "Can't reach the database. Check your connection.";
  if (code === "failed-precondition") return "The database isn't set up yet (Firestore not created).";
  return "Couldn't load data from the database.";
}

/** Live single event (public read — used by the attendee portal). */
export function useEvent(id: string | null): Loadable<EventRecord | null> {
  const [state, setState] = useState<Loadable<EventRecord | null>>({ data: null, loading: !!id, error: null });
  useEffect(() => {
    if (!id) return setState({ data: null, loading: false, error: null });
    setState((s) => ({ ...s, loading: true }));
    return subscribeEvent(
      id,
      (data) => setState({ data, loading: false, error: null }),
      (e) => setState({ data: null, loading: false, error: friendly(e) }),
    );
  }, [id]);
  return state;
}

/** Live posts for an event (organizer only). */
export function useEventPosts(eventId: string | null): Loadable<CommunityPost[]> {
  const [state, setState] = useState<Loadable<CommunityPost[]>>({ data: [], loading: !!eventId, error: null });
  useEffect(() => {
    if (!eventId) return setState({ data: [], loading: false, error: null });
    setState({ data: [], loading: true, error: null });
    return subscribePosts(
      eventId,
      (data) => setState({ data, loading: false, error: null }),
      (e) => setState({ data: [], loading: false, error: friendly(e) }),
    );
  }, [eventId]);
  return state;
}

// ---- Active event selection (per browser; the events themselves live in Firestore) ----

const ACTIVE_KEY = "postmanager:activeEvent";
const activeListeners = new Set<() => void>();

function readActive(): string | null {
  try {
    return localStorage.getItem(ACTIVE_KEY);
  } catch {
    return null;
  }
}

export function setActiveEventId(id: string) {
  try {
    localStorage.setItem(ACTIVE_KEY, id);
  } catch {}
  activeListeners.forEach((l) => l());
}

export function useActiveEventId(): string | null {
  return useSyncExternalStore(
    (l) => {
      activeListeners.add(l);
      return () => activeListeners.delete(l);
    },
    readActive,
    () => null,
  );
}

/** The organizer's events. Creates a starter event on first sign-in. */
export function useOrganizerEvents(uid: string | null) {
  const [state, setState] = useState<Loadable<EventRecord[]>>({ data: [], loading: !!uid, error: null });
  const storedActive = useActiveEventId();

  useEffect(() => {
    if (!uid) return setState({ data: [], loading: false, error: null });
    setState({ data: [], loading: true, error: null });
    let creating = false;
    return subscribeOwnerEvents(
      uid,
      (events) => {
        if (events.length === 0 && !creating) {
          creating = true;
          createEvent(uid)
            .then(setActiveEventId)
            .catch((e: Error) => setState({ data: [], loading: false, error: friendly(e) }));
          return;
        }
        setState({ data: events, loading: events.length === 0, error: null });
      },
      (e) => setState({ data: [], loading: false, error: friendly(e) }),
    );
  }, [uid]);

  const events = state.data;
  const active = events.find((e) => e.id === storedActive) ?? events[events.length - 1] ?? null;

  const newEvent = useCallback(async () => {
    if (!uid) return;
    // Keep the organizer's links; start the event-specific fields fresh.
    const id = await createEvent(uid, { ...(active ?? DEFAULT_EVENT), name: "Untitled Event", hashtags: [], guidance: "" });
    setActiveEventId(id);
  }, [uid, active]);

  return { ...state, events, active, select: setActiveEventId, newEvent };
}
