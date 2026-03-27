/**
 * IBC Trade OS — 匹配引擎主入口
 * 遍历 Product × Demand，评分 ≥60 则创建 Opportunity + OpportunityMatch
 */

import { prisma } from './prisma'
import { scoreMatch, type MatchProduct, type MatchDemand } from './matcher'
import { generateMatchReason } from './ai-reason'

const MIN_SCORE = 60

function probabilityFromScore(score: number): number {
  if (score >= 90) return 70
  if (score >= 80) return 55
  if (score >= 70) return 40
  return 25
}

export interface RunMatchingOptions {
  /** 只匹配指定 product */
  productId?: string
  /** 只匹配指定 demand */
  demandId?: string
  /** 强制重新匹配（跳过已存在的 pair） */
  force?: boolean
  /** 是否使用 AI 生成 matchReason（默认 true，key 不存在时自动 degrade） */
  useAI?: boolean
}

export interface RunMatchingResult {
  scanned: number
  created: number
  skipped: number
  errors: number
}

export async function runMatching(opts: RunMatchingOptions = {}): Promise<RunMatchingResult> {
  const { productId, demandId, force = false, useAI = true } = opts

  // ── 拉取候选数据 ──────────────────────────────────────────────
  const products = await prisma.product.findMany({
    where: {
      status: 'active',
      ...(productId ? { id: productId } : {}),
      enterprise: { status: 'approved' },
    },
    include: { enterprise: { select: { id: true, country: true, paymentPreference: true } } },
  })

  const demands = await prisma.demand.findMany({
    where: {
      status: 'open',
      ...(demandId ? { id: demandId } : {}),
      enterprise: { status: 'approved' },
    },
    include: { enterprise: { select: { id: true, country: true } } },
  })

  if (products.length === 0 || demands.length === 0) {
    return { scanned: 0, created: 0, skipped: 0, errors: 0 }
  }

  // ── 已存在的匹配对（去重用） ────────────────────────────────────
  const existingMatches = force ? new Set<string>() : await (async () => {
    const rows = await prisma.opportunityMatch.findMany({
      where: {
        ...(productId ? { productId } : {}),
        ...(demandId ? { demandId } : {}),
      },
      select: { productId: true, demandId: true },
    })
    return new Set(rows.map(r => `${r.productId}:${r.demandId}`))
  })()

  let scanned = 0, created = 0, skipped = 0, errors = 0

  for (const product of products as MatchProduct[]) {
    for (const demand of demands as MatchDemand[]) {
      // 同一企业的供给和需求不互撮合
      if (product.enterpriseId === demand.enterpriseId) continue

      scanned++
      const pairKey = `${product.id}:${demand.id}`
      if (existingMatches.has(pairKey)) { skipped++; continue }

      const result = scoreMatch(product, demand)
      if (result.score < MIN_SCORE) continue

      try {
        // 生成匹配理由
        const matchReason = useAI
          ? await generateMatchReason({ product, demand, result })
          : `综合匹配度 ${result.score} 分。`

        // 创建 Opportunity（以供给方企业为主体）
        const opp = await prisma.opportunity.create({
          data: {
            enterpriseId: product.enterpriseId,
            title: `供需匹配 #${result.score}`,
            description: matchReason,
            stage: 'new',
            value: product.priceMax ?? product.priceMin ?? demand.budgetMax ?? demand.budgetMin,
            currency: product.currency ?? demand.currency ?? 'USD',
            probability: probabilityFromScore(result.score),
          },
        })

        // 创建 OpportunityMatch
        await prisma.opportunityMatch.create({
          data: {
            opportunityId: opp.id,
            productId: product.id,
            demandId: demand.id,
            matchScore: result.score,
            matchReason,
            status: 'pending',
          },
        })

        // 通知供给方
        await prisma.notification.create({
          data: {
            type: 'opportunity_matched',
            title: '发现新匹配商机',
            content: matchReason,
            entityType: 'Opportunity',
            entityId: opp.id,
          },
        })

        created++
        existingMatches.add(pairKey)
      } catch {
        errors++
      }
    }
  }

  return { scanned, created, skipped, errors }
}
