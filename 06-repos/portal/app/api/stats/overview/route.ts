import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/stats/overview - 平台核心指标
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // 默认30天

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // 并行查询各项指标
    const [
      totalEnterprises,
      activeEnterprises,
      totalProducts,
      totalDemands,
      totalOpportunities,
      wonOpportunities,
      newEnterprises,
      newProducts,
      newDemands,
    ] = await Promise.all([
      prisma.enterprise.count(),
      prisma.enterprise.count({ where: { status: 'approved' } }),
      prisma.product.count(),
      prisma.demand.count(),
      prisma.opportunity.count(),
      prisma.opportunity.count({ where: { stage: 'closed_won' } }),
      prisma.enterprise.count({ where: { createdAt: { gte: startDate } } }),
      prisma.product.count({ where: { createdAt: { gte: startDate } } }),
      prisma.demand.count({ where: { createdAt: { gte: startDate } } }),
    ])

    // 计算成交金额
    const wonOpps = await prisma.opportunity.findMany({
      where: { stage: 'closed_won' },
      select: { value: true, currency: true }
    })

    const totalValue = wonOpps.reduce((sum, opp) => {
      // 简化计算：统一按USD
      return sum + (opp.value || 0)
    }, 0)

    // 行业分布
    const industryDistribution = await prisma.enterprise.groupBy({
      by: ['industry'],
      where: { industry: { not: null } },
      _count: true,
      orderBy: { _count: { industry: 'desc' } },
      take: 10
    })

    // 国家分布
    const countryDistribution = await prisma.enterprise.groupBy({
      by: ['country'],
      _count: true,
      orderBy: { _count: { country: 'desc' } },
      take: 10
    })

    // 商机阶段分布
    const stageDistribution = await prisma.opportunity.groupBy({
      by: ['stage'],
      _count: true
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalEnterprises,
          activeEnterprises,
          totalProducts,
          totalDemands,
          totalOpportunities,
          wonOpportunities,
          totalValue,
        },
        trends: {
          newEnterprises,
          newProducts,
          newDemands,
        },
        distribution: {
          industry: industryDistribution.map(i => ({
            industry: i.industry,
            count: i._count
          })),
          country: countryDistribution.map(c => ({
            country: c.country,
            count: c._count
          })),
          stage: stageDistribution.map(s => ({
            stage: s.stage,
            count: s._count
          }))
        }
      }
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    )
  }
}
