import { NextRequest, NextResponse } from 'next/server'
import { getMockOrder, MOCK_ORDERS } from '@/mocks/orders'

const isMock = process.env.MOCK_MODE !== 'false'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (isMock) {
    const order = getMockOrder(id)
    if (!order) return NextResponse.json({ message: '订单不存在' }, { status: 404 })
    return NextResponse.json(order)
  }

  // TODO: 替换为 prisma.order.findUnique(...)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let body: { status?: string; notes?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  if (isMock) {
    const order = getMockOrder(id)
    if (!order) return NextResponse.json({ message: '订单不存在' }, { status: 404 })
    const updated = { ...order, ...body, updatedAt: new Date().toISOString(), _mock: true as const }
    return NextResponse.json(updated)
  }

  // TODO: 替换为 prisma.order.update(...)
  void MOCK_ORDERS
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
