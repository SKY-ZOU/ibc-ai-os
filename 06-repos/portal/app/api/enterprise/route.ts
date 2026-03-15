import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function optionalString(value: unknown) {
  const cleaned = cleanString(value)
  return cleaned || undefined
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = cleanString(body.name)
    const country = cleanString(body.country)

    if (!name) {
      return NextResponse.json({ success: false, error: 'name is required' }, { status: 400 })
    }

    if (!country) {
      return NextResponse.json({ success: false, error: 'country is required' }, { status: 400 })
    }

    const enterprise = await prisma.enterprise.create({
      data: {
        name,
        nameEn: optionalString(body.nameEn),
        industry: optionalString(body.industry),
        country,
        city: optionalString(body.city),
        email: optionalString(body.email),
        phone: optionalString(body.phone),
        contactName: optionalString(body.contactName),
        description: optionalString(body.description),
        website: optionalString(body.website),
        paymentPreference: optionalString(body.paymentPreference),
        tradeDirection: optionalString(body.tradeDirection),
      },
    })

    return NextResponse.json({ success: true, data: { id: enterprise.id, name: enterprise.name } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create enterprise'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
