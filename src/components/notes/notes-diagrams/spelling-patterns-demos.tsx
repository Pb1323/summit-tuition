"use client";

import { ClickErrorSentence } from "./click-error-sentence";

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
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["It", "was", "not", "possable", "to", "finish", "the", "marathon", "without", "proper", "training."]}
      errorIdx={3}
      correction={'"possible" is one of the words that takes -ible, not -able: "possible."'}
      wrongHint="find the word meaning “able to happen” and check its ending."
    />
  );
}

export function AnceEnceDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Her", "confidance", "grew", "with", "every", "performance", "she", "gave", "on", "stage."]}
      errorIdx={1}
      correction={'"confident" ends in -ent, so its noun form takes -ence, not -ance: "confidence."'}
      wrongHint="find the word describing her self-belief and check its ending."
    />
  );
}

export function DoublingConsonantDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["He", "was", "stoping", "the", "ball", "skilfully", "during", "the", "football", "match."]}
      errorIdx={2}
      correction={'"stop" is a one-syllable word with a short vowel before a single final consonant, so the p doubles before -ing: "stopping."'}
      wrongHint="find the word describing what he was doing to the ball — it's missing a doubled letter."
    />
  );
}

export function SilentEDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "was", "hopeing", "to", "see", "her", "friends", "at", "the", "party", "this", "weekend."]}
      errorIdx={2}
      correction={'"hope" ends in a silent e, which is dropped before the vowel suffix -ing: "hoping."'}
      wrongHint="one word keeps a letter that should have been dropped before its ending."
    />
  );
}

export function YToIDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "little", "girl", "felt", "great", "happyness", "when", "she", "opened", "her", "presents."]}
      errorIdx={5}
      correction={'"happy" follows a consonant, so the y changes to i before most suffixes: "happiness."'}
      wrongHint="one word keeps a y that should have changed to i before its ending."
    />
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
