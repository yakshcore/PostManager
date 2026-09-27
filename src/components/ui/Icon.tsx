import type { CSSProperties } from "react";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

const FILLED: CSSProperties = { fontVariationSettings: "'FILL' 1" };

export function Icon({ name, className = "", filled }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} style={filled ? FILLED : undefined} aria-hidden="true">
      {name}
    </span>
  );
}
