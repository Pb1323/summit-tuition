"use client";

import { ClickErrorSentence } from "./click-error-sentence";
import { WordAnatomyBreakdown } from "./word-anatomy-breakdown";

const INSTRUCTION = "One word in this sentence has been misspelled. Click the word you think is wrong.";

export function IBeforeEDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "recieved", "a", "beautiful", "necklace", "for", "her", "birthday", "from", "her", "grandmother."]}
      errorIdx={1}
      correction={'"recieved" comes right after no "c", so the usual rule applies — i before e: "received."'}
      wrongHint="find the word for “was given” and check the order of its two vowels."
    />
  );
}

export function TionSionDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["There", "was", "a", "lot", "of", "confussion", "in", "the", "classroom", "before", "the", "fire", "alarm", "was", "explained."]}
      errorIdx={5}
      correction={'"confussion" has an extra s — the "zhun" sound here is spelled -sion with a single s: "confusion."'}
      wrongHint="the word describing the chaos in the classroom has one letter too many."
    />
  );
}

export function AbleIbleDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["It", "was", "not", "possable", "to", "finish", "the", "marathon", "without", "proper", "training."]}
        errorIdx={3}
        correction={'"possible" is one of the words that takes -ible, not -able: "possible."'}
        wrongHint="find the word meaning “able to happen” and check its ending."
      />
      <WordAnatomyBreakdown
        heading="Word anatomy: possible"
        ruleNote="most -able/-ible words follow no visual clue, so this small set has to be learned by sight — “possible” is one of the common -ible exceptions."
        segments={[
          { text: "poss", kind: "root", note: "the root carries the core meaning — it comes from the Latin “posse”, to be able." },
          {
            text: "ible",
            kind: "suffix",
            changed: true,
            wrongVariant: "able",
            note: "“possible” takes -ible, not the more common -able — click to compare the two spellings side by side.",
          },
        ]}
      />
    </>
  );
}

export function AnceEnceDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["Her", "confidance", "grew", "with", "every", "performance", "she", "gave", "on", "stage."]}
        errorIdx={1}
        correction={'"confident" ends in -ent, so its noun form takes -ence, not -ance: "confidence."'}
        wrongHint="find the word describing her self-belief and check its ending."
      />
      <WordAnatomyBreakdown
        heading="Word anatomy: confidence"
        ruleNote="a quick test: check the related adjective. “-ent” adjectives usually pair with “-ence” nouns; “-ant” adjectives usually pair with “-ance” nouns."
        segments={[
          { text: "confid", kind: "root", note: "the shared root meaning “to trust” or “believe in”." },
          {
            text: "ence",
            kind: "suffix",
            changed: true,
            wrongVariant: "ance",
            note: "the related adjective is “confident” (-ent), so the noun takes -ence, not -ance — click to compare the spellings.",
          },
        ]}
      />
    </>
  );
}

export function DoublingConsonantDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["He", "was", "stoping", "the", "ball", "skilfully", "during", "the", "football", "match."]}
        errorIdx={2}
        correction={'"stop" is a one-syllable word with a short vowel before a single final consonant, so the p doubles before -ing: "stopping."'}
        wrongHint="find the word describing what he was doing to the ball — it's missing a doubled letter."
      />
      <WordAnatomyBreakdown
        heading="Word anatomy: stopping"
        ruleNote="the doubling rule: one syllable, one short vowel, one final consonant — double that consonant before adding a suffix that starts with a vowel."
        segments={[
          { text: "stop", kind: "root", note: "one syllable, short vowel “o”, ends in a single consonant “p” — that's what triggers doubling." },
          {
            text: "p",
            kind: "suffix",
            changed: true,
            wrongVariant: "",
            note: "click to see what happens without the doubled consonant — “stoping” looks like it should rhyme with “hoping”, not “stopping”.",
          },
          { text: "ing", kind: "suffix", note: "the standard present-participle ending — the trigger for the doubling rule." },
        ]}
      />
    </>
  );
}

export function SilentEDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["She", "was", "hopeing", "to", "see", "her", "friends", "at", "the", "party", "this", "weekend."]}
        errorIdx={2}
        correction={'"hope" ends in a silent e, which is dropped before the vowel suffix -ing: "hoping."'}
        wrongHint="one word keeps a letter that should have been dropped before its ending."
      />
      <WordAnatomyBreakdown
        heading="Word anatomy: hoping"
        ruleNote="the silent-e rule: drop a word's final silent e before adding a suffix that starts with a vowel (like -ing or -ed)."
        segments={[
          { text: "hop", kind: "root", note: "“hope” loses its silent e once a vowel suffix is attached." },
          {
            text: "ing",
            kind: "suffix",
            changed: true,
            wrongVariant: "eing",
            note: "keeping the silent e before -ing gives the wrong “hopeing” — click to compare it with the correct “hoping”.",
          },
        ]}
      />
    </>
  );
}

export function YToIDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["The", "little", "girl", "felt", "great", "happyness", "when", "she", "opened", "her", "presents."]}
        errorIdx={5}
        correction={'"happy" follows a consonant, so the y changes to i before most suffixes: "happiness."'}
        wrongHint="one word keeps a y that should have changed to i before its ending."
      />
      <WordAnatomyBreakdown
        heading="Word anatomy: happiness"
        ruleNote="the y-to-i rule: when a word ends in a consonant + y, change the y to i before adding most suffixes (but keep the y before -ing)."
        segments={[
          { text: "happ", kind: "root", note: "the root meaning “happy”, before its consonant + y ending." },
          {
            text: "i",
            kind: "suffix",
            changed: true,
            wrongVariant: "y",
            note: "“happy” ends in a consonant + y, so the y changes to i before this suffix — click to compare “happyness” with “happiness”.",
          },
          { text: "ness", kind: "suffix", note: "turns the adjective “happy” into the noun “happiness”." },
        ]}
      />
    </>
  );
}

export function AryEryDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "teacher", "asked", "us", "to", "bring", "extra", "stationary", "for", "the", "art", "lesson."]}
      errorIdx={7}
      correction={'"stationary" means "not moving" — the word for pens and paper is spelled "stationery," ending in -ery.'}
      wrongHint="this word has a famous twin that sounds identical but means something different."
    />
  );
}

export function CeedCedeSedeDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "head", "teacher", "hoped", "the", "new", "rules", "would", "superceed", "the", "old", "ones", "by", "September."]}
      errorIdx={8}
      correction={'only one English word ends in -sede: "supersede" — this is often wrongly written as "superceed" or "supercede."'}
      wrongHint="this word means “to replace” and belongs to the smallest, trickiest ending family in English."
    />
  );
}

export function ExceptionWordsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "weird", "noises", "from", "the", "attic", "frightened", "the", "whole", "family,", "but", "nobody", "could", "explaine", "where", "they", "came", "from."]}
      errorIdx={13}
      correction={'"explain" has no final e — "explaine" wrongly adds one that does not belong: "explain."'}
      wrongHint="one word has an extra silent e added on the end that doesn't belong there."
    />
  );
}
