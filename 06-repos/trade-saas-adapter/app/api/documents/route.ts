import { NextRequest, NextResponse } from 'next/server'
import type { DocumentInput, MockDocument } from '@/types'
import { MOCK_DOCUMENTS } from '@/mocks/documents'

const isMock = process.env.MOCK_MODE !== 'false'

const VALID_TYPES = ['bill_of_lading', 'invoice', 'packing_list', 'certificate_of_origin', 'other']

export async function POST(req: NextRequest) {
  let body: DocumentInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  if (!body.orderId || !body.type || !body.title) {
    return NextResponse.json({ success: false, message: '缺少必填字段: orderId, type, title' }, { status: 400 })
  }

  if (!VALID_TYPES.includes(body.type)) {
    return NextResponse.json(
      { success: false, message: `type 必须是: ${VALID_TYPES.join(' | ')}` },
      { status: 400 },
    )
  }

  if (isMock) {
    const mockDocument: MockDocument = {
      id: `MOCK-DOC-${Date.now()}`,
      orderId: body.orderId,
      type: body.type,
      docNo: body.docNo ?? null,
      title: body.title,
      fileUrl: null,
      issueDate: body.issueDate ?? null,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _mock: true,
    }
    return NextResponse.json(mockDocument, { status: 201 })
  }

  // TODO: 替换为 prisma.document.create(...)
  void MOCK_DOCUMENTS
  return NextResponse.json({ success: false, message: 'Not implemented' }, { status: 501 })
}
