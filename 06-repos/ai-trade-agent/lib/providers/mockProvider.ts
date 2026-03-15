import type {
  AIProvider,
  ProfileInput, ProfileOutput,
  MatchInput, MatchOutput,
  MatchScoreInput, MatchScoreOutput,
  PricingValidateInput, PricingValidateOutput,
  PricingSuggestInput, PricingSuggestOutput,
  NegotiationReplyInput, NegotiationReplyOutput,
  BargainInput, BargainOutput,
  DealEvaluateInput, DealEvaluateOutput,
  DealPushInput, DealPushOutput,
} from "@/types";

// ─── Mock data pools ──────────────────────────────────────────────────────────

const TAG_POOL = [
  "制造业", "金属材料", "出口商", "贸易商", "化工原料", "农产品",
  "电子元器件", "纺织品", "机械设备", "进口商", "品牌商", "分销商",
];

const ENTERPRISE_TYPES = ["manufacturer", "trader", "buyer", "distributor"];
const TRADE_DIRECTIONS = ["export", "import", "both"];
const RISK_LEVELS = ["low", "medium", "high"];
const TONES = ["firm", "flexible", "concessive"] as const;
const URGENCY = ["low", "medium", "high"] as const;

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// ─── Mock Provider ────────────────────────────────────────────────────────────

export const mockProvider: AIProvider = {
  async extractProfile(input: ProfileInput): Promise<ProfileOutput> {
    const baseTags: string[] = [];
    if (input.industry) baseTags.push(input.industry);
    if (input.products?.[0]) baseTags.push(input.products[0]);
    if (input.demands?.[0]) baseTags.push(input.demands[0]);
    const extra = pickRandomN(TAG_POOL, Math.max(0, 3 - baseTags.length));
    const tags = [...new Set([...baseTags, ...extra])].slice(0, 4);

    return {
      success: true,
      profile: {
        tags,
        enterpriseType: pickRandom(ENTERPRISE_TYPES),
        tradeDirection: pickRandom(TRADE_DIRECTIONS),
        riskLevel: pickRandom(RISK_LEVELS),
        creditScore: Math.round(Math.random() * 40 + 60),
      },
      _mock: true,
    };
  },

  async matchEnterprises(input: MatchInput): Promise<MatchOutput> {
    const matches = input.targetIds.map((enterpriseId) => {
      const score = Math.round(Math.random() * 100) / 100;
      return {
        enterpriseId,
        score,
        reason: `[MOCK] 品类相符（${input.category}），地区互补`,
        recommended: score > 0.7,
      };
    });
    matches.sort((a, b) => b.score - a.score);
    return { success: true, matches, _mock: true };
  },

  async scoreMatch(input: MatchScoreInput): Promise<MatchScoreOutput> {
    const dims = input.dimensions ?? ["category", "geography", "creditworthiness", "capacity"];
    const breakdown: Record<string, number> = {};
    let total = 0;
    for (const dim of dims) {
      const s = Math.round(Math.random() * 100) / 100;
      breakdown[dim] = s;
      total += s;
    }
    return {
      success: true,
      score: Math.round((total / dims.length) * 100) / 100,
      breakdown,
      _mock: true,
    };
  },

  async validatePrice(input: PricingValidateInput): Promise<PricingValidateOutput> {
    const currency = input.currency ?? "CNY";
    const base = input.declaredValue ?? 1000;
    const marketMin = Math.round(base * 0.7);
    const marketMax = Math.round(base * 1.4);
    const valid = !input.declaredValue || (base >= marketMin && base <= marketMax);
    return {
      success: true,
      valid,
      marketMin,
      marketMax,
      currency,
      warning: valid ? undefined : `[MOCK] 申报价偏离市场区间 ${marketMin}~${marketMax} ${currency}`,
      _mock: true,
    };
  },

  async suggestPrice(input: PricingSuggestInput): Promise<PricingSuggestOutput> {
    const currency = input.targetCurrency ?? "CNY";
    const base = Math.round(Math.random() * 5000 + 500);
    return {
      success: true,
      suggestedMin: base,
      suggestedMax: Math.round(base * 1.3),
      currency,
      cnyEquivalent: currency === "CNY" ? base : Math.round(base * 7.2),
      basis: `[MOCK] 基于近30日 ${input.category} 成交均价`,
      _mock: true,
    };
  },

  async generateReply(input: NegotiationReplyInput): Promise<NegotiationReplyOutput> {
    const replies = [
      "感谢您的关注，我们对贵方的报价已充分考虑，建议双方在合理区间内进一步协商。",
      "您好，我方目前的报价已是最优水平，期待与贵方达成合作。",
      "感谢沟通，我们愿意在付款条件上做出适当调整，希望促成本次合作。",
    ];
    return {
      success: true,
      reply: `[MOCK] ${replies[Math.floor(Math.random() * replies.length)]}`,
      tone: pickRandom(TONES),
      _mock: true,
    };
  },

  async suggestBargain(input: BargainInput): Promise<BargainOutput> {
    const floor = Math.round(input.offerPrice * 0.85);
    const ceiling = Math.round(input.offerPrice * 1.15);
    return {
      success: true,
      minAcceptable: input.targetRole === "seller" ? floor : input.offerPrice,
      maxOffer: input.targetRole === "buyer" ? ceiling : input.offerPrice,
      currency: input.currency,
      strategy: "[MOCK] 锚定策略：先报高价，逐步让步，保留余地",
      scripts: [
        "[MOCK] 我方成本压力较大，目前报价已接近底线",
        "[MOCK] 若贵方能一次性付款，我们可以进一步优化价格",
        "[MOCK] 长期合作伙伴通常能获得更优惠的条件",
      ],
      _mock: true,
    };
  },

  async evaluateDeal(input: DealEvaluateInput): Promise<DealEvaluateOutput> {
    const dayFactor = input.daysSinceLastContact
      ? Math.max(0, 1 - input.daysSinceLastContact / 30)
      : 0.8;
    const probability = Math.round(dayFactor * 85);
    return {
      success: true,
      probability,
      recommendation: `[MOCK] 建议在48小时内跟进，当前成交概率 ${probability}%`,
      riskFactors: [
        "[MOCK] 付款条件尚未确认",
        "[MOCK] 竞争对手报价压力",
      ],
      _mock: true,
    };
  },

  async pushDeal(input: DealPushInput): Promise<DealPushOutput> {
    const stageMap: Record<string, string> = {
      new: "negotiating",
      negotiating: "proposal_sent",
      proposal_sent: "closing",
      closing: "closed_won",
    };
    const urgencyMap: Record<string, typeof URGENCY[number]> = {
      new: "low",
      negotiating: "medium",
      proposal_sent: "high",
      closing: "high",
    };
    return {
      success: true,
      nextStage: stageMap[input.stage],
      reminderMessage: `[MOCK] 商机 ${input.opportunityId} 当前阶段：${input.stage}，建议推进至 ${stageMap[input.stage] ?? "成交"}`,
      urgency: urgencyMap[input.stage] ?? "medium",
      _mock: true,
    };
  },
};
