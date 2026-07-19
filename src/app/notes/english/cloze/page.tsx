"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, RequireNoteAccess, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import { whatIsClozeTopic } from "@/components/notes/notes-content/what-is-cloze";
import { grammaticalClozeStrategyTopic } from "@/components/notes/notes-content/grammatical-cloze-strategy";
import type { TopicContent } from "@/components/notes/types";

const TOPICS: TopicContent[] = [whatIsClozeTopic, grammaticalClozeStrategyTopic];

export default function ClozeNotesHubPage() {
  return (
    <RequireAuth role="student">
      <RequireNoteAccess noteId="english-cloze">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes/english" className="text-sm font-semibold text-gold-dark hover:underline">
            ← English strands
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Cloze Notes</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Missing-word passage practice. Pick a topic below — each covers several subtopics with concept
            explanations, an interactive click-to-fill-the-gap passage and self-marking practice questions.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <Link key={topic.slug} href={`/notes/english/cloze/${topic.slug}`} className="block">
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
