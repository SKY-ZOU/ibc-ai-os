// ============================================================
// POST /api/lead — 商机转线索
// ============================================================

export interface LeadInput {
  opportunityId: string
  title: string
  enterpriseId: string
  enterpriseName: string
  category: string
  description?: string
  estimatedValue?: number
  currency?: string
  contactName?: string
  contactEmail?: string
}

export interface LeadOutput {
  success: boolean
  leadId: string       // mock: "MOCK-LEAD-{opportunityId}"
  message: string
  _mock: true
}

// ============================================================
// POST /api/quotation — 商机转报价草稿
// ============================================================

export interface QuotationItem {
  name: string
  quantity: number
  unit: string
  unitPrice: number
  currency: string
}

export interface QuotationInput {
  opportunityId: string
  productId?: string
  demandId?: string
  supplierEnterpriseId: string
  buyerEnterpriseId: string
  items: QuotationItem[]
  validDays?: number   // 报价有效天数，默认 30
  notes?: string
}

export interface QuotationOutput {
  success: boolean
  quotationId: string  // mock: "MOCK-QUOT-{opportunityId}"
  draftUrl?: string    // mock: null
  message: string
  _mock: true
}

// ============================================================
// Order 模块
// ============================================================

export interface OrderItemInput {
  name: string
  hsCode?: string
  quantity: number
  unit: string
  unitPrice: number
  currency?: string
}

export interface OrderInput {
  enterpriseId: string
  enterpriseName: string
  productId?: string
  productName?: string
  quantity?: number
  unit?: string
  unitPrice?: number
  currency?: string
  notes?: string
  items?: OrderItemInput[]
}

export interface MockOrderItem {
  id: string
  orderId: string
  name: string
  hsCode?: string | null
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  currency: string
  createdAt: string
}

export interface MockOrder {
  id: string
  orderNo: string
  enterpriseId: string
  enterpriseName: string
  productId?: string | null
  productName?: string | null
  quantity?: number | null
  unit?: string | null
  unitPrice?: number | null
  totalAmount?: number | null
  currency: string
  status: string
  notes?: string | null
  createdAt: string
  updatedAt: string
  items?: MockOrderItem[]
  _mock: true
}

// ============================================================
// Contract 模块
// ============================================================

export interface ContractInput {
  orderId: string
  templateId?: string
  title: string
  partyA: string
  partyB: string
  amount?: number
  currency?: string
  expiresAt?: string
}

export interface MockContractClause {
  id: string
  contractId: string
  section: string
  content: string
  sortOrder: number
  createdAt: string
}

export interface MockContract {
  id: string
  contractNo: string
  orderId: string
  templateId?: string | null
  title: string
  partyA: string
  partyB: string
  amount?: number | null
  currency: string
  signStatus: string
  signedAt?: string | null
  expiresAt?: string | null
  fileUrl?: string | null
  createdAt: string
  updatedAt: string
  clauses?: MockContractClause[]
  _mock: true
}

// ============================================================
// Document 模块
// ============================================================

export interface DocumentInput {
  orderId: string
  type: 'bill_of_lading' | 'invoice' | 'packing_list' | 'certificate_of_origin' | 'other'
  docNo?: string
  title: string
  issueDate?: string
}

export interface MockDocument {
  id: string
  orderId: string
  type: string
  docNo?: string | null
  title: string
  fileUrl?: string | null
  issueDate?: string | null
  status: string
  createdAt: string
  updatedAt: string
  _mock: true
}

// ============================================================
// Fulfillment 模块
// ============================================================

export interface FulfillmentInput {
  orderId: string
  type: 'shipment' | 'receipt' | 'inspection'
  shipDate?: string
  carrier?: string
  trackingNo?: string
  notes?: string
}

export interface MockFulfillmentEvent {
  id: string
  fulfillmentId: string
  eventType: string
  location?: string | null
  description?: string | null
  occurredAt: string
}

export interface MockFulfillment {
  id: string
  orderId: string
  type: string
  status: string
  shipDate?: string | null
  receiveDate?: string | null
  carrier?: string | null
  trackingNo?: string | null
  warehouseId?: string | null
  notes?: string | null
  createdAt: string
  updatedAt: string
  events?: MockFulfillmentEvent[]
  _mock: true
}

// ============================================================
// SCF (供链金融) 模块
// ============================================================

export interface SCFApplicationInput {
  orderId: string
  enterpriseId: string
  enterpriseName: string
  type: 'factoring' | 'po_finance' | 'warehouse_receipt'
  amount: number
  currency?: string
  purpose?: string
  repaymentDate?: string
}

export interface MockSCFApplication {
  id: string
  appNo: string
  orderId: string
  enterpriseId: string
  enterpriseName: string
  type: string
  amount: number
  currency: string
  purpose?: string | null
  repaymentDate?: string | null
  status: string
  approvedAt?: string | null
  rejectedReason?: string | null
  repaidAt?: string | null
  createdAt: string
  updatedAt: string
  _mock: true
}
