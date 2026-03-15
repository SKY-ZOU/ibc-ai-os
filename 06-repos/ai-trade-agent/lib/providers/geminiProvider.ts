/**
 * geminiProvider.ts — Gemini AI provider (placeholder)
 *
 * TODO: Implement using @google/generative-ai SDK
 *
 * 接入步骤：
 * 1. npm install @google/generative-ai
 * 2. 在 .env.local 设置 GOOGLE_AI_API_KEY
 * 3. 取消以下注释并实现 extractProfile / matchEnterprises
 *
 * import { GoogleGenerativeAI } from "@google/generative-ai";
 * import type { AIProvider, ProfileInput, ProfileOutput, MatchInput, MatchOutput } from "@/types";
 *
 * const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY ?? "");
 * const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
 *
 * export const geminiProvider: AIProvider = {
 *   async extractProfile(input: ProfileInput): Promise<ProfileOutput> {
 *     const prompt = `
 *       你是一个国际贸易分析师。根据以下企业信息，提取企业标签、类型、贸易方向和风险等级。
 *       企业名称: ${input.name}
 *       行业: ${input.industry ?? "未知"}
 *       描述: ${input.description ?? "无"}
 *       供给品类: ${(input.products ?? []).join(", ") || "无"}
 *       需求品类: ${(input.demands ?? []).join(", ") || "无"}
 *
 *       请以 JSON 格式返回：
 *       {
 *         "tags": ["标签1", "标签2", "标签3"],
 *         "enterpriseType": "manufacturer|trader|buyer|distributor",
 *         "tradeDirection": "export|import|both",
 *         "riskLevel": "low|medium|high"
 *       }
 *     `;
 *     const result = await model.generateContent(prompt);
 *     const text = result.response.text();
 *     const profile = JSON.parse(text);
 *     return { success: true, profile, _mock: true };  // remove _mock when live
 *   },
 *
 *   async matchEnterprises(input: MatchInput): Promise<MatchOutput> {
 *     // 实现供需匹配评分逻辑
 *     throw new Error("geminiProvider.matchEnterprises not implemented");
 *   },
 * };
 */

export {};
