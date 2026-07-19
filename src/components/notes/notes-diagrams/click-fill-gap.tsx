"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

export interface ClickFillGapProps {
  instruction: string;
  before: string;
  options: string[];
  correctIdx: number;
  after: string;
  correction: string;
  wrongHint: string;
}

/**
 * Shared "click to fill the gap" interaction for Cloze: a short passage with
 * one gap and a small option bank underneath. Each Cloze subtopic wraps this
 * in a no-arg component to satisfy the `Diagram: ComponentType` slot in Subtopic.
 */
export function ClickFillGap({ instruction, before, options, correctIdx, after, correction, wrongHint }: ClickFillGapProps) {
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
    <div className="px-6 pb-2 pt-5">
      <p className="mb-4 text-[0.8em] text-[rgba(248,245,238,0.6)]">{instruction}</p>
      <p className="m-0 font-serif text-[1.2em] leading-[1.9] text-[#F8F5EE]">
        {before}{" "}
        <span
          className="inline-block rounded-[6px] border-b-2 px-2 py-px font-mono text-[0.85em]"
          style={{ borderColor: NOTES_GOLD, background: correct ? "rgba(201,162,75,0.28)" : "rgba(255,255,255,0.06)" }}
        >
          {correct ? options[correctIdx] : "______"}
        </span>{" "}
        {after}
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((opt, idx) => {
          const isCorrectPick = correct && idx === correctIdx;
          const isWrongPick = wrong && idx === selected;
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={correct}
              className="rounded-[10px] border px-4 py-2 font-mono text-[0.85em] font-bold transition-colors"
              style={{
                borderColor: isCorrectPick ? NOTES_GOLD : "rgba(201,162,75,0.4)",
                background: isCorrectPick ? "rgba(201,162,75,0.28)" : "rgba(255,255,255,0.06)",
                color: "#F8F5EE",
                cursor: correct ? "default" : "pointer",
                animation: isWrongPick ? "ntshake 0.4s ease" : "none",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {correct && (
        <div className="mb-2 mt-4 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.85em] leading-relaxed" style={{ background: "rgba(201,162,75,0.14)", borderColor: "rgba(201,162,75,0.4)", color: "#F8F5EE" }}>
          ✓ Correct — {correction}
        </div>
      )}
      {wrong && !correct && (
        <div className="mb-2 mt-4 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.85em] leading-relaxed" style={{ background: "rgba(168,67,58,0.14)", borderColor: "rgba(168,67,58,0.4)", color: "#F8F5EE" }}>
          Not quite — {wrongHint}
        </div>
      )}
      <div className="h-5" />
    </div>
  );
}
