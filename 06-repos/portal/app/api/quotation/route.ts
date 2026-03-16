import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateQuotationNo() {
  const date = new Date()
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `QT-${y}${m}${d}-${rand}`
}

// POST /api/quotation - 创建报价单
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      opportunityId,
      buyerId,
      sellerId,
      items,
      currency,
      totalAmount,
      validUntil,
      paymentTerms,
      logisticsTerms,
      notes
    } = body

    if (!buyerId || !sellerId) {
      return NextResponse.json(
        { success: false, error: '买方和卖方企业ID为必填项' },
        { status: 400 }
      )
    }

    const quotation = await prisma.quotation.create({
      data: {
        quotationNo: generateQuotationNo(),
        opportunityId,
        buyerId,
        sellerId,
        items: JSON.stringify(items || []),
        currency: currency || 'USD',
        totalAmount,
        validUntil: validUntil ? new Date(validUntil) : null,
        paymentTerms,
        logisticsTerms,
        status: 'draft'
      }
    })

    return NextResponse.json({ success: true, data: quotation }, { status: 201 })
  } catch (error) {
    console.error('Create quotation error:', error)
    return NextResponse.json(
      { success: false, error: '创建报价单失败' },
      { status: 500 }
    )
  }
}

// GET /api/quotation - 获取报价单列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const buyerId = searchParams.get('buyerId')
    const sellerId = searchParams.get('sellerId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (status) where.status = status
    if (buyerId) where.buyerId = buyerId
    if (sellerId) where.sellerId = sellerId

    const [quotations, total] = await Promise.all([
      prisma.quotation.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.quotation.count({ where })
    ])

    // 解析 items JSON
    const data = quotations.map(q => ({
      ...q,
      items: JSON.parse(q.items || '[]')
    }))

    return NextResponse.json({
      success: true,
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    })
  } catch (error) {
    console.error('Get quotations error:', error)
    return NextResponse.json(
      { success: false, error: '获取报价单列表失败' },
      { status: 500 }
    )
  }
}
