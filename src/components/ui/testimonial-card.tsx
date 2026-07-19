import * as React from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a trust/proof statement, not an attributed personal testimonial —
 * we don't publish fabricated parent quotes. Use for honest, factual claims
 * about how the business operates.
 */
export function TestimonialCard({
  statement,
  context,
  className,
}: {
  statement: string;
  context: string;
  className?: string;
}) {
  return (
    <div className={cn("premium-card-hover rounded-2xl border border-line bg-white p-6", className)}>
      <Quote className="h-5 w-5 text-gold" />
      <p className="mt-3 text-base leading-relaxed text-navy">{statement}</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">{context}</p>
    </div>
  );
}
