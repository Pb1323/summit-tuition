"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const Hero3DScene = dynamic(() => import("./hero-3d-scene").then((m) => m.Hero3DScene), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-full bg-gold/10 blur-2xl" />,
});

export function Hero3DBackground() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none h-full w-full">
      <Hero3DScene />
    </div>
  );
}
