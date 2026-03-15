import { NextRequest, NextResponse } from 'next/server'
import type { OrderInput, MockOrder } from '@/types'
import { MOCK_ORDERS } from '@/mocks/orders'

const isMock = process.env.MOCK_MODE !== 'false'

export async function GET() {
  if (isMock) {
    return NextResponse.json({ data: MOCK_ORDERS, total: MOCK_ORDERS.length, _mock: true })
  }
  // TODO: 替换为真实数据库查询
  return NextResponse.json({ data: [], total: 0 })
}

export async function POST(req: NextRequest) {
  let body: OrderInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  const required: (keyof OrderInput)[] = ['enterpriseId', 'enterpriseName']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ success: false, message: `缺少必填字段: ${field}` }, { status: 400 })
    }
  }

  if (isMock) {
    const mockOrder: MockOrder = {
      id: `MOCK-ORD-${Date.now()}`,
      orderNo: `ORD-${new Date().getFullYear()}-${String(MOCK_ORDERS.length + 1).padStart(3, '0')}`,
      enterpriseId: body.enterpriseId,
      enterpriseName: body.enterpriseName,
      productId: body.productId ?? null,
      productName: body.productName ?? null,
      quantity: body.quantity ?? null,
      unit: body.unit ?? null,
      unitPrice: body.unitPrice ?? null,
      totalAmount: body.quantity && body.unitPrice ? body.quantity * body.unitPrice : null,
      currency: body.currency ?? 'USD',
      status: 'pending',
      notes: body.notes ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
      _mock: true,
    }
    return NextResponse.json(mockOrder, { status: 201 })
  }

  // TODO: 替换为 prisma.order.create(...)
  return NextResponse.json({ success: false, message: 'Not implemented' }, { status: 501 })
}
