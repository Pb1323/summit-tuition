"use client";

import { BookOpen, SpellCheck, PenSquare, Puzzle, Lock } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";
import { cn } from "@/lib/utils";

const STRANDS = [
  {
    slug: "comprehension",
    name: "Comprehension",
    icon: BookOpen,
    description: "Retrieval, inference, vocabulary in context and text structure — reading skill by skill.",
    available: true,
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
    available: true,
  },
  {
    slug: "cloze",
    name: "Cloze",
    icon: Puzzle,
    description: "Missing word and missing letter passages, with grammar and context clue strategy.",
    available: true,
  },
];

function EnglishStrandsGrid() {
  const { currentUser } = usePlatform();

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2">
      {STRANDS.map((strand) => {
        const Icon = strand.icon;
        const noteId = `english-${strand.slug}`;
        const locked =
          strand.available && currentUser?.role !== "admin" && !currentUser?.unlockedNoteIds.includes(noteId);
        const clickable = strand.available && !locked;
        const card = (
          <GlowCard className={cn("h-full p-6", (!strand.available || locked) && "opacity-60")}>
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
              {locked && (
                <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-gold-dark">
                  <Lock className="h-3 w-3" /> Unlock with Pro
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted">{strand.description}</p>
          </GlowCard>
        );
        return clickable ? (
          <Link key={strand.slug} href={`/notes/english/${strand.slug}`} className="block">
            {card}
          </Link>
        ) : (
          <div key={strand.slug} className={locked ? "cursor-not-allowed" : ""}>
            {card}
          </div>
        );
      })}
    </div>
  );
}

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

        <EnglishStrandsGrid />
      </Container>
    </RequireAuth>
  );
}
