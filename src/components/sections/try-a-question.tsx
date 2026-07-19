"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { id: "a", label: "PUZZLE" },
  { id: "b", label: "RIDDLE" },
  { id: "c", label: "CIPHER" },
  { id: "d", label: "SECRET" },
];

const CORRECT = "c";

export function TryAQuestion() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === CORRECT;

  return (
    <div className="relative rounded-2xl border border-gold/25 bg-white/95 p-5 shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)] sm:p-6">
      <div className="flex items-center justify-between">
        <Badge variant="navy">Try a real question</Badge>
        <span className="text-xs font-semibold text-muted">Verbal Reasoning</span>
      </div>

      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">
        Find the code
      </p>
      <p className="mt-2 text-base leading-relaxed text-navy">
        If the code for <span className="font-bold text-gold-dark">MOTHER</span> is{" "}
        <span className="font-mono font-bold text-gold-dark">NPUIFS</span>, what does{" "}
        <span className="font-mono font-bold text-gold-dark">DJQIFS</span> mean?
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {OPTIONS.map((option) => {
          const isChosen = selected === option.id;
          const showState = selected !== null;
          const isRight = option.id === CORRECT;
          return (
            <motion.button
              key={option.id}
              type="button"
              disabled={selected !== null}
              onClick={() => setSelected(option.id)}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors",
                !showState && "border-line bg-cream/50 text-navy hover:border-gold hover:bg-gold/10",
                showState && isRight && "border-emerald-300 bg-emerald-50 text-emerald-700",
                showState && isChosen && !isRight && "border-rose-300 bg-rose-50 text-rose-700",
                showState && !isChosen && !isRight && "border-line bg-cream/30 text-muted opacity-60"
              )}
            >
              {option.label}
              {showState && isRight && <CheckCircle2 className="h-4 w-4 shrink-0" />}
              {showState && isChosen && !isRight && <XCircle className="h-4 w-4 shrink-0" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
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
              each letter shifts back one place in the alphabet, so <span className="font-mono font-bold">DJQIFS</span> decodes to{" "}
              <span className="font-mono font-bold">CIPHER</span>.
              {" "}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="font-bold text-gold-dark underline underline-offset-2"
              >
                Try again
              </button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-center text-xs font-medium text-muted">
        This is one real example from our Verbal Reasoning bank.{" "}
        <Button href="/diagnostic-assessment" variant="ghost" size="sm" className="!h-auto !p-0 !text-xs underline">
          See your child&apos;s full level
        </Button>
      </p>
    </div>
  );
}
