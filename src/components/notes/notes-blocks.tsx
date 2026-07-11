"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { NOTES_GOLD, type NotesTheme } from "./notes-theme";
import type { NotesTier, PracticeQuestion, WorkedExample, GlossaryTerm } from "./types";

export function TierBadge({ tier }: { tier: NotesTier }) {
  return (
    <div
      className="whitespace-nowrap rounded-full border px-4 py-1.5 text-[0.7em] font-extrabold uppercase tracking-wider"
      style={{
        borderColor: NOTES_GOLD,
        color: "#8a6a1e",
        background: "linear-gradient(135deg,rgba(201,162,75,0.18),rgba(201,162,75,0.06))",
      }}
    >
      {tier}
    </div>
  );
}

export function WhyMatters({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-6 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[0.85em] italic leading-relaxed"
      style={{ color: "#8a6a1e", background: "rgba(201,162,75,0.1)", borderColor: "rgba(201,162,75,0.3)" }}
    >
      <span>★</span>
      <span>
        <b>Why this matters:</b> {children}
      </span>
    </div>
  );
}

export function ConceptCard({
  theme,
  title,
  bullets,
  note,
}: {
  theme: NotesTheme;
  title: string;
  bullets: string[];
  note: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const [showNote, setShowNote] = useState(false);
  return (
    <div
      className="mb-6 overflow-hidden rounded-2xl border shadow-sm"
      style={{ background: theme.cardBg, borderColor: theme.hairline }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-4 text-left font-serif text-[1.08em] font-semibold"
        style={{ color: theme.headline }}
      >
        <span>{title}</span>
        <span
          className="transition-transform"
          style={{ color: NOTES_GOLD, transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height] duration-500"
        style={{ maxHeight: expanded ? "1200px" : "0px" }}
      >
        <div className="px-6 pb-6 pt-0.5">
          <div
            className="mb-2.5 text-[0.78em] font-bold uppercase tracking-wider"
            style={{ color: NOTES_GOLD }}
          >
            In plain English:{" "}
            <button
              onClick={() => setShowNote((v) => !v)}
              className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border text-[0.68em] font-extrabold"
              style={{ borderColor: NOTES_GOLD, color: NOTES_GOLD }}
            >
              ?
            </button>
          </div>
          <ul className="list-disc space-y-1.5 pl-5 text-[0.92em] leading-relaxed" style={{ color: theme.body }}>
            {bullets.map((b, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
            ))}
          </ul>
          {showNote && (
            <div
              className="mt-3 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.85em] leading-relaxed"
              style={{ background: "#FBF4E4", borderColor: "rgba(201,162,75,0.4)", color: theme.body }}
              dangerouslySetInnerHTML={{ __html: note }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function GlossaryStrip({ theme, terms }: { theme: NotesTheme; terms: GlossaryTerm[] }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2.5">
      {terms.map((t) => (
        <div
          key={t.term}
          className="rounded-xl border px-3.5 py-2.5 text-[0.78em] shadow-sm"
          style={{ background: theme.cardBg, borderColor: theme.hairline, color: theme.body }}
        >
          <b style={{ color: NOTES_GOLD }}>{t.term}</b> — {t.def}
        </div>
      ))}
    </div>
  );
}

export function DiagramFrame({ theme, label, children }: { theme: NotesTheme; label: string; children: ReactNode }) {
  return (
    <div
      className="mb-6 overflow-hidden rounded-[20px] border shadow-lg"
      style={{ background: theme.pageBg === "#05070d" ? "#0d111a" : "#0A1F44", borderColor: "rgba(201,162,75,0.25)" }}
    >
      <div className="px-6 pt-4 text-[0.7em] font-bold uppercase tracking-widest" style={{ color: NOTES_GOLD }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function WorkedExampleBlock({ theme, worked }: { theme: NotesTheme; worked: WorkedExample }) {
  return (
    <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: theme.cardBg, borderColor: theme.hairline }}>
      <div className="px-6 pb-1 pt-4 font-serif text-[1.08em] font-semibold" style={{ color: theme.headline }}>
        Worked Example
      </div>
      <div className="px-6 pb-2.5 pt-1.5 text-[0.92em] leading-relaxed" style={{ color: theme.body }}>
        <b>Question:</b> {worked.question}
      </div>
      <div className="flex flex-wrap gap-4 px-6 pb-1">
        <div className="min-w-[240px] flex-1 basis-[260px]">
          <div className="mb-2.5 text-[0.72em] font-extrabold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
            Fast Method
          </div>
          <p className="text-[0.92em] leading-relaxed" style={{ color: theme.body }} dangerouslySetInnerHTML={{ __html: worked.fastMethod }} />
        </div>
        <div className="min-w-[240px] flex-1 basis-[260px]">
          <div className="mb-2.5 text-[0.72em] font-extrabold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
            Step-by-Step Method
          </div>
          {worked.steps.map((step, i) => (
            <div key={i} className="mb-3.5 flex items-start gap-3.5 text-[0.88em] leading-relaxed" style={{ color: theme.body }}>
              <span
                className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[0.8em] font-extrabold"
                style={{ background: NOTES_GOLD, color: "#0A1F44" }}
              >
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: step }} />
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6 pt-1">
        <div
          className="mt-1 rounded-xl border px-5 py-3.5 font-mono text-[0.95em]"
          style={{ background: "linear-gradient(135deg,rgba(201,162,75,0.14),rgba(201,162,75,0.05))", borderColor: "rgba(201,162,75,0.4)", color: theme.headline }}
          dangerouslySetInnerHTML={{ __html: worked.answer }}
        />
      </div>
    </div>
  );
}

export function SelfCheckBlock({ theme, prompt, answer }: { theme: NotesTheme; prompt: string; answer: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div
      className="mb-[18px] rounded-2xl border-[1.5px] border-dashed px-[22px] py-[18px]"
      style={{ background: "#FBF4E4", borderColor: "rgba(201,162,75,0.5)" }}
    >
      <div className="mb-2 text-[0.75em] font-extrabold uppercase tracking-wider" style={{ color: "#8a6a1e" }}>
        Quick Check
      </div>
      <div className="mb-2.5 text-[0.9em]" style={{ color: theme.body }}>
        {prompt}
      </div>
      <button
        onClick={() => setRevealed(true)}
        className="rounded-lg border px-4 py-2 text-[0.78em] font-bold"
        style={{ borderColor: NOTES_GOLD, color: "#8a6a1e" }}
      >
        Reveal Answer
      </button>
      {revealed && (
        <div className="mt-2.5 animate-[ntfadein_0.3s_ease] font-mono text-[0.88em]" style={{ color: theme.headline }} dangerouslySetInnerHTML={{ __html: answer }} />
      )}
    </div>
  );
}

interface AnswerState {
  value: string;
  checked: boolean;
  correct: boolean | null;
}

function normalize(v: string) {
  return v.trim().toLowerCase().replace(/,/g, "");
}

export function PracticeQuestions({
  theme,
  questions,
  onProgress,
}: {
  theme: NotesTheme;
  questions: PracticeQuestion[];
  onProgress?: (correct: number, total: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, { value: "", checked: false, correct: null }]))
  );
  const [hints, setHints] = useState<Record<string, boolean>>({});

  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const correct = questions.filter((q) => answers[q.id]?.checked && answers[q.id]?.correct).length;
    onProgressRef.current?.(correct, questions.length);
  }, [answers, questions]);

  return (
    <div>
      <div className="mb-3.5 font-serif text-[1.15em] font-semibold" style={{ color: theme.headline }}>
        Practice Questions
      </div>
      {questions.map((q, i) => {
        const ans = answers[q.id];
        const feedback = !ans.checked ? null : ans.correct ? "✓ Correct" : "✗ Not quite — try again";
        return (
          <div
            key={q.id}
            className="mb-4 rounded-2xl border shadow-sm"
            style={{ background: theme.cardBg, borderColor: theme.hairline }}
          >
            <div className="flex items-start gap-3.5 px-[22px] pb-3 pt-[18px]">
              <span
                className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border-[1.5px] font-mono text-[0.78em] font-extrabold"
                style={{ borderColor: NOTES_GOLD, color: NOTES_GOLD }}
              >
                {i + 1}
              </span>
              <span className="pt-0.5 text-[0.92em] leading-relaxed" style={{ color: theme.body }}>
                {q.prompt}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 px-[22px] pb-[18px] pl-[60px]">
              <input
                type="text"
                placeholder="Your answer"
                value={ans.value}
                onChange={(e) =>
                  setAnswers((s) => ({ ...s, [q.id]: { ...s[q.id], value: e.target.value, checked: false, correct: null } }))
                }
                className="w-[160px] rounded-lg px-3.5 py-2.5 text-[0.88em] outline-none"
                style={{
                  border: `1.5px solid ${ans.checked ? (ans.correct ? NOTES_GOLD : "#c0574c") : theme.hairline}`,
                  background: theme.inputBg,
                  color: theme.headline,
                }}
              />
              <button
                onClick={() =>
                  setAnswers((s) => {
                    const correct = q.accept.some((a) => normalize(a) === normalize(s[q.id].value));
                    return { ...s, [q.id]: { ...s[q.id], checked: true, correct } };
                  })
                }
                className="rounded-lg px-[18px] py-2.5 text-[0.78em] font-bold text-cream"
                style={{ background: "linear-gradient(135deg,#0A1F44,#173066)" }}
              >
                Check Answer
              </button>
              <button
                onClick={() => setHints((s) => ({ ...s, [q.id]: !s[q.id] }))}
                className="rounded-lg border px-4 py-2.5 text-[0.78em] font-bold"
                style={{ borderColor: NOTES_GOLD, color: "#8a6a1e" }}
              >
                Hint
              </button>
              {feedback && (
                <span
                  key={`${q.id}-${ans.checked}-${ans.correct}`}
                  className="text-[0.82em] font-bold"
                  style={{
                    color: ans.correct ? "#8a6a1e" : "#a8433a",
                    animation: ans.correct ? "ntpopcheck 0.5s ease" : "ntshake 0.4s ease",
                  }}
                >
                  {feedback}
                </span>
              )}
            </div>
            {hints[q.id] && (
              <div className="mx-[22px] mb-[18px] ml-[60px] animate-[ntfadein_0.3s_ease] rounded-lg px-3.5 py-3 text-[0.82em]" style={{ background: "#FBF4E4", color: theme.body }}>
                {q.hint}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function MistakeBox({ theme, mistakes }: { theme: NotesTheme; mistakes: string[] }) {
  return (
    <div
      className="mb-4 mt-7 rounded-2xl border-[1.5px] px-[22px] py-[18px]"
      style={{ borderColor: NOTES_GOLD, background: theme.pageBg === "#05070d" ? "rgba(201,162,75,0.06)" : "#FBF4E4" }}
    >
      <div className="mb-2 text-[0.85em] font-extrabold" style={{ color: "#8a6a1e" }}>
        ⚠ Common Mistakes
      </div>
      <ul className="list-disc space-y-1.5 pl-5 text-[0.86em] leading-relaxed" style={{ color: theme.body }}>
        {mistakes.map((m, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: m }} />
        ))}
      </ul>
    </div>
  );
}

export function ExamTipBox({ theme, tip }: { theme: NotesTheme; tip: string }) {
  return (
    <div
      className="mb-2.5 rounded-2xl border-[1.5px] px-[22px] py-[18px]"
      style={{ borderColor: theme.headline, background: theme.pageBg === "#05070d" ? "rgba(255,255,255,0.03)" : "rgba(10,31,68,0.04)" }}
    >
      <div className="mb-2 flex items-center gap-1.5 text-[0.85em] font-extrabold" style={{ color: theme.headline }}>
        💡 Exam Tip
      </div>
      <p className="text-[0.86em] leading-relaxed" style={{ color: theme.body }} dangerouslySetInnerHTML={{ __html: tip }} />
    </div>
  );
}
