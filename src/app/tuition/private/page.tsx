import type { Metadata } from "next";
import { ArrowRight, User, Target, MessageSquare, NotebookPen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PricingCard } from "@/components/ui/pricing-card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { PRIVATE_TUITION_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Private 11+ Tuition — 1:1 Tutoring",
  description:
    "Premium, personalised 1:1 tuition for children preparing for the 11+. Sessions built around your child's diagnostic results and weak areas.",
};

const FEATURES = [
  { icon: <User className="h-5 w-5" />, title: "1:1, fully personalised", description: "Every session is built around your child, not a fixed syllabus." },
  { icon: <Target className="h-5 w-5" />, title: "Built around diagnostic results", description: "We start from a clear picture of strengths and weak areas." },
  { icon: <NotebookPen className="h-5 w-5" />, title: "Tutor notes after every session", description: "Know exactly what was covered and what's next." },
  { icon: <MessageSquare className="h-5 w-5" />, title: "Direct messaging with your tutor", description: "Ask questions between sessions, not just during them." },
];

export default function PrivateTuitionPage() {
  return (
    <>
      <HeroSection
        eyebrow="Private Tuition"
        title="1:1 tutoring, targeted at exactly what your child needs"
        description="Premium, personalised tutoring for children who need focused, fast-moving support — built around your child's specific weak areas, not a generic curriculum."
        actions={
          <Button href="#pricing" size="lg">
            Enquire About Private Tuition <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Why Private Tuition" title="The fastest way to close a specific gap" />
          <div className="mt-10">
            <FeatureGrid items={FEATURES} columns={2} />
          </div>
        </Container>
      </section>

      <section id="pricing" className="bg-cream-dark/50 py-20">
        <Container className="flex flex-col items-center">
          <SectionHeading align="center" eyebrow="Pricing" title="Flexible, pay-as-you-go sessions" />
          <div className="mt-10 w-full max-w-sm">
            {PRIVATE_TUITION_PRICING.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to give your child focused 1:1 support?"
        actions={
          <>
            <Button href="/book-a-call?product=private-tuition" size="lg">
              Enquire About Private Tuition <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/book-a-call?product=private-tuition&trial=1" variant="light" size="lg">
              Book a Trial Session
            </Button>
          </>
        }
      />
    </>
  );
}
