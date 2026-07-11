"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function RatioStepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[0.72em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">{label}</span>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]"
        style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
      >
        −
      </button>
      <div className="min-w-8 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>
        {value}
      </div>
      <button
        onClick={() => onChange(Math.min(12, value + 1))}
        className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]"
        style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
      >
        +
      </button>
    </div>
  );
}

function RatioVisual({ a, b, unitLabel }: { a: number; b: number; unitLabel?: (part: "a" | "b", value: number) => string }) {
  const g = gcd(a, b) || 1;
  const simplified = g > 1 ? `${a / g}:${b / g}` : null;
  const total = a + b;

  return (
    <div>
      <div className="px-6 pb-2.5 pt-[26px] text-center font-mono text-[1.5em] font-bold" style={{ color: NOTES_GOLD }}>
        {a} : {b}
        {simplified && <span className="ml-2 text-[0.6em] text-[rgba(248,245,238,0.6)]">(simplifies to {simplified})</span>}
      </div>

      <div className="flex justify-center px-6 pb-2">
        <div className="flex h-14 w-full max-w-[440px] overflow-hidden rounded-xl border" style={{ borderColor: "rgba(201,162,75,0.4)" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r transition-colors duration-300 last:border-r-0"
              style={{
                borderColor: "rgba(10,31,68,0.4)",
                background: i < a ? "linear-gradient(135deg,#e6c877,#C9A24B)" : "linear-gradient(135deg,#7fb7c9,#4f93a8)",
              }}
            />
          ))}
        </div>
      </div>

      {unitLabel && (
        <div className="flex justify-center gap-8 px-5 pb-2 text-[0.82em]">
          <span style={{ color: "#C9A24B" }}>{unitLabel("a", a)}</span>
          <span style={{ color: "#7fb7c9" }}>{unitLabel("b", b)}</span>
        </div>
      )}
    </div>
  );
}

export function RatioBar() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);

  return (
    <div>
      <RatioVisual a={a} b={b} />
      <div className="flex flex-wrap justify-center gap-8 px-5 pb-7 pt-2">
        <RatioStepper value={a} onChange={setA} label="Part A" />
        <RatioStepper value={b} onChange={setB} label="Part B" />
      </div>
    </div>
  );
}

export function RatioShareCalculator() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [total, setTotal] = useState(20);

  const parts = a + b;
  const shareA = Math.round(((a / parts) * total) * 100) / 100;
  const shareB = Math.round(((b / parts) * total) * 100) / 100;

  return (
    <div>
      <RatioVisual a={a} b={b} unitLabel={(part) => (part === "a" ? `A's share: ${shareA}` : `B's share: ${shareB}`)} />
      <div className="flex flex-wrap justify-center gap-8 px-5 pb-7 pt-2">
        <RatioStepper value={a} onChange={setA} label="Part A" />
        <RatioStepper value={b} onChange={setB} label="Part B" />
        <div className="flex items-center gap-2">
          <span className="text-[0.72em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">Total to share</span>
          <button
            onClick={() => setTotal((v) => Math.max(parts, v - 5))}
            className="flex h-8 w-8 items-center justify-center rounded-full border text-[1em] font-bold text-[#F8F5EE]"
            style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
          >
            −
          </button>
          <div className="min-w-10 text-center font-mono font-bold" style={{ color: NOTES_GOLD }}>
            {total}
          </div>
          <button
            onClick={() => setTotal((v) => Math.min(200, v + 5))}
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
