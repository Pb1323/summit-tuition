---
name: question-visual-design
description: Design and build new QuestionVisual renderers (NVR, VR, Maths, English diagrams) for Summit Tuition's mock exam platform, consistent with the existing navy/gold/cream design system. Use when adding a new diagram/visual type, writing NVR or VR templated content, or improving quality/variety of existing mock question diagrams.
---

# Question visual design (NVR / VR / Maths / English)

This project renders all question diagrams through one component,
`src/components/platform/question-visuals.tsx` (`VisualRenderer`), driven by
the `QuestionVisual` type in `src/types/platform.ts`. Every subject's diagram
question is data, not a bespoke component — a `Question.visual` object with a
`type` and a `data` payload.

## Before adding anything

1. Read `src/types/platform.ts` (`QuestionVisual`) and `src/components/platform/question-visuals.tsx` in full — check whether the type you need already exists (table, barChart, lineGraph, coordinateGrid, numberLine, shape/geometry, sequence, fraction, ratioBlocks, venn, clock, nvrMatrix, nvrSequence, nvrOddOneOut, nvrPairAnalogy, nvrSimilarity, nvrCodeKey, nvrRotation, nvrNet, nvrCombine3d, nvrHolePunch, vrCode). That's all 6 GL NVR archetypes plus rotation/nets/combine-3D/hole-punch (see `research/gl-vr-nvr-question-bank.md` for the full catalogue and CEM-deferred note). `nvrReflection` was built and then deliberately removed — mechanically redundant with `nvrRotation` — don't re-add it without a fresh reason.
2. Subject coverage as of this writing: **Maths** has a mature set of renderers reused verbatim across templates (see `mock-generation.ts` — `chooseMathsTemplate` picks from a small fixed array per topic, it does not parametrically vary numbers). **English** is text/passage-driven, no diagrams. **NVR** and **VR** were placeholder-only (`future_vr`/`future_nvr` enum values, zero sample content) until this renderer set was built — a live, GL-accurate preview of all of it lives at `src/app/dev/nvr-preview` and `src/app/dev/vr-preview` (unlinked dev-only routes, not wired into the real mock pipeline yet) — check those before building new sample content so you're not duplicating an archetype that already exists there.

## Design system to follow

- Palette lives in `src/app/globals.css` as CSS custom properties (`--color-navy`, `--color-gold`, `--color-gold-dark`, `--color-cream`, `--color-ink`). `question-visuals.tsx` currently re-declares four of these as local hex constants (`INK`, `INK_SOFT`, `GOLD`, `GOLD_DARK`, `GRID`) at the top of the file — reuse those constants, don't introduce new colors, **except** the deliberate `BLUE`/`BLUE_DARK` accent also declared there. Blue is reserved for "this is interactive" (hover/focus rings on clickable answer options, see `OptionButton` in `src/components/dev/gl-booklet.tsx`) or "structural" (dashed dividers/mirror lines, `DiagramDivider`) — gold stays reserved for "emphasised content" (the missing-figure box, a selected answer). Keep that split; don't use blue and gold interchangeably.
- Diagram-level arrows (connecting two figures, not attached to one) use `DiagramArrow` — a real line+triangle-head SVG shape. Don't use a text `→` glyph for this: a text arrow next to an adjacent filled box gets visually clipped by the box's z-order (this was a real bug, fixed once already — don't reintroduce it).
- Every visual is wrapped in the shared `frame(children, summary)` helper: a bordered white card with a gold-dark uppercase title bar. Always call it — don't build a standalone card.
- Every visual must produce a plain-English `summary` string passed to `aria-label` on the frame — screen-reader users get the diagram's content as a sentence, not just "image". Write the summary so a description alone would let a student answer, e.g. `"3 by 3 pattern grid, work out the rule and find the missing figure"`.
- Validate `visual.data` defensively with a type guard (see `isStringArray`, `isNumberArray`, `isNvrFigure*`, `isCodePairArray` for the pattern) and return `<VisualFallback adminPreview={adminPreview} />` on bad/missing data — never assume shape, admins can hand-edit generated JSON.
- SVG viewBoxes in this file are hand-tuned per type (e.g. `0 0 320 190` for shapes, `0 0 360 130` for sequences) — pick round numbers and keep consistent margins (~20-40px) so the frame doesn't crop labels.
- `visual.type` is normalized via `visual.type.replace(/_/g, "").toLowerCase()` before matching — so both `snake_case` and `camelCase` variants of a type name are accepted. Add both to the `QuestionVisual["type"]` union when introducing a new type, matching the existing pairs (e.g. `"nvr_matrix" | "nvrMatrix"`).
- Multiple visuals can render on one page (e.g. admin mock preview grid) — never hardcode an SVG element `id`; use `React.useId()` (see `patternId` in `VisualRenderer`) for anything referenced via `url(#id)`.

## NVR (non-verbal reasoning) content model

NVR figures are described declaratively as `NvrFigure` in `question-visuals.tsx`:
`{ sides, rotation?, reflect?, fill?, size?, borderStyle?, internalElements?, arrows? }`.
`sides: 0` is a circle, `sides: 3/4/5/6/8` a regular polygon; `fill` is
`solid | outline | hatch | crosshatch | dots | stripes | halfSplit`; `borderStyle` is
`solid | dashed | dotted`; `internalElements` places small dot/square/triangle marks at
`center`/`topLeft`/`topRight`/`bottomLeft`/`bottomRight`; `arrows` is an array of
`{ angle, count? }`. A matrix/sequence cell can also be an array of `NvrFigure` (a
compound, overlapping stack) or `null` (the unknown slot). This is intentionally
primitive-based (not hand-drawn SVG paths) so templates can vary shapes
programmatically instead of reusing one fixed diagram, which was the biggest quality
gap found in the Maths templates (`chooseMathsTemplate` reuses the same fixed
shape/numbers every time a topic slot recurs in a 50-question mock).

**Rotation needs an asymmetric marker.** A bare rotated *regular* polygon looks
identical to itself — the rotation is only visible because of a dot or arrow you
add, not the outline. Prefer `arrows` since the angle is a precise number you can
transform exactly: rotation adds a fixed offset (`newAngle = angle + delta`). Use
the exported `unfoldPoints`-style mental model — mirror math, not guesswork — for
any archetype (e.g. hole-punch) that genuinely needs a reflection calculation.

Archetype → visual type:
- `nvrMatrix` — 3×3 grid-completion.
- `nvrSequence` — linear "what comes next/what's missing" row.
- `nvrOddOneOut` — labelled row where one figure breaks the shared rule (don't mark which one in the data — the pupil finds it).
- `nvrPairAnalogy` — "A is to B as C is to ?", one shown transform applied to a second figure.
- `nvrSimilarity` — two reference figures share one abstract property; pick the answer option sharing it too.
- `nvrCodeKey` — figure→2-letter-code worked examples, decode the test figure.
- `nvrRotation` — explicit before/after pair with a curved arrow, then apply the same rotation to a test figure.
- `nvrNet` — cross-layout net (`{top,left,front,right,back,bottom}`, each a distinct `NvrFigure`); pair with `CubeAnswerOptions` (`src/components/dev/gl-booklet.tsx`) for the folded-cube choices. In a cross net the front/top/right squares fold **unrotated** into the cube's front/top/right faces — no fold simulation needed, just assign `{top: net.top, front: net.front, right: net.right}` as the correct option and swap/alter one face for decoys.
- `nvrCombine3d` — two `Block` solids (`{w,h,d}`) shown separately; pair with `CombinedSolidOptions`, which reuses the exported `combine3dLayout(a, b, attach)` helper (`attach: "top" | "topgap" | "right" | "shifted"`) so gap/overlap/shift decoys are physically consistent with the prompt, not just relabelled.
- `nvrHolePunch` — folded square + punch point; pair with `DotPatternOptions`. Compute the correct unfolded pattern with the exported `unfoldPoints(point, folds)` (mirrors across each fold line) rather than hand-guessing coordinates — it can't be wrong if you use it.

When writing NVR templates, vary at least two figure properties per item so the
underlying rule is genuinely inferable and not guessable from position alone.

**Answer options are interactive, not decorative.** `FigureAnswerOptions` /
`CubeAnswerOptions` / `CombinedSolidOptions` / `DotPatternOptions` (all in
`src/components/dev/gl-booklet.tsx`) are real `<button>` elements sharing the
`OptionButton` wrapper: gold ring = selected (per-instance `useState`), blue ring
= hover/keyboard-focus. Reuse `OptionButton` for any new answer-option component
rather than building a new static `<div>` grid.

**CEM-style question formats are explicitly deferred**, not forgotten. The GL
archetype set above (6 NVR + 18 VR) is the complete current scope — do not add
CEM-specific conventions without a fresh research pass; CEM wasn't covered by the
research this skill's content is based on.

## VR (verbal reasoning) content model

Most VR question types (analogies, cloze, letter series, word logic) are pure
text and need no visual at all — don't force a diagram where a well-written
`text`/`options` pair works better. Reach for `vrCode` specifically for
letter-to-symbol / word-to-code substitution questions, where seeing the key as
a row of pill chips plus a highlighted target to decode is genuinely clearer
than a sentence.

## Matching GL's real print layout

`research/gl-layout-spec.md` has real GL Assessment page measurements (A4, margins, fonts, line
spacing) extracted via `pdfplumber` from official papers in `research/gl-papers/` (gitignored locally —
never publish these PDFs, only the extracted numbers, per `PROJECT_CONTEXT.md`). The numbers are wired
into `src/app/globals.css` as `--gl-print-*` custom properties plus a `@media print` block: wrap any
future printable/exportable mock page in a `.gl-print` container with `.gl-print-page` (or
`.gl-print-page-diagram` for diagram-heavy pages, which use GL's smaller top margin) per printed sheet,
and `.gl-print-passage` around English reading-passage text specifically for the serif treatment. This
isn't wired into any route yet — it's the CSS building blocks for whenever mock PDF export is built.

## Quality bar before calling a new visual "done"

- Renders correctly with `adminPreview` true and false (check `VisualFallback`'s copy differs).
- `npm.cmd run typecheck` passes — the `QuestionVisual.data` union is intentionally narrow; extend it rather than casting with `as any`.
- If you add sample content, put it in `src/data/platform.ts` alongside the existing sample questions, matching the `Question` interface fields (`subject`, `topic`, `difficulty`, `marks`, `timeEstimateSeconds`, etc.) — don't invent new Question fields for NVR/VR, reuse the generic `visual` field like every other subject does.
- Consider whether `src/lib/mock-quality.ts` needs a new check (it currently only checks Maths visual ratio and English passage/paragraph structure — nothing NVR/VR-specific exists yet).
