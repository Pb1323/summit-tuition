"use client";

import { ClickErrorSentence } from "./click-error-sentence";

const INSTRUCTION = "One word in this sentence has been used incorrectly. Click the word you think is wrong.";

export function DependentPrepositionsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "has", "always", "been", "interested", "on", "astronomy", "and", "space", "travel."]}
      errorIdx={5}
      correction={'"interested" pairs with the preposition "in", not "on" — a fixed phrase that has to be learned: interested in astronomy.'}
      wrongHint="this adjective always teams up with the same one preposition, whatever the sentence is about."
    />
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
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Neither", "the", "coach", "or", "the", "players", "were", "happy", "with", "the", "result."]}
      errorIdx={3}
      correction={'"neither" is always paired with "nor", never "or" — correlative conjunctions come as a fixed matching pair: neither the coach nor the players.'}
      wrongHint="this conjunction pair always travels together, and one half of the pair here doesn't match the other."
    />
  );
}
