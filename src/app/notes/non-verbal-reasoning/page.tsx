"use client";

import { Shapes, KeyRound, Box, Layers3 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { RequireAuth, GlowCard, PremiumBadge, RevealOnScroll } from "@/components/platform/ui";

const STRANDS = [
  {
    slug: "shape-patterns",
    name: "Shape Patterns & Sequences",
    icon: Shapes,
    description: "Odd one out, series, analogies, rotation and mirror reflection — the five core NVR figure types.",
    available: true,
  },
  {
    slug: "codes-grids",
    name: "Codes & Grids",
    icon: KeyRound,
    description: "Matrix questions and figure-code puzzles where a symbol key stands for a rule.",
    available: false,
  },
  {
    slug: "nets-3d",
    name: "Nets & 3D Shapes",
    icon: Box,
    description: "Folding nets into solids, and identifying a solid from its unfolded net.",
    available: false,
  },
  {
    slug: "similarity-combining",
    name: "Similarity & Combining Shapes",
    icon: Layers3,
    description: "Spotting matching figures at a glance and combining two shapes into one.",
    available: false,
  },
];

export default function NonVerbalReasoningNotesHubPage() {
  return (
    <RequireAuth role="student">
      <Container className="py-10">
        <RevealOnScroll>
          <Link href="/notes" className="text-sm font-semibold text-gold-dark hover:underline">
            ← All subjects
          </Link>
          <PremiumBadge>Non-Verbal Reasoning Notes</PremiumBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-navy">Choose a strand</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Built the same way as our Verbal Reasoning notes — a fixed set of real 11+ NVR question types
            split into skill families, each broken down type by type with an interactive figure to try.
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
              <Link key={strand.slug} href={`/notes/non-verbal-reasoning/${strand.slug}`} className="block">
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
