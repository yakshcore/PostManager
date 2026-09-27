import { useRef } from "react";

export const MAX_HIGHLIGHTS = 2000;

const QUICK_PROMPTS = [
  { label: "+ Mention mentors", text: "Huge thanks to my mentors for their guidance and code reviews." },
  { label: "+ Cloud architecture", text: "Learned how to design scalable cloud architecture." },
  { label: "+ Team collaboration", text: "Collaborated closely with an amazing team to ship our project." },
];

interface HighlightsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function HighlightsInput({ value, onChange }: HighlightsInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const append = (text: string) => {
    const sep = value.trim() ? (/[.!?]$/.test(value.trim()) ? " " : ". ") : "";
    onChange((value.trimEnd() + sep + text).slice(0, MAX_HIGHLIGHTS));
    ref.current?.focus();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="attendee-notes">
          Key Highlights & What You Learned
        </label>
        <span className={`font-body-sm text-body-sm font-mono shrink-0 ${value.length >= MAX_HIGHLIGHTS ? "text-error" : "text-on-surface-variant"}`}>
          {value.length} chars
        </span>
      </div>
      <div className="relative rounded-xl bg-surface-container-low overflow-hidden focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary transition-all">
        <textarea
          ref={ref}
          className="w-full bg-transparent p-3.5 text-on-surface font-body-md text-body-md focus:outline-none resize-none leading-relaxed"
          id="attendee-notes"
          placeholder="Mention key projects, teammates, mentors, or favorite moments..."
          rows={4}
          maxLength={MAX_HIGHLIGHTS}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Quick prompts:</span>
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p.label}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors"
            type="button"
            onClick={() => append(p.text)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
