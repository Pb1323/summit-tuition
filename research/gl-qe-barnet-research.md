# Queen Elizabeth's School, Barnet (QE Boys) 11+ format research — and GL English style supplement

Research date: 2026-08-03. Purpose: verify whether `qe-barnet-style` in `src/data/platform.ts`
(built 2026-07-24 from unsaved "founder-supplied research") is representative of QE Barnet's real
entrance exam, and supplement `gl-english-question-bank.md` with real GL English archetype detail
(comprehension distractor patterns, spelling/punctuation, cloze) beyond what that file already
covers. Companion to [[gl-english-question-bank]] and [[gl-vr-nvr-question-bank]].

**Method:** WebSearch + WebFetch against 8 tutoring/11+ information sites (no login-gated forum
content was retrievable — the elevenplusexams.co.uk forum thread `viewtopic.php?t=35665` returned
HTTP 403). No official GL Assessment or QE Barnet school-published familiarisation booklet for QE
Barnet specifically was found (unlike the general GL English/Maths booklets already used for
`gl-english-question-bank.md`/`gl-papers/`) — everything below on QE Barnet specifically is
third-party tutoring-site reporting, not a primary GL/school document. Treat accordingly: **cross-
source agreement is the confidence signal here, not a single authoritative document.**

## 1. Exam board / test provider

**GL Assessment**, confirmed independently by 5 of 6 sources fetched:
- [ExamPapersPlus — QE Barnet 11+ exam information](https://exampapersplus.co.uk/advice/11-plus-year-6/queen-elizabeths-school-barnet-11-plus-11-exam-information/): "The 11+ entrance exam at Queen Elizabeth's School, Barnet, consists of two multiple-choice test papers in: English [and] Mathematics."
- [Achieve Learning — QE Boys 2026 Entry Guide](https://achievelearning.co.uk/queen-elizabeths-school-eleven-plus-exams-a-2026-entry-guide/): "GL Assessment is responsible for developing the test materials and papers."
- [Atom Learning — QE Barnet 11+ guide](https://www.atomlearning.com/blog/queen-elizabeths-school-11-plus): "Exam Board: GL Assessment."
- [PiAcademy — QE Barnet 2026 guide](https://piacademy.co.uk/schools/queen-elizabeths-school-barnet-136290/): "Exam Board: GL Assessment."
- [Leading Tuition — QE Barnet Complete Guide 2026](https://www.leadingtuition.co.uk/blog/queens-elizabeths-school-barnet-11-plus-complete-guide-2026): "Provider: GL Assessment."

**Consortium check:** QE Boys and The Henrietta Barnett School (girls) are both selective North
London grammar schools that use GL Assessment and test in the same September window, but the
sources fetched describe them as running **separate, differently-structured tests**, not one
shared consortium paper — [Achieve Learning](https://achievelearning.co.uk/queen-elizabeths-school-eleven-plus-exams-a-2026-entry-guide/)
and [ExamPapersPlus's Henrietta Barnett page](https://exampapersplus.co.uk/henrietta-barnett-school-11-plus-11-exam-information/)
describe Henrietta Barnett as a **two-round** process (Round 1: English + Verbal Reasoning + Non-
Verbal Reasoning MCQ, ~top 300 through; Round 2: a second sit-down), which is a materially
different structure from QE Boys' single-day two-paper (English, Maths) test. **Unverified**: no
source found explicitly states whether QE Boys and Henrietta Barnett share the same underlying
GL question-bank templates the way, e.g., the Ripon Grammar-style research found for that
consortium — treat "shared test" as not confirmed, only "shared provider + shared season."

## 2. Papers, subjects, timing

**Consistent across 5 of 6 sources**: exactly **two papers, same day, ~50 minutes each**, English
and Maths only.

| Paper | Subject | Timing | Format |
|---|---|---|---|
| Paper 1 | English | ~50 min | Multiple choice |
| Paper 2 | Mathematics | ~50 min | Multiple choice |

- [ExamPapersPlus](https://exampapersplus.co.uk/advice/11-plus-year-6/queen-elizabeths-school-barnet-11-plus-11-exam-information/): "Both papers are taken in the same session."
- [Achieve Learning](https://achievelearning.co.uk/queen-elizabeths-school-eleven-plus-exams-a-2026-entry-guide/): "These tests last roughly 50 minutes each, although the exact format and question types can vary from year to year." Also states explicitly: **"The exam does not include Verbal Reasoning or Non-Verbal Reasoning components."**
- [Atom Learning](https://www.atomlearning.com/blog/queen-elizabeths-school-11-plus): "approximately 50 minutes" per paper, short break between them; content is "Key Stage 2 national curriculum" for English (comprehension/spelling/punctuation/grammar) and "Key Stage 2 maths content taught up to the start of Year 6" (number, measurement, geometry, statistics) — no VR/NVR mentioned.
- [PiAcademy](https://piacademy.co.uk/schools/queen-elizabeths-school-barnet-136290/): "Approx. 45–50" questions per paper, and explicitly notes "no separate creative writing component; the focus remains strictly on the GL Assessment 11 plus multiple-choice format."
- [Sats-Papers.co.uk](https://www.sats-papers.co.uk/11-plus-papers/schools/queen-elizabeths-school-11-plus-barnet-london/): "two multiple-choice papers in Maths and English," combined into one overall score; test dates for 2026 entry given as Wed 16 / Thu 17 Sept 2026 (two separate papers on consecutive days, or a two-day sitting window — the source doesn't disambiguate which paper falls on which day).

**One outlier, flagged as likely wrong or conflated with a different school:**
[Leading Tuition](https://www.leadingtuition.co.uk/blog/queens-elizabeths-school-barnet-11-plus-complete-guide-2026)
describes "Paper 1 — Verbal Reasoning and English" and "Paper 2 — Mathematics and Non-Verbal
Reasoning," with NVR content ("shape rotation, nets, and reflections"). This directly contradicts
the other 5 sources, including two (Achieve Learning, PiAcademy) that explicitly rule out VR/NVR
for QE Barnet. Given the 5-vs-1 split, and that Leading Tuition markets itself generically across
many schools (a common tutoring-site pattern is templated per-school copy that doesn't always get
correctly customised), **this claim should not be trusted** — it likely reflects either a
templating error or genuine confusion with Henrietta Barnett's VR/NVR round. Also worth noting:
QE's English paper description that does recur across sources ("vocabulary, comprehension,
analogies, and language manipulation" — see PiAcademy's exam-info summary) includes **word-based
"analogies"**, which is a verbal-reasoning-flavoured *sub-skill embedded inside the English paper*
(see §5 below) — this is a real, differently-scoped thing from "the exam has a separate VR paper,"
and may be the actual source of the VR confusion.

**Not found / unverified**: an exact, sourced question count per paper. PiAcademy gives "Approx.
45–50" per paper; Achieve Learning gives "approximately 65 questions" for English "based on two
comprehension passages" (this is the only source giving a passage count > 1, also unverified
elsewhere). Treat exact counts as approximate, not confirmed.

## 3. Question format/style

**Confirmed, high confidence (5 sources agree): pure multiple choice, OMR answer sheet, no
written/constructed-response Maths.**

- [ExamPapersPlus](https://exampapersplus.co.uk/advice/11-plus-year-6/queen-elizabeths-school-barnet-11-plus-11-exam-information/) and [Atom Learning](https://www.atomlearning.com/blog/queen-elizabeths-school-11-plus) both independently state candidates mark answers on a separate **Optical Mark Recognition (OMR) sheet**, marked electronically — this is standard GL Assessment practice, not QE-specific, but confirms the paper itself is not asking for written workings.
- [PiAcademy](https://piacademy.co.uk/schools/queen-elizabeths-school-barnet-136290/): explicit warning about "lozenges" (OMR bubbles) needing clean pencil marks.
- No source anywhere describes short written/numeric-answer Maths questions for QE Barnet
  specifically (the pattern the founder was worried about, common in some London boys'-consortium
  tests). **This is the direct answer to research question 5**: based on everything found, QE
  Barnet's Maths paper is standard MCQ, matching GL Assessment's usual format and matching what
  this platform already supports — no architecture change needed on that front.

**English content description (from PiAcademy, cross-referenced with Achieve Learning's "one of
the hardest 11+ papers in the country... classical texts, strict time pressure, rigorous
comprehension and grammar"):** vocabulary, comprehension, analogies, language manipulation —
broadly consistent with the standard GL English archetype (comprehension + SPaG + cloze) already
documented in `gl-english-question-bank.md`, with "analogies" as the one QE-flavoured addition
worth incorporating (see §5).

## 4. Real sample/familiarisation material found

No downloadable official GL/QE familiarisation booklet or verbatim past-paper excerpt was
retrievable through this research pass (paywalled behind ExamPapersPlus/PiAcademy/Atom Learning
purchase flows, or behind the elevenplusexams.co.uk forum's login). What was retrievable:

- [ExamPapersPlus practice test product page](https://exampapersplus.co.uk/browse/papers/eleven-plus/11-plus-queen-elizabeth-qe-boys-barnet-test-1/) claims to "replicate the actual exam format, structure and timings" and cover "full examination syllabus for both Maths and English," but the page itself (a sales page) doesn't expose question-level detail without purchase — **unverified beyond marketing copy.**
- The elevenplusexams.co.uk forum thread that search results surfaced (`t=35665`, titled "Queen Elizabeth Barnet (for boys) Grammar School exam prep") returned HTTP 403 on fetch — **could not access, flag as a real gap**; a human with a browser session could likely retrieve real parent first-hand accounts there that this research pass could not.
- No PDF past paper or scanned original QE Barnet paper was found via search in the time available.

**Recommendation if higher confidence is needed later**: purchase one ExamPapersPlus or PiAcademy
QE Barnet practice-test product directly (both explicitly claim to replicate the real format) to
get an actual question-level sample, rather than relying on marketing-copy summaries.

## 5. GL English real question-style supplement (beyond `gl-english-question-bank.md`)

`gl-english-question-bank.md` already documents section structure (52/17/17/15% comprehension/
spelling/punctuation/cloze), the spot-the-error segment format, and cloze gap mechanics from a
real 54-question familiarisation booklet. This section adds two things that booklet's single-
sample analysis couldn't cover: (a) analogy-style word-relationship questions (relevant to QE's
described format), and (b) general distractor-design patterns from cross-source tutoring
consensus, since a second official booklet wasn't fetched this session.

### Word analogies (relevant addition for QE-style mocks specifically)

Not present in the one GL English booklet already analysed in `gl-english-question-bank.md`
(that booklet's 54 questions were 100% comprehension/spelling/punctuation/cloze, no analogy
questions) — but multiple sources describe analogies as a real, recurring GL-family English/VR
crossover archetype, and QE Barnet's English paper description specifically names them. Per
[11PluseHelp's analogies breakdown](https://www.11plusehelp.co.uk/11-plus-verbal-reasoning-examination/11-plus-verbal-reasoning-test-papers/11-plus-analogies):

- Format: `A is to B as C is to ___`, with an MC option list for the missing word.
- Relationship categories seen: synonym (big:large :: small:tiny), antonym (happy:sad ::
  bright:dark), part-to-whole (petal:flower :: tyre:car), cause-effect (fire:burn :: rain:soak),
  purpose/function (pen:write :: knife:cut), category/class membership (dog:mammal :: shark:fish),
  intensity/scale (warm:hot :: cool:cold).
- **Caveat**: this source (11PluseHelp) treats analogies as a Verbal Reasoning archetype, not
  specifically an "English paper" one — the "language manipulation"/"analogies" wording attributed
  to QE Barnet's English paper (via PiAcademy) may mean QE's English paper embeds a small number
  of VR-flavoured vocabulary-relationship items directly into the English paper, similar to how
  the existing GL booklet embeds word-class questions inside its comprehension section (see
  `gl-english-question-bank.md`'s "Grammar/word-class embedded inside the comprehension passage"
  row) — **this is inference, not a confirmed fact**, since no real QE analogy question was found.

### Comprehension distractor design (general search — limited new detail found)

Search specifically for GL's distractor-design patterns (the "almost-right trap answer" mechanic)
did not surface a source with concrete, citable detail beyond what tutoring sites already say in
general terms — e.g. [11PluseHelp's GL Assessment overview](https://www.11plusehelp.co.uk/11-plus-gl-assessment)
notes that GL English tests "processing speed, vocabulary range, inference ability, grammar
precision, and comprehension stamina simultaneously," and that strong readers often fail
because they "answer what the text says literally rather than what it implies" (an inference
gap) — this supports (but doesn't add new detail beyond) `gl-english-question-bank.md`'s existing
finding that ~40% of real comprehension questions are inference-type, and its "no easy
eliminations, 2-3 plausible options" authoring rule already baked into the
`english-mock-authoring` skill (per the user's own MEMORY.md note on this). **No new distractor
mechanic was found and verified this session** — flag as still an open research gap if the
founder wants more granular distractor-pattern detail than the existing single-booklet analysis
already provides.

## Comparison: current `qe-barnet-style` mock vs. this research

Current mock (`src/data/platform.ts`, id `qe-barnet-style`, `subject: "Maths"`,
`durationMinutes: 100`, `totalMarks: 73`, 60 questions):

- **Uses `mh45-55`/`mp1-19` (29 Maths), `eh21-30`/`ecl5-9`/`esp5-9` (19 English), and `vr2-11`
  (10 Verbal Reasoning) questions.**
- Description states: "styled after Queen Elizabeth's School Barnet's two same-day papers
  (English+VR, and Maths...)" — i.e. the mock was explicitly built on the premise that QE's
  English paper includes a Verbal Reasoning component.

**This is the one clear, well-supported correction**: 5 of 6 independent sources (including two,
Achieve Learning and PiAcademy, that state it explicitly) describe QE Barnet's real exam as
**English and Maths only, with no separate Verbal Reasoning or Non-Verbal Reasoning section** —
the mock's premise of an "English+VR" paper does not match the weight of evidence found. The one
source that does mention NVR (Leading Tuition) contradicts 5 other sources including two explicit
denials, and is judged unreliable (see §2). The "analogies" QE's English paper does reportedly
include (§5) are word-relationship items embedded within the English paper, not a full stand-
alone VR section using this platform's dedicated `vr`-prefixed reasoning-puzzle bank (code-
breaking, sequences, etc., built for a different purpose) — using 10 generic VR questions
(`vr2-11`) as a bolted-on section is not well supported by any source.

Secondary, lower-confidence observations (not necessarily worth acting on without more research):
- Real papers are ~45-50 MCQ questions **per paper** (so up to ~90-100 total across English+Maths)
  at ~50 minutes each; the current mock's 60 questions across a combined 100-minute sitting is in
  the right timing ballpark per-paper-equivalent but on the smaller side for total question count
  if the goal is exactly matching real paper density — unverified how much this matters since
  exact QE counts themselves aren't confirmed (§2).
- No source suggests QE's English paper is unusually cloze/punctuation-heavy or light — nothing
  found to justify deviating from the standard GL 52/17/17/15% weighting already used elsewhere
  on this platform.

## Reusable prompt template (QE Barnet style)

```
Generate a QE Barnet (Queen Elizabeth's School, Barnet)-style mock from
research/gl-qe-barnet-research.md:
- Exactly 2 papers worth of content, English and Maths ONLY — no dedicated VR/NVR section
  (do not reuse the generic `vr`-prefixed reasoning bank for this mock).
- English content: standard GL comprehension/spelling/punctuation/cloze split per
  gl-english-question-bank.md's weighting (52/17/17/15%), optionally with a small number of
  word-analogy items (A is to B as C is to ___) mixed into the vocabulary-in-context slice of
  comprehension, reflecting QE's "language manipulation" reputation — treat this addition as a
  stylistic inference, not a confirmed QE archetype.
- Maths content: standard KS2-curriculum MCQ, no written/constructed-response items — matches
  this platform's existing MCQ-only architecture, no format change needed.
- ~45-50 questions per subject if aiming to match real paper density (current platform mock uses
  fewer; deviate only with founder awareness this isn't an exact-count match).
- Description field must state this is an original Summit Tuition paper in the researched
  structure, NOT the official QE Boys paper, and flag any inferred (not confirmed) elements
  per this file.
```

## Confidence summary

| Claim | Confidence | Basis |
|---|---|---|
| Exam board = GL Assessment | High | 5 independent sources agree |
| Exactly 2 papers, English + Maths | High | 5 of 6 sources agree, 2 explicitly deny VR/NVR |
| No VR/NVR component | High | 2 explicit denials, only 1 contradicting (unreliable) source |
| Both papers pure MCQ, OMR sheet | High | 3 independent sources, consistent with standard GL practice |
| ~50 minutes per paper | High | 4 sources agree |
| Exact question count per paper | Low | Estimates range 45-50 (PiAcademy) to ~65 for English alone (Achieve Learning), not cross-verified |
| English includes word analogies | Medium | 1 direct source (PiAcademy) + general GL/VR analogy-format corroboration, no verified real QE analogy question seen |
| QE and Henrietta Barnett share one test | Not found | No source claims this; they appear structurally different (2-paper vs. 2-round) |
| Real distractor-design mechanic beyond existing booklet analysis | Not found | No new citable detail surfaced this session |
