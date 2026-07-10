import "server-only";
import { ATTEMPTS, EMAIL_TEMPLATES, MOCKS, PASSAGES, PRODUCT_PLANS, QUESTIONS, REFERENCES, SEEDED_USERS } from "@/data/platform";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";
import { publicUser } from "@/lib/server/auth";
import type { Attempt, EmailTemplate, MockExam, Passage, ProductPlan, Question, ReferenceSource, StudentAccount } from "@/types/platform";

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
};

function fromPrismaReferenceStyle(style: string) {
  if (style === "GL_style") return "GL-style";
  if (style === "non_GL") return "non-GL";
  return "unknown";
}

function toDateOnly(value: Date | string) {
  return typeof value === "string" ? value.slice(0, 10) : value.toISOString().slice(0, 10);
}

function toPrismaReferenceStyle(style: string) {
  if (style === "GL-style") return "GL_style";
  if (style === "non-GL") return "non_GL";
  return "unknown";
}

async function ensureCatalogSeeded() {
  const productCount = await prisma.productPlan.count();
  if (productCount > 0) return;

  await prisma.$transaction([
    ...PRODUCT_PLANS.map((product) => prisma.productPlan.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    })),
    ...EMAIL_TEMPLATES.map((email) => prisma.emailTemplate.upsert({
      where: { id: email.id },
      update: email,
      create: email,
    })),
    ...PASSAGES.map((passage) => prisma.passage.upsert({
      where: { id: passage.id },
      update: { title: passage.title, source: passage.source, text: passage.text, paragraphs: passage.paragraphs ?? [] },
      create: { id: passage.id, title: passage.title, source: passage.source, text: passage.text, paragraphs: passage.paragraphs ?? [] },
    })),
    ...QUESTIONS.map((question) => prisma.question.upsert({
      where: { id: question.id },
      update: {
        subject: question.subject,
        topic: question.topic,
        subtopic: question.subtopic,
        difficulty: question.difficulty,
        questionType: question.questionType,
        passageId: question.passageId,
        paragraphRefs: question.paragraphRefs ?? undefined,
        text: question.text,
        options: question.options ?? undefined,
        correctAnswer: question.correctAnswer,
        markScheme: question.markScheme,
        explanation: question.explanation,
        marks: question.marks,
        visual: question.visual as never,
        tags: question.tags,
        timeEstimateSeconds: question.timeEstimateSeconds,
        sourceStyle: question.sourceStyle ? toPrismaReferenceStyle(question.sourceStyle) : undefined,
        originalGenerated: question.originalGenerated ?? false,
      },
      create: {
        id: question.id,
        subject: question.subject,
        topic: question.topic,
        subtopic: question.subtopic,
        difficulty: question.difficulty,
        questionType: question.questionType,
        passageId: question.passageId,
        paragraphRefs: question.paragraphRefs ?? undefined,
        text: question.text,
        options: question.options ?? undefined,
        correctAnswer: question.correctAnswer,
        markScheme: question.markScheme,
        explanation: question.explanation,
        marks: question.marks,
        visual: question.visual as never,
        tags: question.tags,
        timeEstimateSeconds: question.timeEstimateSeconds,
        sourceStyle: question.sourceStyle ? toPrismaReferenceStyle(question.sourceStyle) : undefined,
        originalGenerated: question.originalGenerated ?? false,
      },
    })),
    ...MOCKS.map((mock) => prisma.mockExam.upsert({
      where: { id: mock.id },
      update: {
        title: mock.title,
        subject: mock.subject,
        style: toPrismaReferenceStyle(mock.style),
        difficultyLabel: mock.difficultyLabel,
        sourceProfileId: mock.sourceProfileId,
        generatedFromReferenceId: mock.generatedFromReferenceId,
        topicMix: mock.topicMix,
        durationMinutes: mock.durationMinutes,
        totalMarks: mock.totalMarks,
        questionIds: mock.questionIds,
        published: mock.published,
        releaseDate: new Date(mock.releaseDate),
        tier: mock.tier,
        description: mock.description,
      },
      create: {
        id: mock.id,
        title: mock.title,
        subject: mock.subject,
        style: toPrismaReferenceStyle(mock.style),
        difficultyLabel: mock.difficultyLabel,
        sourceProfileId: mock.sourceProfileId,
        generatedFromReferenceId: mock.generatedFromReferenceId,
        topicMix: mock.topicMix,
        durationMinutes: mock.durationMinutes,
        totalMarks: mock.totalMarks,
        questionIds: mock.questionIds,
        published: mock.published,
        releaseDate: new Date(mock.releaseDate),
        tier: mock.tier,
        description: mock.description,
      },
    })),
    ...REFERENCES.map((reference) => prisma.referenceSource.upsert({
      where: { id: reference.id },
      update: {
        title: reference.title,
        url: reference.url,
        subject: reference.subject,
        style: toPrismaReferenceStyle(reference.style),
        notes: reference.notes,
        lastAnalysedAt: new Date(reference.lastAnalysedAt),
        topicStyleProfile: reference.topicStyleProfile,
      },
      create: {
        id: reference.id,
        title: reference.title,
        url: reference.url,
        subject: reference.subject,
        style: toPrismaReferenceStyle(reference.style),
        notes: reference.notes,
        lastAnalysedAt: new Date(reference.lastAnalysedAt),
        topicStyleProfile: reference.topicStyleProfile,
      },
    })),
  ]);
}

export async function getPlatformBootstrap(currentUser: StudentAccount | null): Promise<PlatformBootstrap> {
  if (!isDatabaseConfigured()) {
    return {
      currentUser,
      mode: "demo",
      users: currentUser?.role === "admin" ? SEEDED_USERS : currentUser ? [currentUser] : [],
      mocks: MOCKS,
      questions: QUESTIONS,
      passages: PASSAGES,
      attempts: currentUser?.role === "admin" ? ATTEMPTS : currentUser ? ATTEMPTS.filter((attempt) => attempt.studentId === currentUser.id) : [],
      references: currentUser?.role === "admin" ? REFERENCES : REFERENCES.filter((reference) => reference.style === "GL-style"),
      products: PRODUCT_PLANS,
      emailTemplates: currentUser?.role === "admin" ? EMAIL_TEMPLATES : [],
    };
  }

  await ensureCatalogSeeded();

  const [users, mocks, questions, passages, attempts, references, products, emailTemplates] = await Promise.all([
    currentUser?.role === "admin" ? prisma.user.findMany({ include: { unlocks: true }, orderBy: { createdAt: "desc" } }) : Promise.resolve([]),
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
  ]);

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
      correctAnswer: question.correctAnswer as string | string[],
      markScheme: question.markScheme,
      explanation: question.explanation,
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
  };
}
