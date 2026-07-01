import { cn } from "@/lib/utils";

function scoreColor(score: number) {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 55) return "bg-gold";
  return "bg-rose-400";
}

export function ScoreBar({
  label,
  score,
  className,
}: {
  label: string;
  score: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-navy">{label}</span>
        <span className="font-semibold text-navy">{score}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-navy/10">
        <div
          className={cn("h-full rounded-full transition-all", scoreColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function ScoreRing({ score, size = 96 }: { score: number; size?: number }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#0f2b3d1a" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#c8932f"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-navy">{score}%</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted">Ready</span>
      </div>
    </div>
  );
}
