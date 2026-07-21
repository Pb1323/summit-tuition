"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Lock, Sparkles, XCircle, GraduationCap, Calculator, BookOpenText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlatform } from "@/context/platform-context";
import { SHOWCASE_MOCKS, type ShowcaseMock, type ShowcaseQuestion } from "@/data/showcase-mocks";
import { ShowcaseVisual } from "@/components/sections/showcase-visuals";

const NO_MISTAKE = "No mistake — the sentence is correct";
const SEGMENT_LETTERS = ["A", "B", "C", "D"];

const ANON_KEY = "summit-freemock-anon-completed";
const ANON_LIMIT = 1;
const ACCOUNT_LIMIT = 3;

function acctKey(userId: string) {
  return `summit-freemock-acct-${userId}-completed`;
}

/**
 * Module-level cache + useSyncExternalStore, mirroring platform-context.tsx's own store
 * pattern. Plain useState+useEffect reads of localStorage cause a hydration mismatch (server
 * always renders "0 completed", client immediately corrects it once mounted) — a returning
 * visitor who'd already used their free mock would see the picker flash from "1/1 left" to
 * "0/1 left", surfacing as a hydration error in dev. useSyncExternalStore's getServerSnapshot
 * lets the first client render match SSR exactly, then resync silently post-hydration.
 */
const EMPTY_COMPLETED: string[] = [];
const completedCache = new Map<string, string[]>();
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribeCompleted(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readCompletedFromStorage(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function getCompletedSnapshot(key: string): string[] {
  if (!completedCache.has(key)) {
    completedCache.set(key, readCompletedFromStorage(key));
  }
  return completedCache.get(key)!;
}

function getServerCompletedSnapshot(): string[] {
  return EMPTY_COMPLETED;
}

function markCompleted(key: string, mockId: string) {
  const existing = getCompletedSnapshot(key);
  if (existing.includes(mockId)) return;
  const next = [...existing, mockId];
  completedCache.set(key, next);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(next));
  }
  emitChange();
}

function useCompletedIds(key: string): string[] {
  return useSyncExternalStore(
    subscribeCompleted,
    () => getCompletedSnapshot(key),
    getServerCompletedSnapshot
  );
}

type ViewState = { mode: "picker" } | { mode: "running"; mock: ShowcaseMock } | { mode: "finished"; mock: ShowcaseMock; correctCount: number };

function correctAnswerFor(question: ShowcaseQuestion): string {
  if (question.kind === "maths") return question.correctAnswer;
  return question.mistakeIndex === null ? NO_MISTAKE : SEGMENT_LETTERS[question.mistakeIndex];
}

function QuestionRunner({ mock, onFinish }: { mock: ShowcaseMock; onFinish: (correctCount: number) => void }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const total = mock.questions.length;
  const question = mock.questions[index];
  const correctAnswer = correctAnswerFor(question);
  const isCorrect = selected === correctAnswer;

  const grammarOptions = useMemo(() => {
    if (question.kind !== "grammar") return [];
    return [...question.segments.map((_, i) => SEGMENT_LETTERS[i]), NO_MISTAKE];
  }, [question]);

  function handleSelect(option: string) {
    if (selected !== null) return;
    setSelected(option);
    if (option === correctAnswer) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (index === total - 1) {
      onFinish(correctCount);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  return (
    <div className="relative rounded-2xl border border-gold/25 bg-white/95 p-5 shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)] sm:p-6">
      <div className="flex items-center justify-between">
        <Badge variant="navy">Question {index + 1} of {total}</Badge>
        <span className="text-xs font-semibold text-muted">{mock.title}</span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream">
        <div
          className="h-full rounded-full bg-gold transition-all duration-300"
          style={{ width: `${((index + (selected !== null ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {question.kind === "maths" && (
        <div className="mt-4">
          <ShowcaseVisual key={index} config={question.visual} />
        </div>
      )}

      <p className={cn("text-base leading-relaxed text-navy", question.kind === "maths" ? "mt-3" : "mt-4")}>
        {question.prompt}
      </p>

      {question.kind === "grammar" && (
        <p className="mt-3 rounded-xl bg-cream/60 p-3.5 text-sm leading-relaxed text-navy/80">
          {question.segments.map((segment, i) => (
            <span key={i}>
              <span className="mr-1 rounded bg-navy/10 px-1.5 py-0.5 text-[10px] font-bold text-navy align-middle">
                {SEGMENT_LETTERS[i]}
              </span>
              <span className="italic">{segment}</span>{" "}
            </span>
          ))}
        </p>
      )}

      <div className={cn("mt-5 grid gap-3", question.kind === "maths" ? "grid-cols-2" : "grid-cols-1")}>
        {(question.kind === "maths" ? question.options : grammarOptions).map((option) => {
          const isChosen = selected === option;
          const showState = selected !== null;
          const isRight = option === correctAnswer;
          return (
            <motion.button
              key={option}
              type="button"
              disabled={selected !== null}
              onClick={() => handleSelect(option)}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors",
                !showState && "border-line bg-cream/50 text-navy hover:border-gold hover:bg-gold/10",
                showState && isRight && "border-emerald-300 bg-emerald-50 text-emerald-700",
                showState && isChosen && !isRight && "border-rose-300 bg-rose-50 text-rose-700",
                showState && !isChosen && !isRight && "border-line bg-cream/30 text-muted opacity-60"
              )}
            >
              {question.kind === "grammar" && option !== NO_MISTAKE ? `Segment ${option}` : option}
              {showState && isRight && <CheckCircle2 className="h-4 w-4 shrink-0" />}
              {showState && isChosen && !isRight && <XCircle className="h-4 w-4 shrink-0" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-4 flex items-start gap-2 rounded-xl border p-3.5 text-sm leading-relaxed",
              isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-navy/10 bg-cream p-3.5 text-navy"
            )}
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            <span>
              {isCorrect ? "Correct — " : "Not quite — "}
              {question.explanation}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {selected && (
        <Button onClick={handleNext} size="md" className="mt-4 w-full">
          {index === total - 1 ? "See my result" : "Next question"}
        </Button>
      )}
    </div>
  );
}

export function FreeMockPreview() {
  const { currentUser } = usePlatform();
  const [view, setView] = useState<ViewState>({ mode: "picker" });

  const storageKey = currentUser ? acctKey(currentUser.id) : ANON_KEY;
  const completedIds = useCompletedIds(storageKey);

  const isPaid = currentUser?.paymentStatus === "paid";
  const limit = currentUser ? ACCOUNT_LIMIT : ANON_LIMIT;
  const remaining = Math.max(0, limit - completedIds.length);
  const atLimit = !isPaid && remaining <= 0;

  function handleStart(mock: ShowcaseMock) {
    setView({ mode: "running", mock });
  }

  function handleFinish(mock: ShowcaseMock, correctCount: number) {
    markCompleted(storageKey, mock.id);
    setView({ mode: "finished", mock, correctCount });
  }

  if (isPaid) {
    return (
      <div className="rounded-2xl border border-gold/25 bg-white/95 p-6 text-center shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
          <GraduationCap className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy">You already have full mock access</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          These showcase mocks are just for new visitors — your plan already unlocks the complete mock library.
        </p>
        <Button href="/dashboard" size="md" className="mt-5">
          Go to my dashboard
        </Button>
      </div>
    );
  }

  if (view.mode === "running") {
    return <QuestionRunner mock={view.mock} onFinish={(correctCount) => handleFinish(view.mock, correctCount)} />;
  }

  if (view.mode === "finished") {
    return (
      <div className="relative rounded-2xl border border-gold/25 bg-white/95 p-6 text-center shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)] sm:p-7">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
          <Lock className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy">
          {view.correctCount}/{view.mock.questions.length} correct on {view.mock.title}
        </h3>
        {!currentUser ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              That&apos;s your one free mock as a visitor. Create a free account to unlock a few more free mocks,
              still 10 questions each.
            </p>
            <Button href="/account" size="md" className="mt-5">
              Get a free account for more mocks
            </Button>
          </>
        ) : atLimit ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              You&apos;ve used all {ACCOUNT_LIMIT} of your free showcase mocks. Upgrade to Pro for full access to
              every mock in our library — no 10-question limit.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <Button href="/pricing#platform" size="md">
                Upgrade to Pro
              </Button>
              <Button onClick={() => setView({ mode: "picker" })} variant="outline" size="md">
                Back to free mocks
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Nice work — you have {remaining} more free showcase {remaining === 1 ? "mock" : "mocks"} available
              (10 questions each) before upgrading to Pro.
            </p>
            <Button onClick={() => setView({ mode: "picker" })} size="md" className="mt-5">
              Try another free mock
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gold/25 bg-white/95 p-5 shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy">Pick a free mock to try</h3>
        <Badge variant="navy">{currentUser ? `${remaining}/${ACCOUNT_LIMIT} left` : `${remaining}/${ANON_LIMIT} left`}</Badge>
      </div>
      <p className="mt-1.5 text-sm text-muted">
        10 real 11+-style questions, marked instantly as you go.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {SHOWCASE_MOCKS.map((mock) => {
          const done = completedIds.includes(mock.id);
          const locked = !done && atLimit;
          return (
            <button
              key={mock.id}
              type="button"
              disabled={locked}
              onClick={() => handleStart(mock)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
                locked
                  ? "cursor-not-allowed border-line bg-cream/30 opacity-50"
                  : "border-line bg-cream/50 hover:border-gold hover:bg-gold/10"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-gold-light">
                  {mock.subject === "maths" ? <Calculator className="h-4 w-4" /> : <BookOpenText className="h-4 w-4" />}
                </span>
                <span className="text-sm font-bold text-navy">{mock.title}</span>
                {done && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              </span>
              <span className="text-xs leading-relaxed text-muted">{mock.tagline}</span>
              {locked && <span className="text-[11px] font-bold text-gold-dark">Unlock with Pro</span>}
            </button>
          );
        })}
      </div>

      {atLimit && (
        <div className="mt-5 rounded-xl border border-gold/25 bg-cream/60 p-4 text-center">
          <p className="text-sm font-semibold text-navy">
            {currentUser
              ? "You've used all your free showcase mocks. Upgrade to Pro for full access to every mock."
              : "That's your free preview. Create a free account for more free mock access."}
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {currentUser ? (
              <Button href="/pricing#platform" size="sm">
                Upgrade to Pro
              </Button>
            ) : (
              <Button href="/account" size="sm">
                Get a free account
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
