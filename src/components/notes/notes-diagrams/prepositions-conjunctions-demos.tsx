"use client";

import { ClickErrorSentence } from "./click-error-sentence";
import { ReferenceArrowDiagram } from "./reference-arrow-diagram";

const INSTRUCTION = "One word in this sentence has been used incorrectly. Click the word you think is wrong.";

export function DependentPrepositionsDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["She", "has", "always", "been", "interested", "on", "astronomy", "and", "space", "travel."]}
        errorIdx={5}
        correction={'"interested" pairs with the preposition "in", not "on" — a fixed phrase that has to be learned: interested in astronomy.'}
        wrongHint="this adjective always teams up with the same one preposition, whatever the sentence is about."
      />
      <ReferenceArrowDiagram
        heading="Test the fixed partner of “afraid”"
        helper="Click each preposition to test whether it's the one fixed partner “afraid” always takes."
        target="afraid ___ spiders"
        candidates={[
          { label: "of", valid: true, note: "correct — “afraid” is a fixed pairing with “of”, learned as a phrase, not worked out from a rule." },
          { label: "from", valid: false, note: "“afraid from” is not a real fixed phrase in English, however logical it might sound." },
          { label: "for", valid: false, note: "“afraid for” exists but means worried on someone else's behalf (afraid for you) — a different meaning from fearing spiders." },
        ]}
      />
    </>
  );
}

export function EndOfSentencePrepositionDemo() {
  return (
    <ClickErrorSentence
      instruction="This sentence has been awkwardly rewritten to avoid ending on a preposition. Click the word that makes it sound stiff and unnatural."
      words={["That", "is", "the", "book", "about", "which", "I", "was", "telling", "you."]}
      errorIdx={5}
      correction={'ending a sentence with a preposition is not a real grammar error — "that\'s the book I was telling you about" is natural, correct English. Forcing "about which" in front just to avoid it makes the sentence stiffer, not more correct.'}
      wrongHint="one word here has been dragged to an earlier position purely to dodge ending the sentence on a preposition."
    />
  );
}

export function CoordinatingSubordinatingDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Because", "the", "match", "was", "cancelled,", "so", "we", "played", "cards", "instead."]}
      errorIdx={5}
      correction={'"because" (a subordinating conjunction) already links the two ideas — pairing it with "so" (a coordinating conjunction) does the same job twice. Remove "so": Because the match was cancelled, we played cards instead.'}
      wrongHint="one subordinating conjunction at the start of this sentence has been paired with a coordinating conjunction that repeats its job."
    />
  );
}

export function CorrelativeConjunctionsDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["Neither", "the", "coach", "or", "the", "players", "were", "happy", "with", "the", "result."]}
        errorIdx={3}
        correction={'"neither" is always paired with "nor", never "or" — correlative conjunctions come as a fixed matching pair: neither the coach nor the players.'}
        wrongHint="this conjunction pair always travels together, and one half of the pair here doesn't match the other."
      />
      <ReferenceArrowDiagram
        heading="Test the matching partner of “neither”"
        helper="Click each option to test whether it correctly completes the correlative pair started by “neither.”"
        target="neither the bus ___ the train"
        candidates={[
          { label: "nor", valid: true, note: "correct — “neither” always pairs with “nor”, never “or”, forming a fixed matching set." },
          { label: "or", valid: false, note: "“or” pairs with “either”, not “neither” — mixing the two pairs is one of the most common correlative errors." },
          { label: "and", valid: false, note: "“and” doesn't complete a correlative pair with “neither” at all." },
        ]}
      />
    </>
  );
}
