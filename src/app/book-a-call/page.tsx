import type { Metadata } from "next";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroSection } from "@/components/sections/hero-section";
import { BookingPlaceholder } from "@/components/sections/booking-placeholder";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { RevealOnScroll } from "@/components/platform/ui";
import { SITE } from "@/data/site";
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

const WHAT_TO_EXPECT_PAID_INTENT = [
  "A short call to confirm your child's year group, the right plan and a start date",
  "We take payment there and then (card or bank transfer) or send your Pro/Max checkout link",
  "You're fully set up and ready to start within days",
];

const WHAT_TO_EXPECT_TASTER = [
  "A real 30-45 minute taster tuition session with one of our tutors",
  "A feel for our teaching style before you commit to anything",
  "A quick recommendation on the right next step for your child, no pressure",
];

const WHATSAPP_DISPLAY_NUMBER = "+44 7726 951811";

function whatsappHref(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function WhatsAppFirstCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-gold/25 bg-cream/60 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-gold-dark">Fastest way to reach us</p>
      <h3 className="mt-1.5 flex items-center gap-2 text-lg font-bold text-navy">
        <MessageCircle className="h-5 w-5 text-gold-dark" />
        Message us on WhatsApp
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {WHATSAPP_DISPLAY_NUMBER} — we usually reply within a few hours, often sooner.
      </p>
      <Button href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" size="md" className="mt-4">
        Message Us on WhatsApp
      </Button>
    </div>
  );
}

export default async function BookACallPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; trial?: string }>;
}) {
  const params = await searchParams;
  const defaultProduct = params.product ? PRODUCT_MAP[params.product] : undefined;
  const isTrial = params.trial === "1";
  const isPaidIntent = !isTrial && !!defaultProduct;
  const whatToExpect = isTrial ? WHAT_TO_EXPECT_TASTER : isPaidIntent ? WHAT_TO_EXPECT_PAID_INTENT : WHAT_TO_EXPECT;

  const whatsappMessage = isTrial
    ? "Hi! I'd like to book a free taster session. My child is in Year "
    : isPaidIntent
      ? `Hi! I'd like to get set up with ${defaultProduct}. My child is in Year `
      : "Hi! I'd like to book a free call to talk through my child's 11+ preparation. My child is in Year ";

  return (
    <>
      <HeroSection
        eyebrow={isTrial ? "Book Your Free Taster" : isPaidIntent ? "Next Step Before You Sign Up" : "Book a Call"}
        title={
          isTrial
            ? "Book Your Free Taster Session"
            : isPaidIntent
              ? `Let's Get You Set Up With ${defaultProduct}`
              : "Book a Free Parent Call"
        }
        description={
          isTrial
            ? "Pick a time below and we'll get a free taster session booked in — no ongoing commitment required."
            : isPaidIntent
              ? `This short call confirms the details for ${defaultProduct} and gets you started — it's the fastest way to get your child set up, not a general enquiry line.`
              : "A free 15-minute call helps you choose the right preparation route for your child — no pressure, no hard sell."
        }
      />

      <section className="pb-20">
        <Container>
          {isTrial ? (
            <>
              <RevealOnScroll>
                <div className="mx-auto max-w-3xl">
                  <WhatsAppFirstCard message={whatsappMessage} />
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.06}>
                <SectionHeading
                  align="center"
                  eyebrow="Or pick a time"
                  title="Choose a slot below to book your call"
                />
                <div className="mx-auto mt-8 max-w-3xl">
                  <BookingPlaceholder />
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.12}>
                <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
                  <div>
                    <SectionHeading eyebrow="What to expect" title="What happens on the day" />
                    <ul className="mt-6 space-y-3">
                      {whatToExpect.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <SectionHeading eyebrow="Prefer to send details first?" title="Tell us about your child" />
                    <div className="mt-6">
                      <EnquiryForm
                        defaultProduct={defaultProduct}
                        defaultMessage="I'd like to book a free taster session."
                      />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.18}>
                <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-gold/25 bg-cream/50 p-6 text-center">
                  <p className="text-sm font-bold uppercase tracking-wide text-gold-dark">While you wait</p>
                  <h3 className="mt-2 text-xl font-bold text-navy">Try a free mock in the meantime?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    No need to wait for your session — take a real 10-question mock right now, marked instantly.
                  </p>
                  <Button href="/free-mock" size="md" className="mt-5">
                    Try a free mock
                  </Button>
                </div>
              </RevealOnScroll>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <RevealOnScroll>
                <SectionHeading eyebrow="What to expect" title={isPaidIntent ? "What happens on this call" : "What we'll cover on the call"} />
                <ul className="mt-6 space-y-3">
                  {whatToExpect.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <WhatsAppFirstCard message={whatsappMessage} />
                </div>
                <p className="mt-8 text-sm font-bold text-navy">Or pick a date and time for your call:</p>
                <div className="mt-4">
                  <BookingPlaceholder />
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.08}>
                <SectionHeading eyebrow="Prefer to send details first?" title="Tell us about your child" />
                <div className="mt-6">
                  <EnquiryForm defaultProduct={defaultProduct} />
                </div>
              </RevealOnScroll>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
