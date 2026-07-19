import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { DepthField } from "@/components/motion/depth-field";
import { KineticHeadline } from "@/components/motion/kinetic-headline";
import { Hero3DBackground } from "@/components/motion/hero-3d-background";

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
        {visual && (
          <div className="flex flex-col gap-6">
            <div className="hero-dashboard-tilt">{visual}</div>
            <div className="relative flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-6">
              <div className="h-72 w-full shrink-0 sm:h-[26rem] sm:w-[68%]">
                <Hero3DBackground />
              </div>
              <p className="relative z-10 text-center font-serif text-xl italic leading-snug text-navy sm:w-[32%] sm:text-left">
                We help your child get to the <span className="text-gold-dark">top</span>.
              </p>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
              >
                <defs>
                  <marker id="hero-arrow-head" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#b45309" />
                  </marker>
                </defs>
                <path
                  d="M 72 46 Q 60 20 46 10"
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="0.6"
                  strokeDasharray="2.4 2"
                  strokeLinecap="round"
                  markerEnd="url(#hero-arrow-head)"
                  opacity="0.75"
                />
              </svg>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
