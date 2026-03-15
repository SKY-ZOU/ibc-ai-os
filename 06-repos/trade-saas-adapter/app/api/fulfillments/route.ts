import { NextRequest, NextResponse } from 'next/server'
import type { FulfillmentInput, MockFulfillment } from '@/types'
import { MOCK_FULFILLMENTS } from '@/mocks/fulfillments'

const isMock = process.env.MOCK_MODE !== 'false'

const VALID_TYPES = ['shipment', 'receipt', 'inspection']

export async function POST(req: NextRequest) {
  let body: FulfillmentInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  if (!body.orderId || !body.type) {
    return NextResponse.json({ success: false, message: '缺少必填字段: orderId, type' }, { status: 400 })
  }

  if (!VALID_TYPES.includes(body.type)) {
    return NextResponse.json(
      { success: false, message: `type 必须是: ${VALID_TYPES.join(' | ')}` },
      { status: 400 },
    )
  }

  if (isMock) {
    const mockFulfillment: MockFulfillment = {
      id: `MOCK-FUL-${Date.now()}`,
      orderId: body.orderId,
      type: body.type,
      status: 'pending',
      shipDate: body.shipDate ?? null,
      receiveDate: null,
      carrier: body.carrier ?? null,
      trackingNo: body.trackingNo ?? null,
      warehouseId: null,
      notes: body.notes ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      events: [],
      _mock: true,
    }
    return NextResponse.json(mockFulfillment, { status: 201 })
  }

  // TODO: 替换为 prisma.fulfillment.create(...)
  void MOCK_FULFILLMENTS
  return NextResponse.json({ success: false, message: 'Not implemented' }, { status: 501 })
}
