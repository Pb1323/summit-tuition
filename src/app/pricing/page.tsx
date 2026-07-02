import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "@/components/ui/pricing-card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { ALL_PRICING_GROUPS } from "@/data/pricing";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Pricing — 11+ Tuition, Mocks & Diagnostic Assessments",
  description:
    `Transparent pricing for every ${SITE.name} product: diagnostic assessment, practice paper simulator, weekly mock club, tuition and the Complete 11+ Programme.`,
};

export default function PricingPage() {
  return (
    <>
      <HeroSection
        eyebrow="Pricing"
        title="Clear pricing, no surprises"
        description="Every product below comes with transparent, parent-facing reporting. Cancel subscriptions any time — no long-term tie-in."
        align="center"
        actions={
          <Button href="/book-a-call" size="lg">
            Not sure where to start? Book a call <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      {ALL_PRICING_GROUPS.map((group, i) => (
        <section key={group.id} className={i % 2 === 0 ? "py-16" : "bg-cream-dark/50 py-16"}>
          <Container>
            <SectionHeading title={group.title} />
            <div
              className={`mt-8 grid grid-cols-1 gap-6 ${
                group.tiers.length === 3
                  ? "lg:grid-cols-3"
                  : "mx-auto max-w-sm"
              }`}
            >
              {group.tiers.map((tier) => (
                <PricingCard key={tier.id} tier={tier} />
              ))}
            </div>
          </Container>
        </section>
      ))}

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
