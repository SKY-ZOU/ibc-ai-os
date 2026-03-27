import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const FLAGS: Record<string, string> = {
  '中国': '🇨🇳', '美国': '🇺🇸', '英国': '🇬🇧', '德国': '🇩🇪', '法国': '🇫🇷',
  '澳大利亚': '🇦🇺', '迪拜/UAE': '🇦🇪', '沙特阿拉伯': '🇸🇦', '印度': '🇮🇳',
  '新加坡': '🇸🇬', '印度尼西亚': '🇮🇩', '泰国': '🇹🇭', '越南': '🇻🇳',
  '巴西': '🇧🇷', '南非': '🇿🇦', '尼日利亚': '🇳🇬', '俄罗斯': '🇷🇺',
  '智利': '🇨🇱', '哈萨克斯坦': '🇰🇿', '肯尼亚': '🇰🇪', '其他': '🌍',
}

/**
 * GET /api/match
 * 从 OpportunityMatch 查询已匹配结果，供前端展示
 * Query: type=supply|demand|all, category, q, limit
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const type     = searchParams.get('type') ?? 'all'
  const category = searchParams.get('category') ?? ''
  const q        = searchParams.get('q')?.toLowerCase() ?? ''
  const limit    = Math.min(parseInt(searchParams.get('limit') ?? '30'), 100)

  const matches = await prisma.opportunityMatch.findMany({
    where: { status: { in: ['pending', 'accepted'] } },
    include: {
      product: {
        select: {
          id: true, name: true, category: true, priceMin: true, priceMax: true,
          currency: true, origin: true,
          enterprise: { select: { id: true, name: true, country: true } },
        },
      },
      demand: {
        select: {
          id: true, title: true, category: true, budgetMin: true, budgetMax: true,
          currency: true, deliveryLocation: true,
          enterprise: { select: { id: true, name: true, country: true } },
        },
      },
    },
    orderBy: { matchScore: 'desc' },
    take: limit * 2, // 过滤后取 limit 条
  })

  type MatchItem = {
    id: string
    type: 'supply' | 'demand'
    category: string
    aiScore: number
    title: string
    company: string
    country: string
    flag: string
    value: string
    currency: string
    description: string
    enterpriseId: string
  }

  const items: MatchItem[] = []

  for (const m of matches) {
    if (!m.product || !m.demand) continue

    // supply side
    if (type === 'all' || type === 'supply') {
      const country = m.product.enterprise?.country ?? '其他'
      const item: MatchItem = {
        id: `s-${m.id}`,
        type: 'supply',
        category: m.product.category,
        aiScore: Math.round(m.matchScore),
        title: m.product.name,
        company: m.product.enterprise?.name ?? '',
        country,
        flag: FLAGS[country] ?? '🌐',
        value: m.product.priceMin
          ? `${m.product.currency ?? 'USD'} ${(m.product.priceMin / 1000).toFixed(0)}K+`
          : '价格面议',
        currency: m.product.currency ?? 'USD',
        description: m.matchReason ?? '',
        enterpriseId: m.product.enterprise?.id ?? '',
      }
      if (category && category !== 'all' && item.category !== category) continue
      if (q && !item.title.toLowerCase().includes(q) && !item.company.toLowerCase().includes(q)) continue
      items.push(item)
    }

    // demand side
    if (type === 'all' || type === 'demand') {
      const country = m.demand.enterprise?.country ?? '其他'
      const item: MatchItem = {
        id: `d-${m.id}`,
        type: 'demand',
        category: m.demand.category,
        aiScore: Math.round(m.matchScore),
        title: m.demand.title,
        company: m.demand.enterprise?.name ?? '',
        country,
        flag: FLAGS[country] ?? '🌐',
        value: m.demand.budgetMin
          ? `${m.demand.currency ?? 'USD'} ${(m.demand.budgetMin / 1000).toFixed(0)}K+`
          : '预算面议',
        currency: m.demand.currency ?? 'USD',
        description: m.matchReason ?? '',
        enterpriseId: m.demand.enterprise?.id ?? '',
      }
      if (category && category !== 'all' && item.category !== category) continue
      if (q && !item.title.toLowerCase().includes(q) && !item.company.toLowerCase().includes(q)) continue
      items.push(item)
    }
  }

  return NextResponse.json({
    success: true,
    data: items.slice(0, limit),
    total: items.length,
    source: 'db',
  })
}
