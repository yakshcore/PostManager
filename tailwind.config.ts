import type { Config } from "tailwindcss";
// Design tokens come verbatim from the Stitch export — edit the design in Stitch, not here.
import stitch from "./assets/stitch/design-system/tailwind.config.stitch.js";

const config: Config = {
  ...stitch,
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
