"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlatform } from "@/context/platform-context";
import type { Attempt, MockExam, Passage, Question, QuestionVisual, Role } from "@/types/platform";

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

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isFinite(item));
}

function VisualRenderer({ visual, adminPreview }: { visual: QuestionVisual; adminPreview?: boolean }) {
  const type = visual.type.replace("_", "").toLowerCase();
  const title = visual.title || "Question visual";
  const frame = (children: React.ReactNode, summary: string) => (
    <div className="overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-[0_16px_44px_-36px_rgba(17,24,39,0.45)]" role="img" aria-label={summary}>
      <div className="border-b border-gold/15 bg-cream px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-gold-dark">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  );

  if (type === "table") {
    const headers = visual.data.headers;
    const rows = visual.data.rows;
    if (!isStringArray(headers) || !Array.isArray(rows)) return <VisualFallback adminPreview={adminPreview} />;
    return frame(
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-center text-sm">
          <thead><tr>{headers.map((header) => <th key={header} scope="col" className="border-b border-gold/20 bg-cream px-4 py-3 font-black text-navy first:rounded-tl-xl last:rounded-tr-xl">{header}</th>)}</tr></thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{isStringArray(row) ? row.map((cell, index) => <td key={`${rowIndex}-${index}`} className="border-b border-line bg-white px-4 py-3 font-semibold text-ink">{cell}</td>) : <td className="border-b border-line px-4 py-3 text-muted" colSpan={headers.length}>Missing row data</td>}</tr>)}</tbody>
        </table>
      </div>,
      `${title}: ${headers.join(", ")}`
    );
  }

  if (type === "barchart") {
    const labels = visual.data.labels;
    const values = visual.data.values;
    if (!isStringArray(labels) || !isNumberArray(values) || labels.length === 0 || values.length === 0) return <VisualFallback adminPreview={adminPreview} />;
    const max = Math.max(...values, 1);
    return frame(
      <svg viewBox="0 0 360 220" className="h-64 w-full max-w-full">
        <line x1="46" y1="178" x2="330" y2="178" stroke="#172033" strokeWidth="2" />
        <line x1="46" y1="26" x2="46" y2="178" stroke="#172033" strokeWidth="2" />
        {[0, 1, 2, 3].map((tick) => <line key={tick} x1="46" y1={178 - tick * 40} x2="330" y2={178 - tick * 40} stroke="#f7e8bd" strokeWidth="1" />)}
        {labels.map((label, index) => {
          const barHeight = Math.max(8, (values[index] / max) * 128);
          const x = 68 + index * (240 / Math.max(labels.length, 1));
          return (
            <g key={label}>
              <rect x={x} y={178 - barHeight} width="34" height={barHeight} rx="5" fill="#f59e0b" />
              <text x={x + 17} y="200" textAnchor="middle" className="fill-[#172033] text-[12px] font-bold">{label}</text>
              <text x={x + 17} y={170 - barHeight} textAnchor="middle" className="fill-[#111827] text-[12px] font-bold">{values[index]}</text>
            </g>
          );
        })}
      </svg>,
      `${title}: ${labels.map((label, index) => `${label} ${values[index]}`).join(", ")}`
    );
  }

  if (type === "linegraph") {
    const labels = visual.data.labels;
    const values = visual.data.values;
    if (!isStringArray(labels) || !isNumberArray(values) || labels.length === 0 || values.length === 0) return <VisualFallback adminPreview={adminPreview} />;
    const max = Math.max(...values, 1);
    const step = 260 / Math.max(values.length - 1, 1);
    const points = values.map((value, index) => `${52 + index * step},${176 - (value / max) * 128}`).join(" ");
    return frame(
      <svg viewBox="0 0 360 220" className="h-64 w-full max-w-full">
        {Array.from({ length: 5 }).map((_, index) => <line key={index} x1="48" y1={48 + index * 32} x2="324" y2={48 + index * 32} stroke="#f7e8bd" />)}
        <line x1="48" y1="176" x2="324" y2="176" stroke="#172033" strokeWidth="2" />
        <line x1="48" y1="32" x2="48" y2="176" stroke="#172033" strokeWidth="2" />
        <polyline points={points} fill="none" stroke="#b45309" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {values.map((value, index) => {
          const cx = 52 + index * step;
          const cy = 176 - (value / max) * 128;
          return <g key={`${index}-${value}`}><circle cx={cx} cy={cy} r="5" fill="#f59e0b" stroke="#172033" strokeWidth="2" /><text x={cx} y="202" textAnchor="middle" className="fill-[#172033] text-[11px] font-bold">{labels[index]}</text></g>;
        })}
      </svg>,
      `${title}: ${labels.map((label, index) => `${label} ${values[index]}`).join(", ")}`
    );
  }

  if (type === "coordinategrid") {
    const plotted = Array.isArray(visual.data.points) && visual.data.points.every((point) => Array.isArray(point) && point.length >= 2 && point.every((value) => typeof value === "number"))
      ? visual.data.points as number[][]
      : [[1, 1], [4, 3]];
    return frame(
      <svg viewBox="0 0 240 240" className="mx-auto h-72 w-full max-w-sm">
        {Array.from({ length: 7 }).map((_, index) => <g key={index}><line x1={36 + index * 28} y1="24" x2={36 + index * 28} y2="196" stroke="#f7e8bd" /><line x1="24" y1={36 + index * 28} x2="208" y2={36 + index * 28} stroke="#f7e8bd" /></g>)}
        <line x1="36" y1="204" x2="216" y2="204" stroke="#172033" strokeWidth="2" />
        <line x1="36" y1="204" x2="36" y2="20" stroke="#172033" strokeWidth="2" />
        <text x="220" y="218" className="fill-[#172033] text-[12px] font-bold">x</text>
        <text x="20" y="18" className="fill-[#172033] text-[12px] font-bold">y</text>
        {plotted.map((point, index) => <g key={point.join("-")}><circle cx={36 + point[0] * 28} cy={204 - point[1] * 28} r="6" fill="#f59e0b" stroke="#172033" strokeWidth="2" /><text x={44 + point[0] * 28} y={198 - point[1] * 28} className="fill-[#111827] text-[12px] font-bold">{String.fromCharCode(65 + index)}</text></g>)}
      </svg>,
      `${title}: plotted coordinates ${plotted.map((point) => `(${point[0]}, ${point[1]})`).join(", ")}`
    );
  }

  if (type === "numberline") {
    const ticks = isNumberArray(visual.data.ticks) ? visual.data.ticks : isNumberArray(visual.data.points) ? visual.data.points : [0, 1, 2, 3, 4, 5];
    const highlight = typeof visual.data.highlight === "number" ? visual.data.highlight : ticks[Math.floor(ticks.length / 2)];
    return frame(
      <svg viewBox="0 0 360 110" className="h-32 w-full">
        <line x1="34" y1="52" x2="326" y2="52" stroke="#172033" strokeWidth="3" strokeLinecap="round" />
        {ticks.map((tick, index) => {
          const x = 42 + index * (276 / Math.max(ticks.length - 1, 1));
          return <g key={tick}><line x1={x} y1="38" x2={x} y2="66" stroke="#172033" strokeWidth="2" /><text x={x} y="88" textAnchor="middle" className="fill-[#172033] text-[12px] font-bold">{tick}</text>{tick === highlight && <circle cx={x} cy="52" r="8" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />}</g>;
        })}
      </svg>,
      `${title}: number line ${ticks.join(", ")}`
    );
  }

  if (type === "shape" || type === "geometry") {
    const width = typeof visual.data.width === "number" ? visual.data.width : 9;
    const height = typeof visual.data.height === "number" ? visual.data.height : 4;
    const isCompound = typeof visual.data.cutWidth === "number" || typeof visual.data.cutHeight === "number";
    return frame(
      <svg viewBox="0 0 320 190" className="h-56 w-full">
        {isCompound ? (
          <>
            <path d="M58 42 H238 V90 H178 V146 H58 Z" fill="#fff8e7" stroke="#172033" strokeWidth="4" strokeLinejoin="round" />
            <text x="148" y="30" textAnchor="middle" className="fill-[#111827] text-[13px] font-black">10 cm</text>
            <text x="246" y="70" className="fill-[#111827] text-[13px] font-black">4 cm</text>
            <text x="184" y="122" className="fill-[#111827] text-[13px] font-black">3 cm</text>
            <text x="44" y="98" textAnchor="middle" className="fill-[#111827] text-[13px] font-black">7 cm</text>
          </>
        ) : (
          <>
            <rect x="58" y="48" width="204" height="92" fill="#fff8e7" stroke="#172033" strokeWidth="4" rx="3" />
            <text x="160" y="35" textAnchor="middle" className="fill-[#111827] text-[13px] font-black">{width} cm</text>
            <text x="270" y="100" className="fill-[#111827] text-[13px] font-black">{height} cm</text>
          </>
        )}
      </svg>,
      `${title}: geometry diagram`
    );
  }

  if (type === "fraction") {
    const numerator = typeof visual.data.numerator === "number" ? visual.data.numerator : 3;
    const denominator = typeof visual.data.denominator === "number" ? visual.data.denominator : 5;
    return frame(
      <div className="space-y-3">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${denominator}, minmax(0, 1fr))` }}>
          {Array.from({ length: denominator }).map((_, index) => <div key={index} className={cn("h-14 border border-gold/30", index < numerator ? "bg-gold/35" : "bg-white")} />)}
        </div>
        <p className="text-center text-sm font-bold text-navy">{numerator} out of {denominator} equal parts shaded</p>
      </div>,
      `${title}: fraction ${numerator}/${denominator}`
    );
  }

  if (type === "ratioblocks") {
    const labels = isStringArray(visual.data.labels) ? visual.data.labels : ["Ben", "Isla"];
    const values = isNumberArray(visual.data.values) ? visual.data.values : [2, 5];
    return frame(
      <div className="space-y-4">
        {labels.map((label, rowIndex) => <div key={label} className="grid grid-cols-[72px_1fr] items-center gap-3"><span className="text-sm font-black text-navy">{label}</span><div className="flex gap-1">{Array.from({ length: values[rowIndex] ?? 1 }).map((_, index) => <span key={index} className="h-9 flex-1 rounded-md border border-gold/35 bg-gold/20" />)}</div></div>)}
      </div>,
      `${title}: ratio ${labels.map((label, index) => `${label} ${values[index]}`).join(", ")}`
    );
  }

  if (type === "venn") {
    return frame(
      <svg viewBox="0 0 320 190" className="h-56 w-full">
        <circle cx="132" cy="96" r="62" fill="#fde68a55" stroke="#172033" strokeWidth="3" />
        <circle cx="188" cy="96" r="62" fill="#f59e0b33" stroke="#172033" strokeWidth="3" />
        <text x="108" y="36" textAnchor="middle" className="fill-[#172033] text-[13px] font-black">{String(visual.data.leftLabel ?? "A")}</text>
        <text x="212" y="36" textAnchor="middle" className="fill-[#172033] text-[13px] font-black">{String(visual.data.rightLabel ?? "B")}</text>
        <text x="104" y="100" textAnchor="middle" className="fill-[#111827] text-[16px] font-black">{String(visual.data.left ?? "")}</text>
        <text x="160" y="100" textAnchor="middle" className="fill-[#111827] text-[16px] font-black">{String(visual.data.overlap ?? "")}</text>
        <text x="216" y="100" textAnchor="middle" className="fill-[#111827] text-[16px] font-black">{String(visual.data.right ?? "")}</text>
      </svg>,
      `${title}: Venn diagram`
    );
  }

  if (type === "clock") {
    const hour = typeof visual.data.hour === "number" ? visual.data.hour : 8;
    const minute = typeof visual.data.minute === "number" ? visual.data.minute : 0;
    const minuteAngle = minute * 6;
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    return frame(
      <svg viewBox="0 0 220 220" className="mx-auto h-64 w-full max-w-xs">
        <circle cx="110" cy="110" r="82" fill="#fffdf7" stroke="#172033" strokeWidth="4" />
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index + 1) * 30 - 90;
          const x = 110 + Math.cos((angle * Math.PI) / 180) * 64;
          const y = 110 + Math.sin((angle * Math.PI) / 180) * 64;
          return <text key={index} x={x} y={y + 4} textAnchor="middle" className="fill-[#172033] text-[12px] font-black">{index + 1}</text>;
        })}
        <line x1="110" y1="110" x2={110 + Math.cos(((hourAngle - 90) * Math.PI) / 180) * 42} y2={110 + Math.sin(((hourAngle - 90) * Math.PI) / 180) * 42} stroke="#172033" strokeWidth="6" strokeLinecap="round" />
        <line x1="110" y1="110" x2={110 + Math.cos(((minuteAngle - 90) * Math.PI) / 180) * 62} y2={110 + Math.sin(((minuteAngle - 90) * Math.PI) / 180) * 62} stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
        <circle cx="110" cy="110" r="5" fill="#f59e0b" />
      </svg>,
      `${title}: clock showing ${hour}:${String(minute).padStart(2, "0")}`
    );
  }

  return <VisualFallback adminPreview={adminPreview} />;
}

function VisualFallback({ adminPreview }: { adminPreview?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-cream p-4 text-sm text-muted">
      {adminPreview ? "This visual is missing or malformed. Review the visual data before publishing." : "This question visual is not available yet."}
    </div>
  );
}

export function EnglishPassageRenderer({ passage, paragraphRefs }: { passage?: Passage; paragraphRefs?: number[] }) {
  if (!passage) return null;
  const paragraphs = passage.paragraphs?.length ? passage.paragraphs : passage.text.split(/\n{2,}/).filter(Boolean);
  return (
    <aside className="rounded-2xl border border-gold/25 bg-white shadow-[0_16px_44px_-38px_rgba(17,24,39,0.55)]">
      <div className="border-b border-gold/15 bg-cream px-5 py-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-gold-dark">Original comprehension passage</p>
        <h3 className="mt-1 text-xl font-black text-navy">{passage.title}</h3>
      </div>
      <div className="max-h-[32rem] space-y-4 overflow-y-auto p-5 text-[15px] leading-8 text-ink">
        {paragraphs.map((paragraph, index) => {
          const number = index + 1;
          const active = paragraphRefs?.includes(number);
          return (
            <p key={number} className={cn("rounded-xl border p-3", active ? "border-gold/35 bg-gold/10" : "border-transparent bg-white")}>
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cream text-xs font-black text-gold-dark">{number}</span>
              {paragraph}
            </p>
          );
        })}
      </div>
    </aside>
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
  const options = Array.isArray(question.options) ? question.options : [];
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
        <h2 className="mt-4 text-2xl font-bold leading-snug text-navy">{hasText ? question.text : "Question text missing"}</h2>
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
      {hasOptions ? (
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
