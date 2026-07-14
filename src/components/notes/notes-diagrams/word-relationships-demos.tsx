"use client";

import { WordChipPicker } from "./word-chip-picker";

export function WhatIsWordRelationshipsDemo() {
  return (
    <WordChipPicker
      instruction="Click the word closest in meaning to 'ancient'."
      words={["modern", "tiny", "old", "loud", "narrow"]}
      correctIdx={2}
      correction={'"old" is the closest match — a synonym question asks you to find the word that means nearly the same thing as the word given.'}
      wrongHint="ignore words that just sound similar — find the one that shares the actual meaning of 'ancient'."
    />
  );
}

export function SynonymsDemo() {
  return (
    <WordChipPicker
      instruction="Click the word closest in meaning to 'enormous'."
      words={["tidy", "huge", "quiet", "distant", "cheerful"]}
      correctIdx={1}
      correction={'"huge" shares the meaning of "enormous" — both describe something very large in size.'}
      wrongHint="find the word describing size, not mood or distance."
    />
  );
}

export function AntonymsDemo() {
  return (
    <WordChipPicker
      instruction="Click the word most opposite in meaning to 'generous'."
      words={["kind", "wealthy", "selfish", "cheerful", "patient"]}
      correctIdx={2}
      correction={'"selfish" is the true opposite of "generous" — generous means freely giving, selfish means the reverse.'}
      wrongHint="the opposite of 'giving freely' is refusing to give — which word means that?"
    />
  );
}

export function OddOneOutDemo() {
  return (
    <WordChipPicker
      instruction="Click the word that does not belong with the others."
      words={["salmon", "trout", "cod", "dolphin", "herring"]}
      correctIdx={3}
      correction={'"dolphin" is the odd one out — salmon, trout, cod and herring are all fish, but a dolphin is a mammal, not a fish.'}
      wrongHint="find the shared category the other four words belong to first, then spot the one that breaks it."
    />
  );
}

export function WordAnalogiesDemo() {
  return (
    <WordChipPicker
      instruction="Puppy is to dog as kitten is to...? Click the answer."
      words={["kitten", "cub", "cat", "paw", "litter"]}
      correctIdx={2}
      correction={'the link is "baby animal is to adult animal" — a puppy grows into a dog, so a kitten grows into a "cat".'}
      wrongHint="work out the exact relationship between the first pair before looking at the options."
    />
  );
}

export function AlphabetAnalogiesDemo() {
  return (
    <WordChipPicker
      instruction="B is to D as F is to...? Click the answer."
      words={["G", "H", "E", "C", "I"]}
      correctIdx={1}
      correction={'B to D is a jump of +2 letters (B, C, D). Applying the same +2 jump to F (F, G, H) gives "H".'}
      wrongHint="count exactly how many letters forward B moves to reach D, then apply that same move to F."
    />
  );
}

export function TrapWordsDemo() {
  return (
    <WordChipPicker
      instruction="Click the word closest in meaning to 'bank' as used in 'they sat on the river bank'."
      words={["money", "slope", "save", "shore", "loan"]}
      correctIdx={3}
      correction={'in this sentence "bank" means the land at the edge of a river, so "shore" is the closest match — not the financial meaning of "bank".'}
      wrongHint="re-read the sentence carefully — this 'bank' has nothing to do with money."
    />
  );
}

export function WorkingSystematicallyDemo() {
  return (
    <WordChipPicker
      instruction="Click the word most opposite in meaning to 'transparent'."
      words={["clear", "glassy", "opaque", "fragile", "visible"]}
      correctIdx={2}
      correction={'ruling out the near-synonyms of "transparent" first (clear, glassy, visible) leaves "opaque" as the genuine opposite.'}
      wrongHint="eliminate every word that means roughly the same as 'transparent' before picking — several of these are decoys, not opposites."
    />
  );
}

export function CategoryPrecisionDemo() {
  return (
    <WordChipPicker
      instruction="Click the word that does not belong with the others."
      words={["square", "triangle", "cube", "pentagon", "hexagon"]}
      correctIdx={2}
      correction={'"cube" is the odd one out — square, triangle, pentagon and hexagon are all flat (2D) shapes, but a cube is a solid (3D) shape.'}
      wrongHint="the shared category here is about dimensions, not the number of sides — look again."
    />
  );
}

export function TimingStrategyDemo() {
  return (
    <WordChipPicker
      instruction="Under time pressure, click the word closest in meaning to 'reluctant' — your first instinct, don't overthink it."
      words={["eager", "unwilling", "confident", "careless", "curious"]}
      correctIdx={1}
      correction={'"unwilling" matches "reluctant" — trusting a strong first instinct on a clear synonym like this saves time for the harder questions later in the paper.'}
      wrongHint="don't second-guess a word you already know — which option means 'not wanting to do something'?"
    />
  );
}
