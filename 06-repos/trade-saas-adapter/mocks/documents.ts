// Mock data for Document module
import type { MockDocument } from '@/types'

export const MOCK_DOCUMENTS: MockDocument[] = [
  {
    id: 'MOCK-DOC-001',
    orderId: 'MOCK-ORD-001',
    type: 'bill_of_lading',
    docNo: 'BL-2026-001',
    title: '提单',
    fileUrl: null,
    issueDate: new Date('2026-03-10T00:00:00Z').toISOString(),
    status: 'issued',
    createdAt: new Date('2026-03-10T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-10T08:00:00Z').toISOString(),
    _mock: true,
  },
  {
    id: 'MOCK-DOC-002',
    orderId: 'MOCK-ORD-001',
    type: 'invoice',
    docNo: 'INV-2026-001',
    title: '商业发票',
    fileUrl: null,
    issueDate: new Date('2026-03-10T00:00:00Z').toISOString(),
    status: 'issued',
    createdAt: new Date('2026-03-10T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-10T08:00:00Z').toISOString(),
    _mock: true,
  },
]

export function getMockDocument(id: string): MockDocument | null {
  return MOCK_DOCUMENTS.find((d) => d.id === id) ?? null
}
