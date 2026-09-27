"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

interface WelcomeBarProps {
  eventName: string;
  onExport: () => void;
}

export function WelcomeBar({ eventName, onExport }: WelcomeBarProps) {
  return (
    <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile sm:font-headline-lg sm:text-headline-lg text-on-surface font-bold tracking-tight">
            Welcome back, Sarah 👋
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
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all cursor-pointer">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary-container" />
          </span>
          <div className="flex flex-col text-left">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium leading-none">Active Event</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">{eventName}</span>
          </div>
          <Icon name="keyboard_arrow_down" className="text-on-surface-variant text-[18px]" />
        </div>
        <button
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-lowest shadow-sm font-label-lg text-label-lg text-on-surface hover:bg-surface-container hover:text-primary transition-all"
          type="button"
          onClick={onExport}
        >
          <Icon name="download" className="text-[18px] text-on-surface-variant" />
          Export Analytics
        </button>
        <Link
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container font-label-lg text-label-lg text-on-primary font-semibold shadow-sm hover:bg-primary transition-all active:scale-[0.99]"
          href="#event-config"
        >
          <Icon name="add" className="text-[20px]" />
          New Event
        </Link>
      </div>
    </section>
  );
}
