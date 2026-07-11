"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { QuestionVisual } from "@/types/platform";

const INK = "#172033";
const INK_SOFT = "#111827";
const GOLD = "#f59e0b";
const GOLD_DARK = "#b45309";
const GRID = "#f7e8bd";
/** Secondary interactive accent (selection/hover/structural cues), kept distinct from GOLD's "content" emphasis. */
const BLUE = "#3b82f6";
const BLUE_DARK = "#1d4ed8";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isFinite(item));
}

/** A single NVR figure: a regular polygon (or circle when sides is 0), optionally rotated, mirrored, filled and decorated. */
export interface NvrFigure {
  sides: number;
  rotation?: number;
  reflect?: boolean;
  fill?: "solid" | "outline" | "hatch" | "crosshatch" | "dots" | "stripes" | "halfSplit";
  size?: number;
  borderStyle?: "solid" | "dashed" | "dotted";
  internalElements?: { shape: "dot" | "square" | "triangle"; position: "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"; size?: number }[];
  arrows?: { angle: number; count?: number }[];
}

/** A matrix/sequence cell: one figure, several overlapping figures (compound), or empty (the unknown slot). */
export type NvrCell = NvrFigure | NvrFigure[] | null;

function isNvrFigure(value: unknown): value is NvrFigure {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.sides === "number";
}

function isNvrCell(value: unknown): value is NvrCell {
  if (value === null) return true;
  if (Array.isArray(value)) return value.every((item) => isNvrFigure(item));
  return isNvrFigure(value);
}

function isNvrCellArray(value: unknown): value is NvrCell[] {
  return Array.isArray(value) && value.every((item) => isNvrCell(item));
}

function isNvrFigureArray(value: unknown): value is NvrFigure[] {
  return Array.isArray(value) && value.every((item) => isNvrFigure(item));
}

function isCodePairArray(value: unknown): value is { word: string; code: string }[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "object" && item !== null && typeof (item as Record<string, unknown>).word === "string" && typeof (item as Record<string, unknown>).code === "string")
  );
}

/** Rounds to 2dp so SSR and client trig results always serialize identically (avoids hydration mismatches). */
function r2(value: number) {
  return Math.round(value * 100) / 100;
}

function nvrPolygonPoints(sides: number, rotation: number, radius: number, reflect: boolean) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = ((360 / sides) * index + rotation - 90) * (Math.PI / 180);
    const x = Math.cos(angle) * radius * (reflect ? -1 : 1);
    return `${r2(x)},${r2(Math.sin(angle) * radius)}`;
  }).join(" ");
}

const INTERNAL_ELEMENT_OFFSET: Record<string, [number, number]> = {
  center: [0, 0],
  topLeft: [-0.42, -0.42],
  topRight: [0.42, -0.42],
  bottomLeft: [-0.42, 0.42],
  bottomRight: [0.42, 0.42],
};

function NvrInternalElement({ element, radius }: { element: NonNullable<NvrFigure["internalElements"]>[number]; radius: number }) {
  const [ox, oy] = INTERNAL_ELEMENT_OFFSET[element.position] ?? [0, 0];
  const cx = ox * radius;
  const cy = oy * radius;
  const size = (element.size ?? 0.22) * radius;
  if (element.shape === "dot") return <circle cx={cx} cy={cy} r={size / 2} fill={INK} />;
  if (element.shape === "square") return <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} fill={INK} />;
  return <polygon points={nvrPolygonPoints(3, 0, size / 1.6, false)} transform={`translate(${cx},${cy})`} fill={INK} />;
}

function NvrArrowMark({ arrow, radius }: { arrow: NonNullable<NvrFigure["arrows"]>[number]; radius: number }) {
  const rad = (arrow.angle - 90) * (Math.PI / 180);
  const length = radius * 1.15;
  const x2 = r2(Math.cos(rad) * length);
  const y2 = r2(Math.sin(rad) * length);
  const headSize = 5;
  const headAngle1 = rad + (150 * Math.PI) / 180;
  const headAngle2 = rad - (150 * Math.PI) / 180;
  return (
    <g stroke={GOLD_DARK} strokeWidth={2.5} fill="none">
      <line x1={0} y1={0} x2={x2} y2={y2} strokeLinecap="round" />
      <polyline
        points={`${r2(x2 + Math.cos(headAngle1) * headSize)},${r2(y2 + Math.sin(headAngle1) * headSize)} ${x2},${y2} ${r2(x2 + Math.cos(headAngle2) * headSize)},${r2(y2 + Math.sin(headAngle2) * headSize)}`}
        strokeLinejoin="round"
      />
    </g>
  );
}

/** A short straight arrow drawn between two diagram elements (not attached to a figure) — used for transform/analogy cues. */
function DiagramArrow({ x1, x2, y, color = GOLD_DARK }: { x1: number; x2: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={2.5} fill={color}>
      <line x1={x1} y1={y} x2={x2 - 9} y2={y} strokeLinecap="round" />
      <polygon points={`${x2},${y} ${x2 - 10},${r2(y - 5)} ${x2 - 10},${r2(y + 5)}`} />
    </g>
  );
}

/** A dashed vertical divider separating two visual groups within one diagram (e.g. the worked pair vs the test pair). */
function DiagramDivider({ x, yTop, yBottom, color = BLUE }: { x: number; yTop: number; yBottom: number; color?: string }) {
  return <line x1={x} y1={yTop} x2={x} y2={yBottom} stroke={color} strokeWidth={2} strokeDasharray="5 5" opacity={0.55} />;
}

/** Oblique ("cavalier") projection of a cuboid's three visible faces, anchored at the front face's top-left corner. */
export function cuboidFaces(x: number, y: number, w: number, h: number, d: number) {
  const dx = d * 0.6;
  const dy = -d * 0.38;
  const p = (px: number, py: number) => `${r2(px)},${r2(py)}`;
  const front = [p(x, y), p(x + w, y), p(x + w, y + h), p(x, y + h)].join(" ");
  const top = [p(x, y), p(x + dx, y + dy), p(x + w + dx, y + dy), p(x + w, y)].join(" ");
  const right = [p(x + w, y), p(x + w + dx, y + dy), p(x + w + dx, y + dy + h), p(x + w, y + h)].join(" ");
  const centroid = (pts: [number, number][]): [number, number] => [pts.reduce((s, v) => s + v[0], 0) / pts.length, pts.reduce((s, v) => s + v[1], 0) / pts.length];
  return {
    front,
    top,
    right,
    centroids: {
      front: centroid([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]),
      top: centroid([[x, y], [x + dx, y + dy], [x + w + dx, y + dy], [x + w, y]]),
      right: centroid([[x + w, y], [x + w + dx, y + dy], [x + w + dx, y + dy + h], [x + w, y + h]]),
    },
    dx,
    dy,
  };
}

/** A shaded cuboid (three-tone: light top, mid front, dark right) with optional small face symbols — used for nets/cubes and combined-solid questions. */
export type Block = { w: number; h: number; d: number };
export type AttachMode = "top" | "topgap" | "right" | "shifted";

/** Anchors block B against fixed block A for a given attach mode — shared by the combine3D prompt and its answer options so gap/overlap/shift decoys stay consistent. */
export function combine3dLayout(a: Block, b: Block, attach: AttachMode, xA = 40, yA = 150) {
  let xB = xA;
  let yB = yA;
  if (attach === "top") {
    xB = xA + (a.w - b.w) / 2;
    yB = yA - b.h;
  } else if (attach === "topgap") {
    xB = xA + (a.w - b.w) / 2;
    yB = yA - b.h - 18;
  } else if (attach === "right") {
    xB = xA + a.w + 4;
    yB = yA + (a.h - b.h);
  } else {
    xB = xA + a.w - b.w * 0.4;
    yB = yA - b.h;
  }
  return { xA, yA, xB, yB };
}

export function ObliqueCuboid({ x, y, w, h, d, symbols, patternId }: { x: number; y: number; w: number; h: number; d: number; symbols?: { top?: NvrFigure; front?: NvrFigure; right?: NvrFigure }; patternId: string }) {
  const faces = cuboidFaces(x, y, w, h, d);
  return (
    <g>
      <polygon points={faces.top} fill="#fde68a" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <polygon points={faces.front} fill={GOLD} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <polygon points={faces.right} fill={GOLD_DARK} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      {symbols?.top && <NvrFigureMark figure={symbols.top} x={faces.centroids.top[0]} y={faces.centroids.top[1]} size={Math.min(w, d) * 0.7} patternId={`${patternId}-top`} />}
      {symbols?.front && <NvrFigureMark figure={symbols.front} x={faces.centroids.front[0]} y={faces.centroids.front[1]} size={Math.min(w, h) * 0.7} patternId={`${patternId}-front`} />}
      {symbols?.right && <NvrFigureMark figure={symbols.right} x={faces.centroids.right[0]} y={faces.centroids.right[1]} size={Math.min(d, h) * 0.7} patternId={`${patternId}-right`} />}
    </g>
  );
}

const BORDER_DASH: Record<string, string | undefined> = { dashed: "6 4", dotted: "2 4", solid: undefined };

/** Renders one NVR figure, a compound stack of figures, or a "?" placeholder, centred at (x, y). */
export function NvrFigureMark({ figure, x, y, size, patternId }: { figure: NvrCell; x: number; y: number; size: number; patternId: string }) {
  if (figure === null) {
    return (
      <text x={x} y={y + 9} textAnchor="middle" fill={GOLD_DARK} fontSize={28} fontWeight={900}>
        ?
      </text>
    );
  }
  const figures = Array.isArray(figure) ? figure : [figure];
  return (
    <>
      {figures.map((part, index) => (
        <NvrSingleFigure key={index} figure={part} x={x} y={y} size={size * (1 - index * 0.32)} patternId={`${patternId}-${index}`} />
      ))}
    </>
  );
}

function NvrSingleFigure({ figure, x, y, size, patternId }: { figure: NvrFigure; x: number; y: number; size: number; patternId: string }) {
  const radius = (size / 2) * (figure.size ?? 0.82);
  const fillColor = figure.fill && figure.fill !== "solid" && figure.fill !== "outline" ? `url(#${patternId})` : figure.fill === "outline" ? "#fff8e7" : GOLD;
  const dash = BORDER_DASH[figure.borderStyle ?? "solid"];
  const body =
    figure.sides <= 0 ? (
      <circle cx={0} cy={0} r={radius} fill={fillColor} stroke={INK} strokeWidth={3} strokeDasharray={dash} />
    ) : (
      <polygon points={nvrPolygonPoints(figure.sides, figure.rotation ?? 0, radius, figure.reflect ?? false)} fill={fillColor} stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeDasharray={dash} />
    );
  return (
    <g transform={`translate(${x},${y})`}>
      <NvrFillPattern id={patternId} fill={figure.fill} />
      {body}
      {figure.internalElements?.map((element, index) => <NvrInternalElement key={index} element={element} radius={radius} />)}
      {figure.arrows?.map((arrow, index) => <NvrArrowMark key={index} arrow={arrow} radius={radius} />)}
    </g>
  );
}

function NvrFillPattern({ id, fill }: { id: string; fill?: NvrFigure["fill"] }) {
  if (fill === "hatch" || fill === "stripes") {
    return (
      <defs>
        <pattern id={id} width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="#fff8e7" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={GOLD_DARK} strokeWidth="3" />
        </pattern>
      </defs>
    );
  }
  if (fill === "crosshatch") {
    return (
      <defs>
        <pattern id={id} width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="#fff8e7" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={GOLD_DARK} strokeWidth="2" />
          <line x1="0" y1="0" x2="7" y2="0" stroke={GOLD_DARK} strokeWidth="2" />
        </pattern>
      </defs>
    );
  }
  if (fill === "dots") {
    return (
      <defs>
        <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#fff8e7" />
          <circle cx="4" cy="4" r="1.6" fill={GOLD_DARK} />
        </pattern>
      </defs>
    );
  }
  if (fill === "halfSplit") {
    return (
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="50%" stopColor="#fff8e7" />
          <stop offset="100%" stopColor="#fff8e7" />
        </linearGradient>
      </defs>
    );
  }
  return null;
}

/** Smallest "nice" axis maximum and tick step so chart values can be read off the scale. */
function niceScale(maxValue: number) {
  const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500];
  const step = steps.find((candidate) => maxValue / candidate <= 8) ?? 1000;
  return { max: Math.max(step, Math.ceil(maxValue / step) * step), step };
}

export function VisualRenderer({ visual, adminPreview }: { visual: QuestionVisual; adminPreview?: boolean }) {
  const type = visual.type.replace(/_/g, "").toLowerCase();
  const title = visual.title || "Question visual";
  const patternId = React.useId();
  const frame = (children: React.ReactNode, summary: string) => (
    <div className="overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-[0_16px_44px_-36px_rgba(17,24,39,0.45)]" role="img" aria-label={summary}>
      <div className="border-b border-gold/15 bg-cream px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-gold-dark">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  );

  if (type === "table") {
    const headers = visual.data.headers;
    const rows = visual.data.rows;
    if (!isStringArray(headers) || !Array.isArray(rows)) return <VisualFallback adminPreview={adminPreview} />;
    return frame(
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-center text-sm">
          <thead><tr>{headers.map((header) => <th key={header} scope="col" className="border-b border-gold/20 bg-cream px-4 py-3 font-black text-navy first:rounded-tl-xl last:rounded-tr-xl">{header}</th>)}</tr></thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{isStringArray(row) ? row.map((cell, index) => <td key={`${rowIndex}-${index}`} className="border-b border-line bg-white px-4 py-3 font-semibold text-ink">{cell}</td>) : <td className="border-b border-line px-4 py-3 text-muted" colSpan={headers.length}>Missing row data</td>}</tr>)}</tbody>
        </table>
      </div>,
      `${title}: ${headers.join(", ")}`
    );
  }

  if (type === "barchart") {
    const labels = visual.data.labels;
    const values = visual.data.values;
    if (!isStringArray(labels) || !isNumberArray(values) || labels.length === 0 || values.length === 0) return <VisualFallback adminPreview={adminPreview} />;
    const scale = niceScale(Math.max(...values, 1));
    const plotLeft = 56;
    const plotRight = 336;
    const plotTop = 22;
    const plotBottom = 182;
    const plotHeight = plotBottom - plotTop;
    const ticks = Array.from({ length: scale.max / scale.step + 1 }, (_, index) => index * scale.step);
    const slot = (plotRight - plotLeft) / labels.length;
    return frame(
      <svg viewBox="0 0 360 226" className="h-64 w-full max-w-full">
        {ticks.map((tick) => {
          const y = plotBottom - (tick / scale.max) * plotHeight;
          return (
            <g key={tick}>
              <line x1={plotLeft} y1={y} x2={plotRight} y2={y} stroke={tick === 0 ? INK : GRID} strokeWidth={tick === 0 ? 2 : 1} />
              <text x={plotLeft - 8} y={y + 4} textAnchor="end" fill={INK} fontSize={12} fontWeight={700}>{tick}</text>
            </g>
          );
        })}
        <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotBottom} stroke={INK} strokeWidth={2} />
        {labels.map((label, index) => {
          const barHeight = Math.max(2, (values[index] / scale.max) * plotHeight);
          const barWidth = Math.min(38, slot * 0.55);
          const x = plotLeft + slot * index + (slot - barWidth) / 2;
          return (
            <g key={label}>
              <rect x={x} y={plotBottom - barHeight} width={barWidth} height={barHeight} rx={5} fill={GOLD} stroke={GOLD_DARK} strokeWidth={1} />
              <text x={x + barWidth / 2} y={plotBottom + 20} textAnchor="middle" fill={INK} fontSize={12} fontWeight={700}>{label}</text>
            </g>
          );
        })}
      </svg>,
      `${title}: bar chart with vertical scale from 0 to ${scale.max}, bars for ${labels.join(", ")}`
    );
  }

  if (type === "linegraph") {
    const labels = visual.data.labels;
    const values = visual.data.values;
    if (!isStringArray(labels) || !isNumberArray(values) || labels.length === 0 || values.length === 0) return <VisualFallback adminPreview={adminPreview} />;
    const scale = niceScale(Math.max(...values, 1));
    const plotLeft = 56;
    const plotRight = 330;
    const plotTop = 24;
    const plotBottom = 178;
    const plotHeight = plotBottom - plotTop;
    const ticks = Array.from({ length: scale.max / scale.step + 1 }, (_, index) => index * scale.step);
    const step = (plotRight - plotLeft - 16) / Math.max(values.length - 1, 1);
    const pointX = (index: number) => plotLeft + 8 + index * step;
    const pointY = (value: number) => plotBottom - (value / scale.max) * plotHeight;
    const points = values.map((value, index) => `${pointX(index)},${pointY(value)}`).join(" ");
    return frame(
      <svg viewBox="0 0 360 226" className="h-64 w-full max-w-full">
        {ticks.map((tick) => {
          const y = plotBottom - (tick / scale.max) * plotHeight;
          return (
            <g key={tick}>
              <line x1={plotLeft} y1={y} x2={plotRight} y2={y} stroke={tick === 0 ? INK : GRID} strokeWidth={tick === 0 ? 2 : 1} />
              <text x={plotLeft - 8} y={y + 4} textAnchor="end" fill={INK} fontSize={12} fontWeight={700}>{tick}</text>
            </g>
          );
        })}
        <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotBottom} stroke={INK} strokeWidth={2} />
        <polyline points={points} pathLength={1} className="qv-draw" fill="none" stroke={GOLD_DARK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        {values.map((value, index) => (
          <g key={`${index}-${value}`}>
            <circle cx={pointX(index)} cy={pointY(value)} r={5} fill={GOLD} stroke={INK} strokeWidth={2} />
            <text x={pointX(index)} y={plotBottom + 20} textAnchor="middle" fill={INK} fontSize={11} fontWeight={700}>{labels[index]}</text>
          </g>
        ))}
      </svg>,
      `${title}: line graph with vertical scale from 0 to ${scale.max}, readings for ${labels.join(", ")}`
    );
  }

  if (type === "coordinategrid") {
    const plotted = Array.isArray(visual.data.points) && visual.data.points.every((point) => Array.isArray(point) && point.length >= 2 && point.every((value) => typeof value === "number"))
      ? visual.data.points as number[][]
      : [[1, 1], [4, 3]];
    const gridMax = 6;
    const cell = 28;
    const originX = 40;
    const originY = 208;
    const gx = (x: number) => originX + x * cell;
    const gy = (y: number) => originY - y * cell;
    return frame(
      <svg viewBox="0 0 248 244" className="mx-auto h-72 w-full max-w-sm">
        {Array.from({ length: gridMax + 1 }).map((_, index) => (
          <g key={index}>
            <line x1={gx(index)} y1={gy(0)} x2={gx(index)} y2={gy(gridMax)} stroke={GRID} />
            <line x1={gx(0)} y1={gy(index)} x2={gx(gridMax)} y2={gy(index)} stroke={GRID} />
            <text x={gx(index)} y={originY + 18} textAnchor="middle" fill={INK} fontSize={11} fontWeight={700}>{index}</text>
            {index > 0 && <text x={originX - 10} y={gy(index) + 4} textAnchor="end" fill={INK} fontSize={11} fontWeight={700}>{index}</text>}
          </g>
        ))}
        <line x1={gx(0)} y1={originY} x2={gx(gridMax) + 8} y2={originY} stroke={INK} strokeWidth={2} />
        <line x1={originX} y1={gy(0)} x2={originX} y2={gy(gridMax) - 8} stroke={INK} strokeWidth={2} />
        <text x={gx(gridMax) + 14} y={originY + 4} fill={INK} fontSize={12} fontWeight={700}>x</text>
        <text x={originX - 4} y={gy(gridMax) - 14} fill={INK} fontSize={12} fontWeight={700}>y</text>
        {plotted.map((point, index) => (
          <g key={point.join("-")}>
            <circle cx={gx(point[0])} cy={gy(point[1])} r={6} fill={GOLD} stroke={INK} strokeWidth={2} />
            <text x={gx(point[0]) + 9} y={gy(point[1]) - 7} fill={INK_SOFT} fontSize={13} fontWeight={800}>{String.fromCharCode(65 + index)}</text>
          </g>
        ))}
      </svg>,
      `${title}: coordinate grid numbered 0 to ${gridMax} on both axes with points ${plotted.map((point, index) => `${String.fromCharCode(65 + index)} at (${point[0]}, ${point[1]})`).join(", ")}`
    );
  }

  if (type === "numberline") {
    const ticks = isNumberArray(visual.data.ticks) ? visual.data.ticks : isNumberArray(visual.data.points) ? visual.data.points : [0, 1, 2, 3, 4, 5];
    const highlight = typeof visual.data.highlight === "number" ? visual.data.highlight : ticks[Math.floor(ticks.length / 2)];
    const min = Math.min(...ticks);
    const max = Math.max(...ticks);
    const span = Math.max(max - min, 1);
    // Ticks sit at their true value so intervals read proportionally (2.5 lands halfway between 2 and 3).
    const tickX = (value: number) => 42 + ((value - min) / span) * 276;
    const majorTicks = ticks.filter((tick) => Number.isInteger(tick));
    const minorTicks = ticks.filter((tick) => !Number.isInteger(tick));
    return frame(
      <svg viewBox="0 0 360 110" className="h-32 w-full">
        <line x1={34} y1={52} x2={326} y2={52} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        {majorTicks.map((tick) => (
          <g key={tick}>
            <line x1={tickX(tick)} y1={38} x2={tickX(tick)} y2={66} stroke={INK} strokeWidth={2} />
            <text x={tickX(tick)} y={88} textAnchor="middle" fill={INK} fontSize={12} fontWeight={700}>{tick}</text>
          </g>
        ))}
        {minorTicks.map((tick) => (
          <line key={tick} x1={tickX(tick)} y1={44} x2={tickX(tick)} y2={60} stroke={INK} strokeWidth={1.5} />
        ))}
        <circle className="qv-pulse" cx={tickX(highlight)} cy={52} r={8} fill={GOLD} stroke={GOLD_DARK} strokeWidth={2} />
      </svg>,
      `${title}: number line from ${min} to ${max} with a highlighted point at ${highlight}`
    );
  }

  if (type === "shape" || type === "geometry") {
    const width = typeof visual.data.width === "number" ? visual.data.width : 9;
    const height = typeof visual.data.height === "number" ? visual.data.height : 4;
    const cutWidth = typeof visual.data.cutWidth === "number" ? visual.data.cutWidth : null;
    const cutHeight = typeof visual.data.cutHeight === "number" ? visual.data.cutHeight : null;
    const isCompound = cutWidth !== null && cutHeight !== null && cutWidth < width && cutHeight < height;
    if (isCompound) {
      // L-shape: outer width x height rectangle with a cutWidth x cutHeight notch removed from the bottom-right.
      // Labelled sides match the data; the bottom and inner-step edges stay unlabelled for the pupil to deduce.
      const unit = Math.min(200 / width, 116 / height);
      const x0 = 70;
      const y0 = 38;
      const w = width * unit;
      const h = height * unit;
      const cw = cutWidth * unit;
      const ch = cutHeight * unit;
      const path = `M ${x0} ${y0} h ${w} v ${h - ch} h ${-cw} v ${ch} h ${-(w - cw)} Z`;
      return frame(
        <svg viewBox="0 0 320 190" className="h-56 w-full">
          <path d={path} fill="#fff8e7" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <text x={x0 + w / 2} y={y0 - 10} textAnchor="middle" fill={INK_SOFT} fontSize={13} fontWeight={800}>{width} cm</text>
          <text x={x0 + w + 8} y={y0 + (h - ch) / 2 + 4} fill={INK_SOFT} fontSize={13} fontWeight={800}>{height - cutHeight} cm</text>
          <text x={x0 + w - cw + 8} y={y0 + h - ch / 2 + 4} fill={INK_SOFT} fontSize={13} fontWeight={800}>{cutHeight} cm</text>
          <text x={x0 - 8} y={y0 + h / 2 + 4} textAnchor="end" fill={INK_SOFT} fontSize={13} fontWeight={800}>{height} cm</text>
        </svg>,
        `${title}: L-shaped compound rectilinear shape, labelled sides ${width} cm across the top, ${height - cutHeight} cm on the right, ${cutHeight} cm at the inner step and ${height} cm on the left`
      );
    }
    // Plain rectangle drawn in proportion to its stated dimensions.
    const drawWidth = 204;
    const drawHeight = Math.max(48, Math.min(120, (height / width) * drawWidth));
    const x0 = (320 - drawWidth) / 2;
    const y0 = (190 - drawHeight) / 2 + 6;
    return frame(
      <svg viewBox="0 0 320 190" className="h-56 w-full">
        <rect x={x0} y={y0} width={drawWidth} height={drawHeight} fill="#fff8e7" stroke={INK} strokeWidth={4} rx={3} />
        <text x={x0 + drawWidth / 2} y={y0 - 12} textAnchor="middle" fill={INK_SOFT} fontSize={13} fontWeight={800}>{width} cm</text>
        <text x={x0 + drawWidth + 10} y={y0 + drawHeight / 2 + 4} fill={INK_SOFT} fontSize={13} fontWeight={800}>{height} cm</text>
      </svg>,
      `${title}: rectangle ${width} cm by ${height} cm`
    );
  }

  if (type === "sequence") {
    const totalTerms = typeof visual.data.totalTerms === "number" ? Math.min(Math.max(Math.round(visual.data.totalTerms), 2), 10) : 8;
    const knownPositions = isNumberArray(visual.data.knownPositions) ? visual.data.knownPositions : [];
    const knownValues = isNumberArray(visual.data.knownValues) ? visual.data.knownValues : [];
    const targetPosition = typeof visual.data.targetPosition === "number" ? visual.data.targetPosition : totalTerms;
    const known = new Map(knownPositions.map((position, index) => [position, knownValues[index]]));
    const slot = 336 / totalTerms;
    const boxWidth = Math.min(40, slot - 8);
    const boxX = (term: number) => 12 + (term - 1) * slot + (slot - boxWidth) / 2;
    return frame(
      <svg viewBox="0 0 360 130" className="h-40 w-full">
        {Array.from({ length: totalTerms - 1 }).map((_, index) => {
          const from = boxX(index + 1) + boxWidth;
          const to = boxX(index + 2);
          const mid = (from + to) / 2;
          return (
            <g key={index} className="qv-step" style={{ animationDelay: `${0.25 + index * 0.18}s` }}>
              <path d={`M ${from - 4} 48 Q ${mid} 26 ${to + 4} 48`} fill="none" stroke={GOLD_DARK} strokeWidth={2} />
              <text x={mid} y={24} textAnchor="middle" fill={GOLD_DARK} fontSize={11} fontWeight={800}>+?</text>
            </g>
          );
        })}
        {Array.from({ length: totalTerms }).map((_, index) => {
          const term = index + 1;
          const value = known.get(term);
          const isTarget = term === targetPosition;
          return (
            <g key={term}>
              <rect x={boxX(term)} y={52} width={boxWidth} height={34} rx={7} fill={value !== undefined ? "#fff8e7" : isTarget ? "#fde68a" : "#ffffff"} stroke={isTarget ? GOLD_DARK : INK} strokeWidth={isTarget ? 3 : 2} />
              <text x={boxX(term) + boxWidth / 2} y={74} textAnchor="middle" fill={INK_SOFT} fontSize={13} fontWeight={800}>{value !== undefined ? value : isTarget ? "?" : ""}</text>
              <text x={boxX(term) + boxWidth / 2} y={106} textAnchor="middle" fill={INK} fontSize={10} fontWeight={700}>{ordinal(term)}</text>
            </g>
          );
        })}
      </svg>,
      `${title}: sequence of ${totalTerms} terms with equal steps, ${knownPositions.map((position, index) => `${ordinal(position)} term ${knownValues[index]}`).join(" and ")}, find the ${ordinal(targetPosition)} term`
    );
  }

  if (type === "fraction") {
    const numerator = typeof visual.data.numerator === "number" ? visual.data.numerator : 3;
    const denominator = typeof visual.data.denominator === "number" ? visual.data.denominator : 5;
    return frame(
      <div className="space-y-3">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${denominator}, minmax(0, 1fr))` }}>
          {Array.from({ length: denominator }).map((_, index) => <div key={index} className={cn("h-14 border border-gold/30", index < numerator ? "bg-gold/35" : "bg-white")} />)}
        </div>
        <p className="text-center text-sm font-bold text-navy">{denominator} equal parts</p>
      </div>,
      `${title}: bar split into ${denominator} equal parts with ${numerator} shaded`
    );
  }

  if (type === "ratioblocks") {
    const labels = isStringArray(visual.data.labels) ? visual.data.labels : ["Ben", "Isla"];
    const values = isNumberArray(visual.data.values) ? visual.data.values : [2, 5];
    return frame(
      <div className="space-y-4">
        {labels.map((label, rowIndex) => <div key={label} className="grid grid-cols-[72px_1fr] items-center gap-3"><span className="text-sm font-black text-navy">{label}</span><div className="flex gap-1">{Array.from({ length: values[rowIndex] ?? 1 }).map((_, index) => <span key={index} className="h-9 flex-1 rounded-md border border-gold/35 bg-gold/20" />)}</div></div>)}
      </div>,
      `${title}: ratio ${labels.map((label, index) => `${label} ${values[index]}`).join(", ")}`
    );
  }

  if (type === "venn") {
    return frame(
      <svg viewBox="0 0 320 190" className="h-56 w-full">
        <circle cx={132} cy={96} r={62} fill="#fde68a55" stroke={INK} strokeWidth={3} />
        <circle cx={188} cy={96} r={62} fill="#f59e0b33" stroke={INK} strokeWidth={3} />
        <text x={108} y={36} textAnchor="middle" fill={INK} fontSize={13} fontWeight={800}>{String(visual.data.leftLabel ?? "A")}</text>
        <text x={212} y={36} textAnchor="middle" fill={INK} fontSize={13} fontWeight={800}>{String(visual.data.rightLabel ?? "B")}</text>
        <text x={104} y={100} textAnchor="middle" fill={INK_SOFT} fontSize={16} fontWeight={800}>{String(visual.data.left ?? "")}</text>
        <text x={160} y={100} textAnchor="middle" fill={INK_SOFT} fontSize={16} fontWeight={800}>{String(visual.data.overlap ?? "")}</text>
        <text x={216} y={100} textAnchor="middle" fill={INK_SOFT} fontSize={16} fontWeight={800}>{String(visual.data.right ?? "")}</text>
      </svg>,
      `${title}: Venn diagram, ${String(visual.data.leftLabel ?? "A")} only ${String(visual.data.left ?? "")}, both ${String(visual.data.overlap ?? "")}, ${String(visual.data.rightLabel ?? "B")} only ${String(visual.data.right ?? "")}`
    );
  }

  if (type === "clock") {
    const hour = typeof visual.data.hour === "number" ? visual.data.hour : 8;
    const minute = typeof visual.data.minute === "number" ? visual.data.minute : 0;
    const minuteAngle = minute * 6;
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    return frame(
      <svg viewBox="0 0 220 220" className="mx-auto h-64 w-full max-w-xs">
        <circle cx={110} cy={110} r={82} fill="#fffdf7" stroke={INK} strokeWidth={4} />
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index + 1) * 30 - 90;
          const x = 110 + Math.cos((angle * Math.PI) / 180) * 64;
          const y = 110 + Math.sin((angle * Math.PI) / 180) * 64;
          return <text key={index} x={x} y={y + 4} textAnchor="middle" fill={INK} fontSize={12} fontWeight={800}>{index + 1}</text>;
        })}
        <line x1={110} y1={110} x2={110 + Math.cos(((hourAngle - 90) * Math.PI) / 180) * 42} y2={110 + Math.sin(((hourAngle - 90) * Math.PI) / 180) * 42} stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <line x1={110} y1={110} x2={110 + Math.cos(((minuteAngle - 90) * Math.PI) / 180) * 62} y2={110 + Math.sin(((minuteAngle - 90) * Math.PI) / 180) * 62} stroke={GOLD_DARK} strokeWidth={4} strokeLinecap="round" />
        <circle cx={110} cy={110} r={5} fill={GOLD} />
      </svg>,
      `${title}: clock showing ${hour}:${String(minute).padStart(2, "0")}`
    );
  }

  if (type === "nvrmatrix") {
    const cells = visual.data.cells;
    if (!isNvrCellArray(cells) || cells.length !== 9) return <VisualFallback adminPreview={adminPreview} />;
    const cellSize = 88;
    const gap = 12;
    const originX = 20;
    const originY = 20;
    return frame(
      <svg viewBox="0 0 320 320" className="mx-auto h-96 w-full max-w-sm">
        {cells.map((figure, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const cx = originX + col * (cellSize + gap) + cellSize / 2;
          const cy = originY + row * (cellSize + gap) + cellSize / 2;
          const isMissing = figure === null;
          return (
            <g key={index}>
              <rect x={cx - cellSize / 2} y={cy - cellSize / 2} width={cellSize} height={cellSize} rx={10} fill={isMissing ? "#fde68a" : "#ffffff"} stroke={isMissing ? GOLD_DARK : GRID} strokeWidth={isMissing ? 3 : 2} />
              <NvrFigureMark figure={figure} x={cx} y={cy} size={cellSize} patternId={patternId} />
            </g>
          );
        })}
      </svg>,
      `${title}: 3 by 3 pattern grid, work out the rule and find the missing figure`
    );
  }

  if (type === "nvrsequence") {
    const figures = visual.data.figures;
    if (!isNvrCellArray(figures) || figures.length < 3) return <VisualFallback adminPreview={adminPreview} />;
    const cellSize = 72;
    const gap = 16;
    const totalWidth = figures.length * cellSize + (figures.length - 1) * gap;
    const startX = (360 - totalWidth) / 2 + cellSize / 2;
    const cy = 68;
    return frame(
      <svg viewBox="0 0 360 140" className="h-48 w-full">
        {figures.map((figure, index) => {
          const cx = startX + index * (cellSize + gap);
          const isMissing = figure === null;
          return (
            <g key={index}>
              <rect x={cx - cellSize / 2} y={cy - cellSize / 2} width={cellSize} height={cellSize} rx={10} fill={isMissing ? "#fde68a" : "#ffffff"} stroke={isMissing ? GOLD_DARK : GRID} strokeWidth={isMissing ? 3 : 2} />
              <NvrFigureMark figure={figure} x={cx} y={cy} size={cellSize} patternId={patternId} />
            </g>
          );
        })}
      </svg>,
      `${title}: sequence of ${figures.length} figures following one rule, find the missing figure`
    );
  }

  if (type === "nvroddoneout") {
    const figures = visual.data.figures;
    if (!isNvrFigureArray(figures) || figures.length < 4) return <VisualFallback adminPreview={adminPreview} />;
    const cellSize = 68;
    const gap = 14;
    const totalWidth = figures.length * cellSize + (figures.length - 1) * gap;
    const startX = (360 - totalWidth) / 2 + cellSize / 2;
    const cy = 60;
    return frame(
      <svg viewBox="0 0 360 128" className="h-44 w-full">
        {figures.map((figure, index) => {
          const cx = startX + index * (cellSize + gap);
          return (
            <g key={index}>
              <rect x={cx - cellSize / 2} y={cy - cellSize / 2} width={cellSize} height={cellSize} rx={10} fill="#ffffff" stroke={GRID} strokeWidth={2} />
              <NvrFigureMark figure={figure} x={cx} y={cy} size={cellSize} patternId={patternId} />
              <text x={cx} y={cy + cellSize / 2 + 18} textAnchor="middle" fill={INK} fontSize={11} fontWeight={800}>
                {String.fromCharCode(65 + index)}
              </text>
            </g>
          );
        })}
      </svg>,
      `${title}: row of ${figures.length} figures labelled ${figures.map((_, index) => String.fromCharCode(65 + index)).join(", ")}, four share a rule and one is the odd one out`
    );
  }

  if (type === "vrcode") {
    const pairs = visual.data.pairs;
    const target = visual.data.target;
    if (!isCodePairArray(pairs)) return <VisualFallback adminPreview={adminPreview} />;
    return frame(
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {pairs.map((pair, index) => (
            <div key={`${pair.word}-${index}`} className="flex items-center gap-2 rounded-full border border-gold/30 bg-cream px-3 py-1.5 text-sm font-bold text-navy">
              <span>{pair.word}</span>
              <span className="text-gold-dark" aria-hidden="true">→</span>
              <span className="font-mono tracking-[0.14em] text-gold-dark">{String(pair.code)}</span>
            </div>
          ))}
        </div>
        {typeof target === "string" && (
          <div className="rounded-xl border-2 border-dashed border-gold-dark bg-white px-4 py-3 text-center text-lg font-black tracking-[0.2em] text-navy">{target}</div>
        )}
      </div>,
      `${title}: code key ${pairs.map((pair) => `${pair.word} is ${pair.code}`).join(", ")}${typeof target === "string" ? `, decode ${target}` : ""}`
    );
  }

  if (type === "nvrpairanalogy") {
    const a = visual.data.a;
    const b = visual.data.b;
    const c = visual.data.c;
    if (!isNvrFigure(a) || !isNvrFigure(b) || !isNvrFigure(c)) return <VisualFallback adminPreview={adminPreview} />;
    const size = 64;
    const cy = 65;
    const [ax, bx, cx, dx] = [50, 160, 250, 360];
    return frame(
      <svg viewBox="0 0 420 130" className="h-44 w-full">
        <NvrFigureMark figure={a} x={ax} y={cy} size={size} patternId={`${patternId}-a`} />
        <DiagramArrow x1={ax + 37} x2={bx - 37} y={cy} />
        <NvrFigureMark figure={b} x={bx} y={cy} size={size} patternId={`${patternId}-b`} />
        <DiagramDivider x={205} yTop={20} yBottom={110} />
        <NvrFigureMark figure={c} x={cx} y={cy} size={size} patternId={`${patternId}-c`} />
        <DiagramArrow x1={cx + 37} x2={dx - 37} y={cy} />
        <rect x={dx - size / 2} y={cy - size / 2} width={size} height={size} rx={10} fill="#fde68a" stroke={GOLD_DARK} strokeWidth={3} />
        <NvrFigureMark figure={null} x={dx} y={cy} size={size} patternId={`${patternId}-d`} />
      </svg>,
      `${title}: figure A changes into figure B; figure C must change the same way, choose what it becomes`
    );
  }

  if (type === "nvrrotation") {
    const before = visual.data.before;
    const after = visual.data.after;
    const test = visual.data.test;
    if (!isNvrFigure(before) || !isNvrFigure(after) || !isNvrFigure(test)) return <VisualFallback adminPreview={adminPreview} />;
    const size = 68;
    const cy = 65;
    const [beforeX, afterX, testX] = [55, 175, 320];
    return frame(
      <svg viewBox="0 0 420 130" className="h-44 w-full">
        <NvrFigureMark figure={before} x={beforeX} y={cy} size={size} patternId={`${patternId}-before`} />
        <path d={`M ${beforeX + 40} ${cy - 24} A 30 30 0 0 1 ${afterX - 40} ${cy - 24}`} fill="none" stroke={GOLD_DARK} strokeWidth={2.5} markerEnd="none" />
        <NvrFigureMark figure={after} x={afterX} y={cy} size={size} patternId={`${patternId}-after`} />
        <DiagramDivider x={250} yTop={20} yBottom={110} />
        <NvrFigureMark figure={test} x={testX} y={cy} size={size} patternId={`${patternId}-test`} />
        <text x={320} y={118} textAnchor="middle" fill={INK} fontSize={11} fontWeight={800}>?</text>
      </svg>,
      `${title}: the first figure is rotated to make the second; apply the same rotation to the test figure and choose the result`
    );
  }

  if (type === "nvrsimilarity") {
    const reference = visual.data.reference;
    const query = visual.data.query;
    if (!isNvrFigureArray(reference) || reference.length < 2 || !isNvrFigure(query)) return <VisualFallback adminPreview={adminPreview} />;
    const size = 72;
    const cy = 66;
    return frame(
      <svg viewBox="0 0 360 148" className="h-48 w-full">
        {reference.map((figure, index) => (
          <NvrFigureMark key={index} figure={figure} x={70 + index * 90} y={cy} size={size} patternId={`${patternId}-ref${index}`} />
        ))}
        <line x1={20} y1={112} x2={20 + reference.length * 90 - 20} y2={112} stroke={GRID} strokeWidth={2} />
        <text x={20} y={132} fill={INK} fontSize={11} fontWeight={800}>these are alike</text>
        <line x1={272} y1={20} x2={272} y2={112} stroke={GRID} strokeWidth={2} />
        <NvrFigureMark figure={query} x={320} y={cy} size={size} patternId={`${patternId}-query`} />
        <text x={272} y={132} fill={INK} fontSize={11} fontWeight={800}>which option is like these?</text>
      </svg>,
      `${title}: two reference figures share one property, choose the answer option that shares the same property as the query figure`
    );
  }

  if (type === "nvrcodekey") {
    const examples = visual.data.examples;
    const test = visual.data.test;
    const validExamples =
      Array.isArray(examples) &&
      examples.every((item) => typeof item === "object" && item !== null && isNvrFigure((item as Record<string, unknown>).figure) && typeof (item as Record<string, unknown>).code === "string");
    if (!validExamples || !isNvrFigure(test)) return <VisualFallback adminPreview={adminPreview} />;
    const typedExamples = examples as { figure: NvrFigure; code: string }[];
    return frame(
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {typedExamples.map((example, index) => (
            <div key={index} className="flex items-center gap-2 rounded-xl border border-gold/25 bg-cream px-2 py-1.5">
              <svg viewBox="0 0 60 60" className="h-10 w-10">
                <NvrFigureMark figure={example.figure} x={30} y={30} size={48} patternId={`${patternId}-ex${index}`} />
              </svg>
              <span className="text-gold-dark" aria-hidden="true">→</span>
              <span className="font-mono text-sm font-black tracking-[0.14em] text-gold-dark">{example.code}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-gold-dark bg-white px-3 py-2">
          <svg viewBox="0 0 60 60" className="h-10 w-10">
            <NvrFigureMark figure={test} x={30} y={30} size={48} patternId={`${patternId}-test`} />
          </svg>
          <span className="text-gold-dark" aria-hidden="true">→</span>
          <span className="text-lg font-black text-navy">?</span>
        </div>
      </div>,
      `${title}: figure-to-code key with ${typedExamples.length} worked examples, work out the code for the test figure`
    );
  }

  if (type === "nvrnet") {
    const net = visual.data.net;
    const isFaceMap = typeof net === "object" && net !== null && ["top", "front", "bottom", "left", "right", "back"].every((face) => isNvrFigure((net as Record<string, unknown>)[face]));
    if (!isFaceMap) return <VisualFallback adminPreview={adminPreview} />;
    const faces = net as Record<"top" | "front" | "bottom" | "left" | "right" | "back", NvrFigure>;
    const cellSize = 72;
    const gap = 10;
    const originX = 14;
    const originY = 14;
    const cellPos = (row: number, col: number) => ({ x: originX + col * (cellSize + gap) + cellSize / 2, y: originY + row * (cellSize + gap) + cellSize / 2 });
    const layout: { face: keyof typeof faces; row: number; col: number }[] = [
      { face: "top", row: 0, col: 2 },
      { face: "left", row: 1, col: 1 },
      { face: "front", row: 1, col: 2 },
      { face: "right", row: 1, col: 3 },
      { face: "back", row: 1, col: 4 },
      { face: "bottom", row: 2, col: 2 },
    ];
    return frame(
      <svg viewBox="0 0 430 268" className="mx-auto h-80 w-full max-w-lg">
        {layout.map(({ face, row, col }) => {
          const { x, y } = cellPos(row, col);
          return (
            <g key={face}>
              <rect x={x - cellSize / 2} y={y - cellSize / 2} width={cellSize} height={cellSize} rx={8} fill="#ffffff" stroke={GRID} strokeWidth={2} />
              <NvrFigureMark figure={faces[face]} x={x} y={y} size={cellSize * 0.82} patternId={`${patternId}-${face}`} />
            </g>
          );
        })}
      </svg>,
      `${title}: unfolded net of a cube with a different symbol on each of the 6 faces, choose the cube it folds into`
    );
  }

  if (type === "nvrcombine3d") {
    const a = visual.data.a;
    const b = visual.data.b;
    const isBlock = (v: unknown): v is { w: number; h: number; d: number } => typeof v === "object" && v !== null && ["w", "h", "d"].every((k) => typeof (v as Record<string, unknown>)[k] === "number");
    if (!isBlock(a) || !isBlock(b)) return <VisualFallback adminPreview={adminPreview} />;
    return frame(
      <svg viewBox="0 0 300 220" className="mx-auto h-72 w-full max-w-md">
        <ObliqueCuboid x={40} y={150} w={a.w} h={a.h} d={a.d} patternId={`${patternId}-a`} />
        <text x={40 + a.w / 2} y={185} textAnchor="middle" fill={INK} fontSize={11} fontWeight={800}>Shape A</text>
        <ObliqueCuboid x={190} y={150} w={b.w} h={b.h} d={b.d} patternId={`${patternId}-b`} />
        <text x={190 + b.w / 2} y={185} textAnchor="middle" fill={INK} fontSize={11} fontWeight={800}>Shape B</text>
      </svg>,
      `${title}: two separate solids, shape A and shape B; choose the answer option that shows them joined face-to-face with no gap or overlap`
    );
  }

  if (type === "nvrholepunch") {
    const folds = visual.data.folds;
    const punch = visual.data.punch;
    const isPunchPoint = typeof punch === "object" && punch !== null && typeof (punch as Record<string, unknown>).x === "number" && typeof (punch as Record<string, unknown>).y === "number";
    if (!isStringArray(folds) || !isPunchPoint) return <VisualFallback adminPreview={adminPreview} />;
    const p = punch as { x: number; y: number };
    const foldedSize = 130;
    const foldedX = 30;
    const foldedY = 28;
    const targetSize = 150;
    const targetX = foldedX + foldedSize + 74;
    const targetY = foldedY - 14;
    const quarterPoints = [0.25, 0.5, 0.75];
    return frame(
      <svg viewBox="0 0 410 190" className="h-64 w-full">
        <rect x={foldedX} y={foldedY} width={foldedSize} height={foldedSize} rx={6} fill="#fff8e7" stroke={INK} strokeWidth={3} />
        {quarterPoints.map((q) => (
          <g key={q} stroke={GRID} strokeWidth={1} strokeDasharray="2 4" opacity={0.9}>
            <line x1={foldedX + q * foldedSize} y1={foldedY} x2={foldedX + q * foldedSize} y2={foldedY + foldedSize} />
            <line x1={foldedX} y1={foldedY + q * foldedSize} x2={foldedX + foldedSize} y2={foldedY + q * foldedSize} />
          </g>
        ))}
        {folds.map((fold, index) => {
          const isVertical = fold === "vertical";
          const label = `Fold ${index + 1}`;
          return (
            <g key={index}>
              <line
                x1={isVertical ? foldedX + foldedSize / 2 : foldedX}
                y1={isVertical ? foldedY : foldedY + foldedSize / 2}
                x2={isVertical ? foldedX + foldedSize / 2 : foldedX + foldedSize}
                y2={isVertical ? foldedY + foldedSize : foldedY + foldedSize / 2}
                stroke={BLUE_DARK}
                strokeWidth={2.5}
                strokeDasharray="6 4"
              />
              {folds.length > 1 && (
                <text
                  x={isVertical ? foldedX + foldedSize / 2 : foldedX - 6}
                  y={isVertical ? foldedY - 8 : foldedY + foldedSize / 2 + 4}
                  textAnchor={isVertical ? "middle" : "end"}
                  fill={BLUE_DARK}
                  fontSize={10}
                  fontWeight={800}
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}
        <circle cx={foldedX + p.x * foldedSize} cy={foldedY + p.y * foldedSize} r={6} fill={INK} />
        <DiagramArrow x1={foldedX + foldedSize + 14} x2={foldedX + foldedSize + 60} y={foldedY + foldedSize / 2} />
        <rect x={targetX} y={targetY} width={targetSize} height={targetSize} rx={6} fill="#ffffff" stroke={GOLD_DARK} strokeWidth={3} strokeDasharray="6 4" />
        {quarterPoints.map((q) => (
          <g key={q} stroke={GRID} strokeWidth={1} strokeDasharray="2 4" opacity={0.9}>
            <line x1={targetX + q * targetSize} y1={targetY} x2={targetX + q * targetSize} y2={targetY + targetSize} />
            <line x1={targetX} y1={targetY + q * targetSize} x2={targetX + targetSize} y2={targetY + q * targetSize} />
          </g>
        ))}
        <text x={targetX + targetSize / 2} y={targetY + targetSize / 2 + 9} textAnchor="middle" fill={GOLD_DARK} fontSize={30} fontWeight={900}>?</text>
      </svg>,
      `${title}: paper folded ${folds.join(" then ")}, a hole is punched through the folded stack; choose the pattern of holes when unfolded`
    );
  }

  return <VisualFallback adminPreview={adminPreview} />;
}

/** Reflects a point across each fold line in turn, returning every resulting hole position when the paper is unfolded (deduped). */
export function unfoldPoints(point: { x: number; y: number }, folds: string[]) {
  let points = [point];
  for (const fold of folds) {
    points = points.flatMap((p) => [p, fold === "vertical" ? { x: 1 - p.x, y: p.y } : { x: p.x, y: 1 - p.y }]);
  }
  const seen = new Set<string>();
  const unique: { x: number; y: number }[] = [];
  for (const p of points) {
    const key = `${p.x.toFixed(3)},${p.y.toFixed(3)}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  }
  return unique;
}

function ordinal(value: number) {
  const remainder = value % 100;
  if (remainder >= 11 && remainder <= 13) return `${value}th`;
  const last = value % 10;
  return `${value}${last === 1 ? "st" : last === 2 ? "nd" : last === 3 ? "rd" : "th"}`;
}

export function VisualFallback({ adminPreview }: { adminPreview?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-cream p-4 text-sm text-muted">
      {adminPreview ? "This visual is missing or malformed. Review the visual data before publishing." : "This question visual is not available yet."}
    </div>
  );
}
