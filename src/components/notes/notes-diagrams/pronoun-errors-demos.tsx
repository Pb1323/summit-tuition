"use client";

import { ClickErrorSentence } from "./click-error-sentence";
import { ReferenceArrowDiagram } from "./reference-arrow-diagram";

const INSTRUCTION = "One word in this sentence has been used incorrectly. Click the word you think is wrong.";

export function SubjectObjectPronounDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Me", "and", "Sam", "are", "going", "to", "the", "cinema", "on", "Saturday."]}
      errorIdx={0}
      correction={'"me" cannot be the subject of the sentence — the subject pronoun "I" is needed: Sam and I are going.'}
      wrongHint="find the pronoun that is doing the action of “going”, right at the start of the sentence."
    />
  );
}

export function PossessiveContractionDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "cat", "curled", "up", "on", "it's", "favourite", "cushion", "by", "the", "fire."]}
      errorIdx={5}
      correction={'"it\'s" (with an apostrophe) is short for "it is" — the possessive form needed here has no apostrophe: its favourite cushion.'}
      wrongHint="check whether the word shows ownership or is short for “it is.”"
    />
  );
}

export function PronounAntecedentNumberDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["The", "team", "celebrated", "his", "victory", "with", "a", "huge", "party", "in", "the", "hall."]}
        errorIdx={3}
        correction={'"team" is a collective noun standing for several people, so the pronoun should be plural: their victory, not his victory.'}
        wrongHint="check whether the pronoun matches a group of people or just one person."
      />
      <ReferenceArrowDiagram
        heading="Test the pronoun choice against “the team”"
        helper="Click a reading to test whether it agrees with “the team” acting as one group."
        target="the team’s victory"
        candidates={[
          {
            label: "his (singular)",
            valid: false,
            note: "“team” stands for many players acting together — a single-person pronoun like “his” doesn’t agree with a whole group.",
          },
          {
            label: "their (plural)",
            valid: true,
            note: "correct — collective nouns like “team” are treated as plural when you mean the individuals within it, so “their” agrees.",
          },
        ]}
      />
    </>
  );
}

export function AmbiguousPronounReferenceDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["When", "Jack", "met", "his", "uncle", "at", "the", "station,", "he", "was", "already", "late."]}
        errorIdx={8}
        correction={'"he" could mean either Jack or his uncle — the sentence needs a specific name in place of the unclear pronoun: Jack was already late.'}
        wrongHint="find the pronoun that could refer to either of the two people named earlier."
      />
      <ReferenceArrowDiagram
        heading="Test each possible reading of “he”"
        helper="Click each candidate — notice that neither reading can be ruled out, which is exactly the problem."
        target="he"
        candidates={[
          {
            label: "Jack",
            valid: false,
            note: "“he” could easily point back to Jack — nothing in the sentence rules this reading out.",
          },
          {
            label: "his uncle",
            valid: false,
            note: "“he” could just as easily point back to the uncle — with two equally live readings and no way to choose, the pronoun is ambiguous and should be replaced with a name.",
          },
        ]}
      />
    </>
  );
}

export function ReflexivePronounMisuseDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["Please", "send", "the", "form", "to", "myself", "or", "the", "school", "office."]}
        errorIdx={5}
        correction={'"myself" is a reflexive pronoun and needs a matching "I" earlier in the sentence — here the plain object pronoun "me" is correct: send the form to me.'}
        wrongHint="check whether this pronoun is reflecting back on an earlier “I” or standing in on its own."
      />
      <ReferenceArrowDiagram
        heading="Does the sentence give “myself” an anchor?"
        helper="Click each option to test whether the sentence contains an earlier “I” for the pronoun to reflect back on."
        target="send the form to ___"
        candidates={[
          {
            label: "myself (reflexive)",
            valid: false,
            note: "there is no earlier “I” in this sentence for “myself” to reflect back to — a reflexive pronoun always needs that anchor.",
          },
          {
            label: "me (object pronoun)",
            valid: true,
            note: "correct — with no “I” to reflect back on, the plain object pronoun “me” is what's needed here.",
          },
        ]}
      />
    </>
  );
}

export function WhoWhomDemo() {
  return (
    <>
      <ClickErrorSentence
        instruction={INSTRUCTION}
        words={["The", "woman", "who", "the", "award", "was", "given", "to", "smiled", "warmly."]}
        errorIdx={2}
        correction={'"who" is the object of the preposition "to" here (given to whom?), so it should be the object pronoun "whom": the woman whom the award was given to.'}
        wrongHint="check whether this pronoun is doing the action or receiving it."
      />
      <ReferenceArrowDiagram
        heading="Subject or object of “given to”?"
        helper="Click each option to test whether the pronoun is doing the action or receiving it."
        target="the award was given to ___"
        candidates={[
          {
            label: "who (subject form)",
            valid: false,
            note: "“who” would be right if the pronoun were doing an action — here it is the object of the preposition “to”, so it needs the object form.",
          },
          {
            label: "whom (object form)",
            valid: true,
            note: "correct — the pronoun follows the preposition “to” and receives the action (given to whom?), which is exactly what “whom” marks.",
          },
        ]}
      />
    </>
  );
}

export function RelativePronounChoiceDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "boy", "which", "won", "the", "race", "trophy", "trained", "every", "morning."]}
      errorIdx={2}
      correction={'"which" is used for things, not people — the relative pronoun for a person is "who": the boy who won the race.'}
      wrongHint="check whether this relative pronoun is standing in for a person or a thing."
    />
  );
}

export function DemonstrativePronounAgreementDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["This", "shoes", "are", "far", "too", "small", "for", "the", "school", "trip."]}
      errorIdx={0}
      correction={'"this" is singular but "shoes" is plural — the demonstrative pronoun must match: these shoes are far too small.'}
      wrongHint="check whether the demonstrative word agrees with a singular or plural noun."
    />
  );
}

export function IndefinitePronounAgreementDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["Everybody", "on", "the", "trip", "have", "to", "bring", "a", "packed", "lunch."]}
      errorIdx={4}
      correction={'"everybody" is a singular indefinite pronoun, even though it refers to many people — it needs a singular verb: everybody has to bring.'}
      wrongHint="check whether this indefinite pronoun counts as one thing or many, however many people it describes."
    />
  );
}

export function HypercorrectionPronounDemo() {
  return (
    <ClickErrorSentence
      instruction={INSTRUCTION}
      words={["The", "secret", "stayed", "between", "you", "and", "I", "for", "years."]}
      errorIdx={6}
      correction={'"between" is a preposition and needs an object pronoun after it — "I" is a subject pronoun wrongly used to sound formal; it should be "me": between you and me.'}
      wrongHint="check the pronoun right after “and”, following the preposition “between.”"
    />
  );
}
