"use client";

import { useState } from "react";
import { NOTES_GOLD, NOTES_CREAM } from "../notes-theme";

export interface WordSegment {
  text: string;
  kind: "prefix" | "root" | "suffix";
  note: string;
  changed?: boolean;
  wrongVariant?: string;
}

export interface WordAnatomyBreakdownProps {
  heading: string;
  segments: WordSegment[];
  ruleNote: string;
}

const KIND_COLOR: Record<WordSegment["kind"], string> = {
  prefix: "rgba(201,162,75,0.55)",
  root: "rgba(248,245,238,0.45)",
  suffix: "rgba(168,67,58,0.55)",
};

/**
 * Segments a word into prefix/root/suffix blocks for spelling-rule teaching.
 * Hovering a segment shows its rule; clicking the flagged (changed) segment
 * toggles between the correct spelling and the common misspelling so the
 * difference is visually obvious, not just described in prose.
 */
export function WordAnatomyBreakdown({ heading, segments, ruleNote }: WordAnatomyBreakdownProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [showWrong, setShowWrong] = useState(false);

  return (
    <div className="mx-6 mb-4 rounded-2xl border p-4" style={{ borderColor: "rgba(201,162,75,0.3)", background: "rgba(255,255,255,0.03)" }}>
      <p className="mb-3 text-[0.7em] font-bold uppercase tracking-widest" style={{ color: NOTES_GOLD }}>
        {heading}
      </p>
      <div className="mb-3 flex flex-wrap items-end gap-[3px] font-mono text-[1.25em] font-bold">
        {segments.map((seg, idx) => {
          const isChanged = !!seg.changed;
          const displayText = isChanged && showWrong && seg.wrongVariant !== undefined ? seg.wrongVariant : seg.text;
          return (
            <span
              key={idx}
              role={isChanged ? "button" : undefined}
              tabIndex={isChanged ? 0 : undefined}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx((v) => (v === idx ? null : v))}
              onClick={() => isChanged && setShowWrong((v) => !v)}
              className="relative rounded-md px-1.5 py-1 transition-transform duration-200"
              style={{
                background: isChanged ? (showWrong ? "rgba(168,67,58,0.28)" : "rgba(201,162,75,0.28)") : "rgba(255,255,255,0.05)",
                borderBottom: `3px solid ${isChanged ? (showWrong ? "#A8433A" : NOTES_GOLD) : KIND_COLOR[seg.kind]}`,
                color: NOTES_CREAM,
                cursor: isChanged ? "pointer" : "default",
                transform: hoverIdx === idx ? "translateY(-3px)" : "none",
              }}
            >
              {displayText}
            </span>
          );
        })}
      </div>
      <div className="min-h-[2.6em] animate-[ntfadein_0.2s_ease] text-[0.8em] leading-relaxed" style={{ color: "rgba(248,245,238,0.7)" }}>
        {hoverIdx !== null ? segments[hoverIdx].note : ruleNote}
      </div>
      <p className="mt-2 text-[0.68em]" style={{ color: "rgba(248,245,238,0.4)" }}>
        Hover a piece of the word for its rule · click the gold piece to compare the common misspelling.
      </p>
    </div>
  );
}
