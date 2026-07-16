import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SITE } from "@/data/site";
import { MOCK_CLUB_PRICING, PROGRAMME_PRICING } from "@/data/pricing";

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

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-cream px-5 py-10">
      <div className="mx-auto max-w-md space-y-8">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gold-dark">{SITE.shortName}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-navy">Premium 11+ mocks, built for results</h1>
          <p className="mt-3 text-sm text-muted">{SITE.tagline}</p>
        </div>

        <div className="space-y-3 rounded-2xl border border-line bg-white p-5">
          {HIGHLIGHTS.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
              <p className="text-sm font-semibold text-navy">{item}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Link href="/register" className="block rounded-full bg-gold px-5 py-3.5 text-center text-sm font-black text-navy">
            Create a free account
          </Link>
          <Link href="/book-a-call" className="block rounded-full border border-line bg-white px-5 py-3.5 text-center text-sm font-black text-navy">
            Book a call instead
          </Link>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="text-lg font-black text-navy">Popular plans</h2>
          <div className="mt-4 space-y-4">
            {[...MOCK_CLUB_PRICING.filter((tier) => tier.highlighted), ...PROGRAMME_PRICING].map((tier) => (
              <div key={tier.id} className="rounded-xl bg-cream p-4">
                <div className="flex items-baseline justify-between">
                  <p className="font-black text-navy">{tier.name}</p>
                  <p className="font-black text-navy">{tier.price}<span className="text-xs font-semibold text-muted">{tier.period}</span></p>
                </div>
                <p className="mt-1 text-sm text-muted">{tier.description}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="mt-4 block text-center text-sm font-bold text-gold-dark">See all plans →</Link>
        </div>

        <p className="text-center text-xs text-muted">
          Prefer the full site? <Link href="/" className="font-bold text-navy underline">View summittuition.co.uk</Link>
        </p>
      </div>
    </main>
  );
}
