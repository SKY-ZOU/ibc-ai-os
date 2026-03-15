import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import type { MatchScoreInput } from "@/types";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const input = body as Partial<MatchScoreInput>;

  if (!input.sourceId || typeof input.sourceId !== "string") {
    return NextResponse.json({ success: false, error: "sourceId is required" }, { status: 400 });
  }
  if (!input.targetId || typeof input.targetId !== "string") {
    return NextResponse.json({ success: false, error: "targetId is required" }, { status: 400 });
  }
  if (!input.category || typeof input.category !== "string") {
    return NextResponse.json({ success: false, error: "category is required" }, { status: 400 });
  }

  try {
    const provider = getProvider();
    const result = await provider.scoreMatch({
      sourceId: input.sourceId,
      targetId: input.targetId,
      category: input.category,
      dimensions: Array.isArray(input.dimensions) ? input.dimensions : undefined,
    });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
