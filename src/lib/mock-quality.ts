import type { MockExam, Passage, Question } from "@/types/platform";
import { ENGLISH_SECTIONS, getEnglishSectionId, type EnglishSectionId } from "@/lib/english-sections";

export type MockQualityStatus = "Ready" | "Needs Review" | "Broken Draft";

export type MockQualityResult = {
  status: MockQualityStatus;
  checks: { label: string; passed: boolean }[];
  warnings: string[];
};

export function evaluateMockQuality(mock: MockExam, questions: Question[], passages: Passage[]): MockQualityResult {
  const mockQuestions = questions.filter((question) => mock.questionIds.includes(question.id));
  const fullMock = isFullMock(mock);
  const visualRatio = mockQuestions.length ? mockQuestions.filter((question) => Boolean(question.visual)).length / mockQuestions.length : 0;
  const checks = [
    { label: "Has title", passed: Boolean(mock.title?.trim()) },
    { label: "Has subject", passed: Boolean(mock.subject) },
    { label: "Has time limit", passed: mock.durationMinutes > 0 },
    { label: "Has questions", passed: mockQuestions.length > 0 },
    { label: "Every question has answer", passed: mockQuestions.every((question) => hasAnswer(question)) },
    { label: "Every question has explanation", passed: mockQuestions.every((question) => Boolean(question.explanation?.trim())) },
    { label: "Every question has mark scheme", passed: mockQuestions.every((question) => Boolean(question.markScheme?.trim())) },
    { label: "Every question has topic", passed: mockQuestions.every((question) => Boolean(question.topic?.trim())) },
    { label: "Every question has difficulty", passed: mockQuestions.every((question) => Boolean(question.difficulty)) },
    { label: "Maths visual questions render successfully", passed: mockQuestions.every((question) => question.subject !== "Maths" || !needsVisual(question) || Boolean(question.visual?.type)) },
    { label: "English comprehension questions have passage/paragraph references", passed: mockQuestions.every((question) => question.subject !== "English" || !question.passageId || hasPassageLink(question, passages)) },
    { label: "English passage length appropriate", passed: mock.subject !== "English" || hasAppropriateEnglishPassageLength(mockQuestions, passages) },
    { label: "Full mock has 50 questions", passed: !fullMock || mockQuestions.length >= 50 },
    { label: "English full mock passage is 650+ words", passed: mock.subject !== "English" || !fullMock || hasAppropriateEnglishPassageLength(mockQuestions, passages, 650) },
    { label: "Maths full mock visual ratio is at least 30%", passed: mock.subject !== "Maths" || !fullMock || visualRatio >= 0.3 },
    // Maths-only: GL English has no equivalent "Challenge" topic — its 4-section structure
    // (see "Topic spread is balanced" below) already guarantees a stretch tier via section sizing.
    { label: "Challenge questions present", passed: !fullMock || mock.subject !== "Maths" || hasChallengeQuestions(mockQuestions) },
    { label: "Topic spread is balanced", passed: !fullMock || hasBalancedTopicSpread(mockQuestions) },
    { label: "Generated mock is not too easy", passed: !fullMock || mock.difficultyLabel === "Standard" || hasEnoughStretchQuestions(mockQuestions) },
    { label: "Total marks are valid", passed: mock.totalMarks > 0 && mock.totalMarks === mockQuestions.reduce((sum, question) => sum + question.marks, 0) },
    { label: "Difficulty distribution valid", passed: mockQuestions.length === 0 || mockQuestions.some((question) => question.difficulty === "standard" || question.difficulty === "stretch") },
    { label: "No non-GL source used for default generation", passed: mock.style === "GL-style" || !mock.generatedFromReferenceId },
  ];
  const warnings = checks.filter((check) => !check.passed).map((check) => check.label);
  const brokenLabels = new Set(["Has title", "Has subject", "Has time limit", "Has questions", "Every question has answer"]);
  const status: MockQualityStatus = warnings.length === 0 ? "Ready" : warnings.some((warning) => brokenLabels.has(warning)) ? "Broken Draft" : "Needs Review";
  return { status, checks, warnings };
}

export function qualityTone(status: MockQualityStatus) {
  if (status === "Ready") return "green" as const;
  if (status === "Broken Draft") return "red" as const;
  return "navy" as const;
}

function hasAnswer(question: Question) {
  return Array.isArray(question.correctAnswer) ? question.correctAnswer.length > 0 : Boolean(String(question.correctAnswer ?? "").trim());
}

function needsVisual(question: Question) {
  return ["table_graph", "geometry"].includes(question.questionType) || Boolean(question.visual);
}

function hasPassageLink(question: Question, passages: Passage[]) {
  return passages.some((passage) => passage.id === question.passageId) && Boolean(question.paragraphRefs?.length);
}

function isFullMock(mock: MockExam) {
  return (mock.subject === "English" || mock.subject === "Maths") && mock.style === "GL-style" && !/diagnostic|short|practice/i.test(`${mock.title} ${mock.tier}`);
}

function hasChallengeQuestions(questions: Question[]) {
  return questions.some((question) => `${question.topic} ${question.subtopic} ${question.tags.join(" ")}`.toLowerCase().includes("challenge"));
}

function hasBalancedTopicSpread(questions: Question[]) {
  if (questions.length < 10) return true;
  // GL English is a fixed 4-section paper, not a flat topic pool — reading comprehension alone is
  // ~52% of a real paper by design (research/gl-english-question-bank.md), so the raw <=25%-per-topic
  // rule below (written for Maths' many small topics) would always fail it. Check section balance
  // against the researched GL weights instead.
  if (questions.length > 0 && questions.every((question) => question.subject === "English")) {
    return hasBalancedEnglishSections(questions);
  }
  const counts = new Map<string, number>();
  for (const question of questions) counts.set(question.topic, (counts.get(question.topic) ?? 0) + 1);
  const max = Math.max(...counts.values());
  return max / questions.length <= 0.25;
}

function hasBalancedEnglishSections(questions: Question[]) {
  const counts = new Map<EnglishSectionId, number>();
  for (const question of questions) {
    const sectionId = getEnglishSectionId(question);
    if (sectionId) counts.set(sectionId, (counts.get(sectionId) ?? 0) + 1);
  }
  // Allow reasonable rounding/pool-cycling tolerance either side of each section's researched weight.
  return ENGLISH_SECTIONS.every((section) => {
    const actual = (counts.get(section.id) ?? 0) / questions.length;
    return Math.abs(actual - section.weight) <= 0.12;
  });
}

function hasEnoughStretchQuestions(questions: Question[]) {
  if (questions.length === 0) return false;
  return questions.filter((question) => question.difficulty === "stretch").length / questions.length >= 0.3;
}

function hasAppropriateEnglishPassageLength(questions: Question[], passages: Passage[], minimumWords = 180) {
  const wordCountOf = (id?: string) => {
    const passage = id ? passages.find((item) => item.id === id) : undefined;
    return passage?.text.split(/\s+/).filter(Boolean).length ?? 0;
  };
  // A GL 4-section mock links two different passages: the main reading-comprehension text (which
  // must clear `minimumWords`, e.g. the 650-word full-mock bar) and the cloze section's own,
  // intentionally shorter passage (GL's real cloze passages run well under comprehension length —
  // checked here against a much lower floor, just to confirm it has real content, not padding text).
  const comprehensionPassageIds = Array.from(
    new Set(questions.filter((question) => getEnglishSectionId(question) === "comprehension" && question.passageId).map((question) => question.passageId!))
  );
  const clozePassageIds = Array.from(
    new Set(questions.filter((question) => getEnglishSectionId(question) === "cloze" && question.passageId).map((question) => question.passageId!))
  );
  // Fall back to the old flat check for callers/fixtures that don't tag questions into sections at all.
  if (comprehensionPassageIds.length === 0 && clozePassageIds.length === 0) {
    const passageIds = Array.from(new Set(questions.map((question) => question.passageId).filter(Boolean)));
    if (passageIds.length === 0) return false;
    return passageIds.every((id) => wordCountOf(id) >= minimumWords);
  }
  const comprehensionOk = comprehensionPassageIds.every((id) => wordCountOf(id) >= minimumWords);
  const clozeOk = clozePassageIds.every((id) => wordCountOf(id) >= 80);
  return comprehensionOk && clozeOk;
}
