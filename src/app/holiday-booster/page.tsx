import type { Metadata } from "next";
import { ArrowRight, Sun, Snowflake, Leaf, Users, FileSearch, NotebookPen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PricingCard } from "@/components/ui/pricing-card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { HOLIDAY_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Holiday Booster Courses — Easter, Half-Term & Summer",
  description:
    "Short, intensive 11+ booster courses during Easter, half-term and summer holidays. Small groups, focused subject coverage, daily mini-mocks.",
};

const COURSES = [
  { icon: <Snowflake className="h-5 w-5" />, name: "Easter Booster", dates: "1 week before exams settle in", focus: "Full-subject revision intensive" },
  { icon: <Leaf className="h-5 w-5" />, name: "Half-Term Booster", dates: "October & February half-terms", focus: "Targeted weak-area sprints" },
  { icon: <Sun className="h-5 w-5" />, name: "Summer Booster", dates: "Last two weeks of August", focus: "Foundation-building ahead of the new year" },
];

const FEATURES = [
  { icon: <Users className="h-5 w-5" />, title: "Small group sizes", description: "Focused groups for genuine individual attention." },
  { icon: <FileSearch className="h-5 w-5" />, title: "Daily mini-mock with feedback", description: "A short timed paper every day, marked the same day." },
  { icon: <NotebookPen className="h-5 w-5" />, title: "Take-home revision pack", description: "Materials to keep momentum going after the course ends." },
];

export default function HolidayBoosterPage() {
  return (
    <>
      <HeroSection
        eyebrow="Holiday Booster Courses"
        title="A focused, intensive push during the school holidays"
        description="Short, high-intensity courses during Easter, half-term and summer — ideal for a concentrated push on a specific subject or weak area."
        actions={
          <Button href="#pricing" size="lg">
            View Holiday Dates <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Course Calendar" title="Three windows across the year" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {COURSES.map((c) => (
              <div key={c.name} className="rounded-2xl border border-line bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy">
                  {c.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{c.name}</h3>
                <p className="mt-1 text-sm text-muted">{c.dates}</p>
                <Badge variant="cream" className="mt-3">{c.focus}</Badge>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-20">
        <Container>
          <SectionHeading eyebrow="What's Included" title="A genuine intensive, not a holiday club" />
          <div className="mt-10">
            <FeatureGrid items={FEATURES} columns={3} />
          </div>
        </Container>
      </section>

      <section id="pricing" className="py-20">
        <Container className="flex flex-col items-center">
          <SectionHeading align="center" eyebrow="Pricing" title="One simple weekly rate" />
          <div className="mt-10 w-full max-w-sm">
            {HOLIDAY_PRICING.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Max subscribers receive a discount automatically.
          </p>
        </Container>
      </section>

      <CTASection
        title="Reserve a place on the next booster course"
        description="Spaces are limited to keep groups small."
        actions={
          <Button href="/book-a-call?product=holiday-booster" size="lg">
            Enquire About Holiday Booster <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
