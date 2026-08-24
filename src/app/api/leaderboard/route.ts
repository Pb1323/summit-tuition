import { NextResponse } from "next/server";
import { ATTEMPTS, SEEDED_USERS } from "@/data/platform";
import { COMPETITION_ENTRY_DEADLINE, COMPETITION_LEADERBOARD_LIMIT, COMPETITION_MOCK_ID } from "@/data/competition";
import { getCurrentUser } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";

export const runtime = "nodejs";

function displayName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return parts[0] ?? "Student";
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

interface Row {
  rank: number;
  name: string;
  score: number;
  maxScore: number;
  timeSpentSeconds: number;
  isSelf: boolean;
}

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const deadline = new Date(COMPETITION_ENTRY_DEADLINE);
  const eligibleStatuses = new Set(["submitted", "marked", "report_released"]);

  let entries: { studentId: string; name: string; score: number; maxScore: number; timeSpentSeconds: number }[];

  if (!isDatabaseConfigured()) {
    const nameById = new Map(SEEDED_USERS.map((user) => [user.id, user.name]));
    entries = ATTEMPTS.filter(
      (attempt) =>
        attempt.mockId === COMPETITION_MOCK_ID &&
        eligibleStatuses.has(attempt.status) &&
        attempt.submittedAt &&
        new Date(attempt.submittedAt) <= deadline
    ).map((attempt) => ({
      studentId: attempt.studentId,
      name: nameById.get(attempt.studentId) ?? "Student",
      score: attempt.score,
      maxScore: attempt.maxScore,
      timeSpentSeconds: attempt.timeSpentSeconds,
    }));
  } else {
    const attempts = await prisma.attempt.findMany({
      where: {
        mockId: COMPETITION_MOCK_ID,
        status: { in: ["submitted", "marked", "report_released"] },
        submittedAt: { lte: deadline },
      },
      include: { student: { select: { id: true, name: true } } },
    });
    entries = attempts.map((attempt) => ({
      studentId: attempt.studentId,
      name: attempt.student.name,
      score: attempt.score,
      maxScore: attempt.maxScore,
      timeSpentSeconds: attempt.timeSpentSeconds,
    }));
  }

  entries.sort((a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds);

  const ranked: Row[] = entries.map((entry, index) => ({
    rank: index + 1,
    name: displayName(entry.name),
    score: entry.score,
    maxScore: entry.maxScore,
    timeSpentSeconds: entry.timeSpentSeconds,
    isSelf: entry.studentId === currentUser.id,
  }));

  const top = ranked.slice(0, COMPETITION_LEADERBOARD_LIMIT);
  const selfRow = ranked.find((row) => row.isSelf);
  const selfOutsideTop = selfRow && !top.some((row) => row.isSelf) ? selfRow : null;

  return NextResponse.json({
    mockId: COMPETITION_MOCK_ID,
    deadline: COMPETITION_ENTRY_DEADLINE,
    totalEntries: ranked.length,
    top,
    selfRow: selfOutsideTop,
  });
}
