import type { Metadata } from "next";
import { ArrowRight, FileSearch, TrendingUp, Mail, ListChecks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "@/components/ui/pricing-card";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { HeroDashboard } from "@/components/sections/hero-dashboard";
import { MOCK_CLUB_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Weekly Mock Club — 11+ Mock Exams",
  description:
    "Join Weekly Mock Club for timed 11+ mock exams every week, with scores, breakdowns and progress tracking for parents. GL and CEM-style coverage.",
};

const FEATURES = [
  { icon: <FileSearch className="h-5 w-5" />, title: "Marked by our team", description: "Every mock marked against GL or CEM-style criteria within 48 hours." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Progress, not just scores", description: "See trends across weeks, not a single isolated number." },
  { icon: <Mail className="h-5 w-5" />, title: "Weekly parent summary", description: "A short, clear email after every mock — no digging for information." },
  { icon: <ListChecks className="h-5 w-5" />, title: "Topic-level breakdown", description: "Know exactly which question types need more work." },
];

export default function WeeklyMockClubPage() {
  return (
    <>
      <HeroSection
        eyebrow="Weekly Mock Club"
        title="Weekly 11+ mock exams with clear parent reports"
        description="Students sit regular timed mocks under exam conditions. Parents receive useful, structured feedback every week — not just a score."
        visual={<HeroDashboard />}
        actions={
          <>
            <Button href="#pricing" size="lg">
              Join Mock Club <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/book-a-call?product=weekly-mock-club" variant="outline" size="lg">
              Talk to us first
            </Button>
          </>
        }
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Why It Works" title="Consistent practice, with feedback that's actually useful" />
          <div className="mt-10">
            <FeatureGrid items={FEATURES} columns={4} />
          </div>
        </Container>
      </section>

      <section id="pricing" className="bg-navy py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Plans"
            title="Choose the level of support your family needs"
            className="mx-auto [&_h2]:text-white [&_p]:text-cream/70"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {MOCK_CLUB_PRICING.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <section id="review-add-on" className="py-20">
        <Container className="grid grid-cols-1 gap-10 rounded-3xl border border-line bg-white p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Add-On"
              title="Mock Review Add-On"
              description="A detailed, tutor-led walkthrough of every mistake from your child's last mock — what went wrong, why, and what to practise next."
            />
            <Button href="/book-a-call?product=weekly-mock-club" size="lg" className="mt-6">
              Add Mock Review <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-2xl bg-cream-dark/60 p-6">
            <p className="text-sm font-semibold text-navy">£25 per mock</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Mistake-by-mistake breakdown</li>
              <li>Weak-topic analysis</li>
              <li>Recommended homework</li>
            </ul>
          </div>
        </Container>
      </section>

      <CTASection
        title="Give your child consistent, exam-condition practice"
        description="Cancel anytime — no long-term contract."
        actions={
          <Button href="#pricing" size="lg">
            Join Mock Club <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
