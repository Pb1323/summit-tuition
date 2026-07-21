"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, Sparkles, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MathVisualKind = "bar-chart" | "pie-chart" | "line-graph" | "geometry-exterior-angle" | "geometry-pentagon";

interface MathQuestion {
  kind: "maths";
  visual: MathVisualKind;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface GrammarQuestion {
  kind: "grammar";
  prompt: string;
  segments: string[];
  /** index into segments that contains the mistake, or null if the sentence is correct */
  mistakeIndex: number | null;
  explanation: string;
}

type SampleQuestion = MathQuestion | GrammarQuestion;

/** All original content written for this teaser — no third-party paper content reused. */
const MATH_QUESTIONS: MathQuestion[] = [
  {
    kind: "maths",
    visual: "geometry-exterior-angle",
    prompt:
      "In this triangle, the exterior angle at the marked vertex is 136°, and one of the two remote interior angles is 58°. Using the exterior angle theorem (an exterior angle equals the sum of the two remote interior angles), what is the third interior angle?",
    options: ["78°", "68°", "86°", "72°"],
    correctAnswer: "78°",
    explanation:
      "The exterior angle theorem gives 58° + the missing angle = 136°, so the missing angle is 136 − 58 = 78°.",
  },
  {
    kind: "maths",
    visual: "bar-chart",
    prompt:
      "The bar chart shows the number of books read last month by four classes. How many more books did Class D read than double what Class A read?",
    options: ["13", "27", "9", "19"],
    correctAnswer: "13",
    explanation:
      "Double Class A's total is 14 x 2 = 28. Class D read 41 books. 41 − 28 = 13.",
  },
  {
    kind: "maths",
    visual: "pie-chart",
    prompt:
      "300 people were surveyed on their favourite sport, shown in the pie chart. What is the ratio of Football fans to Athletics fans, in simplest form?",
    options: ["7:3", "5:3", "3:7", "2:1"],
    correctAnswer: "7:3",
    explanation:
      "Football = 35% of 300 = 105. Athletics = 15% of 300 = 45. 105:45 simplifies (÷15) to 7:3.",
  },
  {
    kind: "maths",
    visual: "line-graph",
    prompt:
      "The graph shows a cyclist's journey: riding, then a rest stop, then riding again. What was the cyclist's AVERAGE speed for the whole 2.5-hour journey, including the rest stop?",
    options: ["14 km/h", "15 km/h", "20 km/h", "17.5 km/h"],
    correctAnswer: "14 km/h",
    explanation:
      "Total distance = 35 km over a total time of 2.5 hours (including the rest). Average speed = 35 ÷ 2.5 = 14 km/h.",
  },
  {
    kind: "maths",
    visual: "geometry-pentagon",
    prompt:
      "The diagram shows a pentagon with four of its interior angles given: 100°, 110°, 95° and 100°. The interior angles of a pentagon always sum to 540°. What is the size of the fifth angle?",
    options: ["135°", "145°", "125°", "130°"],
    correctAnswer: "135°",
    explanation:
      "100 + 110 + 95 + 100 = 405. The fifth angle is 540 − 405 = 135°.",
  },
];

const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    kind: "grammar",
    prompt: "Which part of this sentence contains a grammar mistake?",
    segments: ["The dog", "were barking loudly", "at the mailman", "all afternoon."],
    mistakeIndex: 1,
    explanation: "\"were\" should be \"was\" — \"dog\" is singular, so the verb must agree: \"was barking loudly.\"",
  },
  {
    kind: "grammar",
    prompt: "Which part of this sentence contains a grammar mistake?",
    segments: ["Me and my sister", "went to the park", "on Saturday morning", "to fly kites."],
    mistakeIndex: 0,
    explanation: "\"Me and my sister\" should be \"My sister and I\" — use the subject pronoun \"I\" when it's doing the action.",
  },
  {
    kind: "grammar",
    prompt: "Which part of this sentence contains a grammar mistake?",
    segments: ["The team of scientists", "was excited", "to present there findings", "at the conference."],
    mistakeIndex: 2,
    explanation: "\"there\" should be \"their\" — \"their\" shows possession (the findings belong to the scientists).",
  },
  {
    kind: "grammar",
    prompt: "Which part of this sentence contains a grammar mistake?",
    segments: ["Its going to rain", "so bring your coat", "when you leave", "this afternoon."],
    mistakeIndex: 0,
    explanation: "\"Its\" should be \"It's\" (a contraction of \"it is\") — \"Its\" without an apostrophe means possession, not \"it is.\"",
  },
  {
    kind: "grammar",
    prompt: "Which part of this sentence contains a grammar mistake?",
    segments: ["The choir sang", "beautifully", "during the concert", "last night."],
    mistakeIndex: null,
    explanation: "No mistake — every part of this sentence is grammatically correct.",
  },
];

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  MATH_QUESTIONS[0],
  GRAMMAR_QUESTIONS[0],
  MATH_QUESTIONS[1],
  GRAMMAR_QUESTIONS[1],
  MATH_QUESTIONS[2],
  GRAMMAR_QUESTIONS[2],
  MATH_QUESTIONS[3],
  GRAMMAR_QUESTIONS[3],
  MATH_QUESTIONS[4],
  GRAMMAR_QUESTIONS[4],
];

const NO_MISTAKE = "No mistake — the sentence is correct";
const SEGMENT_LETTERS = ["A", "B", "C", "D"];

const PIE_SECTORS = [
  { label: "Football", pct: 35, color: "#0b2545" },
  { label: "Swimming", pct: 25, color: "#c9932c" },
  { label: "Tennis", pct: 20, color: "#b4530b" },
  { label: "Athletics", pct: 15, color: "#7c9a92" },
  { label: "Netball", pct: 5, color: "#8a5a8f" },
];

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

function MathVisual({ kind }: { kind: MathVisualKind }) {
  const reduceMotion = useReducedMotion();
  const draw = reduceMotion
    ? {}
    : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } };

  if (kind === "bar-chart") {
    const bars = [
      { label: "A", value: 14 },
      { label: "B", value: 33 },
      { label: "C", value: 19 },
      { label: "D", value: 41 },
    ];
    const max = 45;
    const barWidth = 44;
    const gap = 20;
    const chartHeight = 92;
    return (
      <svg viewBox="0 0 260 130" className="h-32 w-full">
        <line x1="8" y1={chartHeight + 10} x2="252" y2={chartHeight + 10} stroke="#0b2545" strokeWidth="2" />
        {bars.map((bar, i) => {
          const height = (bar.value / max) * chartHeight;
          const x = 20 + i * (barWidth + gap);
          const y = chartHeight + 10 - height;
          return (
            <g key={bar.label}>
              <motion.rect
                x={x}
                width={barWidth}
                rx="4"
                fill={i === 3 ? "#c9932c" : "#0b2545"}
                initial={reduceMotion ? undefined : { height: 0, y: chartHeight + 10 }}
                animate={reduceMotion ? undefined : { height, y }}
                {...(reduceMotion ? { height, y } : {})}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0b2545">
                {bar.value}
              </text>
              <text x={x + barWidth / 2} y={chartHeight + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill="#5c5c5c">
                Class {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (kind === "pie-chart") {
    const arcs = PIE_SECTORS.reduce<{ label: string; color: string; startAngle: number; endAngle: number }[]>((acc, sector) => {
      const prevEnd = acc.length ? acc[acc.length - 1].endAngle : 0;
      acc.push({ ...sector, startAngle: prevEnd, endAngle: prevEnd + sector.pct * 3.6 });
      return acc;
    }, []);
    return (
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0">
          {arcs.map(({ label, color, startAngle, endAngle }, i) => {
            return (
              <motion.path
                key={label}
                d={pieSlicePath(50, 50, 46, startAngle, endAngle)}
                fill={color}
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
          {PIE_SECTORS.map((sector) => (
            <li key={sector.label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sector.color }} />
              {sector.label} — {sector.pct}%
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (kind === "line-graph") {
    const points = [
      { x: 8, y: 92 },
      { x: 96, y: 53.4 },
      { x: 140, y: 53.4 },
      { x: 228, y: 2 },
    ];
    const path = `M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`;
    return (
      <svg viewBox="0 0 240 105" className="h-28 w-full">
        <line x1="8" y1="2" x2="8" y2="92" stroke="#0b2545" strokeWidth="1.5" />
        <line x1="8" y1="92" x2="232" y2="92" stroke="#0b2545" strokeWidth="1.5" />
        <text x="4" y="8" fontSize="8" fill="#5c5c5c">35km</text>
        <text x="230" y="102" fontSize="8" fill="#5c5c5c" textAnchor="end">2.5h</text>
        <motion.path d={path} fill="none" stroke="#c9932c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...draw} />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#0b2545" />
        ))}
        <text x="52" y="66" fontSize="9" fontWeight="700" fill="#0b2545">
          ride 1
        </text>
        <text x="112" y="70" fontSize="9" fontWeight="700" fill="#5c5c5c">
          rest
        </text>
        <text x="168" y="22" fontSize="9" fontWeight="700" fill="#b4530b">
          ride 2
        </text>
      </svg>
    );
  }

  if (kind === "geometry-exterior-angle") {
    return (
      <svg viewBox="0 0 220 120" className="mx-auto h-28 w-52">
        <motion.polygon points="30,100 100,25 170,100" fill="#f2c14e11" stroke="#0b2545" strokeWidth="3" {...draw} />
        <line x1="170" y1="100" x2="210" y2="100" stroke="#0b2545" strokeWidth="3" strokeDasharray="4 3" />
        <text x="40" y="92" fontSize="12" fontWeight="700" fill="#b4530b">58°</text>
        <text x="92" y="45" fontSize="13" fontWeight="800" fill="#c9932c">?</text>
        <text x="176" y="90" fontSize="12" fontWeight="700" fill="#b4530b">136°</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 130" className="mx-auto h-32 w-48">
      <motion.polygon
        points="100,10 180,55 150,120 50,120 20,55"
        fill="#f2c14e11"
        stroke="#0b2545"
        strokeWidth="3"
        {...draw}
      />
      <text x="100" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b4530b">100°</text>
      <text x="158" y="60" fontSize="11" fontWeight="700" fill="#b4530b">110°</text>
      <text x="138" y="108" fontSize="11" fontWeight="700" fill="#b4530b">95°</text>
      <text x="56" y="108" fontSize="11" fontWeight="700" fill="#b4530b">100°</text>
      <text x="28" y="60" fontSize="13" fontWeight="800" fill="#c9932c">?</text>
    </svg>
  );
}

export function FreeSampleMock() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = SAMPLE_QUESTIONS.length;
  const question = SAMPLE_QUESTIONS[index];

  const grammarOptions = useMemo(() => {
    if (question.kind !== "grammar") return [];
    return [...question.segments.map((_, i) => SEGMENT_LETTERS[i]), NO_MISTAKE];
  }, [question]);

  const correctAnswer =
    question.kind === "maths"
      ? question.correctAnswer
      : question.mistakeIndex === null
        ? NO_MISTAKE
        : SEGMENT_LETTERS[question.mistakeIndex];

  const isCorrect = selected === correctAnswer;

  function handleSelect(option: string) {
    if (selected !== null) return;
    setSelected(option);
    if (option === correctAnswer) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (index === total - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (finished) {
    return (
      <div className="relative rounded-2xl border border-gold/25 bg-white/95 p-6 text-center shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)] sm:p-7">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
          <Lock className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy">
          {correctCount}/{total} correct
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          That&apos;s your 10 free sample questions. Register free for a full mock in every subject,
          or go Pro for the complete mock library and Study Notes.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Button href="/account" size="md">
            Register Free
          </Button>
          <Button href="/pricing#platform" variant="outline" size="md">
            See Pro &amp; Max
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-gold/25 bg-white/95 p-5 shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)] sm:p-6">
      <div className="flex items-center justify-between">
        <Badge variant="navy">Question {index + 1} of {total}</Badge>
        <span className="text-xs font-semibold text-muted">{question.kind === "maths" ? "Maths" : "English — Grammar"}</span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream">
        <div
          className="h-full rounded-full bg-gold transition-all duration-300"
          style={{ width: `${((index + (selected !== null ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {question.kind === "maths" && (
        <div className="mt-4">
          <MathVisual key={index} kind={question.visual} />
        </div>
      )}

      <p className={cn("text-base leading-relaxed text-navy", question.kind === "maths" ? "mt-3" : "mt-4")}>
        {question.prompt}
      </p>

      {question.kind === "grammar" && (
        <p className="mt-3 rounded-xl bg-cream/60 p-3.5 text-sm leading-relaxed text-navy/80">
          {question.segments.map((segment, i) => (
            <span key={i}>
              <span className="mr-1 rounded bg-navy/10 px-1.5 py-0.5 text-[10px] font-bold text-navy align-middle">
                {SEGMENT_LETTERS[i]}
              </span>
              <span className="italic">{segment}</span>{" "}
            </span>
          ))}
        </p>
      )}

      <div className={cn("mt-5 grid gap-3", question.kind === "maths" ? "grid-cols-2" : "grid-cols-1")}>
        {(question.kind === "maths" ? question.options : grammarOptions).map((option) => {
          const isChosen = selected === option;
          const showState = selected !== null;
          const isRight = option === correctAnswer;
          return (
            <motion.button
              key={option}
              type="button"
              disabled={selected !== null}
              onClick={() => handleSelect(option)}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors",
                !showState && "border-line bg-cream/50 text-navy hover:border-gold hover:bg-gold/10",
                showState && isRight && "border-emerald-300 bg-emerald-50 text-emerald-700",
                showState && isChosen && !isRight && "border-rose-300 bg-rose-50 text-rose-700",
                showState && !isChosen && !isRight && "border-line bg-cream/30 text-muted opacity-60"
              )}
            >
              {question.kind === "grammar" && option !== NO_MISTAKE ? `Segment ${option}` : option}
              {showState && isRight && <CheckCircle2 className="h-4 w-4 shrink-0" />}
              {showState && isChosen && !isRight && <XCircle className="h-4 w-4 shrink-0" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-4 flex items-start gap-2 rounded-xl border p-3.5 text-sm leading-relaxed",
              isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-navy/10 bg-cream p-3.5 text-navy"
            )}
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            <span>
              {isCorrect ? "Correct — " : "Not quite — "}
              {question.explanation}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {selected && (
        <Button onClick={handleNext} size="md" className="mt-4 w-full">
          {index === total - 1 ? "See my result" : "Next question"}
        </Button>
      )}
    </div>
  );
}
