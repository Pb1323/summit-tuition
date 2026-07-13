"use client";

import { ClickErrorSentence } from "./click-error-sentence";
import { ParallelListAligner } from "./parallel-list-aligner";

const INSTRUCTION = "One word in this sentence has been used incorrectly. Click the word you think is wrong.";

export function NounsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Last", "summer", "we", "travelled", "to", "paris", "to", "visit", "my", "aunt."]}
      errorIdx={5}
      correction={'"paris" is a proper noun (a specific city) and must start with a capital letter: Paris.'}
      wrongHint="look for a word naming a specific place."
    />
  );
}

export function VerbsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["By", "the", "time", "we", "arrived,", "the", "film", "had", "already", "start."]}
      errorIdx={9}
      correction={'"start" needs the past participle after "had already" — it should be "started."'}
      wrongHint="the helping verb “had” needs a specific verb form to follow it."
    />
  );
}

export function AdjectivesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "wore", "a", "leather", "beautiful", "black", "jacket", "to", "the", "party."]}
      errorIdx={4}
      correction={'adjectives follow a set order (opinion, then material) — "beautiful" (opinion) must come before "black" and "leather" (material): a beautiful black leather jacket.'}
      wrongHint="check the order the describing words appear in before the noun “jacket.”"
    />
  );
}

export function AdverbsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "dog", "ran", "quick", "across", "the", "muddy", "field", "to", "greet", "us."]}
      errorIdx={3}
      correction={'"quick" describes how the dog ran, so it needs the adverb form: "quickly," not the adjective "quick."'}
      wrongHint="find the word describing how the dog ran, not what the dog is."
    />
  );
}

export function PronounsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Me", "and", "my", "brother", "built", "a", "den", "at", "the", "bottom", "of", "the", "garden."]}
      errorIdx={0}
      correction={'"Me" is an object pronoun, but it is the subject of the sentence here — it should be "I": I and my brother... (better: My brother and I).'}
      wrongHint="check the very first word — is it a subject pronoun or an object pronoun?"
    />
  );
}

export function PrepositionsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "cat", "jumped", "in", "the", "table", "and", "knocked", "over", "the", "lamp."]}
      errorIdx={3}
      correction={'"in the table" describes being inside it — the cat jumped up onto its surface, so the correct preposition is "onto."'}
      wrongHint="think about the actual position the cat ends up in — is it inside the table?"
    />
  );
}

export function ConjunctionsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Although", "it", "was", "raining,", "but", "we", "still", "went", "outside."]}
      errorIdx={4}
      correction={'"although" already sets up the contrast on its own — pairing it with "but" is redundant. Remove "but": Although it was raining, we still went outside.'}
      wrongHint="one pair of words here is doing the same job twice — a subordinating conjunction paired with a coordinating one that isn't needed."
    />
  );
}

export function DeterminersDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "wanted", "to", "buy", "a", "umbrella", "before", "the", "storm", "arrived."]}
      errorIdx={4}
      correction={'"umbrella" starts with a vowel sound, so it needs "an," not "a": an umbrella.'}
      wrongHint="listen to the sound at the start of the word right after the gap."
    />
  );
}

export function ConfusedPartsDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["He", "answered", "the", "question", "confident", "and", "sat", "back", "down."]}
      errorIdx={4}
      correction={'"confident" is an adjective, but it is describing how he answered (a verb) — it needs the adverb form: "confidently."'}
      wrongHint="find the word being used to describe the action of answering."
    />
  );
}

export function OddOneOutDemo() {
  return (
    <ClickErrorSentence
      instruction="Four of these five words are the same part of speech. Click the odd one out."
      words={["quickly,", "brightly,", "silently,", "friendly,", "loudly."]}
      errorIdx={3}
      correction={'"friendly" looks like an adverb because it ends in -ly, but it is actually an adjective (a friendly dog) — the odd one out.'}
      wrongHint="most of these words describe how an action is done — one of them actually describes a noun instead."
    />
  );
}

export function SubjectVerbAgreementDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "box", "of", "chocolates", "were", "left", "on", "the", "kitchen", "table."]}
      errorIdx={4}
      correction={'the subject is "box" (singular), not "chocolates" — the verb should be "was": the box of chocolates was left...'}
      wrongHint="find the true subject of the sentence — it's hidden before the word “of.”"
    />
  );
}

export function TenseConsistencyDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "opened", "the", "door,", "looks", "around", "the", "room", "and", "smiled."]}
      errorIdx={4}
      correction={'the sentence is written in the past tense ("opened", "smiled"), so "looks" should also be past tense: "looked".'}
      wrongHint="three of the four verbs in this sentence agree on when the story is happening — one doesn't."
    />
  );
}

export function ComparativesSuperlativesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Of", "the", "two", "routes,", "the", "coastal", "path", "is", "the", "most", "shorter."]}
      errorIdx={9}
      correction={'"most" and "-er" both mark a comparison — using both together is a double comparative. With only two things being compared, use "shorter" alone.'}
      wrongHint="a comparison between exactly two things has been marked twice in the same word."
    />
  );
}

export function DoubleNegativesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["I", "haven't", "got", "no", "homework", "left", "to", "finish", "tonight."]}
      errorIdx={3}
      correction={'"haven\'t" and "no" are both negatives — together they cancel out and mean the opposite of what\'s intended. Remove "no": I haven\'t got any homework left.'}
      wrongHint="two words in this sentence are both making it negative — only one is needed."
    />
  );
}

export function MisplacedModifiersDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Running", "for", "the", "bus,", "my", "hat", "flew", "off", "in", "the", "wind."]}
      errorIdx={5}
      correction={'"running for the bus" should describe the person, but as written it describes "my hat" — hats can\'t run. It should read "Running for the bus, I lost my hat..."'}
      wrongHint="the opening phrase describes whoever is running — check what noun comes right after the comma."
    />
  );
}

export function ParallelStructureDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["Her", "hobbies", "are", "reading,", "painting", "and", "to", "swim."]}
        errorIdx={6}
        correction={'the list should use the same grammatical form throughout — "reading" and "painting" are -ing forms, so the third item should match: "swimming", not "to swim".'}
        wrongHint="two items in this list share the same word-ending pattern — the third one breaks it."
      />
      <ParallelListAligner
        heading="Line up the list"
        lead="Every item in a list should share the same grammatical form. Find the item that breaks the pattern."
        items={[
          { text: "reading", form: "-ing" },
          { text: "painting", form: "-ing" },
          {
            text: "to swim",
            form: "to + verb",
            broken: {
              fixedText: "swimming",
              fixedForm: "-ing",
              note: "all three items now share the same -ing form — that's parallel structure: reading, painting and swimming.",
            },
          },
        ]}
      />
    </>
  );
}
