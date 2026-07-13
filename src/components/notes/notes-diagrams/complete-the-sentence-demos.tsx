"use client";

import { ClickFillGap } from "./click-fill-gap";

const INSTRUCTION = "Click the word that best completes the sentence.";

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
