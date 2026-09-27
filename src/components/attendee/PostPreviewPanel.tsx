"use client";

import { forwardRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { LinkedInPostPreview, type PostAuthor } from "@/components/post/LinkedInPostPreview";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import type { GenerateStatus } from "@/hooks/useGeneratePost";

interface PostPreviewPanelProps {
  author: PostAuthor;
  text: string;
  isSample: boolean;
  status: GenerateStatus;
  images: { src: string; alt: string }[];
  mention: string;
  modelLabel: string | null;
  onRegenerate: () => void;
  onCopied: () => void;
  onOpenLinkedIn: () => void;
}

const TOOL_BTN =
  "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";

export const PostPreviewPanel = forwardRef<HTMLDivElement, PostPreviewPanelProps>(function PostPreviewPanel(
  { author, text, isSample, status, images, mention, modelLabel, onRegenerate, onCopied, onOpenLinkedIn },
  ref,
) {
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");
  const { copied, copy } = useCopyToClipboard(2200);
  const loading = status === "loading";

  const badge = loading
    ? { label: "Generating…", className: "bg-primary/10 text-primary", dot: "bg-primary animate-pulse" }
    : isSample
      ? { label: "Sample Preview", className: "bg-surface-container text-on-surface-variant", dot: "bg-outline" }
      : { label: "Copy Ready", className: "bg-tertiary-container/10 text-tertiary", dot: "bg-tertiary" };

  const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;

  return (
    <div ref={ref} className="lg:col-span-6 flex flex-col gap-4 w-full lg:sticky lg:top-24 scroll-mt-28">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Live LinkedIn Post Preview</span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${badge.className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            {badge.label}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0" role="group" aria-label="Preview width">
          {(["mobile", "desktop"] as const).map((d) => (
            <button
              key={d}
              className={`p-1.5 rounded-lg transition-colors ${device === d ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:bg-surface-container"}`}
              title={`${d === "mobile" ? "Mobile" : "Desktop"} preview toggle`}
              aria-pressed={device === d}
              type="button"
              onClick={() => setDevice(d)}
            >
              <Icon name={d === "mobile" ? "smartphone" : "desktop_windows"} className="text-[20px]" />
            </button>
          ))}
        </div>
      </div>

      <div className={device === "mobile" ? "w-full max-w-[390px] mx-auto" : "w-full"}>
        <LinkedInPostPreview author={author} text={text} images={images} mention={mention} dimmed={loading} compact={device === "mobile"} />
      </div>

      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            className={`${TOOL_BTN} ${copied ? "bg-tertiary-container text-on-tertiary" : "bg-surface-container hover:bg-surface-container-high text-on-surface"}`}
            type="button"
            disabled={loading}
            onClick={async () => {
              await copy(text);
              onCopied();
            }}
          >
            <Icon name={copied ? "check" : "content_copy"} className="text-[18px]" />
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>
          <button
            className={`${TOOL_BTN} bg-surface-container hover:bg-surface-container-high text-on-surface`}
            type="button"
            disabled={loading}
            onClick={onRegenerate}
          >
            <Icon name="sync" className={`text-[18px] ${loading ? "animate-spin" : ""}`} />
            <span>Regenerate</span>
          </button>
        </div>
        <a
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary active:scale-[0.99] text-on-primary font-label-md text-label-md font-bold shadow-sm transition-all"
          href={shareUrl}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => {
            // LinkedIn may drop the prefilled text; the clipboard is a reliable fallback.
            copy(text);
            onOpenLinkedIn();
          }}
        >
          <span>Open in LinkedIn</span>
          <Icon name="launch" className="text-[18px]" />
        </a>
      </div>
      {modelLabel && (
        <p className="px-1 font-body-sm text-body-sm text-on-surface-variant text-center sm:text-left">
          Generated with <span className="font-medium text-on-surface">{modelLabel}</span> on Groq · text is copied to your clipboard when you open LinkedIn.
        </p>
      )}
    </div>
  );
});
