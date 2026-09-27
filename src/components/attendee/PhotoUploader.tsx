"use client";

import { useRef, useState, type DragEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { MAX_PHOTOS, type Photo } from "@/hooks/usePhotoUploads";

interface PhotoUploaderProps {
  photos: Photo[];
  error: string | null;
  onAdd: (files: FileList | File[]) => void;
  onRemove: (id: string) => void;
  note?: string | null;
}

export function PhotoUploader({ photos, error, onAdd, onRemove, note }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const full = photos.length >= MAX_PHOTOS;
  const browse = () => inputRef.current?.click();

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) onAdd(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <span className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1.5">
          <span>Attached Media</span>
          <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">
            ({photos.length} of {MAX_PHOTOS} selected)
          </span>
        </span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">Supports JPG, PNG up to 15MB</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) onAdd(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={0}
        aria-disabled={full}
        onClick={() => !full && browse()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !full && (e.preventDefault(), browse())}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`w-full rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all group outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          full ? "bg-surface-container-low opacity-60 cursor-not-allowed" : "bg-surface-container-low hover:bg-surface-container cursor-pointer"
        } ${dragging ? "ring-2 ring-primary bg-surface-container" : ""}`}
      >
        <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-xs">
          <Icon name="cloud_upload" className="text-[24px]" />
        </div>
        <p className="font-label-md text-label-md text-on-surface font-semibold mt-2.5">
          {full ? (
            "Maximum of 4 photos attached"
          ) : (
            <>
              Drag & drop event photos here, or <span className="text-primary hover:underline">browse files</span>
            </>
          )}
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          High-resolution stage, team, or project photos boost reach by +47%
        </p>
      </div>

      {error && (
        <p className="font-body-sm text-body-sm text-error flex items-center gap-1" role="alert">
          <Icon name="error" className="text-[16px]" />
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-1">
          {photos.map((p) => (
            <div key={p.id} className="relative group rounded-xl overflow-hidden bg-surface-container aspect-video shadow-xs">
              <img alt={p.name} className="w-full h-full object-cover" src={p.src} />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent flex items-end p-2 pointer-events-none">
                <span className="font-body-sm text-body-sm text-surface-container-lowest truncate max-w-[85%]">{p.name}</span>
              </div>
              <button
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-on-surface/80 hover:bg-error text-surface-container-lowest flex items-center justify-center transition-colors shadow-xs"
                title="Remove photo"
                aria-label={`Remove ${p.name}`}
                type="button"
                onClick={() => onRemove(p.id)}
              >
                <Icon name="close" className="text-[13px]" />
              </button>
            </div>
          ))}
          {!full && (
            <button
              className="rounded-xl bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-center gap-1 aspect-video text-on-surface-variant hover:text-on-surface transition-all"
              type="button"
              onClick={browse}
            >
              <Icon name="add_circle" className="text-[20px] text-primary" />
              <span className="font-label-sm text-label-sm font-semibold">Add more</span>
            </button>
          )}
        </div>
      )}

      {note && (
        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          <Icon name="info" className="text-[15px] text-primary-container" />
          {note}
        </p>
      )}
    </div>
  );
}
