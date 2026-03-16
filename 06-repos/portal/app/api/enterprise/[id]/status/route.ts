import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/enterprise/[id]/status - 审核企业入驻
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await request.json()

    const validStatuses = ['pending', 'approved', 'rejected']
    
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: '无效的审核状态' },
        { status: 400 }
      )
    }

    // 获取旧状态
    const oldEnterprise = await prisma.enterprise.findUnique({
      where: { id },
      select: { status: true }
    })

    if (!oldEnterprise) {
      return NextResponse.json(
        { success: false, error: '企业不存在' },
        { status: 404 }
      )
    }

    const oldStatus = oldEnterprise.status

    // 更新企业状态
    const enterprise = await prisma.enterprise.update({
      where: { id },
      data: { status }
    })

    // 记录审核日志
    await prisma.auditLog.create({
      data: {
        entityType: 'Enterprise',
        entityId: id,
        action: 'status_changed',
        field: 'status',
        oldValue: oldStatus,
        newValue: status
      }
    })

    return NextResponse.json({ success: true, data: enterprise })
  } catch (error) {
    console.error('Update enterprise status error:', error)
    return NextResponse.json(
      { success: false, error: '更新企业状态失败' },
      { status: 500 }
    )
  }
}
