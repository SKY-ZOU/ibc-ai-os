// Mock data for Fulfillment module
import type { MockFulfillment } from '@/types'

export const MOCK_FULFILLMENTS: MockFulfillment[] = [
  {
    id: 'MOCK-FUL-001',
    orderId: 'MOCK-ORD-001',
    type: 'shipment',
    status: 'in_transit',
    shipDate: new Date('2026-03-10T06:00:00Z').toISOString(),
    receiveDate: null,
    carrier: 'COSCO Shipping',
    trackingNo: 'COSCO2026031001',
    warehouseId: null,
    notes: '预计到港日期 2026-03-25',
    createdAt: new Date('2026-03-10T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-10T08:00:00Z').toISOString(),
    events: [
      {
        id: 'MOCK-FE-001',
        fulfillmentId: 'MOCK-FUL-001',
        eventType: 'departed',
        location: '上海港',
        description: '货物已从上海港发出',
        occurredAt: new Date('2026-03-10T06:00:00Z').toISOString(),
      },
    ],
    _mock: true,
  },
]

export function getMockFulfillment(id: string): MockFulfillment | null {
  return MOCK_FULFILLMENTS.find((f) => f.id === id) ?? null
}
