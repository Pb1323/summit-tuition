"use client";

import { useState } from "react";
import { NOTES_GOLD } from "../notes-theme";
import { ClickEvidencePassage } from "./click-evidence-passage";
import { ClickErrorSentence } from "./click-error-sentence";
import { WordChoiceComparator } from "./word-choice-comparator";

export interface StoryStagePart {
  text: string;
  /** Short label revealed on click — a story-shape stage name, or a verdict tag. */
  stage: string;
  note: string;
}

/**
 * New primitive for Creative Writing: a multi-reveal explorer, distinct from
 * the single-correct-answer click primitives used elsewhere. Each part of a
 * short passage (or each candidate line) can be clicked independently to
 * reveal a short label + explanation — there's no single "correct" click, so
 * it suits teaching a shape (story stages) or comparing several candidates
 * (e.g. endings) where every item is worth examining. Reused across two
 * subtopics below with different data.
 */
export function StoryStageExplorer({ instruction, parts }: { instruction: string; parts: StoryStagePart[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggle = (idx: number) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  return (
    <div className="px-6 pb-4 pt-5">
      <p className="mb-4 text-[0.8em] text-[rgba(248,245,238,0.6)]">{instruction}</p>
      <div className="space-y-2.5">
        {parts.map((p, i) => {
          const open = revealed.has(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              className="cursor-pointer rounded-xl border px-4 py-3 transition-colors duration-200"
              style={{
                borderColor: open ? NOTES_GOLD : "rgba(201,162,75,0.25)",
                background: open ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.03)",
              }}
            >
              <p className="m-0 font-serif text-[1.02em] leading-relaxed text-[#F8F5EE]">{p.text}</p>
              {open && (
                <div className="mt-2 animate-[ntfadein_0.3s_ease] text-[0.82em] leading-relaxed" style={{ color: "rgba(248,245,238,0.75)" }}>
                  <b style={{ color: NOTES_GOLD }}>{p.stage}</b> — {p.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="h-3" />
    </div>
  );
}

export function StoryShapeStagesDemo() {
  return (
    <StoryStageExplorer
      instruction="Click each part of this mini-story to see which stage of the four-part shape it belongs to."
      parts={[
        {
          text: "Maya's hands were still shaking as she stepped up to the microphone.",
          stage: "Hook",
          note: "drops the reader into a tense moment immediately, with no warm-up.",
        },
        {
          text: "She'd practised the speech every night that week, but her mind had gone completely blank.",
          stage: "Build",
          note: "raises the stakes and explains why this moment matters, before the turn.",
        },
        {
          text: "Then she noticed her best friend in the front row, mouthing the first line back to her.",
          stage: "Turn",
          note: "the moment something changes — a small discovery that shifts what happens next.",
        },
        {
          text: "Maya took a breath, found her voice, and finished the speech to the loudest applause she'd ever heard.",
          stage: "Resolve",
          note: "shows the consequence of the turn and closes the story properly.",
        },
      ]}
    />
  );
}

export function OpeningHooksDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the opening that hooks the reader most strongly for a story about a school fire drill."
      passage={[
        "It was a normal Tuesday morning and everyone was in their usual lessons.",
        "The alarm screamed through the corridor before anyone had even sat down.",
        "Fire drills happened about twice a term at our school.",
        "Miss Ahmed always reminded us where the fire exits were.",
      ]}
      correctIdx={1}
      correction={'"the alarm screamed through the corridor before anyone had even sat down" drops the reader straight into the sudden moment — the other sentences are background or generic information that delay the actual event.'}
      wrongHint="Look for the sentence that starts with something happening, not background information about the school."
    />
  );
}

export function ShowDontTellDemo() {
  return (
    <ClickErrorSentence
      instruction="This sentence mixes showing and telling. Click the single word that 'tells' the feeling directly instead of showing it."
      words={["Zara", "was", "furious", "and", "slammed", "her", "book", "shut."]}
      errorIdx={2}
      correction={'"furious" states the feeling directly — the sentence would be stronger showing it entirely through the action of slamming the book shut, without naming the feeling at all.'}
      wrongHint="Look for the one feeling-word that names an emotion outright, rather than an action."
    />
  );
}

export function SentenceVarietyDemo() {
  return (
    <WordChoiceComparator
      heading="Which opening avoids the repetitive 'Then...' pattern?"
      helper="Hover or tap each option to preview it, then lock in your choice."
      before=""
      after="the alarm rang, and everyone froze."
      candidates={[
        { word: "Without warning,", fitLabel: "Varied opener", good: true, note: "starts with a phrase, not the repeated 'Then' or a character name — builds real sentence variety." },
        { word: "Then", fitLabel: "Repetitive", good: false, note: "if several nearby sentences already start with 'Then', this keeps the flat, repetitive rhythm going." },
        { word: "Suddenly, out of nowhere, unexpectedly,", fitLabel: "Overloaded", good: false, note: "three near-identical words stacked together — one of them alone would be stronger." },
        { word: "It happened when", fitLabel: "Weak and vague", good: false, note: "delays the actual event without adding any real variety or interest." },
      ]}
    />
  );
}

export function DialoguePunctuationDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the token with the punctuation mistake in this line of dialogue."
      words={["\"I'm", "ready.\"", "she", "said."]}
      errorIdx={1}
      correction={'when a speech tag ("she said") follows spoken words in the same sentence, the punctuation before the closing speech mark should be a comma, not a full stop — it should read "I\'m ready," she said.'}
      wrongHint="Look at the punctuation mark right before the closing speech mark."
    />
  );
}

export function FigurativeLanguageDemo() {
  return (
    <WordChoiceComparator
      heading="Which description of the fog works best?"
      helper="Hover or tap each option to preview it, then lock in your choice."
      before="The fog"
      after="over the harbour at dawn."
      candidates={[
        { word: "crept in like a slow grey tide", fitLabel: "Original & purposeful", good: true, note: "a specific, sensory image that fits the harbour setting — this is what earns marks." },
        { word: "was as thick as pea soup", fitLabel: "Cliché", good: false, note: "an extremely overused comparison — an examiner will have read it many times before." },
        { word: "billowed and swirled and rolled and crept", fitLabel: "Overloaded", good: false, note: "four verbs crammed together dilutes the image rather than sharpening it." },
        { word: "was there", fitLabel: "Too plain", good: false, note: "technically correct but carries no image at all — a missed opportunity for description." },
      ]}
    />
  );
}

export function VocabularyPrecisionDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the overused word in this sentence that could be replaced with something more precise."
      words={["The", "weather", "was", "really", "nice", "on", "sports", "day."]}
      errorIdx={4}
      correction={'"nice" is vague and overused — a more precise word (mild, bright, crisp) would tell the reader exactly what kind of nice weather it was.'}
      wrongHint="Look for the vague adjective that could describe almost anything."
    />
  );
}

export function EndingsThatResolveDemo() {
  return (
    <StoryStageExplorer
      instruction="Click each candidate ending to see whether it properly resolves the story (about a character searching for a lost dog)."
      parts={[
        {
          text: "...and just as Ellie spotted a flash of brown fur behind the fence, the whistle blew for the end of break.",
          stage: "Doesn't resolve",
          note: "cuts away right at the turn, leaving the central question — was it the dog? — unanswered.",
        },
        {
          text: "Ellie climbed over the fence, and it was him: muddy, exhausted, and thumping his tail against the ground.",
          stage: "Resolves properly",
          note: "directly answers the story's central question and shows the consequence of the search.",
        },
        {
          text: "Meanwhile, across town, a different family were having their lunch.",
          stage: "Doesn't resolve",
          note: "introduces a new, unrelated thread instead of closing the one the reader has been following.",
        },
        {
          text: "Ellie sat down on the grass, out of breath, having looked absolutely everywhere.",
          stage: "Doesn't resolve",
          note: "shows effort but never actually answers whether the dog was found.",
        },
      ]}
    />
  );
}

export function AdaptingToPromptTypeDemo() {
  return (
    <ClickEvidencePassage
      instruction="For a picture-based prompt (a photo of a locked gate at dusk), click the planning step that should come FIRST."
      passage={[
        "Decide what the picture suggests for setting and mood, to build the hook.",
        "Write the resolution.",
        "Choose precise vocabulary for the middle paragraphs.",
        "Plan the figurative language for the final sentence.",
      ]}
      correctIdx={0}
      correction={"for a picture-based prompt, the image itself is the natural starting point for the hook and setting — everything else in the shape follows from there."}
      wrongHint="Think about what a picture prompt actually gives you that a title prompt doesn't."
    />
  );
}
