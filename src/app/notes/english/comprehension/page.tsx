"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { literalComprehensionRetrievalTopic } from "@/components/notes/notes-content/literal-comprehension-retrieval";
import type { TopicContent } from "@/components/notes/types";

const TOPICS: TopicContent[] = [literalComprehensionRetrievalTopic];

export default function ComprehensionNotesHubPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes/english" className="text-sm font-semibold text-gold-dark hover:underline">
            ← English strands
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Comprehension Notes</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Reading skill by skill — retrieval, inference, vocabulary in context and text structure. Pick a
            topic below — each covers several subtopics with concept explanations, an interactive
            click-the-evidence passage and self-marking practice questions.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <Link key={topic.slug} href={`/notes/english/comprehension/${topic.slug}`} className="block">
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
