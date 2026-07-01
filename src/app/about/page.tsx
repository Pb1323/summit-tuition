import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, BarChart3, Users, BookOpenCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${SITE.name} — UK 11+ preparation built on honest reporting, structured teaching and clear progress tracking.`,
};

const VALUES = [
  { icon: <BarChart3 className="h-5 w-5" />, title: "Honest reporting", description: "We show parents exactly where a child stands, including the uncomfortable parts." },
  { icon: <BookOpenCheck className="h-5 w-5" />, title: "Exam-format accuracy", description: "Materials built around real GL and CEM-style formats, not generic worksheets." },
  { icon: <Users className="h-5 w-5" />, title: "Structured, not random", description: "Every plan follows diagnose, plan, practise, improve, track." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Safeguarding first", description: "Every tutor is DBS-checked and trained in our safeguarding policy." },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        eyebrow="About Us"
        title={`Why we built ${SITE.name}`}
        description="Most 11+ preparation tells parents a score and leaves them guessing what it means. We built this business to do the opposite — to show parents exactly what their child needs to improve next, and give them a clear plan to get there."
        actions={
          <Button href="/book-a-call" size="lg">
            Book a Free Parent Call <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Our Approach" title="Diagnose first, teach second" />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              Every child we work with starts from a clear, honest picture of where they stand —
              whether that&apos;s a free parent call or a full diagnostic assessment. From there,
              we build a plan around their specific gaps rather than a one-size-fits-all syllabus.
            </p>
            <p>
              We don&apos;t promise a guaranteed grammar school place, and we&apos;d be cautious of
              any provider who does — admissions criteria, competition levels and test formats vary
              by school and local authority, and are ultimately outside any tutor&apos;s control.
              What we can promise is structured preparation, honest reporting, and a tutor team
              that takes safeguarding seriously.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-20">
        <Container>
          <SectionHeading eyebrow="What We Stand For" title="The principles behind every product" />
          <div className="mt-10">
            <FeatureGrid items={VALUES} columns={4} />
          </div>
        </Container>
      </section>

      <CTASection
        title="Want to talk it through first?"
        description="A free 15-minute call with our team, no obligation."
        actions={
          <Button href="/book-a-call" size="lg">
            Book a Free Parent Call <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    </>
  );
}
