import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero-section";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and conditions for using ${SITE.name}'s website and products.`,
};

const SECTIONS = [
  {
    title: "Agreement to terms",
    body: `By booking a call, purchasing a product, or subscribing to a service through this website, you agree to these terms on behalf of yourself and any child you enrol with ${SITE.name}.`,
  },
  {
    title: "Our products",
    body: "We provide diagnostic assessments, mock exams, a practice paper simulator, tuition (group and private), the Complete 11+ Programme, holiday booster courses, and downloadable practice packs. Specific inclusions for each product are described on the relevant product page.",
  },
  {
    title: "No guaranteed outcomes",
    body: "We do not and cannot guarantee a grammar school or selective school place. Outcomes depend on many factors outside our control, including each school's specific admissions criteria, competition levels, and the local authority's process. Test formats also vary by school and local authority. Our role is to prepare your child as effectively as possible and report honestly on their progress.",
  },
  {
    title: "Subscriptions and cancellation",
    body: "Weekly Mock Club, Practice Paper Simulator and ongoing tuition subscriptions are billed monthly and can be cancelled at any time with no long-term tie-in. Cancellation takes effect at the end of the current billing period.",
  },
  {
    title: "One-off products",
    body: "The Diagnostic Assessment, Holiday Booster Courses and Practice Packs are one-off purchases. Refund requests are considered on a case-by-case basis — contact us if a course needs to be rearranged or cancelled.",
  },
  {
    title: "Payment",
    body: "Payments are processed securely via our payment provider (Stripe). We do not store full card details on our own systems.",
  },
  {
    title: "Acceptable use",
    body: "Practice papers, mock exam content and practice packs are licensed for use by the enrolled child and their family only, and may not be redistributed, resold or shared publicly.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of our products after an update constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact",
    body: `Questions about these terms can be sent to ${SITE.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <HeroSection
        eyebrow="Legal"
        title="Terms and Conditions"
        description="Last updated: June 2026. Please read these terms carefully before using our products."
      />
      <section className="pb-20">
        <Container className="max-w-3xl space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold text-navy">{s.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
