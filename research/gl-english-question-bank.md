# GL Assessment English question-type catalogue & weighting

Source: 1 official GL Assessment English familiarisation booklet fetched and read directly
(passelevenplus.co.uk, "English 1", Code 6853 910, © GL Assessment 2017 — 54 real, numbered
questions with answer options, not a third-party summary), cross-checked against tutoring-site
summaries (Achieve Learning, Exam Happy, PiAcademy) for how this generalises across GL's English
consortia. Companion to [[gl-vr-nvr-question-bank]] (same booklet family, same publisher, same
"one archetype pool reused across papers" pattern).

## Paper structure (this booklet)

**54 questions, 4 sections, one continuous MC answer sheet (A–E, or A–D for spot-the-error
sections).** No separate timing given in the familiarisation booklet itself (real school papers
are commonly ~50 questions / 50 minutes per the tutoring-site cross-check).

| Section | Q range | Count | % of paper | Format |
|---|---|---|---|---|
| 1. Reading comprehension | Q1–28 | 28 | 52% | One ~45-line narrative passage, then MC A–E |
| 2. Spelling exercises | Q29–37 | 9 | 17% | 4-segment sentence, mark A/B/C/D or N (no error) |
| 3. Punctuation exercises | Q38–46 | 9 | 17% | Same spot-the-error format as spelling, N-option |
| 4. Cloze / "best word" grammar | Q47–54 | 8 | 15% | Fill-the-gap passage, pick best word/phrase A–E |

**Reading comprehension alone is worth roughly as much as the other three sections combined.**
This matches the tutoring-site consensus ("comprehension ~2:1 over SPaG") almost exactly — 28
vs 26 non-comprehension questions here.

## What comprehension (Section 1) actually tests — the 28 questions broken down

Comprehension is not one skill; question-by-question tagging of this booklet gives:

| Sub-skill | Count | Example (Q#) |
|---|---|---|
| Inference / deduction ("why", "what does this suggest/imply") | ~12 | Q2, Q4, Q6, Q9, Q11–15, Q18, Q21, Q25, Q28 |
| Vocabulary-in-context (synonym / meaning of a quoted word or phrase) | ~7 | Q3, Q6, Q9\*, Q10, Q16, Q17, Q22, Q26 |
| Explicit detail retrieval (answer stated directly in text) | ~5 | Q1, Q7, Q8, Q10\*, Q23 |
| Grammar/word-class embedded *inside* the comprehension passage (not a separate section) | 4 | Q5 (count adjectives), Q19 (identify word class), Q20 & Q24 (classify a list of words) |
| Literary/figurative device naming (simile/metaphor/personification) | 1 | Q27 |

\*a few questions double-count (vocabulary question that also requires inference).

**Implication for mock design:** don't treat "comprehension" as a single question archetype —
it's really 5 sub-archetypes, with inference dominating (~40% of the comprehension section) and
literary-device-naming being rare (1 in 28) despite tutors' summaries listing it prominently.
Grammar is *not* confined to the SPaG sections — GL embeds word-class questions directly into
the comprehension passage too (Q5, Q19, Q20, Q24 all ask "what type of word is X" using words
lifted from the passage just read).

## Spelling & Punctuation sections (Q29–46) — format detail

- Format is identical between the two sections: a sentence is split into 4 bracketed segments
  (A/B/C/D), student marks which segment contains the (spelling|punctuation) error, or marks
  **N** if there is no error in the sentence at all.
- Spelling section draws on: commonly-confused suffixes (`-tion`/`-sion`/`-cian`), doubled
  consonants before `-ing`/`-ed`, `ie`/`ei` words, and generally-tricky non-phonetic words
  (received, pursued, permission, compulsory, playful, climbing, consistent) — i.e. exception
  words, not simple phonics.
- Punctuation section (this booklet's passage: "Hippos") draws on: missing full stops between
  sentences, missing question marks, missing apostrophes (possessive **and** contraction —
  "the sun's harmful rays", "It's true"), and one missing closing bracket. No colon/semicolon
  error appeared in this specific booklet despite tutoring sites listing colons/semicolons/
  ellipses/dashes as in-scope — treat those as *possible but lower-frequency*, not absent.
- Both sections include at least one **N (no mistake)** answer as a genuine distractor, not a
  trick reserved for one question — test-takers must be willing to select "no error."

## Cloze / word-choice section (Q47–54) — format detail

- A short narrative passage ("Performance Time") with 8 gaps, each gap replaced by a 4–5-option
  box (A–E) embedded inline in the passage rather than listed below it.
- Every gap tests a distinct grammar point, not generic vocabulary:
  - noun vs. verb vs. adjective vs. participle confusion (Q47: excitement/excite/exciting/
    excited/excites)
  - homophone/commonly-confused word choice (Q48: there/they're/their/those/them)
  - correct modal/tense form (Q49 conditional, Q50 passive vs. active vs. modal, Q52 tense
    agreement "has missed/misses/is missing/will miss/does miss")
  - correct preposition/relative pronoun (Q53: next to/to which/onto/in between/from)
  - correct subordinating conjunction (Q54: As/Because/Although/Before/Even as)
  - adjective vs. adverb form (Q51: louder/loud/loudest/increased/increasing)
- This is functionally a **grammar accuracy test dressed as a reading task** — every option set
  is grammatically plausible in isolation; only one is correct once the surrounding sentence's
  tense/agreement/register is taken into account. Design mock versions the same way: never make
  the wrong options nonsensical out of context, only wrong *in* context.

## Weighting summary for mock generation

- **~50% comprehension** (of which ~45% inference, ~25% vocabulary-in-context, ~20% explicit
  retrieval, ~15% grammar-embedded-in-passage, ~5% literary device — percentages of the
  comprehension sub-total, not the whole paper)
- **~35% SPaG as spot-the-error** (spelling and punctuation roughly 1:1, always include an N
  option, draw spelling errors from exception/tricky words not phonics, draw punctuation errors
  from missing terminal punctuation + apostrophes primarily)
- **~15% cloze grammar-in-context** (tense/agreement/preposition/conjunction/homophone — never
  vocabulary-only distractors)

This is a **single sample booklet** (GL reuses a small template pool across its ~4 booklets per
subject, per the VR/NVR research) — treat these ratios as a strong prior, not a guaranteed exact
split every real school paper will follow; consortia customise question count and timing per the
tutoring-site cross-check.

## Reusable prompt template

```
Generate {N} original GL-style English {comprehension|spelling|punctuation|cloze} questions
from research/gl-english-question-bank.md, difficulty {foundation|standard|stretch}.
- For comprehension: write a ~40-line passage (fiction or nonfiction), then generate questions
  in this ratio — ~45% inference, ~25% vocabulary-in-context, ~20% explicit retrieval,
  ~15% grammar-embedded (word class of a quoted word/list), <=5% literary device naming.
- For spelling/punctuation: split each sentence into 4 lettered segments, exactly one contains
  an error (or none — include N as a valid answer sometimes), draw errors from exception words
  (spelling) or missing terminal punctuation/apostrophes (punctuation), not phonics-level errors.
- For cloze: embed 5-option gaps inline in a short narrative passage, every option grammatically
  valid in isolation, correct only given surrounding tense/agreement/register.
- Match GL's answer format: MC A-E (comprehension/cloze) or A-D+N (spelling/punctuation).
- Output as Question objects per src/types/platform.ts (subject: "English"), with
  correctAnswer, markScheme, and explanation for each.
```
