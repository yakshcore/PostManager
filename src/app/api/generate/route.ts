import { NextResponse, type NextRequest } from "next/server";
import Groq from "groq-sdk";
import type { ChatCompletionContentPart } from "groq-sdk/resources/chat/completions";
import { getGroq, getModelConfig, MissingKeyError } from "@/lib/server/groq";
import { buildUserPrompt, cleanPost, SYSTEM_PROMPT } from "@/lib/server/prompt";
import { rateLimit } from "@/lib/server/rate-limit";
import { sanitizeEvent } from "@/lib/event-config";
import { TONE_IDS } from "@/lib/tones";
import type { GenerateRequest, GenerateResponse, ToneId } from "@/lib/types";

export const runtime = "nodejs";

const MAX_IMAGES = 4;
// Groq caps base64 image payloads at 4MB each.
const MAX_IMAGE_CHARS = 4 * 1024 * 1024;
const IMAGE_DATA_URL = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

function fail(status: number, error: string, headers?: HeadersInit) {
  return NextResponse.json({ error }, { status, headers });
}

function parseBody(body: unknown): GenerateRequest | string {
  if (!body || typeof body !== "object") return "Invalid request body.";
  const b = body as Record<string, unknown>;

  if (!TONE_IDS.includes(b.tone as ToneId)) return "Unknown tone.";
  if (typeof b.highlights !== "string" || b.highlights.length > 2000)
    return "Highlights must be text under 2000 characters.";

  const event = sanitizeEvent(b.event);
  if (!event) return "Missing event details.";

  const images = Array.isArray(b.images) ? b.images : [];
  if (images.length > MAX_IMAGES) return `Attach at most ${MAX_IMAGES} photos.`;
  for (const img of images) {
    if (typeof img !== "string" || !IMAGE_DATA_URL.test(img)) return "Photos must be JPEG, PNG or WebP.";
    if (img.length > MAX_IMAGE_CHARS) return "One of the photos is too large (4MB max after compression).";
  }

  const previousPost =
    typeof b.previousPost === "string" && b.previousPost.trim() ? b.previousPost.slice(0, 5000) : undefined;

  return { tone: b.tone as ToneId, highlights: b.highlights, event, images: images as string[], previousPost };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = rateLimit(ip);
  if (!limit.ok)
    return fail(429, `Too many requests. Try again in ${limit.retryAfter}s.`, {
      "Retry-After": String(limit.retryAfter),
    });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid JSON.");
  }
  const parsed = parseBody(body);
  if (typeof parsed === "string") return fail(400, parsed);

  const { textModel, visionModel } = getModelConfig();
  const useImages = parsed.images.length > 0 && !!visionModel;
  const model = useImages ? visionModel! : textModel;

  const userText = buildUserPrompt(parsed, useImages);
  const userContent: string | ChatCompletionContentPart[] = useImages
    ? [
        { type: "text", text: userText },
        ...parsed.images.map((url) => ({ type: "image_url" as const, image_url: { url } })),
      ]
    : userText;

  try {
    const completion = await getGroq().chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      temperature: parsed.previousPost ? 0.95 : 0.75,
      max_completion_tokens: 4096,
      include_reasoning: false,
    });

    const post = cleanPost(completion.choices[0]?.message?.content ?? "");
    if (!post) return fail(502, "The model returned an empty post. Please try again.");

    return NextResponse.json<GenerateResponse>({ post, model, imagesUsed: useImages });
  } catch (err) {
    if (err instanceof MissingKeyError)
      return fail(500, "Server is missing GROQ_API_KEY. Add it to .env.local and restart.");
    if (err instanceof Groq.APIError) {
      console.error("[generate] Groq error", err.status, err.message);
      if (err.status === 401) return fail(500, "The Groq API key was rejected. Check GROQ_API_KEY.");
      if (err.status === 404) return fail(500, `Model "${model}" is not available on this Groq account.`);
      if (err.status === 413) return fail(413, "Photos are too large for the model. Try fewer photos.");
      if (err.status === 429) return fail(429, "Groq rate limit reached. Wait a moment and regenerate.");
      if (err.status === 400) return fail(400, "The model rejected this request. Try removing photos or shortening your notes.");
      return fail(502, "The AI service is unavailable right now. Please try again.");
    }
    console.error("[generate] Unexpected error", err);
    return fail(500, "Something went wrong while generating your post.");
  }
}
