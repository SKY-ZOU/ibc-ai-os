import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function optionalString(value: unknown) {
  const cleaned = cleanString(value)
  return cleaned || undefined
}

function optionalNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function optionalInt(value: unknown) {
  const parsed = optionalNumber(value)
  return parsed === undefined ? undefined : Math.trunc(parsed)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const enterpriseId = cleanString(body.enterpriseId)
    const title = cleanString(body.title)
    const category = cleanString(body.category)

    if (!enterpriseId) {
      return NextResponse.json({ success: false, error: 'enterpriseId is required' }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ success: false, error: 'title is required' }, { status: 400 })
    }

    if (!category) {
      return NextResponse.json({ success: false, error: 'category is required' }, { status: 400 })
    }

    const enterprise = await prisma.enterprise.findUnique({ where: { id: enterpriseId }, select: { id: true } })

    if (!enterprise) {
      return NextResponse.json({ success: false, error: 'enterprise not found' }, { status: 404 })
    }

    const demand = await prisma.demand.create({
      data: {
        enterpriseId,
        title,
        category,
        description: optionalString(body.description),
        budgetMin: optionalNumber(body.budgetMin),
        budgetMax: optionalNumber(body.budgetMax),
        currency: optionalString(body.currency) || 'USD',
        quantity: optionalInt(body.quantity),
        unit: optionalString(body.unit),
        deliveryLocation: optionalString(body.deliveryLocation),
        paymentPreference: optionalString(body.paymentPreference),
        acceptAlternative: Boolean(body.acceptAlternative),
      },
    })

    return NextResponse.json({ success: true, data: { id: demand.id, name: demand.title } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create demand'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
