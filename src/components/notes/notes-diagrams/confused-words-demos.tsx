"use client";

import { ClickErrorSentence } from "./click-error-sentence";

const INSTRUCTION = "One word in this sentence has been used incorrectly. Click the word you think is wrong.";

export function TheirThereTheyreDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "children", "left", "there", "bags", "by", "the", "door", "before", "lunch."]}
      errorIdx={3}
      correction={'"there" refers to a place — the sentence needs the possessive "their" to show the bags belong to the children: their bags.'}
      wrongHint="check the word right before “bags” — does it show place, or ownership?"
    />
  );
}

export function YourYoureDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Please", "remember", "to", "bring", "you're", "swimming", "kit", "on", "Friday."]}
      errorIdx={4}
      correction={'"you\'re" is short for "you are" — the sentence needs the possessive "your" to show the kit belongs to you: your swimming kit.'}
      wrongHint="check whether the word means “you are” or is showing ownership."
    />
  );
}

export function AffectEffectDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "new", "timetable", "will", "effect", "every", "student", "in", "the", "school."]}
      errorIdx={4}
      correction={'"effect" is usually a noun (the result) — the sentence needs the verb "affect", meaning to influence: will affect every student.'}
      wrongHint="this word is being used as a verb — is it the right one?"
    />
  );
}

export function FewerLessDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["There", "were", "less", "students", "in", "the", "hall", "than", "we", "expected."]}
      errorIdx={2}
      correction={'"students" can be counted one by one, so the sentence needs "fewer", not "less": fewer students.'}
      wrongHint="can the noun right after this word be counted one by one?"
    />
  );
}

export function PracticePractiseDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["She", "will", "practice", "her", "violin", "for", "an", "hour", "every", "evening."]}
      errorIdx={2}
      correction={'"practice" is the noun spelling — this is a verb (an action she will do), so it needs "practise": will practise her violin.'}
      wrongHint="is this word doing the job of a noun or a verb here?"
    />
  );
}

export function IntensivePurposesDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["For", "all", "intensive", "purposes,", "the", "project", "was", "already", "finished."]}
      errorIdx={2}
      correction={'the idiom is "for all intents and purposes" — "intensive" is a common mishearing of "intents".'}
      wrongHint="this phrase is often misheard — one word isn't the one used in the real idiom."
    />
  );
}

export function GonnaFormalDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "headteacher", "announced", "that", "the", "school", "was", "gonna", "hold", "a", "charity", "fair."]}
      errorIdx={7}
      correction={'"gonna" is informal spoken English — a formal written announcement needs "going to": was going to hold.'}
      wrongHint="one word here belongs in casual speech, not a formal written announcement."
    />
  );
}

export function LooseLoseDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["If", "the", "team", "plays", "badly", "again,", "they", "will", "loose", "the", "final."]}
      errorIdx={8}
      correction={'"loose" means not tight — the sentence needs "lose", meaning to be defeated or misplace something: will lose the final.'}
      wrongHint="one word here is being confused with a similar-looking word that means “not tight”."
    />
  );
}

export function ComplementComplimentDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "waiter", "gave", "her", "a", "nice", "complement", "on", "her", "choice", "of", "dessert."]}
      errorIdx={6}
      correction={'"complement" means something that completes another thing — a nice remark is a "compliment": a nice compliment.'}
      wrongHint="this word sounds identical to another word — check which one means “a nice remark”."
    />
  );
}

export function MixedReviewDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Their", "was", "less", "traffic", "on", "the", "road", "then", "we", "expected", "that", "morning."]}
      errorIdx={7}
      correction={'"then" shows time or sequence — a comparison needs "than": less traffic than we expected.'}
      wrongHint="one word here is being confused with a similar-sounding word used for comparisons."
    />
  );
}
