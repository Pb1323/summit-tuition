import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { DepthField } from "@/components/motion/depth-field";
import { KineticHeadline } from "@/components/motion/kinetic-headline";

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
    <section className="hero-spotlight relative overflow-hidden">
      <DepthField />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl premium-float" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-gold-light/20 blur-3xl" />
      <Container
        className={cn(
          "relative z-10 grid items-center gap-12",
          size === "default" ? "py-20 sm:py-24 lg:py-28" : "py-14 sm:py-16",
          visual ? "lg:grid-cols-2" : "grid-cols-1"
        )}
      >
        <div className={cn(align === "center" && !visual && "mx-auto max-w-3xl text-center")}>
          {eyebrow && (
            <p className="mb-4 inline-flex rounded-full border border-gold/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gold-dark shadow-sm">
              {eyebrow}
            </p>
          )}
          <KineticHeadline text={title} highlight={["GL-style", "online", "mocks", "improve", "next"]} />
          {description && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
          )}
          {actions && (
            <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap", align === "center" && !visual && "justify-center")}>
              {actions}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-muted">
            {["DBS-checked tutors", "GL-style online mocks", "Manual report release"].map((item) => (
              <span key={item} className="rounded-full border border-gold/25 bg-white/70 px-3 py-1.5">{item}</span>
            ))}
          </div>
        </div>
        {visual && <div className="relative hero-dashboard-tilt">{visual}</div>}
      </Container>
    </section>
  );
}
