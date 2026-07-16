import type { Metadata } from "next";
import { ArrowRight, BarChart3, BookOpenCheck, Clock3, FileLock2, LineChart, LockKeyhole, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "@/components/ui/pricing-card";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { MockRouteConfigurator } from "@/components/sections/mock-route-configurator";
import { ScrollStoryRail } from "@/components/motion/scroll-story-rail";
import { DashboardPreview, GlowCard, PremiumBadge, ProgressBar, RevealOnScroll } from "@/components/platform/ui";
import { SignedInMocksNotice } from "@/components/platform/signed-in-mocks-notice";
import { MOCK_CLUB_PRICING } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Online 11+ Mocks",
  description: "Premium online-only 11+ Maths and English mocks with GL-style structure, Summit Stretch difficulty and parent-ready progress reports.",
};

const FEATURES = [
  { icon: <FileLock2 className="h-5 w-5" />, title: "Online-only scored mocks", description: "Marked mocks are completed inside the platform — no PDFs. A separate printable practice section is available for offline paper practice, with no score or report." },
  { icon: <BookOpenCheck className="h-5 w-5" />, title: "GL-style structure", description: "Maths and English mocks follow GL-style topic coverage and question rhythm, with original Summit content." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Summit Stretch", description: "Slightly harder wording, richer inference and more multi-step reasoning without becoming unfair." },
  { icon: <LineChart className="h-5 w-5" />, title: "Released reports", description: "Students submit, wait for marking, then unlock the full review when the report is released." },
];

const CYCLE = [
  ["Register", "Create a student account and choose Mock Club or Diagnostic."],
  ["Admin unlocks", "Payment creates a pending request; admin approves and unlocks mocks manually."],
  ["Sit online", "Students complete timed English and Maths mocks inside the secure mock room."],
  ["Review report", "Scores, wrong answers, mark schemes and weak-topic practice unlock after release."],
];

export default function MocksPage() {
  return (
    <>
      <SignedInMocksNotice />
      <HeroSection
        eyebrow="Online 11+ Mocks"
        title="GL-style online mocks that show students exactly what to improve next"
        description="Summit Tuition mocks are original, online-only papers with slightly harder-than-standard GL-style reasoning, manual report release and clear weak-topic next steps."
        visual={<MockHeroVisual />}
        actions={
          <>
            <Button href="/pricing" size="lg">Join Weekly Mock Club <ArrowRight className="h-4 w-4" /></Button>
            <Button href="/diagnostic-assessment" variant="outline" size="lg">Book Diagnostic Assessment</Button>
            <Button href="/login" variant="ghost" size="lg">Student Login</Button>
          </>
        }
      />

      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Mock Engine"
              title="Built for realistic practice, not downloadable papers"
              description="Students get the discipline of timed exam conditions. Parents get clear reporting. Tutors keep control over release, feedback and access."
            />
          </RevealOnScroll>
          <div className="mt-10">
            <FeatureGrid items={FEATURES} columns={4} />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gold/20 to-transparent" />
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Access Flow"
              title="Register, unlock, complete, review"
              description="The flow is designed around account-based access, manual approval and suspense before the full report is released."
              className="[&_h2]:text-white [&_p]:text-cream/70"
            />
          </RevealOnScroll>
          <div className="mt-10">
            <ScrollStoryRail steps={CYCLE.map(([title, text]) => ({ title, text }))} />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Report Preview"
              title="Every mock points to the next improvement"
              description="After release, students see topic breakdowns, wrong answers, correct answers, explanations, mark schemes and recommended practice."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Weak-topic analysis", "Wrong-answer review", "Admin feedback", "Recommended practice"].map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-white p-4 text-sm font-bold text-navy">{item}</div>
              ))}
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <DashboardPreview />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-cream-dark/40 py-20">
        <Container>
          <RevealOnScroll>
            <MockRouteConfigurator />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-20">
        <Container>
          <SectionHeading align="center" eyebrow="Plans" title="Choose a mock route" description="All mock routes keep papers online-only and release full review after marking." />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {MOCK_CLUB_PRICING.map((tier) => <PricingCard key={tier.id} tier={tier} />)}
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready for a serious mock routine?"
        description="Start with a diagnostic assessment or join Weekly Mock Club for online English and Maths practice with released reports."
        actions={
          <>
            <Button href="/pricing" size="lg">Join Weekly Mock Club <ArrowRight className="h-4 w-4" /></Button>
            <Button href="/book-a-call" variant="light" size="lg">Book a Free Parent Call</Button>
          </>
        }
      />
    </>
  );
}

function MockHeroVisual() {
  return (
    <GlowCard className="mock-paper-stack p-6">
      <div className="flex items-center justify-between">
        <PremiumBadge><LockKeyhole className="mr-1 h-3.5 w-3.5" /> Online only</PremiumBadge>
        <span className="rounded-full bg-navy px-3 py-1 text-xs font-black text-white"><Clock3 className="mr-1 inline h-3.5 w-3.5" /> 30:00</span>
      </div>
      <h3 className="mt-5 text-2xl font-black text-navy">Maths GL-Style Summit Stretch</h3>
      <p className="mt-2 text-sm text-muted">Multi-step reasoning, data handling, geometry and ratio with generated diagrams.</p>
      <div className="mt-6 space-y-4">
        <ProgressBar value={72} label="Readiness score" />
        <ProgressBar value={58} label="Ratio and percentages" />
        <ProgressBar value={84} label="Arithmetic accuracy" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          [BarChart3, "Topic mix"],
          [BookOpenCheck, "Mark scheme"],
          [LineChart, "Weak topics"],
        ].map(([Icon, label]) => {
          const IconComponent = Icon as typeof BarChart3;
          return (
            <div key={label as string} className="rounded-2xl bg-cream p-4 text-center">
              <IconComponent className="mx-auto h-5 w-5 text-gold-dark" />
              <p className="mt-2 text-xs font-black text-navy">{label as string}</p>
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
}
