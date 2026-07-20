import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroSection } from "@/components/sections/hero-section";
import { BookingPlaceholder } from "@/components/sections/booking-placeholder";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { RevealOnScroll } from "@/components/platform/ui";
import type { InterestedProduct } from "@/types/contact";

export const metadata: Metadata = {
  title: "Book a Free Parent Call",
  description:
    "Book a free 15-minute call to talk through your child's 11+ preparation and find the right starting point — diagnostic assessment, mocks, tuition or Pro/Max.",
};

const PRODUCT_MAP: Record<string, InterestedProduct> = {
  "diagnostic-assessment": "Diagnostic Assessment",
  pro: "Pro",
  max: "Max",
  "private-tuition": "Private Tuition",
  "group-tuition": "Group Tuition",
  "holiday-booster": "Holiday Booster",
};

const WHAT_TO_EXPECT = [
  "A quick chat about your child's year group, target schools and timeline",
  "Honest guidance on whether a diagnostic, mocks, tuition or Pro/Max fits best",
  "No pressure, no hard sell — just a clear recommendation",
];

export default async function BookACallPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; trial?: string }>;
}) {
  const params = await searchParams;
  const defaultProduct = params.product ? PRODUCT_MAP[params.product] : undefined;
  const isTrial = params.trial === "1";

  return (
    <>
      <HeroSection
        eyebrow={isTrial ? "Book a Trial Session" : "Book a Call"}
        title={isTrial ? "Book a Trial Session" : "Book a Free Parent Call"}
        description={
          isTrial
            ? "Tell us a little about your child and we'll get a trial session booked in — no ongoing commitment required."
            : "A free 15-minute call helps you choose the right preparation route for your child — no pressure, no hard sell."
        }
      />

      <section className="pb-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <SectionHeading eyebrow="What to expect" title="What we'll cover on the call" />
            <ul className="mt-6 space-y-3">
              {WHAT_TO_EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <BookingPlaceholder />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <SectionHeading eyebrow="Prefer to send details first?" title="Tell us about your child" />
            <div className="mt-6">
              <EnquiryForm
                defaultProduct={defaultProduct}
                defaultMessage={isTrial ? "I'd like to book a trial session." : undefined}
              />
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
