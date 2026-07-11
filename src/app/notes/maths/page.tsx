"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
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

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <Link key={topic.slug} href={`/notes/maths/${topic.slug}`} className="block">
              <GlowCard className="h-full p-6">
                <PremiumBadge>{topic.subtopics.length} subtopics</PremiumBadge>
                <h2 className="mt-3 text-xl font-bold text-navy">{topic.title}</h2>
                <p className="mt-2 text-sm text-muted">{topic.description}</p>
                <ul className="mt-4 space-y-1 text-xs font-semibold text-gold-dark">
                  {topic.subtopics.map((s) => (
                    <li key={s.id}>&middot; {s.title}</li>
                  ))}
                </ul>
              </GlowCard>
            </Link>
          ))}
        </div>
      </Container>
    </RequireAuth>
  );
}
