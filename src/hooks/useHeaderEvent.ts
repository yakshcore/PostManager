"use client";

import { useEffect, useSyncExternalStore } from "react";

// The header shows whichever event the current page is working with.
let current: { id: string; name: string } | null = null;
const listeners = new Set<() => void>();

function set(next: typeof current) {
  current = next;
  listeners.forEach((l) => l());
}

export function useHeaderEvent() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => null,
  );
}

export function usePublishHeaderEvent(event: { id: string; name: string } | null) {
  const id = event?.id;
  const name = event?.name;
  useEffect(() => {
    set(id && name ? { id, name } : null);
    return () => set(null);
  }, [id, name]);
}
