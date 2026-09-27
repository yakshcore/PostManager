"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { isOrganizer, signOut, useAuth } from "@/lib/firebase/auth";
import { initialsAvatar } from "@/lib/avatar";

export function UserMenu() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  if (loading) return <div className="w-8 h-8 rounded-full bg-surface-container animate-pulse" />;

  if (!isOrganizer(user))
    return (
      <Link href="/organizer" className="font-label-md text-label-md font-semibold text-primary hover:underline whitespace-nowrap">
        Organizer sign in
      </Link>
    );

  const name = user.displayName || user.email?.split("@")[0] || "Organizer";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 pl-1 cursor-pointer group"
      >
        <img alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/40" src={initialsAvatar(name)} />
        <div className="hidden xl:flex flex-col text-left">
          <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight truncate max-w-[140px]">{name}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Event Lead</span>
        </div>
        <Icon name="expand_more" className="text-on-surface-variant text-[18px] group-hover:text-on-surface transition-colors" />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-60 rounded-xl bg-surface-container-lowest shadow-lg border border-outline-variant/40 p-1.5 z-50">
          <p className="px-3 py-2 font-body-sm text-body-sm text-on-surface-variant truncate">{user.email}</p>
          <button
            role="menuitem"
            type="button"
            onClick={() => signOut().then(() => setOpen(false))}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left font-label-md text-label-md text-on-surface hover:bg-surface-container"
          >
            <Icon name="logout" className="text-[18px] text-on-surface-variant" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
