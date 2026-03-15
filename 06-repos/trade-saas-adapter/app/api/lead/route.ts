import { NextRequest, NextResponse } from 'next/server'
import type { LeadInput } from '@/types'
import { createLead } from '@/lib/adapters/ibcV1Adapter'

export async function POST(req: NextRequest) {
  let body: LeadInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: '请求体格式错误' }, { status: 400 })
  }

  const required: (keyof LeadInput)[] = ['opportunityId', 'title', 'enterpriseId', 'enterpriseName', 'category']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ success: false, message: `缺少必填字段: ${field}` }, { status: 400 })
    }
  }

  const result = await createLead(body)
  return NextResponse.json(result, { status: 201 })
}
