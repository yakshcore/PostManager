"use client";

import { Icon } from "@/components/ui/Icon";
import { AttendeeLinkCard } from "./AttendeeLinkCard";
import { useSyncExternalStore } from "react";
import { twitterHandle, twitterHref } from "@/lib/event-config";
import type { EventRecord } from "@/lib/types";

const SHORTCUT =
  "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors";

interface LiveEventCardProps {
  event: EventRecord;
  stats: { published: number; photos: number; visits: number };
}

const noop = () => () => {};

export function LiveEventCard({ event, stats }: LiveEventCardProps) {
  const origin = useSyncExternalStore(noop, () => window.location.origin, () => "");
  const link = `${origin}/attendee/${event.id}`;

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          alt={event.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          src="/stitch/workshop.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-tertiary font-label-sm text-label-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
            Live Event Now
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold drop-shadow-sm truncate">{event.name}</h3>
          <p className="font-body-sm text-body-sm text-inverse-on-surface opacity-90 truncate">
            {event.organizer} · {event.location}
          </p>
        </div>
      </div>
      <div className="p-5 space-y-5">
        {event.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {event.hashtags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {event.linkedinUrl && (
            <a className={SHORTCUT} href={event.linkedinUrl} rel="noreferrer" target="_blank">
              <span className="w-3.5 h-3.5 rounded bg-[#0A66C2] text-white flex items-center justify-center text-[9px] font-bold">in</span>
              Company Page
              <Icon name="arrow_outward" className="text-[14px]" />
            </a>
          )}
          {event.twitterUrl && (
            <a className={SHORTCUT} href={twitterHref(event.twitterUrl)} rel="noreferrer" target="_blank">
              <span>𝕏</span>
              {twitterHandle(event.twitterUrl)}
              <Icon name="arrow_outward" className="text-[14px]" />
            </a>
          )}
          {event.websiteUrl && (
            <a className={SHORTCUT} href={event.websiteUrl} rel="noreferrer" target="_blank">
              <Icon name="open_in_new" className="text-[14px]" />
              Website
            </a>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-surface-container-low text-center">
          <div className="space-y-0.5">
            <span className="font-headline-sm text-headline-sm text-primary-container font-bold">{stats.published}</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Posts published</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{stats.photos}</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Photos added</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-headline-sm text-headline-sm text-tertiary font-bold">{stats.visits}</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Portal visits</p>
          </div>
        </div>
        <AttendeeLinkCard link={link} eventName={event.name} />
      </div>
    </div>
  );
}
