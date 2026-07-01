import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScoreBar, ScoreRing } from "@/components/ui/score-bar";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_REPORT } from "@/data/sample-report";

export function MockReportPreview() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row">
        <div className="flex shrink-0 flex-col items-center gap-3 border-b border-line pb-6 lg:w-56 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {SAMPLE_REPORT.childLabel}
          </p>
          <ScoreRing score={SAMPLE_REPORT.overall} size={120} />
          <p className="text-center text-xs text-muted">Overall readiness score</p>
        </div>

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SAMPLE_REPORT.subjects.map((s) => (
              <ScoreBar key={s.label} label={s.label} score={s.score} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-amber-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" /> Timing
              </div>
              <p className="mt-1 text-sm text-amber-900">{SAMPLE_REPORT.timing}</p>
            </div>
            <div className="rounded-xl bg-navy/5 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy">
                <CheckCircle2 className="h-3.5 w-3.5" /> Accuracy
              </div>
              <p className="mt-1 text-sm text-navy/80">{SAMPLE_REPORT.accuracy}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Weak topics identified
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_REPORT.weakTopics.map((t) => (
                <Badge key={t} variant="danger">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Recommended next steps
            </p>
            <ul className="space-y-2">
              {SAMPLE_REPORT.nextSteps.map((step) => (
                <li key={step} className="flex items-center gap-2 text-sm font-medium text-navy">
                  <ArrowRight className="h-4 w-4 text-gold-dark" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
