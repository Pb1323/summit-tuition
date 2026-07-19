"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

export interface WordChipPickerProps {
  instruction: string;
  words: string[];
  correctIdx: number;
  correction: string;
  wrongHint: string;
}

/**
 * Shared "click the word" interaction for Verbal Reasoning word-relationship
 * demos: a small row of word chips, one of which is the answer. Each VR
 * word-relationships subtopic wraps this in a no-arg component to satisfy
 * the `Diagram: ComponentType` slot in Subtopic — mirrors ClickEvidencePassage
 * (Comprehension) but chips read better than an inline sentence for isolated
 * words rather than a flowing passage.
 */
export function WordChipPicker({ instruction, words, correctIdx, correction, wrongHint }: WordChipPickerProps) {
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
          🔤
        </span>
        {instruction}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {words.map((word, idx) => {
          const isCorrectPick = correct && idx === correctIdx;
          const isWrongPick = wrong && idx === selected;
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={correct}
              className="rounded-full border-[1.5px] px-4 py-2 font-serif text-[1.02em] font-semibold transition-[background,box-shadow,transform] duration-300"
              style={{
                borderColor: isCorrectPick ? NOTES_GOLD : "rgba(248,245,238,0.25)",
                background: isCorrectPick ? "rgba(201,162,75,0.24)" : "rgba(248,245,238,0.06)",
                color: "#F8F5EE",
                cursor: correct ? "default" : "pointer",
                animation: isWrongPick ? "ntshake 0.4s ease" : "none",
              }}
            >
              {isCorrectPick && (
                <span aria-hidden className="mr-1.5 inline-block animate-[ntpopcheck_0.4s_ease]" style={{ color: NOTES_GOLD }}>
                  ✓
                </span>
              )}
              {word}
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
