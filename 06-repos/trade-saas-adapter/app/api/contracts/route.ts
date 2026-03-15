import { NextRequest, NextResponse } from 'next/server'
import type { ContractInput, MockContract } from '@/types'
import { MOCK_CONTRACTS } from '@/mocks/contracts'

const isMock = process.env.MOCK_MODE !== 'false'

export async function POST(req: NextRequest) {
  let body: ContractInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  const required: (keyof ContractInput)[] = ['orderId', 'title', 'partyA', 'partyB']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ success: false, message: `缺少必填字段: ${field}` }, { status: 400 })
    }
  }

  if (isMock) {
    const mockContract: MockContract = {
      id: `MOCK-CTR-${Date.now()}`,
      contractNo: `CTR-${new Date().getFullYear()}-${String(MOCK_CONTRACTS.length + 1).padStart(3, '0')}`,
      orderId: body.orderId,
      templateId: body.templateId ?? null,
      title: body.title,
      partyA: body.partyA,
      partyB: body.partyB,
      amount: body.amount ?? null,
      currency: body.currency ?? 'USD',
      signStatus: 'draft',
      signedAt: null,
      expiresAt: body.expiresAt ?? null,
      fileUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      clauses: [],
      _mock: true,
    }
    return NextResponse.json(mockContract, { status: 201 })
  }

  // TODO: 替换为 prisma.contract.create(...)
  return NextResponse.json({ success: false, message: 'Not implemented' }, { status: 501 })
}
