"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

interface ColumnDef {
  key: string;
  exp?: number;
  label?: string;
  isPoint?: boolean;
}

const COLUMN_DEFS: ColumnDef[] = [
  { key: "Th", exp: 3, label: "Thousands" },
  { key: "H", exp: 2, label: "Hundreds" },
  { key: "T", exp: 1, label: "Tens" },
  { key: "U", exp: 0, label: "Units" },
  { key: "pt", isPoint: true },
  { key: "t", exp: -1, label: "Tenths" },
  { key: "h", exp: -2, label: "Hundredths" },
  { key: "th", exp: -3, label: "Thousandths" },
];

const COL_WIDTH = 50;
const SEP_WIDTH = 18;
const TILE_WIDTH = 42;

const PILLS: { value: number; label: string }[] = [
  { value: -2, label: "÷100" },
  { value: -1, label: "÷10" },
  { value: 0, label: "×1" },
  { value: 1, label: "×10" },
  { value: 2, label: "×100" },
];

export function PlaceValueHouse() {
  const [multiplier, setMultiplier] = useState(0);

  const layout = COLUMN_DEFS.reduce<{
    list: (ColumnDef & { left: number; width: number })[];
    cursor: number;
    colByExp: Record<number, number>;
  }>(
    (acc, c) => {
      const w = c.isPoint ? SEP_WIDTH : COL_WIDTH;
      const left = acc.cursor;
      const colByExp = !c.isPoint && c.exp !== undefined ? { ...acc.colByExp, [c.exp]: left } : acc.colByExp;
      return { list: [...acc.list, { ...c, left, width: w }], cursor: acc.cursor + w, colByExp };
    },
    { list: [], cursor: 0, colByExp: {} }
  );
  const columns = layout.list;
  const cursor = layout.cursor;
  const colByExp = layout.colByExp;

  const baseNumber = 4.5 * Math.pow(10, multiplier);
  const resultLabel = Number.isInteger(baseNumber)
    ? baseNumber.toFixed(0)
    : baseNumber.toFixed(2).replace(/0$/, "");

  const digits = [
    { home: 0, value: "4" },
    { home: -1, value: "5" },
  ].map((d) => {
    const newExp = Math.max(-3, Math.min(3, d.home + multiplier));
    const left = colByExp[newExp] + (COL_WIDTH - TILE_WIDTH) / 2;
    return { value: d.value, left };
  });

  return (
    <div>
      <div className="flex justify-center overflow-x-auto px-2.5 pb-2 pt-[26px]">
        <div className="relative flex" style={{ width: cursor }}>
          {columns.map((col) => (
            <div key={col.key} className="flex flex-none flex-col items-center" style={{ width: col.width }}>
              <div className="mb-1.5 font-mono text-[0.6em] tracking-wide text-[rgba(248,245,238,0.55)]">
                {col.label ?? ""}
              </div>
              <div
                className="flex items-center justify-center rounded-[10px]"
                style={
                  col.isPoint
                    ? { width: "4px", height: "52px", margin: "0 auto", alignItems: "flex-end" }
                    : {
                        width: TILE_WIDTH,
                        height: "52px",
                        border: "1.5px solid rgba(201,162,75,0.35)",
                        background: "rgba(255,255,255,0.03)",
                      }
                }
              >
                {col.isPoint && <span className="text-[1.4em] font-extrabold" style={{ color: NOTES_GOLD }}>.</span>}
              </div>
            </div>
          ))}

          {digits.map((d, i) => (
            <div
              key={i}
              className="absolute flex h-[52px] items-center justify-center rounded-[10px] font-mono text-[1.5em] font-bold text-[#0A1F44] shadow-lg transition-[left] duration-500"
              style={{
                left: d.left,
                top: "24px",
                width: TILE_WIDTH,
                background: "linear-gradient(135deg,#e6c877,#C9A24B)",
              }}
            >
              {d.value}
            </div>
          ))}
        </div>
      </div>

      <div className="my-1.5 text-center font-mono text-[1.5em] font-bold" style={{ color: NOTES_GOLD }}>
        {resultLabel}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3.5 px-5 pb-7">
        <button
          onClick={() => setMultiplier((v) => Math.max(-2, v - 1))}
          className="rounded-[10px] border px-3.5 py-2.5 text-[0.8em] font-bold text-[#F8F5EE]"
          style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
        >
          ◀ ÷10
        </button>
        <div className="flex gap-1.5">
          {PILLS.map((p) => (
            <button
              key={p.value}
              onClick={() => setMultiplier(p.value)}
              className="rounded-full border px-3 py-2 font-mono text-[0.72em] font-bold transition-all"
              style={{
                background: multiplier === p.value ? NOTES_GOLD : "rgba(255,255,255,0.06)",
                color: multiplier === p.value ? "#0A1F44" : "rgba(248,245,238,0.6)",
                borderColor: multiplier === p.value ? NOTES_GOLD : "rgba(201,162,75,0.25)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setMultiplier((v) => Math.min(2, v + 1))}
          className="rounded-[10px] border px-3.5 py-2.5 text-[0.8em] font-bold text-[#F8F5EE]"
          style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
        >
          ×10 ▶
        </button>
      </div>
    </div>
  );
}
