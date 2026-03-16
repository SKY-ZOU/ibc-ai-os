import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/lead - 创建线索（分发）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { opportunityId, targetEnterpriseId, notes } = body

    if (!opportunityId || !targetEnterpriseId) {
      return NextResponse.json(
        { success: false, error: '商机ID和目标企业ID为必填项' },
        { status: 400 }
      )
    }

    // 检查商机是否存在
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: opportunityId }
    })

    if (!opportunity) {
      return NextResponse.json(
        { success: false, error: '商机不存在' },
        { status: 404 }
      )
    }

    // 检查目标企业是否存在
    const enterprise = await prisma.enterprise.findUnique({
      where: { id: targetEnterpriseId }
    })

    if (!enterprise) {
      return NextResponse.json(
        { success: false, error: '目标企业不存在' },
        { status: 404 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        opportunityId,
        targetEnterpriseId,
        notes,
        status: 'new'
      }
    })

    return NextResponse.json({ success: true, data: lead }, { status: 201 })
  } catch (error) {
    console.error('Create lead error:', error)
    return NextResponse.json(
      { success: false, error: '创建线索失败' },
      { status: 500 }
    )
  }
}

// GET /api/lead - 获取线索列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const targetEnterpriseId = searchParams.get('targetEnterpriseId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (status) where.status = status
    if (targetEnterpriseId) where.targetEnterpriseId = targetEnterpriseId

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.lead.count({ where })
    ])

    // 获取关联数据
    const enterpriseIds = [...new Set(leads.map(l => l.targetEnterpriseId))]
    const enterprises = await prisma.enterprise.findMany({
      where: { id: { in: enterpriseIds } },
      select: { id: true, name: true, country: true }
    })
    const enterpriseMap = new Map(enterprises.map(e => [e.id, e]))

    const data = leads.map(lead => ({
      ...lead,
      enterprise: enterpriseMap.get(lead.targetEnterpriseId)
    }))

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    })
  } catch (error) {
    console.error('Get leads error:', error)
    return NextResponse.json(
      { success: false, error: '获取线索列表失败' },
      { status: 500 }
    )
  }
}
