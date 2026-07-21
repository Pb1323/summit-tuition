---
name: english-mock-authoring
description: Write and wire up new English mocks for Summit Tuition — full-length GL-style papers (comprehension/spelling/punctuation/cloze) or Elite-difficulty stretch papers — as hand-authored fixtures in src/data/platform.ts. Use when asked to add a new English mock, a new Elite English paper, or a new original passage + question set.
---

# English mock authoring

Scope: hand-authored English mocks in `src/data/platform.ts` (passages +
questions + the `MockExam` metadata entry). Not the deterministic/AI
generator pipeline (`src/lib/mock-generation.ts`, used by the admin
"Generate draft mock" button) — that's a separate code path with its own
templates; this skill is for writing a full paper by hand the way all the
Elite papers and most published English mocks were built.

**Before writing anything, read `research/mock-authoring-lessons.md` in
full.** It documents 3 real bugs this project has hit and fixed (answer
clustering, segment-letter shuffle, question-order jumbling) — the fixes
live in shared rendering code so you don't need to work around them when
authoring, but you do need to know they exist so you don't "fix" something
that's already handled, or reintroduce a bug via bad data (e.g. every
spelling question's mistake sitting in the same clause position).

## The real GL structure to match

Every full-length paper is 54 questions across 4 fixed sections, researched
from a real GL Assessment familiarisation booklet
(`research/gl-english-question-bank.md`, weights formalised in
`src/lib/english-sections.ts`'s `ENGLISH_SECTIONS`):

| Section | Weight | Count (of 54) | `questionType` / tag |
|---|---|---|---|
| A: Reading comprehension | 52% | 28 | `retrieval` / `inference` / `vocabulary` / `grammar` / `language_analysis`, all with `passageId` |
| B: Spelling | 17% | 9 | tag `spelling` |
| C: Punctuation (grammar-mistake) | 17% | 9 | tag `grammar-mistake` |
| D: Cloze (best word) | 15% | 8 | `questionType: "cloze"` or tag `cloze` |

Section membership is derived at **render time** from tags/`questionType` via
`getEnglishSectionId()` (`src/lib/english-sections.ts`) — not from array
position. You can write `questionIds` in whatever order is convenient (this
project's convention: comp block, then spelling, then grammar, then cloze,
purely for human readability of the source file) — `mock-room-shell.tsx`
reorders into real section blocks for the student regardless. But **do** tag
questions correctly, or they won't classify and `evaluateMockQuality()` will
flag "Topic spread is balanced" as failed.

## Writing the passage

- 6 paragraphs, ~550-650 words total (full mocks need 650+, checked by
  `hasAppropriateEnglishPassageLength` in `mock-quality.ts`), original
  narrative fiction — never copy or closely paraphrase a real GL/other
  publisher's passage, this project's content rule is original-only.
- Give it both a `paragraphs: string[]` array (one entry per paragraph, used
  for `paragraphRefs` lookups) and a flattened `text` string (`\n\n`-joined,
  used for word-count and full-passage rendering) — they must match exactly.
- Elite passages follow a recognisable emotional arc: an apprentice figure
  under a strict mentor who withholds a specific privilege/trust; a
  half-finished object (tapestry, chart, ledger, window) whose gap is tied to
  a past loss the mentor won't discuss; a sudden accident/emergency that
  forces the apprentice into the mentor's role without warning; the
  apprentice succeeding through patience, not haste (a recurring stated
  moral: "a rushed [X] was no different from a wrong one"); a wordless final
  gesture from the mentor handing over the previously-withheld privilege.
  You don't have to reuse this exact arc, but match its **register and
  structural complexity** — real GL passages are literary, not simple.
  Check `research/gl-english-question-bank.md` and the existing 5 Elite
  passages (`passage-cartographers-apprentice`, `passage-glassblowers-legacy`,
  `passage-weavers-thread`, `passage-lighthouse-keepers-ledger`,
  `passage-clockmakers-apprentice`) before starting, so a new passage doesn't
  reuse the same setting/objects/withheld-privilege ("climb the stair/tower
  alone", "work the mechanism unsupervised") — vary what the privilege
  actually is (a piece of equipment, a room, a decision, a signature) so five
  papers in a row don't all read as the same story reskinned.

## Writing the 28 comprehension questions

Split roughly: 8 retrieval, 8 inference, 6 vocabulary-in-context, 4 grammar
(word class / clause function / sentence structure), 2 literary technique
(simile/metaphor + symbolism), covering all 6 paragraphs at least once each.

- Every question needs `passageId` and `paragraphRefs: number[]` (1-indexed).
- **Retrieval**: "According to paragraph N, ..." — the correct answer must be
  an exact restatement of a specific stated fact; distractors should be
  *close, plausible paraphrases* of other details in the same passage, not
  obviously-wrong options — real GL papers can't be beaten by skimming.
- **Inference**: requires connecting two details the passage places near each
  other without stating the link outright (e.g. an object's location +
  an earlier detail about a loss = the object is emotionally, not
  technically, significant).
- **Vocabulary**: "In paragraph N, what does 'X' most nearly mean in \"...\"?"
  — quote the exact sentence, options are single words/short phrases, only
  one is a genuine synonym in that context.
- **Grammar**: identify word class, clause function, or sentence structure
  (compound vs. complex) in a quoted fragment from the passage.
- **Literary technique**: name the device (simile, symbolism) in a quoted
  fragment; the correct answer should require having read the whole passage
  to justify (e.g. symbolism questions should trace an object's meaning back
  to how it was introduced in paragraph 1).
- `difficulty: "stretch"` for Elite papers (a couple of "harder"/"challenge"
  tagged retrieval/inference questions are fine at `"standard"` if the fact
  is truly a single-step lookup).
- `marks: 1` per question, `timeEstimateSeconds` 50-85 depending on
  complexity (retrieval fastest, inference/literary slowest).

## Writing spelling / punctuation (grammar-mistake) questions

Both use the **segment format**: a sentence split into 4 lettered clauses
plus a 5th "no mistake" option, rendered by `SegmentMistakeAnswer` (see
`research/mock-authoring-lessons.md` Bug 2 for why clause order must never be
shuffled by you — the renderer handles randomising the *displayed letter*).

- `text` is two lines: an instruction line (`"Find the group of words with
  the spelling/grammar mistake in it. If there is no mistake, choose N."`)
  then the quoted sentence on the next line.
- `options` is the sentence split into exactly 4 word-groups (each a
  substring of the sentence, concatenating back to the full sentence) plus a
  literal `"No mistake"` 5th option.
- `correctAnswer` is the exact text of whichever segment (or `"No mistake"`)
  contains the error.
- Include 1-2 genuine `"No mistake"` answers per set of 9 (tag `no-mistake`)
  — otherwise students learn to always assume an error exists.
- Spelling: common misspellings appropriate for 11+ (receive/believe,
  separate, occasion, government, privilege, tomorrow, etc.) — reusing the
  same target words across different mocks with fresh sentences is fine and
  expected, these are the standard 11+ trap words.
- Grammar-mistake (`egr*`): subject-verb agreement (each/neither/every take
  singular verbs), possessive vs. contraction (its/it's), double
  comparatives (more harder), dangling modifiers, tense consistency,
  prepositions after adjectives, apostrophes vs. plurals, relative pronouns.
- Tag every question `["spelling"|"grammar-mistake", "GL-style", "harder",
  "segment-format"]` (+ `"no-mistake"` where relevant, + `"challenge"` for
  the hardest 1-2) — the `spelling`/`grammar-mistake` tag is what
  `getEnglishSectionId()` uses to classify the question, this is not
  optional decoration.

## Writing cloze (best word) questions

`questionType: "cloze"`, a single sentence with a `____` gap, 5 options where
every option is grammatically plausible in isolation but only one is
correct given tense/connective logic (conditionals, connectives like
although/unless/despite, verb-tense agreement, adverb vs. adjective form).
Tag `["cloze", "grammar", "GL-style", "harder"]`.

## Quality bar beyond the automated checks

`evaluateMockQuality()` returning `status: "Ready"` proves the mock is
*structurally* valid — right counts, every field present, correct answers
resolve. It does **not** catch weak items. These do, and they're what
actually separates a paper that stretches a strong 11+ candidate from one
that's just GL-shaped busywork:

- **Distractor plausibility is the whole game.** For retrieval and
  vocabulary questions, at least 2 of the 4 wrong options must require the
  student to have actually read the relevant paragraph to rule out — pull
  distractors from *other true details in the same passage* (a different
  character's action, a different paragraph's fact) rather than inventing
  generic wrong answers. A question is too easy if a student who skipped the
  passage entirely could eliminate 3 of 4 options on plausibility alone.
- **Don't over-template against your own reference mock.** It's tempting
  (and fast) to take a working Elite paper and swap nouns/setting per
  question 1:1 — same sentence shape, same clause count, same connective
  tested in the same slot. Doing this for all 54 questions produces a
  paper that's structurally sound but reads as a reskin, not a fresh paper.
  Vary sentence length, clause order, and which detail is being tested even
  when the underlying grammar point repeats across mocks (repeating grammar
  *points* like subject-verb agreement or third conditional across mocks is
  fine and expected — GL papers do this too — but the sentences testing them
  shouldn't be find-and-replace copies of a previous mock's sentences).
- **Read the passage once start-to-finish after writing it**, purely for
  register — 11+-level literary fiction should not be skimmable in one pass;
  if every sentence resolves immediately with no held-back detail, the
  inference/symbolism questions built on it won't have anything real to ask.
- **Spot-check your own distractors against the passage text** by searching
  for a couple of distractor phrases in the passage — if a "wrong" retrieval
  option is actually a paraphrase of what the passage says (rather than a
  paraphrase of something else true in the passage), you've written an item
  with two correct answers without realising it.
- **Run `npm.cmd run typecheck` after drafting, not only at the very end** —
  a single stray/misspelled field on one question object (e.g. a leftover
  `marksScheme:` typo next to the real `markScheme:`) won't fail
  `evaluateMockQuality()` or the duplicate-id/correctAnswer checks, since
  those only inspect the fields they know about — TypeScript's structural
  check is what actually catches it.

## Wiring up the `MockExam` entry

```ts
{
  id: "english-gl-NN-elite", // or a descriptive non-elite id
  title: "English GL-Style Full Paper N — Elite",
  subject: "English",
  style: "GL-style",
  difficultyLabel: "Summit Stretch", // or "Standard" for non-Elite
  durationMinutes: 55,
  totalMarks: 54, // must equal the sum of every question's `marks`
  questionIds: [...], // 28 + 9 + 9 + 8, in comp/spelling/grammar/cloze block order for readability
  published: true,
  releaseDate: "YYYY-MM-DD",
  tier: "Elite", // NOT "Diagnostic Assessment" — check this, english-gl-8/9-elite
                 // have a pre-existing tier mismatch bug, don't copy it
  description: "...",
}
```

## Verify before calling it done

Follow the "How to verify" section in `research/mock-authoring-lessons.md` —
write a throwaway `tsx` script that resolves every `questionIds` entry, checks
for duplicate/missing ids, confirms every `correctAnswer` is in that
question's `options`, confirms every `passageId` resolves, checks
`getEnglishSectionId()` classifies all 54 with the right ~28/9/9/8 split, and
runs `evaluateMockQuality()` expecting `status: "Ready"`. Delete the script
after. Then run `npm.cmd run typecheck` and `npm.cmd run lint`.
