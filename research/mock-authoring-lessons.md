# Mock authoring lessons (English & Maths) — read before authoring a new mock

This file exists because the same 3 bugs kept getting rediscovered across
sessions when authoring English/Maths mocks. Read this before writing new
mock questions or touching `SegmentMistakeAnswer` / `ClozeGapRenderer` /
`mock-room-shell.tsx` question ordering, so they don't get reintroduced.

## Bug 1 — correct answers clustering (e.g. always A, A, A, A, B, B, B...)

**Symptom:** across a mock, the correct answer's position in the option list
wasn't random — hand-authored/generated questions tended to put the correct
answer in the same slot repeatedly (e.g. always first), so a student could
guess-pattern-match instead of actually answering.

**Fix (current, live):** `QuestionRenderer` in `src/components/platform/ui.tsx`
applies a deterministic per-question `seededShuffle(rawOptions, question.id)`
to every ordinary multiple-choice/cloze question — stable across re-renders
(same seed every time) but different per question, so the correct answer's
position varies question-to-question. This is app-wide and already covers
every mock, including new ones — you don't need to shuffle option order
yourself when authoring; just write `options` with the correct answer
wherever reads most naturally and the renderer handles randomising position.

## Bug 2 — segment-format ("find the mistake" / spelling / grammar) questions broke when the same fix was applied to them

**Symptom:** spelling/grammar-mistake questions (`SegmentMistakeAnswer`,
tag `segment-format`) split a sentence into 4-5 lettered clauses (A/B/C/D/N
for "no mistake"). Unlike normal MCQ options, these clauses **must stay in
the sentence's original reading order** — you can't shuffle "clause 3" to
appear before "clause 1", the sentence would stop making grammatical sense.
So Bug 1's fix (shuffling option order) was correctly *not* applied to these
— but that meant the segment holding the mistake was determined purely by
where each hand-authored question happened to place it in the source data,
and if that clustered (e.g. most `esp*`/`egr*` questions in a batch happen to
have the mistake in the first clause), the *displayed letter* A ended up
correct far more often than B/C/D — reintroducing the same clustering
problem, just at the clause-authoring level instead of the option-order level.

**Fix attempt that was rejected:** shuffling the clauses themselves
(reordering which clause appears first) — rejected because it breaks the
sentence grammatically.

**Current fix (live):** `SegmentMistakeAnswer` keeps the clauses in fixed
reading order, but reshuffles **which letter label (A/B/C/D/N) is attached to
which clause position**, per question, via a second, differently-seeded
`seededShuffle(pool, question.id + "-letters")`. So clause 1 might display as
"C" on one question and "A" on the next — the sentence itself never moves,
only the small superscript letter tag next to each clause changes. See
`SegmentMistakeAnswer` in `src/components/platform/ui.tsx` for the
implementation and inline comments.

**Resolved 2026-07-21:** a founder session flagged that this letter-shuffle
can look "messed up" mid-question (e.g. seeing labels in the order B, C, A,
D, N instead of A, B, C, D, N) and asked whether it should be removed. Before
deciding, checked the actual scale of Bug 2 directly — a script counted, across
all 270 live `segment-format` questions in the bank, which natural clause
position (A/B/C/D, ignoring the shuffle) the correct answer sits in if you
strip the letter-shuffle back out:

```
A: 87 (32.2%)   B: 97 (35.9%)   C: 26 (9.6%)   D: 5 (1.9%)   N: 55 (20.4%)
```

That confirms Bug 2 is real and severe, not a theoretical worry — 68% of
these questions have their mistake in clause A or B, and D is used in fewer
than 2% of questions. Removing the letter-shuffle today would make the
correct answer predictably A or B on two-thirds of segment questions across
the whole platform. **Decision: keep the shuffle as-is.** A student
occasionally seeing labels out of ascending order is a minor, one-time
surprise; a student (or a sibling/friend swapping notes) learning "it's
almost always A or B" defeats the point of the question entirely. This is not
being left as an open question anymore — don't remove the shuffle without
first re-running the same check after rewriting/rebalancing the underlying
`esp*`/`egr*`/spelling/punctuation question data so the mistake's clause
position is itself roughly even across A/B/C/D (that's the real fix, and a
much bigger job — ~270 questions' sentences would need reworking, not a
one-line code change).

## Bug 3 — question order jumbled instead of grouped into GL's real section blocks

**Symptom:** a GL-style English mock's questions weren't presented to the
student in real GL exam order (all comprehension together, then all
spelling, then all punctuation/grammar-mistake, then all cloze) — they
appeared in whatever order they happened to sit in the mock's `questionIds`
array, which could interleave sections.

**Fix (current, live):** question *order in `questionIds` no longer matters*
for English mocks — `mock-room-shell.tsx` reorders questions into
`ENGLISH_SECTIONS` order (comprehension → spelling → punctuation → cloze) at
render time, bucketing each question via `getEnglishSectionId()` (reads
`tags`/`questionType`, not array position — see `src/lib/english-sections.ts`).
A `SectionInterstitial` also shows once per section the first time a student
reaches it. **You still don't need to hand-order `questionIds` by section**
when authoring — write them in whatever order is convenient (this project's
convention has been comp block, then spelling, then grammar, then cloze,
purely for human readability of the source file) — the render layer handles
the real ordering regardless.

**Verified 2026-07-21** against the newest Elite English mock
(`english-gl-11-elite`): `getEnglishSectionId()` classified all 54 questions
into the correct 4 buckets (28/9/9/8, matching the researched GL 52/17/17/15%
weighting) with zero `undefined`, and `evaluateMockQuality()` (the same
checker used by the admin Quality Checks tab) returned status `Ready` with no
warnings.

## How to verify a newly authored mock isn't shipping any of the above

There's no dedicated npm script for this — write a small one-off script,
`tsx` it, and delete it after. Pattern:

```ts
import { MOCKS, QUESTIONS, PASSAGES } from "../src/data/platform";
import { evaluateMockQuality } from "../src/lib/mock-quality";
import { getEnglishSectionId } from "../src/lib/english-sections"; // English only

const mock = MOCKS.find((m) => m.id === "YOUR-NEW-MOCK-ID")!;
const questions = QUESTIONS.filter((q) => mock.questionIds.includes(q.id));

// 1. No duplicate/missing ids
// 2. Every correctAnswer is actually present in that question's options
// 3. Every question.passageId resolves to a real Passage
// 4. (English) getEnglishSectionId() classifies every question, section
//    counts roughly match ENGLISH_SECTIONS weights, zero "undefined"
// 5. evaluateMockQuality(mock, questions, PASSAGES).status === "Ready"
```

Run with `npx tsx scripts/_tmp-check-mock.mts`, confirm clean output, delete
the script. Also run `npm.cmd run typecheck` and `npm.cmd run lint`.
