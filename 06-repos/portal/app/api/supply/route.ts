import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category')
  const q = searchParams.get('q')?.toLowerCase()
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '30'), 100)

  const products = await prisma.product.findMany({
    where: {
      status: 'active',
      ...(category && category !== 'all' ? { category } : {}),
      ...(q ? { OR: [{ name: { contains: q } }, { description: { contains: q } }] } : {}),
    },
    include: { enterprise: { select: { id: true, name: true, country: true } } },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
  return NextResponse.json({ data: products, total: products.length })
}

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
    const name = cleanString(body.name)
    const category = cleanString(body.category)

    if (!enterpriseId) {
      return NextResponse.json({ success: false, error: 'enterpriseId is required' }, { status: 400 })
    }

    if (!name) {
      return NextResponse.json({ success: false, error: 'name is required' }, { status: 400 })
    }

    if (!category) {
      return NextResponse.json({ success: false, error: 'category is required' }, { status: 400 })
    }

    const enterprise = await prisma.enterprise.findUnique({ where: { id: enterpriseId }, select: { id: true } })

    if (!enterprise) {
      return NextResponse.json({ success: false, error: 'enterprise not found' }, { status: 404 })
    }

    const product = await prisma.product.create({
      data: {
        enterpriseId,
        name,
        category,
        description: optionalString(body.description),
        priceMin: optionalNumber(body.priceMin),
        priceMax: optionalNumber(body.priceMax),
        currency: optionalString(body.currency) || 'USD',
        unit: optionalString(body.unit),
        minQty: optionalInt(body.minQty),
        leadTime: optionalInt(body.leadTime),
        hsCode: optionalString(body.hsCode),
        origin: optionalString(body.origin),
      },
    })

    return NextResponse.json({ success: true, data: { id: product.id, name: product.name } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create supply'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
