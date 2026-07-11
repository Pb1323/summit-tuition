/**
 * One-off/manual catalog seeder: upserts PRODUCT_PLANS, EMAIL_TEMPLATES, PASSAGES,
 * QUESTIONS, MOCKS and REFERENCES into Postgres. Run this after deploying catalog
 * changes in src/data/platform.ts, rather than on every request (see platform-store.ts).
 *
 * Usage: npm run db:seed
 */
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PRODUCT_PLANS, EMAIL_TEMPLATES, PASSAGES, QUESTIONS, MOCKS, REFERENCES } from "../src/data/platform";
import type { $Enums } from "../src/generated/prisma/client";

function toPrismaReferenceStyle(style: string): $Enums.ReferenceStyle {
  if (style === "GL-style") return "GL_style";
  if (style === "non-GL") return "non_GL";
  return "unknown";
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed the catalog.");
  }
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

  console.log(`Seeding ${PRODUCT_PLANS.length} products, ${EMAIL_TEMPLATES.length} email templates, ${PASSAGES.length} passages, ${QUESTIONS.length} questions, ${MOCKS.length} mocks, ${REFERENCES.length} references...`);

  // Sequential, not one giant $transaction: a single batched transaction over a
  // pgbouncer transaction-mode pooler is unreliable at this volume (prepared
  // statement/connection issues) and was previously run inline on every cold
  // request, which is what caused /api/platform/bootstrap to 500.
  for (const product of PRODUCT_PLANS) {
    await prisma.productPlan.upsert({ where: { id: product.id }, update: product, create: product });
  }
  for (const email of EMAIL_TEMPLATES) {
    await prisma.emailTemplate.upsert({ where: { id: email.id }, update: email, create: email });
  }
  for (const passage of PASSAGES) {
    const data = { title: passage.title, source: passage.source, text: passage.text, paragraphs: passage.paragraphs ?? [] };
    await prisma.passage.upsert({ where: { id: passage.id }, update: data, create: { id: passage.id, ...data } });
  }
  for (const question of QUESTIONS) {
    const data = {
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
    };
    await prisma.question.upsert({ where: { id: question.id }, update: data, create: { id: question.id, ...data } });
  }
  for (const mock of MOCKS) {
    const data = {
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
    };
    await prisma.mockExam.upsert({ where: { id: mock.id }, update: data, create: { id: mock.id, ...data } });
  }
  for (const reference of REFERENCES) {
    const data = {
      title: reference.title,
      url: reference.url,
      subject: reference.subject,
      style: toPrismaReferenceStyle(reference.style),
      notes: reference.notes,
      lastAnalysedAt: new Date(reference.lastAnalysedAt),
      topicStyleProfile: reference.topicStyleProfile,
    };
    await prisma.referenceSource.upsert({ where: { id: reference.id }, update: data, create: { id: reference.id, ...data } });
  }

  await prisma.$disconnect();
  console.log("Catalog seed complete.");
}

main().catch((error) => {
  console.error("Catalog seed failed:", error);
  process.exit(1);
});
