// Mock data for SupplyChainFinance module
import type { MockSCFApplication } from '@/types'

export const MOCK_SCF_APPLICATIONS: MockSCFApplication[] = [
  {
    id: 'MOCK-SCF-001',
    appNo: 'SCF-2026-001',
    orderId: 'MOCK-ORD-001',
    enterpriseId: 'ENT-001',
    enterpriseName: '示例贸易有限公司',
    type: 'factoring',
    amount: 360000,
    currency: 'CNY',
    purpose: '应收账款融资，加速资金回笼',
    repaymentDate: new Date('2026-06-01T00:00:00Z').toISOString(),
    status: 'under_review',
    approvedAt: null,
    rejectedReason: null,
    repaidAt: null,
    createdAt: new Date('2026-03-11T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-11T08:00:00Z').toISOString(),
    _mock: true,
  },
]

export function getMockSCFApplication(id: string): MockSCFApplication | null {
  return MOCK_SCF_APPLICATIONS.find((a) => a.id === id) ?? null
}
