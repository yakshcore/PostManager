"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { HashtagInput } from "./HashtagInput";
import { DEFAULT_EVENT } from "@/lib/event-config";
import type { EventConfig } from "@/lib/types";

interface EventConfigFormProps {
  saved: EventConfig;
  onSave: (next: EventConfig) => void;
}

const INPUT =
  "w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-primary-container/20 transition-all placeholder:text-outline";
const LABEL = "block font-label-md text-label-md text-on-surface font-semibold";

function isUrlOrEmpty(v: string) {
  if (!v.trim()) return true;
  try {
    return /^https?:$/.test(new URL(v).protocol);
  } catch {
    return false;
  }
}

export function EventConfigForm({ saved, onSave }: EventConfigFormProps) {
  const [base, setBase] = useState(saved);
  const [draft, setDraft] = useState(saved);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EventConfig, string>>>({});

  // Re-sync when the stored config changes (hydration or another tab).
  if (saved !== base) {
    setBase(saved);
    setDraft(saved);
  }

  useEffect(() => {
    if (!justSaved) return;
    const t = setTimeout(() => setJustSaved(false), 3500);
    return () => clearTimeout(t);
  }, [justSaved]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const set = <K extends keyof EventConfig>(k: K, v: EventConfig[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const next: typeof errors = {};
    if (!draft.name.trim()) next.name = "Event name is required.";
    if (!draft.organizer.trim()) next.organizer = "Organizer is required.";
    if (!isUrlOrEmpty(draft.linkedinUrl)) next.linkedinUrl = "Enter a full URL starting with https://";
    if (!isUrlOrEmpty(draft.websiteUrl)) next.websiteUrl = "Enter a full URL starting with https://";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSaving(true);
    // Brief delay mirrors the Stitch save feedback so the state change is visible.
    setTimeout(() => {
      onSave({ ...draft, name: draft.name.trim(), organizer: draft.organizer.trim() });
      setSaving(false);
      setJustSaved(true);
    }, 400);
  };

  const err = (k: keyof EventConfig) =>
    errors[k] && <p className="font-body-sm text-body-sm text-error mt-1">{errors[k]}</p>;

  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-start justify-between gap-4 pb-4 bg-surface-container-low/40 -mx-5 sm:-mx-7 -mt-5 sm:-mt-7 p-5 sm:p-7 rounded-t-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Icon name="tune" className="text-primary-container text-[22px]" />
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Event Details & Social Configuration</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Configure the parameters attendees will automatically see and inherit when generating their LinkedIn posts.
          </p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm shrink-0 font-medium ${
            dirty ? "bg-secondary-fixed/50 text-secondary" : "bg-surface-container text-on-surface-variant"
          }`}
        >
          {dirty ? "Unsaved Changes" : "Auto-Sync On"}
        </span>
      </div>

      <form className="space-y-5" onSubmit={submit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={LABEL} htmlFor="event-name">Event Name</label>
            <input className={INPUT} id="event-name" placeholder="e.g. NextGen AI Summit 2025" type="text"
              value={draft.name} maxLength={120} onChange={(e) => set("name", e.target.value)} />
            {err("name")}
          </div>
          <div className="space-y-1.5">
            <label className={LABEL} htmlFor="organizer-name">Organizer / Host Name</label>
            <input className={INPUT} id="organizer-name" placeholder="e.g. Acme Cloud Corp" type="text"
              value={draft.organizer} maxLength={120} onChange={(e) => set("organizer", e.target.value)} />
            {err("organizer")}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={LABEL}>Official Event Hashtags</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended: 3-5 tags</span>
          </div>
          <HashtagInput value={draft.hashtags} onChange={(tags) => set("hashtags", tags)} />
        </div>

        <div className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <label className={LABEL} htmlFor="linkedin-url">LinkedIn Company / Page URL</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 flex items-center justify-center w-5 h-5 rounded bg-[#0A66C2] text-white font-bold text-[11px] select-none">in</span>
              <input className={`${INPUT} pl-11`} id="linkedin-url" placeholder="https://linkedin.com/company/your-brand"
                type="url" value={draft.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
            </div>
            {err("linkedinUrl")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={LABEL} htmlFor="twitter-url">X / Twitter URL or Handle</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 flex items-center justify-center w-5 h-5 rounded bg-on-surface text-surface-container-lowest font-bold text-[11px] select-none">𝕏</span>
                <input className={`${INPUT} pl-11`} id="twitter-url" placeholder="https://x.com/yourhandle" type="text"
                  value={draft.twitterUrl} onChange={(e) => set("twitterUrl", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={LABEL} htmlFor="website-url">Event Website / Landing Page</label>
              <div className="relative flex items-center">
                <Icon name="link" className="absolute left-3.5 text-on-surface-variant text-[18px]" />
                <input className={`${INPUT} pl-11`} id="website-url" placeholder="https://your-event.com" type="url"
                  value={draft.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} />
              </div>
              {err("websiteUrl")}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label className={LABEL} htmlFor="prompt-guidance">AI Generation Guidance & Key Takeaways Hint</label>
            <span className="hidden sm:inline font-body-sm text-body-sm text-on-surface-variant shrink-0">Default context for attendees</span>
          </div>
          <textarea className={`${INPUT} leading-relaxed`} id="prompt-guidance" rows={3} maxLength={1000}
            value={draft.guidance} onChange={(e) => set("guidance", e.target.value)} />
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
            <Icon name="info" className="text-[15px] text-primary-container" />
            Attendees can customize this, but our AI will inject these talking points into their initial drafted post.
          </p>
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
          <button className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-variant font-label-lg text-label-lg text-on-surface-variant transition-colors"
            type="button" onClick={() => { setDraft(DEFAULT_EVENT); setErrors({}); }}>
            Reset Defaults
          </button>
          <div className="flex items-center gap-3">
            {justSaved && !dirty && (
              <span className="text-tertiary font-label-md text-label-md flex items-center gap-1" role="status">
                <Icon name="check_circle" className="text-[16px]" />
                Changes saved!
              </span>
            )}
            <button
              className="px-5 py-2.5 rounded-lg bg-primary-container font-label-lg text-label-lg text-on-primary font-semibold shadow-sm hover:bg-primary transition-all active:scale-[0.99] flex items-center gap-2 disabled:opacity-60"
              type="submit" disabled={saving}>
              <Icon name={saving ? "refresh" : "save"} className={`text-[18px] ${saving ? "animate-spin" : ""}`} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
