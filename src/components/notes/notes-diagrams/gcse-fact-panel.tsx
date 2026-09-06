"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

export interface GcseFactItem {
  label: string;
  detail: string;
}

/**
 * Shared diagram primitive for GCSE Science notes — a click-to-reveal key-facts
 * panel. Rendered inside DiagramFrame (dark navy background), so text is light by
 * default. Each subtopic wraps this with its own hardcoded label/items rather than
 * getting a bespoke SVG diagram, matching the ClickErrorSentence/WordChipPicker
 * pattern of one shared interactive primitive reused across many subtopic files.
 */
export function GcseFactPanel({ title, items }: { title: string; items: GcseFactItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="px-6 pb-6 pt-3">
      <div className="mb-3 text-[0.95em] font-semibold text-[#F8F5EE]">{title}</div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <button
              key={item.label}
              onClick={() => setOpen(isOpen ? null : i)}
              className="rounded-xl border px-4 py-3 text-left transition-colors"
              style={{
                background: isOpen ? "rgba(201,162,75,0.14)" : "rgba(255,255,255,0.04)",
                borderColor: isOpen ? NOTES_GOLD : "rgba(201,162,75,0.25)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.85em] font-bold" style={{ color: isOpen ? NOTES_GOLD : "#F8F5EE" }}>
                  {item.label}
                </span>
                <span className="text-[0.75em]" style={{ color: NOTES_GOLD }}>
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              {isOpen && (
                <div className="mt-2 text-[0.82em] leading-relaxed text-[#F8F5EE]/85">{item.detail}</div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-[0.68em] italic text-[#F8F5EE]/45">Tap each card to reveal the detail.</div>
    </div>
  );
}
