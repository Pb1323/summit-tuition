"use client";

import { Calculator, BookText, Brain, ShapesIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";
import Link from "next/link";

const SUBJECTS = [
  {
    slug: "maths",
    name: "Maths",
    icon: Calculator,
    description: "Number, fractions, ratio, algebra, geometry and data handling — built topic by topic.",
    available: true,
  },
  {
    slug: "english",
    name: "English",
    icon: BookText,
    description: "Comprehension, grammar, spelling and cloze — built strand by strand.",
    available: true,
  },
  {
    slug: "verbal-reasoning",
    name: "Verbal Reasoning",
    icon: Brain,
    description: "Word relationships, codes, word building and number/logic puzzles — GL-style question type by type.",
    available: true,
  },
  {
    slug: "non-verbal-reasoning",
    name: "Non-Verbal Reasoning",
    icon: ShapesIcon,
    description: "Rotations, sequences and codes explained visually.",
    available: false,
  },
];

export default function NotesHubPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <PremiumBadge>Study Notes</PremiumBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Choose a subject</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Interactive notes for lessons and homework — concept explanations, worked examples and
            self-marking practice, built one topic at a time.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {SUBJECTS.map((subject) => {
            const Icon = subject.icon;
            const card = (
              <GlowCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-navy">{subject.name}</h2>
                  {!subject.available && (
                    <span className="ml-auto">
                      <PremiumBadge tone="navy">Coming soon</PremiumBadge>
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted">{subject.description}</p>
              </GlowCard>
            );
            return subject.available ? (
              <Link key={subject.slug} href={`/notes/${subject.slug}`} className="block">
                {card}
              </Link>
            ) : (
              <div key={subject.slug} className="opacity-60">
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </RequireAuth>
  );
}
