import { NextRequest, NextResponse } from 'next/server'
import type { SCFApplicationInput, MockSCFApplication } from '@/types'
import { MOCK_SCF_APPLICATIONS } from '@/mocks/scf'

const isMock = process.env.MOCK_MODE !== 'false'

const VALID_TYPES = ['factoring', 'po_finance', 'warehouse_receipt']

export async function POST(req: NextRequest) {
  let body: SCFApplicationInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  const required: (keyof SCFApplicationInput)[] = ['orderId', 'enterpriseId', 'enterpriseName', 'type', 'amount']
  for (const field of required) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return NextResponse.json({ success: false, message: `缺少必填字段: ${field}` }, { status: 400 })
    }
  }

  if (!VALID_TYPES.includes(body.type)) {
    return NextResponse.json(
      { success: false, message: `type 必须是: ${VALID_TYPES.join(' | ')}` },
      { status: 400 },
    )
  }

  if (isMock) {
    const mockApp: MockSCFApplication = {
      id: `MOCK-SCF-${Date.now()}`,
      appNo: `SCF-${new Date().getFullYear()}-${String(MOCK_SCF_APPLICATIONS.length + 1).padStart(3, '0')}`,
      orderId: body.orderId,
      enterpriseId: body.enterpriseId,
      enterpriseName: body.enterpriseName,
      type: body.type,
      amount: body.amount,
      currency: body.currency ?? 'USD',
      purpose: body.purpose ?? null,
      repaymentDate: body.repaymentDate ?? null,
      status: 'submitted',
      approvedAt: null,
      rejectedReason: null,
      repaidAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _mock: true,
    }
    return NextResponse.json(mockApp, { status: 201 })
  }

  // TODO: 替换为 prisma.sCFApplication.create(...)
  return NextResponse.json({ success: false, message: 'Not implemented' }, { status: 501 })
}
