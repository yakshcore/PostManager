import type { CSSProperties } from "react";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

// Google's Material Symbols stylesheet sets font-size: 24px and may load after Tailwind, which would
// override text-[Npx] on the same element. Size/colour classes go on the wrapper; the glyph inherits.
const GLYPH: CSSProperties = { fontSize: "inherit" };
const GLYPH_FILLED: CSSProperties = { fontSize: "inherit", fontVariationSettings: "'FILL' 1" };

export function Icon({ name, className = "", filled }: IconProps) {
  return (
    <span className={`inline-flex shrink-0 leading-none ${className}`} aria-hidden="true">
      <span className="material-symbols-outlined" style={filled ? GLYPH_FILLED : GLYPH}>
        {name}
      </span>
    </span>
  );
}
