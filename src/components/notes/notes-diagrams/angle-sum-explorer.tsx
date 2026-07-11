"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

type Mode = "line" | "point" | "triangle" | "quadrilateral";

const MODES: { id: Mode; label: string; total: number }[] = [
  { id: "line", label: "On a line", total: 180 },
  { id: "point", label: "At a point", total: 360 },
  { id: "triangle", label: "In a triangle", total: 180 },
  { id: "quadrilateral", label: "In a quadrilateral", total: 360 },
];

const COLORS = ["#C9A24B", "#7fb7c9", "#c98a7f", "#8fbf7f"];

function Stepper({ value, min, max, onChange, color }: { value: number; min: number; max: number; onChange: (v: number) => void; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 5))}
        className="flex h-7 w-7 items-center justify-center rounded-full border text-[0.95em] font-bold text-[#F8F5EE]"
        style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
      >
        −
      </button>
      <div className="min-w-[38px] text-center font-mono font-bold" style={{ color }}>
        {value}°
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + 5))}
        className="flex h-7 w-7 items-center justify-center rounded-full border text-[0.95em] font-bold text-[#F8F5EE]"
        style={{ background: "rgba(201,162,75,0.15)", borderColor: "rgba(201,162,75,0.4)" }}
      >
        +
      </button>
    </div>
  );
}

// Draws a filled wedge of a circle from startDeg to endDeg (measured anticlockwise from positive x-axis, screen y-down).
function wedgePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toXY = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
  };
  const [sx, sy] = toXY(startDeg);
  const [ex, ey] = toXY(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${large} 0 ${ex} ${ey} Z`;
}

function PointView({ angles }: { angles: number[] }) {
  const cx = 150;
  const cy = 110;
  const r = 70;
  const starts: number[] = [];
  angles.reduce((cursor, a) => {
    starts.push(cursor);
    return cursor + a;
  }, 90);
  return (
    <svg viewBox="0 0 300 190" className="mx-auto block h-[190px] w-full max-w-[320px]">
      {angles.map((a, i) => {
        const start = starts[i];
        const end = start + a;
        const mid = (start + end) / 2;
        const rad = (mid * Math.PI) / 180;
        const lx = cx + (r + 20) * Math.cos(rad);
        const ly = cy - (r + 20) * Math.sin(rad);
        return (
          <g key={i}>
            <path d={wedgePath(cx, cy, r, start, end)} fill={COLORS[i % COLORS.length]} opacity={0.75} stroke="#0A1F44" strokeWidth={1.5} />
            <text x={lx} y={ly} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill="#F8F5EE">
              {a}°
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={3} fill="#F8F5EE" />
    </svg>
  );
}

function LineView({ a }: { a: number }) {
  const cx = 150;
  const cy = 130;
  const r = 90;
  return (
    <svg viewBox="0 0 300 160" className="mx-auto block h-[160px] w-full max-w-[320px]">
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="rgba(248,245,238,0.4)" strokeWidth={2} />
      <path d={wedgePath(cx, cy, 60, 0, a)} fill={COLORS[0]} opacity={0.75} stroke="#0A1F44" strokeWidth={1.5} />
      <path d={wedgePath(cx, cy, 60, a, 180)} fill={COLORS[1]} opacity={0.75} stroke="#0A1F44" strokeWidth={1.5} />
      {(() => {
        const rad1 = (a / 2) * (Math.PI / 180);
        const rad2 = ((a + 180) / 2) * (Math.PI / 180);
        return (
          <>
            <text x={cx + 78 * Math.cos(rad1)} y={cy - 78 * Math.sin(rad1)} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill="#F8F5EE">
              {a}°
            </text>
            <text x={cx + 78 * Math.cos(rad2)} y={cy - 78 * Math.sin(rad2)} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill="#F8F5EE">
              {180 - a}°
            </text>
          </>
        );
      })()}
      <circle cx={cx} cy={cy} r={3} fill="#F8F5EE" />
    </svg>
  );
}

function TriangleView({ b, c }: { b: number; c: number }) {
  const a = 180 - b - c;
  const base = 220;
  const x0 = 40;
  const x1 = x0 + base;
  const y0 = 150;
  const tb = (b * Math.PI) / 180;
  const tc = (c * Math.PI) / 180;
  const denom = Math.tan(tb) + Math.tan(tc);
  const apexX = denom > 0 ? x0 + (base * Math.tan(tc)) / denom : (x0 + x1) / 2;
  const apexY = denom > 0 ? y0 - (apexX - x0) * Math.tan(tb) : y0 - 100;

  return (
    <svg viewBox="0 0 300 190" className="mx-auto block h-[190px] w-full max-w-[320px]">
      <polygon
        points={`${x0},${y0} ${x1},${y0} ${apexX},${apexY}`}
        fill="rgba(201,162,75,0.18)"
        stroke={NOTES_GOLD}
        strokeWidth={2}
      />
      <text x={apexX} y={Math.max(18, apexY - 10)} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill={COLORS[2]}>
        {Math.max(a, 1)}°
      </text>
      <text x={x0 + 22} y={y0 - 10} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill={COLORS[0]}>
        {b}°
      </text>
      <text x={x1 - 22} y={y0 - 10} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill={COLORS[1]}>
        {c}°
      </text>
    </svg>
  );
}

function QuadView({ angles }: { angles: number[] }) {
  const cx = 150;
  const cy = 105;
  const rx = 100;
  const ry = 75;
  // Place 4 vertices roughly at corners, then draw arcs at each showing the interior angle value as a label only
  const pts = [
    [cx - rx, cy - ry],
    [cx + rx, cy - ry],
    [cx + rx, cy + ry],
    [cx - rx, cy + ry],
  ];
  return (
    <svg viewBox="0 0 300 200" className="mx-auto block h-[200px] w-full max-w-[320px]">
      <polygon
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="rgba(201,162,75,0.18)"
        stroke={NOTES_GOLD}
        strokeWidth={2}
      />
      {pts.map((p, i) => {
        const lx = p[0] + (p[0] < cx ? 22 : -22);
        const ly = p[1] + (p[1] < cy ? 20 : -12);
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fontWeight={700} fill={COLORS[i % COLORS.length]}>
            {angles[i]}°
          </text>
        );
      })}
    </svg>
  );
}

export function AngleSumExplorer() {
  const [mode, setMode] = useState<Mode>("line");
  const [lineA, setLineA] = useState(70);
  const [pointA, setPointA] = useState(120);
  const [pointB, setPointB] = useState(130);
  const [triB, setTriB] = useState(60);
  const [triC, setTriC] = useState(70);
  const [quadA, setQuadA] = useState(80);
  const [quadB, setQuadB] = useState(100);
  const [quadC, setQuadC] = useState(90);

  const pointC = Math.max(5, 360 - pointA - pointB);
  const quadD = Math.max(5, 360 - quadA - quadB - quadC);

  const activeMode = MODES.find((m) => m.id === mode)!;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2 px-5 pt-[26px] pb-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className="rounded-full border px-3.5 py-2 text-[0.76em] font-bold transition-all"
            style={{
              background: mode === m.id ? NOTES_GOLD : "rgba(255,255,255,0.06)",
              color: mode === m.id ? "#0A1F44" : "rgba(248,245,238,0.6)",
              borderColor: mode === m.id ? NOTES_GOLD : "rgba(201,162,75,0.25)",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="px-6 pb-1 pt-3 text-center font-mono text-[1.15em] font-bold" style={{ color: NOTES_GOLD }}>
        Sum = {activeMode.total}°
      </div>

      <div className="px-4 pb-2">
        {mode === "line" && <LineView a={lineA} />}
        {mode === "point" && <PointView angles={[pointA, pointB, pointC]} />}
        {mode === "triangle" && <TriangleView b={triB} c={triC} />}
        {mode === "quadrilateral" && <QuadView angles={[quadA, quadB, quadC, quadD]} />}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 px-5 pb-7 pt-3">
        {mode === "line" && <Stepper value={lineA} min={5} max={175} onChange={setLineA} color={COLORS[0]} />}
        {mode === "point" && (
          <>
            <Stepper value={pointA} min={5} max={350} onChange={setPointA} color={COLORS[0]} />
            <Stepper value={pointB} min={5} max={350} onChange={setPointB} color={COLORS[1]} />
          </>
        )}
        {mode === "triangle" && (
          <>
            <Stepper value={triB} min={5} max={170} onChange={setTriB} color={COLORS[0]} />
            <Stepper value={triC} min={5} max={170} onChange={setTriC} color={COLORS[1]} />
          </>
        )}
        {mode === "quadrilateral" && (
          <>
            <Stepper value={quadA} min={5} max={350} onChange={setQuadA} color={COLORS[0]} />
            <Stepper value={quadB} min={5} max={350} onChange={setQuadB} color={COLORS[1]} />
            <Stepper value={quadC} min={5} max={350} onChange={setQuadC} color={COLORS[2]} />
          </>
        )}
      </div>
    </div>
  );
}
