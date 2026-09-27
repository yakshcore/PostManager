import { Icon } from "@/components/ui/Icon";
import { PostText } from "./PostText";

export interface PostAuthor {
  name: string;
  headline: string;
  avatar: string;
}

interface LinkedInPostPreviewProps {
  author: PostAuthor;
  text: string;
  images: { src: string; alt: string }[];
  mention?: string;
  dimmed?: boolean;
  compact?: boolean;
}

const ACTIONS = [
  { icon: "thumb_up", label: "Like" },
  { icon: "comment", label: "Comment" },
  { icon: "repeat", label: "Repost" },
  { icon: "send", label: "Send" },
];

export function LinkedInPostPreview({ author, text, images, mention, dimmed, compact }: LinkedInPostPreviewProps) {
  const shown = images.slice(0, 4);

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="relative shrink-0">
            <img alt={`${author.name} portrait`} className="w-12 h-12 rounded-full object-cover" src={author.avatar} />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-tertiary-container rounded-full ring-2 ring-surface-container-lowest" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-lg text-label-lg font-bold text-on-surface truncate">{author.name}</span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">• 1st</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{author.headline}</p>
            <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
              <span>Just now</span>
              <span>•</span>
              <Icon name="public" className="text-[14px]" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant shrink-0">
          <button className="p-1 rounded-full hover:bg-surface-container transition-colors" title="More options" type="button">
            <Icon name="more_horiz" className="text-[20px]" />
          </button>
        </div>
      </div>

      <div
        className={`px-4 sm:px-5 pb-3 font-body-md text-body-md text-on-surface leading-relaxed flex flex-col gap-3 break-words transition-opacity ${
          dimmed ? "opacity-40" : ""
        }`}
        aria-live="polite"
        aria-busy={dimmed}
      >
        <PostText text={text} mention={mention} />
      </div>

      {shown.length > 0 && (
        <div className={`w-full grid ${shown.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-1 bg-surface-container-high overflow-hidden select-none`}>
          {shown.map((img, i) => (
            <div
              key={img.src}
              className={`overflow-hidden bg-surface-container ${
                // 1–2 photos: tall tiles (Stitch layout). 3–4: 2×2 collage, first spans the row when there are 3.
                shown.length <= 2 ? (compact ? "h-40" : "h-64 sm:h-72") : compact ? "h-24" : "h-36 sm:h-40"
              } ${shown.length === 3 && i === 0 ? "col-span-2" : ""}`}
            >
              <img alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={img.src} />
            </div>
          ))}
        </div>
      )}

      <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-lowest">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center -space-x-1">
            <span className="w-5 h-5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[10px] ring-1 ring-surface-container-lowest">👍</span>
            <span className="w-5 h-5 rounded-full bg-[#e7a33e] text-white flex items-center justify-center text-[10px] ring-1 ring-surface-container-lowest">💡</span>
            <span className="w-5 h-5 rounded-full bg-[#44712e] text-white flex items-center justify-center text-[10px] ring-1 ring-surface-container-lowest">👏</span>
          </div>
          <span className="font-medium text-on-surface">184</span>
        </div>
        <div className="flex items-center gap-3">
          <span>42 comments</span>
          <span>•</span>
          <span>12 reposts</span>
        </div>
      </div>
      <div className="h-px w-full bg-surface-container" />
      <div className="px-3 py-1.5 grid grid-cols-4 gap-1 bg-surface-container-lowest">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            className="py-2.5 px-1 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary flex items-center justify-center gap-1.5 font-label-md text-label-md transition-colors"
            type="button"
            aria-label={a.label}
          >
            <Icon name={a.icon} className="text-[19px]" />
            <span className={compact ? "hidden" : "hidden sm:inline"}>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
