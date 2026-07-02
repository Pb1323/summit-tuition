import { TrendingUp, Target } from "lucide-react";
import { ScoreBar, ScoreRing } from "@/components/ui/score-bar";
import { Badge } from "@/components/ui/badge";
import { HERO_DASHBOARD } from "@/data/sample-report";

function Sparkline({ points }: { points: number[] }) {
  const w = 160;
  const h = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = w / (points.length - 1);
  const coords = points
    .map((p, i) => `${i * step},${h - ((p - min) / (max - min || 1)) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={coords} fill="none" stroke="#c8932f" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroDashboard() {
  return (
    <div className="mock-paper-stack relative rounded-2xl border border-gold/25 bg-white/95 p-5 shadow-[0_28px_80px_-36px_rgba(180,83,9,0.42)] sm:p-6">
      <div className="absolute -right-4 -top-4 rounded-full border border-gold/30 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-gold-dark shadow-sm">
        Live report
      </div>
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Parent Dashboard</p>
          <p className="text-sm font-semibold text-navy">Year 5 progress overview</p>
        </div>
        <ScoreRing score={HERO_DASHBOARD.overall} size={64} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {HERO_DASHBOARD.subjects.map((s) => (
          <ScoreBar key={s.label} label={s.label} score={s.score} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-gold/20 bg-cream-dark p-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            <TrendingUp className="h-3.5 w-3.5" /> Progress trend
          </p>
        </div>
        <Sparkline points={HERO_DASHBOARD.trend} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {HERO_DASHBOARD.weakTopics.map((t) => (
          <Badge key={t} variant="danger">
            {t}
          </Badge>
        ))}
        <Badge variant="success">
          <Target className="h-3 w-3" /> {HERO_DASHBOARD.recommendation}
        </Badge>
      </div>
    </div>
  );
}
