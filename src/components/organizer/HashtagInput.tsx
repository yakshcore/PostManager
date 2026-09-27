"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { normalizeHashtag } from "@/lib/event-config";

interface HashtagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  max?: number;
}

export function HashtagInput({ value, onChange, max = 10 }: HashtagInputProps) {
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = (raw = text) => {
    const tags = raw
      .split(/[\s,]+/)
      .map(normalizeHashtag)
      .filter((t): t is string => !!t);
    const lower = new Set(value.map((t) => t.toLowerCase()));
    const next = [...value];
    for (const t of tags) {
      if (!lower.has(t.toLowerCase()) && next.length < max) {
        next.push(t);
        lower.add(t.toLowerCase());
      }
    }
    if (next.length !== value.length) onChange(next);
    setText("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && !text && value.length) {
      onChange(value.slice(0, -1));
    } else if (e.key === "Escape") {
      setText("");
      setAdding(false);
    }
  };

  return (
    <div className="p-2.5 rounded-lg bg-surface-container-low min-h-[52px] flex flex-wrap items-center gap-2">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-md text-label-md font-medium"
        >
          {tag}
          <button
            className="hover:text-primary transition-colors focus:outline-none"
            title="Remove hashtag"
            aria-label={`Remove ${tag}`}
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
          >
            <Icon name="close" className="text-[14px]" />
          </button>
        </span>
      ))}
      {adding ? (
        <input
          ref={inputRef}
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            commit();
            setAdding(false);
          }}
          placeholder="#NewTag"
          aria-label="New hashtag"
          className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm outline-none focus:ring-2 focus:ring-primary-container/20 w-36"
        />
      ) : (
        value.length < max && (
          <button
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium shadow-sm transition-colors"
            type="button"
            onClick={() => setAdding(true)}
          >
            <Icon name="add" className="text-[14px]" />
            Add tag
          </button>
        )
      )}
    </div>
  );
}
