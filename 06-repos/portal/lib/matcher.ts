/**
 * IBC Trade OS — 供需匹配评分引擎
 * 纯规则计算，不依赖外部服务，Claude API 仅用于生成 matchReason
 */

// ── 类目分组（相邻类目有部分匹配分） ──────────────────────────────
const CATEGORY_GROUPS: Record<string, string[]> = {
  energy:     ['能源 / Energy', '化工品 / Chemicals'],
  metals:     ['矿产资源 / Minerals', '钢铁金属 / Steel & Metals'],
  agri:       ['农产品 / Agriculture', '消费品 / Consumer Goods', '医疗健康 / Healthcare'],
  industrial: ['机械设备 / Machinery', '电子产品 / Electronics', '建材 / Building Materials', '纺织品 / Textiles'],
}

function categoryGroup(cat: string): string | null {
  for (const [group, cats] of Object.entries(CATEGORY_GROUPS)) {
    if (cats.includes(cat)) return group
  }
  return null
}

// ── 地区分组（易货贸易热点路线加分） ──────────────────────────────
const REGION_GROUPS: Record<string, string[]> = {
  eastAsia:    ['中国', '日本', '韩国', '台湾'],
  seAsia:      ['新加坡', '越南', '泰国', '印度尼西亚', '马来西亚', '菲律宾', '缅甸'],
  southAsia:   ['印度', '巴基斯坦', '孟加拉国', '斯里兰卡'],
  middleEast:  ['迪拜/UAE', '沙特阿拉伯', '伊朗', '伊拉克', '卡塔尔', '科威特', '阿曼', '巴林'],
  africa:      ['南非', '尼日利亚', '肯尼亚', '埃塞俄比亚', '坦桑尼亚', '加纳', '埃及'],
  latAm:       ['巴西', '智利', '阿根廷', '墨西哥', '哥伦比亚', '秘鲁'],
  europe:      ['英国', '德国', '法国', '俄罗斯', '荷兰', '意大利', '西班牙'],
  oceania:     ['澳大利亚', '新西兰'],
  northAm:     ['美国', '加拿大'],
}

function regionGroup(country: string): string | null {
  for (const [group, countries] of Object.entries(REGION_GROUPS)) {
    if (countries.includes(country)) return group
  }
  return null
}

// 中国为核心枢纽，与以下地区互通热点路线
const CHINA_HOT_ROUTES = new Set(['seAsia', 'southAsia', 'middleEast', 'africa', 'latAm'])

// ── 支付方式兼容表 ──────────────────────────────────────────────
const PAYMENT_COMPAT: Record<string, Set<string>> = {
  rmb:        new Set(['rmb', 'mixed']),
  stablecoin: new Set(['stablecoin', 'mixed']),
  usd:        new Set(['usd', 'mixed']),
  mixed:      new Set(['rmb', 'stablecoin', 'usd', 'mixed']),
}

function paymentScore(p1?: string | null, p2?: string | null): number {
  if (!p1 || !p2) return 5 // 未填写，给中性分
  if (p1 === p2) return 10
  if (PAYMENT_COMPAT[p1]?.has(p2)) return 7
  return 0
}

// ── 价格区间重叠评分 ────────────────────────────────────────────
function priceScore(
  pMin?: number | null, pMax?: number | null,
  dMin?: number | null, dMax?: number | null,
): number {
  // 任一方未填写价格 → 给部分分（无法判断冲突）
  if (!pMin && !pMax && !dMin && !dMax) return 12
  if (!pMin && !pMax) return 10
  if (!dMin && !dMax) return 10

  const lo = Math.max(pMin ?? 0, dMin ?? 0)
  const hi = Math.min(pMax ?? Infinity, dMax ?? Infinity)

  if (lo <= hi) {
    // 有重叠：重叠宽度 / 需求宽度
    const overlap = hi - lo
    const demandSpan = (dMax ?? dMin ?? 1) - (dMin ?? 0)
    if (demandSpan <= 0) return 20
    const ratio = Math.min(overlap / demandSpan, 1)
    return Math.round(ratio * 25)
  }

  // 无重叠：检查差距
  const gap = lo - hi
  const ref = Math.max(pMax ?? pMin ?? 1, dMax ?? dMin ?? 1)
  const gapRatio = gap / ref
  if (gapRatio < 0.2) return 8  // 差距 <20%
  if (gapRatio < 0.5) return 4  // 差距 <50%
  return 0
}

// ── 数量契合评分 ────────────────────────────────────────────────
function quantityScore(
  minQty?: number | null, maxQty?: number | null,
  demandQty?: number | null,
): number {
  if (!demandQty) return 7  // 未填写
  if (!minQty && !maxQty) return 8  // 供给未限量，默认可接受
  const lo = minQty ?? 0
  const hi = maxQty ?? Infinity
  if (demandQty >= lo && demandQty <= hi) return 15
  // 在 50% 缓冲内
  if (demandQty >= lo * 0.5 && demandQty <= hi * 1.5) return 8
  return 0
}

// ── 地区加分 ────────────────────────────────────────────────────
function regionScore(originCountry?: string | null, demandCountry?: string | null): number {
  if (!originCountry || !demandCountry) return 5
  if (originCountry === demandCountry) return 8

  const g1 = regionGroup(originCountry)
  const g2 = regionGroup(demandCountry)

  if (g1 && g1 === g2) return 10 // 同区域

  // 中国核心枢纽热点路线
  const isChinaRoute =
    (originCountry === '中国' && g2 && CHINA_HOT_ROUTES.has(g2)) ||
    (demandCountry === '中国' && g1 && CHINA_HOT_ROUTES.has(g1))
  if (isChinaRoute) return 10

  return 4 // 跨区域但不是热点路线
}

// ── 主评分函数 ──────────────────────────────────────────────────

export interface MatchProduct {
  id: string
  category: string
  priceMin?: number | null
  priceMax?: number | null
  currency?: string | null
  minQty?: number | null
  maxQty?: number | null
  origin?: string | null
  paymentPreference?: string | null  // from enterprise
  enterpriseId: string
  enterprise?: { country?: string | null; paymentPreference?: string | null }
}

export interface MatchDemand {
  id: string
  category: string
  budgetMin?: number | null
  budgetMax?: number | null
  currency?: string | null
  quantity?: number | null
  deliveryLocation?: string | null
  paymentPreference?: string | null
  enterpriseId: string
  enterprise?: { country?: string | null }
}

export interface MatchResult {
  productId: string
  demandId: string
  score: number
  breakdown: {
    category: number
    price: number
    quantity: number
    payment: number
    region: number
  }
}

export function scoreMatch(product: MatchProduct, demand: MatchDemand): MatchResult {
  // ① 类目 (0-40)
  let catScore = 0
  if (product.category === demand.category) {
    catScore = 40
  } else {
    const g1 = categoryGroup(product.category)
    const g2 = categoryGroup(demand.category)
    if (g1 && g1 === g2) catScore = 20
  }

  // ② 价格 (0-25)
  const priceS = priceScore(product.priceMin, product.priceMax, demand.budgetMin, demand.budgetMax)

  // ③ 数量 (0-15)
  const qtyS = quantityScore(product.minQty, product.maxQty, demand.quantity)

  // ④ 支付方式 (0-10)
  const pmtS = paymentScore(
    product.enterprise?.paymentPreference ?? product.paymentPreference,
    demand.paymentPreference,
  )

  // ⑤ 地区 (0-10)
  const regS = regionScore(
    product.origin ?? product.enterprise?.country,
    demand.deliveryLocation ?? demand.enterprise?.country,
  )

  const total = catScore + priceS + qtyS + pmtS + regS

  return {
    productId: product.id,
    demandId: demand.id,
    score: Math.min(total, 100),
    breakdown: { category: catScore, price: priceS, quantity: qtyS, payment: pmtS, region: regS },
  }
}

/**
 * 从评分生成简短的规则文案 matchReason（无 AI 兜底用）
 */
export function ruleBasedReason(product: MatchProduct, demand: MatchDemand, result: MatchResult): string {
  const parts: string[] = []
  if (result.breakdown.category === 40) parts.push('品类完全吻合')
  else if (result.breakdown.category === 20) parts.push('品类高度相关')
  if (result.breakdown.price >= 20) parts.push('价格区间高度重叠')
  else if (result.breakdown.price >= 8) parts.push('价格区间存在交集')
  if (result.breakdown.quantity === 15) parts.push('采购量与供给范围匹配')
  if (result.breakdown.payment === 10) parts.push('结算方式一致')
  if (result.breakdown.region === 10) parts.push('贸易路线畅通')

  if (parts.length === 0) parts.push('供需基本面有一定相关性')

  return `综合匹配度 ${result.score} 分：${parts.join('，')}。`
}
