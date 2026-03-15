import { NextRequest, NextResponse } from 'next/server'
import type { QuotationInput } from '@/types'
import { createQuotation } from '@/lib/adapters/ibcV1Adapter'

export async function POST(req: NextRequest) {
  let body: QuotationInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  const required: (keyof QuotationInput)[] = ['opportunityId', 'supplierEnterpriseId', 'buyerEnterpriseId', 'items']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ success: false, message: `缺少必填字段: ${field}` }, { status: 400 })
    }
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ success: false, message: 'items 不能为空' }, { status: 400 })
  }

  const result = await createQuotation(body)
  return NextResponse.json(result, { status: 201 })
}
