import { NextRequest, NextResponse } from 'next/server'
import { getMockContract } from '@/mocks/contracts'

const isMock = process.env.MOCK_MODE !== 'false'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (isMock) {
    const contract = getMockContract(id)
    if (!contract) return NextResponse.json({ message: '合同不存在' }, { status: 404 })
    return NextResponse.json(contract)
  }

  // TODO: 替换为 prisma.contract.findUnique(...)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
