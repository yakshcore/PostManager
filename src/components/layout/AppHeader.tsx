"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useHeaderEvent } from "@/hooks/useHeaderEvent";
import { UserMenu } from "./UserMenu";

const NAV = [
  { href: "/organizer", label: "Organizer Dashboard", match: "/organizer" },
  { href: "/attendee", label: "Attendee View", match: "/attendee" },
  { href: "/attendee#create", label: "Post Generator", match: null },
  { href: "/analytics", label: "Analytics", match: "/analytics" },
];

const ACTIVE = "text-on-surface border-b-2 border-primary-container font-semibold";
const IDLE =
  "font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent";

export function AppHeader() {
  const pathname = usePathname();
  const event = useHeaderEvent();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-container-lowest border-b border-outline-variant/50">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <Link className="flex items-center gap-2.5" href="/organizer">
            <img alt="PostManager Brand Logo" className="h-8 w-auto object-contain" src="/brand/logo.svg" />
          </Link>
          <span className="hidden xl:inline px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
            AI Post Suite
          </span>
        </div>
        <nav className="hidden lg:flex items-center h-full space-x-1 shrink-0">
          {NAV.map((item) => {
            const active = item.match !== null && pathname.startsWith(item.match);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`h-full flex items-center px-3 2xl:px-4 ${active ? `transition-colors ${ACTIVE}` : IDLE}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          {event && (
          <Link
            href="/organizer"
            className="hidden md:flex lg:hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
            <span className="font-label-md text-label-md text-on-surface font-medium truncate max-w-[150px] 2xl:max-w-none">
              {event.name}
            </span>
            <Icon name="unfold_more" className="text-on-surface-variant text-[18px]" />
          </Link>
          )}
          <button
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            type="button"
            aria-label="Notifications"
          >
            <Icon name="notifications" className="text-[20px]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
          </button>
          <div className="h-6 w-px bg-outline-variant/60 hidden sm:block" />
          <UserMenu />
        </div>
      </div>
      {/* Mobile nav: the full tab bar only fits from lg up, so they move to a scrollable row here. */}
      <nav className="lg:hidden flex items-center gap-1 px-2 overflow-x-auto border-t border-outline-variant/30">
        {NAV.map((item) => {
          const active = item.match !== null && pathname.startsWith(item.match);
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 py-2.5 px-3 whitespace-nowrap font-label-md text-label-md ${active ? ACTIVE : IDLE}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
