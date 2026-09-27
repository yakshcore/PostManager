import "server-only";
import Groq from "groq-sdk";
import type { ModelInfo } from "@/lib/types";

const DEFAULT_TEXT_MODEL = "openai/gpt-oss-120b";
const DEFAULT_VISION_MODEL = "qwen/qwen3.8-27b";

export function getModelConfig(): ModelInfo {
  const vision = process.env.GROQ_VISION_MODEL;
  return {
    configured: Boolean(process.env.GROQ_API_KEY),
    textModel: process.env.GROQ_MODEL?.trim() || DEFAULT_TEXT_MODEL,
    // An explicitly empty GROQ_VISION_MODEL disables image input.
    visionModel: vision === undefined ? DEFAULT_VISION_MODEL : vision.trim() || null,
  };
}

let client: Groq | null = null;

export function getGroq(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new MissingKeyError();
  client ??= new Groq({ apiKey, maxRetries: 2, timeout: 60_000 });
  return client;
}

export class MissingKeyError extends Error {
  constructor() {
    super("GROQ_API_KEY is not set");
  }
}
