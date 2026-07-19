"use client";

import { ClickFillGap } from "./click-fill-gap";
import { WordChoiceComparator } from "./word-choice-comparator";

const INSTRUCTION = "Click the word that best completes the sentence.";

export function BestFitConnectiveDemo() {
  return (
    <>
      <ClickFillGap
        instruction={INSTRUCTION}
        before="The forecast promised sunshine all week;"
        options={["however", "similarly", "therefore", "for example"]}
        correctIdx={0}
        after=", it rained every single day."
        correction="“however” signals a contrast between what was promised and what actually happened — the only connective here that fits a change of direction."
        wrongHint="think about whether the second half of the sentence agrees with the first half, or contradicts it."
      />
      <WordChoiceComparator
        heading="Compare every connective in context"
        helper="Hover or click each connective to preview it inside the sentence and see whether the logic holds."
        before="The path to the summit looked easy on the map;"
        after="the climb took the whole day."
        candidates={[
          { word: "however", fitLabel: "Best fit", good: true, note: "signals the contrast between an easy-looking map and a day-long climb — exactly the relationship the sentence needs." },
          { word: "moreover", fitLabel: "Wrong category", good: false, note: "an addition connective — it adds a new point, but this sentence needs a contrast, not an extra fact." },
          { word: "therefore", fitLabel: "Wrong category", good: false, note: "a cause/result connective — the long climb wasn't caused by the map looking easy, so this reverses the logic." },
          { word: "meanwhile", fitLabel: "Wrong category", good: false, note: "a time connective, for two things happening at once — there's no second, simultaneous event here." },
        ]}
      />
    </>
  );
}

export function BestFitVerbPrecisionDemo() {
  return (
    <>
      <ClickFillGap
        instruction={INSTRUCTION}
        before="Exhausted after the race, she"
        options={["went", "collapsed", "moved", "did"]}
        correctIdx={1}
        after="onto the grass verge."
        correction="“collapsed” is precise and matches “exhausted” — the vaguer options (“went”, “moved”, “did”) could fit almost any sentence and don't carry the same exhaustion."
        wrongHint="look for the word that most specifically matches how an exhausted runner would move, rather than a generic verb that could fit anywhere."
      />
      <WordChoiceComparator
        heading="Compare every verb in context"
        helper="Hover or click each verb to preview it in the sentence — watch which one actually earns its place."
        before="Overjoyed at the surprise party, Maya"
        after="into the room, laughing."
        candidates={[
          { word: "went", fitLabel: "Too vague", good: false, note: "a general-purpose verb that could fit almost any sentence — it carries none of “overjoyed”'s energy." },
          { word: "burst", fitLabel: "Best fit", good: true, note: "precisely matches “overjoyed” — a sudden, energetic entrance that fits genuine excitement." },
          { word: "did", fitLabel: "Too vague", good: false, note: "one of the vaguest possible verbs — it barely describes an action at all, let alone a joyful one." },
          { word: "moved", fitLabel: "Too vague", good: false, note: "technically correct but carries no emotional charge — it could describe any entrance, happy or not." },
        ]}
      />
    </>
  );
}

export function BestFitSentenceCombiningDemo() {
  return (
    <>
      <ClickFillGap
        instruction="Click the option that most smoothly combines the two ideas: 'The bridge was old.' and 'The bridge still held firm in the storm.'"
        before=""
        options={["Old, the bridge, it still held firm in the storm.", "Although old, the bridge still held firm in the storm.", "The bridge was old and the bridge still held firm in the storm.", "The bridge, being old, but still held firm in the storm."]}
        correctIdx={1}
        after=""
        correction="“Although old, the bridge still held firm in the storm” combines both ideas smoothly in one clean clause, using “although” to signal the contrast without repeating “the bridge” twice."
        wrongHint="look for the option that avoids clumsy repetition and uses a single, correctly placed connective."
      />
      <WordChoiceComparator
        heading="Compare how each opener reads"
        helper="Hover or click each opening word/phrase to preview the combined sentence and judge which reads most smoothly."
        before=""
        after="the trail was steep, the hikers reached the summit before noon."
        candidates={[
          { word: "Although", fitLabel: "Best fit", good: true, note: "one clean subordinating word signals the contrast (steep trail, early finish) without repeating any noun." },
          { word: "The trail was steep and", fitLabel: "Clumsy repetition", good: false, note: "technically joins the ideas, but repeats the subject awkwardly instead of subordinating one clause to the other." },
          { word: "Steep, the trail,", fitLabel: "Misplaced comma", good: false, note: "the stray comma after “trail” breaks the sentence rather than smoothly combining the two ideas." },
          { word: "Being steep the trail", fitLabel: "Clumsy phrasing", good: false, note: "reads awkwardly and leaves the connection between the two ideas unclear — not a smooth combination." },
        ]}
      />
    </>
  );
}

export function AlmostRightDistractorDemo() {
  return (
    <>
      <ClickFillGap
        instruction={INSTRUCTION}
        before="The committee will announce its decision"
        options={["momentarily", "shortly", "presently", "eventually"]}
        correctIdx={1}
        after=", probably within the hour."
        correction="“shortly” means “soon”, matching “within the hour” — “momentarily” is a tempting near-miss because it sounds similar, but strictly means “for a brief moment”, not “soon”."
        wrongHint="one option here looks and sounds almost right, but its precise dictionary meaning doesn't actually match the clue “within the hour”."
      />
      <WordChoiceComparator
        heading="Compare the near-synonyms in context"
        helper="Hover or click each option to preview it in the sentence and test its precise dictionary meaning against the clue."
        before="The new bridge should"
        after="the town's traffic problems within a year."
        candidates={[
          { word: "alleviate", fitLabel: "Best fit", good: true, note: "means “ease or reduce” — matches a sentence that only claims improvement, not total removal, of the traffic problem." },
          { word: "eliminate", fitLabel: "Near-miss trap", good: false, note: "means “remove entirely” — a stronger claim than the sentence supports; tempting because it looks similar to “alleviate”." },
          { word: "allocate", fitLabel: "Wrong meaning", good: false, note: "means “to assign” — doesn't fit fixing a problem at all." },
          { word: "alter", fitLabel: "Wrong meaning", good: false, note: "means “to change” — too vague; it doesn't specify improvement the way the sentence implies." },
        ]}
      />
    </>
  );
}
