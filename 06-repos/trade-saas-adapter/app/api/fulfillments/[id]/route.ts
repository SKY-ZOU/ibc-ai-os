import { NextRequest, NextResponse } from 'next/server'
import { getMockFulfillment } from '@/mocks/fulfillments'

const isMock = process.env.MOCK_MODE !== 'false'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (isMock) {
    const fulfillment = getMockFulfillment(id)
    if (!fulfillment) return NextResponse.json({ message: '履约记录不存在' }, { status: 404 })
    return NextResponse.json(fulfillment)
  }

  // TODO: 替换为 prisma.fulfillment.findUnique(...)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
