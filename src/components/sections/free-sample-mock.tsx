"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, Sparkles, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MathVisualKind = "order-of-operations" | "fraction" | "ratio" | "perimeter" | "percentage";

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
    visual: "order-of-operations",
    prompt: "Calculate 24 + 5 x 6 - 10.",
    options: ["44", "39", "84", "50"],
    correctAnswer: "44",
    explanation: "Multiply first: 5 x 6 = 30. Then 24 + 30 - 10 = 44.",
  },
  {
    kind: "maths",
    visual: "fraction",
    prompt: "What is 2/5 of 60?",
    options: ["24", "20", "30", "12"],
    correctAnswer: "24",
    explanation: "60 divided by 5 = 12, then 12 x 2 = 24.",
  },
  {
    kind: "maths",
    visual: "ratio",
    prompt: "Share £40 between two friends in the ratio 3:5. How much does the friend with the larger share receive?",
    options: ["£25", "£15", "£20", "£30"],
    correctAnswer: "£25",
    explanation: "3 + 5 = 8 parts. £40 divided by 8 = £5 per part. The larger share is 5 parts, so 5 x £5 = £25.",
  },
  {
    kind: "maths",
    visual: "perimeter",
    prompt: "A square has a perimeter of 32 cm. What is the length of one side?",
    options: ["8 cm", "16 cm", "4 cm", "6 cm"],
    correctAnswer: "8 cm",
    explanation: "A square has 4 equal sides, so 32 divided by 4 = 8 cm.",
  },
  {
    kind: "maths",
    visual: "percentage",
    prompt: "A jacket costs £80 and is reduced by 25% in a sale. What is the sale price?",
    options: ["£60", "£55", "£20", "£65"],
    correctAnswer: "£60",
    explanation: "25% of £80 is £20. £80 - £20 = £60.",
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

function MathVisual({ kind }: { kind: MathVisualKind }) {
  const reduceMotion = useReducedMotion();
  const draw = reduceMotion
    ? {}
    : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } };
  const grow = (target: string | number) =>
    reduceMotion
      ? { style: { width: target } }
      : { initial: { width: 0 }, animate: { width: target }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } };

  if (kind === "order-of-operations") {
    return (
      <svg viewBox="0 0 260 90" className="h-24 w-full">
        <motion.text x="10" y="50" fontSize="26" fontWeight="700" fill="#0b2545" {...draw}>
          24 +
        </motion.text>
        <motion.rect x="70" y="20" width="70" height="40" rx="10" fill="#f2c14e22" stroke="#c9932c" strokeWidth="2" {...draw} />
        <motion.text x="80" y="50" fontSize="24" fontWeight="700" fill="#b4530b" {...draw}>
          5 x 6
        </motion.text>
        <motion.text x="150" y="50" fontSize="26" fontWeight="700" fill="#0b2545" {...draw}>
          - 10
        </motion.text>
      </svg>
    );
  }

  if (kind === "fraction") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#e6e1d6" strokeWidth="12" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#c9932c"
          strokeWidth="12"
          strokeDasharray={`${2 * Math.PI * 42}`}
          strokeDashoffset={reduceMotion ? 2 * Math.PI * 42 * 0.6 : undefined}
          initial={reduceMotion ? undefined : { strokeDashoffset: 2 * Math.PI * 42 }}
          animate={reduceMotion ? undefined : { strokeDashoffset: 2 * Math.PI * 42 * 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
        <text x="50" y="56" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0b2545">
          2/5
        </text>
      </svg>
    );
  }

  if (kind === "ratio") {
    return (
      <svg viewBox="0 0 260 50" className="h-14 w-full">
        <rect x="0" y="10" width="260" height="30" rx="8" fill="#f2ede1" />
        <motion.rect x="0" y="10" height="30" rx="8" fill="#0b2545" {...grow("97.5")} />
        <motion.rect x="102" y="10" height="30" rx="8" fill="#c9932c" {...grow("162.5")} />
        <text x="45" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">3</text>
        <text x="185" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">5</text>
      </svg>
    );
  }

  if (kind === "perimeter") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24">
        <motion.rect x="18" y="18" width="64" height="64" rx="4" fill="#f2c14e11" stroke="#0b2545" strokeWidth="4" {...draw} />
        <text x="50" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b4530b">? cm</text>
        <text x="96" y="54" textAnchor="middle" fontSize="10" fill="#5c5c5c" transform="rotate(90 96 54)">32 cm perimeter</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 260 50" className="h-14 w-full">
      <rect x="0" y="10" width="260" height="30" rx="8" fill="#f2ede1" />
      <motion.rect x="0" y="10" height="30" rx="8" fill="#0b2545" {...grow("195")} />
      <motion.rect x="0" y="10" height="30" rx="8" fill="#c9932c22" style={{ marginLeft: 0 }} initial={reduceMotion ? undefined : { x: 195, width: 0 }} animate={reduceMotion ? undefined : { x: 195, width: 65 }} transition={{ duration: 0.6, delay: 0.5 }} />
      <text x="97" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">£60 kept</text>
      <text x="227" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b4530b">-25%</text>
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
