import "server-only";
import type { GenerateRequest } from "@/lib/types";
import { getTone } from "@/lib/tones";

export const SYSTEM_PROMPT = `You are EventPulse, a ghostwriter who turns event experiences into authentic, high-engagement LinkedIn posts written in the first person by an attendee.

Rules:
- Output ONLY the post text. No preamble, no title, no quotation marks around it, no notes afterwards.
- LinkedIn does not render Markdown: never use **, __, #, or backticks for formatting. Use line breaks, emoji bullets (e.g. 💡, ✅, 🚀) and "Label:" prefixes instead.
- Open with a strong one-line hook. Keep paragraphs to 1–3 short lines separated by blank lines.
- 120–220 words before the hashtags.
- Mention the organizer as "@<Organizer>" once, naturally.
- Only state facts the attendee provided or that are clearly visible in the photos. Never invent names, numbers, awards, or companies.
- End with a blank line and then the hashtags on a single line: include every official event hashtag, plus at most 2 relevant extra ones.`;

export function buildUserPrompt(req: GenerateRequest, withImages: boolean): string {
  const { event } = req;
  const tone = getTone(req.tone);
  const lines = [
    `Event: ${event.name}`,
    `Organizer: ${event.organizer}`,
    event.location && `Location: ${event.location}`,
    event.dateLabel && `Date: ${event.dateLabel}`,
    `Official hashtags: ${event.hashtags.join(" ") || "(none)"}`,
    event.guidance && `Organizer's talking points (weave in if they fit): ${event.guidance}`,
    "",
    `Tone: ${tone.label}. ${tone.guide}`,
    "",
    "Attendee's own highlights and what they learned:",
    req.highlights.trim() || "(none given — keep it general to the event and the talking points)",
  ];

  if (withImages) {
    lines.push(
      "",
      `The attendee attached ${req.images.length} photo(s) that will appear with the post. Reference what they show in a natural way (one sentence at most); do not describe them exhaustively.`,
    );
  }

  if (req.previousPost) {
    lines.push(
      "",
      "Write a clearly different version from this previous draft — new hook, different structure and wording, same facts:",
      "<<<",
      req.previousPost,
      ">>>",
    );
  }

  return lines.filter((l) => l !== false && l !== undefined).join("\n");
}

/** Defensive cleanup in case the model ignores the formatting rules. */
export function cleanPost(raw: string): string {
  return raw
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^["“](.*)["”]$/s, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
