"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

const STARTS = [1, 2, 3, 5];
const STEPS = [1, 2, 3, 4, 5];

/**
 * Interactive linear sequence visualiser: shows a run of terms as a bar
 * chart with the common difference labelled between each step, plus the
 * nth-term rule derived live from the chosen first term and step.
 */
export function SequenceStepVisualizer() {
  const [first, setFirst] = useState(3);
  const [step, setStep] = useState(4);

  const terms = Array.from({ length: 6 }, (_, i) => first + step * i);
  const maxTerm = Math.max(...terms);
  const constant = first - step;
  const nthTerm = constant === 0 ? `${step}n` : constant > 0 ? `${step}n + ${constant}` : `${step}n − ${Math.abs(constant)}`;

  return (
    <div>
      <div className="px-6 pb-1 pt-[26px] text-center font-mono text-[1.3em] font-bold" style={{ color: NOTES_GOLD }}>
        {terms.join(", ")}, …
      </div>
      <div className="px-6 pb-4 text-center text-[0.78em] text-[rgba(248,245,238,0.6)]">
        nth term rule: <b style={{ color: NOTES_GOLD }}>{nthTerm}</b>
      </div>

      <div className="flex items-end justify-center gap-3 px-6 pb-2" style={{ height: 130 }}>
        {terms.map((t, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-[0.72em] font-bold" style={{ color: NOTES_GOLD }}>
              {t}
            </span>
            <div
              className="w-8 rounded-t-md transition-all duration-300"
              style={{
                height: Math.max(6, (t / maxTerm) * 90),
                background: "linear-gradient(135deg,#e6c877,#C9A24B)",
              }}
            />
            <span className="text-[0.65em] text-[rgba(248,245,238,0.5)]">T{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 px-6 pb-6">
        {Array.from({ length: terms.length - 1 }).map((_, i) => (
          <div key={i} className="flex-1 max-w-[70px] text-center text-[0.68em]" style={{ color: "rgba(127,183,201,0.9)" }}>
            +{step}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 px-5 pb-3">
        {STARTS.map((v) => (
          <button
            key={v}
            onClick={() => setFirst(v)}
            className="rounded-full border px-3.5 py-2 font-mono text-[0.78em] font-bold transition-all"
            style={{
              background: first === v ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: first === v ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: first === v ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            start {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 px-5 pb-7">
        {STEPS.map((v) => (
          <button
            key={v}
            onClick={() => setStep(v)}
            className="rounded-full border px-3.5 py-2 font-mono text-[0.78em] font-bold transition-all"
            style={{
              background: step === v ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: step === v ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: step === v ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            step +{v}
          </button>
        ))}
      </div>
    </div>
  );
}
