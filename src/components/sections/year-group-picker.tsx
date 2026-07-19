"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const YEARS = [
  {
    id: "y4",
    label: "Year 4",
    headline: "Build strong foundations early",
    copy: "Start with a diagnostic to spot gaps before they compound, then build core skills at a steady pace over two years.",
  },
  {
    id: "y5",
    label: "Year 5",
    headline: "This is the year that decides the pace",
    copy: "Weekly mocks and targeted tuition now give the biggest return — enough runway to close gaps before exam season.",
  },
  {
    id: "y6",
    label: "Year 6",
    headline: "Focused, exam-condition practice",
    copy: "Timed papers, marking, and a clear weekly plan to sharpen accuracy and timing right up to exam day.",
  },
] as const;

export function YearGroupPicker() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<(typeof YEARS)[number]["id"]>("y5");
  const current = YEARS.find((y) => y.id === active)!;

  return (
    <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-[0_28px_80px_-46px_rgba(15,23,42,0.35)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">Which year group?</p>
      <div className="mt-4 inline-flex rounded-full border border-line bg-cream p-1">
        {YEARS.map((y) => (
          <button
            key={y.id}
            type="button"
            onClick={() => setActive(y.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-bold transition-colors",
              active === y.id ? "text-white" : "text-navy hover:text-gold-dark"
            )}
          >
            {active === y.id && (
              <motion.span
                layoutId="year-pill"
                className="absolute inset-0 rounded-full bg-navy"
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{y.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <h3 className="text-xl font-semibold text-navy">{current.headline}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{current.copy}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
