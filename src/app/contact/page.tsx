import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero-section";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { RevealOnScroll, StaggerReveal } from "@/components/platform/ui";
import { SITE } from "@/data/site";
import type { InterestedProduct } from "@/types/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE.name} to ask about 11+ tuition, mocks, diagnostic assessments or the Complete 11+ Programme.`,
};

const PRODUCT_MAP: Record<string, InterestedProduct> = {
  "diagnostic-assessment": "Diagnostic Assessment",
  "weekly-mock-club": "Weekly Mock Club",
  "practice-paper-simulator": "Practice Paper Simulator",
  "private-tuition": "Private Tuition",
  "group-tuition": "Group Tuition",
  "complete-programme": "Complete 11+ Programme",
  "holiday-booster": "Holiday Booster",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const defaultProduct = params.product ? PRODUCT_MAP[params.product] : undefined;

  return (
    <>
      <HeroSection
        eyebrow="Contact"
        title="Get in touch"
        description="Tell us a little about your child and what you're looking for, and we'll come back to you within one working day."
      />

      <section className="pb-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <StaggerReveal className="space-y-4 lg:col-span-1">
            <div className="rounded-2xl border border-line bg-white p-5">
              <Mail className="h-5 w-5 text-gold-dark" />
              <p className="mt-2 text-sm font-semibold text-navy">Email</p>
              <a href={`mailto:${SITE.email}`} className="text-sm text-muted hover:text-navy">
                {SITE.email}
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <MapPin className="h-5 w-5 text-gold-dark" />
              <p className="mt-2 text-sm font-semibold text-navy">Location</p>
              <p className="text-sm text-muted">{SITE.address}</p>
            </div>
          </StaggerReveal>
          <RevealOnScroll className="lg:col-span-2" delay={0.08}>
            <EnquiryForm defaultProduct={defaultProduct} />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
