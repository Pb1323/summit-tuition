"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const MiniSceneCanvas = dynamic(() => import("./mini-scene-canvas").then((m) => m.MiniSceneCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-full bg-gold/10 blur-xl" />,
});

/** Tiny decorative 3D accent (seal/ring) — slow autorotate only, no scroll or pointer coupling, kept deliberately low-key. */
export function MiniScene({ geometry, className }: { geometry: "seal" | "peak" | "pen-paper"; className?: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      <MiniSceneCanvas geometry={geometry} />
    </div>
  );
}
