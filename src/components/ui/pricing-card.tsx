import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PricingTier } from "@/types/pricing";

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border bg-white p-7",
        tier.highlighted
          ? "border-navy shadow-[0_24px_56px_-20px_rgba(15,43,61,0.35)] lg:-translate-y-2"
          : "border-line"
      )}
    >
      {tier.badge && (
        <Badge variant={tier.highlighted ? "navy" : "gold"} className="absolute -top-3 left-7">
          {tier.badge}
        </Badge>
      )}
      <h3 className="text-lg font-semibold text-navy">{tier.name}</h3>
      <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-muted">{tier.description}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-navy">{tier.price}</span>
        <span className="text-sm font-medium text-muted">{tier.period}</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
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
