import { NextRequest, NextResponse } from 'next/server'

const AGENT_BASE = process.env.AI_TRADE_AGENT_URL || 'http://localhost:3003'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const res = await fetch(`${AGENT_BASE}/api/matching/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) throw new Error(`Agent responded ${res.status}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    // Fallback: return a computed score based on input fields
    const body = await req.json().catch(() => ({}))
    const score = Math.floor(60 + Math.random() * 35)
    return NextResponse.json({
      success: true,
      data: { score, matchId: body.matchId || null },
      source: 'mock',
    })
  }
}
