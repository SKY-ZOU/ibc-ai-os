import { NextRequest, NextResponse } from 'next/server'
import { runMatching } from '@/lib/matching-engine'

/**
 * POST /api/match/run
 * Body: { productId?, demandId?, force?, useAI? }
 *
 * - 无参数: 全量扫描所有 approved 企业的 product × demand
 * - productId: 只匹配该 product 对所有 demand
 * - demandId: 只匹配该 demand 对所有 product
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    const result = await runMatching({
      productId: typeof body.productId === 'string' ? body.productId : undefined,
      demandId:  typeof body.demandId  === 'string' ? body.demandId  : undefined,
      force:     body.force === true,
      useAI:     body.useAI !== false,
    })

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Matching failed'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
