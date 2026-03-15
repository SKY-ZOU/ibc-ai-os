import type { MockOpportunity } from './mock-opportunities'

export interface MatchResult {
  supply: MockOpportunity
  score: number          // 0-100 composite
  reasons: MatchReason[]
}

export interface MatchReason {
  key: string
  label: string
  labelEn: string
  weight: number         // contribution 0-100
  type: 'strong' | 'medium' | 'weak'
}

/** Compute AI match score between a demand and a supply opportunity */
export function computeMatch(demand: MockOpportunity, supply: MockOpportunity): MatchResult {
  const reasons: MatchReason[] = []
  let score = 0

  // 1. Category match — highest signal
  if (demand.category === supply.category) {
    reasons.push({ key: 'category', label: `同品类：${demand.category}`, labelEn: `Same category: ${demand.category}`, weight: 35, type: 'strong' })
    score += 35
  }

  // 2. Shared settlement methods
  const sharedSettlement = demand.settlement.filter((s) => supply.settlement.includes(s))
  if (sharedSettlement.length >= 2) {
    reasons.push({ key: 'settlement', label: `结算方式兼容（${sharedSettlement.join('/')}）`, labelEn: `Settlement compatible (${sharedSettlement.join('/')})`, weight: 20, type: 'strong' })
    score += 20
  } else if (sharedSettlement.length === 1) {
    reasons.push({ key: 'settlement', label: `结算方式部分兼容（${sharedSettlement[0]}）`, labelEn: `Partial settlement match (${sharedSettlement[0]})`, weight: 10, type: 'medium' })
    score += 10
  }

  // 3. Supply AI score contribution
  const supplyBonus = Math.round(supply.aiScore * 0.25)
  reasons.push({ key: 'ai_quality', label: `供给方 AI 评分 ${supply.aiScore}`, labelEn: `Supplier AI score ${supply.aiScore}`, weight: supplyBonus, type: supply.aiScore >= 90 ? 'strong' : supply.aiScore >= 80 ? 'medium' : 'weak' })
  score += supplyBonus

  // 4. Tags overlap
  const sharedTags = demand.tags.filter((t) => supply.tags.some((st) => st.includes(t) || t.includes(st)))
  if (sharedTags.length > 0) {
    reasons.push({ key: 'tags', label: `标签重叠：${sharedTags.slice(0, 2).join('、')}`, labelEn: `Tag overlap: ${sharedTags.slice(0, 2).join(', ')}`, weight: 10, type: 'medium' })
    score += 10
  }

  // 5. Stage compatibility
  if (supply.stage === 'new' || supply.stage === 'intent') {
    reasons.push({ key: 'stage', label: '供给方处于活跃阶段', labelEn: 'Supplier is active stage', weight: 5, type: 'weak' })
    score += 5
  }

  return { supply, score: Math.min(100, score), reasons }
}

/** Find top N matching supplies for a demand, sorted by score */
export function findMatches(demand: MockOpportunity, allOpps: MockOpportunity[], topN = 4): MatchResult[] {
  const supplies = allOpps.filter((o) => o.type === 'supply')
  return supplies
    .map((s) => computeMatch(demand, s))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
}
