"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

const PERCENTS = [10, 20, 25, 50, 75];
const AMOUNTS = [20, 40, 60, 80, 120];

export function PercentOfAmount() {
  const [percent, setPercent] = useState(25);
  const [amount, setAmount] = useState(80);
  const [showWorking, setShowWorking] = useState(false);

  const result = (percent / 100) * amount;
  const decimal = percent / 100;

  return (
    <div>
      <div className="px-6 pb-2.5 pt-[26px] text-center font-mono text-[1.5em] font-bold" style={{ color: NOTES_GOLD }}>
        {percent}% of {amount} = {result}
      </div>

      <div className="flex justify-center px-6 pb-3">
        <div
          className="relative h-14 w-full max-w-[440px] overflow-hidden rounded-xl border"
          style={{ borderColor: "rgba(201,162,75,0.4)" }}
        >
          <div
            className="h-full transition-[width] duration-300"
            style={{ width: `${percent}%`, background: "linear-gradient(135deg,#e6c877,#C9A24B)" }}
          />
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute top-0 h-full w-px"
              style={{ left: `${mark}%`, background: "rgba(10,31,68,0.3)" }}
              title={`${mark}%`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center px-6 pb-4">
        <button
          onClick={() => setShowWorking((v) => !v)}
          className="rounded-full border px-4 py-1.5 text-[0.72em] font-bold uppercase tracking-wider transition-all"
          style={{
            background: showWorking ? "rgba(201,162,75,0.18)" : "rgba(255,255,255,0.05)",
            borderColor: "rgba(201,162,75,0.4)",
            color: NOTES_GOLD,
          }}
        >
          {showWorking ? "Hide the working" : "Show the working"}
        </button>
      </div>
      {showWorking && (
        <div
          className="mx-6 mb-5 animate-[ntfadein_0.3s_ease] rounded-xl border px-4 py-3 text-center font-mono text-[0.85em] leading-relaxed"
          style={{ background: "rgba(201,162,75,0.1)", borderColor: "rgba(201,162,75,0.3)", color: "#F8F5EE" }}
        >
          {percent}% = {percent}/100 = {decimal} &nbsp;→&nbsp; {decimal} × {amount} = <b style={{ color: NOTES_GOLD }}>{result}</b>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2.5 px-5 pb-3">
        {PERCENTS.map((p) => (
          <button
            key={p}
            onClick={() => setPercent(p)}
            className="rounded-full border px-3.5 py-2 font-mono text-[0.78em] font-bold transition-all"
            style={{
              background: percent === p ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: percent === p ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: percent === p ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            {p}%
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5 px-5 pb-7">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            onClick={() => setAmount(a)}
            className="rounded-full border px-3.5 py-2 font-mono text-[0.78em] font-bold transition-all"
            style={{
              background: amount === a ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: amount === a ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: amount === a ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            of {a}
          </button>
        ))}
      </div>
    </div>
  );
}
