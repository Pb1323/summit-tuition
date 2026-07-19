import type { Metadata } from "next";
import { ArrowRight, Users, User, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { RevealOnScroll, StaggerReveal } from "@/components/platform/ui";

export const metadata: Metadata = {
  title: "11+ Tuition — Group, Private & Complete Programme",
  description:
    "Compare 11+ tuition options: small-group classes, private 1:1 tutoring, or the Complete 11+ Programme that combines tuition, mocks and reporting.",
};

const OPTIONS = [
  {
    icon: <Users className="h-6 w-6" />,
    name: "Group Tuition",
    description: "Small-group weekly classes covering all key 11+ subjects, at a lower cost than 1:1.",
    bestFor: "Good for consistent, structured weekly learning alongside peers.",
    href: "/tuition/group",
    cta: "View Group Tuition",
  },
  {
    icon: <User className="h-6 w-6" />,
    name: "Private Tuition",
    description: "Premium, personalised 1:1 tutoring built entirely around your child's weak areas.",
    bestFor: "Best for closing specific gaps quickly or moving at a faster pace.",
    href: "/tuition/private",
    cta: "View Private Tuition",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    name: "Complete 11+ Programme",
    description: "Tuition, weekly mocks, diagnostics and parent reports combined into one managed plan.",
    bestFor: "Best for parents who want the full system, fully managed.",
    href: "/complete-programme",
    cta: "View Complete Programme",
    featured: true,
  },
];

export default function TuitionPage() {
  return (
    <>
      <HeroSection
        eyebrow="Tuition"
        title="Structured teaching support, matched to how your child learns"
        description="Choose small-group classes, 1:1 private tutoring, or the Complete 11+ Programme that brings everything together."
        actions={
          <>
            <Button href="/book-a-call" size="lg">
              Book a Free Parent Call <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        }
      />

      <section className="py-20">
        <Container>
          <StaggerReveal className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {OPTIONS.map((opt) => (
              <div
                key={opt.name}
                className={`premium-card-hover flex flex-col rounded-3xl border bg-white p-7 ${
                  opt.featured ? "border-gold shadow-[0_24px_56px_-20px_rgba(15,43,61,0.3)] lg:-translate-y-2" : "border-line"
                }`}
              >
                {opt.featured && <Badge variant="gold" className="mb-3 w-fit">Recommended</Badge>}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
                  {opt.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy">{opt.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{opt.description}</p>
                <p className="mt-3 text-sm font-medium text-navy/80">{opt.bestFor}</p>
                <Button
                  href={opt.href}
                  variant={opt.featured ? "primary" : "outline"}
                  className="mt-6 w-fit"
                >
                  {opt.cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading eyebrow="Compare" title="See exactly what's included in each option" />
            <div className="mt-10">
              <ComparisonTable />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <CTASection
        title="Not sure which fits your child?"
        description="A free 15-minute call is the fastest way to find out."
        actions={
          <Button href="/book-a-call" size="lg">
            Book a Free Parent Call <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
