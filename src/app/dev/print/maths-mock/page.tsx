"use client";

import type { ReactNode } from "react";

/**
 * Reusable print template: Summit Tuition Maths practice paper, GL-format-accurate
 * (page size/margins/fonts measured from real GL papers - see research/gl-layout-spec.md)
 * but entirely original content and Summit's own branding, per PROJECT_CONTEXT.md.
 * Renders via .gl-print / .gl-print-page classes (globals.css) - open this route and
 * print/"Save as PDF" to export, or drive it headlessly with Playwright's page.pdf().
 * To reuse: copy this file, swap MATHS_QUESTIONS for a new question array.
 *
 * Diagrams are drawn plainly here (bare black/white), not via the app's VisualRenderer -
 * that component wraps every diagram in a gold-card "frame()" meant for the on-screen
 * product UI, which doesn't match GL's plain exam-paper look. Print output prioritises
 * matching the real paper over reusing the styled component.
 */

interface McqQuestion {
  number: number;
  prompt: string;
  diagram?: ReactNode;
  options: string[];
}

function PlainTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table className="my-2 border-collapse text-[13px]">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="border border-black px-4 py-1 text-left font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="border border-black px-4 py-1">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PlainCoordinateGrid({ points, labels }: { points: [number, number][]; labels: string[] }) {
  const max = 6;
  const cell = 26;
  const origin = 20;
  const size = origin + max * cell + 10;
  const toX = (v: number) => origin + v * cell;
  const toY = (v: number) => size - 10 - v * cell;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="my-2 h-40 w-40">
      {Array.from({ length: max + 1 }, (_, i) => (
        <g key={i}>
          <line x1={toX(i)} y1={toY(0)} x2={toX(i)} y2={toY(max)} stroke="#ccc" strokeWidth={0.5} />
          <line x1={toX(0)} y1={toY(i)} x2={toX(max)} y2={toY(i)} stroke="#ccc" strokeWidth={0.5} />
        </g>
      ))}
      <line x1={toX(0)} y1={toY(0)} x2={toX(max)} y2={toY(0)} stroke="black" strokeWidth={1.2} />
      <line x1={toX(0)} y1={toY(0)} x2={toX(0)} y2={toY(max)} stroke="black" strokeWidth={1.2} />
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={toX(x)} cy={toY(y)} r={2.5} fill="black" />
          <text x={toX(x) + 4} y={toY(y) - 4} fontSize={8}>
            {labels[i]}
          </text>
        </g>
      ))}
      {Array.from({ length: max + 1 }, (_, i) => (
        <text key={`x${i}`} x={toX(i)} y={toY(0) + 12} fontSize={7} textAnchor="middle">
          {i}
        </text>
      ))}
      {Array.from({ length: max + 1 }, (_, i) => (
        <text key={`y${i}`} x={toX(0) - 8} y={toY(i) + 3} fontSize={7} textAnchor="middle">
          {i}
        </text>
      ))}
    </svg>
  );
}

const MATHS_QUESTIONS: McqQuestion[] = [
  { number: 1, prompt: "What is four thousand, two hundred and six in figures?", options: ["A 4260", "B 4026", "C 4206", "D 42006", "E 4260"] },
  { number: 2, prompt: "What is the value of the 5 in this number?\n35,847", options: ["A 5 thousands", "B 5 hundreds", "C 5 tens", "D 5 ones", "E 5 thousandths"] },
  {
    number: 3,
    prompt: "Look at this table showing books read by each class.",
    diagram: <PlainTable headers={["Class", "Books read"]} rows={[["4A", "18"], ["4B", "23"], ["4C", "15"]]} />,
    options: ["A 5 more", "B 8 more", "C 3 more", "D 41 more", "E 33 more"],
  },
  { number: 4, prompt: "What is the missing number in this sequence?\n4, 9, 16, 25, ?", options: ["A 30", "B 32", "C 34", "D 36", "E 38"] },
  {
    number: 5,
    prompt: "The treehouse is at (2, 5). The well is at ( , ). What are the well's coordinates?",
    diagram: <PlainCoordinateGrid points={[[2, 5], [5, 1]]} labels={["Treehouse", "Well"]} />,
    options: ["A (1, 5)", "B (5, 1)", "C (2, 1)", "D (1, 2)", "E (5, 5)"],
  },
  { number: 6, prompt: "A ribbon is 2.4 metres long. It is cut into 4 equal pieces. How long is each piece?", options: ["A 0.6 m", "B 0.4 m", "C 6 m", "D 0.8 m", "E 1.2 m"] },
  { number: 7, prompt: "Which of these fractions is closest in value to one half?", options: ["A 3/8", "B 5/9", "C 2/7", "D 4/5", "E 1/6"] },
  { number: 8, prompt: "A shop opens at 09:15 and closes 7 hours 45 minutes later. What time does it close?", options: ["A 16:00", "B 17:00", "C 16:45", "D 17:15", "E 16:15"] },
];

function InstructionsPage() {
  return (
    <section className="gl-print-page">
      <div className="mb-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em]">Summit Tuition &middot; Sample Paper</p>
        <h1 className="mt-2 text-2xl font-bold">Maths Practice Paper</h1>
      </div>
      <p className="mb-4 font-semibold">Before you begin:</p>
      <ol className="list-decimal space-y-3 pl-6 text-[13px] leading-relaxed">
        <li>This is a multiple-choice paper. For each question, circle the letter next to the answer you think is correct.</li>
        <li>Choose only one answer per question. If you change your mind, cross out your first answer clearly and circle your new choice instead.</li>
        <li>Work through the paper in order. If a question feels difficult, leave it and come back to it once you have answered the others.</li>
        <li>You have 30 minutes to complete this paper. There is no penalty for guessing, so attempt every question.</li>
      </ol>
      <p className="mt-10 text-[11px] text-gray-500">
        Original content, Summit Tuition. Format modelled on official GL Assessment practice papers for
        familiarity — see research/gl-layout-spec.md for the measured basis of this layout.
      </p>
    </section>
  );
}

function QuestionsPage({ questions, pageLabel }: { questions: McqQuestion[]; pageLabel: string }) {
  return (
    <section className="gl-print-page">
      {questions.map((q) => (
        <div key={q.number} className="mb-7 break-inside-avoid">
          <p className="mb-2 whitespace-pre-line text-[13px] font-semibold">
            {q.number}&ensp;{q.prompt}
          </p>
          {q.diagram && <div className="mb-2">{q.diagram}</div>}
          <p className="text-[13px]">
            {q.options.map((opt, i) => (
              <span key={i} className="mr-6">
                {opt}
              </span>
            ))}
          </p>
        </div>
      ))}
      <p className="mt-auto text-center text-[11px] text-gray-500">{pageLabel}</p>
    </section>
  );
}

export default function MathsMockPrintPage() {
  return (
    <div className="gl-print">
      <InstructionsPage />
      <QuestionsPage questions={MATHS_QUESTIONS.slice(0, 4)} pageLabel="Page 2 — please continue" />
      <QuestionsPage questions={MATHS_QUESTIONS.slice(4)} pageLabel="Page 3 — end of sample" />
    </div>
  );
}
