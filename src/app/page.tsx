import Link from "next/link";
import {
  ClipboardCheck,
  Users,
  ArrowRight,
  Gauge,
  ListChecks,
  Timer,
  Target,
  BarChart3,
  FileSearch,
  ShieldCheck,
  Compass,
  PenLine,
  Repeat2,
  TrendingUp,
  Sparkles,
  Moon,
  Printer,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/platform/ui";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PricingCard } from "@/components/ui/pricing-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { HeroSection } from "@/components/sections/hero-section";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { MockReportPreview } from "@/components/sections/mock-report-preview";
import { TryAQuestion } from "@/components/sections/try-a-question";
import { FreeSampleMock } from "@/components/sections/free-sample-mock";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";
import { PLATFORM_TIER_PRICING_FOR_SALE } from "@/data/pricing";
import { Magnetic } from "@/components/motion/magnetic";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ScrollStoryRail } from "@/components/motion/scroll-story-rail";
import { TiltCard } from "@/components/motion/tilt-card";
import { WarpGrid } from "@/components/motion/warp-grid";
import { PullQuote } from "@/components/ui/pull-quote";

const DIAGNOSTIC_FEATURES = [
  { icon: <Gauge className="h-5 w-5" />, title: "Overall readiness score" },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Subject-by-subject breakdown" },
  { icon: <Target className="h-5 w-5" />, title: "Topic weaknesses" },
  { icon: <Timer className="h-5 w-5" />, title: "Timing analysis" },
  { icon: <FileSearch className="h-5 w-5" />, title: "Accuracy analysis" },
  { icon: <ListChecks className="h-5 w-5" />, title: "Recommended learning plan" },
];

const HOW_IT_WORKS = [
  { icon: <FileSearch className="h-5 w-5" />, title: "Diagnose", description: "Assess current level across all four 11+ areas." },
  { icon: <Compass className="h-5 w-5" />, title: "Plan", description: "Get a clear, prioritised improvement plan." },
  { icon: <PenLine className="h-5 w-5" />, title: "Practise", description: "Tuition, mocks and practice papers, targeted at weak areas." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Improve", description: "Close gaps with focused, repeated practice." },
  { icon: <Repeat2 className="h-5 w-5" />, title: "Track progress", description: "Regular reports show exactly how your child is moving forward." },
];

const FAMILY_FEATURES = [
  { icon: <Users className="h-5 w-5" />, title: "Parent / family dashboard", description: "Lessons remaining, upcoming lesson times, and a payments view — one place to see where things stand." },
  { icon: <Moon className="h-5 w-5" />, title: "Student account settings", description: "Your child can update their name and password, and switch their dashboard to dark mode." },
  { icon: <Printer className="h-5 w-5" />, title: "Printable practice papers", description: "Offline, pen-and-paper practice for exam day realism — separate from scored online mocks." },
];

const TRUST_STATEMENTS = [
  {
    statement: "Every tutor is DBS-checked and trained in our safeguarding policy before working with any child.",
    context: "Safeguarding",
  },
  {
    statement: "Mocks and materials are built around GL Assessment and CEM-style question formats.",
    context: "Exam coverage",
  },
  {
    statement: "Every product comes with a parent-facing report — no guessing where your child stands.",
    context: "Transparent reporting",
  },
];

const PLATFORM_DIAGRAMS = [
  {
    title: "Product funnel",
    items: ["Free Call", "Diagnostic", "Free Sample", "Pro", "Max"],
  },
  {
    title: "Improvement cycle",
    items: ["Diagnose", "Practise", "Review", "Improve", "Track"],
  },
  {
    title: "Preparation timeline",
    items: ["Year 4 Foundations", "Year 5 Build-Up", "Mock Season", "Final Sprint", "Exam Confidence"],
  },
  {
    title: "Access flow",
    items: ["Register", "Instant account access", "Admin unlocks your mocks", "Student completes", "Report released"],
  },
];

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <WarpGrid />
      <HeroSection
        eyebrow="11+ Preparation, Done Properly"
        title="Premium 11+ mocks and progress reports that show students exactly what to improve next"
        description="Summit Tuition combines interactive online English and maths mocks, manual report release, diagnostic assessments and tuition support for selective entrance preparation."
        visual={<TryAQuestion />}
        actions={
          <>
            <Magnetic>
              <Button href="/diagnostic-assessment" variant="navy" size="lg">
                Start with a Diagnostic Assessment
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/book-a-call" size="lg">
                Book a Free Parent Call
              </Button>
            </Magnetic>
            <Link href="/login" className="inline-flex h-12 items-center justify-center text-sm font-bold text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold-dark">
              Student Login
            </Link>
          </>
        }
      />

      {/* Free sample mock */}
      <section className="bg-cream-dark/50 py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="Try It Yourself"
              title="Try 10 real questions right now"
              description="5 maths, 5 spot-the-grammar-mistake. No account needed — see exactly what a Summit Tuition mock feels like before you sign up for anything."
            />
            <div className="mt-10 mx-auto max-w-xl">
              <FreeSampleMock />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Taster session / free call / create account */}
      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="Next Step"
              title="Book a free taster, or jump straight in"
              description="No pressure, no obligation — try before you commit to anything."
            />
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="flex flex-col items-center p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy">Free taster session or parent call</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Sit a free taster tuition session with a real tutor, or book a 15-minute call to talk through
                  what your child needs.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Magnetic>
                    <Button href="/book-a-call?product=free-taster" size="lg">
                      Book Free Taster Session
                    </Button>
                  </Magnetic>
                  <Magnetic>
                    <Button href="/book-a-call" variant="outline" size="lg">
                      Book a Free Call
                    </Button>
                  </Magnetic>
                </div>
              </Card>
              <Card className="flex flex-col items-center p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy">Create your account</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Get instant access to a free mock in every subject and your first Study Notes topic — no
                  card required.
                </p>
                <div className="mt-6">
                  <Magnetic>
                    <Button href="/account" size="lg">
                      Create Account <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Magnetic>
                </div>
              </Card>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Pro & Max — simple pricing */}
      <section id="mocks" className="bg-navy py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="Pricing"
              title="Pro or Max — that's it"
              description="Full mock library, Study Notes and timed practice papers. Parents get a clear report after every mock, not just a score."
              className="mx-auto text-cream [&_h2]:text-white [&_p]:text-cream/70"
            />
            <div className="mt-12 mx-auto grid w-full max-w-3xl gap-6 sm:grid-cols-2">
              {PLATFORM_TIER_PRICING_FOR_SALE.map((tier) => (
                <PricingCard key={tier.id} tier={tier} />
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-cream/60">
              Just want to try it first? <Link href="/account" className="font-bold text-gold-light underline">Create a free account</Link>
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Tuition comparison */}
      <section className="bg-cream-dark/50 py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Tuition"
              title="Group or private teaching support"
              description="A separate add-on — structured teaching support alongside your Pro or Max subscription."
            />
            <div className="mt-10">
              <ComparisonTable />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/tuition/group" variant="outline">Group Tuition</Button>
              <Button href="/tuition/private" variant="outline">Private Tuition</Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Diagnostic pointer */}
      <section className="py-10">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-white px-6 py-5 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 shrink-0 text-gold-dark" />
                <p className="text-sm text-muted">
                  Not sure where your child stands? A <span className="font-bold text-navy">Diagnostic Assessment</span> gives
                  you a full readiness report in one sitting.
                </p>
              </div>
              <Button href="/diagnostic-assessment" variant="outline" className="shrink-0">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Diagnostic Assessment detail */}
      <section id="diagnostic" className="py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Diagnostic Assessment"
              title="Find out exactly what your child needs to improve"
              description="The diagnostic assessment tests your child across the key 11+ areas and gives you a clear report showing their current level, strengths, weak topics, timing issues and recommended next steps."
            />
            <div className="mt-8">
              <FeatureGrid items={DIAGNOSTIC_FEATURES} columns={2} />
            </div>
            <Button href="/diagnostic-assessment" size="lg" className="mt-8">
              Book Diagnostic Assessment <ArrowRight className="h-4 w-4" />
            </Button>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="space-y-6">
              <MockReportPreview />
              <BeforeAfterSlider />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-navy py-24">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="How It Works"
              title="A clear, structured path to exam day"
              className="mx-auto text-cream [&_h2]:text-white [&_p]:text-cream/70"
            />
            <div className="mt-14">
              <ScrollStoryRail steps={HOW_IT_WORKS.map((s) => ({ title: s.title, text: s.description }))} />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <PullQuote>
            &ldquo;We don&apos;t promise a place at a grammar school — we promise your child will know
            exactly what to fix before exam day.&rdquo;
          </PullQuote>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Platform Map"
              title="The full Summit Tuition operating system"
              description="The public site, student portal, admin mock-unlock flow and report release process all point to one outcome: clearer improvement decisions after every mock."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {PLATFORM_DIAGRAMS.map((diagram) => (
                <Card key={diagram.title} className="p-6">
                  <h3 className="text-lg font-bold text-navy">{diagram.title}</h3>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {diagram.items.map((item, index) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-2 text-xs font-bold text-navy">{item}</span>
                        {index < diagram.items.length - 1 && <ArrowRight className="h-4 w-4 text-gold-dark" />}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
              <Card className="p-6 lg:col-span-2">
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <h3 className="text-lg font-bold text-navy">Dashboard and report preview</h3>
                    <p className="mt-2 text-sm text-muted">Students see readiness, subject bars, weak topics and a recommended next step after admin releases the report.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="gold-shimmer rounded-2xl bg-cream p-4"><p className="text-3xl font-black text-navy"><AnimatedCounter value={78} suffix="%" /></p><p className="text-sm text-muted">Readiness score</p></div>
                    <div className="rounded-2xl bg-cream p-4"><p className="text-sm font-bold text-navy">Subject bars</p><div className="mt-3 space-y-2"><span className="block h-2 rounded-full bg-gold" /><span className="block h-2 w-2/3 rounded-full bg-navy" /></div></div>
                    <div className="rounded-2xl bg-cream p-4"><p className="text-sm font-bold text-navy">Next step</p><p className="mt-2 text-xs text-muted">Ratio practice pack before the next timed mock.</p></div>
                  </div>
                </div>
              </Card>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Family features */}
      <section className="bg-cream-dark/50 py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Built For The Whole Family"
              title="Every account comes with more than just mocks"
              description="Once you're in, students and parents each get their own dedicated space."
            />
            <div className="mt-10">
              <FeatureGrid items={FAMILY_FEATURES} columns={3} />
            </div>
            <div className="mt-8">
              <Button href="/account" size="lg">
                Create Your Free Account <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Trust */}
      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading eyebrow="Why Parents Choose Us" title="Built to be honest, not just reassuring" />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {TRUST_STATEMENTS.map((t) => (
                <TiltCard key={t.context} className="h-full">
                  <TestimonialCard statement={t.statement} context={t.context} className="h-full" />
                </TiltCard>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 text-sm text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <p>
                Results vary by child, and admissions rules and test formats vary by school and local
                authority — we won&apos;t promise a guaranteed grammar school place, and we&apos;d be
                cautious of anyone who does.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Holiday Booster — own section, bottom of page */}
      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <div className="overflow-hidden rounded-3xl border border-gold/40 bg-navy">
              <div className="p-8 text-center sm:p-12">
                <Badge variant="gold">Most Popular</Badge>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Holiday Booster Course — everything, all included
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-cream/70">
                  Private tuition, timed mocks and daily feedback combined into one intensive week —
                  the fastest way to close gaps before the next school holiday ends.
                </p>
                <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
                  {[
                    "Private tuition + mocks + holiday help",
                    "Small group sizes",
                    "All four 11+ subject areas covered",
                    "Daily mini-mock with feedback",
                    "Take-home revision pack",
                    "Everything included — no add-ons needed",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-cream/90">
                      <Sparkles className="h-4 w-4 shrink-0 text-gold-light" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Magnetic>
                    <Button href="/holiday-booster" size="lg">
                      View Holiday Dates <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Magnetic>
                  <Magnetic>
                    <Button href="/book-a-call?product=holiday-booster" variant="light" size="lg">
                      Book a Free Call
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-12">
        <Container className="flex items-center gap-3 rounded-2xl border border-line bg-white px-6 py-4 text-sm text-muted">
          <ClipboardCheck className="h-4 w-4 shrink-0 text-gold-dark" />
          11+ tutor and 11+ mock exams in your area — ask us about local in-person sessions
          alongside our online programme.
        </Container>
      </section>
    </>
  );
}
