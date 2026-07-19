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

export function ClueWordsSignalPhrasesDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the word or phrase that is the actual clue for how Freya was feeling, not just a neutral fact."
      passage={[
        "Freya snapped the pencil case shut and shoved it into her bag.",
        "The classroom clock showed ten to three.",
        "Her homework diary was still open on the desk.",
        "Two other students were queuing at the door.",
      ]}
      correctIdx={0}
      correction={'"snapped... shut and shoved" are the verbs of manner doing the work here — sharp, forceful actions that signal frustration or anger, unlike the neutral facts around them.'}
      wrongHint="look for a verb describing how something was done forcefully or sharply, not a plain fact about the time or the room."
    />
  );
}

export function InferringCharacterFeelingsDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that lets you infer how Tomas was feeling as he waited for the results."
      passage={[
        "Tomas gripped the edge of the table until his knuckles whitened.",
        "The results were due to be posted at midday.",
        "A noticeboard stood just outside the staffroom.",
        "Several other students were also waiting nearby.",
      ]}
      correctIdx={0}
      correction={'"gripped the edge of the table until his knuckles whitened" is a physical tension detail that lets a reader infer anxiety or fear — the feeling itself is never named.'}
      wrongHint="look for a detail describing physical tension in the body, not a neutral fact about the timing or location."
    />
  );
}

export function InferringSettingAtmosphereDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that lets you work out roughly what time of day this scene takes place, without a time being stated."
      passage={[
        "Long shadows stretched across the yard, and the streetlamps flickered on one by one.",
        "The school bags were still piled by the back door.",
        "A dog barked somewhere a few streets away.",
        "The kettle had been left to boil on the stove.",
      ]}
      correctIdx={0}
      correction={'"long shadows... and the streetlamps flickered on" are setting details that let a reader work out it\'s early evening — no time is ever stated directly.'}
      wrongHint="look for the sentence describing light and streetlamps, which together point to a particular time of day."
    />
  );
}

export function InferringWritersAttitudeDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the phrase that reveals the writer's own disapproving attitude towards the councillor, rather than just reporting what he did."
      passage={[
        'The councillor "graciously" allowed himself to be photographed beside the new sign he had unveiled.',
        "The sign had cost the council several thousand pounds.",
        "It was installed on a Tuesday morning in March.",
        "A small crowd had gathered to watch.",
      ]}
      correctIdx={0}
      correction={'putting "graciously" in quotation marks is the writer\'s own word choice, signalling sarcasm — a hint that the writer views the councillor as self-important rather than genuinely gracious.'}
      wrongHint="look for a word the writer has chosen to put in quotation marks — that's usually a sign of the writer's own sarcasm, not a neutral report of events."
    />
  );
}

export function CombiningMultipleCluesDemo() {
  return (
    <ClickEvidencePassage
      instruction="This passage has two separate clues that together support the idea that Priya had been dreading this visit for weeks. Click the second of the two clues (the one appearing later in the passage)."
      passage={[
        "Priya had crossed out the date on her calendar the moment the appointment was booked.",
        "The waiting room smelled faintly of antiseptic.",
        "She had rehearsed what she would say at least a dozen times in the car.",
        "A poster on the wall reminded patients to arrive ten minutes early.",
      ]}
      correctIdx={2}
      correction={'combined with "crossed out the date the moment it was booked" earlier in the passage, "rehearsed what she would say at least a dozen times" is the second clue — together the two details support sustained dread, not just a single passing nerve.'}
      wrongHint="one clue on its own isn't quite enough here — look for the second detail, later in the passage, that combines with the calendar detail to build the full picture."
    />
  );
}
