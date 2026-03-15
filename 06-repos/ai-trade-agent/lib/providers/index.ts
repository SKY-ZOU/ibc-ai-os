import type { AIProvider } from "@/types";
import { mockProvider } from "./mockProvider";

// ─── Provider Factory ─────────────────────────────────────────────────────────
//
// DEFAULT_PROVIDER env 可选值：
//   mock      — 本地 mock 实现（默认，MOCK_MODE=true 时强制使用）
//   openai    — OpenAI GPT（需配置 OPENAI_API_KEY，见 openai.ts）
//   anthropic — Anthropic Claude（需配置 ANTHROPIC_API_KEY，见 anthropic.ts）
//   google    — Google Gemini（需配置 GOOGLE_API_KEY，见 geminiProvider.ts）
//
// 示例（.env.local）：
//   DEFAULT_PROVIDER=openai
//   MOCK_MODE=false

export function getProvider(): AIProvider {
  // Force mock when MOCK_MODE=true
  if (process.env.MOCK_MODE === "true") {
    return mockProvider;
  }

  const providerName =
    process.env.DEFAULT_PROVIDER ??
    process.env.AI_PROVIDER ??
    "mock";

  switch (providerName) {
    case "mock":
      return mockProvider;

    case "openai":
      throw new Error(
        "OpenAI provider not yet implemented. " +
          "See lib/providers/openai.ts for integration guide."
      );

    case "anthropic":
      throw new Error(
        "Anthropic provider not yet implemented. " +
          "See lib/providers/anthropic.ts for integration guide."
      );

    case "google":
    case "gemini":
      throw new Error(
        "Google Gemini provider not yet implemented. " +
          "See lib/providers/geminiProvider.ts for integration guide."
      );

    default:
      console.warn(
        `[ai-trade-agent] Unknown DEFAULT_PROVIDER="${providerName}", falling back to mock.`
      );
      return mockProvider;
  }
}
