import type { Metadata } from "next";
import { ArrowRight, Users, BookOpenCheck, CalendarCheck, ClipboardList } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PricingCard } from "@/components/ui/pricing-card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { GROUP_TUITION_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Group 11+ Tuition — Small Group Classes",
  description:
    "Small-group weekly 11+ tuition covering English, maths, verbal and non-verbal reasoning, with a structured curriculum and termly progress reports.",
};

const FEATURES = [
  { icon: <Users className="h-5 w-5" />, title: "Small group sizes", description: "Maximum 6 students per class, so every child gets attention." },
  { icon: <BookOpenCheck className="h-5 w-5" />, title: "Structured curriculum", description: "A term-by-term plan covering the full 11+ syllabus." },
  { icon: <CalendarCheck className="h-5 w-5" />, title: "Consistent weekly rhythm", description: "The same time, same group, every week — easy to build into family routine." },
  { icon: <ClipboardList className="h-5 w-5" />, title: "Termly progress report", description: "A clear written update on progress and next focus areas." },
];

export default function GroupTuitionPage() {
  return (
    <>
      <HeroSection
        eyebrow="Group Tuition"
        title="Small-group weekly tuition covering all key 11+ subjects"
        description="A lower-cost, structured way to build consistent progress — children learn alongside a small group of peers at a similar level."
        actions={
          <Button href="#pricing" size="lg">
            Enquire About Group Tuition <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Why Group Tuition" title="Steady, structured progress at a lower cost" />
          <div className="mt-10">
            <FeatureGrid items={FEATURES} columns={2} />
          </div>
        </Container>
      </section>

      <section id="pricing" className="bg-cream-dark/50 py-20">
        <Container className="flex flex-col items-center">
          <SectionHeading align="center" eyebrow="Pricing" title="One monthly rate, billed termly in advance" />
          <div className="mt-10 w-full max-w-sm">
            {GROUP_TUITION_PRICING.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Find your child's group"
        description="Tell us their year group and target area and we'll match them to the right class."
        actions={
          <Button href="/book-a-call?product=group-tuition" size="lg">
            Enquire About Group Tuition <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
