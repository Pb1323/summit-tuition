import type { Question } from "@/types/platform";

export type EnglishSectionId = "comprehension" | "spelling" | "punctuation" | "cloze";

export type EnglishSectionMeta = {
  id: EnglishSectionId;
  label: string;
  shortLabel: string;
  /** Share of a full-length paper's questions, per the real GL Assessment English familiarisation booklet (research/gl-english-question-bank.md). */
  weight: number;
  instructions: string;
};

/**
 * Ratios and instruction copy are calibrated against a real GL Assessment
 * English familiarisation booklet (54 questions, 4 sections) read directly
 * for research/gl-english-question-bank.md — not paraphrased from GL's own
 * instruction wording, written fresh in the same spirit.
 */
export const ENGLISH_SECTIONS: EnglishSectionMeta[] = [
  {
    id: "comprehension",
    label: "Section A: Reading comprehension",
    shortLabel: "Comprehension",
    weight: 0.52,
    instructions: "Read the passage on the left carefully. You can look back at it as many times as you need. Choose the best answer for each question — some ask you to find a detail directly, others ask you to work out what the writer implies.",
  },
  {
    id: "spelling",
    label: "Section B: Spelling",
    shortLabel: "Spelling",
    weight: 0.17,
    instructions: "Each sentence is split into four lettered groups of words. Exactly one group either contains a spelling mistake or none of them do. Choose the letter of the group with the mistake, or choose N if the sentence has no mistake.",
  },
  {
    id: "punctuation",
    label: "Section C: Punctuation",
    shortLabel: "Punctuation",
    weight: 0.17,
    instructions: "Each sentence is split into four lettered groups of words. Exactly one group either contains a punctuation mistake or none of them do. Choose the letter of the group with the mistake, or choose N if the sentence has no mistake.",
  },
  {
    id: "cloze",
    label: "Section D: Best word",
    shortLabel: "Best word",
    weight: 0.15,
    instructions: "Read the short passage. Each gap has five possible words or phrases. Choose the one that best completes the sentence and makes sense in the passage as a whole.",
  },
];

export const englishSectionMeta = (id: EnglishSectionId) => ENGLISH_SECTIONS.find((section) => section.id === id)!;

/**
 * Section is derived from tags/questionType rather than a stored field so it
 * works for both generator output and hand-authored fixtures (the existing
 * "English GL-Style Stretch Paper" static mock in src/data/platform.ts uses
 * topic "Grammar" for its punctuation questions, so topic alone is not a
 * reliable signal — tags are consistent across both sources).
 *
 * "grammar-mistake" is treated as the same section as "punctuation": the
 * hand-authored Elite English mocks (english-gl-8/9/10-elite) tag their
 * segment-format grammar-error questions "grammar-mistake" rather than
 * "punctuation" — same GL "find the lettered group with the mistake"
 * mechanic, just named after the error type it drills instead of GL's own
 * section label. Both map to the one "punctuation" EnglishSectionId.
 */
export function getEnglishSectionId(question: Question): EnglishSectionId | undefined {
  const tags = (question.tags ?? []).map((tag) => tag.toLowerCase());
  if (question.questionType === "cloze" || tags.includes("cloze")) return "cloze";
  if (tags.includes("spelling")) return "spelling";
  if (tags.includes("punctuation") || tags.includes("grammar-mistake")) return "punctuation";
  if (question.subject === "English") return "comprehension";
  return undefined;
}

/** Splits `total` into integer buckets by `weights`, largest-remainder rounding so counts always sum back to `total`. */
export function allocateByWeights<K extends string>(total: number, weights: Record<K, number>): Record<K, number> {
  const keys = Object.keys(weights) as K[];
  const floored = keys.map((key) => {
    const exact = total * weights[key];
    return { key, count: Math.max(1, Math.floor(exact)), remainder: exact - Math.floor(exact) };
  });
  let allocated = floored.reduce((sum, entry) => sum + entry.count, 0);
  const byRemainderDesc = [...floored].sort((a, b) => b.remainder - a.remainder);
  let i = 0;
  while (allocated < total) {
    byRemainderDesc[i % byRemainderDesc.length].count += 1;
    allocated += 1;
    i += 1;
  }
  const result = {} as Record<K, number>;
  for (const entry of floored) result[entry.key] = entry.count;
  return result;
}

/** Splits a whole-number question count into the 4 section sizes, rounded to always sum back to the input. */
export function allocateEnglishSectionCounts(questionCount: number): Record<EnglishSectionId, number> {
  const weights = Object.fromEntries(ENGLISH_SECTIONS.map((section) => [section.id, section.weight])) as Record<EnglishSectionId, number>;
  return allocateByWeights(questionCount, weights);
}
