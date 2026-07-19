"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

function lcmOf(a: number, b: number) {
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  return (a * b) / gcd(a, b);
}

function FractionRow({ n, d, color, label }: { n: number; d: number; color: string; label: string }) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-baseline justify-between text-[0.78em] text-[rgba(248,245,238,0.6)]">
        <span>{label}</span>
        <span className="font-mono font-bold" style={{ color }}>
          {n}/{d}
        </span>
      </div>
      <div className="flex h-9 w-full overflow-hidden rounded-lg border" style={{ borderColor: "rgba(201,162,75,0.4)" }}>
        {Array.from({ length: d }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r transition-colors duration-300 last:border-r-0"
            style={{
              borderColor: "rgba(10,31,68,0.4)",
              background: i < n ? color : "rgba(255,255,255,0.05)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

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

export function CommonDenominatorBars() {
  const [n1, setN1] = useState(1);
  const [d1, setD1] = useState(3);
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(4);

  const common = lcmOf(d1, d2);
  const scaled1 = n1 * (common / d1);
  const scaled2 = n2 * (common / d2);
  const sumNumerator = scaled1 + scaled2;

  return (
    <div>
      <div className="px-6 pt-[26px]">
        <FractionRow n={Math.min(n1, d1)} d={d1} color="linear-gradient(135deg,#e6c877,#C9A24B)" label="First fraction" />
        <FractionRow n={Math.min(n2, d2)} d={d2} color="linear-gradient(135deg,#7fb7c9,#4f93a8)" label="Second fraction" />
      </div>

      <div className="px-6 pb-2 pt-3">
        <div className="mb-1.5 text-[0.78em] text-[rgba(248,245,238,0.6)]">
          Common denominator ({common}):
        </div>
        <FractionRow n={Math.min(scaled1, common)} d={common} color="linear-gradient(135deg,#e6c877,#C9A24B)" label={`${n1}/${d1} → ${scaled1}/${common}`} />
        <FractionRow n={Math.min(scaled2, common)} d={common} color="linear-gradient(135deg,#7fb7c9,#4f93a8)" label={`${n2}/${d2} → ${scaled2}/${common}`} />
      </div>

      <div className="px-6 pb-2 text-center font-mono text-[1.2em] font-bold" style={{ color: NOTES_GOLD }}>
        Sum = {sumNumerator}/{common}
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-5 pb-7 pt-4">
        <Stepper value={n1} min={0} max={d1} onChange={setN1} label="n₁" />
        <Stepper value={d1} min={2} max={10} onChange={setD1} label="d₁" />
        <Stepper value={n2} min={0} max={d2} onChange={setN2} label="n₂" />
        <Stepper value={d2} min={2} max={10} onChange={setD2} label="d₂" />
      </div>
    </div>
  );
}
