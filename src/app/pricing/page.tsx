import type { Metadata } from "next";
import { ArrowRight, Gauge, Repeat, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "@/components/ui/pricing-card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { RevealOnScroll, StaggerReveal } from "@/components/platform/ui";
import { ALL_PRICING_GROUPS } from "@/data/pricing";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Pricing — 11+ Tuition, Mocks & Diagnostic Assessments",
  description:
    `Transparent pricing for every ${SITE.name} product: Free, Pro and Max platform tiers, diagnostic assessment, tuition and holiday booster courses.`,
};

const NOT_SURE_CARDS = [
  {
    icon: <Gauge className="h-6 w-6" />,
    title: "I want to know my child's level",
    description: "Start with a Diagnostic Assessment for a complete baseline.",
    cta: "See Diagnostic Assessment",
    href: "/diagnostic-assessment",
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "I want weekly exam practice",
    description: "Most families start with Pro — £39/month for full mock and notes access.",
    cta: "See Pro",
    href: "/pricing#platform",
    highlight: true,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "I want teaching and support",
    description: "Group or private tuition, from £15/session.",
    cta: "See Tuition Options",
    href: "/tuition",
  },
];

export default function PricingPage() {
  return (
    <>
      <HeroSection
        eyebrow="Pricing"
        title="Clear pricing, no surprises"
        description="Every product below comes with transparent, parent-facing reporting. Accounts get instant access — no waiting on approval. Cancel subscriptions any time, no long-term tie-in."
        align="center"
        actions={
          <Button href="/book-a-call" size="lg">
            Still not sure? Book a free call <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section className="py-16">
        <Container>
          <RevealOnScroll>
            <SectionHeading align="center" eyebrow="Not Sure Where To Start?" title="Tell us what you need — we'll point you to the right price" />
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {NOT_SURE_CARDS.map((item) => (
                <Card key={item.title} className={`flex flex-col p-7 ${item.highlight ? "border-gold/50 ring-1 ring-gold/30" : ""}`}>
                  {item.highlight && <Badge variant="gold" className="mb-3 w-fit">Most families start here</Badge>}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                  <Button href={item.href} variant="outline" className="mt-6 w-fit">
                    {item.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="platform" className="bg-cream-dark/50 py-16">
        <Container>
          <RevealOnScroll>
            <SectionHeading align="center" eyebrow="Every Product" title="Pick what fits, mix and match as you go" />
          </RevealOnScroll>
          <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PRICING_GROUPS.flatMap((group) => group.tiers).map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </StaggerReveal>
          <p className="mt-8 text-center text-sm text-muted">
            Just want to try it first? <a href="/register" className="font-semibold text-gold-dark underline underline-offset-2">Register free</a> — one mock per subject, no card required.
          </p>
        </Container>
      </section>

      <CTASection
        title="Still deciding?"
        description="A free parent call is the fastest way to find the right fit for your child."
        actions={
          <Button href="/book-a-call" size="lg">
            Book a Free Parent Call <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
