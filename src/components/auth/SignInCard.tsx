"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { authErrorMessage, signInWithEmail } from "@/lib/firebase/auth";

const INPUT =
  "w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-primary-container/20 transition-all placeholder:text-outline";

export function SignInCard() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signInWithEmail(email.trim(), password, mode);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="max-w-md mx-auto w-full bg-surface-container-lowest rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
      <div className="space-y-1.5 text-center">
        <div className="mx-auto w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon name="event_available" className="text-[24px]" />
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
          {mode === "signin" ? "Organizer sign in" : "Create an organizer account"}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your events, attendee links and the live post feed.
        </p>
      </div>

      <form className="space-y-4" onSubmit={submit}>
        <div className="space-y-1.5">
          <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" required className={INPUT} value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">Password</label>
          <input id="password" type="password" required minLength={6} className={INPUT} value={password}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        </div>
        {error && (
          <p role="alert" className="flex items-center gap-1.5 p-2.5 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm">
            <Icon name="error" className="text-[16px]" />
            {error}
          </p>
        )}
        <button type="submit" disabled={busy}
          className="w-full px-5 py-2.5 rounded-lg bg-primary-container font-label-lg text-label-lg text-on-primary font-semibold shadow-sm hover:bg-primary transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60">
          {busy && <Icon name="progress_activity" className="text-[18px] animate-spin" />}
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
        {mode === "signin" ? "New organizer?" : "Already have an account?"}{" "}
        <button type="button" className="font-semibold text-primary hover:underline"
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }}>
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </section>
  );
}
