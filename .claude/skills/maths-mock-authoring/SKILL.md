---
name: maths-mock-authoring
description: Write and wire up new Maths mocks for Summit Tuition — full-length 80-question GL/Elite-style papers or shorter diagnostic sets — as hand-authored fixtures in src/data/platform.ts. Use when asked to add a new Maths mock, a new Elite Maths paper, or a batch of new Maths questions.
---

# Maths mock authoring

Scope: hand-authored Maths mocks in `src/data/platform.ts` (questions +
optional `QuestionVisual` diagrams + the `MockExam` metadata entry). Not the
deterministic generator (`src/lib/mock-generation.ts`'s `chooseMathsTemplate`,
used by the admin "Generate draft mock" button) — separate code path with a
small fixed template array per topic; this skill is for writing a full paper
by hand the way the 3 existing Elite Maths papers (`maths-elite-1/2/3`) were
built.

**Before writing anything**: if the mock needs diagrams (most full mocks
do — see visual ratio requirement below), read the `question-visual-design`
skill in full for the `QuestionVisual` data model, palette, and interactivity
conventions, **then** read `maths-mock-visual-craft` for how to make those
diagrams genuinely impressive rather than just quality-gate-passing —
variety across the paper, gradient/shadow/hover polish, and a duplicate-check
step. If you're picking up a mock partway through, also check
`research/mock-authoring-lessons.md` — it's mainly English-focused but the
"how to verify a mock" pattern at the bottom applies here too.

## Structure of a full-length Elite Maths paper

80 questions, `totalMarks: 80`, `durationMinutes` ~60-70, covering all 6 core
areas (existing question `topic` fields are fine-grained subtopic names, e.g.
`"Angles in a triangle"`, `"Percentage decrease"`, `"Simplifying ratios"` —
not the 6 broad category names themselves):

1. **Arithmetic & number** — place value, negative numbers, order of
   operations (BIDMAS), rounding, powers/roots, HCF/LCM, prime factorisation.
2. **Fractions / decimals / percentages** — add/subtract/multiply/divide
   fractions and mixed numbers, decimal↔fraction↔percentage conversion,
   percentage increase/decrease/reverse-percentage, multi-step money/word
   problems.
3. **Ratio & proportion** — simplifying/sharing/combining ratios, ratio↔
   fraction↔percentage conversion, direct/inverse proportion, map scales.
4. **Algebra** — expanding (incl. double brackets), factorising, solving
   equations (incl. x on both sides), forming equations from word problems,
   inequalities, sequences, substitution, function machines, rearranging
   formulae.
5. **Geometry** — angles (triangle/polygon/point/straight line), area
   (rectangle/triangle/circle/compound shapes), circumference, perimeter,
   volume of a cuboid, coordinates, reflection/translation, 3D shape
   properties.
6. **Averages & statistics** — mean/median/mode/range, mean with a new value,
   bar chart/pictogram reasoning, survey data, simple/combined probability.

`hasBalancedTopicSpread()` in `mock-quality.ts` checks max-share-per-`topic`
≤25% — because `topic` is written at the fine-grained subtopic level (not the
6 broad areas above), this is trivially satisfied as long as you don't write
literally the same subtopic 20+ times; you don't need to hand-balance it, just
don't cluster every question under one subtopic string.

## The visual-diagram requirement (this is the part most likely to get missed)

`evaluateMockQuality()` requires **≥30% of questions in a full Maths mock
carry a `.visual`** (`"Maths full mock visual ratio is at least 30%"` check).
That's ~24+ of 80 questions needing a real `QuestionVisual` object — number
lines, bar/line charts, coordinate grids, fraction bars, ratio blocks, shapes,
sequences, a clock, a Venn diagram, tables. Don't rely on text-only word
problems for the bulk of the paper. See the `question-visual-design` skill
for the full type catalogue and how to build each one; reuse the existing
renderers verbatim (`chooseMathsTemplate` in `mock-generation.ts` shows which
visual type pairs with which topic if you want a reference).

## Difficulty and challenge requirements

- `difficulty: "standard" | "stretch"` on every question — full mocks need
  **≥30% `"stretch"`** unless `difficultyLabel === "Standard"`
  (`hasEnoughStretchQuestions`).
- At least one question needs `"challenge"` somewhere in its `topic`/
  `subtopic`/`tags` combined string (`hasChallengeQuestions`) — Elite papers
  satisfy this via a handful of original, harder reasoning puzzles tagged
  `"competition-style"` in `tags` (see `TODO.md`: these are Summit's own
  original puzzles in the flavour of primary maths challenge papers, **never**
  reproductions of real competition questions — no real PMC/JMC question bank
  exists to draw from, and copying one would be a copyright problem).

## Question id convention

Each full Maths mock claims its **own 2-letter id prefix** so ids never
collide across mocks in the shared bank: `maths-elite-1` uses `mz1`-`mz80`,
`maths-elite-2` uses `mt1`-`mt80`, `maths-elite-3` uses `mu1`-`mu80`. Before
picking a prefix for a new mock, grep the exact pattern to confirm it's free:

```bash
grep -oE '"id": "yourprefix[0-9]+"|id: "yourprefix[0-9]+"' src/data/platform.ts
```

## Question shape

```ts
{
  id: "mz1",
  subject: "Maths",
  topic: "Multiplication", // fine-grained subtopic name
  subtopic: "...", // optional further detail, not always present
  difficulty: "standard", // or "stretch"
  questionType: "multiple_choice", // or "table_graph" for chart/visual-driven questions
  text: "Work out 47 × 68.",
  options: ["3196", "3096", "3296", "3168"], // 4 options, any order — QuestionRenderer shuffles position per-question automatically, don't pre-shuffle yourself
  correctAnswer: "3196",
  markScheme: "47 × 68 = 47 × 70 - 47 × 2 = 3290 - 94 = 3196.",
  explanation: "Standard two-digit multiplication.",
  marks: 1,
  visual: { type: "numberLine", title: "...", data: { ... } }, // omit if not a diagram question
  tags: ["arithmetic", "multiplication"], // add "challenge"/"competition-style" where relevant
  timeEstimateSeconds: 60, // 45-90 typically, higher for multi-step/stretch
}
```

`options` order doesn't matter for correctness — `QuestionRenderer` applies
its own deterministic per-question shuffle at render time (see
`research/mock-authoring-lessons.md` Bug 1), so don't hand-randomise or
worry about the correct answer's list position; write options in whatever
order is natural to read while authoring.

## Wiring up the `MockExam` entry

```ts
{
  id: "maths-elite-N",
  title: "Maths GL-Style Full Paper N — Elite",
  subject: "Maths",
  style: "GL-style",
  difficultyLabel: "Summit Stretch", // or "Standard"
  durationMinutes: 65,
  totalMarks: 80, // must equal the sum of every question's `marks`
  questionIds: [ /* mz1..mz80 etc, order doesn't affect student-facing rendering for Maths (no section-block requirement like English) */ ],
  published: true,
  releaseDate: "YYYY-MM-DD",
  tier: "Elite",
  description: "...", // mention topic coverage, visual density, and explicitly state original/not-copied content
}
```

## Verify before calling it done

Write a throwaway `tsx` script (see pattern in
`research/mock-authoring-lessons.md`) that resolves every `questionIds` entry
against the global `QUESTIONS` bank, checks for duplicate/missing ids and that
every `correctAnswer` is present in that question's `options`, then runs
`evaluateMockQuality(mock, questions, PASSAGES)` and confirms `status ===
"Ready"` with the visual-ratio, challenge, stretch-percentage, and
topic-spread checks all passing. Delete the script after. Then run
`npm.cmd run typecheck` and `npm.cmd run lint`.

## Deploy: seed the database, don't just push the code

Pushing `src/data/platform.ts` alone won't make the new mock visible live —
production reads mocks/questions from Postgres (`platform-store.ts`) whenever
`DATABASE_URL` is set, not the static file directly (that's only the
demo/localStorage fallback). **After committing and pushing, always also run
`npm run db:seed`** (`scripts/seed-catalog.mts`) — an idempotent, id-keyed
upsert of the whole catalog into whatever `DATABASE_URL` your local `.env`
currently points at (historically the same database production uses — see
`status.md`). Do this as a routine last step, not something to ask permission
for each time; it only touches catalog tables, never `User`/`Session`/
`Attempt`, so it's safe to re-run.
