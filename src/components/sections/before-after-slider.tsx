"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const ROWS = [
  { label: "Arithmetic & Number", before: 54, after: 88 },
  { label: "Comprehension", before: 61, after: 90 },
  { label: "Verbal Reasoning", before: 47, after: 82 },
  { label: "Timing under pressure", before: 39, after: 79 },
];

export function BeforeAfterSlider() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);

  const updateFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.max(4, Math.min(96, raw)));
  };

  return (
    <div className="rounded-2xl border border-gold/25 bg-white p-5 shadow-[0_28px_80px_-46px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wide">
        <span className="text-muted">Before diagnostic</span>
        <span className="text-gold-dark">After 8-week programme</span>
      </div>

      <div
        ref={trackRef}
        className="relative select-none overflow-hidden rounded-xl border border-line bg-cream"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          updateFromClientX(e.clientX);
        }}
      >
        <div className="space-y-3 p-4">
          {ROWS.map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-navy">
                <span>{row.label}</span>
              </div>
              <div className="relative h-2.5 rounded-full bg-navy/8">
                <div className="absolute inset-y-0 left-0 rounded-full bg-rose-300/70" style={{ width: `${row.before}%` }} />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark to-gold"
                  animate={reduceMotion ? undefined : { width: `${row.after}%` }}
                  initial={false}
                  style={{
                    clipPath: `inset(0 ${100 - percent}% 0 0)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* draggable divider */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-navy/70"
          style={{ left: `${percent}%` }}
        >
          <div className="pointer-events-auto absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold/40 bg-white shadow-md">
            <GripVertical className="h-4 w-4 text-navy" />
          </div>
        </div>
      </div>

      <p className={cn("mt-4 text-center text-xs font-medium text-muted")}>
        Drag to compare — average marks-lost topics before vs. after a focused 8-week improvement cycle.
      </p>
    </div>
  );
}
