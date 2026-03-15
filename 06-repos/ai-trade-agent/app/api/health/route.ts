import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "ai-trade-agent",
    version: "0.1.0",
    provider: process.env.AI_PROVIDER ?? "mock",
    timestamp: new Date().toISOString(),
  });
}
