import type { ToneId } from "./types";

export interface Tone {
  id: ToneId;
  label: string;
  description: string;
  icon: string;
  /** Instruction passed to the model. */
  guide: string;
}

export const TONES: Tone[] = [
  {
    id: "professional",
    label: "Professional",
    description: "Career-focused & polished",
    icon: "business_center",
    guide:
      "Polished and career-focused. Emphasise skills gained, concrete outcomes, and professional growth. Confident, not boastful. Minimal emoji.",
  },
  {
    id: "grateful",
    label: "Grateful Attendee",
    description: "Warm & mentor-honoring",
    icon: "favorite",
    guide:
      "Warm and appreciative. Honour mentors, organisers, and teammates by name when provided. Genuine, personal, a few tasteful emoji.",
  },
  {
    id: "takeaways",
    label: "Key Takeaways",
    description: "Bulleted learning points",
    icon: "lightbulb",
    guide:
      "Structured around 3 numbered or emoji-bulleted learning points, each with a bolded-style label followed by a colon and one sentence. Insightful and skimmable.",
  },
  {
    id: "excited",
    label: "Excited Student",
    description: "Milestone & high energy",
    icon: "rocket_launch",
    guide:
      "High-energy milestone celebration from a student / new grad perspective. Enthusiastic, forward-looking, more emoji, short punchy lines.",
  },
];

export const TONE_IDS = TONES.map((t) => t.id);

export function getTone(id: ToneId): Tone {
  return TONES.find((t) => t.id === id) ?? TONES[1];
}
