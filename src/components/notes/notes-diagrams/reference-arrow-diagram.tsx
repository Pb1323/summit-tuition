"use client";

import { useState } from "react";
import { NOTES_GOLD, NOTES_CREAM } from "../notes-theme";

export interface ReferenceCandidate {
  label: string;
  valid: boolean;
  note: string;
}

export interface ReferenceArrowDiagramProps {
  heading: string;
  helper: string;
  target: string;
  candidates: ReferenceCandidate[];
}

/**
 * A clickable "reference arrow" diagram for pronoun-antecedent teaching: each
 * candidate reading is drawn as a chip connected by a dashed line to the
 * pronoun/target chip. Clicking a candidate "tests" that reading and colours
 * the connector gold (resolves cleanly) or red (breaks a rule), with an
 * explanation underneath. Used alongside ClickErrorSentence in pronoun demos.
 */
export function ReferenceArrowDiagram({ heading, helper, target, candidates }: ReferenceArrowDiagramProps) {
  const [testedIdx, setTestedIdx] = useState<number | null>(null);
  const tested = testedIdx !== null ? candidates[testedIdx] : null;

  return (
    <div className="mx-6 mb-4 rounded-2xl border p-4" style={{ borderColor: "rgba(201,162,75,0.3)", background: "rgba(255,255,255,0.03)" }}>
      <p className="mb-3 text-[0.7em] font-bold uppercase tracking-widest" style={{ color: NOTES_GOLD }}>
        {heading}
      </p>
      <div className="flex flex-col gap-3">
        {candidates.map((c, idx) => {
          const isTested = testedIdx === idx;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setTestedIdx(idx)}
              className="flex w-full items-center gap-2 rounded-lg bg-transparent p-0 text-left"
              style={{ cursor: "pointer" }}
            >
              <span
                className="shrink-0 rounded-lg border px-3 py-1.5 text-[0.82em] font-semibold transition-colors duration-300"
                style={{
                  borderColor: isTested ? (c.valid ? NOTES_GOLD : "#A8433A") : "rgba(248,245,238,0.25)",
                  background: isTested ? (c.valid ? "rgba(201,162,75,0.22)" : "rgba(168,67,58,0.18)") : "rgba(255,255,255,0.05)",
                  color: NOTES_CREAM,
                }}
              >
                {c.label}
              </span>
              <span
                aria-hidden
                className="h-px min-w-[20px] flex-1 transition-colors duration-300"
                style={{
                  background: isTested ? (c.valid ? NOTES_GOLD : "#A8433A") : "transparent",
                  backgroundImage: isTested
                    ? "none"
                    : "repeating-linear-gradient(90deg, rgba(248,245,238,0.35) 0 6px, transparent 6px 11px)",
                }}
              />
              <span
                aria-hidden
                className="text-[1.1em] transition-colors duration-300"
                style={{ color: isTested ? (c.valid ? NOTES_GOLD : "#A8433A") : "rgba(248,245,238,0.35)" }}
              >
                →
              </span>
              <span
                className="shrink-0 rounded-lg border px-3 py-1.5 text-[0.82em] font-bold"
                style={{
                  borderColor: isTested ? (c.valid ? NOTES_GOLD : "#A8433A") : "rgba(201,162,75,0.4)",
                  background: isTested ? (c.valid ? "rgba(201,162,75,0.28)" : "rgba(168,67,58,0.2)") : "rgba(201,162,75,0.12)",
                  color: NOTES_CREAM,
                  animation: isTested ? "ntpopcheck 0.35s ease" : "none",
                }}
              >
                {target}
              </span>
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
        <p className="mt-1 text-[0.72em]" style={{ color: "rgba(248,245,238,0.45)" }}>
          {helper}
        </p>
      )}
    </div>
  );
}
