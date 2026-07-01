import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "compact";
}

export function HeroSection({
  eyebrow,
  title,
  description,
  actions,
  visual,
  align = "left",
  size = "default",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-grain">
      <div className="absolute inset-0 bg-gradient-to-b from-cream-dark/70 to-cream" />
      <Container
        className={cn(
          "relative grid items-center gap-12",
          size === "default" ? "py-20 sm:py-24" : "py-14 sm:py-16",
          visual ? "lg:grid-cols-2" : "grid-cols-1"
        )}
      >
        <div className={cn(align === "center" && !visual && "mx-auto max-w-3xl text-center")}>
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
          )}
          {actions && (
            <div className={cn("mt-9 flex flex-wrap gap-4", align === "center" && !visual && "justify-center")}>
              {actions}
            </div>
          )}
        </div>
        {visual && <div className="relative">{visual}</div>}
      </Container>
    </section>
  );
}
