"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export function DepthField() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 24, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 60, damping: 24, mass: 0.7 });
  const layerOneX = useTransform(springX, [-1, 1], [-8, 8]);
  const layerOneY = useTransform(springY, [-1, 1], [-6, 6]);
  const layerTwoX = useTransform(springX, [-1, 1], [10, -10]);
  const layerTwoY = useTransform(springY, [-1, 1], [7, -7]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
    >
      <motion.div
        className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold/18 blur-3xl"
        style={reduceMotion ? undefined : { x: layerOneX, y: layerOneY }}
      />
      <motion.div
        className="absolute right-0 top-8 h-96 w-96 rounded-full bg-gold-light/22 blur-3xl"
        style={reduceMotion ? undefined : { x: layerTwoX, y: layerTwoY }}
      />
      <motion.div
        className="absolute left-[12%] top-24 h-44 w-72 rotate-[-8deg] rounded-3xl border border-gold/18 bg-white/24 shadow-[0_40px_90px_-70px_rgba(15,23,42,0.85)]"
        style={reduceMotion ? undefined : { x: layerTwoX, y: layerOneY }}
      />
      <motion.div
        className="absolute bottom-12 right-[16%] h-36 w-64 rotate-[6deg] rounded-3xl border border-gold/18 bg-white/20 shadow-[0_40px_90px_-70px_rgba(15,23,42,0.85)]"
        style={reduceMotion ? undefined : { x: layerOneX, y: layerTwoY }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,83,9,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,83,9,0.04)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
    </motion.div>
  );
}
