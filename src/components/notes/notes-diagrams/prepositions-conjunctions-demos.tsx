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

export function WhatArePrepositionsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["There", "were", "three", "books", "at", "the", "shelf."]}
      errorIdx={4}
      correction={'"at" doesn\'t fit a flat surface — a shelf needs "on", which shows position on top of something: three books on the shelf.'}
      wrongHint="this preposition should describe resting on top of a flat surface, not a general point."
    />
  );
}

export function WhatAreConjunctionsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["We", "could", "walk", "nor", "cycle", "to", "the", "park."]}
      errorIdx={3}
      correction={'"nor" only pairs with a negative word like "neither" earlier in the sentence — a simple choice between two options needs "or": walk or cycle.'}
      wrongHint="this word only belongs after a negative word like “neither” — check if one appears earlier in the sentence."
    />
  );
}

export function PrepositionsTimePlaceMovementDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "meeting", "begins", "on", "half", "past", "nine."]}
      errorIdx={3}
      correction={'"on" is used for days and dates — a precise clock time needs "at", the smallest unit in the time pattern: begins at half past nine.'}
      wrongHint="check the size of the time period this preposition is describing — a precise clock time needs the smallest one."
    />
  );
}

export function PrepositionOrPhrasalVerbParticleDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["We", "ran", "a", "problem", "into", "during", "the", "trip."]}
      errorIdx={4}
      correction={'"run into" (meaning to unexpectedly encounter) is an inseparable phrasal verb — its particle "into" can\'t be pulled away from the verb by the object: we ran into a problem during the trip.'}
      wrongHint="this phrasal verb meaning “to unexpectedly encounter” doesn't allow its particle to be pulled away from the verb by the object."
    />
  );
}

export function ConjunctiveAdverbsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "shop", "was", "closing,", "moreover", "the", "queue", "was", "still", "long."]}
      errorIdx={3}
      correction={'"moreover" is a conjunctive adverb joining two independent clauses — a single comma isn\'t strong enough before it; it needs a semicolon: "The shop was closing; moreover, the queue was still long."'}
      wrongHint="check whether the punctuation right before “moreover” is strong enough to separate two complete sentences."
    />
  );
}
