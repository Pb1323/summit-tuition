"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { usePlatform } from "@/context/platform-context";
import { cn } from "@/lib/utils";
import { numbersTopic } from "@/components/notes/notes-content/numbers";
import { fractionsDecimalsPercentagesTopic } from "@/components/notes/notes-content/fractions-decimals-percentages";
import { ratioProportionTopic } from "@/components/notes/notes-content/ratio-proportion";
import { algebraTopic } from "@/components/notes/notes-content/algebra";
import { geometryTopic } from "@/components/notes/notes-content/geometry";
import { averagesStatisticsTopic } from "@/components/notes/notes-content/averages-statistics";
import type { TopicContent } from "@/components/notes/types";

const TOPICS: TopicContent[] = [
  numbersTopic,
  fractionsDecimalsPercentagesTopic,
  ratioProportionTopic,
  algebraTopic,
  geometryTopic,
  averagesStatisticsTopic,
];

function MathsTopicsGrid() {
  const { currentUser } = usePlatform();

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {TOPICS.map((topic) => {
        const noteId = `maths-${topic.slug}`;
        const locked = currentUser?.role !== "admin" && !currentUser?.unlockedNoteIds.includes(noteId);
        const card = (
          <GlowCard className={cn("h-full p-6", locked && "opacity-60")}>
            <div className="flex items-center justify-between gap-2">
              <PremiumBadge>{topic.subtopics.length} subtopics</PremiumBadge>
              {locked && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-gold-dark">
                  <Lock className="h-3 w-3" /> Unlock with Pro
                </span>
              )}
            </div>
            <h2 className="mt-3 text-xl font-bold text-navy">{topic.title}</h2>
            <p className="mt-2 text-sm text-muted">{topic.description}</p>
            <ul className="mt-4 space-y-1 text-xs font-semibold text-gold-dark">
              {topic.subtopics.map((s) => (
                <li key={s.id}>&middot; {s.title}</li>
              ))}
            </ul>
          </GlowCard>
        );
        return locked ? (
          <div key={topic.slug} className="cursor-not-allowed">
            {card}
          </div>
        ) : (
          <Link key={topic.slug} href={`/notes/maths/${topic.slug}`} className="block">
            {card}
          </Link>
        );
      })}
    </div>
  );
}

export default function MathsNotesHubPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes" className="text-sm font-semibold text-gold-dark hover:underline">
            ← All subjects
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Maths Notes</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Pick a topic below. Each one covers three subtopics with concept explanations, an interactive
            diagram, a worked example and self-marking practice questions.
          </p>
        </RevealOnScroll>

        <MathsTopicsGrid />
      </Container>
    </RequireAuth>
  );
}
