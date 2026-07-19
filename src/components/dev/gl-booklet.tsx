"use client";

import React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NvrFigureMark, ObliqueCuboid, combine3dLayout, type NvrCell, type NvrFigure, type Block, type AttachMode } from "@/components/platform/question-visuals";

/**
 * GL-style exam chrome for local preview pages only (src/app/dev/*).
 * Built on the same navy/gold/cream tokens as the rest of the platform, with
 * blue reserved for "interactive/structural" (nav, hover/focus, progress) so
 * gold stays legible as "this is the emphasised/selected content."
 */

export function BookletHeader({ subject, bookletLabel }: { subject: string; bookletLabel: string }) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-gold/25 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.5)]">
      <div className="bg-navy px-6 py-5 text-cream sm:px-8">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-gold-light">{bookletLabel}</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{subject}</h1>
      </div>
      <div className="border-t border-gold/20 bg-cream-dark px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-navy/70 sm:px-8">
        Pick a topic below, then answer at your own pace &middot; your progress is saved as you go
      </div>
    </div>
  );
}

export function SectionIntro({
  index,
  title,
  instruction,
  example,
  solution,
}: {
  index: number;
  title: string;
  instruction: string;
  example?: ReactNode;
  solution?: string;
}) {
  return (
    <div className="mb-6 min-w-0">
      <div className="mb-3 flex items-baseline gap-3 border-b-2 border-navy/10 pb-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-black text-cream">{index}</span>
        <h2 className="min-w-0 break-words text-base font-black text-navy sm:text-lg">{title}</h2>
      </div>
      <p className="mb-3 break-words text-sm leading-relaxed text-ink/80">{instruction}</p>
      {(example || solution) && (
        <div className="min-w-0 rounded-xl border border-dashed border-gold-dark/45 bg-cream-dark/70 p-4">
          {example && (
            <>
              <p className="mb-2 text-[0.62rem] font-black uppercase tracking-[0.2em] text-gold-dark">Example</p>
              {example}
            </>
          )}
          {solution && (
            <>
              <p className="mt-3 text-[0.62rem] font-black uppercase tracking-[0.2em] text-gold-dark">Solution</p>
              <p className="break-words text-sm text-ink/75">{solution}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function QuestionRow({ number, children }: { number: number; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-line/50 py-5 last:border-b-0">
      <div className="w-7 shrink-0 pt-0.5 text-right text-sm font-black text-navy/45">{number}</div>
      <div className="min-w-0 flex-1 space-y-3">{children}</div>
    </div>
  );
}

/** Letter-only answer ovals for text-based VR questions; supports a second lettered group for two-group archetypes. */
export function AnswerOvals({ options, groupLabel, letters }: { options: number; groupLabel?: string; letters?: string }) {
  const alphabet = letters ?? "ABCDE";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {groupLabel && <span className="mr-1 text-[0.62rem] font-black uppercase tracking-wider text-muted">{groupLabel}</span>}
      {Array.from({ length: options }).map((_, index) => (
        <span key={index} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-navy/25 text-xs font-black text-navy">
          {alphabet[index]}
        </span>
      ))}
    </div>
  );
}

/**
 * Selectable answer thumbnail: gold ring = chosen, blue ring = hover/keyboard-focus affordance.
 * Gold is reserved for "this is the emphasised content" (matching the rest of the design system);
 * blue signals "this is interactive" — the two accents stay semantically distinct rather than competing.
 * Controlled by the caller (selected/onSelect) so the choice survives the parent question unmounting
 * on Prev/Next navigation, rather than living in component-local state.
 */
function OptionButton({ index, selected, onSelect, children }: { index: number; selected: boolean; onSelect: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onSelect} className="group flex w-full flex-col items-center gap-1.5 rounded-xl outline-none">
      <span
        className={cn(
          "flex w-full items-center justify-center rounded-xl border-2 bg-white p-2 transition-all duration-150",
          selected
            ? "border-gold-dark ring-2 ring-gold-dark/50 bg-gold-light/20"
            : "border-navy/12 group-hover:border-blue-500 group-hover:ring-2 group-hover:ring-blue-500/35 group-focus-visible:border-blue-600 group-focus-visible:ring-2 group-focus-visible:ring-blue-600/45"
        )}
      >
        {children}
      </span>
      <span className={cn("text-xs font-black transition-colors", selected ? "text-gold-dark" : "text-navy/50 group-hover:text-blue-600")}>{String.fromCharCode(65 + index)}</span>
    </button>
  );
}

type OptionGridProps = { selected: number | null; onSelect: (index: number) => void };

/**
 * Shared responsive grid for A-E answer options. Deliberately capped at 3 columns (2 on the
 * narrowest screens) rather than forcing 5-across — the answer panel is a fixed-width sidebar,
 * and 5 large thumbnails squeezed into it is what made nets/cubes options unreadable before.
 */
function OptionGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>;
}

/** A-E row of NVR figure thumbnails, for questions answered by picking a shape rather than a letter/word. */
export function FigureAnswerOptions({ options, selected, onSelect }: { options: NvrCell[] } & OptionGridProps) {
  const patternId = React.useId();
  return (
    <OptionGrid>
      {options.map((option, index) => (
        <OptionButton key={index} index={index} selected={selected === index} onSelect={() => onSelect(index)}>
          <svg viewBox="0 0 100 100" className="h-24 w-24 sm:h-28 sm:w-28">
            <NvrFigureMark figure={option} x={50} y={50} size={82} patternId={`${patternId}-opt${index}`} />
          </svg>
        </OptionButton>
      ))}
    </OptionGrid>
  );
}

/** A-E row of oblique cube thumbnails, for "which cube does this net fold into" questions. Sized generously so the three visible faces are easy to compare between options. */
export function CubeAnswerOptions({ options, selected, onSelect }: { options: { top?: NvrFigure; front?: NvrFigure; right?: NvrFigure }[] } & OptionGridProps) {
  const patternId = React.useId();
  return (
    <OptionGrid>
      {options.map((cube, index) => (
        <OptionButton key={index} index={index} selected={selected === index} onSelect={() => onSelect(index)}>
          <svg viewBox="0 0 150 150" className="h-28 w-28 sm:h-32 sm:w-32">
            <ObliqueCuboid x={18} y={88} w={58} h={58} d={38} symbols={cube} patternId={`${patternId}-cube${index}`} />
          </svg>
        </OptionButton>
      ))}
    </OptionGrid>
  );
}

/** A-E row of two-solid thumbnails for "which shows shape A and B joined correctly" questions — reuses the same attach-layout math as the prompt so gap/overlap decoys stay physically consistent. */
export function CombinedSolidOptions({ options, selected, onSelect, scale = 0.78 }: { options: { a: Block; b: Block; attach: AttachMode }[]; scale?: number } & OptionGridProps) {
  return (
    <OptionGrid>
      {options.map((option, index) => {
        const a: Block = { w: option.a.w * scale, h: option.a.h * scale, d: option.a.d * scale };
        const b: Block = { w: option.b.w * scale, h: option.b.h * scale, d: option.b.d * scale };
        const layout = combine3dLayout(a, b, option.attach, 20, 118);
        return (
          <OptionButton key={index} index={index} selected={selected === index} onSelect={() => onSelect(index)}>
            <svg viewBox="0 0 160 160" className="h-28 w-28 sm:h-32 sm:w-32">
              <ObliqueCuboid x={layout.xA} y={layout.yA} w={a.w} h={a.h} d={a.d} patternId={`cso-a${index}`} />
              <ObliqueCuboid x={layout.xB} y={layout.yB} w={b.w} h={b.h} d={b.d} patternId={`cso-b${index}`} />
            </svg>
          </OptionButton>
        );
      })}
    </OptionGrid>
  );
}

/** A-E row of unfolded dot-pattern thumbnails, for hole-punch questions. A faint quarter-point grid mirrors the prompt so positions can be checked against gridlines rather than eyeballed. */
export function DotPatternOptions({ options, selected, onSelect }: { options: { x: number; y: number }[][] } & OptionGridProps) {
  const quarterPoints = [0.25, 0.5, 0.75];
  return (
    <OptionGrid>
      {options.map((dots, index) => (
        <OptionButton key={index} index={index} selected={selected === index} onSelect={() => onSelect(index)}>
          <svg viewBox="0 0 100 100" className="h-24 w-24 sm:h-28 sm:w-28">
            <rect x={3} y={3} width={94} height={94} rx={6} fill="#fff8e7" stroke="#172033" strokeWidth={2} />
            {quarterPoints.map((q) => (
              <g key={q} stroke="#f7e8bd" strokeWidth={1} strokeDasharray="2 4">
                <line x1={3 + q * 94} y1={3} x2={3 + q * 94} y2={97} />
                <line x1={3} y1={3 + q * 94} x2={97} y2={3 + q * 94} />
              </g>
            ))}
            {dots.map((dot, dotIndex) => (
              <circle key={dotIndex} cx={3 + dot.x * 94} cy={3 + dot.y * 94} r={5} fill="#172033" />
            ))}
          </svg>
        </OptionButton>
      ))}
    </OptionGrid>
  );
}

export function WriteInBox({ placeholder = "Write your answer" }: { placeholder?: string }) {
  return (
    <div className="flex h-9 w-40 items-center rounded-md border-2 border-dashed border-navy/25 px-3 text-xs font-semibold text-muted">
      {placeholder}
    </div>
  );
}

/** A-E row of figure-to-code answers for code-key questions — a clickable chip list sharing the same controlled selection + gold/blue affordance as the other option types. */
export function CodeAnswerOptions({ codes, selected, onSelect }: { codes: string[] } & OptionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {codes.map((code, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          className={cn(
            "group flex items-center justify-center gap-2 rounded-xl border-2 bg-white px-3 py-3 text-sm font-black transition-all duration-150",
            selected === index
              ? "border-gold-dark bg-gold-light/20 ring-2 ring-gold-dark/50"
              : "border-navy/12 hover:border-blue-500 hover:ring-2 hover:ring-blue-500/35 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/45"
          )}
        >
          <span className={selected === index ? "text-gold-dark" : "text-navy/50"}>{String.fromCharCode(65 + index)}</span>
          <span className="font-mono tracking-[0.1em] text-navy">{code}</span>
        </button>
      ))}
    </div>
  );
}

export function TwoGroupWordOptions({ groupOne, groupTwo }: { groupOne: string[]; groupTwo: string[] }) {
  const rows: [string, string[]][] = [
    ["A B C", groupOne],
    ["X Y Z", groupTwo],
  ];
  return (
    <div className="space-y-1.5">
      {rows.map(([label, words]) => (
        <div key={label} className="flex flex-wrap items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-[0.62rem] font-black uppercase tracking-wider text-muted">{label}</span>
          {words.map((word, index) => (
            <span key={word} className="rounded-md border border-navy/15 bg-white px-2 py-1 font-semibold text-navy">
              {String.fromCharCode(65 + (label === "A B C" ? 0 : 23) + index)}. {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Exam-style shell: topic navigator, question pager, two-column layout       */
/* -------------------------------------------------------------------------- */

export type TopicIconKind = "sequence" | "analogy" | "matrix" | "similarity" | "oddoneout" | "codekey" | "rotation" | "net" | "combine3d" | "holepunch";

/** Small geometric glyphs (not emoji) identifying each archetype at a glance in the topic nav. */
function TopicIcon({ kind, active }: { kind: TopicIconKind; active: boolean }) {
  const stroke = active ? "#1d4ed8" : "#172033";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      {kind === "sequence" && (
        <>
          <rect x="1.5" y="9" width="5" height="5" {...common} />
          <rect x="9.5" y="9" width="5" height="5" {...common} />
          <rect x="17.5" y="9" width="5" height="5" strokeDasharray="2 2" {...common} />
        </>
      )}
      {kind === "analogy" && (
        <>
          <rect x="1.5" y="9" width="5" height="5" {...common} />
          <path d="M8 11.5h5" {...common} />
          <path d="M11 9l2 2.5-2 2.5" {...common} />
          <circle cx="19.5" cy="11.5" r="2.7" {...common} />
        </>
      )}
      {kind === "matrix" && (
        <>
          <rect x="1.5" y="1.5" width="6" height="6" {...common} />
          <rect x="9" y="1.5" width="6" height="6" {...common} />
          <rect x="1.5" y="9" width="6" height="6" {...common} />
          <rect x="9" y="9" width="6" height="6" strokeDasharray="2 2" {...common} />
        </>
      )}
      {kind === "similarity" && (
        <>
          <circle cx="5" cy="12" r="3.2" {...common} />
          <circle cx="12.5" cy="12" r="3.2" {...common} />
          <path d="M17 12h1.5M22 12h-1.5" {...common} />
          <rect x="19" y="9" width="4" height="6" {...common} />
        </>
      )}
      {kind === "oddoneout" && (
        <>
          <circle cx="4.5" cy="12" r="2.7" {...common} />
          <circle cx="11.5" cy="12" r="2.7" {...common} />
          <circle cx="18.5" cy="12" r="2.7" {...common} />
          <rect x="1.8" y="4" width="5.4" height="5.4" {...common} />
        </>
      )}
      {kind === "codekey" && (
        <>
          <circle cx="7" cy="12" r="4" {...common} />
          <path d="M11 12h11M15 12v3M19 12v3" {...common} />
        </>
      )}
      {kind === "rotation" && <path d="M12 3a9 9 0 1 1-6.4 2.6M5 2v4h4" {...common} />}
      {kind === "net" && (
        <>
          <rect x="9" y="1.5" width="6" height="6" {...common} />
          <rect x="2" y="9" width="6" height="6" {...common} />
          <rect x="9" y="9" width="6" height="6" {...common} />
          <rect x="16" y="9" width="6" height="6" {...common} />
          <rect x="9" y="16.5" width="6" height="6" {...common} />
        </>
      )}
      {kind === "combine3d" && (
        <>
          <path d="M2 15l5-3 5 3-5 3-5-3z" {...common} />
          <path d="M2 15v4l5 3 5-3v-4" {...common} />
          <path d="M12 8l5-3 5 3-5 3-5-3z" {...common} />
          <path d="M12 8v4l5 3 5-3V8" {...common} />
        </>
      )}
      {kind === "holepunch" && (
        <>
          <rect x="3" y="3" width="14" height="14" rx="2" {...common} />
          <circle cx="8" cy="8" r="1.4" fill={stroke} stroke="none" />
          <path d="M19 10h3M20.5 8.5v3" {...common} />
        </>
      )}
    </svg>
  );
}

export interface TopicSummary {
  id: string;
  label: string;
  icon: TopicIconKind;
  total: number;
  answered: number;
}

/** Topic cards with per-topic progress, replacing a single long scroll with something a student can jump around in. */
export function TopicNav({ topics, activeId, onSelect }: { topics: TopicSummary[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {topics.map((topic) => {
        const active = topic.id === activeId;
        const complete = topic.answered >= topic.total && topic.total > 0;
        const pct = topic.total > 0 ? Math.round((topic.answered / topic.total) * 100) : 0;
        return (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelect(topic.id)}
            className={cn(
              "flex min-w-0 flex-col gap-2 rounded-xl border-2 bg-white p-3 text-left transition-all duration-150",
              active ? "border-blue-500 ring-2 ring-blue-500/30" : "border-navy/10 hover:border-blue-400/70"
            )}
          >
            <div className="flex items-center gap-2">
              <TopicIcon kind={topic.icon} active={active} />
              <span className={cn("min-w-0 flex-1 truncate text-xs font-black", active ? "text-blue-700" : "text-navy")}>{topic.label}</span>
              {complete && <span className="shrink-0 text-[0.6rem] font-black text-gold-dark">DONE</span>}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/10">
                <div className={cn("h-full rounded-full transition-all", complete ? "bg-gold-dark" : "bg-blue-500")} style={{ width: `${pct}%` }} />
              </div>
              <span className="shrink-0 text-[0.62rem] font-bold text-navy/50">{topic.answered}/{topic.total}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/** Prev/Next controls plus a jump strip for the questions within the active topic. */
export function QuestionPager({
  current,
  total,
  answered,
  onPrev,
  onNext,
  onJump,
}: {
  current: number;
  total: number;
  answered: boolean[];
  onPrev: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-4">
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onJump(index)}
            aria-current={index === current}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all",
              index === current
                ? "bg-blue-600 text-white ring-2 ring-blue-300"
                : answered[index]
                  ? "bg-gold-light text-gold-dark"
                  : "bg-navy/8 text-navy/50 hover:bg-blue-100 hover:text-blue-700"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={current === 0}
          className="rounded-lg border-2 border-navy/15 px-3 py-1.5 text-xs font-black text-navy transition-colors hover:border-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-navy/15 disabled:hover:text-navy"
        >
          &larr; Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={current === total - 1}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-black text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

/** Two-column exam shell: the diagram gets the large left pane, answer options sit in a right panel that's sticky on desktop and stacks below on mobile. */
export function ExamLayout({ questionNumber, diagram, options, pager }: { questionNumber: number; diagram: ReactNode; options: ReactNode; pager: ReactNode }) {
  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[1fr_440px]">
      <div className="min-w-0 rounded-2xl border border-gold/20 bg-white p-4 sm:p-6">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-navy/40">Question {questionNumber}</p>
        <div className="min-w-0">{diagram}</div>
      </div>
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gold/20 bg-cream-dark/40 p-4 sm:p-5 lg:sticky lg:top-6 lg:self-start">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-navy/50">Choose your answer</p>
        <div className="min-w-0">{options}</div>
        {pager}
      </div>
    </div>
  );
}
