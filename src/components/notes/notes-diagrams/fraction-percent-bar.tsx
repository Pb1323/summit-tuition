"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

function simplify(numerator: number, denominator: number) {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(numerator, denominator) || 1;
  return { n: numerator / g, d: denominator / g };
}

export function FractionPercentBar() {
  const [denominator, setDenominator] = useState(4);
  const [numerator, setNumerator] = useState(1);

  const n = Math.min(numerator, denominator);
  const decimal = n / denominator;
  const percent = Math.round(decimal * 10000) / 100;
  const simplified = simplify(n, denominator);

  return (
    <div>
      <div className="px-6 pb-2.5 pt-[26px] text-center">
        <div className="font-mono text-[1.5em] font-bold" style={{ color: NOTES_GOLD }}>
          {n}/{denominator} = {decimal.toFixed(2).replace(/^0/, "0")} = {percent}%
        </div>
        {simplified.d !== denominator && (
          <div className="mt-1 text-[0.78em] text-[rgba(248,245,238,0.6)]">
            simplifies to {simplified.n}/{simplified.d}
          </div>
        )}
      </div>

      <div className="flex justify-center px-6 pb-5">
        <div className="flex h-14 w-full max-w-[440px] overflow-hidden rounded-xl border" style={{ borderColor: "rgba(201,162,75,0.4)" }}>
          {Array.from({ length: denominator }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r transition-colors duration-300 last:border-r-0"
              style={{
                borderColor: "rgba(10,31,68,0.4)",
                background: i < n ? "linear-gradient(135deg,#e6c877,#C9A24B)" : "rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 px-5 pb-7">
        <div className="flex items-center gap-3">
          <span className="text-[0.72em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">Shaded</span>
          <button
            onClick={() => setNumerator((v) => Math.max(0, v - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]"
            style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
          >
            −
          </button>
          <div className="min-w-8 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>
            {n}
          </div>
          <button
            onClick={() => setNumerator((v) => Math.min(denominator, v + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]"
            style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[0.72em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">Equal parts</span>
          <button
            onClick={() => setDenominator((v) => Math.max(2, v - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]"
            style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
          >
            −
          </button>
          <div className="min-w-8 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>
            {denominator}
          </div>
          <button
            onClick={() => setDenominator((v) => Math.min(12, v + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]"
            style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
