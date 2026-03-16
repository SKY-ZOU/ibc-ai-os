import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/notification - 发送通知
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { userId, type, title, content, entityType, entityId } = body

    if (!type || !title || !content) {
      return NextResponse.json(
        { success: false, error: '类型、标题、内容为必填项' },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        content,
        entityType,
        entityId,
        isRead: false
      }
    })

    return NextResponse.json({ success: true, data: notification }, { status: 201 })
  } catch (error) {
    console.error('Create notification error:', error)
    return NextResponse.json(
      { success: false, error: '发送通知失败' },
      { status: 500 }
    )
  }
}

// GET /api/notification - 获取通知列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    const isRead = searchParams.get('isRead')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (userId) where.userId = userId
    if (type) where.type = type
    if (isRead !== null) where.isRead = isRead === 'true'

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { isRead: false } })
    ])

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    })
  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      { success: false, error: '获取通知列表失败' },
      { status: 500 }
    )
  }
}
