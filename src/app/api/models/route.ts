import { NextResponse } from "next/server";
import { getModelConfig } from "@/lib/server/groq";

export const dynamic = "force-dynamic";

/** Public model info for the UI. Never exposes the key itself. */
export function GET() {
  return NextResponse.json(getModelConfig());
}
