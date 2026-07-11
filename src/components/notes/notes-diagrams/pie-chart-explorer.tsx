"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

interface Slice {
  label: string;
  value: number;
  color: string;
}

const SLICES: Slice[] = [
  { label: "Football", value: 40, color: "#C9A24B" },
  { label: "Swimming", value: 25, color: "#8fb3e0" },
  { label: "Tennis", value: 20, color: "#e08a80" },
  { label: "Athletics", value: 15, color: "#7fd6b0" },
];

const TOTAL_CHILDREN = 60;

function toPercent(v: number) {
  return Math.round((v / 100) * 100);
}

export function PieChartExplorer() {
  const [active, setActive] = useState<string | null>(null);

  const gradientStops = SLICES.reduce<{ text: string[]; cursor: number }>(
    (acc, s) => {
      const start = acc.cursor;
      const end = start + s.value;
      return { text: [...acc.text, `${s.color} ${start}% ${end}%`], cursor: end };
    },
    { text: [], cursor: 0 }
  ).text.join(", ");

  const activeSlice = SLICES.find((s) => s.label === active) ?? null;
  const activeCount = activeSlice ? Math.round((activeSlice.value / 100) * TOTAL_CHILDREN) : null;

  return (
    <div>
      <div className="px-5 pt-[22px] text-center text-[0.78em] text-[rgba(248,245,238,0.6)]">
        Favourite sport of {TOTAL_CHILDREN} Year 6 pupils
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 px-5 pb-3 pt-6">
        <div
          className="relative h-[170px] w-[170px] flex-none rounded-full transition-all duration-300"
          style={{
            background: `conic-gradient(${gradientStops})`,
            boxShadow: "0 0 0 3px rgba(201,162,75,0.25)",
          }}
        >
          <div
            className="absolute inset-[26%] flex items-center justify-center rounded-full text-center font-mono text-[0.85em] font-bold text-[#F8F5EE]"
            style={{ background: "#0A1F44" }}
          >
            {activeSlice ? `${toPercent(activeSlice.value)}%` : "?"}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {SLICES.map((s) => (
            <button
              key={s.label}
              onClick={() => setActive((a) => (a === s.label ? null : s.label))}
              className="flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all"
              style={{
                background: active === s.label ? "rgba(201,162,75,0.14)" : "rgba(255,255,255,0.03)",
                borderColor: active === s.label ? NOTES_GOLD : "rgba(201,162,75,0.2)",
              }}
            >
              <span className="h-3 w-3 flex-none rounded-full" style={{ background: s.color }} />
              <span className="text-[0.82em] font-bold text-[#F8F5EE]">{s.label}</span>
              <span className="ml-auto font-mono text-[0.78em]" style={{ color: NOTES_GOLD }}>
                {s.value}%
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-2 text-center text-[0.72em] text-[rgba(248,245,238,0.5)]">
        Tap a sport to see its share and how many of the {TOTAL_CHILDREN} pupils that represents.
      </div>

      <div
        className="mx-5 mb-7 mt-3 rounded-2xl border px-5 py-4 text-center"
        style={{ background: "rgba(201,162,75,0.08)", borderColor: "rgba(201,162,75,0.3)" }}
      >
        {activeSlice ? (
          <div className="text-[0.86em] text-[#F8F5EE]">
            <b style={{ color: NOTES_GOLD }}>{activeSlice.label}</b>: {activeSlice.value}% of {TOTAL_CHILDREN} pupils = {activeSlice.value}/100 ×{" "}
            {TOTAL_CHILDREN} = <b style={{ color: NOTES_GOLD }}>{activeCount} pupils</b>
          </div>
        ) : (
          <div className="text-[0.82em] text-[rgba(248,245,238,0.55)]">Select a sport to reveal the calculation.</div>
        )}
      </div>
    </div>
  );
}
