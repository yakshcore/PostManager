export type ToneId = "professional" | "grateful" | "takeaways" | "excited";

export interface EventConfig {
  name: string;
  organizer: string;
  hashtags: string[];
  linkedinUrl: string;
  twitterUrl: string;
  websiteUrl: string;
  guidance: string;
  location: string;
  dateLabel: string;
}

/** An event as stored in Firestore (`events/{id}`). */
export interface EventRecord extends EventConfig {
  id: string;
  ownerUid: string;
  visits: number;
  createdAt: number;
}

export interface GenerateRequest {
  tone: ToneId;
  highlights: string;
  event: EventConfig;
  /** JPEG data URLs, already downscaled on the client. */
  images: string[];
  /** Present when regenerating, so the model writes a different take. */
  previousPost?: string;
}

export interface GenerateResponse {
  post: string;
  model: string;
  imagesUsed: boolean;
}

export interface ModelInfo {
  configured: boolean;
  textModel: string;
  visionModel: string | null;
}

export interface CommunityPost {
  id: string;
  name: string;
  role: string;
  /** Epoch ms; rendered as relative time. */
  createdAt: number;
  tone: ToneId | "thought-leader" | "hype";
  text: string;
  status: "published" | "copied" | "draft";
  imageCount: number;
}
