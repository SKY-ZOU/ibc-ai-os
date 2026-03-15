import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import type { MatchInput } from "@/types";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const input = body as Partial<MatchInput>;

  if (!input.sourceId || typeof input.sourceId !== "string") {
    return NextResponse.json({ success: false, error: "sourceId is required" }, { status: 400 });
  }
  if (!Array.isArray(input.targetIds) || input.targetIds.length === 0) {
    return NextResponse.json({ success: false, error: "targetIds must be a non-empty array" }, { status: 400 });
  }
  if (!input.category || typeof input.category !== "string") {
    return NextResponse.json({ success: false, error: "category is required" }, { status: 400 });
  }
  if (input.direction !== "supply_to_demand" && input.direction !== "demand_to_supply") {
    return NextResponse.json(
      { success: false, error: 'direction must be "supply_to_demand" or "demand_to_supply"' },
      { status: 400 }
    );
  }

  try {
    const provider = getProvider();
    const result = await provider.matchEnterprises({
      sourceId: input.sourceId,
      targetIds: input.targetIds as string[],
      category: input.category,
      direction: input.direction,
    });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
