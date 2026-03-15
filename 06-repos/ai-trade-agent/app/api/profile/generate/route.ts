import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import type { ProfileInput } from "@/types";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const input = body as Partial<ProfileInput>;

  if (!input.enterpriseId || typeof input.enterpriseId !== "string") {
    return NextResponse.json({ success: false, error: "enterpriseId is required" }, { status: 400 });
  }
  if (!input.name || typeof input.name !== "string") {
    return NextResponse.json({ success: false, error: "name is required" }, { status: 400 });
  }

  const profileInput: ProfileInput = {
    enterpriseId: input.enterpriseId,
    name: input.name,
    description: input.description,
    industry: input.industry,
    country: input.country,
    products: Array.isArray(input.products) ? input.products : undefined,
    demands: Array.isArray(input.demands) ? input.demands : undefined,
  };

  try {
    const provider = getProvider();
    const result = await provider.extractProfile(profileInput);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
