"use client";

import { ClickFillGap } from "./click-fill-gap";

const INSTRUCTION = "Click the word that correctly fills the gap.";

export function WordClassCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The old bridge looked"
      options={["danger", "dangerously", "dangerous", "endanger"]}
      correctIdx={2}
      after="after the storm."
      correction="the gap sits right after a linking verb (“looked”) and before nothing else — it needs an adjective describing the bridge: “dangerous”, not a noun, adverb or verb form."
      wrongHint="check what job the gap needs to do — is it describing a noun, or doing something else entirely?"
    />
  );
}

export function VerbTenseCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Yesterday, the whole class"
      options={["walks", "walking", "walked", "walk"]}
      correctIdx={2}
      after="to the museum for the afternoon."
      correction="“yesterday” signals the whole passage is in the past tense, so the gap needs the past-tense verb form “walked”, matching the time clue already given."
      wrongHint="look at the time clue at the start of the sentence — what tense does it tell you the rest of the sentence should be in?"
    />
  );
}

export function SingularPluralAgreementCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Both of the twins"
      options={["was", "is", "were", "has been"]}
      correctIdx={2}
      after="chosen for the school choir."
      correction="“both” signals a plural subject (the twins, together), so the gap needs the plural verb form “were”, not a singular form."
      wrongHint="check whether the subject named just before the gap is singular or plural — that decides the verb form needed."
    />
  );
}

export function CombinedGrammarMeaningCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Although the trail was steep, the hikers"
      options={["gives up", "given up", "gave up", "giving up"]}
      correctIdx={2}
      after="only once, near the very top."
      correction="the passage is in the past tense (matching the surrounding story), and the gap follows a plural subject doing a single completed action — “gave up” fits both the tense and the meaning of the sentence."
      wrongHint="combine two clues here: what tense does the surrounding story use, and what verb form actually completes the action correctly?"
    />
  );
}

export function ArticleDeterminerCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="She had never seen"
      options={["a", "an", "the", "that"]}
      correctIdx={1}
      after="honest answer like it before."
      correction="“honest” starts with a vowel sound (the h is silent), so the gap needs “an”, not “a” — and “the”/“that” would wrongly suggest an answer already mentioned, rather than one being introduced for the first time."
      wrongHint="check the very next word after the gap — what sound does it actually start with, and has it been mentioned before?"
    />
  );
}

export function PrepositionCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The twins have always been very"
      options={["proud", "pleased", "glad", "happy"]}
      correctIdx={0}
      after="of each other's achievements."
      correction="the preposition “of” is already fixed in the sentence, and only “proud” pairs fixedly with “of” in this sense — “pleased with”, “glad about” and “happy for” all take different prepositions."
      wrongHint="look at the preposition already sitting after the gap — which option is the one word always paired with that exact preposition?"
    />
  );
}

export function ConnectiveLinkingCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="The forecast promised sunshine all week; however, the campers"
      options={["stayed", "remained", "got", "arrived"]}
      correctIdx={2}
      after="soaked within an hour."
      correction="“however” signals a contrast with the sunny forecast, so the gap needs the word that completes the wet, opposing outcome — “got” soaked — not a neutral word like “stayed” or “remained”."
      wrongHint="what relationship does the connective “however” promise between the sunny forecast and what actually happened?"
    />
  );
}

export function PronounReferenceCluesDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Grandma Rose had packed a small gift for Amir before he left. When the taxi finally arrived,"
      options={["he", "she", "it", "they"]}
      correctIdx={1}
      after="waved until it disappeared around the corner."
      correction="Amir is the one who “left” in the taxi, so Grandma Rose is the one left behind on the pavement to wave — the gap needs the singular female pronoun “she”, referring back to her, not Amir."
      wrongHint="track back through both sentences — who is actually still standing there to wave as the taxi drives off?"
    />
  );
}

export function AmbiguousGapsDemo() {
  return (
    <ClickFillGap
      instruction={INSTRUCTION}
      before="Instead of complaining, the volunteers decided to"
      options={["make", "do", "take", "have"]}
      correctIdx={0}
      after="a real difference in the community."
      correction="all four are grammatically possible verbs before “a difference”, but “make a difference” is the one fixed, natural collocation in English — “do”, “take” and “have” simply aren't how this phrase is normally said."
      wrongHint="all four options are grammatically fine here — which one is the word English speakers naturally pair with “a difference”?"
    />
  );
}
