"use client";

import { useState } from "react";
import { VisualRenderer, unfoldPoints } from "@/components/platform/question-visuals";
import type { NvrCell, NvrFigure, Block, AttachMode } from "@/components/platform/question-visuals";
import type { QuestionVisual } from "@/types/platform";
import {
  BookletHeader,
  TopicNav,
  QuestionPager,
  ExamLayout,
  FigureAnswerOptions,
  CubeAnswerOptions,
  CombinedSolidOptions,
  DotPatternOptions,
  CodeAnswerOptions,
  type TopicSummary,
  type TopicIconKind,
} from "@/components/dev/gl-booklet";

/**
 * Local-only preview of GL-style NVR archetypes, redesigned as a one-question-at-a-time
 * online mock (topic cards with progress, big diagram + fixed answer panel, Prev/Next).
 * Original content — format/structure only is inspired by research/gl-vr-nvr-question-bank.md.
 * Not wired into the real mock pipeline yet.
 */

const fig = (f: NvrFigure): NvrFigure => f;

/** Inserts the correct answer at a given index among decoys, so the right answer isn't always option A. */
function place<T>(correct: T, decoys: T[], index: number): T[] {
  const arr = [...decoys];
  arr.splice(Math.min(index, arr.length), 0, correct);
  return arr;
}

type Answerable =
  | { visual: QuestionVisual; kind: "figure"; options: NvrCell[] }
  | { visual: QuestionVisual; kind: "cube"; options: { top?: NvrFigure; front?: NvrFigure; right?: NvrFigure }[] }
  | { visual: QuestionVisual; kind: "combine"; options: { a: Block; b: Block; attach: AttachMode }[] }
  | { visual: QuestionVisual; kind: "dots"; options: { x: number; y: number }[][] }
  | { visual: QuestionVisual; kind: "code"; options: string[] };

interface Topic {
  id: string;
  label: string;
  icon: TopicIconKind;
  instruction: string;
  example?: React.ReactNode;
  solution?: string;
  questions: Answerable[];
}

function AnswerOptions({ q, selected, onSelect }: { q: Answerable; selected: number | null; onSelect: (i: number) => void }) {
  if (q.kind === "figure") return <FigureAnswerOptions options={q.options} selected={selected} onSelect={onSelect} />;
  if (q.kind === "cube") return <CubeAnswerOptions options={q.options} selected={selected} onSelect={onSelect} />;
  if (q.kind === "combine") return <CombinedSolidOptions options={q.options} selected={selected} onSelect={onSelect} />;
  if (q.kind === "dots") return <DotPatternOptions options={q.options} selected={selected} onSelect={onSelect} />;
  return <CodeAnswerOptions codes={q.options} selected={selected} onSelect={onSelect} />;
}

function TopicHelp({ topic }: { topic: Topic }) {
  return (
    <details className="mb-5 min-w-0 overflow-hidden rounded-2xl border border-gold/20 bg-white">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm font-black text-navy marker:text-blue-600">How to answer &mdash; {topic.label}</summary>
      <div className="min-w-0 border-t border-gold/10 px-4 pb-4 pt-3">
        <p className="mb-3 break-words text-sm leading-relaxed text-ink/80">{topic.instruction}</p>
        {topic.example && (
          <div className="min-w-0 rounded-xl border border-dashed border-gold-dark/45 bg-cream-dark/70 p-4">
            <p className="mb-2 text-[0.62rem] font-black uppercase tracking-[0.2em] text-gold-dark">Example</p>
            {topic.example}
            {topic.solution && (
              <>
                <p className="mt-3 text-[0.62rem] font-black uppercase tracking-[0.2em] text-gold-dark">Solution</p>
                <p className="break-words text-sm text-ink/75">{topic.solution}</p>
              </>
            )}
          </div>
        )}
      </div>
    </details>
  );
}

export default function NvrPreviewPage() {
  // Topic 1 — sequence completion: each question varies exactly 2 figure properties on a fixed
  // rule, and every decoy breaks exactly one of those two properties (never both, never a random one).
  const sequenceQuestions: Answerable[] = [
    {
      // Rule: rotate +25° each step AND fill alternates solid/outline every step.
      visual: { type: "nvrSequence", title: "Sequence 1", data: { figures: [fig({ sides: 4, rotation: 0, fill: "solid" }), fig({ sides: 4, rotation: 25, fill: "outline" }), fig({ sides: 4, rotation: 50, fill: "solid" }), fig({ sides: 4, rotation: 75, fill: "outline" }), null] } },
      kind: "figure",
      options: place(
        fig({ sides: 4, rotation: 100, fill: "solid" }),
        [
          fig({ sides: 4, rotation: 100, fill: "outline" }),
          fig({ sides: 4, rotation: 90, fill: "solid" }),
          fig({ sides: 5, rotation: 100, fill: "solid" }),
          fig({ sides: 4, rotation: 75, fill: "solid" }),
        ],
        2
      ),
    },
    {
      // Rule: one more dot added each step, always at the next corner clockwise from top-left.
      visual: {
        type: "nvrSequence",
        title: "Sequence 2",
        data: {
          figures: [
            fig({ sides: 3, fill: "dots", internalElements: [{ shape: "dot", position: "topLeft" }] }),
            fig({ sides: 3, fill: "dots", internalElements: [{ shape: "dot", position: "topLeft" }, { shape: "dot", position: "topRight" }] }),
            fig({ sides: 3, fill: "dots", internalElements: [{ shape: "dot", position: "topLeft" }, { shape: "dot", position: "topRight" }, { shape: "dot", position: "bottomRight" }] }),
            null,
          ],
        },
      },
      kind: "figure",
      options: place(
        fig({ sides: 3, fill: "dots", internalElements: [{ shape: "dot", position: "topLeft" }, { shape: "dot", position: "topRight" }, { shape: "dot", position: "bottomRight" }, { shape: "dot", position: "bottomLeft" }] }),
        [
          fig({ sides: 3, fill: "dots", internalElements: [{ shape: "dot", position: "topLeft" }, { shape: "dot", position: "topRight" }, { shape: "dot", position: "bottomRight" }] }),
          fig({ sides: 3, fill: "dots", internalElements: [{ shape: "dot", position: "topLeft" }, { shape: "dot", position: "topRight" }, { shape: "dot", position: "bottomRight" }, { shape: "dot", position: "bottomRight" }] }),
          fig({ sides: 3, fill: "solid", internalElements: [{ shape: "dot", position: "topLeft" }, { shape: "dot", position: "topRight" }, { shape: "dot", position: "bottomRight" }, { shape: "dot", position: "bottomLeft" }] }),
          fig({ sides: 4, fill: "dots", internalElements: [{ shape: "dot", position: "topLeft" }, { shape: "dot", position: "topRight" }, { shape: "dot", position: "bottomRight" }, { shape: "dot", position: "bottomLeft" }] }),
        ],
        1
      ),
    },
    {
      // Rule: hexagon grows in size each step AND fill alternates outline/hatch every step.
      visual: { type: "nvrSequence", title: "Sequence 3", data: { figures: [fig({ sides: 6, size: 0.5, fill: "outline" }), fig({ sides: 6, size: 0.65, fill: "hatch" }), fig({ sides: 6, size: 0.8, fill: "outline" }), null] } },
      kind: "figure",
      options: place(
        fig({ sides: 6, size: 0.95, fill: "hatch" }),
        [
          fig({ sides: 6, size: 0.95, fill: "outline" }),
          fig({ sides: 6, size: 0.8, fill: "hatch" }),
          fig({ sides: 5, size: 0.95, fill: "hatch" }),
          fig({ sides: 6, size: 0.5, fill: "hatch" }),
        ],
        3
      ),
    },
    {
      // Rule: border cycles solid -> dashed -> dotted (repeating) AND fill alternates outline/solid every step.
      visual: { type: "nvrSequence", title: "Sequence 4", data: { figures: [fig({ sides: 4, borderStyle: "solid", fill: "outline" }), fig({ sides: 4, borderStyle: "dashed", fill: "solid" }), fig({ sides: 4, borderStyle: "dotted", fill: "outline" }), null] } },
      kind: "figure",
      options: place(
        fig({ sides: 4, borderStyle: "solid", fill: "solid" }),
        [
          fig({ sides: 4, borderStyle: "solid", fill: "outline" }),
          fig({ sides: 4, borderStyle: "dotted", fill: "solid" }),
          fig({ sides: 3, borderStyle: "solid", fill: "solid" }),
          fig({ sides: 4, borderStyle: "dashed", fill: "solid" }),
        ],
        4
      ),
    },
  ];

  // Topic 2 — pair analogy: A changes into B by a stated rule; apply the identical rule to C.
  const analogyQuestions: Answerable[] = [
    {
      // Rule: fill flips solid -> outline; C's own shape carries through unchanged.
      visual: { type: "nvrPairAnalogy", title: "Analogy 1", data: { a: fig({ sides: 4, fill: "solid" }), b: fig({ sides: 4, fill: "outline" }), c: fig({ sides: 5, fill: "solid" }) } },
      kind: "figure",
      options: place(
        fig({ sides: 5, fill: "outline" }),
        [fig({ sides: 5, fill: "solid" }), fig({ sides: 6, fill: "outline" }), fig({ sides: 5, fill: "dots" }), fig({ sides: 4, fill: "outline" })],
        1
      ),
    },
    {
      // Rule: sides +1 AND rotation +60, together.
      visual: { type: "nvrPairAnalogy", title: "Analogy 2", data: { a: fig({ sides: 3, rotation: 0 }), b: fig({ sides: 4, rotation: 60 }), c: fig({ sides: 4, rotation: 0 }) } },
      kind: "figure",
      options: place(
        fig({ sides: 5, rotation: 60 }),
        [fig({ sides: 5, rotation: 45 }), fig({ sides: 4, rotation: 60 }), fig({ sides: 6, rotation: 60 }), fig({ sides: 5, rotation: 0 })],
        3
      ),
    },
    {
      // Rule: reflect flips AND the marked dot mirrors left-right (topLeft <-> topRight).
      visual: {
        type: "nvrPairAnalogy",
        title: "Analogy 3",
        data: { a: fig({ sides: 4, reflect: false, internalElements: [{ shape: "dot", position: "topLeft" }] }), b: fig({ sides: 4, reflect: true, internalElements: [{ shape: "dot", position: "topRight" }] }), c: fig({ sides: 6, reflect: false, internalElements: [{ shape: "dot", position: "topLeft" }] }) },
      },
      kind: "figure",
      options: place(
        fig({ sides: 6, reflect: true, internalElements: [{ shape: "dot", position: "topRight" }] }),
        [
          fig({ sides: 6, reflect: false, internalElements: [{ shape: "dot", position: "topRight" }] }),
          fig({ sides: 6, reflect: true, internalElements: [{ shape: "dot", position: "topLeft" }] }),
          fig({ sides: 5, reflect: true, internalElements: [{ shape: "dot", position: "topRight" }] }),
          fig({ sides: 6, reflect: true, internalElements: [{ shape: "dot", position: "bottomRight" }] }),
        ],
        0
      ),
    },
    {
      // Rule: arrow rotates +180 (points the opposite way).
      visual: { type: "nvrPairAnalogy", title: "Analogy 4", data: { a: fig({ sides: 0, arrows: [{ angle: 0 }] }), b: fig({ sides: 0, arrows: [{ angle: 180 }] }), c: fig({ sides: 0, arrows: [{ angle: 90 }] }) } },
      kind: "figure",
      options: place(
        fig({ sides: 0, arrows: [{ angle: 270 }] }),
        [fig({ sides: 0, arrows: [{ angle: 90 }] }), fig({ sides: 0, arrows: [{ angle: 0 }] }), fig({ sides: 0, arrows: [{ angle: 180 }, { angle: 0 }] }), fig({ sides: 3, arrows: [{ angle: 270 }] })],
        2
      ),
    },
  ];

  // Topic 3 — 3x3 matrix completion: rule by row and column simultaneously.
  const matrixQuestions: Answerable[] = [
    {
      visual: {
        type: "nvrMatrix",
        title: "Matrix 1",
        data: { cells: [fig({ sides: 3, fill: "solid" }), fig({ sides: 4, fill: "solid" }), fig({ sides: 5, fill: "solid" }), fig({ sides: 3, fill: "outline" }), fig({ sides: 4, fill: "outline" }), fig({ sides: 5, fill: "outline" }), fig({ sides: 3, fill: "dots" }), fig({ sides: 4, fill: "dots" }), null] },
      },
      kind: "figure",
      options: place(fig({ sides: 5, fill: "dots" }), [fig({ sides: 6, fill: "dots" }), fig({ sides: 5, fill: "solid" }), fig({ sides: 5, fill: "outline" }), fig({ sides: 4, fill: "dots" })], 2),
    },
    {
      visual: {
        type: "nvrMatrix",
        title: "Matrix 2",
        data: { cells: [fig({ sides: 4, rotation: 0 }), fig({ sides: 4, rotation: 30 }), fig({ sides: 4, rotation: 60 }), fig({ sides: 4, rotation: 15 }), fig({ sides: 4, rotation: 45 }), fig({ sides: 4, rotation: 75 }), fig({ sides: 4, rotation: 30 }), fig({ sides: 4, rotation: 60 }), null] },
      },
      kind: "figure",
      options: place(fig({ sides: 4, rotation: 90 }), [fig({ sides: 4, rotation: 60 }), fig({ sides: 3, rotation: 90 }), fig({ sides: 4, rotation: 45 }), fig({ sides: 4, rotation: 105 })], 4),
    },
    {
      visual: {
        type: "nvrMatrix",
        title: "Matrix 3",
        data: {
          cells: [
            [fig({ sides: 6, fill: "outline" }), fig({ sides: 0, size: 0.4, fill: "solid" })], fig({ sides: 6, fill: "outline" }), [fig({ sides: 6, fill: "outline" }), fig({ sides: 0, size: 0.4, fill: "solid" }), fig({ sides: 3, size: 0.22, fill: "solid" })],
            fig({ sides: 5, fill: "outline" }), [fig({ sides: 5, fill: "outline" }), fig({ sides: 0, size: 0.4, fill: "solid" })], fig({ sides: 5, fill: "outline" }),
            [fig({ sides: 4, fill: "outline" }), fig({ sides: 0, size: 0.4, fill: "solid" })], fig({ sides: 4, fill: "outline" }), null,
          ],
        },
      },
      kind: "figure",
      options: place(
        [fig({ sides: 4, fill: "outline" }), fig({ sides: 0, size: 0.4, fill: "solid" }), fig({ sides: 3, size: 0.22, fill: "solid" })],
        [fig({ sides: 4, fill: "outline" }), [fig({ sides: 4, fill: "outline" }), fig({ sides: 0, size: 0.4, fill: "solid" })], [fig({ sides: 3, fill: "outline" }), fig({ sides: 0, size: 0.4, fill: "solid" }), fig({ sides: 3, size: 0.22, fill: "solid" })], fig({ sides: 0, size: 0.4, fill: "solid" })],
        1
      ),
    },
    {
      visual: {
        type: "nvrMatrix",
        title: "Matrix 4",
        data: { cells: [fig({ sides: 3, fill: "hatch" }), fig({ sides: 3, fill: "crosshatch" }), fig({ sides: 3, fill: "stripes" }), fig({ sides: 4, fill: "hatch" }), fig({ sides: 4, fill: "crosshatch" }), fig({ sides: 4, fill: "stripes" }), fig({ sides: 5, fill: "hatch" }), fig({ sides: 5, fill: "crosshatch" }), null] },
      },
      kind: "figure",
      options: place(fig({ sides: 5, fill: "stripes" }), [fig({ sides: 5, fill: "hatch" }), fig({ sides: 6, fill: "stripes" }), fig({ sides: 5, fill: "dots" }), fig({ sides: 4, fill: "stripes" })], 3),
    },
  ];

  // Topic 4 — similarity pairing: two reference figures share one abstract property.
  const similarityQuestions: Answerable[] = [
    {
      visual: { type: "nvrSimilarity", title: "Similarity 1", data: { reference: [fig({ sides: 3, fill: "solid" }), fig({ sides: 6, fill: "solid" })], query: fig({ sides: 4, fill: "solid" }) } },
      kind: "figure",
      options: place(fig({ sides: 5, fill: "solid" }), [fig({ sides: 5, fill: "outline" }), fig({ sides: 5, fill: "dots" }), fig({ sides: 5, fill: "hatch" }), fig({ sides: 5, fill: "stripes" })], 1),
    },
    {
      visual: {
        type: "nvrSimilarity",
        title: "Similarity 2",
        data: { reference: [fig({ sides: 4, internalElements: [{ shape: "dot", position: "center" }] }), fig({ sides: 6, internalElements: [{ shape: "dot", position: "center" }] })], query: fig({ sides: 3, internalElements: [{ shape: "dot", position: "center" }] }) },
      },
      kind: "figure",
      options: place(
        fig({ sides: 5, internalElements: [{ shape: "dot", position: "center" }] }),
        [
          fig({ sides: 5, internalElements: [{ shape: "square", position: "center" }] }),
          fig({ sides: 5 }),
          fig({ sides: 5, internalElements: [{ shape: "dot", position: "topLeft" }] }),
          fig({ sides: 5, internalElements: [{ shape: "dot", position: "center" }, { shape: "dot", position: "topLeft" }] }),
        ],
        3
      ),
    },
    {
      visual: { type: "nvrSimilarity", title: "Similarity 3", data: { reference: [fig({ sides: 4, reflect: true }), fig({ sides: 3, reflect: true })], query: fig({ sides: 6, reflect: true }) } },
      kind: "figure",
      options: place(fig({ sides: 5, reflect: true }), [fig({ sides: 5, reflect: false }), fig({ sides: 5, rotation: 15, reflect: true }), fig({ sides: 5, size: 0.6, reflect: true }), fig({ sides: 5, borderStyle: "dashed", reflect: true })], 0),
    },
    {
      visual: { type: "nvrSimilarity", title: "Similarity 4", data: { reference: [fig({ sides: 0, arrows: [{ angle: 0 }, { angle: 180 }] }), fig({ sides: 4, arrows: [{ angle: 45 }, { angle: 225 }] })], query: fig({ sides: 3, arrows: [{ angle: 90 }, { angle: 270 }] }) } },
      kind: "figure",
      options: place(
        fig({ sides: 5, arrows: [{ angle: 30 }, { angle: 210 }] }),
        [fig({ sides: 5, arrows: [{ angle: 30 }] }), fig({ sides: 5 }), fig({ sides: 5, internalElements: [{ shape: "dot", position: "center" }] }), fig({ sides: 5, fill: "dots" })],
        2
      ),
    },
  ];

  // Topic 5 — odd one out: four share a rule, one breaks it. The odd figure's position in the
  // row varies question to question, and the rule itself is deliberately subtle (not a different
  // shape you can spot at a glance).
  const oddOneOutData: NvrFigure[][] = [
    // Rule: rotation is a multiple of 10° — the 15° figure is the only one that isn't.
    [fig({ sides: 5, rotation: 10 }), fig({ sides: 5, rotation: 15 }), fig({ sides: 5, rotation: 0 }), fig({ sides: 5, rotation: 30 }), fig({ sides: 5, rotation: 20 })],
    // Rule: outline fill with exactly one dot — the solid, centre-dot figure breaks the fill rule.
    [
      fig({ sides: 4, fill: "outline", internalElements: [{ shape: "dot", position: "topLeft" }] }),
      fig({ sides: 4, fill: "outline", internalElements: [{ shape: "dot", position: "topRight" }] }),
      fig({ sides: 4, fill: "solid", internalElements: [{ shape: "dot", position: "center" }] }),
      fig({ sides: 4, fill: "outline", internalElements: [{ shape: "dot", position: "bottomLeft" }] }),
      fig({ sides: 4, fill: "outline", internalElements: [{ shape: "dot", position: "bottomRight" }] }),
    ],
    // Rule: not reflected — the one reflected triangle is the odd one out (rotation varies freely).
    [fig({ sides: 3, reflect: true, rotation: 15 }), fig({ sides: 3, rotation: 0 }), fig({ sides: 3, rotation: 15 }), fig({ sides: 3, rotation: 30 }), fig({ sides: 3, rotation: 45 })],
    // Rule: hatch fill — the dot-filled hexagon is the odd one out (border/size/rotation vary freely).
    [fig({ sides: 6, fill: "hatch" }), fig({ sides: 6, fill: "hatch", borderStyle: "dashed" }), fig({ sides: 6, fill: "hatch", size: 0.7 }), fig({ sides: 6, fill: "hatch", rotation: 20 }), fig({ sides: 6, fill: "dots" })],
  ];

  // Topic 6 — code-figure pairing: attribute -> letter map, decode the test figure.
  const codeQuestions: Answerable[] = [
    {
      visual: {
        type: "nvrCodeKey",
        title: "Code 1",
        data: { examples: [{ figure: fig({ sides: 3, fill: "solid" }), code: "GX" }, { figure: fig({ sides: 4, fill: "solid" }), code: "GY" }, { figure: fig({ sides: 3, fill: "outline" }), code: "HX" }], test: fig({ sides: 4, fill: "outline" }) },
      },
      kind: "code",
      options: place("HY", ["GY", "HX", "GX", "HZ"], 1),
    },
    {
      visual: {
        type: "nvrCodeKey",
        title: "Code 2",
        data: { examples: [{ figure: fig({ sides: 5, rotation: 0 }), code: "QA" }, { figure: fig({ sides: 5, rotation: 30 }), code: "QB" }, { figure: fig({ sides: 6, rotation: 0 }), code: "RA" }], test: fig({ sides: 6, rotation: 30 }) },
      },
      kind: "code",
      options: place("RB", ["QB", "RA", "RC", "QA"], 3),
    },
    {
      visual: {
        type: "nvrCodeKey",
        title: "Code 3",
        data: { examples: [{ figure: fig({ sides: 4, fill: "dots" }), code: "MN" }, { figure: fig({ sides: 4, fill: "hatch" }), code: "MP" }, { figure: fig({ sides: 6, fill: "dots" }), code: "LN" }], test: fig({ sides: 6, fill: "hatch" }) },
      },
      kind: "code",
      options: place("LP", ["MP", "LN", "MN", "LQ"], 2),
    },
    {
      visual: {
        type: "nvrCodeKey",
        title: "Code 4",
        data: { examples: [{ figure: fig({ sides: 3, reflect: false }), code: "SX" }, { figure: fig({ sides: 3, reflect: true }), code: "SY" }, { figure: fig({ sides: 5, reflect: false }), code: "TX" }], test: fig({ sides: 5, reflect: true }) },
      },
      kind: "code",
      options: place("TY", ["SY", "TX", "TZ", "SX"], 4),
    },
  ];

  // Topic 7 — rotation: an asymmetric marker carries the turn. Deltas are deliberately not 90/180°
  // so the answer takes real calculation, not a snap mental rotation.
  const rotationQuestions: Answerable[] = [
    {
      // Rule: arrow rotates +115° clockwise.
      visual: { type: "nvrRotation", title: "Rotation 1", data: { before: fig({ sides: 0, arrows: [{ angle: 0 }] }), after: fig({ sides: 0, arrows: [{ angle: 115 }] }), test: fig({ sides: 0, arrows: [{ angle: 200 }] }) } },
      kind: "figure",
      options: place(
        fig({ sides: 0, arrows: [{ angle: 315 }] }),
        [
          fig({ sides: 0, arrows: [{ angle: 290 }] }), // used +90 instead of +115
          fig({ sides: 0, arrows: [{ angle: 200 }] }), // unchanged
          fig({ sides: 0, arrows: [{ angle: 85 }] }), // rotated the wrong direction
          fig({ sides: 3, arrows: [{ angle: 315 }] }), // wrong shape
        ],
        1
      ),
    },
    {
      // Rule: arrow rotates +140° clockwise.
      visual: { type: "nvrRotation", title: "Rotation 2", data: { before: fig({ sides: 6, arrows: [{ angle: 45 }] }), after: fig({ sides: 6, arrows: [{ angle: 185 }] }), test: fig({ sides: 6, arrows: [{ angle: 300 }] }) } },
      kind: "figure",
      options: place(
        fig({ sides: 6, arrows: [{ angle: 80 }] }),
        [
          fig({ sides: 6, arrows: [{ angle: 30 }] }), // used +90 instead of +140
          fig({ sides: 6, arrows: [{ angle: 300 }] }), // unchanged
          fig({ sides: 6, arrows: [{ angle: 160 }] }), // rotated the wrong direction
          fig({ sides: 5, arrows: [{ angle: 80 }] }), // wrong shape
        ],
        3
      ),
    },
    {
      // Rule: marked dot moves one corner clockwise (topLeft -> topRight -> bottomRight -> bottomLeft -> topLeft).
      visual: {
        type: "nvrRotation",
        title: "Rotation 3",
        data: { before: fig({ sides: 4, internalElements: [{ shape: "dot", position: "topLeft" }] }), after: fig({ sides: 4, internalElements: [{ shape: "dot", position: "topRight" }] }), test: fig({ sides: 4, internalElements: [{ shape: "dot", position: "bottomLeft" }] }) },
      },
      kind: "figure",
      options: place(
        fig({ sides: 4, internalElements: [{ shape: "dot", position: "topLeft" }] }),
        [
          fig({ sides: 4, internalElements: [{ shape: "dot", position: "bottomRight" }] }), // wrong direction (went back a step)
          fig({ sides: 4, internalElements: [{ shape: "dot", position: "topRight" }] }), // two steps ahead instead of one
          fig({ sides: 3, internalElements: [{ shape: "dot", position: "topLeft" }] }), // wrong shape
          fig({ sides: 4, internalElements: [{ shape: "square", position: "topLeft" }] }), // wrong marker type
        ],
        2
      ),
    },
  ];

  // Topic 8 — nets: front/top/right fold unrotated into the cube's front/top/right faces in a cross
  // layout. Decoys swap or subtly alter exactly one face; correct position varies per question.
  const netTopicQuestions: Answerable[] = [
    { net: { top: fig({ sides: 5, fill: "solid" as const }), front: fig({ sides: 0, fill: "solid" as const }), bottom: fig({ sides: 4, fill: "outline" as const }), left: fig({ sides: 3, fill: "dots" as const }), right: fig({ sides: 6, fill: "hatch" as const }), back: fig({ sides: 4, rotation: 45, fill: "stripes" as const }) }, index: 2 },
    { net: { top: fig({ sides: 3, fill: "outline" as const }), front: fig({ sides: 4, fill: "dots" as const }), bottom: fig({ sides: 6, fill: "solid" as const }), left: fig({ sides: 5, fill: "outline" as const }), right: fig({ sides: 0, fill: "crosshatch" as const }), back: fig({ sides: 3, rotation: 180, fill: "solid" as const }) }, index: 4 },
    { net: { top: fig({ sides: 4, fill: "halfSplit" as const }), front: fig({ sides: 5, rotation: 20, fill: "solid" as const }), bottom: fig({ sides: 3, fill: "dots" as const }), left: fig({ sides: 6, fill: "outline" as const }), right: fig({ sides: 4, rotation: 45, fill: "crosshatch" as const }), back: fig({ sides: 0, fill: "stripes" as const }) }, index: 1 },
  ].map(({ net, index }): Answerable => ({
    visual: { type: "nvrNet", title: "Net", data: { net } },
    kind: "cube",
    options: place(
      { top: net.top, front: net.front, right: net.right },
      [
        { top: net.top, front: net.front, right: net.back },
        { top: net.bottom, front: net.front, right: net.right },
        { top: net.top, front: net.left, right: net.right },
        { top: net.top, front: net.front, right: fig({ ...net.right, fill: "solid" as const }) },
      ],
      index
    ),
  }));

  // Topic 9 — combining 3D shapes: A and B shown separately; options reuse the exact attach-layout
  // math from the prompt so gap/overlap/shift decoys are physically consistent, not just relabelled.
  const combineQuestions: Answerable[] = [
    { a: { w: 70, h: 55, d: 38 }, b: { w: 70, h: 26, d: 38 }, index: 3 },
    { a: { w: 55, h: 70, d: 34 }, b: { w: 34, h: 70, d: 34 }, index: 0 },
    { a: { w: 60, h: 45, d: 45 }, b: { w: 60, h: 45, d: 45 }, index: 2 },
  ].map(({ a, b, index }): Answerable => ({
    visual: { type: "nvrCombine3d", title: "Combine", data: { a, b } },
    kind: "combine",
    options: place(
      { a, b, attach: "top" },
      [
        { a, b, attach: "topgap" },
        { a, b, attach: "right" },
        { a, b, attach: "shifted" },
        { a, b: { w: b.w * 0.7, h: b.h, d: b.d }, attach: "top" },
      ],
      index
    ),
  }));

  // Topic 10 — hole punch: the correct pattern is computed by mirroring the punch point across each
  // fold line (unfoldPoints), never hand-guessed, so it can't be wrong.
  const holePunchQuestions: Answerable[] = [
    { folds: ["vertical"], punch: { x: 0.25, y: 0.3 }, decoys: [[{ x: 0.25, y: 0.3 }], [{ x: 0.25, y: 0.3 }, { x: 0.25, y: 0.7 }], [{ x: 0.25, y: 0.3 }, { x: 0.8, y: 0.3 }], [{ x: 0.25, y: 0.3 }, { x: 0.75, y: 0.3 }, { x: 0.5, y: 0.5 }]], index: 2 },
    { folds: ["vertical", "horizontal"], punch: { x: 0.2, y: 0.25 }, decoys: [[{ x: 0.2, y: 0.25 }, { x: 0.8, y: 0.25 }], [{ x: 0.2, y: 0.25 }, { x: 0.2, y: 0.75 }], [{ x: 0.2, y: 0.25 }, { x: 0.8, y: 0.75 }], [{ x: 0.2, y: 0.25 }]], index: 3 },
    { folds: ["horizontal"], punch: { x: 0.7, y: 0.2 }, decoys: [[{ x: 0.7, y: 0.2 }], [{ x: 0.3, y: 0.2 }, { x: 0.3, y: 0.8 }], [{ x: 0.7, y: 0.2 }, { x: 0.3, y: 0.2 }], [{ x: 0.7, y: 0.2 }, { x: 0.7, y: 0.7 }]], index: 1 },
  ].map(({ folds, punch, decoys, index }): Answerable => ({
    visual: { type: "nvrHolePunch", title: "Hole punch", data: { folds, punch } },
    kind: "dots",
    options: place(unfoldPoints(punch, folds), decoys, index),
  }));

  const topics: Topic[] = [
    {
      id: "sequence",
      label: "Complete the sequence",
      icon: "sequence",
      instruction: "Each row of figures follows one rule. Work out the rule, then choose the figure that continues the sequence from the options below.",
      example: <VisualRenderer visual={{ type: "nvrSequence", title: "Worked example", data: { figures: [fig({ sides: 3, rotation: 0 }), fig({ sides: 3, rotation: 20 }), fig({ sides: 3, rotation: 40 }), null] } }} />,
      solution: "The triangle rotates 20° further at each step, so the missing figure is a triangle rotated 60°.",
      questions: sequenceQuestions,
    },
    {
      id: "analogy",
      label: "Figure analogies",
      icon: "analogy",
      instruction: "The first figure changes into the second figure in a particular way. Apply the same change to the third figure and choose the result.",
      example: <VisualRenderer visual={{ type: "nvrPairAnalogy", title: "Worked example", data: { a: fig({ sides: 4, fill: "solid" }), b: fig({ sides: 4, fill: "outline" }), c: fig({ sides: 6, fill: "solid" }) } }} />,
      solution: "The square's fill changes from solid to outline, so the hexagon should also change from solid to outline.",
      questions: analogyQuestions,
    },
    {
      id: "matrix",
      label: "Complete the grid",
      icon: "matrix",
      instruction: "The 9 figures follow a rule across each row and down each column. Work out what is missing from the bottom-right cell.",
      example: <VisualRenderer visual={{ type: "nvrMatrix", title: "Worked example", data: { cells: [fig({ sides: 3 }), fig({ sides: 4 }), fig({ sides: 5 }), fig({ sides: 3, fill: "outline" }), fig({ sides: 4, fill: "outline" }), fig({ sides: 5, fill: "outline" }), fig({ sides: 3, fill: "dots" }), fig({ sides: 4, fill: "dots" }), null] } }} />,
      solution: "Each row keeps the same fill and increases sides left to right; each column keeps the same sides and changes fill top to bottom — so the missing figure is a dotted pentagon.",
      questions: matrixQuestions,
    },
    {
      id: "similarity",
      label: "Most like",
      icon: "similarity",
      instruction: "The two reference figures share one property. Decide what that property is, then choose which answer option shares the query figure's version of it.",
      example: <VisualRenderer visual={{ type: "nvrSimilarity", title: "Worked example", data: { reference: [fig({ sides: 3, fill: "solid" }), fig({ sides: 6, fill: "solid" })], query: fig({ sides: 4, fill: "solid" }) } }} />,
      solution: "Both reference figures are solid-filled regardless of their number of sides, so the answer must also be solid-filled.",
      questions: similarityQuestions,
    },
    {
      id: "oddoneout",
      label: "Odd one out",
      icon: "oddoneout",
      instruction: "Four of these five figures share a rule. Find the one that does not belong — the rule is often subtle, so check every property, not just the obvious shape.",
      example: <VisualRenderer visual={{ type: "nvrOddOneOut", title: "Worked example", data: { figures: [fig({ sides: 4 }), fig({ sides: 4 }), fig({ sides: 4 }), fig({ sides: 3 }), fig({ sides: 4 }) ] } }} />,
      solution: "D is the only figure with 3 sides — the rest all have 4.",
      // The row of 5 figures shown in the diagram doubles as the answer options — clicking option
      // N below is marking figure N (A-E) as the odd one out, exactly how GL presents this archetype.
      questions: oddOneOutData.map((figures): Answerable => ({ visual: { type: "nvrOddOneOut", title: "Odd one out", data: { figures } }, kind: "figure", options: figures })),
    },
    {
      id: "codekey",
      label: "Crack the code",
      icon: "codekey",
      instruction: "Each figure's shape and fill map to a two-letter code. Study the worked examples, then choose the code for the test figure.",
      example: (
        <VisualRenderer
          visual={{ type: "nvrCodeKey", title: "Worked example", data: { examples: [{ figure: fig({ sides: 3, fill: "solid" }), code: "GX" }, { figure: fig({ sides: 4, fill: "solid" }), code: "GY" }, { figure: fig({ sides: 3, fill: "outline" }), code: "HX" }], test: fig({ sides: 4, fill: "outline" }) } }}
        />
      ),
      solution: "G = solid fill, H = outline fill; X = triangle, Y = square — so an outline square is HY.",
      questions: codeQuestions,
    },
    {
      id: "rotation",
      label: "Rotation",
      icon: "rotation",
      instruction: "The first figure is rotated to make the second. An arrow or dot marks the turn so the rotation is never ambiguous. Work out the exact angle and apply it to the test figure.",
      example: <VisualRenderer visual={{ type: "nvrRotation", title: "Worked example", data: { before: fig({ sides: 4, arrows: [{ angle: 0 }] }), after: fig({ sides: 4, arrows: [{ angle: 90 }] }), test: fig({ sides: 4, arrows: [{ angle: 180 }] }) } }} />,
      solution: "The arrow turns 90° clockwise each time, so the test figure's arrow should point at 270°.",
      questions: rotationQuestions,
    },
    {
      id: "net",
      label: "Nets and cubes",
      icon: "net",
      instruction: "This is the unfolded net of a cube — every face has a different symbol. Choose the cube it folds into. Watch for options with one face symbol swapped or subtly changed.",
      example: (
        <VisualRenderer
          visual={{ type: "nvrNet", title: "Worked example", data: { net: { top: fig({ sides: 3, fill: "solid" }), front: fig({ sides: 4, fill: "outline" }), bottom: fig({ sides: 5, fill: "solid" }), left: fig({ sides: 6, fill: "dots" }), right: fig({ sides: 0, fill: "solid" }), back: fig({ sides: 3, rotation: 90, fill: "hatch" }) } } }}
        />
      ),
      solution: "In this cross layout, the front, top and right squares fold directly into the cube's front, top and right faces without rotating.",
      questions: netTopicQuestions,
    },
    {
      id: "combine3d",
      label: "Combining 3D shapes",
      icon: "combine3d",
      instruction: "Shape A and shape B are shown separately. Choose the answer option where they are joined face-to-face with no gap and no overlap.",
      questions: combineQuestions,
    },
    {
      id: "holepunch",
      label: "Hole punch",
      icon: "holepunch",
      instruction: "A square of paper is folded along the dashed fold line(s) and a single hole is punched through the folded stack. The faint grid marks the quarter-points so you can judge distance from the edges. Choose the pattern of holes when the paper is fully unfolded.",
      example: <VisualRenderer visual={{ type: "nvrHolePunch", title: "Worked example", data: { folds: ["vertical"], punch: { x: 0.3, y: 0.5 } } }} />,
      solution: "One vertical fold means the hole is mirrored once across the fold line, giving two holes the same distance from the centre.",
      questions: holePunchQuestions,
    },
  ];

  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const activeTopic = topics.find((t) => t.id === activeTopicId) ?? topics[0];
  const question = activeTopic.questions[Math.min(activeQuestion, activeTopic.questions.length - 1)];
  const answerKey = `${activeTopic.id}:${activeQuestion}`;
  const selected = answers[answerKey] ?? null;

  const topicSummaries: TopicSummary[] = topics.map((t) => ({
    id: t.id,
    label: t.label,
    icon: t.icon,
    total: t.questions.length,
    answered: t.questions.filter((_, i) => answers[`${t.id}:${i}`] !== undefined).length,
  }));

  const answeredInTopic = activeTopic.questions.map((_, i) => answers[`${activeTopic.id}:${i}`] !== undefined);

  function selectTopic(id: string) {
    setActiveTopicId(id);
    setActiveQuestion(0);
  }

  function selectAnswer(index: number) {
    setAnswers((prev) => ({ ...prev, [answerKey]: index }));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <BookletHeader subject="Non-Verbal Reasoning" bookletLabel="Summit Tuition &middot; Dev preview &middot; original content, GL-style format" />
      <TopicNav topics={topicSummaries} activeId={activeTopic.id} onSelect={selectTopic} />
      <TopicHelp topic={activeTopic} />
      <ExamLayout
        questionNumber={activeQuestion + 1}
        diagram={<VisualRenderer visual={question.visual} />}
        options={<AnswerOptions q={question} selected={selected} onSelect={selectAnswer} />}
        pager={
          <QuestionPager
            current={activeQuestion}
            total={activeTopic.questions.length}
            answered={answeredInTopic}
            onPrev={() => setActiveQuestion((i) => Math.max(0, i - 1))}
            onNext={() => setActiveQuestion((i) => Math.min(activeTopic.questions.length - 1, i + 1))}
            onJump={setActiveQuestion}
          />
        }
      />
    </main>
  );
}
