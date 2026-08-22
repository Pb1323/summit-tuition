---
name: english-mock-authoring
description: Write and wire up new English mocks for Summit Tuition — full-length GL-style papers (comprehension/spelling/punctuation/cloze) or Elite-difficulty stretch papers — as hand-authored fixtures in src/data/platform.ts. Use when asked to add a new English mock, a new Elite English paper, or a new original passage + question set.
---

# English mock authoring

Scope: hand-authored English mocks in `src/data/platform.ts` (passages + questions + `MockExam` entry). Not the deterministic/AI generator (`src/lib/mock-generation.ts`, admin "Generate draft mock" button) — separate code path.

Full papers stay at **54 questions** (not the 50-cap that applies to new Maths mocks) — a real researched GL section-weight match (`research/gl-english-question-bank.md`), not an arbitrary count; shrinking it breaks the 52/17/17/15% split. Ask before changing this structure.

**Before writing anything**: read `research/mock-authoring-lessons.md` in full (3 real bugs already fixed in shared rendering code — answer clustering, segment-letter shuffle, question-order jumbling — know they exist so you don't reintroduce one via bad data). Also read `research/qe-barnet-test20-analysis.md`, a full question-by-question teardown of a real QE Barnet/GL-style paper the founder supplied after flagging our comprehension as "way too easy" and our punctuation section as testing unfamiliar, harder-than-expected question types next to a real exam. The guidance below is calibrated against it, **then deliberately pushed past it** — see the escalation note under comprehension.

## The real GL structure to match

54 questions across 4 fixed sections (`src/lib/english-sections.ts`'s `ENGLISH_SECTIONS`):

| Section | Weight | Count | tag/`questionType` |
|---|---|---|---|
| A: Reading comprehension | 52% | 28 | `retrieval`/`inference`/`vocabulary`/`grammar`/`language_analysis`, all with `passageId` |
| B: Spelling | 17% | 9 | tag `spelling` |
| C: Punctuation (grammar-mistake) | 17% | 9 | tag `grammar-mistake` |
| D: Cloze | 15% | 8 | `questionType: "cloze"` or tag `cloze` |

Section membership is derived at render time from tags/`questionType` via `getEnglishSectionId()` — not array position. Write `questionIds` in comp/spelling/grammar/cloze block order for source-file readability (rendering reorders regardless), but **tag questions correctly** or they won't classify and the balance check fails.

## Writing the passage

- 6 paragraphs, ~550-650 words (full mocks need 650+), original narrative fiction — never copy/closely-paraphrase a real publisher's passage.
- `paragraphs: string[]` (one entry per paragraph, used for `paragraphRefs`) and a flattened `text` (`\n\n`-joined) — must match exactly.
- Elite passages run literary, not simple — match the register/structural complexity of `research/gl-english-question-bank.md` and the existing Elite passages. **Check recent passages before starting** (grep `src/data/platform.ts` for `passage-` ids, or check CLAUDE.md's Recent Feature State) so a new one doesn't reuse the same setting/objects/premise as the last few — vary genre, not just surface details, so five papers in a row don't read as the same story reskinned.

## Writing the 28 comprehension questions

Split roughly: 6 retrieval, 6 inference, 5 vocabulary-in-context, 4 grammar (word class/clause function/sentence structure), 2 literary technique (simile/metaphor + symbolism), 3 NOT/negative-space, 2 author-/character-voice inference, covering all 6 paragraphs at least once. This mix is calibrated against `research/qe-barnet-test20-analysis.md` — every archetype exists because that teardown showed it's what actually makes a real paper hard to skim, not just harder wording.

**Escalation (2026-08-22): target *at or above* that source paper's difficulty, not level with it.** The archetypes below are the floor, not the ceiling. Push past the source paper by: stacking 2 of them on the same question where the source only used 1 (e.g. a NOT-question whose 4 true distractors are themselves a strength-gradient, not 4 flatly-true facts); requiring synthesis across 3+ paragraphs rather than the source's usual 2, for at least 2-3 inference questions per passage; and on vocabulary, preferring a word where the *common* everyday meaning is a trap and only the passage's specific context supports the rarer correct sense (the source's "liable" question is the model — use that pattern more than once per passage, not as a single outlier). Test for "hard enough": a strong student who has read the passage once, carefully, should still get 2-4 of the 28 wrong on a first attempt — if a full read reliably yields 100%, the section is still too easy regardless of how sophisticated the vocabulary sounds. The sophistication has to show up in what the *distractors* force the student to weigh, not just in word choice.

- Every question needs `passageId` and `paragraphRefs: number[]` (1-indexed).
- **Retrieval**: "According to paragraph N..." — correct answer is an exact restatement of a stated fact; distractors are *close, plausible paraphrases of other real details in the same passage*, never obviously-wrong filler — real papers can't be beaten by skimming.
- **Inference**: connects two details the passage places near each other without stating the link. For 1-2 of these, build wrong options as a *strength gradient* around the same claim (unsure→interested→keen→enamoured) rather than four unrelated wrongs — the student judges degree, not just direction.
- **Vocabulary**: quote the exact sentence; only one option is a genuine synonym in context. Lean into genuinely obscure/period words for the harder half (preeminent, stupefaction, leviathan). Include one false-cognate trap (shares a root, means something different — "stupefaction"→"stupidity") and one register-shift trap (common word, uncommon sense — "liable" as "prone to" not legally responsible).
- **Grammar**: word class/clause function/sentence structure in a quoted fragment. Space evenly as "breather" items between harder questions, don't cluster.
- **Literary technique**: name the device in a quoted fragment; correct answer requires the whole passage to justify (symbolism traces back to paragraph 1). Include at least one "which of these is NOT present" device-spotting question.
- **NOT-questions**: "Which is NOT true/NOT mentioned?" — correct answer is never stated at all, and all 4 wrong options are individually verifiable as true. Structurally the hardest archetype (confirm 4 true things, not spot 1 false one) — include 2-3 per section, spread across retrieval-adjacent and device-spotting flavors.
- **Author-/character-voice inference**: "Which word would [author/narrator/character] most likely use to describe...?" — synthesises tone across the whole passage. Build wrong options as adjacent-but-wrong shades of the same judgement (for an overconfident-not-malicious character: criminal/crafty/cranky/clueless around correct "complacent") — the student picks the precise shade, not just the right direction. 1-2 per passage.
- Optionally, once per paper: a light cross-subject hybrid (general-knowledge fact wrapped in a quote, or a small date/time calc implied by the text) — used sparingly, not as a theme.
- `difficulty: "stretch"` for Elite papers (a couple of "standard" retrieval/inference is fine if truly single-step).
- `marks: 1`, `timeEstimateSeconds` 50-85 (retrieval fastest, inference/literary/NOT slowest).

## Writing spelling / punctuation (grammar-mistake) questions

Both use **segment format**: sentence split into 4 lettered clauses + a 5th "no mistake" option (`SegmentMistakeAnswer`) — clause order is fixed by you, the renderer randomises the *displayed letter* itself (never shuffle clause order yourself, see `research/mock-authoring-lessons.md` Bug 2).

- `text`: instruction line (`"Find the group of words with the spelling/grammar mistake in it. If there is no mistake, choose N."`) then the quoted sentence.
- `options`: sentence split into exactly 4 word-group substrings (concatenate back to the full sentence) + literal `"No mistake"`.
- `correctAnswer`: exact text of the erroring segment, or `"No mistake"`.
- Exactly 1 genuine `"No mistake"` per set of 9 (tag `no-mistake`, ~10-11%, matching the real exam's rate — not 2).
- Spelling: standard 11+ trap words (receive/believe, separate, occasion, government, privilege, tomorrow) — reusing the same target words across mocks with fresh sentences is fine and expected.
- **Punctuation (`egr*`) must test punctuation mechanics, not abstract grammar** — this section is titled "Punctuation" and previously (a real, student-flagged bug) tested subject-verb agreement/dangling modifiers/tense-consistency instead, which read as a different, harder skill than the real exam's equivalent section. Rotate through these categories so no error type repeats within one set of 9:
  - Hyphenation of compound numbers (twenty-one..ninety-nine) and written-out fractions ("one-third")
  - Apostrophe placement for joint ("Sam and Priya's book") vs. separate ("Sam's and Priya's books") possession
  - Comma splices; correct bracketing commas around a removable interrupting clause
  - Semicolon misuse (before a dependent clause that should take a comma, or before a coordinating conjunction like "yet"/"but")
  - Quotation marks incorrectly wrapping paraphrased/reported (non-verbatim) speech
  - Missing/misplaced comma around interrupted direct speech (e.g. splitting a quotation around "she explained")
  - Apostrophes vs. plurals (its/it's, a plain plural mistaken for possessive)

  **This is a category fix, not a difficulty cut — keep the section genuinely hard.** Each category has an easy version and a hard version; write the hard one. Joint- vs. separate-possession apostrophes, semicolon-vs-comma before a coordinating conjunction, and comma-splice detection inside a long, multi-clause sentence are all naturally tricky when the sentence is long enough and the correct/incorrect segment isn't the obviously-clunky one — lean into that rather than picking short, simple sentences just because the rule itself is mechanical. Keep 1-2 of the 9 at `difficulty: "challenge"` (e.g. a semicolon-before-conjunction error buried in a sentence long enough that the reader has forgotten the clause started non-independent by the time they reach the semicolon).

  A little genuine grammar-agreement content (subject-verb agreement, double comparatives, relative pronouns) is fine as occasional variety, but punctuation-mechanics should be the clear majority — that's what the section name promises and what a real exam tests here.
- Tag every question `["spelling"|"grammar-mistake", "GL-style", "harder", "segment-format"]` (+ `"no-mistake"` where relevant, + `"challenge"` for the hardest 1-2) — the section/mistake tag is what `getEnglishSectionId()` classifies on, not optional.

## Writing cloze (best word) questions

`questionType: "cloze"`, one sentence with a `____` gap, 5 options all grammatically plausible in isolation but only one correct given tense/connective logic (conditionals, although/unless/despite, verb-tense agreement, adverb vs. adjective form). Tag `["cloze", "grammar", "GL-style", "harder"]`.

## Quality bar beyond the automated checks

`evaluateMockQuality()` returning `"Ready"` proves the mock is *structurally* valid. It does not catch weak items:

- **Distractor plausibility is the whole game.** Every comprehension question needs 2-3 genuinely plausible options, not 1 right answer plus 4 a strong reader eliminates on sight (founder feedback, after a strong student was scoring 100% on comprehension on the hardest papers — not because passages were easy, but wrong options were: "don't let them do eliminations"). For retrieval/vocabulary, at least 2 of 4 wrong options must require having actually read the relevant paragraph to rule out — pull them from *other true details in the same passage*, never generic invented wrongs. For inference, 1-2 wrong options should be plausible over-reads of the same evidence, not unrelated claims. A question is too easy if a student who skipped the passage could eliminate 3 of 4 on plausibility alone — but every question must still resolve to exactly one objectively correct answer, so spot-check each rewritten distractor against the passage text before calling it done. See `english-gl-15-elite`'s `frh1`-`frh28` for a worked example.
- **Don't over-template against your own reference mock** — swapping nouns/setting 1:1 with the same sentence shape/clause count/connective slot produces a structurally sound reskin, not a fresh paper. Vary sentence length, clause order, and which detail is tested even when the underlying grammar point repeats across mocks (repeating grammar *points* like subject-verb agreement is fine and expected — GL does this too — the *sentences* shouldn't be find-and-replace copies).
- **Read the passage once start-to-finish for register** after writing it — 11+ literary fiction shouldn't be skimmable in one pass; if every sentence resolves immediately with no held-back detail, inference/symbolism questions won't have anything real to ask.
- **Spot-check distractors against the passage text** — search for a couple of distractor phrases; if a "wrong" retrieval option is actually a paraphrase of what the passage says, you've written a two-correct-answer item without realising it.
- **Run `npm.cmd run typecheck` after drafting, not only at the end** — a stray typo'd field (e.g. `marksScheme:` instead of `markScheme:`) won't fail `evaluateMockQuality()` or the id/answer checks, only TypeScript's structural check catches it.

## Wiring up the `MockExam` entry

```ts
{
  id: "english-gl-NN-elite", // or a descriptive non-elite id
  title: "English GL-Style Full Paper N", // plain single tier word if any, no stacked "(Beyond X)"/"(Difficult)" descriptors
  subject: "English",
  style: "GL-style",
  difficultyLabel: "Summit Stretch", // or "Standard"
  durationMinutes: 55,
  totalMarks: 54, // must equal the sum of every question's `marks`
  questionIds: [...], // 28 + 9 + 9 + 8, comp/spelling/grammar/cloze block order
  published: true,
  releaseDate: "YYYY-MM-DD",
  tier: "Elite", // NOT "Diagnostic Assessment" — english-gl-8/9-elite have a pre-existing mismatch, don't copy it
  description: "...",
}
```

## Verify and deploy

```bash
npx tsx scripts/verify-mock.mts your-new-mock-id   # bank-wide dup ids, answers resolve, marks sum, English section split, evaluateMockQuality
npm.cmd run typecheck && npm.cmd run lint
npm run db:seed   # idempotent catalog upsert — pushing platform.ts alone does NOT make it live; production reads Postgres, not the static file. Catalog tables only, safe to re-run, do this as a routine last step.
```
