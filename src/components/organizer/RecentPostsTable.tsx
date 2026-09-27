"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { ToneBadge } from "@/components/post/ToneBadge";
import { PostText } from "@/components/post/PostText";
import { LinkedInPostPreview } from "@/components/post/LinkedInPostPreview";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { relativeTime } from "@/lib/sample-data";
import { initials, initialsAvatar } from "@/lib/avatar";
import type { CommunityPost } from "@/lib/types";

const PAGE_SIZE = 4;
const AVATAR_STYLES = [
  "bg-primary/10 text-primary-container",
  "bg-tertiary/10 text-tertiary",
  "bg-secondary-fixed/40 text-secondary",
  "bg-surface-container-high text-on-surface",
];

const STATUS: Record<CommunityPost["status"], { label: string; pill: string; dot: string }> = {
  published: { label: "Published to LinkedIn", pill: "bg-tertiary-container/10 text-tertiary", dot: "bg-tertiary-container" },
  copied: { label: "Draft Copied", pill: "bg-secondary-fixed/50 text-secondary", dot: "bg-secondary" },
  draft: { label: "Generated", pill: "bg-surface-container text-on-surface-variant", dot: "bg-outline" },
};


interface RecentPostsTableProps {
  posts: CommunityPost[];
  totalCount: number;
  organizer: string;
  loading?: boolean;
  error?: string | null;
}

export function RecentPostsTable({ posts, totalCount, organizer, loading, error }: RecentPostsTableProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<CommunityPost | null>(null);
  const { copy } = useCopyToClipboard();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => `${p.name} ${p.role} ${p.text}`.toLowerCase().includes(q));
  }, [posts, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const now = Date.now();

  const onCopy = async (p: CommunityPost) => {
    await copy(p.text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId((id) => (id === p.id ? null : id)), 2000);
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="space-y-0.5">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Community Posts Generated</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Live feed of attendees creating and publishing their event takeaways to LinkedIn.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <input
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline outline-none focus:ring-1 focus:ring-primary-container"
              placeholder="Search posts..."
              type="search"
              aria-label="Search posts"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
            <Icon name="search" className="absolute left-2.5 top-2 text-on-surface-variant text-[16px]" />
          </div>
          <button className="p-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Filter posts" type="button">
            <Icon name="filter_list" className="text-[20px]" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full min-w-[720px] text-left font-body-md text-body-md">
          <thead>
            <tr className="bg-surface-container-low/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-3 px-4 rounded-l-lg">Attendee & Role</th>
              <th className="py-3 px-3">Generation Tone</th>
              <th className="py-3 px-4">Post Snippet</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 rounded-r-lg text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60">
            {rows.map((p, i) => {
              const s = STATUS[p.status];
              return (
                <tr key={p.id} className="hover:bg-surface-container-low/40 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full font-semibold flex items-center justify-center shrink-0 font-label-md text-label-md ${AVATAR_STYLES[(i + (current - 1) * PAGE_SIZE) % AVATAR_STYLES.length]}`}>
                        {initials(p.name)}
                      </div>
                      <div className="min-w-0">
                        <span className="block font-label-lg text-label-lg text-on-surface font-semibold truncate">{p.name}</span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant truncate">
                          {p.role} · {relativeTime(p.createdAt, now)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <ToneBadge tone={p.tone} />
                  </td>
                  <td className="py-3.5 px-4 max-w-xs md:max-w-md">
                    <div className="font-body-md text-body-md text-on-surface line-clamp-1 [&_p]:inline [&_br]:hidden [&_span]:text-primary-container [&_span]:font-medium">
                      <PostText text={p.text.replace(/\s+/g, " ")} />
                    </div>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-label-sm text-label-sm font-semibold ${s.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-primary-container transition-colors" title="View Post Preview" type="button" onClick={() => setViewing(p)}>
                        <Icon name="visibility" className="text-[18px]" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Copy Text" type="button" onClick={() => onCopy(p)}>
                        <Icon name={copiedId === p.id ? "check" : "content_copy"} className={`text-[18px] ${copiedId === p.id ? "text-tertiary" : ""}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-on-surface-variant font-body-md text-body-md">
                  {error ? (
                    <span className="text-error">{error}</span>
                  ) : loading ? (
                    "Loading posts…"
                  ) : query ? (
                    <>No posts match “{query}”.</>
                  ) : (
                    "No posts yet — share the attendee link or QR code to get the first ones."
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 font-body-sm text-body-sm text-on-surface-variant">
        <span>
          Showing {rows.length} of {query ? filtered.length : totalCount} total posts generated for this event
        </span>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-medium disabled:opacity-50 transition-colors" disabled={current <= 1} type="button" onClick={() => setPage(current - 1)}>
            Previous
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${n === current ? "bg-primary-container text-on-primary font-semibold" : "hover:bg-surface-container text-on-surface"}`}
              type="button"
              aria-current={n === current ? "page" : undefined}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-medium disabled:opacity-50 transition-colors" disabled={current >= pages} type="button" onClick={() => setPage(current + 1)}>
            Next
          </button>
        </div>
      </div>

      {viewing && (
        <Modal title="Post Preview" onClose={() => setViewing(null)}>
          <LinkedInPostPreview
            compact
            author={{ name: viewing.name, headline: viewing.role, avatar: initialsAvatar(viewing.name) }}
            text={viewing.text}
            images={[]}
            mention={organizer}
          />
        </Modal>
      )}
    </section>
  );
}
