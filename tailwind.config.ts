import type { Config } from "tailwindcss";
// Design tokens come verbatim from the Stitch export — edit the design in Stitch, not here.
import stitch from "./assets/stitch/design-system/tailwind.config.stitch.mjs";

const config: Config = {
  darkMode: "class",
  // Stitch emits fontSize tuples as plain arrays, which TS can't narrow to Tailwind's tuple type.
  theme: stitch.theme as unknown as Config["theme"],
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
