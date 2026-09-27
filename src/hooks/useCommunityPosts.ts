"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { CommunityPost } from "@/lib/types";

const KEY = "postmanager:posts";
const MAX_STORED = 50;
const EMPTY: CommunityPost[] = [];
const listeners = new Set<() => void>();
let cache: CommunityPost[] | null = null;

function read(): CommunityPost[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache!;
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: CommunityPost[]) {
  cache = next.slice(0, MAX_STORED);
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {}
  listeners.forEach((l) => l());
}

/** Posts generated in this browser. There's no backend, so the organizer feed shows these plus sample rows. */
export function useCommunityPosts() {
  const posts = useSyncExternalStore(subscribe, read, () => EMPTY);

  const add = useCallback((post: CommunityPost) => write([post, ...read()]), []);
  const markCopied = useCallback(
    (id: string) => write(read().map((p) => (p.id === id && p.status !== "published" ? { ...p, status: "copied" } : p))),
    [],
  );
  const markPublished = useCallback(
    (id: string) => write(read().map((p) => (p.id === id ? { ...p, status: "published" } : p))),
    [],
  );

  return { posts, add, markCopied, markPublished };
}
