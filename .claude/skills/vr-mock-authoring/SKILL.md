---
name: vr-mock-authoring
description: Write and wire up new Verbal Reasoning mocks for Summit Tuition as hand-authored fixtures in src/data/platform.ts, matching real GL Assessment VR archetypes rather than invented question types. Use when asked to add a new VR mock, a new Elite VR paper, or a batch of new VR questions.
---

# VR mock authoring

**Audit finding (2026-08-18): the platform's 3 published full-length VR
papers drift from real GL Assessment VR question types.** `research/gl-vr-nvr-question-bank.md`
already documents GL's real 18-archetype VR catalogue (researched from 4 GL
VR familiarisation booklets), but it was written to drive the NVR/Maths visual
generator and was never checked against how the hand-authored VR mocks
(`vr-elite-difficult`, `vr-summit-full`, `vr-horizon-full`) were actually
built — they were designed from "genuinely hard verbal reasoning" first
principles, not from that archetype list. Several of their topics (Double
Meanings/homonyms, Anagrams, single-MC "which word means..." vocabulary,
informal number-riddle "Logic Puzzles", family-relationship puzzles,
word-ladders, "follow the instructions" multi-step manipulation) are not on
GL's real 18-type list at all, and even some overlapping topics use the wrong
*answer format* (see table below). This isn't necessarily "wrong" content —
it's still original, well-verified reasoning practice — but it means these
3 papers should not be marketed as authentically "GL-style" without
qualification. **Read this whole skill, and the archetype table in
`research/gl-vr-nvr-question-bank.md`, before writing the next VR mock.**

## The real GL VR archetype catalogue (18 types)

Full detail (format, example count per paper) lives in
`research/gl-vr-nvr-question-bank.md` — summarised here with how the existing
bank maps onto it:

| # | GL archetype | Real answer format | On-platform equivalent | Status |
|---|---|---|---|---|
| 1 | Letter-move between two words | MC letter A-E | — | **missing** |
| 2 | Insert-letter bridge (`word[?]word` x2) | MC letter A-E | "Missing Letters / Bridging Words" | close, format differs (platform asks for the missing *word*, not a single bridging *letter*) |
| 3 | Bracket word-building analogy | MC word | — | **missing** |
| 4 | Odd one out — mark the **2** that don't belong | mark 2 of 5 | "Word Relationships / Odd One Out" | format differs (platform is always 1-of-5) |
| 5 | Closest in meaning — pick 1 word from each of 2 groups | 1 from each group | "Vocabulary / Synonyms and Antonyms" | format differs (platform is single MC, not two-group pick) |
| 6 | Most opposite in meaning — pick 1 from each of 2 groups | 1 from each group | same as #5 | format differs |
| 7 | Hidden word spanning two words in a sentence | MC word-pair A-E | "Hidden Words / Word Boundaries" | matches |
| 8 | Missing 3-letter chunk in a CAPS word | MC A-E | — | **missing** |
| 9 | Word analogy (incl. alphabet-letter variant) | 1 from each group | "Verbal Analogies" | close, but platform format is single MC not "1 from each group" |
| 10 | Number series | write-in number | "Number Sequences" | matches |
| 11 | Alphabet letter-pair series | write-in letter(s) | "Letter Sequences" | matches |
| 12 | Logical deduction from a short passage | MC / direct answer | "Logic Puzzles" (number riddles) | **mismatched** — GL's version is a verbal/logical deduction from prose, not an algebraic number riddle |
| 13 | Letters-for-numbers algebra (A=1, B=2...) | MC letter | "Letter Values" | matches |
| 14 | Balanced equation, missing number | write-in number | — | **missing** |
| 15 | Word <-> number code (3 given, 1 missing) | write-in | "Word Codes" (numeric-code subtopics) | matches |
| 16 | Word <-> word shift cipher | write-in word | "Word Codes" (shift-cipher subtopics) | matches |
| 17 | Compound word builder (2 groups -> concatenate) | 1 from each group | "Compound Words / Bridging Word" | format differs (platform asks for the shared prefix/suffix word, not a two-group concatenation pick) |
| 18 | Word-pair truncation pattern (3rd pair missing) | MC word | — | **missing** |

**Topics on the platform with no GL equivalent at all** (original Summit
content, fine to keep as clearly-labelled bonus/extension material, but do
not present as GL-style without qualifying that): Double Meanings/Homonyms,
Anagrams, family-relationship logic puzzles, word-ladders, "follow the
instructions" multi-step letter/number manipulation, "odd pair out"
(spot-the-broken-pair, distinct from GL's mark-2-of-5 odd one out).

## Going forward: two honest paths, pick one per mock

1. **Genuinely GL-style paper**: every question maps to one of the 18
   archetypes above **using the real answer format** (2-of-5 odd-one-out,
   pick-1-from-each-of-2-groups for synonym/antonym/analogy/compound-word
   questions, single bridging letter not a whole word, etc.) — this requires
   `QuestionRenderer`/`ui.tsx` to support these formats; check what already
   exists (`SegmentMistakeAnswer`-style multi-part answers, two-group pickers)
   before assuming a new UI component is needed. Only call the mock
   `"GL-style"` in its `style`/description field if it actually does this.
2. **Original Summit-style paper** (what all 3 existing full VR papers
   actually are): keep the broader topic list and simpler single-MC format,
   but say so honestly in the mock's `description` — "an original Summit
   Tuition paper inspired by real 11+ verbal reasoning skills, not a
   GL-format reproduction" — matching the disclaimer convention already used
   on the 2026-07-24 real-school-style mocks (`qe-barnet-style` etc., see
   `CLAUDE.md` Recent Feature State). **Do not label a paper's `style` field
   `"GL-style"` if it takes this path.**

Ask the founder which path a given commission needs before writing 50
questions — don't default silently to path 2 the way prior sessions have.

## Question id convention

Each full VR mock claims its own id prefix range so ids never collide:
`vr1`-`vr20` (placeholder bank), `vr36`-`vr85` (`vr-elite-difficult`),
`vr86`-`vr135` (`vr-summit-full`), `vre1`-`vre50` (`vr-horizon-full`). Before
picking a prefix for a new mock, grep it first:

```bash
grep -oE '"id": "yourprefix[0-9]+"|id: "yourprefix[0-9]+"' src/data/platform.ts
```

## Question shape

```ts
{
  id: "vrz1",
  subject: "VR",
  topic: "Word Codes", // matches one of the topic strings the admin report groups by
  subtopic: "...", // the specific archetype/rule, shown in the marked report
  difficulty: "standard", // or "stretch"
  questionType: "multiple_choice",
  text: "...",
  options: ["...", "...", "...", "..."], // 4 options, order doesn't matter — QuestionRenderer shuffles per question
  correctAnswer: "...",
  markScheme: "...", // full worked reasoning — this is what the admin report shows under 'What they don't know yet'
  explanation: "...", // the common mistake / how to avoid it
  marks: 1,
  tags: ["...", "original"],
  timeEstimateSeconds: 100,
  sourceStyle: "unknown", originalGenerated: true,
}
```

Before finalising `markScheme`/`correctAnswer` on any cipher, sequence, or
letter-value question, **recompute it independently by hand or with a
throwaway script** — this is a real recurring bug class on this platform (see
`research/mock-authoring-lessons.md`), and every letter-value/sequence
question in `vr-summit-full` was checked this way during a 2026-08-18 review
and came back correct, so keep doing it, don't skip it because "it looked
fine last time."

## Verify before calling it done

Same pattern as the Maths/English skills: write a throwaway `tsx` script that
resolves every `questionIds` entry against the global `QUESTIONS` bank, checks
for duplicate/missing ids, confirms every `correctAnswer` resolves in its own
`options` with no duplicate option values, and that `totalMarks` sums
correctly. Delete the script after. Then `npm.cmd run typecheck`.

## Deploy

Same as the other mock-authoring skills — pushing `src/data/platform.ts`
alone doesn't make a new mock visible in production; also run
`npm run db:seed` once the founder has reviewed the content (see
`maths-mock-authoring`'s "Deploy" section for the full explanation).
