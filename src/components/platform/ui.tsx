"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlatform } from "@/context/platform-context";
import type { Attempt, MockExam, Question, QuestionVisual, Role } from "@/types/platform";

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
    <div className={cn("group relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_60px_-42px_rgba(17,24,39,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-38px_rgba(180,83,9,0.45)]", className)}>
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
      initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
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

export function MockTimer({ durationMinutes, onExpire }: { durationMinutes: number; onExpire: () => void }) {
  const [seconds, setSeconds] = useState(durationMinutes * 60);
  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, onExpire]);
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

function VisualRenderer({ visual }: { visual: QuestionVisual }) {
  if (visual.type === "table") {
    const headers = visual.data.headers as string[];
    const rows = visual.data.rows as string[][];
    return (
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <p className="bg-cream px-4 py-2 text-xs font-bold text-muted">{visual.title}</p>
        <table className="w-full text-center text-sm">
          <thead className="bg-cream-dark text-navy"><tr>{headers.map((header) => <th key={header} scope="col" className="p-3 font-bold">{header}</th>)}</tr></thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className="border-t border-line">{row.map((cell, index) => <td key={`${rowIndex}-${index}`} className="p-3">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  if (visual.type === "bar_chart") {
    const labels = visual.data.labels as string[];
    const values = visual.data.values as number[];
    const max = Math.max(...values);
    return (
      <div className="rounded-xl border border-line bg-cream p-4" role="img" aria-label={`${visual.title}: ${labels.map((label, index) => `${label} ${values[index]}`).join(", ")}`}>
        <p className="text-xs font-bold text-muted">{visual.title}</p>
        <div className="mt-3 flex h-36 items-end gap-4">
          {labels.map((label, index) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-gold" style={{ height: `${(values[index] / max) * 100}%` }} />
              <span className="text-xs font-semibold text-navy">{label}</span>
              <span className="text-xs text-muted">{values[index]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (visual.type === "line_graph") {
    const labels = visual.data.labels as string[];
    const values = visual.data.values as number[];
    const max = Math.max(...values);
    const points = values.map((value, index) => `${30 + index * 44},${130 - (value / max) * 90}`).join(" ");
    return (
      <div className="rounded-xl border border-line bg-cream p-4" role="img" aria-label={`${visual.title}: ${labels.map((label, index) => `${label} ${values[index]}`).join(", ")}`}>
        <p className="text-xs font-bold text-muted">{visual.title}</p>
        <svg viewBox="0 0 240 150" className="mt-2 h-40 w-full">
          <line x1="28" y1="130" x2="222" y2="130" stroke="#B45309" strokeWidth="2" />
          <line x1="28" y1="24" x2="28" y2="130" stroke="#B45309" strokeWidth="2" />
          <polyline points={points} fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {values.map((value, index) => <circle key={index} cx={30 + index * 44} cy={130 - (value / max) * 90} r="4" fill="#172033" />)}
        </svg>
      </div>
    );
  }
  if (visual.type === "number_line") {
    const points = (visual.data.points as number[]) ?? [0, 1];
    return (
      <div className="rounded-xl border border-line bg-cream p-4" role="img" aria-label={`${visual.title}: points ${points.join(", ")}`}>
        <p className="text-xs font-bold text-muted">{visual.title}</p>
        <svg viewBox="0 0 260 80" className="mt-2 h-24 w-full">
          <line x1="25" y1="40" x2="235" y2="40" stroke="#172033" strokeWidth="3" />
          {points.map((point, index) => <g key={point}><line x1={35 + index * 55} y1="32" x2={35 + index * 55} y2="48" stroke="#B45309" strokeWidth="2" /><text x={35 + index * 55} y="66" textAnchor="middle" className="fill-[#111827] text-xs font-bold">{point}</text></g>)}
        </svg>
      </div>
    );
  }
  if (visual.type === "coordinate_grid") {
    const plotted = (visual.data.points as number[][]) ?? [[1, 1], [4, 3]];
    return (
      <div className="rounded-xl border border-line bg-cream p-4" role="img" aria-label={`${visual.title}: plotted coordinates ${plotted.map((point) => `(${point[0]}, ${point[1]})`).join(", ")}`}>
        <p className="text-xs font-bold text-muted">{visual.title}</p>
        <svg viewBox="0 0 180 180" className="mx-auto mt-2 h-48 w-full max-w-xs">
          {Array.from({ length: 7 }).map((_, index) => <g key={index}><line x1={30 + index * 20} y1="20" x2={30 + index * 20} y2="150" stroke="#FDE68A" /><line x1="20" y1={30 + index * 20} x2="150" y2={30 + index * 20} stroke="#FDE68A" /></g>)}
          <line x1="30" y1="150" x2="150" y2="150" stroke="#172033" strokeWidth="2" />
          <line x1="30" y1="150" x2="30" y2="20" stroke="#172033" strokeWidth="2" />
          {plotted.map((point) => <circle key={point.join("-")} cx={30 + point[0] * 20} cy={150 - point[1] * 20} r="5" fill="#F59E0B" />)}
        </svg>
      </div>
    );
  }
  if (visual.type === "shape") {
    return (
      <div className="rounded-xl border border-line bg-cream p-4">
        <svg viewBox="0 0 240 140" className="h-40 w-full" role="img" aria-label={visual.title}>
          <rect x="38" y="32" width="164" height="74" fill="#FEF3C7" stroke="#B45309" strokeWidth="4" rx="4" />
          <text x="120" y="24" textAnchor="middle" className="fill-[#111827] text-sm font-bold">9 cm</text>
          <text x="214" y="75" className="fill-[#111827] text-sm font-bold">4 cm</text>
        </svg>
      </div>
    );
  }
  return null;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  review,
}: {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
  review?: boolean;
}) {
  const correct = value ? String(question.correctAnswer).toLowerCase() === value.toLowerCase() : false;
  return (
    <div className="space-y-5">
      <div>
        <PremiumBadge tone="navy">{question.subject} / {question.topic}</PremiumBadge>
        <h2 className="mt-4 text-2xl font-bold text-navy">{question.text}</h2>
      </div>
      {question.visual && <VisualRenderer visual={question.visual} />}
      {question.options ? (
        <fieldset className="grid gap-3">
          <legend className="sr-only">Answer options for {question.text}</legend>
          {question.options.map((option) => (
            <label key={option} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white p-4 text-sm font-semibold transition hover:border-gold", value === option && "border-gold bg-gold/10")}>
              <input type="radio" name={question.id} value={option} checked={value === option} onChange={() => onChange(option)} disabled={review} />
              {option}
            </label>
          ))}
        </fieldset>
      ) : (
        <label className="block">
          <span className="sr-only">Answer for {question.text}</span>
          <input value={value ?? ""} onChange={(event) => onChange(event.target.value)} disabled={review} className="h-12 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-gold" placeholder="Type your answer" />
        </label>
      )}
      {review && (
        <div className={cn("rounded-xl border p-4", correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50")}>
          <p className="text-sm font-bold">{correct ? "Correct" : "Needs review"}</p>
          <p className="mt-1 text-sm">Your answer: <strong>{value || "No answer recorded"}</strong></p>
          <p className="mt-1 text-sm">Correct answer: <strong>{Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer}</strong></p>
          <p className="mt-2 text-sm text-muted">{question.explanation}</p>
          <p className="mt-2 text-xs font-semibold text-navy">Mark scheme: {question.markScheme}</p>
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
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {questions.map((question, index) => (
        <button
          key={question.id}
          onClick={() => onSelect(index)}
          aria-current={activeIndex === index ? "step" : undefined}
          aria-label={`Question ${index + 1}, ${answers[question.id] ? "answered" : "unanswered"}${flagged.includes(question.id) ? ", flagged" : ""}`}
          className={cn(
            "h-10 rounded-lg border text-sm font-bold",
            activeIndex === index ? "border-gold bg-gold text-navy" : "border-line bg-white text-navy",
            answers[question.id] && activeIndex !== index && "bg-cream-dark",
            flagged.includes(question.id) && "ring-2 ring-gold-dark"
          )}
        >
          {index + 1}
        </button>
      ))}
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
