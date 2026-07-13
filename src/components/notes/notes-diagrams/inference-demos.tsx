"use client";

import { ClickEvidencePassage } from "./click-evidence-passage";

export function WhatIsInferenceDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that lets you work out how Priya was feeling, without her feelings being named directly."
      passage={[
        "Priya's hands shook as she folded the letter back into its envelope.",
        "The kitchen clock ticked loudly in the silence.",
        "She read it twice more before finally setting it down on the table.",
        "Outside, the bins were being collected for the week.",
      ]}
      correctIdx={0}
      correction={'"her hands shook" is a physical detail the reader must interpret, not a stated feeling — this is inference, working out that Priya was nervous or upset from what she does.'}
      wrongHint="an inference clue is a physical detail or action that hints at an emotion, without ever naming the emotion itself."
    />
  );
}

export function InferenceFromActionDialogueDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that suggests Marcus was hiding something from his sister."
      passage={[
        '"Nothing happened at school today," Marcus said quickly, not meeting her eyes.',
        "His sister carried on buttering her toast.",
        "The morning bus had been ten minutes late, as usual.",
        "Marcus checked his bag twice before heading out the door.",
      ]}
      correctIdx={0}
      correction={'"said quickly, not meeting her eyes" is a classic sign of avoidance — the dialogue itself is ordinary, but the behaviour around it suggests Marcus is hiding something.'}
      wrongHint="look at how a line of dialogue is delivered, not just what is said — body language often reveals more than the words."
    />
  );
}

export function InferenceFromDescriptiveDetailDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that creates an uneasy, tense atmosphere without directly saying the characters felt afraid."
      passage={[
        "The corridor lights flickered once, then settled into a dim amber glow.",
        "Somewhere further along, a door creaked and swung slowly shut on its own.",
        "Maya checked her watch: almost midnight.",
        "The old building had once been a school, long before it closed down.",
      ]}
      correctIdx={1}
      correction={'"a door creaked and swung slowly shut on its own" builds tension through an unexplained, slightly eerie detail — the mood is created by what happens, never by stating "it was scary."'}
      wrongHint="look for the sentence built from setting details designed to unsettle the reader, rather than a neutral fact like the time or the building's history."
    />
  );
}

export function InferenceVsOverGuessingDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the one sentence that actually supports the idea that Leo was proud of finishing the race, rather than just guessing at his feelings."
      passage={[
        "Leo crossed the line and immediately threw both arms into the air.",
        "The crowd had been cheering for almost twenty minutes.",
        "It was the hottest day of the summer so far.",
        "Several other runners were still finishing behind him.",
      ]}
      correctIdx={0}
      correction={'"threw both arms into the air" is a specific, supported detail that reasonably suggests pride and triumph — a safe inference grounded in the text, not an unsupported guess.'}
      wrongHint="a safe inference must be traceable back to one specific detail in the text — rule out sentences that are just neutral background facts."
    />
  );
}
