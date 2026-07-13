"use client";

import { ClickFillGap } from "./click-fill-gap";

const INSTRUCTION = "Click the word that correctly fills the gap.";

export function WordClassCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The old bridge looked"
      options={["danger", "dangerously", "dangerous", "endanger"]}
      correctIdx={2}
      after="after the storm."
      correction="the gap sits right after a linking verb (“looked”) and before nothing else — it needs an adjective describing the bridge: “dangerous”, not a noun, adverb or verb form."
      wrongHint="check what job the gap needs to do — is it describing a noun, or doing something else entirely?"
    />
  );
}

export function VerbTenseCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Yesterday, the whole class"
      options={["walks", "walking", "walked", "walk"]}
      correctIdx={2}
      after="to the museum for the afternoon."
      correction="“yesterday” signals the whole passage is in the past tense, so the gap needs the past-tense verb form “walked”, matching the time clue already given."
      wrongHint="look at the time clue at the start of the sentence — what tense does it tell you the rest of the sentence should be in?"
    />
  );
}

export function SingularPluralAgreementCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Both of the twins"
      options={["was", "is", "were", "has been"]}
      correctIdx={2}
      after="chosen for the school choir."
      correction="“both” signals a plural subject (the twins, together), so the gap needs the plural verb form “were”, not a singular form."
      wrongHint="check whether the subject named just before the gap is singular or plural — that decides the verb form needed."
    />
  );
}

export function CombinedGrammarMeaningCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Although the trail was steep, the hikers"
      options={["gives up", "given up", "gave up", "giving up"]}
      correctIdx={2}
      after="only once, near the very top."
      correction="the passage is in the past tense (matching the surrounding story), and the gap follows a plural subject doing a single completed action — “gave up” fits both the tense and the meaning of the sentence."
      wrongHint="combine two clues here: what tense does the surrounding story use, and what verb form actually completes the action correctly?"
    />
  );
}
