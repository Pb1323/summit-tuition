"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

export function SquareCubeArray() {
  const [n, setN] = useState(4);

  const unit = Math.max(10, Math.min(26, Math.floor(180 / n)));
  const squareResult = n * n;
  const cubeResult = n * n * n;

  const cubeUnit = Math.max(8, Math.min(18, Math.floor(120 / n)));
  const s = n * cubeUnit;
  const faceGridBase = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    display: "grid",
    gridTemplateColumns: `repeat(${n}, ${cubeUnit}px)`,
    gridTemplateRows: `repeat(${n}, ${cubeUnit}px)`,
    gap: "1px",
    width: s,
    height: s,
    backfaceVisibility: "hidden" as const,
  };
  const cellCount = Array.from({ length: n * n });

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-[60px] px-5 pb-2.5 pt-[26px]">
        <div className="text-center">
          <div className="mb-2.5 text-[0.72em] text-[rgba(248,245,238,0.55)]">
            {n} × {n} = <b style={{ color: NOTES_GOLD }}>{squareResult}</b>
          </div>
          <div
            className="mx-auto grid gap-0.5 transition-all duration-300"
            style={{ gridTemplateColumns: `repeat(${n}, ${unit}px)`, gridTemplateRows: `repeat(${n}, ${unit}px)` }}
          >
            {cellCount.map((_, i) => (
              <div
                key={i}
                className="rounded-[3px]"
                style={{ background: "linear-gradient(135deg,#e6c877,#C9A24B)", boxShadow: "inset 0 0 0 1px rgba(10,31,68,0.25)" }}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="mb-2.5 text-[0.72em] text-[rgba(248,245,238,0.55)]">
            {n} × {n} × {n} = <b style={{ color: NOTES_GOLD }}>{cubeResult}</b>
          </div>
          <div className="mx-auto flex h-[190px] w-[190px] items-center justify-center" style={{ perspective: "700px" }}>
            <div
              className="relative transition-all duration-500"
              style={{ width: s, height: s, transformStyle: "preserve-3d", transform: "rotateX(-30deg) rotateY(-45deg)" }}
            >
              <div style={{ ...faceGridBase, transform: `rotateX(90deg) translateZ(${s / 2}px)` }}>
                {cellCount.map((_, i) => (
                  <div key={i} className="rounded-[2px]" style={{ background: "linear-gradient(135deg,#f0d68e,#dcb968)" }} />
                ))}
              </div>
              <div style={{ ...faceGridBase, transform: `translateZ(${s / 2}px)` }}>
                {cellCount.map((_, i) => (
                  <div key={i} className="rounded-[2px]" style={{ background: "linear-gradient(135deg,#C9A24B,#b8933f)" }} />
                ))}
              </div>
              <div style={{ ...faceGridBase, transform: `rotateY(90deg) translateZ(${s / 2}px)` }}>
                {cellCount.map((_, i) => (
                  <div key={i} className="rounded-[2px]" style={{ background: "linear-gradient(135deg,#a9823a,#8f6d2f)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 px-5 pb-7 pt-3.5">
        <button
          onClick={() => setN((v) => Math.max(1, v - 1))}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border text-[1.2em] font-bold text-[#F8F5EE]"
          style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
        >
          −
        </button>
        <div className="min-w-16 text-center font-mono text-[1em] font-bold" style={{ color: NOTES_GOLD }}>
          n = {n}
        </div>
        <button
          onClick={() => setN((v) => Math.min(10, v + 1))}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border text-[1.2em] font-bold text-[#F8F5EE]"
          style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
        >
          +
        </button>
      </div>
    </div>
  );
}
