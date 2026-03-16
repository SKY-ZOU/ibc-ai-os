import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

const VALID_STAGES = ['new', 'intent', 'negotiation', 'contract', 'closed']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  let body: { stage?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { stage } = body
  if (!stage || !VALID_STAGES.includes(stage)) {
    return NextResponse.json(
      { error: `stage must be one of: ${VALID_STAGES.join(', ')}` },
      { status: 400 }
    )
  }

  const existing = await prisma.opportunity.findUnique({ where: { id } })
  if (!existing) {
    return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 })
  }

  const updated = await prisma.opportunity.update({
    where: { id },
    data: { stage },
    include: { enterprise: true },
  })

  return NextResponse.json({ success: true, data: updated })
}
