"use client";

import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./client";
import type { CommunityPost, ToneId } from "@/lib/types";

const postsOf = (eventId: string) => collection(db(), "events", eventId, "posts");

export interface NewPost {
  authorUid: string;
  name: string;
  role: string;
  tone: ToneId;
  text: string;
  imageCount: number;
}

export async function createPost(eventId: string, post: NewPost): Promise<string> {
  const ref = await addDoc(postsOf(eventId), {
    ...post,
    name: post.name.slice(0, 80),
    role: post.role.slice(0, 160),
    text: post.text.slice(0, 6000),
    status: "draft",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export function setPostStatus(eventId: string, postId: string, status: "copied" | "published") {
  return updateDoc(doc(postsOf(eventId), postId), { status });
}

/** Most recent posts for an event (organizer only, enforced by rules). */
export function subscribePosts(
  eventId: string,
  onData: (posts: CommunityPost[]) => void,
  onError: (e: Error) => void,
  max = 500,
) {
  return onSnapshot(
    query(postsOf(eventId), orderBy("createdAt", "desc"), limit(max)),
    (snap) =>
      onData(
        snap.docs.map((d) => {
          const p = d.data({ serverTimestamps: "estimate" });
          return {
            id: d.id,
            name: p.name || "Anonymous attendee",
            role: p.role || "Attendee",
            createdAt: p.createdAt?.toMillis?.() ?? Date.now(),
            tone: p.tone,
            text: p.text ?? "",
            status: p.status ?? "draft",
            imageCount: typeof p.imageCount === "number" ? p.imageCount : 0,
          } satisfies CommunityPost;
        }),
      ),
    onError,
  );
}
