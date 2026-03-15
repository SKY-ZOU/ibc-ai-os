import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import type { PricingValidateInput } from "@/types";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const input = body as Partial<PricingValidateInput>;

  if (!input.enterpriseId || typeof input.enterpriseId !== "string") {
    return NextResponse.json({ success: false, error: "enterpriseId is required" }, { status: 400 });
  }
  if (!input.category || typeof input.category !== "string") {
    return NextResponse.json({ success: false, error: "category is required" }, { status: 400 });
  }

  try {
    const provider = getProvider();
    const result = await provider.validatePrice({
      enterpriseId: input.enterpriseId,
      category: input.category,
      quantity: typeof input.quantity === "number" ? input.quantity : undefined,
      unit: input.unit,
      currency: input.currency,
      declaredValue: typeof input.declaredValue === "number" ? input.declaredValue : undefined,
    });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
