"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_EVENT, sanitizeEvent, STORAGE_KEY } from "@/lib/event-config";
import type { EventConfig } from "@/lib/types";

// Organizer settings persist in localStorage; subscribers (header, dashboard, attendee view) stay in sync.
const listeners = new Set<() => void>();
let cache: EventConfig | null = null;

function read(): EventConfig {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = (raw && sanitizeEvent(JSON.parse(raw))) || DEFAULT_EVENT;
  } catch {
    cache = DEFAULT_EVENT;
  }
  return cache;
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveEventConfig(next: EventConfig) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode) — keep the in-memory copy.
  }
  emit();
}

export function useEventConfig(): [EventConfig, (next: EventConfig) => void] {
  const event = useSyncExternalStore(subscribe, read, () => DEFAULT_EVENT);
  const save = useCallback((next: EventConfig) => saveEventConfig(next), []);
  return [event, save];
}
