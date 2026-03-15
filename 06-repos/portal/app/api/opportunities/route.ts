import { NextRequest, NextResponse } from 'next/server'
import { getMockOpportunities } from '../../lib/mock-opportunities'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const type     = searchParams.get('type')     // 'supply' | 'demand' | null
  const category = searchParams.get('category') // category key or null
  const q        = searchParams.get('q')?.toLowerCase()
  const minScore = parseInt(searchParams.get('minScore') ?? '0')

  let opps = getMockOpportunities()

  if (type && type !== 'all') opps = opps.filter((o) => o.type === type)
  if (category && category !== 'all') opps = opps.filter((o) => o.category === category)
  if (q) opps = opps.filter((o) =>
    o.title.toLowerCase().includes(q) ||
    o.company.toLowerCase().includes(q) ||
    o.country.toLowerCase().includes(q) ||
    o.tags.some((t) => t.toLowerCase().includes(q))
  )
  if (minScore > 0) opps = opps.filter((o) => o.aiScore >= minScore)

  return NextResponse.json({ data: opps, total: opps.length })
}
