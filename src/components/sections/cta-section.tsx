import * as React from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function CTASection({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("bg-navy py-20", className)}>
      <Container className="flex flex-col items-center text-center">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            {eyebrow}
          </p>
        )}
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/70">{description}</p>
        )}
        <div className="mt-9 flex flex-wrap justify-center gap-4">{actions}</div>
      </Container>
    </section>
  );
}
