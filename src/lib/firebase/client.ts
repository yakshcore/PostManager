"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Web config is public by design; access control lives in firestore.rules.
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

function app(): FirebaseApp {
  if (!firebaseConfigured) throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* in .env.local.");
  return getApps().length ? getApp() : initializeApp(config);
}

export const auth = (): Auth => getAuth(app());
export const db = (): Firestore => getFirestore(app());

let analyticsStarted = false;
/** Analytics only runs in supported browsers (not SSR, not blocked by extensions). */
export async function startAnalytics() {
  if (analyticsStarted || !firebaseConfigured || !config.measurementId) return;
  analyticsStarted = true;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (await isSupported()) getAnalytics(app());
}
