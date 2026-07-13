"use client";

import { ClickErrorSentence } from "./click-error-sentence";

const INSTRUCTION = "One word in this sentence is the wrong homophone. Click the word you think is wrong.";

export function WhatAreHomophonesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "knight", "rode", "his", "horse", "threw", "the", "village", "gates."]}
      errorIdx={5}
      correction={'"threw" (past tense of "throw") sounds identical to "through" (meaning "from one side to the other"), which is the word needed here: rode his horse through the village gates.'}
      wrongHint="find the word that sounds right when read aloud, but is spelled as the wrong meaning entirely."
    />
  );
}

export function CommonHomophonePairsOneDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "woman", "who's", "coat", "was", "left", "behind", "came", "back", "for", "it."]}
      errorIdx={2}
      correction={'"who\'s" means "who is", which makes no sense before "coat" — the possessive "whose" is needed: the woman whose coat was left behind.'}
      wrongHint="expand the apostrophe word into two words and check whether it still makes sense before “coat”."
    />
  );
}

export function CommonHomophonePairsTwoDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "gave", "her", "sister", "a", "complement", "on", "the", "beautiful", "dress."]}
      errorIdx={5}
      correction={'"complement" means something that completes or goes well with something else — the word needed here, for a nice remark, is "compliment": gave her sister a compliment.'}
      wrongHint="this word is about a kind remark, not about two things going well together."
    />
  );
}

export function SilentDifferenceHomophonesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "cyclist", "had", "to", "break", "suddenly", "when", "the", "fox", "ran", "across", "the", "road."]}
      errorIdx={4}
      correction={'"break" means to split or shatter something — the word needed to describe slowing a vehicle down is "brake": had to brake suddenly.'}
      wrongHint="find the word describing what a cyclist does to slow down, and check whether it's spelled as the vehicle-control word or the “shatter” word."
    />
  );
}
