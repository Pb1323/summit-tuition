"use client";

import { motion, useReducedMotion } from "framer-motion";

const PALETTE = ["#0b2545", "#c9932c", "#b4530b", "#7c9a92", "#8a5a8f"];

function polarPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function pieSlicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarPoint(cx, cy, r, endAngle);
  const end = polarPoint(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export type ShowcaseVisualConfig =
  | { kind: "bar-chart"; bars: { label: string; value: number }[]; max: number; highlight?: number }
  | { kind: "pie-chart"; sectors: { label: string; pct: number }[] }
  | {
      kind: "line-graph";
      points: { x: number; y: number }[];
      xMax: number;
      yMax: number;
      yUnitLabel: string;
      xUnitLabel: string;
      segmentLabels?: string[];
    }
  | { kind: "ratio-table"; colA: string; colB: string; ratioLabel: string; rows: { name: string; a: string; b: string; missing?: "a" | "b" }[] }
  | { kind: "geometry-quadrilateral"; angles: (number | "?")[] }
  | { kind: "geometry-triangle"; angles: (number | "?")[] }
  | { kind: "venn"; setA: string; setB: string; onlyA: number; onlyB: number; both: number }
  | { kind: "stacked-bar"; title: string; segments: { label: string; pct: number }[] };

export function ShowcaseVisual({ config }: { config: ShowcaseVisualConfig }) {
  const reduceMotion = useReducedMotion();
  const draw = reduceMotion
    ? {}
    : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } };

  if (config.kind === "bar-chart") {
    const { bars, max, highlight } = config;
    const barWidth = Math.min(48, 220 / bars.length - 12);
    const gap = (240 - barWidth * bars.length) / (bars.length + 1);
    const chartHeight = 92;
    return (
      <svg viewBox="0 0 260 130" className="h-32 w-full">
        <line x1="8" y1={chartHeight + 10} x2="252" y2={chartHeight + 10} stroke="#0b2545" strokeWidth="2" />
        {bars.map((bar, i) => {
          const height = (bar.value / max) * chartHeight;
          const x = gap + i * (barWidth + gap);
          const y = chartHeight + 10 - height;
          return (
            <g key={bar.label}>
              <motion.rect
                x={x}
                width={barWidth}
                rx="4"
                fill={i === highlight ? "#c9932c" : "#0b2545"}
                initial={reduceMotion ? undefined : { height: 0, y: chartHeight + 10 }}
                animate={reduceMotion ? undefined : { height, y }}
                height={reduceMotion ? height : undefined}
                y={reduceMotion ? y : undefined}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0b2545">
                {bar.value}
              </text>
              <text x={x + barWidth / 2} y={chartHeight + 26} textAnchor="middle" fontSize="10" fontWeight="700" fill="#5c5c5c">
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (config.kind === "pie-chart") {
    const arcs = config.sectors.reduce<{ label: string; pct: number; startAngle: number; endAngle: number }[]>((acc, sector) => {
      const prevEnd = acc.length ? acc[acc.length - 1].endAngle : 0;
      acc.push({ ...sector, startAngle: prevEnd, endAngle: prevEnd + sector.pct * 3.6 });
      return acc;
    }, []);
    return (
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0">
          {arcs.map(({ label, startAngle, endAngle }, i) => {
            return (
              <motion.path
                key={label}
                d={pieSlicePath(50, 50, 46, startAngle, endAngle)}
                fill={PALETTE[i % PALETTE.length]}
                stroke="#fff"
                strokeWidth="1.5"
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "50px 50px" }}
              />
            );
          })}
        </svg>
        <ul className="space-y-1 text-[11px] font-semibold text-navy">
          {config.sectors.map((sector, i) => (
            <li key={sector.label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
              {sector.label} — {sector.pct}%
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (config.kind === "line-graph") {
    const { points, xMax, yMax, xUnitLabel, yUnitLabel, segmentLabels } = config;
    const plotW = 224;
    const plotH = 90;
    const scaled = points.map((p) => ({ x: 8 + (p.x / xMax) * plotW, y: 92 - (p.y / yMax) * plotH }));
    const path = `M ${scaled.map((p) => `${p.x} ${p.y}`).join(" L ")}`;
    return (
      <svg viewBox="0 0 240 105" className="h-28 w-full">
        <line x1="8" y1="2" x2="8" y2="92" stroke="#0b2545" strokeWidth="1.5" />
        <line x1="8" y1="92" x2="232" y2="92" stroke="#0b2545" strokeWidth="1.5" />
        <text x="4" y="8" fontSize="8" fill="#5c5c5c">
          {yMax}
          {yUnitLabel}
        </text>
        <text x="230" y="102" fontSize="8" fill="#5c5c5c" textAnchor="end">
          {xMax}
          {xUnitLabel}
        </text>
        <motion.path d={path} fill="none" stroke="#c9932c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...draw} />
        {scaled.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#0b2545" />
        ))}
        {segmentLabels?.map((label, i) => {
          const mid = scaled[i] && scaled[i + 1] ? { x: (scaled[i].x + scaled[i + 1].x) / 2, y: (scaled[i].y + scaled[i + 1].y) / 2 - 8 } : null;
          if (!mid) return null;
          return (
            <text key={i} x={mid.x} y={mid.y} fontSize="9" fontWeight="700" fill="#5c5c5c" textAnchor="middle">
              {label}
            </text>
          );
        })}
      </svg>
    );
  }

  if (config.kind === "ratio-table") {
    return (
      <div className="rounded-xl border border-navy/10 bg-cream/40 p-3">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-navy/60">
              <th className="pb-1.5 font-bold uppercase tracking-wide"> </th>
              <th className="pb-1.5 font-bold uppercase tracking-wide">{config.colA}</th>
              <th className="pb-1.5 font-bold uppercase tracking-wide">{config.colB}</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-navy">
            {config.rows.map((row) => (
              <tr key={row.name} className={row.missing ? "border-t border-navy/10 bg-gold/10" : "border-t border-navy/10"}>
                <td className="py-1.5">{row.name}</td>
                <td className="py-1.5">{row.missing === "a" ? <span className="text-gold-dark">?</span> : row.a}</td>
                <td className="py-1.5">{row.missing === "b" ? <span className="text-gold-dark">?</span> : row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-navy/50">
          <span className="rounded bg-navy px-1.5 py-0.5 text-white">{config.colA.toLowerCase()}</span>
          <span>:</span>
          <span className="rounded bg-gold px-1.5 py-0.5 text-navy">{config.colB.toLowerCase()}</span>
          <span>= {config.ratioLabel} in every row</span>
        </div>
      </div>
    );
  }

  if (config.kind === "geometry-quadrilateral") {
    const [a, b, c, d] = config.angles;
    return (
      <svg viewBox="0 0 200 130" className="mx-auto h-32 w-48">
        <motion.polygon points="30,95 65,20 165,32 130,105" fill="#f2c14e11" stroke="#0b2545" strokeWidth="3" {...draw} />
        <text x="42" y="82" fontSize="12" fontWeight="700" fill="#b4530b">
          {a === "?" ? "?" : `${a}°`}
        </text>
        <text x="68" y="36" fontSize="12" fontWeight="700" fill="#b4530b">
          {b === "?" ? "?" : `${b}°`}
        </text>
        <text x="140" y="45" fontSize="12" fontWeight="700" fill="#b4530b">
          {c === "?" ? "?" : `${c}°`}
        </text>
        <text x="112" y="95" fontSize="12" fontWeight="700" fill="#b4530b">
          {d === "?" ? "?" : `${d}°`}
        </text>
      </svg>
    );
  }

  if (config.kind === "geometry-triangle") {
    const [a, b, c] = config.angles;
    return (
      <svg viewBox="0 0 200 120" className="mx-auto h-28 w-44">
        <motion.polygon points="100,15 20,105 180,105" fill="#f2c14e11" stroke="#0b2545" strokeWidth="3" {...draw} />
        <text x="92" y="34" fontSize="13" fontWeight="700" fill="#b4530b">
          {a === "?" ? "?" : `${a}°`}
        </text>
        <text x="30" y="98" fontSize="13" fontWeight="700" fill="#b4530b">
          {b === "?" ? "?" : `${b}°`}
        </text>
        <text x="155" y="98" fontSize="13" fontWeight="700" fill="#b4530b">
          {c === "?" ? "?" : `${c}°`}
        </text>
      </svg>
    );
  }

  if (config.kind === "venn") {
    const { setA, setB, onlyA, onlyB, both } = config;
    return (
      <svg viewBox="0 0 240 120" className="h-28 w-full">
        <motion.circle cx="95" cy="60" r="48" fill="#0b254522" stroke="#0b2545" strokeWidth="2.5" {...draw} />
        <motion.circle cx="145" cy="60" r="48" fill="#c9932c22" stroke="#c9932c" strokeWidth="2.5" {...draw} />
        <text x="65" y="64" fontSize="16" fontWeight="800" fill="#0b2545" textAnchor="middle">
          {onlyA}
        </text>
        <text x="120" y="64" fontSize="16" fontWeight="800" fill="#5c3d0a" textAnchor="middle">
          {both}
        </text>
        <text x="175" y="64" fontSize="16" fontWeight="800" fill="#b4530b" textAnchor="middle">
          {onlyB}
        </text>
        <text x="65" y="20" fontSize="11" fontWeight="700" fill="#0b2545" textAnchor="middle">
          {setA}
        </text>
        <text x="175" y="20" fontSize="11" fontWeight="700" fill="#b4530b" textAnchor="middle">
          {setB}
        </text>
      </svg>
    );
  }

  if (config.kind === "stacked-bar") {
    const bars = config.segments.reduce<{ label: string; pct: number; x: number; width: number }[]>((acc, segment) => {
      const prevEnd = acc.length ? acc[acc.length - 1].x + acc[acc.length - 1].width : 0;
      acc.push({ ...segment, x: prevEnd, width: (segment.pct / 100) * 260 });
      return acc;
    }, []);
    return (
      <div>
        <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-wide text-navy/60">{config.title}</p>
        <svg viewBox="0 0 260 46" className="h-11 w-full">
          <rect x="0" y="8" width="260" height="30" rx="8" fill="#f2ede1" />
          {bars.map(({ label, x, width }, i) => {
            return (
              <motion.rect
                key={label}
                x={x}
                y="8"
                height="30"
                rx={i === 0 || i === config.segments.length - 1 ? 8 : 0}
                fill={PALETTE[i % PALETTE.length]}
                initial={reduceMotion ? undefined : { width: 0 }}
                animate={reduceMotion ? undefined : { width }}
                width={reduceMotion ? width : undefined}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </svg>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold text-navy/60">
          {config.segments.map((segment, i) => (
            <span key={segment.label} className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
              {segment.label} {segment.pct}%
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
