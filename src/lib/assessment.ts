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

export function scoreAnswers(mock: MockExam, answers: Record<string, string>) {
  const questions = QUESTIONS.filter((question) => mock.questionIds.includes(question.id));
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

export function weakTopicsForAttempt(mock: MockExam, answers: Record<string, string>) {
  const misses = QUESTIONS.filter((question) => mock.questionIds.includes(question.id) && !isCorrect(question, answers[question.id]));
  return Array.from(new Set(misses.map((question) => question.topic)));
}

export function topicBreakdown(mock: MockExam, attempt?: Attempt) {
  const byTopic = new Map<string, { topic: string; score: number; maxScore: number }>();
  for (const question of QUESTIONS.filter((item) => mock.questionIds.includes(item.id))) {
    const current = byTopic.get(question.topic) ?? { topic: question.topic, score: 0, maxScore: 0 };
    current.maxScore += question.marks;
    if (attempt && isCorrect(question, attempt.answers[question.id])) {
      current.score += question.marks;
    }
    byTopic.set(question.topic, current);
  }
  return Array.from(byTopic.values());
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

