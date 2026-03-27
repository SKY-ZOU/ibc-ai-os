/**
 * IBC Trade OS — Gemini API 匹配理由生成
 * 失败时 graceful degrade 到规则文案
 */

import { ruleBasedReason, type MatchProduct, type MatchDemand, type MatchResult } from './matcher'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

interface ReasonInput {
  product: MatchProduct & { name?: string }
  demand: MatchDemand & { title?: string }
  result: MatchResult
}

export async function generateMatchReason(input: ReasonInput): Promise<string> {
  if (!GEMINI_API_KEY) {
    return ruleBasedReason(input.product, input.demand, input.result)
  }

  try {
    const prompt = `你是一个跨境易货贸易撮合分析师。用1-2句简洁中文，说明以下供需匹配为什么合适，重点突出最强匹配点，不要重复得分数字，不超过50字。

供给：${input.product.name ?? input.product.category}（${input.product.enterprise?.country ?? input.product.origin ?? '未知'}，${input.product.category}）
需求：${input.demand.title ?? input.demand.category}（${input.demand.enterprise?.country ?? input.demand.deliveryLocation ?? '未知'}，${input.demand.category}）
得分：${input.result.score}/100`

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 120, temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) throw new Error(`Gemini API ${res.status}`)
    const data = await res.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    if (text) return text
    throw new Error('empty response')
  } catch {
    return ruleBasedReason(input.product, input.demand, input.result)
  }
}
