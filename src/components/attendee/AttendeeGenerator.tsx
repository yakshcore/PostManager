"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { EventBanner } from "./EventBanner";
import { PhotoUploader } from "./PhotoUploader";
import { ToneSelector } from "./ToneSelector";
import { HighlightsInput } from "./HighlightsInput";
import { PostPreviewPanel } from "./PostPreviewPanel";
import { usePhotoUploads } from "@/hooks/usePhotoUploads";
import { useGeneratePost, useModelInfo } from "@/hooks/useGeneratePost";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { SAMPLE_HIGHLIGHTS, SAMPLE_PHOTOS, SAMPLE_POST } from "@/lib/sample-data";
import type { EventConfig, ToneId } from "@/lib/types";

// The signed-in attendee profile from the Stitch design; replace with real auth when available.
const AUTHOR = {
  name: "Sarah Lin",
  headline: "Software Engineer & AI Builder | Google H2S Bootcamp '25 Fellow | Prev. SWE Intern",
  avatar: "/stitch/avatar.jpg",
};

export function AttendeeGenerator({ event }: { event: EventConfig }) {
  const [tone, setTone] = useState<ToneId>("grateful");
  const [highlights, setHighlights] = useState(SAMPLE_HIGHLIGHTS);
  const { photos, addFiles, remove, error: photoError } = usePhotoUploads(SAMPLE_PHOTOS);
  const { status, post, error, meta, generate, cancel } = useGeneratePost();
  const modelInfo = useModelInfo();
  const community = useCommunityPosts();
  const [postId, setPostId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const loading = status === "loading";
  const visionOff = modelInfo !== null && !modelInfo.visionModel;
  const notConfigured = modelInfo !== null && !modelInfo.configured;

  const run = async (regenerate: boolean) => {
    const text = await generate({ tone, highlights, event, photos }, { regenerate });
    if (!text) return;
    const id = crypto.randomUUID();
    setPostId(id);
    community.add({ id, name: AUTHOR.name, role: "Software Engineer", createdAt: Date.now(), tone, text, status: "draft" });
    // On stacked (mobile/tablet) layouts, bring the result into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <EventBanner event={event} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
        <div id="create" className="lg:col-span-6 flex flex-col gap-6 w-full scroll-mt-28">
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Icon name="auto_awesome" className="text-[22px]" />
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Create Your LinkedIn Post</h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Turn your bootcamp highlights into an engaging, professional story in seconds.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-primary font-label-sm text-label-sm font-semibold uppercase shrink-0">
                Step {post ? 2 : 1} of 2
              </span>
            </div>

            <PhotoUploader
              photos={photos}
              error={photoError}
              onAdd={addFiles}
              onRemove={remove}
              note={visionOff && photos.length ? "Photos will appear in the preview but aren't sent to the AI (no vision model configured)." : null}
            />
            <ToneSelector value={tone} onChange={setTone} />
            <HighlightsInput value={highlights} onChange={setHighlights} />

            <div className="flex flex-col gap-2 pt-2">
              <button
                className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-on-primary-fixed-variant active:scale-[0.99] text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2.5 shadow-md transition-all group disabled:opacity-70 disabled:cursor-wait"
                type="button"
                disabled={loading}
                onClick={() => run(false)}
              >
                <Icon
                  name={loading ? "progress_activity" : "auto_awesome"}
                  className={`text-[22px] transition-transform ${loading ? "animate-spin" : "group-hover:rotate-12"}`}
                />
                <span>{loading ? "Writing your post…" : post ? "Generate New Post" : "Generate LinkedIn Post with PostManager AI"}</span>
              </button>
              {loading && (
                <button type="button" onClick={cancel} className="self-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface underline">
                  Cancel
                </button>
              )}

              {status === "error" && error && (
                <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm">
                  <Icon name="error" className="text-[18px] shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold">Couldn&apos;t generate your post</p>
                    <p>{error}</p>
                  </div>
                  <button type="button" onClick={() => run(false)} className="shrink-0 font-label-md text-label-md font-semibold underline">
                    Retry
                  </button>
                </div>
              )}
              {notConfigured && (
                <p className="font-body-sm text-body-sm text-error text-center">GROQ_API_KEY is not configured on the server.</p>
              )}

              <div className="flex items-center justify-center gap-1.5 text-center">
                <Icon name="check_circle" filled className="text-[16px] text-tertiary shrink-0" />
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Automatically incorporates verified{" "}
                  <span className="font-semibold text-primary">{event.hashtags[0] ?? "event"}</span> hashtags and tags{" "}
                  <span className="font-semibold text-primary">@{event.organizer}</span>.
                </span>
              </div>
            </div>
          </div>
        </div>

        <PostPreviewPanel
          ref={previewRef}
          author={AUTHOR}
          text={post ?? SAMPLE_POST}
          isSample={!post}
          status={status}
          images={photos.map((p) => ({ src: p.src, alt: p.name }))}
          mention={event.organizer}
          modelLabel={meta ? `${meta.model}${meta.imagesUsed ? " (with photo analysis)" : ""}` : null}
          onRegenerate={() => run(true)}
          onCopied={() => postId && community.markCopied(postId)}
          onOpenLinkedIn={() => postId && community.markPublished(postId)}
        />
      </div>
    </div>
  );
}
