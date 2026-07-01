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
  return (
    <div>
      {label && <div className="mb-1.5 flex justify-between text-xs font-semibold text-muted"><span>{label}</span><span>{Math.round(clamped)}%</span></div>}
      <div className="h-2.5 overflow-hidden rounded-full bg-cream-dark">
        <motion.div className="h-full rounded-full bg-gold" initial={{ width: 0 }} animate={{ width: `${clamped}%` }} transition={{ duration: 0.7 }} />
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
  return <span className={cn("rounded-full px-3 py-1 text-sm font-bold", seconds < 120 ? "bg-red-50 text-red-700" : "bg-navy text-white")}>{mins}:{secs}</span>;
}

function VisualRenderer({ visual }: { visual: QuestionVisual }) {
  if (visual.type === "bar_chart") {
    const labels = visual.data.labels as string[];
    const values = visual.data.values as number[];
    const max = Math.max(...values);
    return (
      <div className="rounded-xl border border-line bg-cream p-4">
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
        <PremiumBadge tone="navy">{question.subject} · {question.topic}</PremiumBadge>
        <h2 className="mt-4 text-2xl font-bold text-navy">{question.text}</h2>
      </div>
      {question.visual && <VisualRenderer visual={question.visual} />}
      {question.options ? (
        <div className="grid gap-3">
          {question.options.map((option) => (
            <label key={option} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white p-4 text-sm font-semibold transition hover:border-gold", value === option && "border-gold bg-gold/10")}>
              <input type="radio" name={question.id} value={option} checked={value === option} onChange={() => onChange(option)} disabled={review} />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input value={value ?? ""} onChange={(event) => onChange(event.target.value)} disabled={review} className="h-12 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-gold" placeholder="Type your answer" />
      )}
      {review && (
        <div className={cn("rounded-xl border p-4", correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50")}>
          <p className="text-sm font-bold">{correct ? "Correct" : "Needs review"}</p>
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
  return (
    <GlowCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <PremiumBadge tone={mock.style === "GL-style" ? "gold" : "navy"}>{mock.style}</PremiumBadge>
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
          <PremiumBadge>Locked pending admin approval</PremiumBadge>
        ) : attempt?.status === "report_released" ? (
          <AnimatedButton href={`/mocks/${mock.id}/review`}>Open review</AnimatedButton>
        ) : attempt?.status === "submitted" ? (
          <PremiumBadge tone="navy">Report pending</PremiumBadge>
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
      <div className="flex items-center justify-between">
        <div>
          <PremiumBadge tone="green"><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Report released</PremiumBadge>
          <h3 className="mt-3 text-xl font-bold text-navy">{mock.title}</h3>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-navy">{attempt.score}/{attempt.maxScore}</p>
          <p className="text-sm text-muted">{Math.round(percentage)}%</p>
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
