# PostManager

AI LinkedIn post generator for events. Organizers configure an event and share an attendee link or QR code; attendees add photos and highlights, pick a tone, and get a ready-to-post LinkedIn draft generated with Groq.

Built with Next.js (App Router), TypeScript and Tailwind, from the Stitch designs in `assets/stitch/`.

## Setup

```bash
npm install
cp .env.example .env.local   # then set GROQ_API_KEY
npm run dev                  # http://localhost:3000
```

| Variable | Default | Purpose |
|---|---|---|
| `GROQ_API_KEY` | — | Server-only Groq key. |
| `GROQ_MODEL` | `openai/gpt-oss-120b` | Model for text-only posts. |
| `GROQ_VISION_MODEL` | `qwen/qwen3.8-27b` | Model used when photos are attached. Set it empty to ignore photos. |

## Routes

- `/organizer`: event settings, shareable attendee link and QR code, community posts feed, CSV export.
- `/attendee` and `/attendee/<slug>?e=…`: the post generator. `?e=` carries the event settings, so a shared link works on any device without a backend.
- `/analytics`: placeholder (no Stitch screen yet).
- `POST /api/generate`: validates input, rate-limits (10/min per IP), and calls Groq. The key never reaches the browser.
- `GET /api/models`: which models are configured.

## Structure

```
src/app/                 routes + API handlers
src/components/layout    header, footer
src/components/organizer dashboard pieces (metrics, config form, link/QR card, posts table)
src/components/attendee  generator pieces (banner, uploader, tone selector, preview panel)
src/components/post      LinkedIn preview card, shared by both screens
src/hooks                event settings store, uploads, generation, clipboard
src/lib                  types, tones, event config encoding; lib/server = Groq + prompt (server-only)
assets/stitch/           original Stitch export (read-only reference)
```

## Current limitations

- There's no database. Event settings and generated posts are stored in the browser's localStorage, and the dashboard metrics are Stitch sample figures.
- The attendee profile (Sarah Lin) is the design's placeholder; there's no auth.
