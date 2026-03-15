// Mock data for Order module
import type { MockOrder } from '@/types'

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: 'MOCK-ORD-001',
    orderNo: 'ORD-2026-001',
    enterpriseId: 'ENT-001',
    enterpriseName: '示例贸易有限公司',
    productId: 'PRD-001',
    productName: 'Q235 热轧卷板',
    quantity: 100,
    unit: '吨',
    unitPrice: 4500,
    totalAmount: 450000,
    currency: 'CNY',
    status: 'confirmed',
    notes: '含运费至目的港',
    createdAt: new Date('2026-03-01T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-01T10:00:00Z').toISOString(),
    items: [
      {
        id: 'MOCK-OI-001',
        orderId: 'MOCK-ORD-001',
        name: 'Q235 热轧卷板',
        hsCode: '7208.51',
        quantity: 100,
        unit: '吨',
        unitPrice: 4500,
        totalPrice: 450000,
        currency: 'CNY',
        createdAt: new Date('2026-03-01T08:00:00Z').toISOString(),
      },
    ],
    _mock: true,
  },
]

export function getMockOrder(id: string): MockOrder | null {
  return MOCK_ORDERS.find((o) => o.id === id) ?? null
}
