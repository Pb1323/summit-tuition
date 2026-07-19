"use client";

import { useState } from "react";
import { NOTES_GOLD, NOTES_CREAM } from "../notes-theme";

export interface AlignerItem {
  text: string;
  form: string;
  broken?: {
    fixedText: string;
    fixedForm: string;
    note: string;
  };
}

export interface ParallelListAlignerProps {
  heading: string;
  lead: string;
  items: AlignerItem[];
}

/**
 * Visualises parallel-structure lists as aligned rows with a grammatical
 * "form tag" per item. The item that breaks the pattern is outlined in red;
 * clicking it swaps in the corrected wording/tag and pops all rows into
 * visual alignment.
 */
export function ParallelListAligner({ heading, lead, items }: ParallelListAlignerProps) {
  const [fixed, setFixed] = useState(false);
  const brokenNote = items.find((i) => i.broken)?.broken?.note;

  return (
    <div className="mx-6 mb-4 rounded-2xl border p-4" style={{ borderColor: "rgba(201,162,75,0.3)", background: "rgba(255,255,255,0.03)" }}>
      <p className="mb-1 text-[0.7em] font-bold uppercase tracking-widest" style={{ color: NOTES_GOLD }}>
        {heading}
      </p>
      <p className="mb-3 text-[0.78em]" style={{ color: "rgba(248,245,238,0.6)" }}>
        {lead}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => {
          const isBroken = !!item.broken;
          const showFixed = isBroken && fixed;
          const label = showFixed ? item.broken!.fixedText : item.text;
          const form = showFixed ? item.broken!.fixedForm : item.form;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => isBroken && !fixed && setFixed(true)}
              disabled={!isBroken || fixed}
              className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors duration-300"
              style={{
                borderColor: isBroken && !fixed ? "rgba(168,67,58,0.5)" : "rgba(248,245,238,0.15)",
                background: isBroken && !fixed ? "rgba(168,67,58,0.1)" : "rgba(255,255,255,0.04)",
                cursor: isBroken && !fixed ? "pointer" : "default",
                animation: showFixed ? "ntpopcheck 0.35s ease" : "none",
              }}
            >
              <span className="font-serif text-[0.95em]" style={{ color: NOTES_CREAM }}>
                {label}
              </span>
              <span
                className="shrink-0 rounded-md border px-2 py-0.5 font-mono text-[0.72em] font-bold"
                style={{
                  borderColor: isBroken && !fixed ? "#A8433A" : NOTES_GOLD,
                  color: isBroken && !fixed ? "#E8A79E" : NOTES_GOLD,
                }}
              >
                {form}
              </span>
            </button>
          );
        })}
      </div>
      {fixed ? (
        <div
          className="mb-1 mt-3 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-[0.82em] leading-relaxed"
          style={{ background: "rgba(201,162,75,0.12)", borderColor: "rgba(201,162,75,0.35)", color: NOTES_CREAM }}
        >
          ✓ {brokenNote}
        </div>
      ) : (
        <p className="mt-3 text-[0.72em]" style={{ color: "rgba(248,245,238,0.45)" }}>
          Click the item that breaks the pattern to line it up with the rest of the list.
        </p>
      )}
    </div>
  );
}
