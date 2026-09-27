import { Icon } from "@/components/ui/Icon";
import { TONES } from "@/lib/tones";
import type { ToneId } from "@/lib/types";

interface ToneSelectorProps {
  value: ToneId;
  onChange: (tone: ToneId) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <span className="font-label-lg text-label-lg text-on-surface font-semibold" id="tone-label">Select Tone of Voice</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">Influences copy cadence & hooks</span>
      </div>
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2.5" role="radiogroup" aria-labelledby="tone-label">
        {TONES.map((tone) => {
          const active = tone.id === value;
          return (
            <button
              key={tone.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(tone.id)}
              className={`flex items-start gap-2.5 p-3 rounded-xl text-left transition-all group ${
                active ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low hover:bg-surface-container text-on-surface"
              }`}
            >
              <Icon
                name={tone.icon}
                filled={active}
                className={`text-[20px] mt-0.5 transition-colors ${active ? "text-on-primary" : "text-on-surface-variant group-hover:text-primary"}`}
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`font-label-md text-label-md font-semibold ${active ? "text-on-primary" : "text-on-surface"}`}>
                    {tone.label}
                  </span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed" />}
                </div>
                <span className={`font-body-sm text-body-sm leading-tight truncate ${active ? "text-on-primary-container" : "text-on-surface-variant"}`}>
                  {tone.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
