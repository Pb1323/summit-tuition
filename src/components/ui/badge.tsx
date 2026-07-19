import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-transform duration-200",
  {
    variants: {
      variant: {
        gold: "gold-shimmer bg-gold/15 text-gold-dark hover:-translate-y-px",
        navy: "gold-shimmer bg-navy text-white hover:-translate-y-px",
        outline: "border border-navy/20 text-navy",
        danger: "bg-rose-100 text-rose-700",
        success: "bg-emerald-100 text-emerald-700",
        cream: "bg-cream-dark text-navy",
      },
    },
    defaultVariants: { variant: "gold" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
