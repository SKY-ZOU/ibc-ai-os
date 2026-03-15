import { NextRequest, NextResponse } from 'next/server'
import { getMockContract } from '@/mocks/contracts'

const isMock = process.env.MOCK_MODE !== 'false'

const VALID_STATUSES = ['draft', 'pending', 'signed', 'expired']

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let body: { signStatus: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  if (!body.signStatus || !VALID_STATUSES.includes(body.signStatus)) {
    return NextResponse.json(
      { success: false, message: `signStatus 必须是: ${VALID_STATUSES.join(' | ')}` },
      { status: 400 },
    )
  }

  if (isMock) {
    const contract = getMockContract(id)
    if (!contract) return NextResponse.json({ message: '合同不存在' }, { status: 404 })
    const updated = {
      ...contract,
      signStatus: body.signStatus,
      signedAt: body.signStatus === 'signed' ? new Date().toISOString() : contract.signedAt,
      updatedAt: new Date().toISOString(),
      _mock: true as const,
    }
    return NextResponse.json(updated)
  }

  // TODO: 替换为 prisma.contract.update(...)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
