"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, RequireNoteAccess, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { wordRelationshipsEssentialsTopic } from "@/components/notes/notes-content/word-relationships-essentials";
import type { TopicContent } from "@/components/notes/types";

const TOPICS: TopicContent[] = [wordRelationshipsEssentialsTopic];

export default function WordRelationshipsNotesHubPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="vr-word-relationships">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes/verbal-reasoning" className="text-sm font-semibold text-gold-dark hover:underline">
            ← Verbal Reasoning strands
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Word Relationships Notes</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Synonyms, antonyms, odd one out and analogies. Pick a topic below — each covers several
            subtopics with concept explanations, an interactive click-the-word demo and self-marking
            practice questions.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <Link key={topic.slug} href={`/notes/verbal-reasoning/word-relationships/${topic.slug}`} className="block">
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
      </RequireNoteAccess>
    </RequireAuth>
  );
}
