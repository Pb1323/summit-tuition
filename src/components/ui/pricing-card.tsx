import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PricingTier } from "@/types/pricing";

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "premium-card premium-card-hover relative flex flex-col rounded-2xl p-7",
        tier.highlighted
          ? "border-gold/60 shadow-[0_26px_70px_-30px_rgba(180,83,9,0.55)] lg:-translate-y-2"
          : "border-line"
      )}
    >
      {tier.badge && (
        <Badge variant={tier.highlighted ? "navy" : "gold"} className="absolute -top-3 left-7">
          {tier.badge}
        </Badge>
      )}
      <h3 className="text-lg font-semibold text-navy">{tier.name}</h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-dark">
        {tier.highlighted ? "Most guided route" : tier.billingMode === "one-off" ? "Focused start" : "Flexible plan"}
      </p>
      <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-muted">{tier.description}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-navy">{tier.price}</span>
        <span className="text-sm font-medium text-muted">{tier.period}</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink/85">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
              <Check className="h-3.5 w-3.5" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Button
        href={tier.ctaHref}
        variant={tier.highlighted ? "primary" : "navy"}
        size="lg"
        className="mt-7 w-full"
      >
        {tier.cta}
      </Button>
    </div>
  );
}
