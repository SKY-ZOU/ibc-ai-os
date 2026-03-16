import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/opportunities/[id]/stage - 更新商机阶段
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { stage } = await request.json()

    const validStages = ['new', 'matched', 'negotiating', 'pending_contract', 'closed_won', 'closed_lost']
    
    if (!stage || !validStages.includes(stage)) {
      return NextResponse.json(
        { success: false, error: '无效的商机阶段' },
        { status: 400 }
      )
    }

    // 获取旧状态
    const oldOpportunity = await prisma.opportunity.findUnique({
      where: { id },
      select: { stage: true }
    })

    if (!oldOpportunity) {
      return NextResponse.json(
        { success: false, error: '商机不存在' },
        { status: 404 }
      )
    }

    const oldStage = oldOpportunity.stage

    // 更新商机阶段
    const opportunity = await prisma.opportunity.update({
      where: { id },
      data: { 
        stage,
        closedAt: ['closed_won', 'closed_lost'].includes(stage) ? new Date() : null
      }
    })

    // 记录审核日志
    await prisma.auditLog.create({
      data: {
        entityType: 'Opportunity',
        entityId: id,
        action: 'status_changed',
        field: 'stage',
        oldValue: oldStage,
        newValue: stage
      }
    })

    return NextResponse.json({ success: true, data: opportunity })
  } catch (error) {
    console.error('Update opportunity stage error:', error)
    return NextResponse.json(
      { success: false, error: '更新商机阶段失败' },
      { status: 500 }
    )
  }
}
