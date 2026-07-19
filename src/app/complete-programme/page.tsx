import type { Metadata } from "next";
import { ArrowRight, Sparkles, Gauge, Users, Repeat, BarChart3, Phone, Tag, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PricingCard } from "@/components/ui/pricing-card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { PROGRAMME_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Complete 11+ Programme — The Full System",
  description:
    "The Complete 11+ Programme combines group tuition, weekly mocks, a diagnostic assessment, progress reports and parent check-ins into one managed plan.",
};

const INCLUDED = [
  { icon: <Gauge className="h-5 w-5" />, title: "Initial diagnostic assessment", description: "A full assessment to set the baseline and the plan." },
  { icon: <Users className="h-5 w-5" />, title: "Weekly group tuition", description: "Structured small-group teaching every week." },
  { icon: <Repeat className="h-5 w-5" />, title: "Weekly mock exams", description: "Regular timed practice under exam conditions." },
  { icon: <Compass className="h-5 w-5" />, title: "Practice Paper Simulator access", description: "Unlimited extra practice between sessions." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Monthly progress reports", description: "A clear, written update every month." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Weak-area tracking", description: "We track and adapt the plan as gaps close." },
  { icon: <Phone className="h-5 w-5" />, title: "Termly parent check-ins", description: "A call with your tutor to review progress and plan ahead." },
  { icon: <Tag className="h-5 w-5" />, title: "Holiday booster discount", description: "Priority access and a discount on holiday intensives." },
];

export default function CompleteProgrammePage() {
  return (
    <>
      <HeroSection
        eyebrow="Complete 11+ Programme"
        title="The complete 11+ preparation system"
        description="For parents who want one fully managed plan — tuition, mocks, diagnostics and reporting, combined and tracked in a single place."
        actions={
          <Button href="/book-a-call?product=complete-programme" size="lg">
            Apply for Complete Programme <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="What's Included" title="Everything your child needs, in one plan" />
          <div className="mt-10">
            <FeatureGrid items={INCLUDED} columns={4} />
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-20">
        <Container>
          <SectionHeading eyebrow="Compare" title="Why families choose the Complete Programme" />
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="flex flex-col items-center">
          <Badge variant="gold" className="mb-3">Best Value</Badge>
          <SectionHeading align="center" eyebrow="Pricing" title="One weekly investment, fully managed" />
          <div className="mt-10 w-full max-w-sm">
            {PROGRAMME_PRICING.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
          <p className="mt-6 max-w-lg text-center text-sm text-muted">
            We keep the Complete Programme selective so every child gets proper attention —
            spaces are reviewed on application, not first-come-first-served.
          </p>
        </Container>
      </section>

      <CTASection
        title="Apply for the Complete 11+ Programme"
        description="We'll start with a short call to confirm it's the right fit for your child."
        actions={
          <Button href="/book-a-call?product=complete-programme" size="lg">
            Apply for Complete Programme <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
