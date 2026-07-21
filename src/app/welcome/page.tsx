import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SITE } from "@/data/site";
import { RevealOnScroll } from "@/components/platform/ui";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { WelcomePricingTabs, WelcomeTuitionPricingTabs } from "@/components/sections/welcome-pricing-tabs";
import { WelcomeStickyCta } from "@/components/sections/welcome-sticky-cta";
import { FreeSampleMock } from "@/components/sections/free-sample-mock";

export const metadata = {
  title: `${SITE.shortName} — Start here`,
  description: "The fastest way to get your child started with Summit Tuition's 11+ mocks and tuition.",
};

const HIGHLIGHTS = [
  "Online 11+ mocks marked by real tutors",
  "Weak-topic reports after every mock",
  "English, Maths, Verbal & Non-Verbal Reasoning",
  "Manual approval — no automated spam accounts",
];

const STATS = [
  { value: 4, suffix: "", label: "11+ subjects covered" },
  { value: 600, suffix: "+", label: "Practice questions a month" },
  { value: 100, suffix: "%", label: "Mocks marked by real tutors" },
];

const PATHS = [
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Know my child's level",
    description: "Book a diagnostic assessment and get a clear improvement plan.",
    cta: "Book Diagnostic",
    href: "/diagnostic-assessment",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Teaching and support",
    description: "Choose private or small-group tuition for structured prep.",
    cta: "View Tuition Plans",
    href: "/tuition",
  },
];

const TRUST_STATEMENTS = [
  { statement: "26 full-length mocks across Maths, English, Verbal and Non-Verbal Reasoning — every one marked by a real tutor, not an algorithm.", context: "Exam coverage" },
  { statement: "140+ interactive Study Notes lessons, not static PDFs — worked examples and self-marking practice built into every topic.", context: "Study Notes" },
  { statement: "Pro is £39/month — less than a single private tutoring session, for a whole month of mocks and notes.", context: "Value" },
];

export default function WelcomePage() {
  return (
    <>
      <main className="min-h-screen bg-cream pb-28">
        {/* Hero */}
        <section className="hero-spotlight relative overflow-hidden px-5 pb-8 pt-6">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-gold-light/25 blur-3xl" />
          <div className="relative mx-auto max-w-md text-center">
            <p className="mx-auto inline-flex rounded-full border border-gold/30 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-dark shadow-sm">
              11+ Preparation, Done Properly
            </p>
            <h1 className="mt-4 text-[2rem] font-black leading-[1.1] tracking-tight text-navy">
              Premium 11+ mocks, <span className="text-gold-dark">built for results</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">{SITE.tagline}</p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] font-bold text-muted">
              {["DBS-checked tutors", "GL-style online mocks", "Manual report release"].map((item) => (
                <span key={item} className="rounded-full border border-gold/25 bg-white/80 px-3 py-1.5">{item}</span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <Button href="/account" size="lg" className="w-full">
                Create a Free Account <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/book-a-call" variant="navy" size="lg" className="w-full">
                Book a Free Parent Call
              </Button>
              <a href={`mailto:${SITE.email}`} className="text-center text-xs font-bold text-muted underline decoration-gold/50 underline-offset-4">
                Or message us directly →
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-md space-y-10 px-5">
          {/* Free sample mock — the "wow" moment, shown before any pitch */}
          <RevealOnScroll>
            <h2 className="text-lg font-black text-navy">Try 10 real questions</h2>
            <p className="mt-1 text-sm text-muted">5 maths, 5 spot-the-grammar-mistake. No account needed.</p>
            <div className="mt-4">
              <FreeSampleMock />
            </div>
          </RevealOnScroll>

          {/* Taster + free call */}
          <RevealOnScroll>
            <div className="premium-card rounded-2xl p-5 text-center">
              <Sparkles className="mx-auto h-6 w-6 text-gold-dark" />
              <h2 className="mt-2 text-lg font-black text-navy">Book a free taster</h2>
              <p className="mt-1 text-sm text-muted">Sit a free taster tuition session, or a 15-minute parent call — no obligation.</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button href="/book-a-call?product=free-taster&trial=1" size="md" className="w-full">
                  Book Free Taster Session
                </Button>
                <Button href="/book-a-call" variant="outline" size="md" className="w-full">
                  Book a Free Call
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          {/* Pricing — simple, Pro / Max only, shown early so parents see cost before scrolling */}
          <RevealOnScroll>
            <h2 className="text-lg font-black text-navy">Plans and pricing</h2>
            <p className="mt-1 text-sm text-muted">Just two plans — Pro or Max. Tap to compare.</p>
            <div className="mt-4">
              <WelcomePricingTabs />
            </div>
            <Link href="/pricing" className="mt-4 block text-center text-sm font-bold text-gold-dark">
              See all plans →
            </Link>
          </RevealOnScroll>

          {/* Tuition — Group / Private, pushed right under Pro/Max so parents see the human-taught option too */}
          <RevealOnScroll>
            <h2 className="text-lg font-black text-navy">Prefer live tuition?</h2>
            <p className="mt-1 text-sm text-muted">Small-group or 1:1 sessions with a real tutor — Group or Private.</p>
            <div className="mt-4">
              <WelcomeTuitionPricingTabs />
            </div>
            <Link href="/tuition" className="mt-4 block text-center text-sm font-bold text-gold-dark">
              See all tuition options →
            </Link>
          </RevealOnScroll>

          {/* Stat strip */}
          <RevealOnScroll>
            <div className="premium-card grid grid-cols-3 gap-2 rounded-2xl p-4 text-center">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-navy">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-snug text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Highlights */}
          <RevealOnScroll>
            <div className="premium-card space-y-3 rounded-2xl p-5">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
                  <p className="text-sm font-semibold text-navy">{item}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Choose your path */}
          <RevealOnScroll>
            <h2 className="text-lg font-black text-navy">Tell us what you need</h2>
            <p className="mt-1 text-sm text-muted">We&apos;ll point you to the right place.</p>
            <div className="mt-4 space-y-3">
              {PATHS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="premium-card premium-card-hover flex items-center gap-4 rounded-2xl p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold-light">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-navy">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted">{item.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gold-dark" />
                </Link>
              ))}
            </div>
          </RevealOnScroll>

          {/* Trust */}
          <RevealOnScroll>
            <h2 className="text-lg font-black text-navy">Why parents choose us</h2>
            <div className="mt-4 space-y-3">
              {TRUST_STATEMENTS.map((t) => (
                <div key={t.context} className="rounded-2xl border border-line bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-dark">{t.context}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy">{t.statement}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <p>Results vary by child — we won&apos;t promise a guaranteed grammar school place.</p>
            </div>
          </RevealOnScroll>

          {/* Holiday Booster — own section, bottom of page, most popular / all included */}
          <RevealOnScroll>
            <div className="overflow-hidden rounded-2xl border border-gold/40 bg-navy p-6 text-center">
              <span className="inline-flex rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-light">
                Most Popular
              </span>
              <h2 className="mt-3 text-xl font-black text-white">Holiday Booster — everything, all included</h2>
              <p className="mt-2 text-sm text-cream/70">
                Private tuition, timed mocks and daily feedback in one intensive week — the fastest way
                to close gaps before the holidays end.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button href="/holiday-booster" size="lg" className="w-full">
                  View Holiday Dates <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/book-a-call?product=holiday-booster" variant="light" size="md" className="w-full">
                  Book a Free Call
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          {/* Footer CTA */}
          <RevealOnScroll>
            <div className="overflow-hidden rounded-2xl border border-gold/40 bg-navy p-6 text-center">
              <h2 className="text-xl font-black text-white">Ready to see where your child stands?</h2>
              <p className="mt-2 text-sm text-cream/70">Book a free 15-minute call — no pressure, no hard sell.</p>
              <Button href="/book-a-call" size="lg" className="mt-5 w-full">
                Book a Free Parent Call <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </RevealOnScroll>

          <p className="pb-2 text-center text-xs text-muted">
            Prefer the full site? <Link href="/" className="font-bold text-navy underline">View summittuition.co.uk</Link>
          </p>
        </div>
      </main>
      <WelcomeStickyCta />
    </>
  );
}
