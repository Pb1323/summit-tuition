import "server-only";
import { ATTEMPTS, EMAIL_TEMPLATES, MOCKS, NOTE_PAGES, PASSAGES, PRODUCT_PLANS, QUESTIONS, REFERENCES, SEEDED_USERS } from "@/data/platform";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";
import { publicUser } from "@/lib/server/auth";
import type { Attempt, EmailTemplate, MockExam, NotePage, Passage, ProductPlan, Question, ReferenceSource, StudentAccount } from "@/types/platform";

/**
 * Answers/mark schemes/explanations must never reach a student's browser for
 * a question they haven't had a report released for yet — grading happens
 * server-side in /api/attempts/submit, which fetches full question data
 * independently, so redacting here doesn't affect scoring.
 */
function revealedQuestionIds(mocks: MockExam[], attempts: Attempt[], userId: string): Set<string> {
  const releasedMockIds = new Set(
    attempts.filter((attempt) => attempt.studentId === userId && attempt.status === "report_released").map((attempt) => attempt.mockId)
  );
  const ids = new Set<string>();
  for (const mock of mocks) {
    if (releasedMockIds.has(mock.id)) {
      for (const questionId of mock.questionIds) ids.add(questionId);
    }
  }
  return ids;
}

function redactQuestionsForStudent(questions: Question[], revealed: Set<string>): Question[] {
  return questions.map((question) =>
    revealed.has(question.id) ? question : { ...question, correctAnswer: "", markScheme: "", explanation: "" }
  );
}

export type PlatformBootstrap = {
  currentUser: StudentAccount | null;
  mode?: "demo";
  users: StudentAccount[];
  mocks: MockExam[];
  questions: Question[];
  passages: Passage[];
  attempts: Attempt[];
  references: ReferenceSource[];
  products: ProductPlan[];
  emailTemplates: EmailTemplate[];
  notes: NotePage[];
};

function fromPrismaReferenceStyle(style: string) {
  if (style === "GL_style") return "GL-style";
  if (style === "non_GL") return "non-GL";
  return "unknown";
}

function toDateOnly(value: Date | string) {
  return typeof value === "string" ? value.slice(0, 10) : value.toISOString().slice(0, 10);
}

export async function getPlatformBootstrap(currentUser: StudentAccount | null): Promise<PlatformBootstrap> {
  if (!isDatabaseConfigured()) {
    const questions =
      currentUser?.role === "admin"
        ? QUESTIONS
        : redactQuestionsForStudent(QUESTIONS, currentUser ? revealedQuestionIds(MOCKS, ATTEMPTS, currentUser.id) : new Set());
    return {
      currentUser,
      mode: "demo",
      users: currentUser?.role === "admin" ? SEEDED_USERS : currentUser ? [currentUser] : [],
      mocks: MOCKS,
      questions,
      passages: PASSAGES,
      attempts: currentUser?.role === "admin" ? ATTEMPTS : currentUser ? ATTEMPTS.filter((attempt) => attempt.studentId === currentUser.id) : [],
      references: currentUser?.role === "admin" ? REFERENCES : REFERENCES.filter((reference) => reference.style === "GL-style"),
      products: PRODUCT_PLANS,
      emailTemplates: currentUser?.role === "admin" ? EMAIL_TEMPLATES : [],
      notes: NOTE_PAGES,
    };
  }

  const [users, mocks, questions, passages, attempts, references, products, emailTemplates, notes] = await Promise.all([
    currentUser?.role === "admin" ? prisma.user.findMany({ include: { unlocks: true, noteUnlocks: true }, orderBy: { createdAt: "desc" } }) : Promise.resolve([]),
    prisma.mockExam.findMany({ where: currentUser?.role === "admin" ? {} : { published: true } }),
    prisma.question.findMany(),
    prisma.passage.findMany(),
    currentUser?.role === "admin"
      ? prisma.attempt.findMany()
      : currentUser
        ? prisma.attempt.findMany({ where: { studentId: currentUser.id } })
        : Promise.resolve([]),
    prisma.referenceSource.findMany(),
    prisma.productPlan.findMany(),
    currentUser?.role === "admin" ? prisma.emailTemplate.findMany() : Promise.resolve([]),
    prisma.note.findMany(),
  ]);

  const revealed =
    currentUser && currentUser.role !== "admin"
      ? (() => {
          const releasedMockIds = new Set(
            attempts.filter((attempt) => attempt.status === "report_released").map((attempt) => attempt.mockId)
          );
          const ids = new Set<string>();
          for (const mock of mocks) {
            if (releasedMockIds.has(mock.id)) {
              for (const questionId of mock.questionIds as string[]) ids.add(questionId);
            }
          }
          return ids;
        })()
      : null;

  return {
    currentUser,
    users: currentUser?.role === "admin" ? users.map(publicUser) : currentUser ? [currentUser] : [],
    mocks: mocks.map((mock) => ({
      id: mock.id,
      title: mock.title,
      subject: mock.subject as MockExam["subject"],
      style: fromPrismaReferenceStyle(mock.style) as MockExam["style"],
      difficultyLabel: mock.difficultyLabel as MockExam["difficultyLabel"],
      sourceProfileId: mock.sourceProfileId ?? undefined,
      generatedFromReferenceId: mock.generatedFromReferenceId ?? undefined,
      topicMix: (mock.topicMix as Record<string, number> | null) ?? undefined,
      durationMinutes: mock.durationMinutes,
      totalMarks: mock.totalMarks,
      questionIds: mock.questionIds as string[],
      published: mock.published,
      releaseDate: toDateOnly(mock.releaseDate),
      tier: mock.tier,
      description: mock.description,
      isFree: mock.isFree,
    })),
    questions: questions.map((question) => ({
      id: question.id,
      subject: question.subject as Question["subject"],
      topic: question.topic,
      subtopic: question.subtopic,
      difficulty: question.difficulty as Question["difficulty"],
      questionType: question.questionType as Question["questionType"],
      passageId: question.passageId ?? undefined,
      paragraphRefs: (question.paragraphRefs as unknown as number[] | null) ?? undefined,
      text: question.text,
      options: (question.options as unknown as string[] | null) ?? undefined,
      correctAnswer: revealed && !revealed.has(question.id) ? "" : (question.correctAnswer as string | string[]),
      markScheme: revealed && !revealed.has(question.id) ? "" : question.markScheme,
      explanation: revealed && !revealed.has(question.id) ? "" : question.explanation,
      marks: question.marks,
      visual: (question.visual as unknown as Question["visual"] | null) ?? undefined,
      tags: question.tags as string[],
      timeEstimateSeconds: question.timeEstimateSeconds,
      sourceStyle: question.sourceStyle ? fromPrismaReferenceStyle(question.sourceStyle) as Question["sourceStyle"] : undefined,
      originalGenerated: question.originalGenerated,
    })),
    passages: passages.map((passage) => ({
      id: passage.id,
      title: passage.title,
      source: "original",
      text: passage.text,
      paragraphs: (passage.paragraphs as unknown as string[] | null) ?? undefined,
    })),
    attempts: attempts.map((attempt) => ({
      ...attempt,
      submittedAt: attempt.submittedAt?.toISOString(),
      answers: attempt.answers as Record<string, string>,
      flaggedQuestionIds: attempt.flaggedQuestionIds as string[],
      status: attempt.status as Attempt["status"],
      weakTopics: attempt.weakTopics as string[],
      errorPatterns: attempt.errorPatterns as Attempt["errorPatterns"],
    })),
    references: references.map((reference) => ({
      id: reference.id,
      title: reference.title,
      url: reference.url,
      subject: reference.subject as ReferenceSource["subject"],
      style: fromPrismaReferenceStyle(reference.style) as ReferenceSource["style"],
      notes: reference.notes,
      lastAnalysedAt: toDateOnly(reference.lastAnalysedAt),
      topicStyleProfile: (reference.topicStyleProfile as unknown as ReferenceSource["topicStyleProfile"] | null) ?? undefined,
    })),
    products: products.map((product) => ({ ...product, badge: product.badge ?? undefined })),
    emailTemplates,
    notes: notes.map((note) => ({
      id: note.id,
      subject: note.subject as NotePage["subject"],
      slug: note.slug,
      title: note.title,
      isFree: note.isFree,
    })),
  };
}
