"use client";

import { FlaskConical, Dna, Zap } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";

const STRANDS = [
  {
    slug: "biology",
    name: "Biology",
    icon: Dna,
    description: "Cell biology, organisation, infection & response, bioenergetics, homeostasis, inheritance/evolution and ecology — the full AQA Triple Science specification.",
    available: true,
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    description: "Atomic structure, bonding, quantitative chemistry, chemical changes, rates, organic chemistry, analysis, the atmosphere and resources.",
    available: true,
  },
  {
    slug: "physics",
    name: "Physics",
    icon: Zap,
    description: "Energy, electricity, particle model, atomic structure, forces, waves, magnetism & electromagnetism, and space physics.",
    available: true,
  },
];

export default function GcseScienceNotesHubPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes" className="text-sm font-semibold text-gold-dark hover:underline">
            ← All subjects
          </Link>
          <PremiumBadge>GCSE Science Notes</PremiumBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Choose a science</h1>
          <p className="mt-2 max-w-2xl text-muted">
            AQA GCSE (9-1) Triple Science study notes — concept explanations, worked examples and
            self-marking practice, covering every topic across Biology, Chemistry and Physics.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STRANDS.map((strand) => {
            const Icon = strand.icon;
            const card = (
              <GlowCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-navy">{strand.name}</h2>
                  {!strand.available && (
                    <span className="ml-auto">
                      <PremiumBadge tone="navy">Coming soon</PremiumBadge>
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted">{strand.description}</p>
              </GlowCard>
            );
            return strand.available ? (
              <Link key={strand.slug} href={`/notes/gcse-science/${strand.slug}`} className="block">
                {card}
              </Link>
            ) : (
              <div key={strand.slug} className="opacity-60">
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </RequireAuth>
  );
}
