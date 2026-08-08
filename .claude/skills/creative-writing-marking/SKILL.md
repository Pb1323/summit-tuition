---
name: creative-writing-marking
description: Mark a student's handwritten or typed creative writing homework (photographed/scanned PDF or image) and produce a printable HTML/PDF marked report in worksheets/. Use when asked to mark, grade, review, or give feedback on a creative writing piece/story/homework submission.
---

# Creative writing marking

Scope: turning a student's raw creative writing submission (almost always a
photo-scanned PDF of handwriting, sometimes typed text) into a marked report
in `worksheets/`, following the same rubric and content model as the existing
Lupin/Changlun marked reports (`worksheets/*-creative-writing-marked-report*.html`).
This is human-facing tutoring feedback, not a mock/Attempt-system score — no
Prisma/platform code is touched (see CLAUDE.md's "Creative writing / free-text
essays cannot be auto-marked anywhere on the platform" limitation — this skill
is the manual-marking workflow that exists precisely because of that gap).

## Step 1: read and transcribe the submission

- Use `Read` directly on the PDF/image path. For a single-page scanned PDF
  this renders the photo without needing `pdftoppm`/poppler; multi-page PDFs
  need the `pages` param, which does require poppler — if that's not
  installed, check the page count first (`/Count N` in the raw PDF bytes is a
  fast way to confirm without spawning a renderer) rather than assuming a
  page-range call will work.
- Transcribe carefully. Handwritten homework has visible self-editing (words
  crossed out and rewritten, insertions caret'd in) — read past the crossed-
  out version to the student's actual final intended text, but note genuine
  self-correction as a strength (see Strengths below), it's real evidence of
  editing skill.
- **Don't over-flag.** The single biggest quality bar here, learned the hard
  way (see `worksheets/lupin-creative-writing-marked-report-3.html`'s
  context-box): a first-pass read will flag phrases that actually hold up
  fine once you reread them in context. Reread every flagged phrase once
  against the surrounding sentence before finalizing the corrections list —
  if it's grammatically valid and the meaning is clear, it's not an error,
  even if it felt slightly off on a skim. Only flag things that are genuinely
  wrong: missing words, wrong word forms, real punctuation errors, unclear
  referents, dangling connectives — not stylistic choices you'd have phrased
  differently.

## Step 2: check for a prior report on the same student

Look for existing files matching `worksheets/<student>-creative-writing-marked-report*.html`
(numbered suffixes `-2`, `-3`, etc. for repeat pieces). If one exists:

- Read it to check whether any previously-flagged pattern (a recurring wrong
  word, a habit of trailing off with "..." instead of a proper ending, tense
  slips, etc.) shows up again in the new piece. If it does, reference it
  explicitly in the new report's continuity note ("same pattern noted in your
  last report") — this is the single most valuable thing a report can do for
  a student who's had several pieces marked, and it's what separates this
  from a one-off grade.
- Note recurring **strengths** too, not just recurring errors — if the
  student used the same structural device again (e.g. a bold subheading, a
  one-line dramatic question as its own paragraph, a colon-marked time jump),
  say so explicitly ("you're clearly using this on purpose now, not by
  accident") rather than praising it as if it were new.
- If there's no prior report, omit the continuity-note block entirely rather
  than leaving a placeholder — don't fabricate history that isn't there.

## Step 3: mark against the rubric

Four strands, scaled to **25 marks total**:

| Strand | Marks | What it covers |
|---|---|---|
| Content & Ideas | /7 | Plot/idea originality, pacing, whether the piece resolves or trails off |
| Structure & Organisation | /6 | Paragraphing, structural devices (flashback, time-jumps, subheadings), a real ending vs. an abrupt stop |
| Style: Vocabulary & Variety | /6 | Word choice, similes/imagery, sentence variety, avoiding repetition |
| Technical Accuracy | /6 | Grammar, punctuation, spelling, tense consistency — genuine errors only |

Calibrate honestly against real ability, not a flat curve — a piece with a
genuinely inventive structural idea and only 2-3 small technical slips can
land in the low-to-mid 20s; a piece with a flat plot and several real
technical errors should land meaningfully lower. Don't inflate marks to be
encouraging — encouragement belongs in the tone and the Strengths section,
not in an unearned score.

## Step 4: pick a template and rotate it

Three structurally distinct report templates live in this skill's
`templates/` folder — not just recolors of one layout, genuinely different
page structures, so consecutive reports for a student (or across students)
don't look like the same document with a new palette:

| Template | File | Feel |
|---|---|---|
| Ledger / Literary | `templates/ledger-literary.html` | Serif, wine/gold, rotated score badge, corrections table — the original established style |
| Scorecard Dashboard | `templates/scorecard-dashboard.html` | Sans-serif, navy/teal, circular progress rings, card-grid layout |
| Editorial Dark | `templates/editorial-dark.html` | Dark background, gold accents, magazine masthead, pull-quote verdict |

**Rotation rule**: before marking, check which template the student's most
recent prior report used (`grep -o "wine\|teal\|masthead" worksheets/<student>-creative-writing-marked-report*.html`
or just open the most recent one) and pick a **different** one this time —
cycle Ledger → Dashboard → Editorial → Ledger. If it's the student's first
report, any of the three is fine (Ledger is the safest default since it's
the most-tested). Never reuse the same template twice in a row for the same
student.

Copy the chosen template file into `worksheets/<student>-creative-writing-marked-report[-N].html`,
then fill in every `[bracketed placeholder]` with the real content — keep the
`<style>` block as-is, same convention as `worksheets/templates/README.md`.

## Step 5: fill in the content sections

- **Verdict**: badge/score + one-line headline + 2-3 sentence summary of what
  earns the mark and what's holding it back.
- **Mark breakdown**: one card/row per strand with a short, specific comment
  (quote actual phrases from the piece, don't write generic feedback that
  could apply to any piece).
- **Annotated extract**: the full (or near-full, if very long) transcribed
  text, with genuine errors wrapped in the template's flag span and a
  numbered marker, in reading order.
- **Corrections table/list**: one row per flagged number — issue explanation,
  then the corrected text. Keep explanations short and specific about *why*
  it's wrong (not just "grammar error").
- **Strengths**: 2 cards/columns, each with 2-4 bullet points that quote the
  piece directly (`<em>"exact phrase"</em>`) rather than describing it
  abstractly — "a strong triplet of similes" beats "good use of language."
- **Next steps**: 2-3 concrete, actionable items, tied to the continuity note
  where relevant (repeat the same honest note if the same issue recurs,
  rather than inventing a new one each time just for variety).

## Step 6: deliver as PDF

Per `feedback_prefer_pdf_worksheets` — always produce the PDF alongside the
HTML (open in a browser and print/export to PDF, or use an existing project
script if one exists for HTML→PDF), not just the HTML file, matching every
other file in `worksheets/`.

## Notes

- This is a manual, per-piece workflow — there is no code to run, no
  `evaluateMockQuality()`-style automated check. The quality bar is the
  reread-before-flagging discipline in Step 1 and the specificity discipline
  in Step 5.
- If the same passage/piece needs re-marking after the student revises it,
  make a new numbered report (`-2`, `-3`, ...) rather than overwriting the
  original — the continuity notes in Step 2 depend on the full history being
  preserved.
