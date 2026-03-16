import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/enterprise/register - 企业注册
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      name,
      code,
      country,
      industry,
      contactName,
      contactPhone,
      contactEmail,
      scale,
      businessLicense,
      tradeMode
    } = body

    if (!name || !country) {
      return NextResponse.json(
        { error: '企业名称和所在国家为必填项' },
        { status: 400 }
      )
    }

    const enterprise = await prisma.enterprise.create({
      data: {
        name,
        code,
        country,
        industry,
        contactName,
        contactPhone,
        contactEmail,
        scale,
        businessLicense,
        tradeMode,
        status: 'pending'
      }
    })

    return NextResponse.json({ success: true, data: enterprise }, { status: 201 })
  } catch (error) {
    console.error('Enterprise registration error:', error)
    return NextResponse.json(
      { success: false, error: '企业注册失败' },
      { status: 500 }
    )
  }
}

// GET /api/enterprise - 获取企业列表
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
        orderBy: { createdAt: 'desc' }
      }),
      prisma.enterprise.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: enterprises,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get enterprises error:', error)
    return NextResponse.json(
      { success: false, error: '获取企业列表失败' },
      { status: 500 }
    )
  }
}
