"use client";

import { ClickErrorSentence } from "./click-error-sentence";

export function ContractionPossessiveDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["The", "dog", "wagged", "it's", "tail", "happily."]}
      errorIdx={3}
      correction={`"it's" (with an apostrophe) means "it is" — the possessive form needed here has no apostrophe: its tail.`}
      wrongHint="Check whether the word shows ownership or is short for “it is”."
    />
  );
}

export function SingularPossessionDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["The", "dogs", "bone", "was", "buried", "under", "the", "tree."]}
      errorIdx={1}
      correction={`"dogs" should be "dog's" — one dog owns the bone, so add an apostrophe and s.`}
      wrongHint="Find the word that shows who the bone belongs to."
    />
  );
}

export function PluralPossessionDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["The", "students", "books", "were", "stacked", "neatly", "on", "the", "shelf."]}
      errorIdx={1}
      correction={`"students" should be "students'" — for a regular plural noun that already ends in s, just add an apostrophe after the s.`}
      wrongHint="Several students own these books — check how the plural possessive should be marked."
    />
  );
}

export function IrregularPluralPossessionDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["The", "childrens'", "coats", "hung", "by", "the", "door."]}
      errorIdx={1}
      correction={`"childrens'" should be "children's" — "children" is already plural, so it takes 's like a singular noun, not an apostrophe after an s that isn't there.`}
      wrongHint="“Children” doesn’t form its plural by adding an s — check what that means for the possessive."
    />
  );
}

export function JointSeparatePossessionDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["Alex's", "and", "Jess's", "project", "won", "first", "prize."]}
      errorIdx={0}
      correction={`"Alex's" should be "Alex" — Alex and Jess share one project (joint possession), so only the second name needs the apostrophe: Alex and Jess's project.`}
      wrongHint="Ask whether Alex and Jess own one shared thing or two separate things."
    />
  );
}

export function DecadesLettersApostropheDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["In", "the", "1980's,", "computers", "were", "still", "rare", "in", "homes."]}
      errorIdx={2}
      correction={`"1980's" should be "1980s" — decades are simple plurals and don't need an apostrophe.`}
      wrongHint="Check whether this number is showing possession, or is simply plural."
    />
  );
}

export function GreengrocersApostropheDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["Fresh", "banana's", "are", "on", "sale", "at", "the", "market."]}
      errorIdx={1}
      correction={`"banana's" should be "bananas" — this is a simple plural, not a possessive, so it needs no apostrophe.`}
      wrongHint="Nothing in this sentence belongs to the bananas — so why would they need an apostrophe?"
    />
  );
}

export function PossessivePronounNoApostropheDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["That", "laptop", "is", "her's,", "not", "mine."]}
      errorIdx={3}
      correction={`"her's" should be "hers" — possessive pronouns never take an apostrophe.`}
      wrongHint="Possessive pronouns like hers, his and ours are never written with an apostrophe."
    />
  );
}

export function NamesEndingInSDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["James'", "school", "bag", "was", "left", "on", "the", "bus."]}
      errorIdx={0}
      correction={`"James'" should be "James's" — modern usage (and 11+ exam convention) adds 's to most singular names ending in s, since it's spoken with an extra syllable.`}
      wrongHint="Say the name and the extra syllable out loud — how would you spell what you hear?"
    />
  );
}

export function MixedApostropheReviewDemo() {
  return (
    <ClickErrorSentence
      instruction="Click the word with the error."
      words={["The", "three", "sister's", "shared", "a", "bedroom", "growing", "up."]}
      errorIdx={2}
      correction={`"sister's" should be "sisters'" — three sisters share the bedroom, so it needs the plural possessive, not the singular one.`}
      wrongHint="Count how many sisters are sharing the bedroom before deciding where the apostrophe goes."
    />
  );
}
