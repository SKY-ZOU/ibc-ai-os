import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

const SYSTEM_ID = 'system'

async function ensureSystemEnterprise() {
  await prisma.enterprise.upsert({
    where: { id: SYSTEM_ID },
    update: {},
    create: { id: SYSTEM_ID, name: 'IBC System', country: 'Global', status: 'active' },
  })
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const stage = searchParams.get('stage')

  const opps = await prisma.opportunity.findMany({
    where: {
      NOT: { enterpriseId: SYSTEM_ID },
      ...(stage && stage !== 'all' ? { stage } : {}),
    },
    include: {
      enterprise: { select: { id: true, name: true, country: true } },
      matches: {
        take: 1,
        orderBy: { matchScore: 'desc' },
        select: {
          matchScore: true,
          matchReason: true,
          product: { select: { category: true } },
          demand: { select: { category: true } },
        },
      },
    },
    orderBy: { probability: 'desc' },
    take: 100,
  })

  // 展平 matches 数据到顶层，方便前端直接使用
  const enriched = opps.map(opp => {
    const topMatch = opp.matches[0]
    return {
      ...opp,
      matches: undefined,
      aiScore: topMatch ? Math.round(topMatch.matchScore) : opp.probability,
      aiReason: topMatch?.matchReason ?? opp.description,
      category: topMatch?.product?.category ?? topMatch?.demand?.category ?? null,
    }
  })

  return NextResponse.json({ data: enriched, total: enriched.length })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    if (!title) {
      return NextResponse.json({ success: false, error: 'title is required' }, { status: 400 })
    }

    await ensureSystemEnterprise()

    const enterpriseId = typeof body.enterpriseId === 'string' && body.enterpriseId.trim()
      ? body.enterpriseId.trim()
      : SYSTEM_ID

    const opp = await prisma.opportunity.create({
      data: {
        title,
        enterpriseId,
        description: typeof body.description === 'string' ? body.description.trim() || undefined : undefined,
        stage: 'new',
        value: typeof body.value === 'number' ? body.value : undefined,
        currency: typeof body.currency === 'string' ? body.currency : 'USD',
        probability: 10,
      },
    })

    return NextResponse.json({ success: true, data: opp })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create opportunity'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
