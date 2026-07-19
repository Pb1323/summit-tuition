"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

const PRESETS: { label: string; data: number[] }[] = [
  { label: "Set A", data: [4, 7, 7, 9, 12] },
  { label: "Set B", data: [2, 3, 3, 3, 8, 10] },
  { label: "Set C", data: [5, 5, 5, 5, 5] },
];

function mean(data: number[]) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function median(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function mode(data: number[]) {
  const counts = new Map<number, number>();
  data.forEach((n) => counts.set(n, (counts.get(n) ?? 0) + 1));
  const max = Math.max(...counts.values());
  if (max === 1) return "no mode";
  const modes = [...counts.entries()].filter(([, c]) => c === max).map(([v]) => v);
  return modes.sort((a, b) => a - b).join(", ");
}

function range(data: number[]) {
  return Math.max(...data) - Math.min(...data);
}

function fmt(n: number) {
  return Number.isInteger(n) ? n.toString() : n.toFixed(2).replace(/0$/, "").replace(/\.$/, "");
}

export function AverageCalculator() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [highlight, setHighlight] = useState<"mean" | "median" | "mode" | "range" | null>(null);

  const data = PRESETS[presetIndex].data;
  const sorted = [...data].sort((a, b) => a - b);
  const barMax = Math.max(...data);

  const stats = [
    { key: "mean" as const, label: "Mean", value: fmt(mean(data)) },
    { key: "median" as const, label: "Median", value: fmt(median(data) as number) },
    { key: "mode" as const, label: "Mode", value: mode(data) },
    { key: "range" as const, label: "Range", value: fmt(range(data)) },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 px-5 pb-1 pt-[22px]">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setPresetIndex(i);
              setHighlight(null);
            }}
            className="rounded-full border px-3.5 py-2 font-mono text-[0.75em] font-bold transition-all"
            style={{
              background: presetIndex === i ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: presetIndex === i ? "#0A1F44" : "rgba(248,245,238,0.65)",
              borderColor: presetIndex === i ? NOTES_GOLD : "rgba(201,162,75,0.3)",
            }}
          >
            {p.label}: {p.data.join(", ")}
          </button>
        ))}
      </div>

      <div className="flex items-end justify-center gap-2.5 px-5 pb-3 pt-6" style={{ height: 140 }}>
        {sorted.map((n, i) => {
          const isMedianBar =
            highlight === "median" &&
            (sorted.length % 2 === 0
              ? i === sorted.length / 2 - 1 || i === sorted.length / 2
              : i === Math.floor(sorted.length / 2));
          const isModeBar = highlight === "mode" && mode(data).split(", ").includes(String(n));
          const isRangeBar = highlight === "range" && (n === sorted[0] || n === sorted[sorted.length - 1]);
          const active = isMedianBar || isModeBar || isRangeBar;
          return (
            <div key={i} className="flex flex-col items-center justify-end" style={{ height: "100%" }}>
              <div
                className="w-9 rounded-t-[6px] transition-all duration-300"
                style={{
                  height: `${(n / barMax) * 100}%`,
                  background: active ? "linear-gradient(135deg,#e6c877,#C9A24B)" : "rgba(255,255,255,0.12)",
                  boxShadow: active ? "0 0 0 2px rgba(201,162,75,0.5)" : "none",
                }}
              />
              <div className="mt-1.5 font-mono text-[0.78em] font-bold text-[#F8F5EE]">{n}</div>
            </div>
          );
        })}
      </div>

      <div className="px-5 pb-2 text-center text-[0.72em] text-[rgba(248,245,238,0.5)]">
        Data sorted low → high. Tap a stat below to see which values it uses.
      </div>

      <div className="flex flex-wrap justify-center gap-3 px-5 pb-7 pt-3">
        {stats.map((s) => (
          <button
            key={s.key}
            onClick={() => setHighlight((h) => (h === s.key ? null : s.key))}
            className="min-w-[92px] rounded-2xl border px-4 py-3 text-center transition-all"
            style={{
              background: highlight === s.key ? "rgba(201,162,75,0.16)" : "rgba(255,255,255,0.04)",
              borderColor: highlight === s.key ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            <div className="text-[0.68em] font-bold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
              {s.label}
            </div>
            <div className="mt-1 font-mono text-[1.15em] font-bold text-[#F8F5EE]">{s.value}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
