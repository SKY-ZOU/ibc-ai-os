import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/enterprise/[id]
 * 公开企业主页：基础信息 + 供给产品 + 采购需求（phone 脱敏）
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const enterprise = await prisma.enterprise.findUnique({
      where: { id },
      include: {
        products: {
          where: { status: 'active' },
          orderBy: { createdAt: 'desc' },
          take: 20,
          select: {
            id: true, name: true, nameEn: true, category: true,
            priceMin: true, priceMax: true, currency: true,
            unit: true, minQty: true, maxQty: true, leadTime: true,
            hsCode: true, origin: true, description: true, createdAt: true,
          },
        },
        demands: {
          where: { status: 'open' },
          orderBy: { createdAt: 'desc' },
          take: 20,
          select: {
            id: true, title: true, titleEn: true, category: true,
            budgetMin: true, budgetMax: true, currency: true,
            quantity: true, unit: true, deliveryLocation: true,
            paymentPreference: true, acceptAlternative: true,
            description: true, createdAt: true,
          },
        },
        _count: { select: { products: true, demands: true, opportunities: true } },
      },
    })

    if (!enterprise) {
      return NextResponse.json({ success: false, error: 'Enterprise not found' }, { status: 404 })
    }

    // 脱敏：公开接口隐藏 phone，email 仅 approved 企业可见
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { phone: _phone, email, ...safe } = enterprise

    return NextResponse.json({
      success: true,
      data: {
        ...safe,
        email: enterprise.status === 'approved' ? email : undefined,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch enterprise'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
