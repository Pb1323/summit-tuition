"use client";

import { useState } from "react";
import { NOTES_GOLD, NOTES_CREAM } from "../notes-theme";

export interface WordChoiceCandidate {
  word: string;
  /** Short verdict tag, e.g. "Best fit", "Too vague", "Wrong category", "Near-miss trap". */
  fitLabel: string;
  good: boolean;
  note: string;
}

export interface WordChoiceComparatorProps {
  heading: string;
  helper: string;
  before: string;
  after: string;
  candidates: WordChoiceCandidate[];
}

/**
 * A second interactive layer for best-fit word-choice teaching: hovering a
 * candidate word live-previews it substituted into the full sentence, with a
 * verdict tag; clicking "locks in" that reading and reveals the full
 * explanation underneath. Distinct from ClickFillGap (single click, single
 * feedback) because it lets the reader compare every option's effect on the
 * whole sentence side by side before committing. Used alongside
 * ClickFillGap in Complete-the-Sentence demos.
 */
export function WordChoiceComparator({ heading, helper, before, after, candidates }: WordChoiceComparatorProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [lockedIdx, setLockedIdx] = useState<number | null>(null);

  const previewIdx = lockedIdx ?? hoverIdx;
  const preview = previewIdx !== null ? candidates[previewIdx] : null;

  return (
    <div className="mx-6 mb-4 rounded-2xl border p-4" style={{ borderColor: "rgba(201,162,75,0.3)", background: "rgba(255,255,255,0.03)" }}>
      <p className="mb-3 text-[0.7em] font-bold uppercase tracking-widest" style={{ color: NOTES_GOLD }}>
        {heading}
      </p>
      <p className="mb-4 min-h-[3.4em] font-serif text-[1.05em] leading-[1.7]" style={{ color: NOTES_CREAM }}>
        {before}{" "}
        <span
          className="rounded-md px-1.5 py-0.5 font-bold transition-colors duration-200"
          style={{
            background: preview ? (preview.good ? "rgba(201,162,75,0.22)" : "rgba(168,67,58,0.18)") : "rgba(255,255,255,0.08)",
            color: preview ? NOTES_CREAM : "rgba(248,245,238,0.4)",
            borderBottom: preview ? `2px solid ${preview.good ? NOTES_GOLD : "#A8433A"}` : "2px dashed rgba(248,245,238,0.3)",
          }}
        >
          {preview ? preview.word : "___"}
        </span>{" "}
        {after}
      </p>
      <div className="flex flex-wrap gap-2">
        {candidates.map((c, idx) => {
          const isActive = previewIdx === idx;
          const isLocked = lockedIdx === idx;
          return (
            <button
              key={c.word}
              type="button"
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx((v) => (v === idx ? null : v))}
              onFocus={() => setHoverIdx(idx)}
              onClick={() => setLockedIdx(idx)}
              className="rounded-lg border px-3 py-1.5 text-[0.85em] font-semibold transition-[transform,border-color,background] duration-200"
              style={{
                borderColor: isLocked ? (c.good ? NOTES_GOLD : "#A8433A") : isActive ? "rgba(201,162,75,0.6)" : "rgba(248,245,238,0.25)",
                background: isLocked ? (c.good ? "rgba(201,162,75,0.22)" : "rgba(168,67,58,0.18)") : "rgba(255,255,255,0.05)",
                color: NOTES_CREAM,
                cursor: "pointer",
                transform: isActive && !isLocked ? "translateY(-2px)" : "none",
              }}
            >
              {c.word}
            </button>
          );
        })}
      </div>
      <div className="mt-3 min-h-[3em] text-[0.8em] leading-relaxed">
        {preview ? (
          <div
            className="animate-[ntfadein_0.25s_ease] rounded-xl border px-4 py-3"
            style={{
              background: preview.good ? "rgba(201,162,75,0.12)" : "rgba(168,67,58,0.12)",
              borderColor: preview.good ? "rgba(201,162,75,0.35)" : "rgba(168,67,58,0.35)",
              color: NOTES_CREAM,
            }}
          >
            <span className="mr-1.5 rounded px-1.5 py-0.5 text-[0.75em] font-bold uppercase tracking-wide" style={{ background: preview.good ? "rgba(201,162,75,0.3)" : "rgba(168,67,58,0.25)" }}>
              {preview.fitLabel}
            </span>
            {preview.note}
            {!isLockedNote(lockedIdx) && <span className="ml-1 italic" style={{ color: "rgba(248,245,238,0.45)" }}>(click to lock this in)</span>}
          </div>
        ) : (
          <p style={{ color: "rgba(248,245,238,0.45)" }}>{helper}</p>
        )}
      </div>
    </div>
  );
}

function isLockedNote(lockedIdx: number | null): boolean {
  return lockedIdx !== null;
}
