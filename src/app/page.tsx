import Link from "next/link";
import {
  ClipboardCheck,
  Repeat,
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
import { ProductLadder } from "@/components/sections/product-ladder";
import { CTASection } from "@/components/sections/cta-section";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { MockReportPreview } from "@/components/sections/mock-report-preview";
import { TryAQuestion } from "@/components/sections/try-a-question";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";
import { YearGroupPicker } from "@/components/sections/year-group-picker";
import { MOCK_CLUB_PRICING } from "@/data/pricing";
import { UPSELL_PRODUCTS } from "@/data/products";
import { Magnetic } from "@/components/motion/magnetic";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ScrollStoryRail } from "@/components/motion/scroll-story-rail";
import { TiltCard } from "@/components/motion/tilt-card";
import { WarpGrid } from "@/components/motion/warp-grid";
import { MiniScene } from "@/components/motion/mini-scene";
import { PullQuote } from "@/components/ui/pull-quote";

const START_HERE = [
  {
    icon: <Gauge className="h-6 w-6" />,
    title: "I want to know my child's level",
    description: "Book a diagnostic assessment and receive a clear improvement plan.",
    cta: "Book Diagnostic Assessment",
    href: "/diagnostic-assessment",
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "I want weekly exam practice",
    description: "Join Weekly Mock Club for timed papers, scores and progress tracking.",
    cta: "Join Mock Club",
    href: "/weekly-mock-club",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "I want teaching and support",
    description: "Choose private or small group tuition for structured 11+ preparation.",
    cta: "View Tuition Plans",
    href: "/tuition",
  },
];

const DIAGNOSTIC_FEATURES = [
  { icon: <Gauge className="h-5 w-5" />, title: "Overall readiness score" },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Subject-by-subject breakdown" },
  { icon: <Target className="h-5 w-5" />, title: "Topic weaknesses" },
  { icon: <Timer className="h-5 w-5" />, title: "Timing analysis" },
  { icon: <FileSearch className="h-5 w-5" />, title: "Accuracy analysis" },
  { icon: <ListChecks className="h-5 w-5" />, title: "Recommended learning plan" },
];

const SIMULATOR_FEATURES = [
  { icon: <Timer className="h-5 w-5" />, title: "Timed papers" },
  { icon: <Gauge className="h-5 w-5" />, title: "Instant scoring" },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Topic breakdown" },
  { icon: <Target className="h-5 w-5" />, title: "Accuracy tracking" },
  { icon: <ListChecks className="h-5 w-5" />, title: "Attempt history" },
  { icon: <Compass className="h-5 w-5" />, title: "Recommended next paper" },
];

const HOW_IT_WORKS = [
  { icon: <FileSearch className="h-5 w-5" />, title: "Diagnose", description: "Assess current level across all four 11+ areas." },
  { icon: <Compass className="h-5 w-5" />, title: "Plan", description: "Get a clear, prioritised improvement plan." },
  { icon: <PenLine className="h-5 w-5" />, title: "Practise", description: "Tuition, mocks and practice papers, targeted at weak areas." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Improve", description: "Close gaps with focused, repeated practice." },
  { icon: <Repeat2 className="h-5 w-5" />, title: "Track progress", description: "Regular reports show exactly how your child is moving forward." },
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
    items: ["Free Call", "Diagnostic", "Mock Club", "Tuition", "Complete Programme"],
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
    items: ["Register", "Pay", "Admin approves", "Mock unlocked", "Student completes", "Report released"],
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

      {/* Start Here */}
      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <div className="flex items-start justify-between gap-6">
              <SectionHeading eyebrow="Start Here" title="Tell us what you need — we'll point you to the right place" />
              <MiniScene geometry="pen-paper" className="hidden h-32 w-32 shrink-0 sm:block" />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {START_HERE.map((item) => (
                <Card key={item.title} className="flex flex-col p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                  <Button href={item.href} variant="outline" className="mt-6 w-fit">
                    {item.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12} className="mt-10">
            <YearGroupPicker />
          </RevealOnScroll>
        </Container>
      </section>

      {/* Product ladder */}
      <section className="bg-cream-dark/50 py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="The Full Picture"
              title="From a free call to a fully managed programme"
              description="Start wherever makes sense for your family, and build up as your child gets closer to exams."
            />
            <div className="mt-10">
              <ProductLadder />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Diagnostic Assessment */}
      <section id="diagnostic" className="relative py-20">
        <MiniScene geometry="peak" className="pointer-events-none absolute -right-4 top-8 hidden h-36 w-36 opacity-80 lg:block" />
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

      {/* Weekly Mock Club */}
      <section id="mocks" className="relative bg-navy py-20">
        <MiniScene geometry="seal" className="pointer-events-none absolute left-8 top-8 hidden h-32 w-32 opacity-80 lg:block" />
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="Weekly Mock Club"
              title="Weekly 11+ mock exams with clear parent reports"
              description="Students sit regular timed mocks and parents receive useful feedback, not just a score."
              className="mx-auto text-cream [&_h2]:text-white [&_p]:text-cream/70"
            />
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {MOCK_CLUB_PRICING.map((tier) => (
                <PricingCard key={tier.id} tier={tier} />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Practice Paper Simulator */}
      <section className="py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Card className="order-2 lg:order-1">
            <div className="p-7">
              <div className="flex items-center justify-between">
                <Badge variant="navy">Live simulator preview</Badge>
                <span className="text-xs font-medium text-muted">12:48 remaining</span>
              </div>
              <div className="mt-5 space-y-3">
                {["Comprehension — Section A", "Maths — Section B", "Verbal Reasoning — Section C"].map((s, i) => (
                  <div key={s} className="flex items-center justify-between rounded-xl border border-line p-3.5">
                    <span className="text-sm font-medium text-navy">{s}</span>
                    <Badge variant={i === 0 ? "success" : "cream"}>{i === 0 ? "Complete" : "Pending"}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div className="order-1 lg:order-2">
            <RevealOnScroll>
              <SectionHeading
                eyebrow="Practice Paper Simulator"
                title="Practice papers that feel like real 11+ mocks"
                description="Children complete timed online practice papers across English, maths, verbal reasoning and non-verbal reasoning. Parents can see results and improvement areas immediately."
              />
              <div className="mt-8">
                <FeatureGrid items={SIMULATOR_FEATURES} columns={2} />
              </div>
              <Button href="/practice-paper-simulator" size="lg" className="mt-8">
                Try Practice Paper Simulator <ArrowRight className="h-4 w-4" />
              </Button>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Tuition comparison */}
      <section className="bg-cream-dark/50 py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Tuition"
              title="Group, private, or the complete system"
              description="Compare the three ways to get structured teaching support — and see why most families choose the Complete 11+ Programme."
            />
            <div className="mt-10">
              <ComparisonTable />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/tuition/group" variant="outline">Group Tuition</Button>
              <Button href="/tuition/private" variant="outline">Private Tuition</Button>
              <Button href="/complete-programme">Apply for Complete Programme</Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Complete Programme */}
      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-navy">
              <MiniScene geometry="seal" className="absolute -right-8 -top-8 z-10 hidden h-40 w-40 opacity-90 sm:block" />
              <div className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <Badge variant="gold">Best Value</Badge>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    The complete 11+ preparation system
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-cream/70">
                    Diagnostic assessment, weekly group tuition, weekly mocks, simulator access,
                    monthly reports and parent check-ins — combined into one managed plan.
                  </p>
                  <Button href="/complete-programme" size="lg" className="mt-8">
                    Apply for Complete Programme <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <ul className="space-y-3 rounded-2xl bg-white/5 p-6">
                  {[
                    "Initial diagnostic assessment",
                    "Weekly group tuition",
                    "Weekly mock exams",
                    "Practice Paper Simulator access",
                    "Monthly progress reports",
                    "Weak-area tracking",
                    "Termly parent check-ins",
                    "Holiday booster discount",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-cream/90">
                      <Sparkles className="h-4 w-4 shrink-0 text-gold-light" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Upsells */}
      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Add-Ons"
              title="Add extra support when your child needs it"
              description="Flexible, one-off ways to close a specific gap without committing to a new subscription."
            />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {UPSELL_PRODUCTS.map((u) => (
                <TiltCard key={u.name} className="h-full">
                  <Link
                    href={u.href}
                    className="premium-card-hover cursor-pencil flex h-full flex-col rounded-2xl border border-line bg-white p-6"
                  >
                    <h3 className="text-base font-semibold text-navy">{u.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{u.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                      <span className="text-sm font-bold text-navy">{u.price}</span>
                      <ArrowRight className="h-4 w-4 text-gold-dark" />
                    </div>
                  </Link>
                </TiltCard>
              ))}
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
            <div className="flex items-start justify-between gap-6">
              <SectionHeading
                eyebrow="Platform Map"
                title="The full Summit Tuition operating system"
                description="The public site, student portal, admin approval flow and report release process all point to one outcome: clearer improvement decisions after every mock."
              />
              <MiniScene geometry="peak" className="hidden h-32 w-32 shrink-0 sm:block" />
            </div>
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

      {/* Trust */}
      <section className="py-20">
        <Container>
          <RevealOnScroll>
            <div className="flex items-start justify-between gap-6">
              <SectionHeading eyebrow="Why Parents Choose Us" title="Built to be honest, not just reassuring" />
              <MiniScene geometry="pen-paper" className="hidden h-32 w-32 shrink-0 sm:block" />
            </div>
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

      <CTASection
        eyebrow="Next Step"
        title="Ready to see exactly where your child stands?"
        description="Book a free 15-minute call and we'll help you choose the right starting point."
        decoration={
          <MiniScene geometry="peak" className="pointer-events-none absolute right-8 top-8 hidden h-36 w-36 opacity-80 sm:block" />
        }
        actions={
          <>
            <Magnetic>
              <Button href="/book-a-call" size="lg">
                Book a Free Parent Call
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/diagnostic-assessment" variant="light" size="lg">
                Book Diagnostic Assessment
              </Button>
            </Magnetic>
          </>
        }
      />

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
