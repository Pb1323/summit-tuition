"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function KineticHeadline({ text, highlight = [], className }: { text: string; highlight?: string[]; className?: string }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  return (
    <h1 className={cn("max-w-3xl text-4xl font-black tracking-tight text-navy sm:text-5xl lg:text-[3.45rem] lg:leading-[1.04]", className)}>
      {words.map((word, index) => {
        const clean = word.replace(/[^\w+]/g, "").toLowerCase();
        const active = highlight.map((item) => item.toLowerCase()).includes(clean);
        return (
          <motion.span
            key={`${word}-${index}`}
            className={cn("inline-block pr-[0.22em]", active && "text-gold-dark [text-shadow:0_10px_28px_rgba(180,83,9,0.22)]")}
            initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion || !active ? undefined : { scale: 1.025, y: -2 }}
          >
            {word}
          </motion.span>
        );
      })}
    </h1>
  );
}
