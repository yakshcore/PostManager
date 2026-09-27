import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { twitterHref } from "@/lib/event-config";
import type { EventConfig } from "@/lib/types";

const QUICK_LINK =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors";

export function EventBanner({ event }: { event: EventConfig }) {
  return (
    <section className="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
      <div className="absolute -right-24 -top-24 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -bottom-20 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-2xl pointer-events-none" />
      <div className="flex flex-col gap-4 max-w-3xl z-10 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
            <Icon name="verified" filled className="text-[15px]" />
            Hosted by {event.organizer}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <Icon name="location_on" className="text-[14px]" />
              {event.location}
            </span>
          )}
          {event.dateLabel && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <Icon name="calendar_today" className="text-[14px]" />
              {event.dateLabel}
            </span>
          )}
        </div>
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile sm:font-display sm:text-display text-on-surface tracking-tight font-bold break-words">
            {event.name}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Turn your sprint achievements, hackathon builds, and mentor milestones into reach-amplifying LinkedIn content.
          </p>
        </div>
        {event.hashtags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Official Tags:</span>
            {event.hashtags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-medium hover:bg-surface-container-high cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {event.linkedinUrl && (
            <a className={QUICK_LINK} href={event.linkedinUrl} target="_blank" rel="noreferrer">
              <Icon name="share" className="text-primary text-[18px]" />
              LinkedIn Page
            </a>
          )}
          {event.twitterUrl && (
            <a className={QUICK_LINK} href={twitterHref(event.twitterUrl)} target="_blank" rel="noreferrer">
              <Icon name="tag" className="text-[18px]" />
              X / Twitter Feed
            </a>
          )}
          {event.websiteUrl && (
            <a className={QUICK_LINK} href={event.websiteUrl} target="_blank" rel="noreferrer">
              <Icon name="open_in_new" className="text-[18px]" />
              Event Hub
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between self-stretch lg:self-auto gap-4 shrink-0 z-10 pt-4 lg:pt-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-container/10 text-tertiary font-label-md text-label-md font-semibold">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          Attendee Authoring Portal
        </div>
        <Link
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium transition-all shadow-sm"
          href="/organizer"
        >
          <span>Switch to Organizer Dashboard</span>
          <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-0.5 transition-transform text-primary" />
        </Link>
      </div>
    </section>
  );
}
