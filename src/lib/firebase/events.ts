"use client";

import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentSnapshot,
} from "firebase/firestore";
import { db } from "./client";
import { DEFAULT_EVENT, sanitizeEvent } from "@/lib/event-config";
import type { EventConfig, EventRecord } from "@/lib/types";

const EVENTS = "events";

function toRecord(snap: DocumentSnapshot): EventRecord | null {
  const data = snap.data({ serverTimestamps: "estimate" });
  const config = data && sanitizeEvent(data);
  if (!data || !config) return null;
  return {
    ...config,
    id: snap.id,
    ownerUid: String(data.ownerUid ?? ""),
    visits: typeof data.visits === "number" ? data.visits : 0,
    createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
  };
}

function configFields(c: EventConfig): EventConfig {
  const { name, organizer, hashtags, linkedinUrl, twitterUrl, websiteUrl, guidance, location, dateLabel } = c;
  return { name, organizer, hashtags, linkedinUrl, twitterUrl, websiteUrl, guidance, location, dateLabel };
}

export async function createEvent(ownerUid: string, config: EventConfig = DEFAULT_EVENT): Promise<string> {
  const ref = await addDoc(collection(db(), EVENTS), {
    ...configFields(config),
    ownerUid,
    visits: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export function updateEvent(id: string, config: EventConfig) {
  return updateDoc(doc(db(), EVENTS, id), { ...configFields(config), updatedAt: serverTimestamp() });
}

/** Counts one attendee portal visit per browser session. */
export async function recordVisit(id: string) {
  const key = `postmanager:visited:${id}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {}
  await updateDoc(doc(db(), EVENTS, id), { visits: increment(1) }).catch(() => {});
}

export function subscribeEvent(id: string, onData: (e: EventRecord | null) => void, onError: (e: Error) => void) {
  return onSnapshot(doc(db(), EVENTS, id), (snap) => onData(snap.exists() ? toRecord(snap) : null), onError);
}

export function subscribeOwnerEvents(uid: string, onData: (events: EventRecord[]) => void, onError: (e: Error) => void) {
  // Sorted client-side to avoid needing a composite index.
  return onSnapshot(
    query(collection(db(), EVENTS), where("ownerUid", "==", uid)),
    (snap) =>
      onData(
        snap.docs
          .map(toRecord)
          .filter((e): e is EventRecord => !!e)
          .sort((a, b) => a.createdAt - b.createdAt),
      ),
    onError,
  );
}
