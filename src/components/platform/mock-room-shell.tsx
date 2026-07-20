"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, CheckCircle2, Eye, EyeOff, Flag, ShieldAlert } from "lucide-react";
import { usePlatform } from "@/context/platform-context";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { AnimatedButton, EnglishPassageRenderer, GlowCard, MockTimer, PremiumBadge, ProgressBar, QuestionNavigator, QuestionRenderer, RequireAuth } from "@/components/platform/ui";
import { ENGLISH_SECTIONS, getEnglishSectionId, type EnglishSectionId, type EnglishSectionMeta } from "@/lib/english-sections";

type MockRoomShellProps = {
  mockId: string;
  mode?: "student" | "admin-preview";
};

export function MockRoomShell({ mockId, mode = "student" }: MockRoomShellProps) {
  const router = useRouter();
  const { currentUser, mocks, attempts, questions: questionBank, passages, submitAttempt, saveAttemptDraft } = usePlatform();
  const mock = mocks.find((item) => item.id === mockId);
  const existing = attempts.find((attempt) => attempt.studentId === currentUser?.id && attempt.mockId === mockId && attempt.status !== "in_progress");
  const draft = attempts.find((attempt) => attempt.studentId === currentUser?.id && attempt.mockId === mockId && attempt.status === "in_progress");
  const rawQuestions = useMemo(() => questionBank.filter((question) => mock?.questionIds.includes(question.id)), [mock, questionBank]);
  // English mocks are re-ordered into GL's real fixed section order (comprehension, spelling,
  // punctuation, cloze) regardless of the order questions happen to sit in questionIds/the bank —
  // this is what makes the section grouping/interstitials below meaningful. Non-English mocks and
  // any question that can't be classified into a section (getEnglishSectionId returns undefined)
  // pass through in their original order, appended after the sectioned questions.
  const questions = useMemo(() => {
    if (mock?.subject !== "English") return rawQuestions;
    const bucketed = new Map<EnglishSectionId, typeof rawQuestions>();
    const unsectioned: typeof rawQuestions = [];
    for (const question of rawQuestions) {
      const sectionId = getEnglishSectionId(question);
      if (!sectionId) { unsectioned.push(question); continue; }
      const bucket = bucketed.get(sectionId) ?? [];
      bucket.push(question);
      bucketed.set(sectionId, bucket);
    }
    const ordered = ENGLISH_SECTIONS.flatMap((section) => bucketed.get(section.id) ?? []);
    return [...ordered, ...unsectioned];
  }, [rawQuestions, mock?.subject]);
  // Which sections this mock actually contains at least one question for, in fixed GL order —
  // used to number interstitials ("Section 2 of 4") and to know when a new section has started.
  const presentSections = useMemo(
    () => ENGLISH_SECTIONS.filter((section) => questions.some((question) => getEnglishSectionId(question) === section.id)),
    [questions]
  );
  const isAdminPreview = mode === "admin-preview";
  const [started, setStarted] = useState(isAdminPreview);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  // Section ids the student has already clicked "Begin this section" for — the interstitial only
  // interrupts once per section per attempt, not on every question within it.
  const [beganSections, setBeganSections] = useState<EnglishSectionId[]>([]);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  // Elapsed time already banked in the resumed draft, captured once at start.
  // Reading the live draft here would compound: every save writes the new total back into the draft.
  const [baseElapsed, setBaseElapsed] = useState(0);
  const [showTimer, setShowTimer] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = window.localStorage.getItem("summit-mock-show-timer");
    return stored !== "false";
  });
  const toggleTimer = useCallback(() => {
    setShowTimer((value) => {
      const next = !value;
      window.localStorage.setItem("summit-mock-show-timer", String(next));
      return next;
    });
  }, []);
  const active = questions[index];
  const activePassage = active?.passageId ? passages.find((passage) => passage.id === active.passageId) : undefined;
  const activeSectionId = active ? getEnglishSectionId(active) : undefined;
  const activeSection = activeSectionId ? ENGLISH_SECTIONS.find((section) => section.id === activeSectionId) : undefined;
  const activeSectionIndex = activeSection ? presentSections.findIndex((section) => section.id === activeSection.id) : -1;
  const showSectionInterstitial = Boolean(activeSectionId && !beganSections.includes(activeSectionId));
  const beginSection = useCallback(() => {
    if (activeSectionId) setBeganSections((current) => (current.includes(activeSectionId) ? current : [...current, activeSectionId]));
  }, [activeSectionId]);
  const unansweredCount = questions.filter((question) => !answers[question.id]).length;
  const elapsedSeconds = useCallback(() => Math.max(0, Math.floor((Date.now() - (startedAt ?? Date.now())) / 1000) + baseElapsed), [baseElapsed, startedAt]);

  const submit = useCallback(async () => {
    if (!mock || existing || isAdminPreview) return;
    await submitAttempt(mock.id, answers, flagged, elapsedSeconds());
    router.push("/dashboard");
  }, [answers, elapsedSeconds, existing, flagged, isAdminPreview, mock, router, submitAttempt]);

  const toggleFlag = useCallback(() => {
    if (!mock || !active) return;
    const next = flagged.includes(active.id) ? flagged.filter((id) => id !== active.id) : [...flagged, active.id];
    setFlagged(next);
    if (!isAdminPreview) {
      saveAttemptDraft(mock.id, answers, next, elapsedSeconds());
      setLastSavedAt(new Date());
    }
  }, [active, answers, elapsedSeconds, flagged, isAdminPreview, mock, saveAttemptDraft]);

  function startMock() {
    if (draft && !isAdminPreview) {
      setAnswers(draft.answers);
      setFlagged(draft.flaggedQuestionIds);
      setBaseElapsed(draft.timeSpentSeconds);
      // Resuming a draft shouldn't re-show interstitials for sections already answered into —
      // treat every section with at least one saved answer as already begun.
      const answeredSectionIds = questions
        .filter((question) => draft.answers[question.id])
        .map((question) => getEnglishSectionId(question))
        .filter((id): id is EnglishSectionId => Boolean(id));
      if (answeredSectionIds.length > 0) setBeganSections((current) => Array.from(new Set([...current, ...answeredSectionIds])));
    }
    setStartedAt(Date.now());
    setStarted(true);
  }

  const inExam = started && !existing && !isAdminPreview;

  useEffect(() => {
    if (!inExam) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [inExam]);

  useEffect(() => {
    if (!inExam || showSubmitConfirm) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
      if (event.key === "ArrowLeft") setIndex((current) => Math.max(0, current - 1));
      else if (event.key === "ArrowRight") setIndex((current) => Math.min(questions.length - 1, current + 1));
      else if (event.key === "f" || event.key === "F") toggleFlag();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inExam, questions.length, showSubmitConfirm, toggleFlag]);

  if (!mock) {
    return (
      <Container className="py-16">
        <GlowCard className="p-8">
          <PremiumBadge tone="red">Mock not found</PremiumBadge>
          <h1 className="mt-4 text-2xl font-bold text-navy">Mock not found</h1>
          <p className="mt-2 text-muted">This mock may have been removed, or the draft was not saved in the current browser state.</p>
          <AnimatedButton href={isAdminPreview ? "/admin" : "/dashboard"} className="mt-6">{isAdminPreview ? "Back to admin" : "Back to dashboard"}</AnimatedButton>
        </GlowCard>
      </Container>
    );
  }

  const locked = !isAdminPreview && (!currentUser?.approved || !currentUser.unlockedMockIds.includes(mock.id) || !mock.published);
  const AuthWrapper = isAdminPreview ? AdminPreviewAuth : StudentAuth;

  return (
    <AuthWrapper>
      <Container className="py-10">
        {isAdminPreview && (
          <div className="mb-5 rounded-2xl border border-gold/25 bg-white/85 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <PremiumBadge tone="navy"><Eye className="mr-1 h-3.5 w-3.5" /> Admin Preview</PremiumBadge>
                  <PremiumBadge tone={mock.published ? "green" : "gold"}>{mock.published ? "Published" : "Draft / Unpublished"}</PremiumBadge>
                  <PremiumBadge>{mock.subject}</PremiumBadge>
                </div>
                <h1 className="mt-3 text-2xl font-black text-navy">{mock.title}</h1>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-muted">
                  <span className="rounded-full bg-cream px-3 py-1">{questions.length} questions</span>
                  <span className="rounded-full bg-cream px-3 py-1">{mock.durationMinutes} min</span>
                  <span className="rounded-full bg-cream px-3 py-1">{mock.totalMarks} marks</span>
                  <span className="rounded-full bg-cream px-3 py-1">Student view shell</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-muted">Preview-only mode: no real attempt will be created or submitted.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/admin/mocks" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-gold">
                  <ArrowLeft className="h-4 w-4" /> Mock Command Centre
                </Link>
                <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-gold">
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {locked ? (
          <GlowCard className="p-8">
            <ShieldAlert className="h-10 w-10 text-gold-dark" />
            <h1 className="mt-4 text-3xl font-black text-navy">This mock is locked</h1>
            <p className="mt-2 text-muted">Only approved students with this mock unlocked by admin can access the online exam room.</p>
            <AnimatedButton href="/dashboard" className="mt-6">Back to dashboard</AnimatedButton>
          </GlowCard>
        ) : existing && !isAdminPreview ? (
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
            {draft && <p className="mt-4 rounded-2xl border border-line bg-white p-3 text-sm font-semibold text-navy">Saved draft found: {Object.keys(draft.answers).length}/{questions.length} answered, {draft.flaggedQuestionIds.length} flagged, about {Math.max(0, Math.ceil((mock.durationMinutes * 60 - draft.timeSpentSeconds) / 60))} min remaining on the clock.</p>}
            <AnimatedButton onClick={startMock} className="mt-8">{draft ? "Resume timed mock" : "Start timed mock"}</AnimatedButton>
          </GlowCard>
        ) : (
          <div className="mock-room-protection space-y-6">
            <div className="rounded-2xl border border-line bg-white/90 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div><p className="text-sm font-bold text-gold-dark">{mock.subject}</p><h1 className="text-xl font-black text-navy">{mock.title}</h1></div>
                <div className="flex flex-wrap items-center gap-3">
                  {!isAdminPreview && lastSavedAt && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Saved {lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                  {!isAdminPreview && (
                    <button onClick={() => setShowSubmitConfirm(true)} className="rounded-full border border-gold bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold-dark transition hover:bg-gold/20">
                      Review &amp; submit
                    </button>
                  )}
                  {!isAdminPreview && (
                    <button
                      onClick={toggleTimer}
                      aria-label={showTimer ? "Hide timer" : "Show timer"}
                      title={showTimer ? "Hide timer" : "Show timer"}
                      className="rounded-full border border-line bg-white p-1.5 text-navy transition hover:bg-cream"
                    >
                      {showTimer ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  )}
                  {isAdminPreview ? <span className="rounded-full bg-navy px-3 py-1 text-sm font-bold text-white">Preview timer</span> : <MockTimer durationMinutes={mock.durationMinutes} initialElapsedSeconds={baseElapsed} onExpire={submit} visible={showTimer} />}
                </div>
              </div>
              <div className="mt-4"><QuestionNavigator questions={questions} activeIndex={index} answers={answers} flagged={flagged} onSelect={setIndex} /></div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><span className="h-2.5 w-2.5 rounded-sm bg-navy" /> Answered: {questions.length - unansweredCount}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><span className="h-2.5 w-2.5 rounded-sm border border-line bg-white" /> Unanswered: {unansweredCount}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><span className="h-2.5 w-2.5 rounded-sm ring-2 ring-gold-dark" /> Flagged: {flagged.length}</span>
                  <span className="rounded-full bg-cream px-2.5 py-1">Keys: ← → move, F flag</span>
                </div>
                <div className="w-full max-w-45 sm:w-45"><ProgressBar value={questions.length ? ((questions.length - unansweredCount) / questions.length) * 100 : 0} /></div>
              </div>
              {presentSections.length > 1 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line pt-3 text-xs font-bold">
                  {presentSections.map((section, sectionIndex) => (
                    <span
                      key={section.id}
                      className={cn(
                        "rounded-full px-2.5 py-1",
                        section.id === activeSectionId ? "bg-navy text-white" : "bg-cream text-muted"
                      )}
                    >
                      {sectionIndex + 1}. {section.shortLabel}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <GlowCard className="p-6 sm:p-8">
              {questions.length === 0 ? (
                <p className="rounded-2xl border border-line bg-cream p-4 text-sm font-semibold text-navy">{isAdminPreview ? "This draft has no questions yet. Add or generate questions before publishing." : "This mock is not ready yet."}</p>
              ) : active && activeSection && showSectionInterstitial ? (
                <SectionInterstitial
                  section={activeSection}
                  sectionNumber={activeSectionIndex + 1}
                  totalSections={presentSections.length}
                  onBegin={beginSection}
                />
              ) : active ? (
                activeSection?.id === "comprehension" && activePassage ? (
                  // Side-by-side layout for comprehension: the passage stays visible and independently
                  // scrollable in a sticky left column instead of repeating (and requiring re-scrolling
                  // past) above every single question, which is the stacked default QuestionRenderer uses
                  // for every other question type. Collapses to a single stacked column below `lg`.
                  <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                    <div className="lg:sticky lg:top-24">
                      <EnglishPassageRenderer
                        passage={activePassage}
                        paragraphRefs={active.paragraphRefs}
                        scrollClassName="max-h-[22rem] overflow-y-auto lg:max-h-[calc(100vh-9rem)]"
                      />
                    </div>
                    <div className="min-w-0">
                      <QuestionRenderer
                        question={active}
                        questionNumber={index + 1}
                        passage={activePassage}
                        hidePassage
                        value={answers[active.id]}
                        adminPreview={isAdminPreview}
                        onChange={(value) => {
                          const next = { ...answers, [active.id]: value };
                          setAnswers(next);
                          if (!isAdminPreview) {
                            saveAttemptDraft(mock.id, next, flagged, elapsedSeconds());
                            setLastSavedAt(new Date());
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <QuestionRenderer
                    question={active}
                    questionNumber={index + 1}
                    passage={activePassage}
                    value={answers[active.id]}
                    adminPreview={isAdminPreview}
                    onChange={(value) => {
                      const next = { ...answers, [active.id]: value };
                      setAnswers(next);
                      if (!isAdminPreview) {
                        saveAttemptDraft(mock.id, next, flagged, elapsedSeconds());
                        setLastSavedAt(new Date());
                      }
                    }}
                  />
                )
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
                  ) : isAdminPreview ? (
                    <button disabled className="rounded-full border border-line bg-cream px-5 py-2 text-sm font-bold text-muted">Preview only</button>
                  ) : (
                    <button onClick={() => setShowSubmitConfirm(true)} className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy">Submit mock</button>
                  )}
                </div>
              </div>
            </GlowCard>
            {showSubmitConfirm && !isAdminPreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="submit-title">
                <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gold/30 bg-white p-6 shadow-[0_28px_90px_-35px_rgba(17,24,39,0.8)]">
                  {unansweredCount > 0 ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark"><AlertTriangle className="h-6 w-6" /></div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-6 w-6" /></div>
                  )}
                  <h2 id="submit-title" className="mt-4 text-2xl font-black text-navy">Review before you submit</h2>
                  {unansweredCount > 0 ? (
                    <p className="mt-2 rounded-xl border border-gold/30 bg-gold/10 p-3 text-sm font-semibold leading-relaxed text-navy">
                      You still have {unansweredCount} unanswered question{unansweredCount === 1 ? "" : "s"}{flagged.length > 0 ? ` and ${flagged.length} flagged for another look` : ""}. Tap a question below to jump back to it.
                    </p>
                  ) : (
                    <p className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold leading-relaxed text-emerald-800">
                      All {questions.length} questions answered{flagged.length > 0 ? `, with ${flagged.length} still flagged for another look` : ""}. Once submitted you cannot re-enter this mock until the report is released.
                    </p>
                  )}
                  <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-10">
                    {questions.map((question, questionIndex) => {
                      const answered = Boolean(answers[question.id]);
                      const isFlagged = flagged.includes(question.id);
                      return (
                        <button
                          key={question.id}
                          onClick={() => { setIndex(questionIndex); setShowSubmitConfirm(false); }}
                          aria-label={`Return to question ${questionIndex + 1}, ${answered ? "answered" : "unanswered"}${isFlagged ? ", flagged" : ""}`}
                          className={cn(
                            "h-10 rounded-lg border text-sm font-bold transition hover:border-gold",
                            answered ? "border-navy bg-navy text-white" : "border-red-200 bg-red-50 text-red-700",
                            isFlagged && "ring-2 ring-gold-dark ring-offset-1"
                          )}
                        >
                          {questionIndex + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><span className="h-2.5 w-2.5 rounded-sm bg-navy" /> Answered</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><span className="h-2.5 w-2.5 rounded-sm border border-red-200 bg-red-50" /> Unanswered</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1"><span className="h-2.5 w-2.5 rounded-sm ring-2 ring-gold-dark" /> Flagged</span>
                  </div>
                  <p className="mt-4 text-sm text-muted">Your answers stay saved on this device. You will not see the full review until admin releases the report.</p>
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
    </AuthWrapper>
  );
}

function StudentAuth({ children }: { children: React.ReactNode }) {
  return <RequireAuth role="student">{children}</RequireAuth>;
}

function AdminPreviewAuth({ children }: { children: React.ReactNode }) {
  return <RequireAuth role="admin">{children}</RequireAuth>;
}

/**
 * Full-width interstitial shown once per section per attempt (comprehension, spelling, punctuation,
 * cloze, in that fixed GL order — see src/lib/english-sections.ts), so students get a clear "new
 * section starting" moment with GL-style instructions instead of question types silently changing
 * mid-flow. Dismissed by clicking through; not shown again for that section this attempt.
 */
function SectionInterstitial({
  section,
  sectionNumber,
  totalSections,
  onBegin,
}: {
  section: EnglishSectionMeta;
  sectionNumber: number;
  totalSections: number;
  onBegin: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center sm:p-12">
      <PremiumBadge tone="gold">Section {sectionNumber} of {totalSections}</PremiumBadge>
      <h2 className="mt-4 text-3xl font-black text-navy">{section.label}</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted">{section.instructions}</p>
      <AnimatedButton onClick={onBegin} className="mt-8">Begin this section</AnimatedButton>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl bg-cream p-4"><p className="text-2xl font-black text-navy">{value}</p><p className="text-sm text-muted">{label}</p></div>;
}
