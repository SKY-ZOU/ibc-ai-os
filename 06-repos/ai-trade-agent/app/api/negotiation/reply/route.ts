import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import type { NegotiationReplyInput } from "@/types";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const input = body as Partial<NegotiationReplyInput>;

  if (!input.enterpriseId || typeof input.enterpriseId !== "string") {
    return NextResponse.json({ success: false, error: "enterpriseId is required" }, { status: 400 });
  }
  if (!input.context || typeof input.context !== "string") {
    return NextResponse.json({ success: false, error: "context is required" }, { status: 400 });
  }
  if (!input.latestMessage || typeof input.latestMessage !== "string") {
    return NextResponse.json({ success: false, error: "latestMessage is required" }, { status: 400 });
  }
  if (input.role !== "seller" && input.role !== "buyer") {
    return NextResponse.json({ success: false, error: 'role must be "seller" or "buyer"' }, { status: 400 });
  }

  try {
    const provider = getProvider();
    const result = await provider.generateReply({
      enterpriseId: input.enterpriseId,
      context: input.context,
      latestMessage: input.latestMessage,
      role: input.role,
    });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
