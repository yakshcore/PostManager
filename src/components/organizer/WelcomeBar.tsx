"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { EventRecord } from "@/lib/types";

interface WelcomeBarProps {
  displayName: string;
  events: EventRecord[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewEvent: () => Promise<void>;
  onExport: () => void;
}

export function WelcomeBar({ displayName, events, activeId, onSelect, onNewEvent, onExport }: WelcomeBarProps) {
  const [creating, setCreating] = useState(false);

  return (
    <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile sm:font-headline-lg sm:text-headline-lg text-on-surface font-bold tracking-tight">
            Welcome back, {displayName} 👋
          </h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-tertiary/10 text-tertiary font-semibold">
            Pro Organizer Plan
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your events, attendee engagement links, and viral social reach in real time.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all cursor-pointer">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary-container" />
          </span>
          <div className="flex flex-col text-left min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium leading-none">Active Event</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight truncate max-w-[220px]">
              {events.find((e) => e.id === activeId)?.name ?? "—"}
            </span>
          </div>
          <Icon name="keyboard_arrow_down" className="text-on-surface-variant text-[18px]" />
          {/* Native select overlays the pill: accessible and works well on mobile. */}
          <select
            aria-label="Switch active event"
            className="absolute inset-0 opacity-0 cursor-pointer"
            value={activeId}
            onChange={(e) => onSelect(e.target.value)}
          >
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-lowest shadow-sm font-label-lg text-label-lg text-on-surface hover:bg-surface-container hover:text-primary transition-all"
          type="button"
          onClick={onExport}
        >
          <Icon name="download" className="text-[18px] text-on-surface-variant" />
          Export Analytics
        </button>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container font-label-lg text-label-lg text-on-primary font-semibold shadow-sm hover:bg-primary transition-all active:scale-[0.99] disabled:opacity-60"
          type="button"
          disabled={creating}
          onClick={async () => {
            setCreating(true);
            try {
              await onNewEvent();
              document.getElementById("event-config")?.scrollIntoView({ behavior: "smooth" });
            } finally {
              setCreating(false);
            }
          }}
        >
          <Icon name={creating ? "progress_activity" : "add"} className={`text-[20px] ${creating ? "animate-spin" : ""}`} />
          New Event
        </button>
      </div>
    </section>
  );
}
