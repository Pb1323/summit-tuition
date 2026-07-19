"use client";

import { useState } from "react";
import { NOTES_GOLD, NOTES_CREAM } from "../notes-theme";

export interface ClueToken {
  text: string;
  clue?: boolean;
  note?: string;
}

export interface ContextClueHighlighterProps {
  heading: string;
  tokens: ClueToken[];
}

/**
 * Renders a cloze sentence with specific context-clue words underlined in
 * dotted gold; clicking one reveals why it points to the correct answer.
 * Reinforces "read the whole sentence, not just the gap" as a visual habit
 * rather than a rule stated in prose.
 */
export function ContextClueHighlighter({ heading, tokens }: ContextClueHighlighterProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="mx-6 mb-4 rounded-2xl border p-4" style={{ borderColor: "rgba(201,162,75,0.3)", background: "rgba(255,255,255,0.03)" }}>
      <p className="mb-3 text-[0.7em] font-bold uppercase tracking-widest" style={{ color: NOTES_GOLD }}>
        {heading}
      </p>
      <p className="m-0 font-serif text-[0.98em] leading-[1.9]">
        {tokens.map((tk, idx) => (
          <span
            key={idx}
            onClick={() => tk.clue && setActiveIdx(idx)}
            className="rounded px-[2px] transition-colors duration-300"
            style={{
              color: NOTES_CREAM,
              cursor: tk.clue ? "pointer" : "default",
              borderBottom: tk.clue ? `2px dotted ${NOTES_GOLD}` : "none",
              background: activeIdx === idx ? "rgba(201,162,75,0.22)" : "transparent",
            }}
          >
            {tk.text}{" "}
          </span>
        ))}
      </p>
      <div className="mt-3 min-h-[2.6em] animate-[ntfadein_0.25s_ease] text-[0.8em] leading-relaxed" style={{ color: "rgba(248,245,238,0.7)" }}>
        {activeIdx !== null ? tokens[activeIdx].note : "Dotted underlines mark context clues — click one to see how it points to the answer."}
      </div>
    </div>
  );
}
