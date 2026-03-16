import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/enterprise/[enterpriseId] - 获取企业详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ enterpriseId: string }> }
) {
  try {
    const { enterpriseId } = await params
    
    const enterprise = await prisma.enterprise.findUnique({
      where: { id: enterpriseId }
    })

    if (!enterprise) {
      return NextResponse.json(
        { error: '企业不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(enterprise)
  } catch (error) {
    console.error('Get enterprise error:', error)
    return NextResponse.json(
      { error: '获取企业详情失败' },
      { status: 500 }
    )
  }
}

// PUT /api/enterprise/[enterpriseId] - 更新企业信息
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ enterpriseId: string }> }
) {
  try {
    const { enterpriseId } = await params
    const body = await request.json()

    const enterprise = await prisma.enterprise.update({
      where: { id: enterpriseId },
      data: {
        name: body.name,
        code: body.code,
        country: body.country,
        industry: body.industry,
        contactName: body.contactName,
        contactPhone: body.contactPhone,
        contactEmail: body.contactEmail,
        scale: body.scale,
        businessLicense: body.businessLicense,
        tradeMode: body.tradeMode,
        status: body.status
      }
    })

    return NextResponse.json(enterprise)
  } catch (error) {
    console.error('Update enterprise error:', error)
    return NextResponse.json(
      { error: '更新企业信息失败' },
      { status: 500 }
    )
  }
}

// PATCH /api/enterprise/[enterpriseId]/status - 更新企业状态
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ enterpriseId: string }> }
) {
  try {
    const { enterpriseId } = await params
    const { status } = await request.json()

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: '无效的状态值' },
        { status: 400 }
      )
    }

    const enterprise = await prisma.enterprise.update({
      where: { id: enterpriseId },
      data: { status }
    })

    return NextResponse.json(enterprise)
  } catch (error) {
    console.error('Update enterprise status error:', error)
    return NextResponse.json(
      { error: '更新企业状态失败' },
      { status: 500 }
    )
  }
}
