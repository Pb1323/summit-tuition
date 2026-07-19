"use client";

import { ClickErrorSentence } from "./click-error-sentence";
import { ApostrophePlacementDiagram } from "./apostrophe-placement-diagram";

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
    <>
      <ClickErrorSentence
        instruction="Click the word with the error."
        words={["The", "dogs", "bone", "was", "buried", "under", "the", "tree."]}
        errorIdx={1}
        correction={`"dogs" should be "dog's" — one dog owns the bone, so add an apostrophe and s.`}
        wrongHint="Find the word that shows who the bone belongs to."
      />
      <ApostrophePlacementDiagram
        heading="Test where the apostrophe goes"
        helper="Click a spelling to test it against “one girl owns a violin.”"
        context="one girl owns a violin"
        candidates={[
          { form: "girls violin", apostropheAt: -1, valid: false, note: "no apostrophe at all — this doesn't show that the violin belongs to anyone." },
          { form: "girl's violin", apostropheAt: 4, valid: true, note: "correct — one owner takes an apostrophe before the s: girl's." },
          { form: "girls' violin", apostropheAt: 5, valid: false, note: "the apostrophe after the s marks a plural owner — but there's only one girl here." },
        ]}
      />
    </>
  );
}

export function PluralPossessionDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction="Click the word with the error."
        words={["The", "students", "books", "were", "stacked", "neatly", "on", "the", "shelf."]}
        errorIdx={1}
        correction={`"students" should be "students'" — for a regular plural noun that already ends in s, just add an apostrophe after the s.`}
        wrongHint="Several students own these books — check how the plural possessive should be marked."
      />
      <ApostrophePlacementDiagram
        heading="Test where the apostrophe goes"
        helper="Click a spelling to test it against “several players own kits.”"
        context="several players own kits"
        candidates={[
          { form: "players kits", apostropheAt: -1, valid: false, note: "no apostrophe at all — this doesn't show the kits belong to the players." },
          { form: "player's kits", apostropheAt: 6, valid: false, note: "this spells the singular possessive — but there is more than one player here." },
          { form: "players' kits", apostropheAt: 7, valid: true, note: "correct — a regular plural already ending in s just adds an apostrophe after the s: players'." },
        ]}
      />
    </>
  );
}

export function IrregularPluralPossessionDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction="Click the word with the error."
        words={["The", "childrens'", "coats", "hung", "by", "the", "door."]}
        errorIdx={1}
        correction={`"childrens'" should be "children's" — "children" is already plural, so it takes 's like a singular noun, not an apostrophe after an s that isn't there.`}
        wrongHint="“Children” doesn’t form its plural by adding an s — check what that means for the possessive."
      />
      <ApostrophePlacementDiagram
        heading="Test the irregular plural"
        helper="Click a spelling to test it against “the toys belong to the children.”"
        context="the toys belong to the children"
        candidates={[
          { form: "childrens toys", apostropheAt: -1, valid: false, note: "there's no plain word “childrens” to begin with — “children” is already the full plural." },
          { form: "children's toys", apostropheAt: 8, valid: true, note: "correct — since “children” doesn't end in s, it takes 's exactly like a singular noun." },
          { form: "childrens' toys", apostropheAt: 9, valid: false, note: "this wrongly invents a plural “childrens” and then adds an apostrophe after it — there's no such word to build from." },
        ]}
      />
    </>
  );
}

export function JointSeparatePossessionDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction="Click the word with the error."
        words={["Alex's", "and", "Jess's", "project", "won", "first", "prize."]}
        errorIdx={0}
        correction={`"Alex's" should be "Alex" — Alex and Jess share one project (joint possession), so only the second name needs the apostrophe: Alex and Jess's project.`}
        wrongHint="Ask whether Alex and Jess own one shared thing or two separate things."
      />
      <ApostrophePlacementDiagram
        heading="Test joint vs. separate possession"
        helper="Click a version to test it against “Mia and Tom share one house.”"
        context="Mia and Tom share one house"
        candidates={[
          { form: "Mia's and Tom's house", apostropheAt: 3, valid: false, note: "an apostrophe on both names signals two separate houses — but they share just one." },
          { form: "Mia and Tom's house", apostropheAt: 11, valid: true, note: "correct — one shared thing needs only one apostrophe, on the second name: Mia and Tom's." },
          { form: "Mia and Toms house", apostropheAt: -1, valid: false, note: "with no apostrophe at all, the sentence no longer shows any ownership of the house." },
        ]}
      />
    </>
  );
}

export function DecadesLettersApostropheDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction="Click the word with the error."
        words={["In", "the", "1980's,", "computers", "were", "still", "rare", "in", "homes."]}
        errorIdx={2}
        correction={`"1980's" should be "1980s" — decades are simple plurals and don't need an apostrophe.`}
        wrongHint="Check whether this number is showing possession, or is simply plural."
      />
      <ApostrophePlacementDiagram
        heading="Test a plural decade"
        helper="Click a spelling to test it against “more than one year in the 1990s.”"
        context="a plural decade — not a possessive"
        candidates={[
          { form: "1990s", apostropheAt: -1, valid: true, note: "correct — a decade is a simple plural, so it never needs an apostrophe." },
          { form: "1990's", apostropheAt: 4, valid: false, note: "this adds a possessive-style apostrophe out of habit, but a decade doesn't own anything." },
        ]}
      />
    </>
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
    <>
      <ClickErrorSentence
        instruction="Click the word with the error."
        words={["James'", "school", "bag", "was", "left", "on", "the", "bus."]}
        errorIdx={0}
        correction={`"James'" should be "James's" — modern usage (and 11+ exam convention) adds 's to most singular names ending in s, since it's spoken with an extra syllable.`}
        wrongHint="Say the name and the extra syllable out loud — how would you spell what you hear?"
      />
      <ApostrophePlacementDiagram
        heading="Test the exam-convention spelling"
        helper="Click a spelling to test it against “one bike belonging to Silas.”"
        context="one bike belonging to Silas"
        candidates={[
          { form: "Silas' bike", apostropheAt: 5, valid: false, note: "the older apostrophe-only style — not the exam convention expected here." },
          { form: "Silas's bike", apostropheAt: 5, valid: true, note: "correct — the 11+ convention adds a full 's, matching the extra syllable you say aloud: “Silas-iz.”" },
        ]}
      />
    </>
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
