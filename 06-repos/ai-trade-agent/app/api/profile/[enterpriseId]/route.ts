import { NextRequest, NextResponse } from "next/server";

// In-memory store for mock mode (replace with DB lookup in production)
const profileStore = new Map<string, Record<string, unknown>>();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ enterpriseId: string }> }
) {
  const { enterpriseId } = await params;

  const profile = profileStore.get(enterpriseId);
  if (!profile) {
    return NextResponse.json(
      { success: false, error: `Profile not found for enterpriseId: ${enterpriseId}` },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, profile });
}

// Allow storing profiles via PUT (for testing)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ enterpriseId: string }> }
) {
  const { enterpriseId } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  profileStore.set(enterpriseId, body as Record<string, unknown>);
  return NextResponse.json({ success: true, enterpriseId });
}
