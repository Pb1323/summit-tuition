import { NextResponse } from "next/server";
import { ATTEMPTS, MOCKS } from "@/data/platform";
import { analyseAttempt, scoreAnswers, weakTopicsForAttempt } from "@/lib/assessment";
import { getCurrentUser } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";
import type { MockExam, Question } from "@/types/platform";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "student") {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const mockId = String(body?.mockId ?? "");
  const answers = body?.answers as Record<string, string> | undefined;
  const flaggedQuestionIds = Array.isArray(body?.flaggedQuestionIds) ? body.flaggedQuestionIds as string[] : [];
  const timeSpentSeconds = Number(body?.timeSpentSeconds ?? 0);

  if (!mockId || !answers || typeof answers !== "object") {
    return NextResponse.json({ error: "INVALID_ATTEMPT" }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    const mock = MOCKS.find((item) => item.id === mockId);
    if (!mock) return NextResponse.json({ error: "MOCK_NOT_FOUND" }, { status: 404 });
    if (!currentUser.approved || !currentUser.unlockedMockIds.includes(mock.id) || !mock.published) {
      return NextResponse.json({ error: "MOCK_LOCKED" }, { status: 403 });
    }
    if (ATTEMPTS.some((attempt) => attempt.studentId === currentUser.id && attempt.mockId === mock.id && attempt.status !== "in_progress")) {
      return NextResponse.json({ error: "ALREADY_SUBMITTED" }, { status: 409 });
    }
    return NextResponse.json({ ok: true, status: "submitted", message: "Demo validation passed. Report remains pending until admin release." });
  }

  const [mock, existing] = await Promise.all([
    prisma.mockExam.findUnique({ where: { id: mockId } }),
    prisma.attempt.findFirst({ where: { studentId: currentUser.id, mockId, status: { not: "in_progress" } } }),
  ]);
  if (!mock) return NextResponse.json({ error: "MOCK_NOT_FOUND" }, { status: 404 });
  if (existing) return NextResponse.json({ error: "ALREADY_SUBMITTED" }, { status: 409 });

  const unlock = await prisma.mockUnlock.findUnique({ where: { userId_mockId: { userId: currentUser.id, mockId } } });
  if (!currentUser.approved || !unlock || !mock.published) {
    return NextResponse.json({ error: "MOCK_LOCKED" }, { status: 403 });
  }

  const questionIds = mock.questionIds as string[];
  const questions = await prisma.question.findMany({ where: { id: { in: questionIds } } });
  const questionBank: Question[] = questions.map((question) => ({
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
    sourceStyle: question.sourceStyle ? (question.sourceStyle === "GL_style" ? "GL-style" : question.sourceStyle === "non_GL" ? "non-GL" : "unknown") : undefined,
    originalGenerated: question.originalGenerated,
  }));
  const dtoMock: MockExam = {
    id: mock.id,
    title: mock.title,
    subject: mock.subject as MockExam["subject"],
    style: mock.style === "GL_style" ? "GL-style" : mock.style === "non_GL" ? "non-GL" : "unknown",
    difficultyLabel: mock.difficultyLabel as MockExam["difficultyLabel"],
    sourceProfileId: mock.sourceProfileId ?? undefined,
    generatedFromReferenceId: mock.generatedFromReferenceId ?? undefined,
    topicMix: (mock.topicMix as unknown as Record<string, number> | null) ?? undefined,
    durationMinutes: mock.durationMinutes,
    totalMarks: mock.totalMarks,
    published: mock.published,
    releaseDate: mock.releaseDate.toISOString().slice(0, 10),
    tier: mock.tier,
    description: mock.description,
    questionIds,
  };
  const allowedAnswerIds = new Set(questionIds);
  if (Object.keys(answers).some((id) => !allowedAnswerIds.has(id))) {
    return NextResponse.json({ error: "INVALID_QUESTION_IDS" }, { status: 400 });
  }

  const score = scoreAnswers(dtoMock, answers, questionBank);
  const weakTopics = weakTopicsForAttempt(dtoMock, answers, questionBank);
  const analysis = analyseAttempt(dtoMock, answers, questionBank);
  const attempt = await prisma.attempt.create({
    data: {
      studentId: currentUser.id,
      mockId,
      answers,
      flaggedQuestionIds,
      score: score.score,
      maxScore: score.maxScore,
      submittedAt: new Date(),
      timeSpentSeconds,
      status: "submitted",
      weakTopics,
      errorPatterns: Object.fromEntries(analysis.weakTopics.flatMap((topic) => topic.questionIds.map((id) => [id, topic.pattern]))),
    },
  });

  return NextResponse.json({ ok: true, attemptId: attempt.id, status: "submitted" });
}
