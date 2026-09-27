import { Icon } from "@/components/ui/Icon";
import type { CommunityPost } from "@/lib/types";

const STYLES: Record<CommunityPost["tone"], { label: string; icon: string; className: string }> = {
  takeaways: { label: "Key Takeaways", icon: "lightbulb", className: "bg-secondary-container/20 text-on-secondary-container" },
  "thought-leader": { label: "Thought Leader", icon: "psychology", className: "bg-primary-container/10 text-primary-container" },
  hype: { label: "Attendee Hype", icon: "celebration", className: "bg-surface-container text-on-surface-variant" },
  professional: { label: "Professional", icon: "business_center", className: "bg-primary-container/10 text-primary-container" },
  grateful: { label: "Grateful Attendee", icon: "favorite", className: "bg-tertiary-container/10 text-tertiary" },
  excited: { label: "Excited Student", icon: "rocket_launch", className: "bg-surface-container text-on-surface-variant" },
};

export function ToneBadge({ tone }: { tone: CommunityPost["tone"] }) {
  const s = STYLES[tone] ?? STYLES.hype;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-medium whitespace-nowrap ${s.className}`}>
      <Icon name={s.icon} className="text-[13px]" />
      {s.label}
    </span>
  );
}
