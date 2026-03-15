/**
 * ibcV1Adapter — IBC 1.0 交易履约中台适配层
 *
 * 当前状态：MOCK
 * 所有方法返回模拟数据，_mock: true 标记用于未来替换识别。
 *
 * 待 1.0 接口文档就绪后，按以下清单逐步替换：
 *
 * | 本层方法         | 对应 1.0 接口                          | 状态   |
 * |-----------------|---------------------------------------|--------|
 * | createLead()    | POST /ibc-v1/crm/leads                | 待接入 |
 * | createQuotation()| POST /ibc-v1/quotations              | 待接入 |
 * | getQuotation()  | GET  /ibc-v1/quotations/{id}          | 待接入 |
 * | createOrder()   | POST /ibc-v1/orders（报价转订单）       | 待接入 |
 */

import type { LeadInput, LeadOutput, QuotationInput, QuotationOutput } from '@/types'

const BASE_URL = process.env.IBC_V1_BASE_URL
const API_KEY = process.env.IBC_V1_API_KEY

// ---------------------------------------------------------------------------
// 内部工具（连接真实接口后启用）
// ---------------------------------------------------------------------------

// async function ibcPost<T>(path: string, body: unknown): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Api-Key': API_KEY ?? '',
//     },
//     body: JSON.stringify(body),
//   })
//   if (!res.ok) throw new Error(`IBC V1 error: ${res.status} ${await res.text()}`)
//   return res.json() as Promise<T>
// }

// ---------------------------------------------------------------------------
// createLead — 商机 → 线索
// TODO: 替换为 POST /ibc-v1/crm/leads
// ---------------------------------------------------------------------------
export async function createLead(input: LeadInput): Promise<LeadOutput> {
  void BASE_URL
  void API_KEY

  // MOCK 实现
  return {
    success: true,
    leadId: `MOCK-LEAD-${input.opportunityId}`,
    message: '[MOCK] 线索已创建',
    _mock: true,
  }
}

// ---------------------------------------------------------------------------
// createQuotation — 商机 → 报价草稿
// TODO: 替换为 POST /ibc-v1/quotations
// ---------------------------------------------------------------------------
export async function createQuotation(input: QuotationInput): Promise<QuotationOutput> {
  void BASE_URL
  void API_KEY

  // MOCK 实现
  return {
    success: true,
    quotationId: `MOCK-QUOT-${input.opportunityId}`,
    draftUrl: null as unknown as undefined,
    message: '[MOCK] 报价草稿已创建',
    _mock: true,
  }
}
