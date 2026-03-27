import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { runMatching } from '@/lib/matching-engine'

const ADMIN_KEY = process.env.ADMIN_KEY ?? 'IBC_ADMIN_2026'

function isAuthorized(req: NextRequest) {
  return req.headers.get('x-admin-key') === ADMIN_KEY
}

/**
 * PATCH /api/admin/enterprises/[id]
 * Body: { action: 'approve' | 'reject', reason?: string }
 * Header: x-admin-key
 *
 * approve → status: approved → 触发匹配引擎
 * reject  → status: rejected
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const action: string = body.action ?? ''
    const reason: string | undefined = body.reason

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json(
        { success: false, error: 'action must be approve or reject' },
        { status: 400 },
      )
    }

    const old = await prisma.enterprise.findUnique({ where: { id }, select: { status: true, name: true } })
    if (!old) {
      return NextResponse.json({ success: false, error: '企业不存在' }, { status: 404 })
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected'
    const enterprise = await prisma.enterprise.update({
      where: { id },
      data: { status: newStatus },
    })

    // 审计日志
    await prisma.auditLog.create({
      data: {
        entityType: 'Enterprise',
        entityId: id,
        action: 'status_changed',
        field: 'status',
        oldValue: old.status,
        newValue: newStatus,
        ...(reason ? { newValue: `${newStatus}（${reason}）` } : {}),
      },
    })

    // 通知企业
    await prisma.notification.create({
      data: {
        type: action === 'approve' ? 'enterprise_approved' : 'enterprise_rejected',
        title: action === 'approve' ? '入驻申请已通过' : '入驻申请未通过',
        content: reason ?? (action === 'approve' ? '恭喜，您的企业已通过审核，现在可以发布供给和需求。' : '您的入驻申请未通过审核。'),
        entityType: 'Enterprise',
        entityId: id,
      },
    })

    // 审批通过后，异步触发匹配（不阻塞响应）
    if (action === 'approve') {
      runMatching({ useAI: true }).catch(() => {/* silent */})
    }

    return NextResponse.json({ success: true, data: enterprise })
  } catch (error) {
    const message = error instanceof Error ? error.message : '更新企业失败'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
