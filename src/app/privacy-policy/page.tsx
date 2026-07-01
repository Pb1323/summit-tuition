import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero-section";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects personal data.`,
};

const SECTIONS = [
  {
    title: "Who we are",
    body: `${SITE.name} ("we", "us") provides 11+ tuition, mock exams, diagnostic assessments and related preparation products to families in the UK. This policy explains how we collect and use personal data when you use our website and services.`,
  },
  {
    title: "What we collect",
    body: "We collect information you provide directly — such as a parent's name, email, phone number, a child's year group, target school, and enquiry details — along with assessment and mock exam results for any child enrolled in our products, and standard website usage data (e.g. via analytics cookies).",
  },
  {
    title: "How we use it",
    body: "We use this information to respond to enquiries, deliver the products you've purchased or subscribed to, produce assessment and progress reports, process payments, and occasionally send relevant updates about your child's preparation (you can opt out at any time).",
  },
  {
    title: "Who we share it with",
    body: "We do not sell personal data. We share data only where necessary to deliver our service — for example, with payment processors (such as Stripe) to handle subscriptions and one-off payments, and with tutors directly working with your child.",
  },
  {
    title: "How long we keep it",
    body: "We retain enquiry and account data for as long as you remain a customer or prospective customer, and for a reasonable period afterwards to meet legal and accounting obligations. You can request deletion of your data at any time, subject to those obligations.",
  },
  {
    title: "Your rights",
    body: "Under UK GDPR, you have the right to access, correct, or request deletion of your personal data, and to object to or restrict certain processing. To exercise any of these rights, contact us using the details below.",
  },
  {
    title: "Contact",
    body: `For any privacy questions or requests, contact us at ${SITE.email}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeroSection
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: June 2026. This policy explains how we handle personal data."
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
