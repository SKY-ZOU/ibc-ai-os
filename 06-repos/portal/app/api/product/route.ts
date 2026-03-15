import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.enterpriseId) {
      return NextResponse.json(
        { success: false, error: 'enterpriseId is required' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        enterpriseId: body.enterpriseId,
        name: body.name,
        nameEn: body.nameEn || null,
        category: body.category,
        hsCode: body.hsCode || null,
        origin: body.origin || null,
        description: body.description || null,
        priceMin: body.priceMin || null,
        priceMax: body.priceMax || null,
        currency: body.currency || 'USD',
        unit: body.unit || null,
        minQty: body.minQty || null,
        maxQty: body.maxQty || null,
        leadTime: body.leadTime || null,
        status: 'active',
      },
    })

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Product create error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
