---
name: maths-mock-authoring
description: Write and wire up new Maths mocks for Summit Tuition — full-length GL/Elite-style papers (capped at 50 questions, see below) or shorter diagnostic sets — as hand-authored fixtures in src/data/platform.ts, including the diagram-craft standard for their QuestionVisual SVGs. Use when asked to add a new Maths mock, a new Elite Maths paper, or a batch of new Maths questions.
---

# Maths mock authoring

**Question cap (2026-08-03, founder instruction): new full-length Maths mocks are capped at 50 questions, not 80.** The older 80-question Elite papers (`maths-elite-1` through `maths-elite-9`) are too tiring for students to sit in one go and are left as-is, but every new full-length mock targets **50 questions, `totalMarks: 50`, `durationMinutes` ~40-45**. Apply the visual-ratio/stretch-% thresholds below against 50, not 80 (e.g. ≥30% visual ratio is ~15+ of 50).

Scope: hand-authored Maths mocks in `src/data/platform.ts` (questions + optional `QuestionVisual` diagrams + the `MockExam` entry). Not the deterministic generator (`src/lib/mock-generation.ts`'s `chooseMathsTemplate`, admin "Generate draft mock" button) — separate code path.

**Before writing diagrams**, read the `question-visual-design` skill for the `QuestionVisual` type catalogue, palette, and interactivity contract — this skill assumes it and covers structure + visual craft together.

## Structure — 6 core areas, 50 questions

Existing `topic` fields are fine-grained subtopic names (e.g. `"Angles in a triangle"`, `"Percentage decrease"`), not the category names below:

1. **Arithmetic & number** — place value, negatives, BIDMAS, rounding, powers/roots, HCF/LCM, prime factorisation.
2. **Fractions/decimals/percentages** — arithmetic with fractions/mixed numbers, conversions, increase/decrease/reverse-percentage, multi-step money problems.
3. **Ratio & proportion** — simplify/share/combine ratios, ratio↔fraction↔percentage, direct/inverse proportion, map scales.
4. **Algebra** — expanding (incl. double brackets), factorising, solving equations (incl. x on both sides), forming equations, inequalities, sequences, substitution, function machines, rearranging formulae.
5. **Geometry** — angles, area (incl. compound shapes), circumference, perimeter, cuboid volume, coordinates, reflection/translation, 3D properties.
6. **Averages & statistics** — mean/median/mode/range, mean-with-new-value, chart reasoning, simple/combined probability.

`hasBalancedTopicSpread()` caps any single fine-grained `topic` at ≤25% share — trivially satisfied as long as you don't repeat one subtopic 20+ times.

## Visual-diagram requirement

`evaluateMockQuality()` requires **≥30% of questions carry a `.visual`** (~15+ of 50). Don't rely on text-only word problems for the bulk of the paper.

**Visual craft — not just "has a diagram," make it good:**
- **Gradients** on every fill (fraction bars, chart columns, shapes, ratio blocks — `linearGradient`, e.g. `gold/60→gold-dark/40`), never flat colour.
- **Depth**: `shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]` for glassy elements, `hover:shadow-[0_10px_18px_-10px_rgba(180,83,9,0.55)]` + `hover:-translate-y-0.5` for hover-lift on clickable/hoverable pieces.
- **Staggered entrance**: repeated elements get `style={{ animationDelay: `${index * 0.06}s` }}` + `qv-pop`, gated behind `prefers-reduced-motion` (shared CSS already handles the gate).
- Every visual renders inside `frame()` (bordered card, `shadow-[0_16px_44px_-36px_rgba(17,24,39,0.45)]`, gold-dark title bar) — never a bare SVG.
- Hoverable detail wrapped in `.qv-hit`/`.qv-mark`/`.qv-tooltip` (contract in `question-visual-design`).
- If a new visual doesn't do gradient + shadow-depth + (where interactive) hover-lift, match an existing renderer instead of inventing a plainer one.

**Variety is the real "impressive" lever, not more polish per diagram:**
- No two questions in the same paper render an *identical* diagram (same type recurring is fine, same data is not — vary numbers/labels/shape/orientation every time).
- Rotate real-world framing (not five straight "shop discount" questions — mix in exam scores, recipes, sports stats, population change).
- Use most of the 11 types across a paper, not 2-3 repeated: `bar_chart`, `line_graph`, `table`, `number_line`, `coordinate_grid`, `shape`/`geometry`, `fraction`, `ratioBlocks`, `venn`, `clock`, `sequence`.
- Vary shape/geometry specifically — triangle/quadrilateral/circle/compound should look visually distinct, not the same rectangle with new numbers.
- Push visual ratio well past the 30% floor where the paper supports it — `maths-elite-1` hits 69%; treat that as the aspirational bar.
- Every visual needs a real, specific `summary`/`aria-label` (a caption, not "chart showing data").

## Difficulty and challenge requirements

- `difficulty: "standard" | "stretch"` on every question — full mocks need **≥30% `"stretch"`** unless `difficultyLabel === "Standard"`.
- At least one question needs `"challenge"` in its `topic`/`subtopic`/`tags` — Elite papers satisfy this via original, harder reasoning puzzles tagged `"competition-style"` (Summit's own puzzles in the flavour of primary maths challenge papers — **never** reproduce real PMC/JMC questions, no licensed bank exists and copying one is a copyright problem).

## Question id convention

Each mock claims its own 2-letter id prefix. Before picking one, grep it's free:

```bash
grep -oE '"id": "yourprefix[0-9]+"|id: "yourprefix[0-9]+"' src/data/platform.ts
```

## Question shape

```ts
{
  id: "mz1",
  subject: "Maths",
  topic: "Multiplication", // fine-grained subtopic name
  subtopic: "...", // optional
  difficulty: "standard", // or "stretch"
  questionType: "multiple_choice", // or "table_graph" for chart/visual-driven questions
  text: "Work out 47 × 68.",
  options: ["3196", "3096", "3296", "3168"], // 4 options, any order — QuestionRenderer shuffles per-question, don't pre-shuffle
  correctAnswer: "3196",
  markScheme: "47 × 68 = 47 × 70 - 47 × 2 = 3290 - 94 = 3196.",
  explanation: "Standard two-digit multiplication.",
  marks: 1,
  visual: { type: "numberLine", title: "...", data: { ... } }, // omit if not a diagram question
  tags: ["arithmetic", "multiplication"], // add "challenge"/"competition-style" where relevant
  timeEstimateSeconds: 60, // 45-90, higher for multi-step/stretch
}
```

## Wiring up the `MockExam` entry

```ts
{
  id: "maths-elite-N",
  title: "Maths GL-Style Full Paper N", // plain single tier word if any — no stacked "(Beyond X)"/"(Difficult)" descriptors
  subject: "Maths",
  style: "GL-style",
  difficultyLabel: "Summit Stretch", // or "Standard"
  durationMinutes: 45,
  totalMarks: 50, // must equal the sum of every question's `marks`
  questionIds: [ /* order doesn't affect rendering for Maths — no section-block requirement like English */ ],
  published: true,
  releaseDate: "YYYY-MM-DD",
  tier: "Elite",
  description: "...", // topic coverage, visual density, explicitly state original/not-copied
}
```

## Never bake the solved answer into a `.visual` (2026-08-06 bug, fixed live)

A real shipped bug: a `table`/`venn` visual's `data` was authored from the **solved** values instead of the **given** ones (a Venn diagram literally showing `overlap: 12`, the correct answer itself; an algebra table showing the fully-solved angle values next to the unsolved expressions) — usually from copy-pasting out of the `markScheme`'s working.

**Rule**: a `.visual` may only show what the question stem *gives*, never a value reachable only by solving. If a value is the target (or an intermediate only reachable by solving), omit that row/segment or mark it `"?"` — never the resolved number. For algebra-with-unknowns questions, show only the given relationships/labels (`"x"`, `"2x"`) or given constants. Raw datasets the question asks you to summarise (a list to find the mean of) are fine in full — that's given input, not the answer. Test: would rendering this value require doing the maths being tested? If yes, it's a leak. Grep your own new questions' `type: "table"`/`type: "venn"` visuals against this before finishing — `evaluateMockQuality()` does not catch it.

## Verify and deploy

```bash
npx tsx scripts/verify-mock.mts your-new-mock-id   # bank-wide dup ids, answers resolve, marks sum, visual duplicates, evaluateMockQuality
npm.cmd run typecheck && npm.cmd run lint
npm run db:seed   # idempotent catalog upsert — pushing platform.ts alone does NOT make it live; production reads Postgres, not the static file. Catalog tables only, safe to re-run, do this as a routine last step.
```
