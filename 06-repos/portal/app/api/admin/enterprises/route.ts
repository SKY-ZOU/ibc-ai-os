import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/enterprises - 企业管理列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const country = searchParams.get('country')
    const industry = searchParams.get('industry')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (status) where.status = status
    if (country) where.country = country
    if (industry) where.industry = industry

    const [enterprises, total] = await Promise.all([
      prisma.enterprise.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { products: true, demands: true, opportunities: true }
          }
        }
      }),
      prisma.enterprise.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: enterprises,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    })
  } catch (error) {
    console.error('Get enterprises error:', error)
    return NextResponse.json(
      { success: false, error: '获取企业列表失败' },
      { status: 500 }
    )
  }
}
