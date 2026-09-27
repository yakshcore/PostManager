"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { photoToDataUrl, type Photo } from "./usePhotoUploads";
import type { EventConfig, GenerateRequest, GenerateResponse, ModelInfo, ToneId } from "@/lib/types";

export type GenerateStatus = "idle" | "loading" | "success" | "error";

export interface GenerateInputs {
  tone: ToneId;
  highlights: string;
  event: EventConfig;
  photos: Photo[];
}

export function useModelInfo() {
  const [info, setInfo] = useState<ModelInfo | null>(null);
  useEffect(() => {
    fetch("/api/models")
      .then((r) => (r.ok ? r.json() : null))
      .then(setInfo)
      .catch(() => setInfo(null));
  }, []);
  return info;
}

export function useGeneratePost() {
  const [status, setStatus] = useState<GenerateStatus>("idle");
  const [post, setPost] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ model: string; imagesUsed: boolean } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const generate = useCallback(
    async (inputs: GenerateInputs, opts: { regenerate?: boolean; withImages?: boolean } = {}) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setStatus("loading");
      setError(null);

      try {
        const images = opts.withImages === false ? [] : await Promise.all(inputs.photos.map((p) => photoToDataUrl(p.src)));
        const body: GenerateRequest = {
          tone: inputs.tone,
          highlights: inputs.highlights,
          event: inputs.event,
          images,
          previousPost: opts.regenerate && post ? post : undefined,
        };
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        const data = (await res.json().catch(() => ({}))) as Partial<GenerateResponse> & { error?: string };
        if (!res.ok || !data.post) throw new Error(data.error || `Request failed (${res.status}).`);

        setPost(data.post);
        setMeta({ model: data.model ?? "", imagesUsed: !!data.imagesUsed });
        setStatus("success");
        return data.post;
      } catch (err) {
        if (controller.signal.aborted) return null;
        setError(err instanceof Error ? err.message : "Something went wrong.");
        setStatus("error");
        return null;
      }
    },
    [post],
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setStatus(post ? "success" : "idle");
  }, [post]);

  return { status, post, error, meta, generate, cancel };
}
