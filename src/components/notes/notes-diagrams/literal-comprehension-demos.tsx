"use client";

import { ClickEvidencePassage } from "./click-evidence-passage";

export function RetrievalDefinitionDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that tells you what time of day Mara reached the observatory."
      passage={[
        "Mara reached the observatory just as the last stripe of daylight rested on the brass dome.",
        "Inside, the old telescope pointed at a square of sky.",
        "She had cycled the whole way without stopping, her bag bouncing on her back.",
        "A folded star chart lay on the desk, waiting for her.",
        "Somewhere below, the town lights were beginning to flicker on.",
      ]}
      correctIdx={0}
      correction={'the first sentence directly states "just as the last stripe of daylight rested on the brass dome" — this tells you it was dusk, and the answer is written there in the text, not implied.'}
      wrongHint="literal comprehension means the answer is stated outright — find the sentence that names the time of day directly."
    />
  );
}

export function FindAndCopyDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence you would copy out to answer: 'What did Tom find in the attic?'"
      passage={[
        "Tom climbed the narrow ladder into the attic, brushing cobwebs from his hair.",
        "Dust hung in the single beam of light from the small window.",
        "Tucked behind an old trunk, he found a wooden box tied with faded ribbon.",
        "His hands trembled slightly as he lifted it down.",
        "He decided to open it later, once he was back downstairs.",
      ]}
      correctIdx={2}
      correction={'"find and copy" questions want you to lift the exact words — the third sentence names the object directly: "a wooden box tied with faded ribbon."'}
      wrongHint="you need the exact sentence naming the object Tom found, ready to copy word for word."
    />
  );
}

export function MultipleChoiceRetrievalDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that tells you how many runners started the race."
      passage={[
        "The starting pistol cracked and the crowd of spectators cheered.",
        "Two hundred and forty runners surged forward across the wet grass.",
        "Elin found herself boxed in near the back of the pack.",
        "She had trained for this moment for almost a year.",
        "By the first bend, the group had already begun to spread out.",
      ]}
      correctIdx={1}
      correction={'the exact number is given in the second sentence: "two hundred and forty runners" — for a multiple-choice question, this is the sentence you would match against the options.'}
      wrongHint="look for the sentence that states an exact figure, not a general description of the start."
    />
  );
}

export function SkimmingScanningDemo() {
  return (
    <ClickEvidencePassage
      instruction="Scan quickly: click the sentence that gives the exact price of the museum ticket."
      passage={[
        "The Riverside Museum has welcomed visitors since 1974.",
        "Its collection includes fossils, pottery and a full-size whale skeleton.",
        "Entry costs £6.50 for adults and £3 for children under twelve.",
        "The café on the ground floor serves light lunches and drinks.",
        "The museum is open every day except Mondays.",
      ]}
      correctIdx={2}
      correction={'scanning means running your eye down the text hunting for a specific detail — here, the number "£6.50" jumps out in the third sentence, which is exactly the kind of fact scanning is built for.'}
      wrongHint="scan for numbers or symbols like £ rather than reading every word — the price is stated in just one sentence."
    />
  );
}

export function AnnotationTechniqueDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence you would underline to answer: 'Where did Priya leave her umbrella?'"
      passage={[
        "Priya dashed through the school gates as the bell rang.",
        "Rain hammered against the windows all through registration.",
        "She suddenly remembered leaving her umbrella propped against the bus shelter.",
        "There was no time to go back for it before lessons started.",
        "By lunchtime she had almost forgotten about it completely.",
      ]}
      correctIdx={2}
      correction={'good annotation means underlining the exact phrase that answers the question as you read — here that is "propped against the bus shelter" in the third sentence.'}
      wrongHint="find the one sentence that names a specific place, ready to underline as evidence."
    />
  );
}

export function PEEMethodDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence you would use as your Evidence for the point 'Grandad was nervous about the flight.'"
      passage={[
        "Grandad had never flown before, and his suitcase was packed a week early.",
        "At the airport, he checked his ticket three times before we even reached security.",
        "The departure board flickered with a long list of destinations.",
        "My sister queued for coffee while we waited by the gate.",
        "When the announcement finally came, he gripped the armrest tightly.",
      ]}
      correctIdx={1}
      correction={'in the PEE method, the Evidence is the exact quotation supporting your Point — "checked his ticket three times before we even reached security" is the clearest proof of nervousness.'}
      wrongHint="you need the sentence that shows nervous behaviour through an action, not just background detail."
    />
  );
}

export function NumbersDatesNamesDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that tells you the exact date the bridge was completed."
      passage={[
        "Workers had laboured on the new footbridge for almost two years.",
        "The bridge was finally completed on 14 March 2019, after several delays.",
        "Its arched frame was made from local oak and steel cable.",
        "A small plaque near the entrance lists the engineers who designed it.",
        "On opening day, the whole village turned out to cross it together.",
      ]}
      correctIdx={1}
      correction={'the exact date is stated as a precise fact: "completed on 14 March 2019" — retrieving dates, names and numbers means finding this kind of specific detail, not a general description.'}
      wrongHint="look for the sentence with a specific calendar date written into it."
    />
  );
}

export function MultiPartRetrievalDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that gives the key evidence for: 'Why was the team unable to finish the climb?'"
      passage={[
        "The team had planned the ascent for over six months, checking every piece of kit twice.",
        "By the third day, thick cloud had rolled in and visibility dropped to a few metres.",
        "Two of the climbers were also suffering from the effects of the thin air.",
        "The lead guide made the difficult decision to turn the group back before the final ridge.",
        "They descended slowly, disappointed but safe.",
      ]}
      correctIdx={3}
      correction={'the decisive sentence is "the lead guide made the difficult decision to turn the group back" — a full answer would also mention the poor visibility and altitude sickness mentioned earlier, but this is the single sentence stating the outcome the question asks about.'}
      wrongHint="the question asks why they were unable to finish — find the sentence that states the actual decision to stop."
    />
  );
}

export function NonFictionFactsDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that gives the top speed of the peregrine falcon."
      passage={[
        "The peregrine falcon is found on every continent except Antarctica.",
        "It is best known for its extraordinary hunting dive, called a stoop.",
        "During a stoop, it can reach speeds of over 300 kilometres per hour.",
        "This makes it the fastest animal on Earth.",
        "Falcons build no proper nest, instead laying eggs on bare ledges.",
      ]}
      correctIdx={2}
      correction={'non-fiction retrieval often means finding one fact among several — the exact figure "over 300 kilometres per hour" is stated in the third sentence.'}
      wrongHint="non-fiction facts are usually attached to a number — scan for the sentence containing the speed."
    />
  );
}

export function SpottingDistractorsDemo() {
  return (
    <ClickEvidencePassage
      instruction="Click the sentence that tells you who actually won the chess tournament."
      passage={[
        "Both finalists had won every one of their earlier games without dropping a single point.",
        "Layla looked confident throughout, smiling as she made each move.",
        "In the end, it was Dan who claimed the trophy after a tense final round.",
        "The hall fell completely silent during the final ten minutes.",
        "Layla shook Dan's hand and congratulated him warmly.",
      ]}
      correctIdx={2}
      correction={'the second sentence about Layla looking confident is a distractor designed to make you assume she won — the genuine evidence is the third sentence, which states outright that "it was Dan who claimed the trophy."'}
      wrongHint="a sentence can sound like it points to the answer without actually stating it — find the one sentence that names the winner directly."
    />
  );
}
