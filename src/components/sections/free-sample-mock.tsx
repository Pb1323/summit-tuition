"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, Sparkles, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SampleQuestion {
  subject: "Maths" | "Comprehension";
  context?: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

/** Original questions written for this teaser (maths) plus one real question/passage
 * excerpt reused from the free diagnostic sample mock (english-gl-1's e1) — not fabricated
 * third-party content, matching the "don't copy third-party paper content" project rule. */
const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    subject: "Maths",
    prompt: "Calculate 24 + 5 x 6 - 10.",
    options: ["44", "39", "84", "50"],
    correctAnswer: "44",
    explanation: "Multiply first: 5 x 6 = 30. Then 24 + 30 - 10 = 44.",
  },
  {
    subject: "Maths",
    prompt: "What is 2/5 of 60?",
    options: ["24", "20", "30", "12"],
    correctAnswer: "24",
    explanation: "60 divided by 5 = 12, then 12 x 2 = 24.",
  },
  {
    subject: "Maths",
    prompt: "Share £40 between two friends in the ratio 3:5. How much does the friend with the larger share receive?",
    options: ["£25", "£15", "£20", "£30"],
    correctAnswer: "£25",
    explanation: "3 + 5 = 8 parts. £40 divided by 8 = £5 per part. The larger share is 5 parts, so 5 x £5 = £25.",
  },
  {
    subject: "Maths",
    prompt: "A square has a perimeter of 32 cm. What is the length of one side?",
    options: ["8 cm", "16 cm", "4 cm", "6 cm"],
    correctAnswer: "8 cm",
    explanation: "A square has 4 equal sides, so 32 divided by 4 = 8 cm.",
  },
  {
    subject: "Comprehension",
    context:
      "“Mara reached the observatory just as the last stripe of daylight rested on the brass dome. A narrow path of crushed shells led up the hill, pale against the darkening grass.”",
    prompt: "Where was Mara when the last stripe of daylight rested on the dome?",
    options: ["At the library", "At the observatory", "In the garden", "Beside the river"],
    correctAnswer: "At the observatory",
    explanation: "This is a retrieval question — the passage states Mara reached the observatory.",
  },
];

export function FreeSampleMock() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = SAMPLE_QUESTIONS.length;
  const question = SAMPLE_QUESTIONS[index];
  const isLast = index === total - 1;
  const isCorrect = selected === question?.correctAnswer;

  function handleSelect(option: string) {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.correctAnswer) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (isLast) {
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
          That&apos;s your 5 free sample questions. Register free for a full mock in every subject,
          or go Pro for the complete mock library and Study Notes.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Button href="/register" size="md">
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
        <span className="text-xs font-semibold text-muted">{question.subject}</span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream">
        <div
          className="h-full rounded-full bg-gold transition-all duration-300"
          style={{ width: `${((index + (selected !== null ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {question.context && (
        <p className="mt-4 rounded-xl bg-cream/60 p-3.5 text-sm italic leading-relaxed text-navy/80">
          {question.context}
        </p>
      )}

      <p className={cn("text-base leading-relaxed text-navy", question.context ? "mt-3" : "mt-4")}>
        {question.prompt}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isChosen = selected === option;
          const showState = selected !== null;
          const isRight = option === question.correctAnswer;
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
              {option}
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
          {isLast ? "See my result" : "Next question"}
        </Button>
      )}
    </div>
  );
}
