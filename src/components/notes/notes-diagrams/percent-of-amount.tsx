"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

const PERCENTS = [10, 20, 25, 50, 75];
const AMOUNTS = [20, 40, 60, 80, 120];

export function PercentOfAmount() {
  const [percent, setPercent] = useState(25);
  const [amount, setAmount] = useState(80);

  const result = (percent / 100) * amount;

  return (
    <div>
      <div className="px-6 pb-2.5 pt-[26px] text-center font-mono text-[1.5em] font-bold" style={{ color: NOTES_GOLD }}>
        {percent}% of {amount} = {result}
      </div>

      <div className="flex justify-center px-6 pb-5">
        <div className="h-14 w-full max-w-[440px] overflow-hidden rounded-xl border" style={{ borderColor: "rgba(201,162,75,0.4)" }}>
          <div
            className="h-full transition-[width] duration-300"
            style={{ width: `${percent}%`, background: "linear-gradient(135deg,#e6c877,#C9A24B)" }}
          />
        </div>
      </div>

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
