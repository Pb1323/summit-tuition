"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";

const DATA: { day: string; value: number }[] = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 9 },
  { day: "Thu", value: 24 },
  { day: "Fri", value: 15 },
];

const QUESTIONS = [
  { prompt: "Which day had the most books borrowed?", answer: "Thu", check: (d: typeof DATA[number]) => d.value === Math.max(...DATA.map((x) => x.value)) },
  { prompt: "Which day had the fewest books borrowed?", answer: "Wed", check: (d: typeof DATA[number]) => d.value === Math.min(...DATA.map((x) => x.value)) },
];

export function BarChartReader() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const max = Math.max(...DATA.map((d) => d.value));
  const q = QUESTIONS[qIndex];

  const handleBarClick = (d: (typeof DATA)[number]) => {
    if (q.check(d)) {
      setFeedback("correct");
      window.setTimeout(() => {
        setFeedback(null);
        setQIndex((i) => (i + 1) % QUESTIONS.length);
      }, 900);
    } else {
      setFeedback("wrong");
      window.setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div>
      <div className="px-5 pt-[22px] text-center text-[0.78em] text-[rgba(248,245,238,0.6)]">
        Books borrowed from the school library, Mon–Fri
      </div>

      <div className="flex items-end justify-center gap-4 px-5 pb-2 pt-6" style={{ height: 160 }}>
        {DATA.map((d) => (
          <div key={d.day} className="flex flex-col items-center justify-end" style={{ height: "100%" }}>
            <div className="mb-1 font-mono text-[0.7em] font-bold text-[#F8F5EE]" style={{ opacity: hovered === d.day ? 1 : 0 }}>
              {d.value}
            </div>
            <div
              onMouseEnter={() => setHovered(d.day)}
              onMouseLeave={() => setHovered((h) => (h === d.day ? null : h))}
              onClick={() => handleBarClick(d)}
              className="w-11 cursor-pointer rounded-t-[6px] transition-all duration-300"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: hovered === d.day ? "linear-gradient(135deg,#e6c877,#C9A24B)" : "rgba(255,255,255,0.14)",
                boxShadow: hovered === d.day ? "0 0 0 2px rgba(201,162,75,0.5)" : "none",
              }}
            />
            <div className="mt-1.5 font-mono text-[0.78em] font-bold text-[rgba(248,245,238,0.7)]">{d.day}</div>
          </div>
        ))}
      </div>

      <div className="px-5 pb-2 text-center text-[0.72em] text-[rgba(248,245,238,0.5)]">
        Hover a bar to read its value from the axis.
      </div>

      <div
        className="mx-5 mb-7 mt-3 rounded-2xl border px-5 py-4 text-center"
        style={{ background: "rgba(201,162,75,0.08)", borderColor: "rgba(201,162,75,0.3)" }}
      >
        <div className="mb-2 text-[0.72em] font-bold uppercase tracking-wider" style={{ color: NOTES_GOLD }}>
          Try it
        </div>
        <div className="mb-2.5 text-[0.86em] text-[#F8F5EE]">{q.prompt} (click the bar)</div>
        {feedback && (
          <div className="text-[0.82em] font-bold" style={{ color: feedback === "correct" ? NOTES_GOLD : "#e08a80" }}>
            {feedback === "correct" ? "✓ Correct!" : "✗ Not quite — try another bar"}
          </div>
        )}
      </div>
    </div>
  );
}
