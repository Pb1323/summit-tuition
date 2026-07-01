"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Flag, ShieldAlert } from "lucide-react";
import { QUESTIONS } from "@/data/platform";
import { usePlatform } from "@/context/platform-context";
import { AnimatedButton, GlowCard, MockTimer, PremiumBadge, QuestionNavigator, QuestionRenderer, RequireAuth } from "@/components/platform/ui";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function MockRoomPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { currentUser, mocks, attempts, submitAttempt, saveAttemptDraft } = usePlatform();
  const mock = mocks.find((item) => item.id === params.id);
  const existing = attempts.find((attempt) => attempt.studentId === currentUser?.id && attempt.mockId === params.id && attempt.status !== "in_progress");
  const questions = useMemo(() => QUESTIONS.filter((question) => mock?.questionIds.includes(question.id)), [mock]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<string[]>([]);

  const submit = useCallback(() => {
    if (!mock || existing) return;
    submitAttempt(mock.id, answers, flagged, 0);
    router.push("/dashboard");
  }, [answers, existing, flagged, mock, router, submitAttempt]);

  if (!mock) return <Container className="py-16"><GlowCard className="p-8"><h1 className="text-2xl font-bold text-navy">Mock not found</h1></GlowCard></Container>;

  const locked = !currentUser?.approved || !currentUser.unlockedMockIds.includes(mock.id) || !mock.published;
  const active = questions[index];

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
            <PremiumBadge>{mock.style} · online only</PremiumBadge>
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
            <AnimatedButton onClick={() => setStarted(true)} className="mt-8">Start timed mock</AnimatedButton>
          </GlowCard>
        ) : (
          <div className="mock-room-protection space-y-6" onCopy={(event) => event.preventDefault()} onContextMenu={(event) => event.preventDefault()}>
            <div className="sticky top-20 z-20 rounded-2xl border border-line bg-white/90 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div><p className="text-sm font-bold text-gold-dark">{mock.subject}</p><h1 className="text-xl font-black text-navy">{mock.title}</h1></div>
                <MockTimer durationMinutes={mock.durationMinutes} onExpire={submit} />
              </div>
              <div className="mt-4"><QuestionNavigator questions={questions} activeIndex={index} answers={answers} flagged={flagged} onSelect={setIndex} /></div>
            </div>
            <GlowCard className="p-6 sm:p-8">
              <QuestionRenderer question={active} value={answers[active.id]} onChange={(value) => {
                const next = { ...answers, [active.id]: value };
                setAnswers(next);
                saveAttemptDraft(mock.id, next, flagged, 0);
              }} />
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <button onClick={() => setFlagged((items) => items.includes(active.id) ? items.filter((id) => id !== active.id) : [...items, active.id])} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold", flagged.includes(active.id) ? "border-gold bg-gold/10 text-gold-dark" : "border-line text-navy")}>
                  <Flag className="h-4 w-4" /> {flagged.includes(active.id) ? "Flagged" : "Flag question"}
                </button>
                <div className="flex gap-3">
                  <button onClick={() => setIndex(Math.max(0, index - 1))} className="rounded-full border border-line px-5 py-2 text-sm font-bold text-navy">Previous</button>
                  {index < questions.length - 1 ? (
                    <button onClick={() => setIndex(Math.min(questions.length - 1, index + 1))} className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white">Next</button>
                  ) : (
                    <button onClick={() => window.confirm("Submit this mock for marking? You will not see the full review until admin releases the report.") && submit()} className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy">Submit mock</button>
                  )}
                </div>
              </div>
            </GlowCard>
          </div>
        )}
      </Container>
    </RequireAuth>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl bg-cream p-4"><p className="text-2xl font-black text-navy">{value}</p><p className="text-sm text-muted">{label}</p></div>;
}
