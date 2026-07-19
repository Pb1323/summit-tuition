"use client";

import { useState } from "react";
import { NOTES_GOLD, NOTES_CREAM } from "../notes-theme";

export interface ApostropheCandidate {
  /** The full form as written, e.g. "dog's", "dogs'", "dogs's". */
  form: string;
  /** Character index of the apostrophe within `form`, or -1 if this form has none. */
  apostropheAt: number;
  valid: boolean;
  note: string;
}

export interface ApostrophePlacementDiagramProps {
  heading: string;
  helper: string;
  /** Plain-English description of who owns what, e.g. "one dog owns a bone". */
  context: string;
  candidates: ApostropheCandidate[];
}

/**
 * A second interactive layer for apostrophe-placement teaching: renders each
 * candidate spelling as individual characters so the apostrophe's exact
 * position is visible, not just implied by a label. Clicking a candidate
 * "tests" it — the apostrophe character enlarges and glows gold (correct
 * position) or red (wrong position/shouldn't be there), with an explanation
 * underneath. Used alongside ClickErrorSentence in Apostrophes & Possession
 * demos.
 */
export function ApostrophePlacementDiagram({ heading, helper, context, candidates }: ApostrophePlacementDiagramProps) {
  const [testedIdx, setTestedIdx] = useState<number | null>(null);
  const tested = testedIdx !== null ? candidates[testedIdx] : null;

  return (
    <div className="mx-6 mb-4 rounded-2xl border p-4" style={{ borderColor: "rgba(201,162,75,0.3)", background: "rgba(255,255,255,0.03)" }}>
      <p className="mb-1 text-[0.7em] font-bold uppercase tracking-widest" style={{ color: NOTES_GOLD }}>
        {heading}
      </p>
      <p className="mb-3 text-[0.72em] italic" style={{ color: "rgba(248,245,238,0.5)" }}>
        {context}
      </p>
      <div className="flex flex-wrap gap-3">
        {candidates.map((c, idx) => {
          const isTested = testedIdx === idx;
          const chars = c.form.split("");
          return (
            <button
              key={c.form + idx}
              type="button"
              onClick={() => setTestedIdx(idx)}
              className="flex items-center gap-[1px] rounded-xl border px-3 py-2 font-mono text-[1.15em] font-bold transition-[border-color,background] duration-300"
              style={{
                borderColor: isTested ? (c.valid ? NOTES_GOLD : "#A8433A") : "rgba(248,245,238,0.25)",
                background: isTested ? (c.valid ? "rgba(201,162,75,0.16)" : "rgba(168,67,58,0.14)") : "rgba(255,255,255,0.04)",
                cursor: "pointer",
              }}
            >
              {chars.map((ch, ci) => {
                const isApostrophe = ci === c.apostropheAt;
                return (
                  <span
                    key={ci}
                    style={{
                      color: isApostrophe ? (isTested ? (c.valid ? NOTES_GOLD : "#D9776C") : "rgba(201,162,75,0.7)") : NOTES_CREAM,
                      fontSize: isApostrophe ? "1.3em" : "1em",
                      display: "inline-block",
                      transform: isApostrophe && isTested ? "translateY(-2px) scale(1.15)" : "none",
                      transition: "transform 0.25s ease, color 0.25s ease",
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </button>
          );
        })}
      </div>
      {tested && (
        <div
          className="mb-1 mt-3 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.82em] leading-relaxed"
          style={{
            background: tested.valid ? "rgba(201,162,75,0.12)" : "rgba(168,67,58,0.12)",
            borderColor: tested.valid ? "rgba(201,162,75,0.35)" : "rgba(168,67,58,0.35)",
            color: NOTES_CREAM,
          }}
        >
          {tested.valid ? "✓ " : "✗ "}
          {tested.note}
        </div>
      )}
      {!tested && (
        <p className="mt-2 text-[0.72em]" style={{ color: "rgba(248,245,238,0.45)" }}>
          {helper}
        </p>
      )}
    </div>
  );
}
