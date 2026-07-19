# GL Assessment VR/NVR question-type catalogue

Source: 4 GL VR familiarisation booklets + 4 GL NVR familiarisation booklets (passelevenplus.co.uk). Used to design NVR/VR mock generation matching real GL paper structure. See [[question-visual-design]] skill for the renderer this feeds.

## Paper structure (both subjects)

- Each standalone booklet: **~80 questions**, split into **4 sections of ~20 Q**, one archetype per section.
- Every section: instructions → 1 worked example + solution → scored questions. No skipping straight to questions.
- Answer format: multiple choice A-E throughout (two-part MC for "pick one from each group" types).
- Mixed NVR+Maths paper: NVR ~62%, Maths ~38% of questions (2 NVR sections of 20, then 25 Maths).
- Item banks are reused near-verbatim across GL's own booklets (VR1≈VR3≈Skills share exact antonym/insertion/bridge questions) — a small template pool per archetype, varied by content, mirrors GL's own practice.

## VR archetypes (18, ~5-8 Q each per paper)

| # | Archetype | Format | ~Q/paper |
|---|---|---|---|
| 1 | Letter-move (moves between two words) | 2 words → MC letter A-E | 5-7 |
| 2 | Insert-letter bridge (`word[?]word` ×2) | MC letter A-E | 5-8 |
| 3 | Bracket word-building analogy | MC word | 5 |
| 4 | Odd one out (2 of 5 don't belong) | Mark 2 letters | 7-8 |
| 5 | Closest in meaning (synonym pick, 2 groups) | 1 from each group | 5 |
| 6 | Most opposite in meaning (antonym pick) | 1 from each group | 8 |
| 7 | Hidden word spanning two words in a sentence | MC word-pair A-E | 8 |
| 8 | Missing 3-letter chunk in a CAPS word | MC A-E | 8 |
| 9 | Word analogy (incl. alphabet-letter variant) | 1 from each group | 7 |
| 10 | Number series | Write-in number | 6-8 |
| 11 | Alphabet letter-pair series (A-Z strip given) | Write-in letter(s) | 6-7 |
| 12 | Logical deduction from a short passage | MC / direct answer | 1-2 |
| 13 | Letters-for-numbers algebra (A=1, B=2...) | MC letter | 7 |
| 14 | Balanced equation, missing number | Write-in number | 7 |
| 15 | Word↔number code (3 given, 1 missing) | Write-in | 6 |
| 16 | Word↔word shift cipher | Write-in word | 6 |
| 17 | Compound word builder (2 groups → concatenate) | 1 from each group | 8 |
| 18 | Word-pair truncation pattern (3rd pair missing) | MC word | 7 |

## NVR archetypes (6, ~20 Q per section, always present)

| # | Archetype | Format | Notes |
|---|---|---|---|
| 1 | Sequence/series completion | 4-5 cells, 1 blank, pick continuation | every booklet |
| 2 | Pair analogy ("A:B :: C:?") | transform (rotate/reflect/shade/substitute) applied once, repeat | every booklet |
| 3 | 3×3 / 2×2 matrix completion | rule by row/column/diagonal | close cousin of #1 |
| 4 | "Most like" similarity pairing | share one abstract property | every booklet |
| 5 | Odd one out | 4 of 5 share a property | |
| 6 | Code-figure pairing | 2-part letter code (attribute→letter), match test shape | every booklet, always final section |

**Figure properties actually varying** (our current renderer models `{sides, rotation, fill, size}` — confirmed insufficient):
- internal elements (dots/small shapes inside/attached, count + position matters)
- multiple/overlapping/nested shapes per cell (compound figures, not single primitives)
- fill *type*: solid, hatch, cross-hatch, dot-fill, stripes, half-shaded (not just solid/outline/striped)
- border style: solid/dashed/dotted as its own attribute
- arrows as a distinct object: direction (8-way), count, arrowhead shape/fill
- reflection as distinct from rotation
- position within cell as the varying attribute
- connecting-line/node diagrams (linked shapes that transform as a group)
- element count as a first-class rule variable (not just size)

Recommended schema extension: `{shape, sides, rotation, reflection, size, fill_type, fill_color, border_style, internal_elements[], element_count, position, arrows[]}` + support a cell being an *array* of sub-figures, not one primitive.

## Reusable prompt template

Paste this back (fill the blanks) to generate a batch of questions matching a specific GL archetype:

```
Generate {N} original {VR|NVR} questions for archetype #{n} "{archetype name}"
from research/gl-vr-nvr-question-bank.md, difficulty {foundation|standard|stretch}.
- Match GL's format exactly: {answer format from table}.
- Vary at least 2 of the underlying properties per question so the rule is
  inferable, not guessable from position.
- Output as Question objects per src/types/platform.ts (subject: "VR"|"NVR"),
  with visual using {nvrMatrix|nvrSequence|nvrOddOneOut|vrCode|none} per
  question-visual-design skill, or plain text if no diagram is warranted.
- Include correctAnswer, markScheme, explanation, and a plain-English
  aria-label-style summary for any diagram.
```

For a full paper: chain 4 of these (one per archetype in a section) to build one 20-question section, repeat per section to assemble an 80-question mock matching GL's real section structure.

## Extended NVR archetypes (Bond/CEM-style, added beyond the original GL catalogue)

Bond 11+ free test papers were checked directly but only cover archetypes already in the GL list above (series, belongs-to-group, analogies, hidden-shape, codes) — no rotation/reflection/nets/combine-3D/hole-punch content was found there. The 5 archetypes below are built from standard 11+ NVR convention (not scraped from a specific source PDF) and are now implemented as real renderers in `question-visuals.tsx`:

| Archetype | Visual type | Key design point |
|---|---|---|
| Rotation | `nvrRotation` | Needs an asymmetric marker (`arrows` or `internalElements`) — a bare rotated regular polygon looks identical to itself, so the renderer relies on the question author adding a dot/arrow, not the shape outline, to carry the rotation. |
| Nets and cubes | `nvrNet` | Cross-layout net (top/left/front/right/back/bottom), each face a distinct figure. In a cross net the front/top/right squares fold **unrotated** into the cube's front/top/right faces — decoys swap or subtly alter one face rather than needing real fold simulation. |
| Combining 3D shapes | `nvrCombine3d` | Prompt shows two solids separately; answer options reuse the same `combine3dLayout` attach-mode math (`top`/`topgap`/`right`/`shifted`) so gap/overlap/shift decoys are physically consistent, not just relabelled. |
| Hole punch | `nvrHolePunch` | Correct answer is computed by `unfoldPoints()` — mirroring the punch point across each fold line — not hand-authored, so it can't be wrong. |

**Reflection was cut after the first visual QA pass.** `nvrReflection` was built (mirror-angle math, dashed mirror line) but removed from the preview once seen live — mechanically it's nearly identical to `nvrRotation` (same before/after/test layout, same "apply the transform to the test figure" pattern) and didn't earn its place as a distinct archetype on this platform. The renderer branch was deleted rather than left dormant.

**Deferred (explicitly not built yet): CEM-style question formats.** The user flagged CEM (as distinct from GL) as a source of extra difficulty worth adding *later*, once the GL-style archetype set above is solid. Do not build CEM-specific formats (e.g. CEM's different NVR conventions/timing) without a fresh research pass — CEM papers weren't part of this research session.

## Design additions from the first visual QA pass

- **Blue as a second accent**, alongside navy/gold: gold stays reserved for "emphasised content" (the missing-figure box, a chosen answer), blue signals "this is interactive" (hover/focus rings on answer options) or "structural" (dashed dividers/mirror lines). Implemented as `BLUE`/`BLUE_DARK` constants in `question-visuals.tsx` — kept semantically separate from gold rather than competing with it.
- **Diagram-level arrows** (`DiagramArrow`) use a real line+triangle-head SVG shape, not a text glyph — a text `→` character was being clipped by an adjacent box's z-order (fill drawn on top of the glyph). Any future diagram-level arrow should reuse `DiagramArrow`, not a text character.
- Answer options across `FigureAnswerOptions`/`CubeAnswerOptions`/`CombinedSolidOptions`/`DotPatternOptions` are now real `<button>` elements with per-instance `useState` selection — gold ring = selected, blue ring = hover/focus. This is genuinely interactive (clickable, keyboard-focusable), not decorative.
