"use client";

import { Layers, KeyRound, Hammer, Hash } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";

const STRANDS = [
  {
    slug: "word-relationships",
    name: "Word Relationships",
    icon: Layers,
    description: "Synonyms, antonyms, odd one out and analogies — spotting how words connect and where they don't.",
    available: true,
  },
  {
    slug: "codes-ciphers",
    name: "Codes & Ciphers",
    icon: KeyRound,
    description: "Letter-for-number codes, word-to-number codes and shift ciphers.",
    available: false,
  },
  {
    slug: "word-building",
    name: "Word Building",
    icon: Hammer,
    description: "Letter moves, insert-letter bridges, hidden words and compound word building.",
    available: false,
  },
  {
    slug: "number-logic",
    name: "Number & Logic Puzzles",
    icon: Hash,
    description: "Number series, alphabet series, balanced equations and short logical-deduction puzzles.",
    available: false,
  },
];

export default function VerbalReasoningNotesHubPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes" className="text-sm font-semibold text-gold-dark hover:underline">
            ← All subjects
          </Link>
          <PremiumBadge>Verbal Reasoning Notes</PremiumBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Choose a strand</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Built to match how GL Assessment actually structures the 11+ Verbal Reasoning paper — a fixed
            set of question types split into four skill families, each broken down type by type.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
              <Link key={strand.slug} href={`/notes/verbal-reasoning/${strand.slug}`} className="block">
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
