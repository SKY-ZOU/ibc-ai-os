/**
 * anthropic.ts — Anthropic Claude provider (placeholder)
 *
 * TODO: Implement using @anthropic-ai/sdk
 *
 * 接入步骤：
 * 1. npm install @anthropic-ai/sdk
 * 2. 在 .env.local 设置 ANTHROPIC_API_KEY
 * 3. 设置 DEFAULT_PROVIDER=anthropic
 *
 * import Anthropic from "@anthropic-ai/sdk";
 * import type { AIProvider } from "@/types";
 *
 * const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *
 * export const anthropicProvider: AIProvider = {
 *   async extractProfile(input) {
 *     const message = await client.messages.create({
 *       model: "claude-sonnet-4-6",
 *       max_tokens: 1024,
 *       messages: [{ role: "user", content: `Extract enterprise profile for: ${input.name}` }],
 *     });
 *     // parse response...
 *   },
 *   // ... etc.
 * };
 */

export {};
