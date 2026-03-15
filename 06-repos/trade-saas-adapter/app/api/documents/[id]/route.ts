import { NextRequest, NextResponse } from 'next/server'
import { getMockDocument } from '@/mocks/documents'

const isMock = process.env.MOCK_MODE !== 'false'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (isMock) {
    const doc = getMockDocument(id)
    if (!doc) return NextResponse.json({ message: '单证不存在' }, { status: 404 })
    return NextResponse.json(doc)
  }

  // TODO: 替换为 prisma.document.findUnique(...)
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
