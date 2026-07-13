"use client";

import { ClickFillGap } from "./click-fill-gap";
import { ContextClueHighlighter } from "./context-clue-highlighter";

const INSTRUCTION = "Click the word that correctly fills the gap.";

/** 1. Definition of a cloze test */
export function ClozeDefinitionDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="A cloze test removes certain words from a passage and asks you to fill each"
      options={["paragraph", "gap", "title", "list"]}
      correctIdx={1}
      after="back in."
      correction="“gap” is the word removed from the passage that you must fill back in — that’s the whole idea of a cloze test."
      wrongHint="Think about what’s missing from the passage — a single word, not a whole sentence or paragraph."
    />
  );
}

/** 2. GL/CEM/CSSE format differences */
export function FormatDifferencesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Some cloze papers give you a word bank to choose from, while others expect you to think of the missing word"
      options={["aloud", "twice", "yourself", "instead"]}
      correctIdx={2}
      after="without any options listed."
      correction="“yourself” — without a word bank, you must supply the missing word from your own vocabulary, not select from a list."
      wrongHint="Focus on who is responsible for finding the word when there’s no list to choose from."
    />
  );
}

/** 3. Multiple-choice cloze vs. open cloze */
export function McVsOpenClozeDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="When a cloze question gives you several words to choose from, it is called"
      options={["multiple-choice cloze", "open cloze", "free writing", "a comprehension check"]}
      correctIdx={0}
      after="because you select the answer rather than writing it yourself."
      correction="“multiple-choice cloze” — you are picking from a set of options, exactly like the exercise you just completed."
      wrongHint="Think about the exercise you just did — you clicked an option instead of writing anything."
    />
  );
}

/** 4. Why cloze tests grammar AND comprehension together */
export function GrammarAndComprehensionDemo() {
  return (
    <>
      <ClickFillGap
        instruction={INSTRUCTION}
        before="The dog wagged"
        options={["it's", "their", "his", "its"]}
        correctIdx={3}
        after="tail happily when its owner came home."
        correction="“its” is both grammatically correct (the possessive form, no apostrophe) and makes sense (the dog owns the tail) — cloze answers must satisfy grammar and meaning at once."
        wrongHint="Check both the grammar (is it possessive?) and the meaning (whose tail is it?)."
      />
      <ContextClueHighlighter
        heading="Find the clues that fix the answer"
        tokens={[
          { text: "The" },
          {
            text: "dog",
            clue: true,
            note: "“dog” is a singular, non-person antecedent — that rules out “their” (plural) and “his” (a person), leaving only “its”.",
          },
          { text: "wagged" },
          { text: "___" },
          { text: "tail" },
          { text: "happily" },
          { text: "when" },
          { text: "its" },
          {
            text: "owner",
            clue: true,
            note: "“owner” confirms the meaning fits too — the dog owns both the tail and, grammatically, needs the matching possessive “its”.",
          },
          { text: "came" },
          { text: "home." },
        ]}
      />
    </>
  );
}

/** 5. Structure of a typical cloze passage (one gap from a longer passage) */
export function PassageStructureDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The old house stood at the end of the lane, its windows"
      options={["loudly", "tightly", "brightly", "slowly"]}
      correctIdx={1}
      after="shut against the wind."
      correction="“tightly” fits windows shut firmly against the wind — in a full cloze passage, several gaps like this one would be spread through the text."
      wrongHint="Think about how windows would be shut to keep out a strong wind."
    />
  );
}

/** 6. How cloze answers are marked (exact word vs. accepted synonym) */
export function ClozeMarkingDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The correct answer for this gap is “began”, but some exam boards would also accept the close synonym"
      options={["finished", "stopped", "started", "opened"]}
      correctIdx={2}
      after="depending on their marking rules."
      correction="“started” is a close synonym of “began” — some boards accept synonyms, others require the exact word, so always check the instructions."
      wrongHint="Look for the word closest in meaning to “began”, not simply any word that could follow."
    />
  );
}

/** 7. Common misconceptions (grammar fit alone isn't enough) */
export function ClozeMisconceptionsDemo() {
  return (
    <>
      <ClickFillGap
        instruction={INSTRUCTION}
        before="The kitten was so"
        options={["tired", "square", "seven", "loud"]}
        correctIdx={0}
        after="that it slept for most of the day."
        correction="“tired” makes sense with sleeping all day — a common mistake is picking a word just because it’s the right part of speech, like “square”, without checking that the meaning fits."
        wrongHint="All the options could grammatically sit in this gap — but only one actually makes sense with the rest of the sentence."
      />
      <ContextClueHighlighter
        heading="Find the clue that rules out the traps"
        tokens={[
          { text: "The" },
          { text: "kitten" },
          { text: "was" },
          { text: "so" },
          { text: "___" },
          { text: "that" },
          { text: "it" },
          {
            text: "slept",
            clue: true,
            note: "“slept” is the key clue — every option is grammatically possible in the gap, but only “tired” actually connects to sleeping.",
          },
          { text: "for" },
          { text: "most" },
          { text: "of" },
          {
            text: "the",
          },
          {
            text: "day.",
            clue: true,
            note: "“most of the day” reinforces it — a long stretch of sleep fits “tired”, not “square”, “seven” or “loud”.",
          },
        ]}
      />
    </>
  );
}

/** 8. Why reading the whole passage first matters */
export function ReadPassageFirstDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="By the end of the story we learn that the narrator, who claimed to be an only child, actually has a"
      options={["bicycle", "sister", "holiday", "recipe"]}
      correctIdx={1}
      after="she rarely mentions."
      correction="“sister” only makes sense once you know from earlier in the passage that the narrator isn’t really an only child — reading the whole passage first often reveals clues like this."
      wrongHint="This gap depends on information given earlier in the passage — think about what’s being revealed here."
    />
  );
}

/** 9. Combined skills: vocabulary + grammar + comprehension */
export function CombinedSkillsDemo() {
  return (
    <>
      <ClickFillGap
        instruction={INSTRUCTION}
        before="Although she had practised for weeks, Amira still felt"
        options={["nerve", "nervous", "nervously", "nerved"]}
        correctIdx={1}
        after="before walking on stage."
        correction="“nervous” is the correct adjective form to follow “felt” — choosing it needs grammar (adjective after a linking verb), vocabulary (knowing the word forms), and comprehension (matching the anxious mood of the sentence)."
        wrongHint="Check the word’s grammatical form as well as whether its meaning fits the feeling being described."
      />
      <ContextClueHighlighter
        heading="Three skills, three clues"
        tokens={[
          { text: "Although" },
          {
            text: "she",
          },
          { text: "had" },
          {
            text: "practised",
            clue: true,
            note: "“practised for weeks” tells you this is about a performance — that's the comprehension clue setting the scene.",
          },
          { text: "for" },
          { text: "weeks," },
          { text: "Amira" },
          {
            text: "still",
            clue: true,
            note: "“still felt” needs an adjective straight after it, not a noun or adverb — that's the grammar clue narrowing the word form.",
          },
          { text: "felt" },
          { text: "___" },
          { text: "before" },
          {
            text: "walking",
            clue: true,
            note: "“walking on stage” confirms the vocabulary clue — the feeling fits stage fright, which is “nervous”, not “nerve” or “nerved”.",
          },
          { text: "on" },
          { text: "stage." },
        ]}
      />
    </>
  );
}

/** 10. Setting expectations: mixed grammar-fit and meaning-fit review */
export function ClozeExpectationsDemo() {
  return (
    <>
      <ClickFillGap
        instruction={INSTRUCTION}
        before="Although the forecast promised sunshine, the sky grew"
        options={["darkly", "brighter", "darker", "dark"]}
        correctIdx={2}
        after="and heavy rain began to fall."
        correction="“darker” fits both the grammar (an adjective after “grew”) and the meaning (a change matching the surprise contrast with the sunny forecast and the rain that follows) — combining a grammar-fit trap (“darkly”, the wrong word class) with a meaning-fit trap (“brighter”, the wrong direction)."
        wrongHint="Check both word class and meaning — one option is the wrong part of speech, another is the wrong idea entirely."
      />
      <ContextClueHighlighter
        heading="Two traps, two clues that rule them out"
        tokens={[
          {
            text: "Although",
            clue: true,
            note: "“Although” signals a contrast is coming — the sky should move away from “sunshine”, ruling out “brighter”.",
          },
          { text: "the" },
          { text: "forecast" },
          { text: "promised" },
          { text: "sunshine," },
          { text: "the" },
          { text: "sky" },
          { text: "grew" },
          { text: "___" },
          { text: "and" },
          {
            text: "heavy",
            clue: true,
            note: "“heavy rain” confirms the direction of change and the word class — it needs a comparative adjective after “grew”, matching “darker”, not the adverb “darkly”.",
          },
          { text: "rain" },
          { text: "began" },
          { text: "to" },
          { text: "fall." },
        ]}
      />
    </>
  );
}
