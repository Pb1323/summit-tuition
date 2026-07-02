"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ScrollStoryRail({ steps }: { steps: { title: string; text: string }[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-gold/25 md:block" />
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="glass-panel relative rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur"
            initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.97, filter: "blur(8px)" }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.62, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-black text-navy">{index + 1}</span>
            <h3 className="mt-4 text-lg font-black">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/72">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
