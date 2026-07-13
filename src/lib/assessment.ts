import { QUESTIONS } from "@/data/platform";
import type { Attempt, MockExam, Question } from "@/types/platform";

export function normaliseAnswer(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isCorrect(question: Question, answer?: string) {
  if (!answer) return false;
  const expected = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
  return expected.some((item) => normaliseAnswer(item) === normaliseAnswer(answer));
}

export function scoreAnswers(mock: MockExam, answers: Record<string, string>, bank: Question[] = QUESTIONS) {
  const questions = bank.filter((question) => mock.questionIds.includes(question.id));
  return questions.reduce(
    (result, question) => {
      const earned = isCorrect(question, answers[question.id]) ? question.marks : 0;
      return {
        score: result.score + earned,
        maxScore: result.maxScore + question.marks,
      };
    },
    { score: 0, maxScore: 0 }
  );
}

export function weakTopicsForAttempt(mock: MockExam, answers: Record<string, string>, bank: Question[] = QUESTIONS) {
  return analyseAttempt(mock, answers, bank).weakTopics.map((topic) => topic.topic);
}

export function topicBreakdown(mock: MockExam, attempt?: Attempt, bank: Question[] = QUESTIONS) {
  const byTopic = new Map<string, { topic: string; score: number; maxScore: number }>();
  for (const question of bank.filter((item) => mock.questionIds.includes(item.id))) {
    const current = byTopic.get(question.topic) ?? { topic: question.topic, score: 0, maxScore: 0 };
    current.maxScore += question.marks;
    if (attempt && isCorrect(question, attempt.answers[question.id])) {
      current.score += question.marks;
    }
    byTopic.set(question.topic, current);
  }
  return Array.from(byTopic.values());
}

export function analyseAttempt(mock: MockExam, answers: Record<string, string>, bank: Question[] = QUESTIONS) {
  const questions = bank.filter((question) => mock.questionIds.includes(question.id));
  const byTopic = new Map<string, { topic: string; missedMarks: number; maxMarks: number; questionIds: string[]; pattern: "careless_error" | "concept_gap" | "timing_pressure" }>();

  for (const question of questions) {
    const current = byTopic.get(question.topic) ?? {
      topic: question.topic,
      missedMarks: 0,
      maxMarks: 0,
      questionIds: [],
      pattern: "concept_gap" as const,
    };
    current.maxMarks += question.marks;
    const answer = answers[question.id];
    if (!isCorrect(question, answer)) {
      current.missedMarks += question.marks;
      current.questionIds.push(question.id);
      if (!answer) current.pattern = "timing_pressure";
      else if (question.difficulty === "standard" && question.marks === 1) current.pattern = "careless_error";
    }
    byTopic.set(question.topic, current);
  }

  const weakTopics = Array.from(byTopic.values())
    .filter((topic) => topic.missedMarks > 0)
    .sort((a, b) => b.missedMarks / b.maxMarks - a.missedMarks / a.maxMarks)
    .slice(0, 3);

  return {
    weakTopics,
    topicBreakdown: Array.from(byTopic.values()).map((topic) => ({
      topic: topic.topic,
      score: topic.maxMarks - topic.missedMarks,
      maxScore: topic.maxMarks,
      missedMarks: topic.missedMarks,
      questionIds: topic.questionIds,
      pattern: topic.pattern,
    })),
  };
}

export function patternDescription(pattern: "careless_error" | "concept_gap" | "timing_pressure") {
  if (pattern === "careless_error") return "mostly single-mark slips on standard questions — likely careless errors rather than a knowledge gap";
  if (pattern === "timing_pressure") return "several questions left unanswered — likely timing pressure on this section";
  return "a genuine concept gap needing focused revision";
}

export function autoGenerateReport(mock: MockExam, attempt: Attempt, bank: Question[] = QUESTIONS) {
  const { weakTopics } = analyseAttempt(mock, attempt.answers, bank);
  const percentage = attempt.maxScore ? Math.round((attempt.score / attempt.maxScore) * 100) : 0;
  const lines = [`Overall: ${attempt.score}/${attempt.maxScore} marks (${percentage}%).`];
  if (weakTopics.length === 0) {
    lines.push("No significant weak topics — strong, consistent performance across the paper.");
  } else {
    lines.push("Topics to focus on:");
    for (const topic of weakTopics) {
      const topicPercentage = topic.maxMarks ? Math.round((topic.missedMarks / topic.maxMarks) * 100) : 0;
      lines.push(`- ${topic.topic}: lost ${topic.missedMarks}/${topic.maxMarks} marks (${topicPercentage}%) — ${patternDescription(topic.pattern)}.`);
    }
    lines.push("Suggested next steps:");
    for (const item of recommendationsForTopics(weakTopics.map((topic) => topic.topic))) {
      lines.push(`- ${item}`);
    }
  }
  lines.push("Full question-by-question review, including the exact questions missed and correct answers, is available in the released report.");
  return lines.join("\n");
}

export function recommendationsForTopics(topics: string[]) {
  if (topics.length === 0) return ["Maintain momentum with one mixed GL-style practice set this week."];
  return topics.map((topic) => {
    if (topic === "Ratio") return "Complete 10 ratio sharing questions and write the value of one part every time.";
    if (topic === "Fractions") return "Revise fraction-of-amount questions before the next timed maths mock.";
    if (topic === "Inference") return "Practise explaining what a phrase suggests, using evidence from the passage.";
    if (topic === "Vocabulary") return "Build a short synonym set from each reading passage.";
    return `Complete a focused practice pack on ${topic}.`;
  });
}
