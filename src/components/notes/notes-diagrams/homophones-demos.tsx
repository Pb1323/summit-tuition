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

export function HomophonesVsNearHomophonesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "storm", "will", "badly", "effect", "the", "farmers'", "crops", "this", "season."]}
      errorIdx={4}
      correction={'"effect" is usually a noun — the verb needed here, meaning "to influence", is "affect": will badly affect the farmers\' crops.'}
      wrongHint="check whether this word should be a verb describing an action, or the noun for a result."
    />
  );
}

export function ContractionPossessiveHomophonesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "players", "grabbed", "they're", "kit", "bags", "and", "ran", "onto", "the", "pitch."]}
      errorIdx={3}
      correction={'"they\'re" expands to "they are kit bags", which makes no sense — the possessive "their" is needed: grabbed their kit bags.'}
      wrongHint="expand the apostrophe word into two words and check whether it still makes sense before “kit bags”."
    />
  );
}

export function CommonlyMisspelledExamHomophonesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "whole", "class", "had", "extra", "spelling", "practise", "before", "the", "big", "test."]}
      errorIdx={6}
      correction={'"practise" is the verb spelling — the noun needed here for a scheduled activity is "practice": extra spelling practice.'}
      wrongHint="check whether this word should be the noun (a thing) or the verb (an action)."
    />
  );
}

export function FormalHomophoneTrapsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Her", "grandmother", "always", "gave", "wise", "advise", "about", "money."]}
      errorIdx={5}
      correction={'"advise" is the verb spelling — the noun needed here for a suggestion is "advice": always gave wise advice.'}
      wrongHint="check whether this word should be the noun (a thing) or the verb (an action)."
    />
  );
}

export function HomophonesMultiMeaningWordsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "carpenter", "cut", "a", "long", "wooden", "bored", "for", "the", "new", "shelf."]}
      errorIdx={6}
      correction={'"bored" means feeling uninterested — the word needed here for a flat piece of wood is "board": a long wooden board.'}
      wrongHint="check whether this word should name a flat piece of wood or describe feeling uninterested."
    />
  );
}
