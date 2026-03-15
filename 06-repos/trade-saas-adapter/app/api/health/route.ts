import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ibc-trade-saas-adapter', _mock: true })
}
