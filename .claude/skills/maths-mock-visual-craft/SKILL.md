---
name: maths-mock-visual-craft
description: Push Maths mock question diagrams (SVGs) from "meets the quality bar" to genuinely impressive — variety, polish, and a repeatable templating approach so every new Maths mock's visuals feel premium, not recycled. Use alongside maths-mock-authoring and question-visual-design whenever authoring or auditing a Maths mock's diagrams specifically.
---

# Maths mock visual craft

**Relationship to the other two skills** — don't duplicate them, read them
first:
- `question-visual-design` is the **technical reference**: the full
  `QuestionVisual` type catalogue, the `VisualRenderer`/`frame()` system,
  palette constants, and the `.qv-hit`/`.qv-mark`/`.qv-tooltip` interactivity
  contract. Read it for *how* to build any given visual type.
- `maths-mock-authoring` is the **structural reference**: paper size,
  question shape, topic coverage, and the automated quality gates
  (`evaluateMockQuality`'s ≥30% visual-ratio check, stretch %, challenge tag).
- **This skill** is the missing layer: `evaluateMockQuality` returning
  `status: "Ready"` only proves a mock *has enough* visuals — it says
  nothing about whether they're any good. This is the checklist for making
  them the thing a parent screenshots and shows another parent.

## The bar is already higher than "just render a shape" — use it

`question-visuals.tsx` already has real visual craft built in — don't
undersell it by writing a flat, undecorated SVG when the existing system
does much better automatically:

- **Gradients everywhere a fill exists**: fraction bars, bar chart columns,
  shape fills, ratio blocks all use `linearGradient` (e.g. `from-gold/60
  to-gold-dark/40`), not flat colour. If you hand-roll a new visual variant,
  match this — a flat-fill shape next to gradient-filled ones looks cheap.
- **Depth via shadow, not just colour**: interactive elements use
  `shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]` for a pressed/glassy look
  and `hover:shadow-[0_10px_18px_-10px_rgba(180,83,9,0.55)]` with
  `hover:-translate-y-0.5` for a lift-on-hover effect (see the fraction bar
  and ratio block segments). Every clickable/hoverable diagram element
  should feel like it has physical weight, not be a static coloured rectangle.
- **Staggered entrance animation**: repeated elements (fraction bar segments,
  ratio blocks) set `style={{ animationDelay: `${index * 0.06}s` }}` combined
  with the `qv-pop` class so they draw in one-by-one left-to-right rather
  than all popping in at once — always gate this behind
  `@media (prefers-reduced-motion: no-preference)` (already handled by the
  shared CSS, don't bypass it).
- **Every visual is a card, via `frame()`**: bordered white card,
  `shadow-[0_16px_44px_-36px_rgba(17,24,39,0.45)]`, gold-dark uppercase title
  bar. Never render a bare SVG outside `frame()`.
- **Hover/focus interactivity is expected, not optional**: wrap any hoverable
  detail in `.qv-hit` with a `.qv-mark`/`.qv-tooltip` pairing (see
  `question-visual-design` for the exact contract) — a diagram a student
  can only look at, not explore, reads as flat next to ones with a live
  value-on-hover or a highlighted working-out line.

If you're about to write a visual that doesn't do at least the gradient +
shadow-depth + (where interactive) hover-lift treatment, stop and match an
existing renderer's pattern instead of inventing a plainer one.

## Variety is the actual "impressive" lever — not more polish per diagram

A technically well-rendered diagram that's the *exact same shape with the
exact same numbers* as three other questions in the same paper reads as
recycled no matter how nice the gradient is. This was flagged in
`question-visual-design` as the biggest existing quality gap
(`chooseMathsTemplate` in `mock-generation.ts` cycles a small fixed pool of
literal questions per topic, so the same visual — same numbers, same shape —
can legitimately repeat verbatim within one 50-80 question generated paper).
When hand-authoring or reviewing a mock:

- **No two questions in the same paper should render an identical diagram.**
  Same visual *type* recurring is fine and expected (a paper needs several
  bar charts); identical *data* inside that type is not — vary the numbers,
  labels, shape, or orientation every single time.
- **Rotate real-world framing, not just numbers.** A run of 5 percentage
  questions all about "a shop discount" is weaker than one about a discount,
  one about exam scores, one about a recipe scaling, one about a sports
  statistic, one about a population change — same maths, different worlds,
  which is also what makes distractors feel less templated.
- **Reach for the less-obvious visual types deliberately.** It's easy to
  default to `numberLine`/`barChart` for everything; a full 80-question Elite
  paper should visibly use most of the 11 Maths-relevant types across the
  paper, not 2-3 of them repeated dozens of times: `bar_chart`, `line_graph`,
  `table`, `number_line`, `coordinate_grid`, `shape`/`geometry`, `fraction`,
  `ratioBlocks`, `venn`, `clock`, `sequence`. A paper that uses 8+ of these at
  least once reads as far richer than one that leans on 3.
- **Vary shape/geometry specifically** — `shape`/`geometry` visuals support
  triangles, quadrilaterals, circles, compound shapes; don't let every
  geometry question render the same rectangle-with-labelled-sides. Rotate
  through the actual shape types the topic list calls for (angles in a
  triangle vs. a polygon vs. a compound shape vs. a circle should look
  visually distinct, not just have different numbers on the same outline).

## A lightweight templating approach (for authoring many mocks fast without recycling)

Until a real parametrized generator exists, use this manual discipline when
producing a new Maths mock's visuals — it's what makes "templating" actually
mean *varied output*, not *copy-paste with new numbers*:

1. **Before writing any questions, list the visual types you'll use per
   topic** — aim for 2-3 *different* visual types per broad topic area (e.g.
   Geometry: `shape` for a triangle-angle question, `coordinate_grid` for a
   reflection/translation question, `table` for a compound-area breakdown)
   rather than one type repeated for every question in that topic.
2. **For each visual type you reuse across a paper, keep a running list of
   what's already been used** (which numbers, which shape, which context) so
   you can check a new instance isn't a near-duplicate before adding it —
   the throwaway verification script (see "Verify" below) can automate this
   check for exact-duplicate `visual.data` payloads.
3. **Push visual ratio well above the 30% floor.** `maths-elite-1` hits 69%
   — treat that as the aspirational bar for a genuinely visual-forward
   paper, not the 30% minimum `evaluateMockQuality` merely requires to pass.
4. **Every visual needs a real, specific `summary`/`aria-label`** (per
   `question-visual-design`) — write it so it reads like a caption a
   confident question-writer would put under the diagram, not a generic
   "chart showing data".

## Verify before calling a mock's visuals done

Extend the standard throwaway `tsx` verification script (see
`research/mock-authoring-lessons.md` / `maths-mock-authoring`) with a
duplicate-visual check:

```ts
import { MOCKS, QUESTIONS } from "../src/data/platform";

const mock = MOCKS.find((m) => m.id === "YOUR-NEW-MOCK-ID")!;
const questions = QUESTIONS.filter((q) => mock.questionIds.includes(q.id));
const visualQuestions = questions.filter((q) => q.visual);

console.log("visual ratio:", (visualQuestions.length / questions.length * 100).toFixed(0) + "%");

const typeCounts: Record<string, number> = {};
for (const q of visualQuestions) typeCounts[q.visual!.type] = (typeCounts[q.visual!.type] ?? 0) + 1;
console.log("distinct visual types used:", Object.keys(typeCounts).length, typeCounts);

const seen = new Map<string, string>();
for (const q of visualQuestions) {
  const key = JSON.stringify(q.visual!.data);
  if (seen.has(key)) console.log("DUPLICATE visual data:", q.id, "matches", seen.get(key));
  seen.set(key, q.id);
}
```

Confirm: visual ratio comfortably above 30%, at least 6-8 distinct visual
types represented across a full 80-question paper, and zero exact-duplicate
`visual.data` payloads. Then run the normal `evaluateMockQuality`/
`typecheck`/`lint` pass, delete the script, and — per `maths-mock-authoring`
— run `npm run db:seed` after pushing so the improved visuals actually go
live, not just into the code.
