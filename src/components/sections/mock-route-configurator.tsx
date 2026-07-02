"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { BarChart3, BookOpenText, FileText, Sparkles } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ProgressBar, PremiumBadge } from "@/components/platform/ui";
import { cn } from "@/lib/utils";

const subjects = ["Maths", "English", "VR", "NVR"] as const;
const difficulties = ["Standard", "Summit Stretch"] as const;
const reportViews = ["Score", "Weak topics", "Explanations"] as const;
const tiers = ["Starter", "Plus", "Premium"] as const;

export function MockRouteConfigurator() {
  const [subject, setSubject] = useState<(typeof subjects)[number]>("Maths");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("Summit Stretch");
  const [reportView, setReportView] = useState<(typeof reportViews)[number]>("Weak topics");
  const [tier, setTier] = useState<(typeof tiers)[number]>("Plus");
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 80, damping: 22 }), [-1, 1], [4, -4]);
  const rotateY = useTransform(useSpring(x, { stiffness: 80, damping: 22 }), [-1, 1], [-5, 5]);

  const recommendation = useMemo(() => {
    if (tier === "Premium") return "Tutor-reviewed reports with monthly review support.";
    if (difficulty === "Summit Stretch") return "Slightly harder GL-style mocks with deeper explanations.";
    return "Steady weekly online mock practice with clear parent-ready reports.";
  }, [difficulty, tier]);

  return (
    <GlassPanel className="grid gap-6 p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
      <div>
        <PremiumBadge><Sparkles className="mr-1 h-3.5 w-3.5" /> Interactive preview</PremiumBadge>
        <h2 className="mt-4 text-2xl font-black text-navy">Configure a mock route</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">Explore how subject, difficulty, report depth and tier change the online mock experience.</p>
        <ControlGroup label="Mock type" values={subjects} value={subject} onChange={setSubject} />
        <ControlGroup label="Difficulty" values={difficulties} value={difficulty} onChange={setDifficulty} />
        <ControlGroup label="Report view" values={reportViews} value={reportView} onChange={setReportView} />
        <ControlGroup label="Tier" values={tiers} value={tier} onChange={setTier} />
      </div>
      <motion.div
        className="mock-paper-stack rounded-3xl border border-gold/25 bg-white p-6 shadow-[0_34px_100px_-62px_rgba(15,23,42,0.72)]"
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          x.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
          y.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PremiumBadge tone={subject === "Maths" ? "navy" : "gold"}>{subject}</PremiumBadge>
          <PremiumBadge tone={difficulty === "Summit Stretch" ? "red" : "navy"}>{difficulty}</PremiumBadge>
        </div>
        <h3 className="mt-5 text-2xl font-black text-navy">{subject} {difficulty} Mock</h3>
        <p className="mt-2 text-sm text-muted">{recommendation}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <MiniStat icon={<FileText />} label="Tier" value={tier} />
          <MiniStat icon={<BarChart3 />} label="View" value={reportView} />
          <MiniStat icon={<BookOpenText />} label="Access" value="Online only" />
        </div>
        <div className="mt-6 space-y-4">
          <ProgressBar value={reportView === "Score" ? 76 : 68} label="Readiness score" />
          <ProgressBar value={subject === "Maths" ? 54 : 61} label={subject === "Maths" ? "Ratio / percentage focus" : "Inference / vocabulary focus"} />
          <ProgressBar value={tier === "Premium" ? 88 : 72} label="Report depth" />
        </div>
      </motion.div>
    </GlassPanel>
  );
}

function ControlGroup<T extends string>({ label, values, value, onChange }: { label: string; values: readonly T[]; value: T; onChange: (value: T) => void }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={cn(
              "rounded-full border px-3 py-2 text-sm font-bold transition",
              value === item ? "border-gold bg-gold/15 text-gold-dark" : "border-line bg-white text-navy hover:border-gold/50"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-cream p-4">
      <div className="text-gold-dark [&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <p className="mt-2 text-xs font-bold text-muted">{label}</p>
      <p className="font-black text-navy">{value}</p>
    </div>
  );
}
