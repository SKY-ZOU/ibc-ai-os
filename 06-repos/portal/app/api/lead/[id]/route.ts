import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/lead/[id] - 获取线索详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const lead = await prisma.lead.findUnique({
      where: { id }
    })

    if (!lead) {
      return NextResponse.json(
        { success: false, error: '线索不存在' },
        { status: 404 }
      )
    }

    // 获取关联数据
    const [opportunity, enterprise] = await Promise.all([
      lead.opportunityId ? prisma.opportunity.findUnique({ 
        where: { id: lead.opportunityId },
        select: { id: true, title: true, value: true, currency: true }
      }) : null,
      prisma.enterprise.findUnique({
        where: { id: lead.targetEnterpriseId },
        select: { id: true, name: true, country: true, contactName: true, email: true }
      })
    ])

    return NextResponse.json({ 
      success: true, 
      data: { ...lead, opportunity, enterprise } 
    })
  } catch (error) {
    console.error('Get lead error:', error)
    return NextResponse.json(
      { success: false, error: '获取线索详情失败' },
      { status: 500 }
    )
  }
}

// PATCH /api/lead/[id] - 更新线索状态
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status, notes } = await request.json()

    const validStatuses = ['new', 'contacted', 'interested', 'not_interested', 'converted']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: '无效的状态值' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        status,
        notes
      }
    })

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error('Update lead error:', error)
    return NextResponse.json(
      { success: false, error: '更新线索失败' },
      { status: 500 }
    )
  }
}
