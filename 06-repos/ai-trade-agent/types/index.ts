// ─── Profile API ──────────────────────────────────────────────────────────────

export interface ProfileInput {
  enterpriseId: string;
  name: string;
  description?: string;
  industry?: string;
  country?: string;
  products?: string[];   // 供给品类
  demands?: string[];    // 需求品类
}

export interface EnterpriseProfile {
  tags: string[];
  enterpriseType: string;   // "manufacturer" | "trader" | "buyer" | "distributor"
  tradeDirection: string;   // "export" | "import" | "both"
  riskLevel: string;        // "low" | "medium" | "high"
  creditScore?: number;     // 0 ~ 100
}

export interface ProfileOutput {
  success: boolean;
  profile: EnterpriseProfile;
  _mock?: boolean;
}

// ─── Match API ────────────────────────────────────────────────────────────────

export interface MatchInput {
  sourceId: string;
  targetIds: string[];
  category: string;
  direction: "supply_to_demand" | "demand_to_supply";
}

export interface MatchResult {
  enterpriseId: string;
  score: number;           // 0.0 ~ 1.0
  reason: string;
  recommended: boolean;    // score > 0.7
}

export interface MatchOutput {
  success: boolean;
  matches: MatchResult[];
  _mock?: boolean;
}

export interface MatchScoreInput {
  sourceId: string;
  targetId: string;
  category: string;
  dimensions?: string[];  // custom dimensions to score
}

export interface MatchScoreOutput {
  success: boolean;
  score: number;
  breakdown: Record<string, number>;
  _mock?: boolean;
}

// ─── Pricing API ──────────────────────────────────────────────────────────────

export interface PricingValidateInput {
  enterpriseId: string;
  category: string;
  quantity?: number;
  unit?: string;
  currency?: string;
  declaredValue?: number;  // 申报价
}

export interface PricingValidateOutput {
  success: boolean;
  valid: boolean;
  marketMin?: number;
  marketMax?: number;
  currency: string;
  warning?: string;
  _mock?: boolean;
}

export interface PricingSuggestInput {
  enterpriseId: string;
  category: string;
  quantity?: number;
  unit?: string;
  targetCurrency?: string;  // 默认 CNY
}

export interface PricingSuggestOutput {
  success: boolean;
  suggestedMin: number;
  suggestedMax: number;
  currency: string;
  cnyEquivalent?: number;
  basis?: string;
  _mock?: boolean;
}

// ─── Negotiation API ──────────────────────────────────────────────────────────

export interface NegotiationReplyInput {
  enterpriseId: string;
  context: string;       // 对话上下文
  latestMessage: string; // 对方最新消息
  role: "seller" | "buyer";
}

export interface NegotiationReplyOutput {
  success: boolean;
  reply: string;
  tone: "firm" | "flexible" | "concessive";
  _mock?: boolean;
}

export interface BargainInput {
  enterpriseId: string;
  category: string;
  offerPrice: number;
  currency: string;
  targetRole: "seller" | "buyer";
}

export interface BargainOutput {
  success: boolean;
  minAcceptable: number;
  maxOffer: number;
  currency: string;
  strategy: string;
  scripts: string[];
  _mock?: boolean;
}

// ─── Deal Push API ────────────────────────────────────────────────────────────

export interface DealEvaluateInput {
  enterpriseId: string;
  opportunityId: string;
  stage: string;
  daysSinceLastContact?: number;
  dealValue?: number;
  currency?: string;
}

export interface DealEvaluateOutput {
  success: boolean;
  probability: number;    // 0 ~ 100
  recommendation: string;
  riskFactors: string[];
  _mock?: boolean;
}

export interface DealPushInput {
  enterpriseId: string;
  opportunityId: string;
  stage: string;
}

export interface DealPushOutput {
  success: boolean;
  nextStage?: string;
  reminderMessage: string;
  urgency: "low" | "medium" | "high";
  _mock?: boolean;
}

// ─── Provider Interface ───────────────────────────────────────────────────────

export interface AIProvider {
  // Profile
  extractProfile(input: ProfileInput): Promise<ProfileOutput>;
  // Matching
  matchEnterprises(input: MatchInput): Promise<MatchOutput>;
  scoreMatch(input: MatchScoreInput): Promise<MatchScoreOutput>;
  // Pricing
  validatePrice(input: PricingValidateInput): Promise<PricingValidateOutput>;
  suggestPrice(input: PricingSuggestInput): Promise<PricingSuggestOutput>;
  // Negotiation
  generateReply(input: NegotiationReplyInput): Promise<NegotiationReplyOutput>;
  suggestBargain(input: BargainInput): Promise<BargainOutput>;
  // Deal
  evaluateDeal(input: DealEvaluateInput): Promise<DealEvaluateOutput>;
  pushDeal(input: DealPushInput): Promise<DealPushOutput>;
}
