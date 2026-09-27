# PostManager

AI LinkedIn post generator for events. Organizers configure an event and share an attendee link or QR code; attendees add photos and highlights, pick a tone, and get a ready-to-post LinkedIn draft generated with Groq.

Built with Next.js (App Router), TypeScript, Tailwind and Firebase (Auth + Firestore), from the Stitch designs in `assets/stitch/`.

## Setup

```bash
npm install
cp .env.example .env.local   # then set GROQ_API_KEY and the NEXT_PUBLIC_FIREBASE_* values
npm run dev                  # http://localhost:3000
```

Firebase project setup (once):

1. Authentication → Sign-in method: enable **Email/Password** (organizers) and **Anonymous** (attendees).
2. Create a Firestore database.
3. Deploy the security rules: `npx firebase-tools login` then `npx firebase-tools deploy --only firestore:rules`.

| Variable | Default | Purpose |
|---|---|---|
| `GROQ_API_KEY` | — | Server-only Groq key. |
| `GROQ_MODEL` | `openai/gpt-oss-120b` | Model for text-only posts. |
| `GROQ_VISION_MODEL` | `qwen/qwen3.8-27b` | Model used when photos are attached. Set it empty to ignore photos. |
| `NEXT_PUBLIC_FIREBASE_*` | — | Firebase web app config. Public by design; access is enforced by `firestore.rules`. |

## Data model (Firestore)

- `events/{eventId}`: organizer-owned event settings plus `ownerUid` and a `visits` counter. Anyone can read it (attendee links). Only the owner, signed in with email/password, can edit it. Any signed-in visitor can raise `visits` by exactly 1.
- `events/{eventId}/posts/{postId}`: generated posts (`authorUid`, name, headline, tone, text, status, imageCount). Attendees create them through anonymous auth. The event owner and the post's author can read them. Authors can only move `status` to copied or published.

## Routes

- `/organizer`: organizer sign-in, event switcher and New Event, event settings, attendee link and QR code, live metrics and post feed, CSV export.
- `/attendee/<eventId>`: the attendee post generator. `/attendee` on its own sends a signed-in organizer to their active event.
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
src/hooks                Firestore subscriptions, uploads, generation, clipboard
src/lib                  types, tones, metrics; lib/firebase = client/auth/events/posts; lib/server = Groq + prompt (server-only)
firestore.rules          security rules (deploy with firebase-tools)
assets/stitch/           original Stitch export (read-only reference)
```

## Current limitations

- Attendee photos aren't stored. They're sent to Groq for the draft, and only the photo count is saved.
- The reach and impressions of posts on LinkedIn aren't tracked. "Published" means the attendee clicked "Open in LinkedIn".
