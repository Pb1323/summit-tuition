import type { Metadata } from "next";
import { ArrowRight, Timer, Gauge, BarChart3, Target, ListChecks, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PricingCard } from "@/components/ui/pricing-card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { PRACTICE_SIMULATOR_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Practice Paper Simulator — Online 11+ Practice Papers",
  description:
    "Timed online 11+ practice papers with instant scoring, topic breakdowns and a parent dashboard. Practise English, maths, verbal and non-verbal reasoning.",
};

const FEATURES = [
  { icon: <Timer className="h-5 w-5" />, title: "Timed papers", description: "Full-length papers run to real 11+ timings." },
  { icon: <Gauge className="h-5 w-5" />, title: "Instant scoring", description: "Results the moment a paper is submitted." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Topic breakdown", description: "See performance by question type, not just an overall score." },
  { icon: <Target className="h-5 w-5" />, title: "Accuracy tracking", description: "Spot patterns in careless mistakes versus genuine gaps." },
  { icon: <ListChecks className="h-5 w-5" />, title: "Attempt history", description: "Every past paper and score, kept in one place." },
  { icon: <Compass className="h-5 w-5" />, title: "Recommended next paper", description: "The simulator suggests the next paper based on weak areas." },
];

export default function PracticeSimulatorPage() {
  return (
    <>
      <HeroSection
        eyebrow="Practice Paper Simulator"
        title="Practice papers that feel like real 11+ mocks"
        description="An online practice system where children complete timed papers across English, maths, verbal reasoning and non-verbal reasoning — with parents able to see results and improvement areas instantly."
        visual={
          <Card>
            <div className="p-7">
              <div className="flex items-center justify-between">
                <Badge variant="navy">Practice Paper Simulator</Badge>
                <span className="text-xs font-medium text-muted">09:12 remaining</span>
              </div>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-navy/10">
                <div className="h-full w-2/3 rounded-full bg-gold" />
              </div>
              <div className="mt-5 space-y-3">
                {["Non-Verbal Reasoning — Paper 3", "Maths — Paper 3", "English — Paper 3"].map((s, i) => (
                  <div key={s} className="flex items-center justify-between rounded-xl border border-line p-3.5">
                    <span className="text-sm font-medium text-navy">{s}</span>
                    <Badge variant={i === 0 ? "success" : "cream"}>{i === 0 ? "Scored: 84%" : "Pending"}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        }
        actions={
          <>
            <Button href="#pricing" size="lg">
              Try Practice Paper Simulator <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        }
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Features" title="Everything you need between mocks" />
          <div className="mt-10">
            <FeatureGrid items={FEATURES} columns={3} />
          </div>
        </Container>
      </section>

      <section id="pricing" className="bg-cream-dark/50 py-20">
        <Container className="flex flex-col items-center">
          <SectionHeading align="center" eyebrow="Pricing" title="One simple monthly subscription" />
          <div className="mt-10 w-full max-w-sm">
            {PRACTICE_SIMULATOR_PRICING.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Give your child unlimited, structured practice"
        description="Pairs perfectly with Weekly Mock Club or the Complete 11+ Programme."
        actions={
          <Button href="#pricing" size="lg">
            Try Practice Paper Simulator <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
