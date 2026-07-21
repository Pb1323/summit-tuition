"use client";

import { Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero-section";
import { Button } from "@/components/ui/button";
import { getNotesTheme } from "@/components/notes/notes-theme";
import {
  TierBadge,
  WhyMatters,
  ConceptCard,
  GlossaryStrip,
  DiagramFrame,
  WorkedExampleBlock,
  SelfCheckBlock,
} from "@/components/notes/notes-blocks";
import { numbersTopic } from "@/components/notes/notes-content/numbers";

/**
 * A single, real Study Notes lesson shown to anonymous visitors — deliberately just ONE
 * subtopic (not a whole topic, not a whole strand) so it reads as "here's a genuine sample",
 * not "here's a free chunk of the product". Content cuts off at roughly 70% height under a
 * blurred fade with a Pro/Max CTA, mirroring the free-mock sample's gating pattern.
 */
const SUBTOPIC = numbersTopic.subtopics[0];

export default function NotesPreviewPage() {
  const t = getNotesTheme("default");

  return (
    <>
      <HeroSection
        eyebrow="Official Study Notes Sample"
        title="See a Real Study Notes Lesson"
        description={`One full lesson from our ${numbersTopic.title} module — worked example, diagram and practice included. Unlock Pro or Max for all 140+ lessons.`}
      />
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="relative max-h-[820px] overflow-hidden rounded-[24px] border shadow-[0_20px_60px_-30px_rgba(10,31,68,0.5)]" style={{ borderColor: t.hairline }}>
              <div className="p-6 sm:p-8" style={{ background: t.pageBg }}>
                <div className="mb-1.5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[0.7em] font-bold uppercase tracking-wider" style={{ color: "#C9A24B" }}>
                      {numbersTopic.title} &middot; Subtopic 1
                    </div>
                    <h2 className="mt-1 font-serif text-2xl font-bold sm:text-3xl" style={{ color: t.headline }}>
                      {SUBTOPIC.title}
                    </h2>
                  </div>
                  <TierBadge tier={SUBTOPIC.tier} />
                </div>
                <p
                  className="my-3.5 border-l-[3px] pl-3.5 text-sm leading-relaxed"
                  style={{ color: t.subtext, borderColor: "#C9A24B" }}
                >
                  {SUBTOPIC.objective}
                </p>
                <WhyMatters>{SUBTOPIC.whyMatters}</WhyMatters>
                <ConceptCard theme={t} title={SUBTOPIC.conceptTitle} bullets={SUBTOPIC.conceptBullets} note={SUBTOPIC.conceptNote} />
                <GlossaryStrip theme={t} terms={SUBTOPIC.glossary} />
                <DiagramFrame theme={t} label={SUBTOPIC.diagramLabel}>
                  <SUBTOPIC.Diagram />
                </DiagramFrame>
                <WorkedExampleBlock theme={t} worked={SUBTOPIC.worked} />
                <div className="mt-6">
                  <SelfCheckBlock theme={t} prompt={SUBTOPIC.selfCheck.prompt} answer={SUBTOPIC.selfCheck.answer} />
                </div>
              </div>

              {/* Blur/fade cutoff — roughly the bottom 40% of the fixed-height frame above */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] backdrop-blur-sm"
                style={{ background: `linear-gradient(to top, ${t.pageBg} 20%, ${t.pageBg}cc 55%, transparent 100%)` }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 pt-4 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-gold-light shadow-lg">
                  <Lock className="h-5 w-5" />
                </div>
                <p className="max-w-sm text-sm font-semibold leading-relaxed text-navy">
                  This is one lesson out of 140+. Unlock Pro or Max to keep reading this one and every other
                  Study Notes lesson.
                </p>
                <Button href="/pricing#platform" size="md">
                  Unlock with Pro / Max
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
