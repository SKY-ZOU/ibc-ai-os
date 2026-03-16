import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/admin/enterprises/[id] - 企业审核
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { status, ...updateData } = body

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

    // 更新企业
    const enterprise = await prisma.enterprise.update({
      where: { id },
      data: {
        ...updateData,
        ...(status && { status })
      }
    })

    // 如果有状态变更，记录日志
    if (status && status !== oldEnterprise.status) {
      await prisma.auditLog.create({
        data: {
          entityType: 'Enterprise',
          entityId: id,
          action: 'status_changed',
          field: 'status',
          oldValue: oldEnterprise.status,
          newValue: status
        }
      })
    }

    return NextResponse.json({ success: true, data: enterprise })
  } catch (error) {
    console.error('Update enterprise error:', error)
    return NextResponse.json(
      { success: false, error: '更新企业失败' },
      { status: 500 }
    )
  }
}
