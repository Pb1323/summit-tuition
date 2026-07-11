"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

const A_OPTIONS = [2, 3, 4, 5];
const B_OPTIONS = [1, 2, 3, 4, 5, 6];
const C_OPTIONS = [6, 9, 11, 13, 16, 19];

/**
 * Interactive balance scale for ax + b = c style linear equations.
 * Both pans always show equal totals (the equation is always "true"),
 * illustrating that solving means isolating x while keeping the balance.
 */
export function BalanceScaleEquation() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(19);

  const xValue = (c - b) / a;
  const isWhole = Number.isInteger(xValue) && xValue > 0;
  const tilt = isWhole ? 0 : c > a * 4 + b ? -4 : 4;

  return (
    <div>
      <div className="px-6 pb-1 pt-[26px] text-center font-mono text-[1.4em] font-bold" style={{ color: NOTES_GOLD }}>
        {a}x {b >= 0 ? "+" : "−"} {Math.abs(b)} = {c}
      </div>
      <div className="px-6 pb-4 text-center text-[0.78em] text-[rgba(248,245,238,0.6)]">
        {isWhole ? (
          <>
            Solving gives <b style={{ color: NOTES_GOLD }}>x = {xValue}</b>
          </>
        ) : (
          "Adjust the numbers below to find a whole-number solution"
        )}
      </div>

      {/* Balance beam */}
      <div className="flex justify-center px-6 pb-3">
        <div
          className="relative h-1 w-full max-w-[420px] rounded-full transition-transform duration-300"
          style={{ background: "rgba(201,162,75,0.4)", transform: `rotate(${tilt}deg)` }}
        >
          {/* pivot */}
          <div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45"
            style={{ background: NOTES_GOLD }}
          />
        </div>
      </div>

      <div className="flex justify-center gap-10 px-6 pb-5">
        <div className="text-center">
          <div className="mb-2 text-[0.7em] uppercase tracking-wider text-[rgba(248,245,238,0.55)]">Left pan</div>
          <div
            className="flex min-h-16 min-w-28 flex-wrap items-center justify-center gap-1.5 rounded-xl border p-3"
            style={{ borderColor: "rgba(201,162,75,0.4)", background: "rgba(230,200,119,0.12)" }}
          >
            {Array.from({ length: a }).map((_, i) => (
              <div
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-md font-mono text-[0.85em] font-bold"
                style={{ background: "linear-gradient(135deg,#e6c877,#C9A24B)", color: "#0A1F44" }}
              >
                x
              </div>
            ))}
            {b > 0 && (
              <div
                className="flex h-9 min-w-9 items-center justify-center rounded-md px-1.5 font-mono text-[0.85em] font-bold"
                style={{ background: "linear-gradient(135deg,#c98f9c,#a8607a)", color: "#0A1F44" }}
              >
                +{b}
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-[0.7em] uppercase tracking-wider text-[rgba(248,245,238,0.55)]">Right pan</div>
          <div
            className="flex min-h-16 min-w-28 items-center justify-center rounded-xl border p-3"
            style={{ borderColor: "rgba(201,162,75,0.4)", background: "rgba(127,183,201,0.12)" }}
          >
            <div
              className="flex h-9 min-w-9 items-center justify-center rounded-md px-2 font-mono text-[0.85em] font-bold"
              style={{ background: "linear-gradient(135deg,#7fb7c9,#4f93a8)", color: "#0A1F44" }}
            >
              {c}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 px-5 pb-3">
        {A_OPTIONS.map((v) => (
          <button
            key={v}
            onClick={() => setA(v)}
            className="rounded-full border px-3 py-1.5 font-mono text-[0.72em] font-bold transition-all"
            style={{
              background: a === v ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: a === v ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: a === v ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            a = {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 px-5 pb-3">
        {B_OPTIONS.map((v) => (
          <button
            key={v}
            onClick={() => setB(v)}
            className="rounded-full border px-3 py-1.5 font-mono text-[0.72em] font-bold transition-all"
            style={{
              background: b === v ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: b === v ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: b === v ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            b = {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 px-5 pb-7">
        {C_OPTIONS.map((v) => (
          <button
            key={v}
            onClick={() => setC(v)}
            className="rounded-full border px-3 py-1.5 font-mono text-[0.72em] font-bold transition-all"
            style={{
              background: c === v ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: c === v ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: c === v ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            c = {v}
          </button>
        ))}
      </div>
    </div>
  );
}
