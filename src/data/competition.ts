/**
 * Single source of truth for the leaderboard competition — one paid mock,
 * ranked by score then time, entries close at COMPETITION_ENTRY_DEADLINE.
 * Update COMPETITION_MOCK_ID once the paper is authored and published.
 */
export const COMPETITION_MOCK_ID = "english-vanguard-1";

// ISO date the leaderboard stops accepting new entries for ranking/prizes.
export const COMPETITION_ENTRY_DEADLINE = "2026-08-31T23:59:59.000Z";

export const COMPETITION_PRIZES = [
  { rank: 1, label: "£35 gift card" },
  { rank: 2, label: "1 month free platform access" },
  { rank: 3, label: "1 week free platform access" },
] as const;

export const COMPETITION_LEADERBOARD_LIMIT = 20;
