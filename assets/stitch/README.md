# EventPulse — Stitch Handoff

Source: Stitch project `4994829765074898986` ("EventPulse LinkedIn Post Generator"), exported 2026-09-27.
Files here are the original exports — **do not edit**. Build the app from them; don't modify them.

## Inventory

| Screen | ID | Files |
|---|---|---|
| Brand Logo | 6051fb78dcd04222abaa8573c104eafc | `brand-logo/logo.svg` (vector source), `brand-logo/screenshot.png` (raster, 512×132) |
| User Avatar | f68757b4eb6a40a2a691b485239cbcf5 | `user-avatar/avatar.jpg` |
| Workshop Photo | df08f99b101d49aa95fb54cbc61d2d1d | `workshop-photo/workshop.jpg` |
| Event Photo | fd35d284477d4699b17402b4c920dd18 | `event-photo/event.jpg` |
| Organizer Dashboard | 8d2f915802934c8daa32b61e13cc0639 | `organizer-dashboard/code.html`, `screenshot.png` |
| Attendee View | c8f514106df84bb795b4e38316fe881c | `attendee-view/code.html`, `screenshot.png` |

- `design-system/DESIGN.md` — "Executive Pulse" design system (tokens + component specs).
- `design-system/tailwind.config.stitch.mjs` — Tailwind config pulled verbatim from the HTML (identical in both screens).
- `hosted-image-map.tsv` — the `lh3.googleusercontent.com` URLs used in the HTML, mapped to the local files above (all 4 are byte-identical duplicates of the asset screens).

## Export notes / limitations

1. The image screens (avatar, workshop, event) have no HTML — they are only images. Stitch serves them as JPEG under a `.png` screenshot entry; they were saved with a `.jpg` extension.
2. The HTML loads Tailwind from the Play CDN, and Inter and Material Symbols Outlined from Google Fonts. There are no font files to export; the app should load the same Google Fonts.
3. **Radius conflict:** DESIGN.md says `DEFAULT 0.5rem / lg 1rem / xl 1.5rem`, but the exported HTML config uses `DEFAULT 0.25rem / lg 0.5rem / xl 0.75rem`. The screenshots were rendered with the **HTML config**, so the app should use that to match pixel-for-pixel.
4. The nav bar has 4 tabs, but only 2 have screens. "Post Generator" (`content-generator`) and "Analytics" (`analytics`) have no Stitch screen.
5. Everything is static mock data (metrics, community post table, generated post text). The only interactivity is small inline scripts: tone toggling, copy-to-clipboard, and a simulated save/regenerate.
6. The QR code in the dashboard is a decorative inline SVG, not a real QR code.

## React component map

Shared (both screens)
- `AppHeader` — logo, "AI Post Suite" badge, nav tabs (`data-path` routing), event switcher, notifications, user menu
- `AppFooter`
- `Icon` — wraps `<span class="material-symbols-outlined">`
- `Button` (primary / secondary / ghost), `Chip`/`HashtagChip`, `Card` (`rounded-xl bg-surface-container-lowest shadow-sm`)
- `useCopyToClipboard` hook (both screens have copy buttons that show "Copied!")

Organizer Dashboard
- `WelcomeBar` (heading, plan badge, active-event pill, Export / New Event)
- `MetricCard` ×4 (label, icon tile, value, delta, footnote, progress bar)
- `EventConfigForm` (name/organizer, hashtag chips + add, LinkedIn/X/website URLs, AI guidance textarea, Reset/Save)
- `LiveEventCard` (banner image, tags, social shortcuts, mini stats)
- `AttendeeLinkCard` (URL + copy, QR code, slides download, "Preview Attendee Experience")
- `RecentPostsTable` + `Pagination`

Attendee View (the core generator)
- `EventBanner` (badges, title, official hashtags, quick links, switch-to-organizer)
- `PhotoUploader` (dropzone + thumbnail strip + add-more)
- `ToneSelector` (4 tone cards: Professional, Grateful Attendee, Key Takeaways, Excited Student)
- `HighlightsInput` (textarea + char count + quick-prompt pills)
- `GenerateButton`
- `LinkedInPostPreview` (author header, body with highlighted hashtags/mentions, 2-image grid, reactions, Like/Comment/Repost/Send bar) — reusable
- `PreviewToolbar` (Copy Text, Regenerate, Open in LinkedIn)
