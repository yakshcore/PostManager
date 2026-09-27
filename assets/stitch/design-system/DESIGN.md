---
name: Executive Pulse
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#414752'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#727783'
  outline-variant: '#c1c6d4'
  surface-tint: '#005eb5'
  primary: '#004e99'
  on-primary: '#ffffff'
  primary-container: '#0a66c2'
  on-primary-container: '#dbe6ff'
  inverse-primary: '#a8c8ff'
  secondary: '#2f5ea1'
  on-secondary: '#ffffff'
  secondary-container: '#8cb7ff'
  on-secondary-container: '#0d4788'
  tertiary: '#005b31'
  on-tertiary: '#ffffff'
  tertiary-container: '#057642'
  on-tertiary-container: '#9afab9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a8c8ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468a'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#a9c7ff'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#0c4687'
  tertiary-fixed: '#97f7b6'
  tertiary-fixed-dim: '#7cda9b'
  on-tertiary-fixed: '#00210e'
  on-tertiary-fixed-variant: '#00522c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display: { fontFamily: Inter, fontSize: 36px, fontWeight: '700', lineHeight: 44px, letterSpacing: -0.025em }
  headline-lg: { fontFamily: Inter, fontSize: 30px, fontWeight: '700', lineHeight: 38px, letterSpacing: -0.02em }
  headline-lg-mobile: { fontFamily: Inter, fontSize: 24px, fontWeight: '700', lineHeight: 32px, letterSpacing: -0.015em }
  headline-md: { fontFamily: Inter, fontSize: 22px, fontWeight: '600', lineHeight: 28px, letterSpacing: -0.015em }
  headline-sm: { fontFamily: Inter, fontSize: 18px, fontWeight: '600', lineHeight: 24px, letterSpacing: -0.01em }
  body-lg: { fontFamily: Inter, fontSize: 16px, fontWeight: '400', lineHeight: 24px, letterSpacing: -0.005em }
  body-md: { fontFamily: Inter, fontSize: 14px, fontWeight: '400', lineHeight: 20px, letterSpacing: 0em }
  body-sm: { fontFamily: Inter, fontSize: 12px, fontWeight: '400', lineHeight: 16px, letterSpacing: 0em }
  label-lg: { fontFamily: Inter, fontSize: 14px, fontWeight: '600', lineHeight: 20px, letterSpacing: -0.005em }
  label-md: { fontFamily: Inter, fontSize: 13px, fontWeight: '500', lineHeight: 18px, letterSpacing: 0.005em }
  label-sm: { fontFamily: Inter, fontSize: 11px, fontWeight: '600', lineHeight: 14px, letterSpacing: 0.02em }
rounded: { sm: 0.25rem, DEFAULT: 0.5rem, md: 0.75rem, lg: 1rem, xl: 1.5rem, full: 9999px }
spacing: { gutter: 1.5rem, gutter-mobile: 1rem, margin: 2rem, margin-mobile: 1rem, space-xs: 0.25rem, space-sm: 0.5rem, space-md: 1rem, space-lg: 1.5rem, space-xl: 2rem }
---

<!-- Verbatim design system from Stitch project 4994829765074898986 (theme: customColor #0a66c2, FIDELITY, ROUND_EIGHT, overrides primary #0a66c2 / secondary #004182 / tertiary #057642 / neutral #0f172a). YAML front matter condensed to flow style; values unchanged. -->

## Brand & Style

This design system is tailored for an AI-native SaaS platform powering professional thought-leadership, event amplification, and high-engagement content authoring. The design aesthetic is grounded in a refined, elevated interpretation of modern B2B SaaS—bridging the gap between the familiar, trustworthy social context of LinkedIn and the razor-sharp efficiency of next-generation productivity suites.

The visual style blends **Corporate Modern** fidelity with **Editorial Clarity**:
- **Tone & Mood:** Authoritative, high-clarity, effortless, and credible.
- **Visual Tension:** Pure architectural whites and nuanced slate-tinted canvas neutrals create quiet breathing room, allowing crisp typography and deliberate cobalt accents to direct focus.
- **Authenticity:** High-fidelity simulation of social media feed typography, micro-interactions, and visual layouts paired with focused SaaS control panels, ensuring users see precisely how their content will resonate before publishing.

## Colors

The palette balances authoritative brand trust with utility-driven neutral tiers:

- **Primary Interactive (`#0A66C2`):** Used strictly for core calls-to-action, key selected states, active tab markers, linked hashtags, and high-priority indicators.
- **Primary Hover (`#004182` / `#08519C`):** Deeper cobalt for interactive transitions and depressed button states.
- **Primary Tint / Wash (`#E8F3FF`):** Soft, low-saturation blue backdrop for selected cards, active badge fills, and subtle focus halos.
- **Secondary Accent (`#004182`):** Structural emphasis for active navigation elements and strong interactive anchors.
- **Success / Publication Accent (`#057642`):** Reserved for scheduling confirmations, optimal reach indicators, and verification badges.
- **Canvas & Neutrals:**
  - `Canvas Base`: `#F5F7FA` (cool, low-strain slate gray that cleanly separates panels).
  - `Card / Surface`: `#FFFFFF` (pure white for crisp contrast against `#F5F7FA`).
  - `Borders & Rules`: `#E2E8F0` (structural dividers) and `#CBD5E1` (interactive boundaries and inputs).
  - `Text Primary`: `#0F172A` (deep slate navy, high readability without the harshness of pure black).
  - `Text Secondary / Metadata`: `#475569` (for secondary labels, timestamps, author bios).
  - `Text Tertiary / Placeholder`: `#94A3B8` (helper hints, deactivated iconography, inactive inputs).

## Typography

The type system is engineered around **Inter** across all typographic hierarchies, optimizing for legibility at small sizes and high-density screens:

- **Headlines:** Set with negative letter-tracking and semi-bold/bold weights to anchor page navigation and AI output titles.
- **Social Feed Post Body:** Employs `body-md` (14px on 20px line-height) to match standard professional feed density with zero eye strain. Line length for feed reading should not exceed 65 characters per line.
- **Hashtags & Mentions:** Styled in `body-md` / `label-md` with primary accent coloration (`#0A66C2`) and 600 weight.
- **Metadata & Subtext:** Set in `body-sm` (`#475569`) for time markers, visibility indicators, and metrics.

## Layout & Spacing

The design system employs an asymmetrical split-pane layout model optimized for real-time authoring and previewing:

- **Desktop (1280px+):** A 12-column grid. The authoring workspace occupies 7 columns (or 55% width), while the LinkedIn Post Preview Canvas pins to a fixed-width 5-column (or 45% width) side rail with sticky positioning.
- **Tablet (768px - 1024px):** 8-column layout. Workspace and preview stack or toggle via a synchronized segmented view controller.
- **Mobile (<768px):** Single-column fluid view with an edge margin of `1rem`. Floating action pills enable fast switching between "Editor" and "Post Preview."
- **Internal Spacing Cadence:** Built on an 8pt base grid (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px). Component internals strictly follow 12px or 16px horizontal paddings with 8px vertical paddings.

## Elevation & Depth

Visual hierarchy is maintained through delicate low-contrast outlines coupled with ambient slate shadows:

- **Level 0 (Base Canvas):** `#F5F7FA` flat, non-elevated background.
- **Level 1 (Standard Surface / Cards):** `#FFFFFF` surface with a continuous `1px solid #E2E8F0` border and an ambient drop shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
- **Level 2 (Active Focus & Feed Preview Card):** `#FFFFFF` surface, `1px solid #CBD5E1`, with shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modals, Overlays, Dropdowns):** `#FFFFFF` surface, `1px solid #E2E8F0`, with diffused depth: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`.
- **Ghost Elevation:** Interactive elements avoid heavy drop shadows in favor of crisp 1px borders paired with subtle hover background shifts (e.g., `#F8FAFC`).

## Shapes

The interface embraces a balanced modern radius hierarchy (`roundedness: 2`):

- **Default UI Elements (Buttons, Inputs, Badges):** `8px` (`0.5rem`). Provides structural discipline and aligns with corporate design vernacular.
- **Structural Containers (Post Previews, Form Panels):** `12px` to `16px` (`rounded-lg` to `rounded-xl`) to frame content cleanly.
- **Interactive Micro-Pills (Tag filters, post reactions, status pills):** `9999px` (full pill shape) to denote self-contained, clickable tags.
- **Avatars:** Strictly `9999px` circular geometry (48px × 48px for post previews, 32px × 32px for nested replies and author bars).

## Components

### Buttons
- **Primary:** Filled `#0A66C2` background, white text (`label-lg`), `8px` radius. Hover state transitions to `#08519C`. Active state presses down to `#004182` with a `scale-[0.99]` transform. Padding: `10px 20px`.
- **Secondary Outline:** Transparent fill, `1px solid #CBD5E1`, `#0F172A` text. Hover state shifts to `#F8FAFC` background with border `#94A3B8`.
- **Ghost / Action Bar Buttons:** Transparent background, `#475569` text and icon. Hover triggers `#F1F5F9` with `#0F172A` icon fill. Used within the LinkedIn preview action bar.

### Form Inputs & Textareas
- **Input Fields:** `#FFFFFF` background, `1px solid #CBD5E1`, `8px` border radius, padding `10px 14px`. Text in `#0F172A`, placeholder in `#94A3B8`.
- **Focus State:** `border-color: #0A66C2`, flanked by a gentle outer glow: `box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.15)`.
- **Prompt Generators / AI Textareas:** Expandable multi-line container with embedded bottom toolbar (token count indicator, tone chips, and generation triggers).

### Chips, Badges & Event Tags
- **Category Chips:** Tinted fill `#F1F5F9`, border `1px solid #E2E8F0`, text `#475569`, radius `9999px`.
- **Selected Tag:** Fill `#E8F3FF`, border `1px solid #0A66C2`, text `#0A66C2` with a trailing dismiss icon.
- **AI Tone Pills:** Subtle rounded-lg buttons with dynamic icons (e.g., "Thought Leader", "Attendee Hype", "Key Takeaway") indicating generation modes.

### LinkedIn Post Preview Card
- **Header:**
  - Author Avatar: 48px circle with a `1px solid #E2E8F0` border.
  - Meta Block: Author Name (`14px`, 600 weight, `#0F172A`), Headline/Bio (`12px`, `#475569`, single-line truncated), Timestamp (`12px`, `#94A3B8` accompanied by an 11px globe icon).
  - Overflow Menu: 3-dot horizontal icon button in the top right.
- **Content Area:**
  - Dynamic copy rendering with formatted breaks.
  - Inline `#0A66C2` styling for detected hashtags (`#EventTech`, `#SaaS2025`) and mentions.
  - "...see more" collapsible toggle previewing mobile truncation at line 3.
- **Media Asset Grid:**
  - Single Image: `16:9` or `1:1` aspect-ratio container with `1px solid #E2E8F0` edge definition.
  - Multi-image Collage: 2-to-4 image responsive CSS grid with 2px seam gaps.
- **Social Proof / Reaction Summary:**
  - Overlapping circular reaction glyphs (Like, Insightful, Celebrate) followed by reaction count (`12px`, `#475569`).
  - Comment and Repost count aligned to the right.
  - Top divider: `1px solid #E2E8F0`.
- **Action Bar:**
  - 4-column balanced action cluster: **Like**, **Comment**, **Repost**, **Send**.
  - 20px stroke icons, `13px` medium font, `#475569` coloring, highlighting to `#0A66C2` on click simulation.

### Checkboxes & Segmented Controls
- **Checkboxes:** 18px × 18px square with `4px` radius. Unchecked: `1.5px solid #CBD5E1`. Checked: `#0A66C2` background with white SVG checkmark.
- **Segmented Control:** Enclosed container in `#F1F5F9`, padding `4px`, containing tab chips that transition to `#FFFFFF` with `shadow-sm` when active.
