import { NextResponse } from 'next/server'
import { MOCK_SCF_APPLICATIONS } from '@/mocks/scf'

const isMock = process.env.MOCK_MODE !== 'false'

export async function GET() {
  if (isMock) {
    return NextResponse.json({
      data: MOCK_SCF_APPLICATIONS,
      total: MOCK_SCF_APPLICATIONS.length,
      _mock: true,
    })
  }

  // TODO: 替换为 prisma.sCFApplication.findMany(...)
  return NextResponse.json({ data: [], total: 0 })
}
