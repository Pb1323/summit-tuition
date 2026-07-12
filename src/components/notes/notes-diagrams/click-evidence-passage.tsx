"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

export interface ClickEvidencePassageProps {
  instruction: string;
  passage: string[];
  correctIdx: number;
  correction: string;
  wrongHint: string;
}

/**
 * Shared "click the sentence" interaction for Comprehension: a short passage
 * split into sentences, one of which answers/supports the question. Each
 * Comprehension subtopic wraps this in a no-arg component to satisfy the
 * `Diagram: ComponentType` slot in Subtopic.
 */
export function ClickEvidencePassage({ instruction, passage, correctIdx, correction, wrongHint }: ClickEvidencePassageProps) {
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
      <p className="m-0 font-serif text-[1.08em] leading-[1.9] text-[#F8F5EE]">
        {passage.map((sentence, idx) => {
          const isCorrectPick = correct && idx === correctIdx;
          const isWrongPick = wrong && idx === selected;
          return (
            <span
              key={idx}
              onClick={() => handleClick(idx)}
              className="cursor-pointer rounded-[6px] px-[3px] py-px transition-[background,box-shadow] duration-300"
              style={{
                background: isCorrectPick ? "rgba(201,162,75,0.28)" : "transparent",
                boxShadow: isCorrectPick ? `inset 0 -3px 0 0 ${NOTES_GOLD}` : "none",
                animation: isWrongPick ? "ntshake 0.4s ease" : "none",
              }}
            >
              {sentence}{" "}
            </span>
          );
        })}
      </p>
      {correct && (
        <div className="mb-2 mt-1 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.85em] leading-relaxed" style={{ background: "rgba(201,162,75,0.14)", borderColor: "rgba(201,162,75,0.4)", color: "#F8F5EE" }}>
          ✓ Correct — {correction}
        </div>
      )}
      {wrong && !correct && (
        <div className="mb-2 mt-1 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.85em] leading-relaxed" style={{ background: "rgba(168,67,58,0.14)", borderColor: "rgba(168,67,58,0.4)", color: "#F8F5EE" }}>
          Not quite — {wrongHint}
        </div>
      )}
      <div className="h-5" />
    </div>
  );
}
