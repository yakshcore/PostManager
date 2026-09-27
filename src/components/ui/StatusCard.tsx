import type { ReactNode } from "react";
import { Icon } from "./Icon";

interface StatusCardProps {
  icon: string;
  title: string;
  children?: ReactNode;
  tone?: "neutral" | "error";
  spinning?: boolean;
}

/** Full-width card for loading, empty and error states. */
export function StatusCard({ icon, title, children, tone = "neutral", spinning }: StatusCardProps) {
  return (
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 sm:p-12 flex flex-col items-center text-center gap-3">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          tone === "error" ? "bg-error-container text-on-error-container" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon name={icon} className={`text-[26px] ${spinning ? "animate-spin" : ""}`} />
      </div>
      <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h1>
      {children && <div className="font-body-md text-body-md text-on-surface-variant max-w-md space-y-3">{children}</div>}
    </section>
  );
}
