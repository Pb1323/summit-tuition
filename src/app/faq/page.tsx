import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { RevealOnScroll } from "@/components/platform/ui";
import { FAQ_ITEMS } from "@/data/faq";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    `Answers to common questions about 11+ tuition, mock exams, diagnostic assessments and how ${SITE.name} works.`,
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HeroSection
        eyebrow="FAQ"
        title="Common questions from parents"
        description="If you can't find what you're looking for here, a free parent call is the fastest way to get an answer."
        align="center"
      />

      <section className="pb-20">
        <Container className="max-w-3xl">
          <RevealOnScroll>
            <FAQAccordion items={FAQ_ITEMS} />
          </RevealOnScroll>
        </Container>
      </section>

      <CTASection
        title="Still have questions?"
        description="Book a free 15-minute call and we'll talk it through."
        actions={
          <>
            <Button href="/book-a-call" size="lg">
              Book a Free Parent Call <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/contact" variant="light" size="lg">
              Send an Enquiry
            </Button>
          </>
        }
      />
    </>
  );
}
