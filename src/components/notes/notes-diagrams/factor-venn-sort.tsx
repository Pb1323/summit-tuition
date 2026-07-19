"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

function factorsOf(n: number) {
  const out: number[] = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) out.push(i);
  return out;
}

function hcf(a: number, b: number) {
  const fa = factorsOf(a);
  const fb = new Set(factorsOf(b));
  let m = 1;
  fa.forEach((f) => {
    if (fb.has(f) && f > m) m = f;
  });
  return m;
}

function lcm(a: number, b: number) {
  return Math.round((a * b) / hcf(a, b));
}

type Zone = "a" | "b" | "both";

export function FactorVennSort() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(18);
  const [placements, setPlacements] = useState<Record<number, Zone>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);

  const fA = new Set(factorsOf(a));
  const fB = new Set(factorsOf(b));
  const allFactors = [...new Set([...fA, ...fB])].sort((x, y) => x - y);

  const zoneOf = (n: number): Zone => {
    if (fA.has(n) && fB.has(n)) return "both";
    if (fA.has(n)) return "a";
    return "b";
  };

  const attemptPlace = (n: number | null, zone: Zone) => {
    if (n == null) return;
    if (zoneOf(n) === zone) {
      setPlacements((p) => ({ ...p, [n]: zone }));
      setSelected(null);
      setDragging(null);
      setWrong(null);
    } else {
      setWrong(n);
      setSelected(null);
      setDragging(null);
      window.setTimeout(() => setWrong((w) => (w === n ? null : w)), 550);
    }
  };

  const resetNumbers = (nextA: number, nextB: number) => {
    setA(nextA);
    setB(nextB);
    setPlacements({});
    setSelected(null);
  };

  const chipStyle = (n: number, placed: boolean) => ({
    background: wrong === n ? "#a8433a" : selected === n ? NOTES_GOLD : placed ? NOTES_GOLD : "rgba(255,255,255,0.08)",
    color: wrong === n ? "#F8F5EE" : selected === n || placed ? "#0A1F44" : "#F8F5EE",
    animation: wrong === n ? "ntshake 0.45s ease" : placed ? "ntsnap 0.4s ease" : "none",
    boxShadow: selected === n ? "0 0 0 3px rgba(201,162,75,0.35)" : "none",
    cursor: placed ? "default" : "grab",
  });

  const pool = allFactors.filter((n) => !placements[n]);
  const zoneList = (zone: Zone) => allFactors.filter((n) => placements[n] === zone);

  const zoneBox = (zone: Zone, label: string) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        attemptPlace(dragging, zone);
      }}
      onClick={() => attemptPlace(selected, zone)}
      className="min-h-[90px] flex-1 basis-[150px] rounded-2xl border-[1.5px] border-dashed p-3.5 transition-colors"
      style={
        zone === "both"
          ? { borderColor: NOTES_GOLD, background: "rgba(201,162,75,0.08)" }
          : { borderColor: "rgba(201,162,75,0.4)", background: "rgba(255,255,255,0.03)" }
      }
    >
      <div className="mb-2.5 text-center text-[0.68em] font-bold uppercase tracking-wider text-[rgba(248,245,238,0.55)]">
        {label}
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {zoneList(zone).map((n) => (
          <div
            key={n}
            className="inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-[10px] px-2 font-mono text-[0.8em] font-bold"
            style={chipStyle(n, true)}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5 px-5 pb-1.5 pt-[18px]">
        <label className="flex flex-col gap-1.5 text-[0.72em] font-bold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
          Number A
          <input
            type="number"
            min={1}
            max={60}
            value={a}
            onChange={(e) => resetNumbers(Math.max(1, Math.min(60, +e.target.value || 1)), b)}
            className="w-20 rounded-[10px] border px-2.5 py-2 font-mono text-[1em] text-[#F8F5EE]"
            style={{ borderColor: "rgba(201,162,75,0.4)", background: "rgba(255,255,255,0.06)" }}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[0.72em] font-bold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
          Number B
          <input
            type="number"
            min={1}
            max={60}
            value={b}
            onChange={(e) => resetNumbers(a, Math.max(1, Math.min(60, +e.target.value || 1)))}
            className="w-20 rounded-[10px] border px-2.5 py-2 font-mono text-[1em] text-[#F8F5EE]"
            style={{ borderColor: "rgba(201,162,75,0.4)", background: "rgba(255,255,255,0.06)" }}
          />
        </label>
      </div>

      <div className="px-6 pb-1 pt-2 text-center text-[0.78em] text-[rgba(248,245,238,0.6)]">
        Drag or tap a number, then drop it into the zone where it belongs.
      </div>

      <div className="flex min-h-[52px] flex-wrap justify-center gap-2 px-6 pb-1 pt-3.5">
        {pool.map((n) => (
          <div
            key={n}
            draggable
            onDragStart={() => setDragging(n)}
            onClick={() => setSelected((s) => (s === n ? null : n))}
            className="inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-[10px] px-2 font-mono text-[0.8em] font-bold transition-transform"
            style={chipStyle(n, false)}
          >
            {n}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3.5 px-6 pb-[26px] pt-3.5">
        {zoneBox("a", `Only ${a}`)}
        {zoneBox("both", "Shared Factors")}
        {zoneBox("b", `Only ${b}`)}
      </div>

      <div className="flex flex-wrap justify-center gap-10 px-5 pb-7">
        <div className="text-center">
          <div className="text-[0.7em] uppercase tracking-wider text-[rgba(248,245,238,0.55)]">HCF</div>
          <div className="font-mono text-[1.7em] font-bold" style={{ color: NOTES_GOLD }}>
            {hcf(a, b)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[0.7em] uppercase tracking-wider text-[rgba(248,245,238,0.55)]">LCM</div>
          <div className="font-mono text-[1.7em] font-bold" style={{ color: NOTES_GOLD }}>
            {lcm(a, b)}
          </div>
        </div>
      </div>
    </div>
  );
}
