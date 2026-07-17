"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlatform } from "@/context/platform-context";
import { VisualRenderer } from "@/components/platform/question-visuals";
import type { Attempt, MockExam, Passage, Question, Role } from "@/types/platform";

const COMPACT_QUESTION_NAV_THRESHOLD = 15;

// Deterministic per-question shuffle so multiple-choice answers aren't left in a
// predictable sequential order (e.g. always option A) while staying stable across
// renders/sessions for the same question.
function seededShuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  let state = 0;
  for (let i = 0; i < seed.length; i++) state = (state * 31 + seed.charCodeAt(i)) >>> 0;
  const next = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function AnimatedButton({
  href,
  children,
  className,
  type = "button",
  onClick,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = cn(
    "gold-shimmer group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-navy-dark shadow-[0_10px_28px_-12px_rgba(180,83,9,0.72)] transition duration-200 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_16px_36px_-12px_rgba(180,83,9,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dark disabled:pointer-events-none disabled:opacity-50",
    className
  );
  const content = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </>
  );
  if (href) return <Link href={href} className={classes}>{content}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{content}</button>;
}

export function GlowCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("premium-card group relative overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-38px_rgba(180,83,9,0.45)]", className)}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/20 blur-3xl transition group-hover:bg-gold/35" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function RevealOnScroll({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, scale: 0.97, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({ children, className, childClassName }: { children: React.ReactNode; className?: string; childClassName?: string }) {
  const reduceMotion = useReducedMotion();
  const items = React.Children.toArray(children);
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <div className={className}>
      {items.map((child, index) => (
        <RevealOnScroll key={index} delay={index * 0.06} className={childClassName}>
          {child}
        </RevealOnScroll>
      ))}
    </div>
  );
}

export function PremiumBadge({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "navy" | "green" | "red" }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold",
      tone === "gold" && "border-gold/40 bg-gold/15 text-gold-dark",
      tone === "navy" && "border-navy/15 bg-navy/5 text-navy",
      tone === "green" && "border-emerald-200 bg-emerald-50 text-emerald-700",
      tone === "red" && "border-red-200 bg-red-50 text-red-700"
    )}>{children}</span>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  const reduceMotion = useReducedMotion();
  return (
    <div role="progressbar" aria-label={label ?? "Progress"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(clamped)}>
      {label && <div className="mb-1.5 flex justify-between text-xs font-semibold text-muted"><span>{label}</span><span>{Math.round(clamped)}%</span></div>}
      <div className="h-2.5 overflow-hidden rounded-full bg-cream-dark">
        <motion.div className="h-full rounded-full bg-gold" initial={{ width: reduceMotion ? `${clamped}%` : 0 }} animate={{ width: `${clamped}%` }} transition={{ duration: reduceMotion ? 0 : 0.7 }} />
      </div>
    </div>
  );
}

export function RequireAuth({ role, children }: { role?: Role; children: React.ReactNode }) {
  const { currentUser, isClientReady } = usePlatform();
  const router = useRouter();
  useEffect(() => {
    if (!isClientReady) return;
    if (!currentUser) router.replace("/login");
    if (currentUser && role && currentUser.role !== role) router.replace("/dashboard");
  }, [currentUser, isClientReady, role, router]);
  if (!isClientReady) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Lock className="mx-auto h-10 w-10 text-gold-dark" />
        <h1 className="mt-4 text-3xl font-bold text-navy">Preparing secure area</h1>
        <p className="mt-2 text-muted">Checking your local session before loading protected content.</p>
      </div>
    );
  }
  if (!currentUser) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Lock className="mx-auto h-10 w-10 text-gold-dark" />
        <h1 className="mt-4 text-3xl font-bold text-navy">Secure student area</h1>
        <p className="mt-2 text-muted">Sign in to access Summit Tuition mocks and reports.</p>
      </div>
    );
  }
  if (role && currentUser.role !== role) return null;
  return <>{children}</>;
}

export function RequireNoteAccess({ noteId, children }: { noteId: string; children: React.ReactNode }) {
  const { currentUser, notes } = usePlatform();
  const note = notes.find((item) => item.id === noteId);
  const unlocked = note?.isFree || currentUser?.role === "admin" || currentUser?.unlockedNoteIds.includes(noteId);
  if (unlocked) return <>{children}</>;
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Lock className="mx-auto h-10 w-10 text-gold-dark" />
      <h1 className="mt-4 text-3xl font-bold text-navy">This notes page is locked</h1>
      <p className="mt-2 text-muted">{note?.title ?? "This strand"} is not part of your free access yet. Contact Summit Tuition to unlock it.</p>
      <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy">
        Contact Summit Tuition <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function MockTimer({ durationMinutes, initialElapsedSeconds = 0, onExpire, visible = true }: { durationMinutes: number; initialElapsedSeconds?: number; onExpire: () => void; visible?: boolean }) {
  const [seconds, setSeconds] = useState(() => Math.max(0, durationMinutes * 60 - initialElapsedSeconds));
  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, onExpire]);
  // The countdown keeps running and still auto-submits on expiry even while hidden — only the visible readout is suppressed.
  if (!visible) {
    return <span className="rounded-full border border-line bg-cream px-3 py-1 text-sm font-bold text-muted">Timer hidden</span>;
  }
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return (
    <span
      aria-label={`${Math.floor(seconds / 60)} minutes and ${seconds % 60} seconds remaining`}
      className={cn("rounded-full px-3 py-1 text-sm font-bold", seconds < 120 ? "bg-red-50 text-red-700" : "bg-navy text-white")}
    >
      {mins}:{secs}
    </span>
  );
}

export function EnglishPassageRenderer({ passage, paragraphRefs }: { passage?: Passage; paragraphRefs?: number[] }) {
  if (!passage) return null;
  const paragraphs = passage.paragraphs?.length ? passage.paragraphs : passage.text.split(/\n{2,}/).filter(Boolean);
  return (
    <aside className="overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-[0_16px_44px_-38px_rgba(17,24,39,0.55)]">
      <div className="border-b border-gold/15 bg-cream px-6 py-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-gold-dark">Original comprehension passage</p>
        <h3 className="mt-1 font-serif text-xl font-black text-navy">{passage.title}</h3>
      </div>
      <div className="max-h-[34rem] overflow-y-auto px-6 py-6 sm:px-8">
        <div className="mx-auto max-w-2xl font-serif text-[16.5px] leading-[1.85] text-ink [text-wrap:pretty]">
          {paragraphs.map((paragraph, index) => {
            const active = paragraphRefs?.includes(index + 1);
            return (
              <p key={index} className={cn("mb-5 last:mb-0 first:first-letter:float-left first:first-letter:mr-2 first:first-letter:font-black first:first-letter:leading-[0.8] first:first-letter:text-4xl first:first-letter:text-gold-dark", active && "-mx-3 rounded-lg bg-gold/10 px-3 py-1 ring-1 ring-gold/25")}>
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/** GL spelling/punctuation "find the lettered group with the mistake" format: the question text is an
 * instruction line plus a quoted sentence, and options are the sentence split into segments plus a
 * trailing "No mistake" choice. Parsed here so the sentence can be rendered once with inline lettered
 * segments instead of repeating the full sentence in every answer row. */
function parseSegmentQuestion(question: Question) {
  const lines = question.text.split("\n");
  const instruction = lines[0]?.trim() ?? "";
  const sentence = lines.slice(1).join(" ").trim().replace(/^"|"$/g, "");
  const options = Array.isArray(question.options) ? question.options : [];
  const noMistakeIndex = options.findIndex((option) => /no mistake|^n$/i.test(option.trim()));
  const segments = noMistakeIndex >= 0 ? options.slice(0, noMistakeIndex) : options;
  const noMistakeOption = noMistakeIndex >= 0 ? options[noMistakeIndex] : undefined;
  return { instruction, sentence, segments, noMistakeOption };
}

function SegmentMistakeAnswer({
  question,
  value,
  onChange,
  review,
  isCorrectOption,
}: {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
  review?: boolean;
  isCorrectOption: (option: string) => boolean;
}) {
  const { instruction, segments, noMistakeOption } = parseSegmentQuestion(question);
  // The clauses must stay in reading order to make grammatical sense, but which
  // letter labels which clause doesn't have to — shuffle the label assignment per
  // question so the correct letter isn't predictably clustered (e.g. always "B").
  const letters = useMemo(() => {
    const pool = Array.from({ length: segments.length + (noMistakeOption ? 1 : 0) }, (_, i) => String.fromCharCode(65 + i));
    return seededShuffle(pool, question.id + "-letters");
  }, [segments.length, noMistakeOption, question.id]);
  const segmentButton = (option: string, letter: string) => {
    const selected = value === option;
    const showCorrect = review && isCorrectOption(option);
    const showWrong = review && selected && !showCorrect;
    return (
      <button
        key={option}
        type="button"
        disabled={review}
        onClick={() => onChange(option)}
        className={cn(
          "mx-0.5 my-0.5 inline-flex items-baseline gap-1 rounded-md border-b-2 border-dashed px-1.5 py-0.5 font-semibold transition disabled:cursor-default",
          selected ? "border-solid border-gold bg-gold/15 text-navy" : "border-line/70 text-ink hover:border-gold hover:bg-gold/5",
          showCorrect && "border-solid border-emerald-500 bg-emerald-50 text-emerald-800",
          showWrong && "border-solid border-red-500 bg-red-50 text-red-800"
        )}
      >
        {option}
        <sup className="text-[10px] font-black text-gold-dark">{letter}</sup>
      </button>
    );
  };
  return (
    <div className="rounded-2xl border border-gold/20 bg-cream/60 p-5">
      {instruction && <p className="text-xs font-black uppercase tracking-[0.14em] text-gold-dark">{instruction}</p>}
      <p className="mt-3 font-serif text-lg leading-[2.1] text-navy">
        {segments.map((segment, index) => segmentButton(segment, letters[index]))}
      </p>
      {noMistakeOption && (
        <div className="mt-4 border-t border-gold/15 pt-4">
          {segmentButton(noMistakeOption, letters[segments.length])}
          <span className="ml-2 text-sm font-semibold text-muted">if you think there is no mistake</span>
        </div>
      )}
    </div>
  );
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  review,
  adminPreview,
  passage,
  questionNumber,
}: {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
  review?: boolean;
  adminPreview?: boolean;
  passage?: Passage;
  questionNumber?: number;
}) {
  const correct = value ? String(question.correctAnswer).toLowerCase() === value.toLowerCase() : false;
  const hasText = typeof question.text === "string" && question.text.trim().length > 0;
  const rawOptions = useMemo(() => (Array.isArray(question.options) ? question.options : []), [question.options]);
  const isSegmentFormat = question.tags?.includes("segment-format") && rawOptions.length > 0;
  // Segment-format options map to fixed lettered sentence positions and must stay in order;
  // everything else gets a per-question shuffle so the correct answer isn't always in the same slot.
  const options = useMemo(() => (isSegmentFormat ? rawOptions : seededShuffle(rawOptions, question.id)), [isSegmentFormat, question.id, rawOptions]);
  const hasOptions = options.length > 0;
  const isChoiceQuestion = question.questionType === "multiple_choice" || question.questionType === "cloze";
  const expected = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
  const isCorrectOption = (option: string) => expected.some((item) => item.trim().toLowerCase() === option.trim().toLowerCase());
  const qualityWarnings = [
    !hasText && "Missing question text",
    !question.topic && "Missing topic",
    !question.subtopic && "Missing subtopic",
    !question.difficulty && "Missing difficulty",
    !question.correctAnswer && "Missing correct answer",
    !question.markScheme && "Missing mark scheme",
    !question.explanation && "Missing explanation",
    isChoiceQuestion && !hasOptions && "Missing answer options",
    question.subject === "English" && question.passageId && !passage && "Linked passage not found",
    question.subject === "Maths" && question.questionType === "table_graph" && !question.visual && "Maths visual missing",
  ].filter(Boolean) as string[];
  return (
    <div className="space-y-6">
      {passage && <EnglishPassageRenderer passage={passage} paragraphRefs={question.paragraphRefs} />}
      <div className="rounded-2xl border border-line bg-white p-5">
        <div className="flex flex-wrap items-center gap-2">
          {typeof questionNumber === "number" && <PremiumBadge>Question {questionNumber}</PremiumBadge>}
          <PremiumBadge tone="navy">{question.subject || "Subject"} / {question.topic || "Topic"}</PremiumBadge>
          <PremiumBadge tone={question.difficulty === "stretch" ? "red" : "navy"}>{question.difficulty || "difficulty"}</PremiumBadge>
          <span className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-bold text-navy">{question.marks || 1} mark{question.marks === 1 ? "" : "s"}</span>
          {question.paragraphRefs?.length ? <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-muted">Paragraph {question.paragraphRefs.join(", ")}</span> : null}
        </div>
        {!isSegmentFormat && <h2 className="mt-4 text-2xl font-bold leading-snug text-navy">{hasText ? question.text : "Question text missing"}</h2>}
        {question.questionType === "cloze" && hasText && (
          <div className="mt-3 rounded-xl border border-gold/20 bg-cream p-3 text-sm font-semibold text-navy">
            Cloze blank: <span className="inline-flex min-w-20 rounded-full border border-gold/40 bg-white px-4 py-1 align-middle">&nbsp;</span>
          </div>
        )}
        {!hasText && (
          <p className="mt-2 rounded-xl border border-line bg-cream p-3 text-sm text-muted">
            {adminPreview ? "This generated question needs question text before publishing." : "This question is not ready yet."}
          </p>
        )}
        {adminPreview && qualityWarnings.length > 0 && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <p className="font-black">Draft quality warnings</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {qualityWarnings.map((warning) => <li key={warning}>{warning}</li>)}
            </ul>
          </div>
        )}
      </div>
      {question.visual && <VisualRenderer visual={question.visual} adminPreview={adminPreview} />}
      {isSegmentFormat ? (
        <SegmentMistakeAnswer question={question} value={value} onChange={onChange} review={review} isCorrectOption={isCorrectOption} />
      ) : hasOptions ? (
        <fieldset className="grid gap-3">
          <legend className="sr-only">Answer options for {hasText ? question.text : "this question"}</legend>
          {options.map((option, index) => {
            const selected = value === option;
            const optionCorrect = isCorrectOption(option);
            const showCorrect = review && optionCorrect;
            const showWrong = review && selected && !optionCorrect;
            return (
            <label key={option} className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 text-sm font-semibold transition hover:border-gold focus-within:ring-2 focus-within:ring-gold/35", selected && "border-gold bg-gold/10", showCorrect && "border-emerald-300 bg-emerald-50", showWrong && "border-red-300 bg-red-50")}>
              <input className="sr-only" type="radio" name={question.id} value={option} checked={selected} onChange={() => onChange(option)} disabled={review} />
              <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-black", selected ? "border-gold bg-gold text-navy" : "border-line bg-cream text-navy", showCorrect && "border-emerald-500 bg-emerald-500 text-white", showWrong && "border-red-500 bg-red-500 text-white")}>{String.fromCharCode(65 + index)}</span>
              <span className="flex-1">{option}</span>
              {showCorrect && <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Correct</span>}
              {showWrong && <span className="inline-flex items-center gap-1 text-xs font-black text-red-700"><XCircle className="h-4 w-4" /> Your answer</span>}
            </label>
          );})}
        </fieldset>
      ) : isChoiceQuestion ? (
        <div className="rounded-xl border border-line bg-cream p-4 text-sm text-muted">
          {adminPreview ? "This question is missing answer options. Add options before publishing." : "Answer options are not available for this question yet."}
        </div>
      ) : (
        <label className="block">
          <span className="sr-only">Answer for {hasText ? question.text : "this question"}</span>
          <input value={value ?? ""} onChange={(event) => onChange(event.target.value)} disabled={review} className="h-14 w-full rounded-2xl border border-line bg-white px-4 text-base font-semibold outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25" placeholder="Type your answer" />
        </label>
      )}
      {review && (
        <div className={cn("rounded-2xl border p-5", correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50")}>
          <p className="inline-flex items-center gap-2 text-sm font-black text-navy">{correct ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-red-700" />}{correct ? "Correct" : "Needs review"}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/80 p-3 text-sm"><p className="font-black text-muted">Your answer</p><p className="mt-1 font-bold text-navy">{value || "No answer recorded"}</p></div>
            <div className="rounded-xl bg-white/80 p-3 text-sm"><p className="font-black text-muted">Correct answer</p><p className="mt-1 font-bold text-navy">{Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer}</p></div>
          </div>
          <div className="mt-4 rounded-xl bg-white/80 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-gold-dark">Explanation</p>
            <p className="mt-2 text-sm text-muted">{question.explanation || "No explanation has been added yet."}</p>
          </div>
          <div className="mt-3 rounded-xl border border-line bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-navy">Mark scheme</p>
            <p className="mt-2 text-sm font-semibold text-navy">{question.markScheme || "No mark scheme has been added yet."}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function QuestionNavigator({
  questions,
  activeIndex,
  answers,
  flagged,
  onSelect,
}: {
  questions: Question[];
  activeIndex: number;
  answers: Record<string, string>;
  flagged: string[];
  onSelect: (index: number) => void;
}) {
  const shouldCollapse = questions.length > COMPACT_QUESTION_NAV_THRESHOLD;
  const [expanded, setExpanded] = useState(!shouldCollapse);
  const buttonClass = (question: Question, index: number, compact = false) => cn(
    "shrink-0 rounded-lg border text-sm font-bold transition",
    compact ? "h-9 w-9" : "h-10",
    activeIndex === index
      ? "border-gold bg-gold text-navy shadow-[0_6px_18px_-8px_rgba(180,83,9,0.8)]"
      : answers[question.id]
        ? "border-navy bg-navy text-white"
        : "border-line bg-white text-navy hover:border-gold",
    flagged.includes(question.id) && "ring-2 ring-gold-dark ring-offset-1"
  );
  const questionButton = (question: Question, index: number, compact = false) => (
    <button
      key={`${question.id}-${compact ? "compact" : "grid"}`}
      onClick={() => onSelect(index)}
      aria-current={activeIndex === index ? "step" : undefined}
      aria-label={`Question ${index + 1}, ${answers[question.id] ? "answered" : "unanswered"}${flagged.includes(question.id) ? ", flagged" : ""}`}
      className={buttonClass(question, index, compact)}
    >
      {index + 1}
    </button>
  );

  if (shouldCollapse) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-muted">
            Q {activeIndex + 1}/{questions.length}
          </span>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="rounded-full border border-line bg-white px-3 py-1 text-xs font-black text-navy hover:border-gold"
            aria-expanded={expanded}
          >
            {expanded ? "Compact view" : "Show all questions"}
          </button>
        </div>
        {!expanded ? (
          <div className="flex max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-2" aria-label="Compact question navigation">
            {questions.map((question, index) => questionButton(question, index, true))}
          </div>
        ) : (
          <div className="grid max-h-48 grid-cols-5 gap-2 overflow-y-auto pr-1 sm:grid-cols-10" aria-label="Expanded question navigation">
            {questions.map((question, index) => questionButton(question, index))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {questions.map((question, index) => questionButton(question, index))}
    </div>
  );
}

export function MockCard({ mock, attempt, locked }: { mock: MockExam; attempt?: Attempt; locked?: boolean }) {
  const answeredCount = attempt ? Object.keys(attempt.answers).filter((key) => attempt.answers[key]).length : 0;
  return (
    <GlowCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2">
            <PremiumBadge tone={mock.style === "GL-style" ? "gold" : "navy"}>{mock.style}</PremiumBadge>
            <PremiumBadge tone={mock.subject === "Maths" ? "navy" : "gold"}>{mock.subject}</PremiumBadge>
            <PremiumBadge tone={mock.difficultyLabel === "Summit Stretch" ? "red" : "navy"}>{mock.difficultyLabel ?? "Standard"}</PremiumBadge>
          </div>
          <h3 className="mt-3 text-xl font-bold text-navy">{mock.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{mock.description}</p>
        </div>
        {locked && <Lock className="h-5 w-5 text-muted" />}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div><p className="text-muted">Subject</p><p className="font-bold text-navy">{mock.subject}</p></div>
        <div><p className="text-muted">Time</p><p className="font-bold text-navy">{mock.durationMinutes} min</p></div>
        <div><p className="text-muted">Marks</p><p className="font-bold text-navy">{mock.totalMarks}</p></div>
      </div>
      <div className="mt-6">
        {locked ? (
          <div className="rounded-2xl border border-line bg-cream p-3 text-sm text-muted">
            <strong className="text-navy">Locked.</strong> Admin approval and a manual mock unlock are required before this online paper opens.
          </div>
        ) : mock.printOnly ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-sm text-navy">
              <strong>Printable practice.</strong> No online marking or report for this paper — print it and complete it on paper.
            </div>
            <AnimatedButton href={`/mocks/${mock.id}/print`}>Open printable paper</AnimatedButton>
          </div>
        ) : attempt?.status === "in_progress" ? (
          <div className="flex flex-wrap items-center gap-3">
            <AnimatedButton href={`/mocks/${mock.id}`}>Resume mock</AnimatedButton>
            <span className="text-sm font-semibold text-muted">{answeredCount}/{mock.questionIds.length} answered locally</span>
          </div>
        ) : attempt?.status === "report_released" ? (
          <AnimatedButton href={`/mocks/${mock.id}/review`}>Open review</AnimatedButton>
        ) : attempt?.status === "submitted" ? (
          <div className="rounded-2xl border border-line bg-cream p-3 text-sm text-muted">
            <PremiumBadge tone="navy">Report pending</PremiumBadge>
            <p className="mt-2">Submitted {attempt.submittedAt?.slice(0, 10) ?? "recently"}. Your result and full review will be released after marking.</p>
          </div>
        ) : (
          <AnimatedButton href={`/mocks/${mock.id}`}>Start mock</AnimatedButton>
        )}
      </div>
    </GlowCard>
  );
}

export function WeakTopicBreakdown({ topics }: { topics: string[] }) {
  return (
    <div className="space-y-3">
      {topics.length === 0 ? <p className="text-sm text-muted">No weak topics released yet.</p> : topics.map((topic, index) => (
        <div key={topic} className="rounded-xl border border-line bg-white p-3">
          <div className="flex items-center justify-between text-sm font-bold text-navy"><span>{topic}</span><span>Priority {index + 1}</span></div>
          <ProgressBar value={Math.max(30, 74 - index * 14)} />
        </div>
      ))}
    </div>
  );
}

export function ReportPreview({ attempt, mock }: { attempt: Attempt; mock: MockExam }) {
  const percentage = attempt.maxScore ? (attempt.score / attempt.maxScore) * 100 : 0;
  return (
    <GlowCard className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <PremiumBadge tone="green"><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Report released</PremiumBadge>
          <h3 className="mt-3 text-xl font-bold text-navy">{mock.title}</h3>
        </div>
        <div className="flex items-center gap-3 text-right">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full p-1"
            style={{ background: `conic-gradient(#f59e0b ${percentage * 3.6}deg, #fff8e7 0deg)` }}
            aria-hidden="true"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-black text-navy">{Math.round(percentage)}%</div>
          </div>
          <div>
            <p className="text-3xl font-black text-navy">{attempt.score}/{attempt.maxScore}</p>
            <p className="text-sm text-muted">marked score</p>
          </div>
        </div>
      </div>
      <div className="mt-5"><ProgressBar value={percentage} label="Overall score" /></div>
      <p className="mt-4 rounded-xl bg-cream p-4 text-sm text-muted">{attempt.adminFeedback || "Tutor feedback will appear here after marking."}</p>
    </GlowCard>
  );
}

export function DashboardPreview() {
  return (
    <GlowCard className="p-6">
      <PremiumBadge>Dashboard preview</PremiumBadge>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-cream p-4"><p className="text-3xl font-black text-navy">78%</p><p className="text-sm text-muted">Readiness</p></div>
        <div className="rounded-xl bg-cream p-4"><p className="text-sm font-bold text-navy">Subject bars</p><div className="mt-3 space-y-2"><ProgressBar value={82} /><ProgressBar value={64} /></div></div>
        <div className="rounded-xl bg-cream p-4"><p className="text-sm font-bold text-navy">Next step</p><p className="mt-2 text-xs text-muted">Ratio and inference practice before Friday.</p></div>
      </div>
    </GlowCard>
  );
}

export function AnimatePresenceSoft({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
