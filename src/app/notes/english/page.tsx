"use client";

import { BookOpen, SpellCheck, PenSquare, Puzzle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";

const STRANDS = [
  {
    slug: "comprehension",
    name: "Comprehension",
    icon: BookOpen,
    description: "Retrieval, inference, vocabulary in context and text structure — reading skill by skill.",
    available: false,
  },
  {
    slug: "grammar",
    name: "Grammar",
    icon: PenSquare,
    description: "\"Spot the mistake\" and \"complete the sentence\" practice — parts of speech, agreement and more.",
    available: true,
  },
  {
    slug: "spelling",
    name: "Spelling",
    icon: SpellCheck,
    description: "Spelling patterns, homophones and \"spot the mistake\" spelling technique.",
    available: false,
  },
  {
    slug: "cloze",
    name: "Cloze",
    icon: Puzzle,
    description: "Missing word and missing letter passages, with grammar and context clue strategy.",
    available: false,
  },
];

export default function EnglishNotesHubPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes" className="text-sm font-semibold text-gold-dark hover:underline">
            ← All subjects
          </Link>
          <PremiumBadge>English Notes</PremiumBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Choose a strand</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Built to match how GL, CEM and CSSE actually structure the 11+ English paper — comprehension,
            grammar, spelling and cloze, each broken down topic by topic.
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
              <Link key={strand.slug} href={`/notes/english/${strand.slug}`} className="block">
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
