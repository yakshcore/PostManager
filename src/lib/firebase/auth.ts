"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth, firebaseConfigured } from "./client";

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: firebaseConfigured });
  useEffect(() => {
    if (!firebaseConfigured) return;
    return onAuthStateChanged(auth(), (user) => setState({ user, loading: false }));
  }, []);
  return state;
}

/** Organizers sign in with email/password; anonymous sessions are attendees. */
export const isOrganizer = (user: User | null): user is User => !!user && !user.isAnonymous;

/** Attendees get a silent anonymous session so their posts can be saved under security rules. */
export async function ensureSignedIn(): Promise<User> {
  const a = auth();
  await a.authStateReady();
  return a.currentUser ?? (await signInAnonymously(a)).user;
}

export async function signInWithEmail(email: string, password: string, mode: "signin" | "signup") {
  const a = auth();
  return mode === "signup"
    ? (await createUserWithEmailAndPassword(a, email, password)).user
    : (await signInWithEmailAndPassword(a, email, password)).user;
}

export const signOut = () => fbSignOut(auth());

export function authErrorMessage(err: unknown): string {
  const code = err instanceof FirebaseError ? err.code : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/email-already-in-use":
      return "An account with this email already exists — sign in instead.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a minute and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Couldn't sign you in. Please try again.";
  }
}
