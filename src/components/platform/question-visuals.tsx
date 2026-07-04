"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { QuestionVisual } from "@/types/platform";

const INK = "#172033";
const INK_SOFT = "#111827";
const GOLD = "#f59e0b";
const GOLD_DARK = "#b45309";
const GRID = "#f7e8bd";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isFinite(item));
}

/** Smallest "nice" axis maximum and tick step so chart values can be read off the scale. */
function niceScale(maxValue: number) {
  const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500];
  const step = steps.find((candidate) => maxValue / candidate <= 8) ?? 1000;
  return { max: Math.max(step, Math.ceil(maxValue / step) * step), step };
}

export function VisualRenderer({ visual, adminPreview }: { visual: QuestionVisual; adminPreview?: boolean }) {
  const type = visual.type.replace("_", "").toLowerCase();
  const title = visual.title || "Question visual";
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

  return <VisualFallback adminPreview={adminPreview} />;
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
