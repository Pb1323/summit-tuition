"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangle, Flag, ShieldAlert } from "lucide-react";
import { usePlatform } from "@/context/platform-context";
import { AnimatedButton, GlowCard, MockTimer, PremiumBadge, QuestionNavigator, QuestionRenderer, RequireAuth } from "@/components/platform/ui";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function MockRoomPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { currentUser, mocks, attempts, questions: questionBank, submitAttempt, saveAttemptDraft } = usePlatform();
  const mock = mocks.find((item) => item.id === params.id);
  const existing = attempts.find((attempt) => attempt.studentId === currentUser?.id && attempt.mockId === params.id && attempt.status !== "in_progress");
  const draft = attempts.find((attempt) => attempt.studentId === currentUser?.id && attempt.mockId === params.id && attempt.status === "in_progress");
  const questions = useMemo(() => questionBank.filter((question) => mock?.questionIds.includes(question.id)), [mock, questionBank]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const active = questions[index];
  const unansweredCount = questions.filter((question) => !answers[question.id]).length;
  const elapsedSeconds = useCallback(() => Math.max(0, Math.floor((Date.now() - (startedAt ?? Date.now())) / 1000) + (draft?.timeSpentSeconds ?? 0)), [draft?.timeSpentSeconds, startedAt]);

  const submit = useCallback(() => {
    if (!mock || existing) return;
    submitAttempt(mock.id, answers, flagged, elapsedSeconds());
    router.push("/dashboard");
  }, [answers, elapsedSeconds, existing, flagged, mock, router, submitAttempt]);

  const toggleFlag = useCallback(() => {
    if (!mock || !active) return;
    setFlagged((items) => {
      const next = items.includes(active.id) ? items.filter((id) => id !== active.id) : [...items, active.id];
      saveAttemptDraft(mock.id, answers, next, elapsedSeconds());
      return next;
    });
  }, [active, answers, elapsedSeconds, mock, saveAttemptDraft]);

  function startMock() {
    if (draft) {
      setAnswers(draft.answers);
      setFlagged(draft.flaggedQuestionIds);
    }
    setStartedAt(Date.now());
    setStarted(true);
  }

  if (!mock) return <Container className="py-16"><GlowCard className="p-8"><h1 className="text-2xl font-bold text-navy">Mock not found</h1></GlowCard></Container>;

  const locked = !currentUser?.approved || !currentUser.unlockedMockIds.includes(mock.id) || !mock.published;

  return (
    <RequireAuth role="student">
      <Container className="py-10">
        {locked ? (
          <GlowCard className="p-8">
            <ShieldAlert className="h-10 w-10 text-gold-dark" />
            <h1 className="mt-4 text-3xl font-black text-navy">This mock is locked</h1>
            <p className="mt-2 text-muted">Only approved students with this mock unlocked by admin can access the online exam room.</p>
            <AnimatedButton href="/dashboard" className="mt-6">Back to dashboard</AnimatedButton>
          </GlowCard>
        ) : existing ? (
          <GlowCard className="p-8">
            <PremiumBadge tone={existing.status === "report_released" ? "green" : "navy"}>{existing.status === "report_released" ? "Report released" : "Submitted"}</PremiumBadge>
            <h1 className="mt-4 text-3xl font-black text-navy">{mock.title} already submitted</h1>
            <p className="mt-2 text-muted">Students cannot re-enter a submitted mock except in review mode after the report is released.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {existing.status === "report_released" && <AnimatedButton href={`/mocks/${mock.id}/review`}>Open review</AnimatedButton>}
              <Link href="/dashboard" className="rounded-full border border-line px-5 py-2.5 text-sm font-bold text-navy">Dashboard</Link>
            </div>
          </GlowCard>
        ) : !started ? (
          <GlowCard className="p-8">
            <PremiumBadge>{mock.style} / online only</PremiumBadge>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-navy">{mock.title}</h1>
            <p className="mt-3 max-w-3xl text-muted">{mock.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Time" value={`${mock.durationMinutes} min`} />
              <Stat label="Questions" value={questions.length} />
              <Stat label="Marks" value={mock.totalMarks} />
            </div>
            <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-navy">
              No PDF downloads or printable paper are provided. Answers are saved inside this platform. Do not copy or share question content.
            </div>
            {draft && <p className="mt-4 rounded-2xl border border-line bg-white p-3 text-sm font-semibold text-navy">Saved draft found: {Object.keys(draft.answers).length}/{questions.length} answered and {draft.flaggedQuestionIds.length} flagged.</p>}
            <AnimatedButton onClick={startMock} className="mt-8">{draft ? "Resume timed mock" : "Start timed mock"}</AnimatedButton>
          </GlowCard>
        ) : (
          <div className="mock-room-protection space-y-6">
            <div className="sticky top-20 z-20 rounded-2xl border border-line bg-white/90 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div><p className="text-sm font-bold text-gold-dark">{mock.subject}</p><h1 className="text-xl font-black text-navy">{mock.title}</h1></div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-line bg-white px-3 py-1 text-sm font-bold text-navy">{unansweredCount} unanswered</span>
                  <MockTimer durationMinutes={mock.durationMinutes} onExpire={submit} />
                </div>
              </div>
              <div className="mt-4"><QuestionNavigator questions={questions} activeIndex={index} answers={answers} flagged={flagged} onSelect={setIndex} /></div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted">
                <span className="rounded-full bg-cream px-2.5 py-1">Answered: {questions.length - unansweredCount}</span>
                <span className="rounded-full bg-cream px-2.5 py-1">Unanswered: {unansweredCount}</span>
                <span className="rounded-full bg-cream px-2.5 py-1">Flagged: {flagged.length}</span>
              </div>
            </div>
            <GlowCard className="p-6 sm:p-8">
              {active ? (
                <QuestionRenderer question={active} value={answers[active.id]} onChange={(value) => {
                  const next = { ...answers, [active.id]: value };
                  setAnswers(next);
                  saveAttemptDraft(mock.id, next, flagged, elapsedSeconds());
                }} />
              ) : (
                <p className="text-muted">This mock has no questions yet.</p>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <button disabled={!active} onClick={toggleFlag} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50", active && flagged.includes(active.id) ? "border-gold bg-gold/10 text-gold-dark" : "border-line text-navy")}>
                  <Flag className="h-4 w-4" /> {active && flagged.includes(active.id) ? "Flagged" : "Flag question"}
                </button>
                <div className="flex gap-3">
                  <button disabled={index === 0} onClick={() => setIndex(Math.max(0, index - 1))} className="rounded-full border border-line px-5 py-2 text-sm font-bold text-navy transition disabled:cursor-not-allowed disabled:opacity-45">Previous</button>
                  {index < questions.length - 1 ? (
                    <button onClick={() => setIndex(Math.min(questions.length - 1, index + 1))} className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white">Next</button>
                  ) : (
                    <button onClick={() => setShowSubmitConfirm(true)} className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy">Submit mock</button>
                  )}
                </div>
              </div>
            </GlowCard>
            {showSubmitConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="submit-title">
                <div className="max-w-lg rounded-2xl border border-gold/30 bg-white p-6 shadow-[0_28px_90px_-35px_rgba(17,24,39,0.8)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h2 id="submit-title" className="mt-4 text-2xl font-black text-navy">Submit this mock for marking?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">You have {unansweredCount} unanswered question{unansweredCount === 1 ? "" : "s"} and {flagged.length} flagged question{flagged.length === 1 ? "" : "s"}. You will not see the full review until admin releases the report.</p>
                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button onClick={() => setShowSubmitConfirm(false)} className="rounded-full border border-line px-5 py-2 text-sm font-bold text-navy">Keep working</button>
                    <button onClick={submit} className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy">Submit for marking</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </RequireAuth>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl bg-cream p-4"><p className="text-2xl font-black text-navy">{value}</p><p className="text-sm text-muted">{label}</p></div>;
}
