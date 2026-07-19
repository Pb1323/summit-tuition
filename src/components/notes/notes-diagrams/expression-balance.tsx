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

function TermCluster({ count, label, color }: { count: number; label: string; color: string }) {
  if (count === 0) return null;
  const suffix = label === "1" ? "" : label;
  return (
    <div
      className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-dashed p-2 transition-all duration-300"
      style={{ borderColor: color }}
    >
      <div className="flex flex-wrap justify-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <TermTile key={i} label={label} color={color} />
        ))}
      </div>
      <div className="font-mono text-[0.75em] font-bold" style={{ color }}>
        collected: {count}
        {suffix}
      </div>
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
  const [grouped, setGrouped] = useState(false);

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
      {grouped ? (
        <div className="flex flex-wrap items-start justify-center gap-3 px-6 pb-2">
          <TermCluster count={xCount} label="x" color="#e6c877" />
          <TermCluster count={yCount} label="y" color="#7fb7c9" />
          <TermCluster count={units} label="1" color="#c98f9c" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 px-6 pb-2">
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
      )}

      <div className="flex justify-center px-6 pb-4 pt-2">
        <button
          onClick={() => setGrouped((v) => !v)}
          className="rounded-full border px-4 py-1.5 text-[0.72em] font-bold uppercase tracking-wider transition-all"
          style={{
            background: grouped ? "rgba(201,162,75,0.18)" : "rgba(255,255,255,0.05)",
            borderColor: "rgba(201,162,75,0.4)",
            color: NOTES_GOLD,
            cursor: "pointer",
          }}
        >
          {grouped ? "Hide the collecting step" : "Collect the like terms"}
        </button>
      </div>
      {grouped && (
        <div
          className="mx-6 mb-4 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-center font-mono text-[0.82em] leading-relaxed"
          style={{ background: "rgba(201,162,75,0.1)", borderColor: "rgba(201,162,75,0.3)", color: "#F8F5EE" }}
        >
          the tiles have been sorted into dashed clusters by colour — same-letter tiles are &ldquo;like terms&rdquo; and can be added together, but x-tiles and y-tiles can never be combined with each other.
        </div>
      )}

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
