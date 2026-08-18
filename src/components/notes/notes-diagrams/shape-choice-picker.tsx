"use client";

import { useState, type ReactNode } from "react";
import { NOTES_GOLD } from "../notes-theme";

export interface ShapeChoicePickerProps {
  instruction: string;
  /** Optional row of SVG figures shown above the answer options — a sequence, matrix or analogy pair. */
  context?: ReactNode;
  /** One small SVG element per answer option, in order. */
  options: ReactNode[];
  correctIdx: number;
  correction: string;
  wrongHint: string;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * Shared "click the figure" interaction for Non-Verbal Reasoning demos: an
 * optional context row (the sequence/matrix/analogy the question is built
 * from) followed by a row of SVG answer-option buttons, one of which is
 * correct. Mirrors WordChipPicker (Verbal Reasoning) but for shapes instead
 * of words — every NVR subtopic wraps this in a no-arg component to satisfy
 * the `Diagram: ComponentType` slot in Subtopic.
 */
export function ShapeChoicePicker({ instruction, context, options, correctIdx, correction, wrongHint }: ShapeChoicePickerProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const handleClick = (idx: number) => {
    if (correct) return;
    setSelected(idx);
    if (idx === correctIdx) {
      setCorrect(true);
      setWrong(false);
    } else {
      setWrong(true);
      window.setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <div className="px-6 pb-5 pt-5">
      <p className="mb-4 flex items-center gap-2 text-[0.8em] text-[rgba(248,245,238,0.6)]">
        <span aria-hidden style={{ color: NOTES_GOLD }}>
          🔷
        </span>
        {instruction}
      </p>

      {context && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border p-3" style={{ borderColor: "rgba(248,245,238,0.15)", background: "rgba(248,245,238,0.04)" }}>
          {context}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {options.map((option, idx) => {
          const isCorrectPick = correct && idx === correctIdx;
          const isWrongPick = wrong && idx === selected;
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={correct}
              className="flex flex-col items-center gap-1.5 rounded-xl border-[1.5px] px-3 py-2.5 transition-[background,box-shadow,transform] duration-300"
              style={{
                borderColor: isCorrectPick ? NOTES_GOLD : "rgba(248,245,238,0.25)",
                background: isCorrectPick ? "rgba(201,162,75,0.24)" : "rgba(248,245,238,0.06)",
                cursor: correct ? "default" : "pointer",
                animation: isWrongPick ? "ntshake 0.4s ease" : "none",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center">{option}</div>
              <span className="text-[0.75em] font-bold" style={{ color: isCorrectPick ? NOTES_GOLD : "rgba(248,245,238,0.6)" }}>
                {isCorrectPick && <span aria-hidden className="mr-1 inline-block animate-[ntpopcheck_0.4s_ease]">✓</span>}
                {LETTERS[idx]}
              </span>
            </button>
          );
        })}
      </div>

      {correct && (
        <div className="mb-1 mt-4 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.85em] leading-relaxed" style={{ background: "rgba(201,162,75,0.14)", borderColor: "rgba(201,162,75,0.4)", color: "#F8F5EE" }}>
          ✓ Correct — {correction}
        </div>
      )}
      {wrong && !correct && (
        <div className="mb-1 mt-4 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.85em] leading-relaxed" style={{ background: "rgba(168,67,58,0.14)", borderColor: "rgba(168,67,58,0.4)", color: "#F8F5EE" }}>
          Not quite — {wrongHint}
        </div>
      )}
      <div className="h-1" />
    </div>
  );
}

/** Small helpers for building the SVG figures used across NVR demos, in the navy/gold notes palette. */
export const nvrSvg = {
  square: (fill: string, opts?: { size?: number }) => {
    const s = opts?.size ?? 44;
    const o = (64 - s) / 2;
    return (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <rect x={o} y={o} width={s} height={s} fill={fill === "none" ? "none" : fill} stroke="#F8F5EE" strokeWidth="2.5" />
      </svg>
    );
  },
  triangle: (fill: string, rotateDeg = 0) => (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <g transform={`rotate(${rotateDeg} 32 32)`}>
        <polygon points="32,10 54,52 10,52" fill={fill === "none" ? "none" : fill} stroke="#F8F5EE" strokeWidth="2.5" />
      </g>
    </svg>
  ),
  circle: (fill: string, dots = 0) => (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="22" fill={fill === "none" ? "none" : fill} stroke="#F8F5EE" strokeWidth="2.5" />
      {Array.from({ length: dots }).map((_, i) => (
        <circle key={i} cx={22 + i * 10} cy="32" r="3" fill={NOTES_GOLD} />
      ))}
    </svg>
  ),
  pentagon: (fill: string, rotateDeg = 0) => (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <g transform={`rotate(${rotateDeg} 32 32)`}>
        <polygon points="32,8 54,24 46,50 18,50 10,24" fill={fill === "none" ? "none" : fill} stroke="#F8F5EE" strokeWidth="2.5" />
      </g>
    </svg>
  ),
  arrowFig: (rotateDeg = 0) => (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <g transform={`rotate(${rotateDeg} 32 32)`}>
        <polygon points="32,10 48,32 38,32 38,54 26,54 26,32 16,32" fill={NOTES_GOLD} />
      </g>
    </svg>
  ),
};
