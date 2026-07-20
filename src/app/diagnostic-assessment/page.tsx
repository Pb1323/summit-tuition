import type { Metadata } from "next";
import {
  Gauge,
  BarChart3,
  Target,
  Timer,
  FileSearch,
  ListChecks,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PricingCard } from "@/components/ui/pricing-card";
import { PullQuote } from "@/components/ui/pull-quote";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { MockReportPreview } from "@/components/sections/mock-report-preview";
import { RevealOnScroll, StaggerReveal } from "@/components/platform/ui";
import { DIAGNOSTIC_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "11+ Diagnostic Assessment",
  description:
    "Book a UK 11+ diagnostic assessment covering English, maths, verbal and non-verbal reasoning. Get a detailed parent report on strengths, weak topics and what to do next.",
};

const REPORT_FEATURES = [
  { icon: <Gauge className="h-5 w-5" />, title: "Overall readiness score", description: "A single, honest snapshot of where your child stands today." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Subject-by-subject breakdown", description: "English, maths, verbal and non-verbal reasoning scored separately." },
  { icon: <Target className="h-5 w-5" />, title: "Topic weaknesses", description: "The specific question types causing the most lost marks." },
  { icon: <Timer className="h-5 w-5" />, title: "Timing analysis", description: "Whether your child is losing marks to pace rather than ability." },
  { icon: <FileSearch className="h-5 w-5" />, title: "Accuracy analysis", description: "Where careless errors are costing marks versus genuine gaps." },
  { icon: <ListChecks className="h-5 w-5" />, title: "Recommended learning plan", description: "A clear, prioritised plan for the next three months." },
];

const STEPS = [
  { title: "Book your slot", description: "Choose an online or in-person assessment time that suits your family." },
  { title: "Child sits the assessment", description: "A full-length assessment across all four 11+ areas, under timed conditions." },
  { title: "We mark and analyse", description: "Our team marks every paper and builds the topic-level breakdown." },
  { title: "You receive the report", description: "A detailed written report, plus a 20-minute call to talk through next steps." },
];

export default function DiagnosticAssessmentPage() {
  return (
    <>
      <HeroSection
        eyebrow="Diagnostic Assessment"
        title="Find out exactly what your child needs to improve"
        description="A one-off assessment across English, maths, verbal reasoning and non-verbal reasoning, with a detailed report showing strengths, weaknesses, topic gaps, timing issues and accuracy issues — and exactly what to do next."
        actions={
          <>
            <Button href="/book-a-call?product=diagnostic-assessment" size="lg">
              Book Diagnostic Assessment <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#sample-report" variant="outline" size="lg">
              See a sample report
            </Button>
          </>
        }
      />

      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="What's Included"
              title="Every report covers the same seven things"
              description="No vague feedback — every parent gets the same structured, comparable report."
            />
            <div className="mt-10">
              <FeatureGrid items={REPORT_FEATURES} columns={3} />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="sample-report" className="bg-cream-dark/50 py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="Sample Report"
              title="What you'll receive after the assessment"
            />
            <div className="mt-10">
              <MockReportPreview />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading eyebrow="How It Works" title="From booking to report in under a week" />
          </RevealOnScroll>
          <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="premium-card-hover rounded-2xl border border-line bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-gold-light">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-navy">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <RevealOnScroll className="max-w-md">
            <SectionHeading
              eyebrow="Pricing"
              title="One assessment, a complete picture"
              description="A single one-off fee — no subscription required to find out where your child stands."
            />
            <PullQuote className="mt-6">
              Most families follow the diagnostic with a Pro or Max subscription —
              we&apos;ll recommend the right next step based on your results.
            </PullQuote>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mx-auto w-full max-w-sm">
            {DIAGNOSTIC_PRICING.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </RevealOnScroll>
        </Container>
      </section>

      <CTASection
        title="Book your child's diagnostic assessment"
        description="Available online and in person. Results delivered within a week."
        actions={
          <Button href="/book-a-call?product=diagnostic-assessment" size="lg">
            Book Diagnostic Assessment <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
