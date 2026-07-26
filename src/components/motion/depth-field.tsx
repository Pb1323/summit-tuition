"use client";

import { motion, useReducedMotion } from "framer-motion";

// Slow, looping idle drift for each layer — always in motion, even before the visitor moves
// the mouse. Kept small and centered on each shape's resting position so nothing wanders off.
const idleLayer = (dx: number, dy: number) => ({
  x: [0, dx, 0],
  y: [0, dy, 0],
});

export function DepthField() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold/18 blur-3xl" />
        <div className="absolute right-0 top-8 h-96 w-96 rounded-full bg-gold-light/22 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,83,9,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,83,9,0.04)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold/18 blur-3xl"
        animate={idleLayer(14, -10)}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-8 h-96 w-96 rounded-full bg-gold-light/22 blur-3xl"
        animate={idleLayer(-16, 12)}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[12%] top-24 h-44 w-72 rotate-[-8deg] rounded-3xl border border-gold/18 bg-white/24 shadow-[0_40px_90px_-70px_rgba(15,23,42,0.85)]"
        animate={idleLayer(8, 10)}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-12 right-[16%] h-36 w-64 rotate-[6deg] rounded-3xl border border-gold/18 bg-white/20 shadow-[0_40px_90px_-70px_rgba(15,23,42,0.85)]"
        animate={idleLayer(-10, -8)}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,83,9,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,83,9,0.04)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
    </div>
  );
}
