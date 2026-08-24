"use client";

import { useEffect, useState } from "react";
import { Trophy, Medal, Award, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RequireAuth, RevealOnScroll } from "@/components/platform/ui";
import { COMPETITION_PRIZES } from "@/data/competition";

interface Row {
  rank: number;
  name: string;
  score: number;
  maxScore: number;
  timeSpentSeconds: number;
  isSelf: boolean;
}

interface LeaderboardData {
  deadline: string;
  totalEntries: number;
  top: Row[];
  selfRow: Row | null;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function rankIcon(rank: number) {
  if (rank === 1) return <Trophy className="h-5 w-5 text-gold-dark" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-navy/60" />;
  if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
  return <span className="w-5 text-center text-sm font-semibold text-muted">{rank}</span>;
}

function LeaderboardBody() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  return (
    <Container className="py-10">
      <RevealOnScroll>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">Ranking Leaderboard</h1>
          <p className="mt-3 text-muted">
            One paper. Top score wins. Ranked by score, then fastest time as tiebreak.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {COMPETITION_PRIZES.map((prize) => (
              <div key={prize.rank} className="premium-card rounded-full px-4 py-2 text-sm font-medium text-navy">
                #{prize.rank} — {prize.label}
              </div>
            ))}
          </div>
          {data && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted">
              <Clock className="h-4 w-4" /> Entries close {new Date(data.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
            </p>
          )}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <Card className="mx-auto mt-8 max-w-2xl">
          <CardHeader className="border-b border-navy/10 pb-4">
            <div className="grid grid-cols-[2.5rem_1fr_5rem_5rem] gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <span>Rank</span>
              <span>Student</span>
              <span className="text-right">Score</span>
              <span className="text-right">Time</span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {error && <p className="text-center text-muted">Couldn&apos;t load the leaderboard. Try refreshing.</p>}
            {!data && !error && <p className="text-center text-muted">Loading leaderboard…</p>}
            {data && data.top.length === 0 && (
              <p className="text-center text-muted">No entries yet — be the first to submit a full attempt.</p>
            )}
            <div className="space-y-2">
              {data?.top.map((row) => (
                <div
                  key={row.rank}
                  className={`grid grid-cols-[2.5rem_1fr_5rem_5rem] items-center gap-2 rounded-lg px-2 py-2 ${
                    row.isSelf ? "bg-gold-light/40 ring-1 ring-gold-dark/40" : ""
                  }`}
                >
                  <span className="flex justify-center">{rankIcon(row.rank)}</span>
                  <span className="truncate font-medium text-navy">
                    {row.name}
                    {row.isSelf ? " (you)" : ""}
                  </span>
                  <span className="text-right text-sm text-navy">
                    {row.score}/{row.maxScore}
                  </span>
                  <span className="text-right text-sm text-muted">{formatTime(row.timeSpentSeconds)}</span>
                </div>
              ))}
              {data?.selfRow && (
                <>
                  <div className="my-2 border-t border-dashed border-navy/15" />
                  <div className="grid grid-cols-[2.5rem_1fr_5rem_5rem] items-center gap-2 rounded-lg bg-gold-light/40 px-2 py-2 ring-1 ring-gold-dark/40">
                    <span className="flex justify-center">{rankIcon(data.selfRow.rank)}</span>
                    <span className="truncate font-medium text-navy">{data.selfRow.name} (you)</span>
                    <span className="text-right text-sm text-navy">
                      {data.selfRow.score}/{data.selfRow.maxScore}
                    </span>
                    <span className="text-right text-sm text-muted">{formatTime(data.selfRow.timeSpentSeconds)}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </RevealOnScroll>
    </Container>
  );
}

export default function LeaderboardPage() {
  return (
    <RequireAuth>
      <LeaderboardBody />
    </RequireAuth>
  );
}
