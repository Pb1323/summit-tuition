"use client";

// "Blind retry" — a per-student review feature (src/lib/review-features.ts), not a site-wide
// feature. After a report is released, lets the student re-attempt every question they got
// wrong PLUS a handful of questions they got right (so the set doesn't visibly out itself as
// "the ones you missed"), with MCQ options reshuffled into a different order than the original
// attempt. Purely ephemeral/client-side: no Attempt row is created, nothing is written to
// Prisma — same "no schema change" category as the Spelling Tester practice tool (see CLAUDE.md).
import { useCallback, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { isCorrect } from "@/lib/assessment";
import { GlowCard, PremiumBadge, ProgressBar, QuestionRenderer } from "@/components/platform/ui";
import type { Attempt, Question } from "@/types/platform";

const DECOY_COUNT = 10;

export function RetryMistakes({ attempt, questions }: { attempt: Attempt; questions: Question[] }) {
  const [retrySet, setRetrySet] = useState<Question[] | null>(null);
  const [originallyWrongIds, setOriginallyWrongIds] = useState<Set<string>>(new Set());
  const [retryAnswers, setRetryAnswers] = useState<Record<string, string>>({});
  const [retryIndex, setRetryIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const startRetry = useCallback(() => {
    const wrong = questions.filter((question) => !isCorrect(question, attempt.answers[question.id]));
    const right = questions.filter((question) => isCorrect(question, attempt.answers[question.id]));
    // Random (not seeded) shuffles here — this whole exercise is ephemeral and never needs to
    // reproduce the same order twice, unlike the real exam's per-question option shuffle.
    const shuffledRight = [...right].sort(() => Math.random() - 0.5);
    const decoys = shuffledRight.slice(0, Math.min(DECOY_COUNT, shuffledRight.length));
    const set = [...wrong, ...decoys].sort(() => Math.random() - 0.5);
    setOriginallyWrongIds(new Set(wrong.map((question) => question.id)));
    setRetrySet(set);
    setRetryAnswers({});
    setRetryIndex(0);
    setFinished(false);
  }, [attempt.answers, questions]);

  const active = retrySet?.[retryIndex];
  const unanswered = retrySet ? retrySet.filter((question) => !retryAnswers[question.id]).length : 0;

  const summary = useMemo(() => {
    if (!finished || !retrySet) return null;
    const originalWrongQuestions = retrySet.filter((question) => originallyWrongIds.has(question.id));
    const nowCorrect = originalWrongQuestions.filter((question) => isCorrect(question, retryAnswers[question.id])).length;
    return { total: originalWrongQuestions.length, nowCorrect, stillWrong: originalWrongQuestions.length - nowCorrect };
  }, [finished, originallyWrongIds, retryAnswers, retrySet]);

  if (!retrySet) {
    return (
      <GlowCard className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <PremiumBadge tone="navy">Private practice</PremiumBadge>
            <h2 className="mt-3 text-2xl font-black text-navy">Retry your mistakes</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              A fresh, unscored run through the questions you missed — mixed in with a few you already got right, so
              you can&apos;t just tell which ones to be careful on. Nothing here is saved to your record.
            </p>
          </div>
          <button
            type="button"
            onClick={startRetry}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy/90"
          >
            <RotateCcw className="h-4 w-4" /> Retry your mistakes
          </button>
        </div>
      </GlowCard>
    );
  }

  if (finished && summary) {
    return (
      <GlowCard className="p-6">
        <PremiumBadge tone="navy">Private practice — results</PremiumBadge>
        <h2 className="mt-3 text-2xl font-black text-navy">How did the retry go?</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-3xl font-black text-emerald-800">{summary.nowCorrect}/{summary.total}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-800">previously-missed questions correct this time — likely a careless slip, not a gap.</p>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-3xl font-black text-red-700">{summary.stillWrong}/{summary.total}</p>
            <p className="mt-1 text-sm font-semibold text-red-700">still wrong second time round — worth going over with your tutor.</p>
          </div>
        </div>
        <div className="mt-6 space-y-8">
          {retrySet.map((question, questionIndex) => (
            <div key={question.id} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
              <PremiumBadge>Question {questionIndex + 1}</PremiumBadge>
              <div className="mt-4">
                <QuestionRenderer
                  question={question}
                  questionNumber={questionIndex + 1}
                  value={retryAnswers[question.id]}
                  onChange={() => undefined}
                  review
                  shuffleSeed={`${question.id}-${attempt.id}-retry`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={startRetry} className="rounded-full border border-line px-5 py-2 text-sm font-bold text-navy">Retry again</button>
          <button type="button" onClick={() => setRetrySet(null)} className="rounded-full border border-line px-5 py-2 text-sm font-bold text-navy">Close</button>
        </div>
      </GlowCard>
    );
  }

  if (!active) return null;

  return (
    <GlowCard className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PremiumBadge tone="navy">Private practice — {retryIndex + 1}/{retrySet.length}</PremiumBadge>
        <p className="text-sm font-semibold text-muted">{unanswered} unanswered</p>
      </div>
      <div className="mt-3"><ProgressBar value={((retrySet.length - unanswered) / retrySet.length) * 100} /></div>
      <div className="mt-6">
        <QuestionRenderer
          question={active}
          questionNumber={retryIndex + 1}
          value={retryAnswers[active.id]}
          onChange={(value) => setRetryAnswers((current) => ({ ...current, [active.id]: value }))}
          shuffleSeed={`${active.id}-${attempt.id}-retry`}
        />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <button type="button" onClick={() => setRetrySet(null)} className="rounded-full border border-line px-5 py-2 text-sm font-bold text-navy">Exit retry</button>
        <div className="flex gap-3">
          <button
            type="button"
            disabled={retryIndex === 0}
            onClick={() => setRetryIndex((current) => Math.max(0, current - 1))}
            className="rounded-full border border-line px-5 py-2 text-sm font-bold text-navy transition disabled:cursor-not-allowed disabled:opacity-45"
          >
            Previous
          </button>
          {retryIndex < retrySet.length - 1 ? (
            <button
              type="button"
              onClick={() => setRetryIndex((current) => Math.min(retrySet.length - 1, current + 1))}
              className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white"
            >
              Next
            </button>
          ) : (
            <button type="button" onClick={() => setFinished(true)} className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy">
              Finish retry
            </button>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
