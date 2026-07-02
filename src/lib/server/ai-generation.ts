import "server-only";
import { generateMockFromReferenceProfile, type GenerateMockInput, type GeneratedMockResult } from "@/lib/mock-generation";

type ProviderName = "deterministic" | "openai" | "anthropic";

export async function generateMockWithProvider(input: GenerateMockInput): Promise<{ provider: ProviderName; result: GeneratedMockResult; warnings: string[] }> {
  const configuredProvider = (process.env.MOCK_GENERATION_PROVIDER ?? "deterministic") as ProviderName;
  const warnings: string[] = [];

  if (configuredProvider === "openai" && process.env.OPENAI_API_KEY) {
    const generated = await tryOpenAI(input).catch((error: Error) => {
      warnings.push(`OpenAI generation failed: ${error.message}`);
      return null;
    });
    if (generated) return { provider: "openai", result: generated, warnings };
  }

  if (configuredProvider === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    warnings.push("Anthropic provider placeholder is configured but not enabled; deterministic fallback used.");
  }

  if (configuredProvider !== "deterministic") {
    warnings.push("Using deterministic fallback because the configured AI provider is unavailable or invalid.");
  }

  return { provider: "deterministic", result: generateMockFromReferenceProfile(input), warnings };
}

async function tryOpenAI(input: GenerateMockInput): Promise<GeneratedMockResult | null> {
  const endpoint = `${process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1"}/chat/completions`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: copyrightSafeSystemPrompt() },
        { role: "user", content: JSON.stringify({ input, requiredShape: "GeneratedMockResult { mock, questions, passages }" }) },
      ],
    }),
  });
  if (!response.ok) throw new Error(`provider returned ${response.status}`);
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("empty provider response");
  const parsed = JSON.parse(content) as GeneratedMockResult;
  if (!parsed.mock || !Array.isArray(parsed.questions) || !Array.isArray(parsed.passages)) {
    throw new Error("invalid generated mock shape");
  }
  return parsed;
}

function copyrightSafeSystemPrompt() {
  return [
    "You generate original 11+ mock exam content for Summit Tuition.",
    "Use reference profiles only for structure metadata: timing, topic mix, difficulty feel and question-type distribution.",
    "Do not copy, paraphrase, transform, or closely imitate source passages, questions, diagrams, options, mark schemes or explanations.",
    "For English, create a completely original passage.",
    "For Maths, create original contexts, numbers, visuals, answers, mark schemes and explanations.",
    "Return JSON only matching the app GeneratedMockResult shape.",
    "Every generated question must set originalGenerated true and sourceStyle GL-style.",
  ].join(" ");
}
