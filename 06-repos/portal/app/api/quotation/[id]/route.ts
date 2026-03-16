import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/quotation/[id] - 获取报价单详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const quotation = await prisma.quotation.findUnique({
      where: { id }
    })

    if (!quotation) {
      return NextResponse.json(
        { success: false, error: '报价单不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...quotation,
        items: JSON.parse(quotation.items || '[]')
      }
    })
  } catch (error) {
    console.error('Get quotation error:', error)
    return NextResponse.json(
      { success: false, error: '获取报价单详情失败' },
      { status: 500 }
    )
  }
}

// PUT /api/quotation/[id] - 更新报价单
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const quotation = await prisma.quotation.update({
      where: { id },
      data: {
        items: body.items ? JSON.stringify(body.items) : undefined,
        currency: body.currency,
        totalAmount: body.totalAmount,
        validUntil: body.validUntil ? new Date(body.validUntil) : undefined,
        paymentTerms: body.paymentTerms,
        logisticsTerms: body.logisticsTerms,
        status: body.status,
        notes: body.notes
      }
    })

    return NextResponse.json({ success: true, data: quotation })
  } catch (error) {
    console.error('Update quotation error:', error)
    return NextResponse.json(
      { success: false, error: '更新报价单失败' },
      { status: 500 }
    )
  }
}
