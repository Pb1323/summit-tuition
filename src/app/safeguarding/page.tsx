import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero-section";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: `${SITE.name}'s safeguarding policy for tutors, mock invigilators and online sessions with children.`,
};

const SECTIONS = [
  {
    title: "Our commitment",
    body: "The safety and wellbeing of every child we work with comes before anything else. All staff and tutors follow this policy, and it is reviewed regularly to reflect current best practice for working with children in an education setting.",
  },
  {
    title: "Tutor and staff checks",
    body: "Every tutor, invigilator and member of staff who works directly with children undergoes an enhanced DBS (Disclosure and Barring Service) check before starting work with us, and completes safeguarding training covering child protection, online safety and reporting procedures.",
  },
  {
    title: "Online sessions",
    body: "Online tuition, mocks and the Practice Paper Simulator are designed with appropriate safeguards: sessions are conducted through monitored platforms, a parent or guardian must be contactable during any live session, and all communication with children is kept professional and on-platform.",
  },
  {
    title: "In-person sessions",
    body: "In-person sessions take place in suitable, supervised settings. Group sizes are kept small enough for proper supervision, and a designated safeguarding lead is contactable at all times during sessions.",
  },
  {
    title: "Reporting a concern",
    body: `If you have a safeguarding concern about any session, tutor or interaction, please contact us immediately at ${SITE.email}. All concerns are treated seriously and investigated promptly.`,
  },
  {
    title: "Data and privacy",
    body: "Any information collected about a child as part of preparation — assessment results, reports, session notes — is handled in line with our Privacy Policy and is only ever shared with the child's parent or guardian.",
  },
];

export default function SafeguardingPage() {
  return (
    <>
      <HeroSection
        eyebrow="Safeguarding"
        title="Safeguarding Policy"
        description="Our approach to keeping every child safe, online and in person."
      />
      <section className="pb-20">
        <Container className="max-w-3xl space-y-10">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
            <p className="text-sm leading-relaxed text-muted">
              This policy applies to every member of staff, tutor and invigilator working with{" "}
              {SITE.name}, across both online and in-person sessions.
            </p>
          </div>
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
