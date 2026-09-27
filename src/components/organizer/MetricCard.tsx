import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

interface MetricCardProps {
  label: string;
  icon: string;
  iconClass: string;
  value: ReactNode;
  badge?: ReactNode;
  footLeft: ReactNode;
  footRight: ReactNode;
  progress: number;
  progressClass?: string;
}

export function MetricCard({
  label,
  icon,
  iconClass,
  value,
  badge,
  footLeft,
  footRight,
  progress,
  progressClass = "bg-primary-container",
}: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="font-label-md text-label-md text-on-surface-variant font-medium">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconClass}`}>
          <Icon name={icon} className="text-[20px]" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2 min-w-0">
        {value}
        {badge}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 font-body-sm text-body-sm text-on-surface-variant">
        <span>{footLeft}</span>
        {footRight}
      </div>
      <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
        <div className={`${progressClass} h-1 rounded-full`} style={{ width: `${Math.min(100, progress)}%` }} />
      </div>
    </div>
  );
}

export function MetricValue({ children }: { children: ReactNode }) {
  return <span className="font-display text-display text-on-surface font-extrabold tracking-tight">{children}</span>;
}

export function DeltaBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-tertiary font-semibold">
      <Icon name="arrow_upward" className="text-[14px]" />
      {children}
    </span>
  );
}
