"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

const SCALES = [
  { label: "÷2", factor: 0.5 },
  { label: "×1", factor: 1 },
  { label: "×2", factor: 2 },
  { label: "×3", factor: 3 },
  { label: "×4", factor: 4 },
];

export function ScaleFactorLinker() {
  const [flour, setFlour] = useState(200);
  const sugar = flour / 2;
  const [factor, setFactor] = useState(1);
  const [previewFactor, setPreviewFactor] = useState<number | null>(null);

  const displayFactor = previewFactor ?? factor;
  const scaledFlour = Math.round(flour * displayFactor * 100) / 100;
  const scaledSugar = Math.round(sugar * displayFactor * 100) / 100;

  return (
    <div>
      <div className="px-6 pb-1 pt-[26px] text-center text-[0.78em] text-[rgba(248,245,238,0.6)]">
        Original recipe ratio flour : sugar = {flour} : {sugar}
      </div>
      <div
        className="px-6 pb-4 pt-2 text-center font-mono text-[1.4em] font-bold transition-opacity duration-150"
        style={{ color: NOTES_GOLD, opacity: previewFactor !== null ? 0.6 : 1 }}
      >
        {scaledFlour}g flour : {scaledSugar}g sugar
        {previewFactor !== null && <span className="ml-2 text-[0.6em] font-normal text-[rgba(248,245,238,0.5)]">(preview)</span>}
      </div>

      <div className="flex justify-center gap-6 px-6 pb-5">
        <div className="text-center">
          <div className="mb-2 text-[0.7em] uppercase tracking-wider text-[rgba(248,245,238,0.55)]">Flour</div>
          <div
            className="mx-auto w-16 rounded-lg transition-all duration-300"
            style={{ height: Math.min(120, scaledFlour / 3), background: "linear-gradient(135deg,#e6c877,#C9A24B)" }}
          />
        </div>
        <div className="text-center">
          <div className="mb-2 text-[0.7em] uppercase tracking-wider text-[rgba(248,245,238,0.55)]">Sugar</div>
          <div
            className="mx-auto w-16 rounded-lg transition-all duration-300"
            style={{ height: Math.min(120, scaledSugar / 3), background: "linear-gradient(135deg,#7fb7c9,#4f93a8)" }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 px-5 pb-3">
        {SCALES.map((s) => (
          <button
            key={s.label}
            onClick={() => setFactor(s.factor)}
            onMouseEnter={() => setPreviewFactor(s.factor)}
            onMouseLeave={() => setPreviewFactor(null)}
            onFocus={() => setPreviewFactor(s.factor)}
            onBlur={() => setPreviewFactor(null)}
            className="rounded-full border px-3.5 py-2 font-mono text-[0.78em] font-bold transition-all"
            style={{
              background: factor === s.factor ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: factor === s.factor ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: factor === s.factor ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 px-5 pb-7">
        {[100, 150, 200, 250].map((f) => (
          <button
            key={f}
            onClick={() => setFlour(f)}
            className="rounded-full border px-3.5 py-2 font-mono text-[0.72em] font-bold transition-all"
            style={{
              background: flour === f ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: flour === f ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: flour === f ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            base {f}g flour
          </button>
        ))}
      </div>
    </div>
  );
}
