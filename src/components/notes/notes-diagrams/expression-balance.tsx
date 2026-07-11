"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

function TermTile({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex h-12 min-w-12 items-center justify-center rounded-lg border px-3 font-mono text-[1em] font-bold"
      style={{ background: `linear-gradient(135deg, ${color}55, ${color}aa)`, borderColor: color, color: "#0A1F44" }}
    >
      {label}
    </div>
  );
}

/**
 * Interactive tile model for collecting like terms:
 * "3x + 2y + 4x + 5" style expressions built from a chosen number of
 * x-tiles, y-tiles and unit tiles, showing the simplified result.
 */
export function ExpressionBalance() {
  const [xCount, setXCount] = useState(3);
  const [yCount, setYCount] = useState(2);
  const [units, setUnits] = useState(4);

  const parts: string[] = [];
  if (xCount > 0) parts.push(`${xCount}x`);
  if (yCount > 0) parts.push(`${yCount}y`);
  if (units > 0) parts.push(`${units}`);
  const expression = parts.join(" + ") || "0";

  return (
    <div>
      <div className="px-6 pb-2.5 pt-[26px] text-center font-mono text-[1.3em] font-bold" style={{ color: NOTES_GOLD }}>
        {expression}
      </div>
      <div className="flex flex-wrap justify-center gap-2 px-6 pb-4">
        {Array.from({ length: xCount }).map((_, i) => (
          <TermTile key={`x${i}`} label="x" color="#e6c877" />
        ))}
        {Array.from({ length: yCount }).map((_, i) => (
          <TermTile key={`y${i}`} label="y" color="#7fb7c9" />
        ))}
        {Array.from({ length: units }).map((_, i) => (
          <TermTile key={`u${i}`} label="1" color="#c98f9c" />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-5 pb-7 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-[0.72em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">x terms</span>
          <button onClick={() => setXCount((v) => Math.max(0, v - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]" style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}>
            −
          </button>
          <div className="min-w-6 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>{xCount}</div>
          <button onClick={() => setXCount((v) => Math.min(8, v + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]" style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}>
            +
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[0.72em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">y terms</span>
          <button onClick={() => setYCount((v) => Math.max(0, v - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]" style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}>
            −
          </button>
          <div className="min-w-6 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>{yCount}</div>
          <button onClick={() => setYCount((v) => Math.min(8, v + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]" style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}>
            +
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[0.72em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">units</span>
          <button onClick={() => setUnits((v) => Math.max(0, v - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]" style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}>
            −
          </button>
          <div className="min-w-6 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>{units}</div>
          <button onClick={() => setUnits((v) => Math.min(8, v + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]" style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}>
            +
          </button>
        </div>
      </div>
      <div className="px-6 pb-6 text-center text-[0.78em] text-[rgba(248,245,238,0.6)]">
        Tiles of the same letter are &ldquo;like terms&rdquo; — collect them together by adding their counts.
      </div>
    </div>
  );
}
