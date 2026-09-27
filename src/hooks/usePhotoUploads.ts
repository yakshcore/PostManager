"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface Photo {
  id: string;
  name: string;
  /** Object URL for uploads, or a same-origin path for sample photos. */
  src: string;
  uploaded: boolean;
}

export const MAX_PHOTOS = 4;
export const MAX_FILE_BYTES = 15 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_EDGE = 1280;

export function usePhotoUploads(initial: Photo[]) {
  const [photos, setPhotos] = useState<Photo[]>(initial);
  const [error, setError] = useState<string | null>(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  useEffect(
    () => () => photosRef.current.forEach((p) => p.uploaded && URL.revokeObjectURL(p.src)),
    [],
  );

  const addFiles = useCallback((files: FileList | File[]) => {
    setError(null);
    const incoming = Array.from(files);
    const rejected: string[] = [];
    setPhotos((current) => {
      const room = MAX_PHOTOS - current.length;
      const valid = incoming.filter((f) => {
        if (!ACCEPTED.includes(f.type)) return rejected.push(`${f.name} is not a JPG, PNG or WebP`), false;
        if (f.size > MAX_FILE_BYTES) return rejected.push(`${f.name} is over 15MB`), false;
        return true;
      });
      if (valid.length > room) rejected.push(`Only ${MAX_PHOTOS} photos allowed`);
      const added = valid.slice(0, Math.max(0, room)).map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        src: URL.createObjectURL(f),
        uploaded: true,
      }));
      return [...current, ...added];
    });
    if (rejected.length) setError(rejected.join(" · "));
  }, []);

  const remove = useCallback((id: string) => {
    setPhotos((current) => {
      const p = current.find((x) => x.id === id);
      if (p?.uploaded) URL.revokeObjectURL(p.src);
      return current.filter((x) => x.id !== id);
    });
  }, []);

  return { photos, addFiles, remove, error };
}

/** Downscale to keep request payloads small and within Groq's per-image limit. */
export async function photoToDataUrl(src: string): Promise<string> {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  const scale = Math.min(1, MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}
