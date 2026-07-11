"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

type Mode = "rectangle" | "triangle";

function Stepper({ value, min, max, onChange, label }: { value: number; min: number; max: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[0.7em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">{label}</span>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full border text-[0.95em] font-bold text-[#F8F5EE]"
        style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
      >
        −
      </button>
      <div className="min-w-6 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>
        {value}
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full border text-[0.95em] font-bold text-[#F8F5EE]"
        style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
      >
        +
      </button>
    </div>
  );
}

const CELL = 28;

export function AreaPerimeterGrid() {
  const [mode, setMode] = useState<Mode>("rectangle");
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(4);

  const area = mode === "rectangle" ? width * height : (width * height) / 2;
  const perimeter =
    mode === "rectangle"
      ? 2 * (width + height)
      : width + height + Math.round(Math.sqrt(width * width + height * height) * 100) / 100;

  const gridW = width * CELL;
  const gridH = height * CELL;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2 px-5 pt-[26px] pb-2">
        {(["rectangle", "triangle"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="rounded-full border px-3.5 py-2 text-[0.76em] font-bold capitalize transition-all"
            style={{
              background: mode === m ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: mode === m ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: mode === m ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="px-6 pb-2 text-center font-mono text-[1.05em] font-bold" style={{ color: NOTES_GOLD }}>
        Area = {area % 1 === 0 ? area : area.toFixed(1)} sq units &nbsp;·&nbsp; Perimeter = {perimeter % 1 === 0 ? perimeter : perimeter.toFixed(2)} units
      </div>

      <div className="flex justify-center overflow-x-auto px-6 pb-4 pt-2">
        <svg width={gridW + 40} height={gridH + 40} viewBox={`0 0 ${gridW + 40} ${gridH + 40}`}>
          <g transform="translate(20,20)">
            {Array.from({ length: height }).map((_, r) =>
              Array.from({ length: width }).map((_, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={c * CELL}
                  y={r * CELL}
                  width={CELL}
                  height={CELL}
                  fill="rgba(201,162,75,0.08)"
                  stroke="rgba(201,162,75,0.25)"
                  strokeWidth={1}
                />
              ))
            )}
            {mode === "rectangle" ? (
              <rect x={0} y={0} width={gridW} height={gridH} fill="none" stroke={NOTES_GOLD} strokeWidth={2.5} />
            ) : (
              <polygon
                points={`0,${gridH} ${gridW},${gridH} 0,0`}
                fill="rgba(201,162,75,0.22)"
                stroke={NOTES_GOLD}
                strokeWidth={2.5}
              />
            )}
            <text x={gridW / 2} y={gridH + 18} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill="#F8F5EE">
              {width}
            </text>
            <text x={-14} y={gridH / 2} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill="#F8F5EE" transform={`rotate(-90 -14 ${gridH / 2})`}>
              {height}
            </text>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 px-5 pb-7">
        <Stepper value={width} min={2} max={10} onChange={setWidth} label={mode === "rectangle" ? "Width" : "Base"} />
        <Stepper value={height} min={2} max={8} onChange={setHeight} label={mode === "rectangle" ? "Height" : "Height"} />
      </div>
    </div>
  );
}
