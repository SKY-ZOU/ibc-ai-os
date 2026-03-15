// Mock data for Contract module
import type { MockContract } from '@/types'

export const MOCK_CONTRACTS: MockContract[] = [
  {
    id: 'MOCK-CTR-001',
    contractNo: 'CTR-2026-001',
    orderId: 'MOCK-ORD-001',
    templateId: 'TPL-EXPORT-001',
    title: '国际货物买卖合同',
    partyA: '示例贸易有限公司',
    partyB: 'Example Import Co., Ltd.',
    amount: 450000,
    currency: 'CNY',
    signStatus: 'pending',
    signedAt: null,
    expiresAt: new Date('2026-12-31T00:00:00Z').toISOString(),
    fileUrl: null,
    createdAt: new Date('2026-03-02T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-02T08:00:00Z').toISOString(),
    clauses: [
      {
        id: 'MOCK-CC-001',
        contractId: 'MOCK-CTR-001',
        section: '第一条 货物描述',
        content: 'Q235热轧卷板，数量100吨，单价4500元/吨。',
        sortOrder: 1,
        createdAt: new Date('2026-03-02T08:00:00Z').toISOString(),
      },
      {
        id: 'MOCK-CC-002',
        contractId: 'MOCK-CTR-001',
        section: '第二条 付款方式',
        content: '信用证（L/C），见票即付。',
        sortOrder: 2,
        createdAt: new Date('2026-03-02T08:00:00Z').toISOString(),
      },
    ],
    _mock: true,
  },
]

export function getMockContract(id: string): MockContract | null {
  return MOCK_CONTRACTS.find((c) => c.id === id) ?? null
}
