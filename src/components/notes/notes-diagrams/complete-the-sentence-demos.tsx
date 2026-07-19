"use client";

import { ClickFillGap } from "./click-fill-gap";

const INSTRUCTION = "Click the word that best completes the sentence.";

export function WhatMakesBestFitAnswerDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="After the marathon, the runners were"
      options={["exhaust", "exhausted", "exhausting", "cheerful"]}
      correctIdx={1}
      after="and could barely stand."
      correction="“exhausted” passes both checks — it's the correct past-tense adjective form and matches the meaning of runners barely able to stand after a marathon. “cheerful” is grammatically fine but the wrong meaning; “exhaust”/“exhausting” fail the grammar check."
      wrongHint="check the grammar form of each option first, then check whether its meaning matches barely being able to stand."
    />
  );
}

export function GrammaticalFitVsMeaningFitDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The gardener was proud of her prize-winning"
      options={["grow", "grown", "growing", "growth"]}
      correctIdx={3}
      after="."
      correction="“growth” is the noun form needed after “her prize-winning” — the other options are verb forms and fail the word-class check, even though they share the same root idea."
      wrongHint="work out what word class the gap needs after “her prize-winning”, then check which option matches that word class."
    />
  );
}

export function RegisterToneMatchingDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The minister's speech left the assembled diplomats"
      options={["dead impressed", "hugely impressed", "mega impressed", "impressed loads"]}
      correctIdx={1}
      after="by its clarity and tact."
      correction="“hugely impressed” matches the formal register of a diplomatic setting — “dead impressed”, “mega impressed” and “impressed loads” are all casual, conversational phrasings that clash with that formal context."
      wrongHint="picture the formal setting of diplomats listening to a minister's speech, and find the option that matches that register rather than sounding like everyday slang."
    />
  );
}

export function CollocationNaturalPhrasingDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Before the interview, he tried to"
      options={["make a good impression", "do a good impression", "take a good impression", "have a good impression"]}
      correctIdx={0}
      after="on the panel."
      correction="“make a good impression” is the natural collocation — “do”, “take” and “have” a good impression are grammatically possible combinations but not how this phrase is conventionally used."
      wrongHint="say each option paired with “a good impression” out loud — only one is a phrase you've actually heard people use."
    />
  );
}

export function NarrowingDownByEliminationDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Neither of the twins"
      options={["was ready", "were ready", "are ready", "being ready"]}
      correctIdx={0}
      after="to leave when the taxi arrived."
      correction="“was ready” agrees with “Neither”, which is grammatically singular even though it refers to two people — re-reading the full sentence and checking this subtler agreement clash is what separates it from the tempting “were ready”."
      wrongHint="focus on whether “Neither” itself is singular or plural in formal grammar, rather than the nearby plural noun “twins”."
    />
  );
}

export function BestFitConnectiveDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The forecast promised sunshine all week;"
      options={["however", "similarly", "therefore", "for example"]}
      correctIdx={0}
      after=", it rained every single day."
      correction="“however” signals a contrast between what was promised and what actually happened — the only connective here that fits a change of direction."
      wrongHint="think about whether the second half of the sentence agrees with the first half, or contradicts it."
    />
  );
}

export function BestFitVerbPrecisionDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Exhausted after the race, she"
      options={["went", "collapsed", "moved", "did"]}
      correctIdx={1}
      after="onto the grass verge."
      correction="“collapsed” is precise and matches “exhausted” — the vaguer options (“went”, “moved”, “did”) could fit almost any sentence and don't carry the same exhaustion."
      wrongHint="look for the word that most specifically matches how an exhausted runner would move, rather than a generic verb that could fit anywhere."
    />
  );
}

export function BestFitSentenceCombiningDemo() {
  return (
    <ClickFillGap
      instruction="Click the option that most smoothly combines the two ideas: 'The bridge was old.' and 'The bridge still held firm in the storm.'"
      before=""
      options={["Old, the bridge, it still held firm in the storm.", "Although old, the bridge still held firm in the storm.", "The bridge was old and the bridge still held firm in the storm.", "The bridge, being old, but still held firm in the storm."]}
      correctIdx={1}
      after=""
      correction="“Although old, the bridge still held firm in the storm” combines both ideas smoothly in one clean clause, using “although” to signal the contrast without repeating “the bridge” twice."
      wrongHint="look for the option that avoids clumsy repetition and uses a single, correctly placed connective."
    />
  );
}

export function AlmostRightDistractorDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The committee will announce its decision"
      options={["momentarily", "shortly", "presently", "eventually"]}
      correctIdx={1}
      after=", probably within the hour."
      correction="“shortly” means “soon”, matching “within the hour” — “momentarily” is a tempting near-miss because it sounds similar, but strictly means “for a brief moment”, not “soon”."
      wrongHint="one option here looks and sounds almost right, but its precise dictionary meaning doesn't actually match the clue “within the hour”."
    />
  );
}
