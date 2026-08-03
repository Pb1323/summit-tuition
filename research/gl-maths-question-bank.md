# GL Assessment Maths question-type catalogue & weighting

Source: 2 official GL Assessment Maths familiarisation booklets read directly (`research/gl-papers/maths-qp1.pdf`,
`maths-qp2.pdf`, "Mathematics 1" and "Mathematics 2", Code 6853 915/917, © GL Assessment 2021 — 100 real,
numbered MCQ questions with answer options, not a third-party summary). Companion to
[[gl-english-question-bank]] and [[gl-vr-nvr-question-bank]] (same booklet family, same publisher).

## Why this doc exists

A grep of `src/data/platform.ts` (2,320 questions) found only **2** questions using GL's extremely common
"which statement is NOT true" verification format, and only **1** using a pictogram/discount-table format —
both archetypes appear repeatedly in just these 2 short 50-question familiarisation booklets. This means our
Maths bank has been calibrated on **topic coverage** (number, fractions, geometry, ...) but not on **question
archetype** — the actual shape/format/wording real GL questions take. This doc catalogues those archetypes so
new mocks can be built to match, not just topic-tagged to match.

## Format basics (both booklets)

- 50 questions, pure MCQ, options A–E, one correct answer, no partial credit format.
- No fixed sub-section structure like English (no "Section 1: Number, Section 2: Geometry" labels) — topics
  are fully interleaved question-to-question. Real papers move fluidly between number, measurement, geometry,
  data, and algebra-flavoured reasoning without ever grouping by topic.
- Roughly 1 in 3 questions carries a visual (bar chart, pictogram, coordinate grid, angle diagram, timetable,
  Venn diagram, line graph, shape/net, number line) — consistent with Summit's own ~30-50% visual-ratio
  quality gate, so *ratio* isn't the gap; *which archetypes get a visual and why* is (see below).
- Difficulty escalates gently within each paper but isn't strictly monotonic — a very easy Q39 ("What is 60%
  of 50?") can sit right after a genuinely multi-step Q38 (bedtime-duration crossing midnight-style rollover).

## The 24 real question archetypes (not topics — formats)

Grouped by what makes each one distinct as a *format*, with the real question that demonstrates it:

1. **Symbol/pictogram-stands-for-N** — "⛵ stands for 12 ships... how many more ships in dock A than C?"
   (fractional pictogram icons force a division step, not just counting).
2. **Place value in figures/words, both directions** — "What is this number in figures: five thousand, one
   hundred and nine?" / "What does the 3 stand for in 7240?"
3. **Coordinate reading off a themed map** — treasure-map grid with a lighthouse/hills/treasure, not a bare
   axis; "the hills are at (3,4), the lighthouse is at (?,?)".
4. **Sequence with a blank BOX mid-sequence** (not "next term") — `393 384 375 ☐ 357`, and crucially the
   differences are **not constant** (-9, -9, then solve for the gap, next is -18) — tests whether a student
   blindly assumes constant common difference.
5. **Shape-tiling / "how many of X fill Y"** — small triangle tiling a hexagon, unit square tiling a
   rectangle. Always a simple shape repeated to fill a bigger one, answer via area ratio not counting.
6. **Symbol-for-unknown box algebra** — `123 ÷ ☐ = 123`, `a − 9 = 10`, `105 ÷ ▽ = 21`, `3 lots of X = 36, what
   is 2 lots of X?` — pre-algebra dressed as "fill in the shape," never uses the word "algebra."
7. **Real container/measurement-with-a-diagram unit conversion** — a drawn jug (1 litre) and jar (700ml),
   "the jar is filled from the jug, how much is left in the jug" — the diagram carries information the text
   doesn't restate.
8. **Bar/line chart → derived arithmetic** (not direct lookup) — "how many hours did Kai spend **out of
   doors**" requires summing 3 of 5 chart categories, a filtering step before the arithmetic.
9. **Struck-through discount/offer price table** — a real-looking membership pricing table with original
   prices crossed out and offer prices shown, then a multi-person combined-cost word problem ("Mrs Ward wants
   to join with her 3 children aged 10, 12, 15 — how much must she pay?", picks the right *row*, not a
   generic percentage calc). **Zero equivalents found in Summit's bank.**
10. **Timetable reading with blank/dotted cells** — real train-timetable formatting (some stations show `. . . .`
    for "does not stop here"), asks for journey duration between two specific rows.
11. **24-hour / analogue-digital clock format literacy** — "which digital clock shows quarter past seven in the
    evening" with 5 plausible-format decoys (7:15 vs 19:15 vs 19:25 vs 21:15) — tests clock-format literacy,
    not time arithmetic.
12. **"Think of a number" reverse function-machine chains** — "Matthew thinks of a number, multiplies by 2,
    subtracts 4, answer is 10 — what was the number?" Later escalated to "which instruction does NOT give an
    answer of 17" across 5 different 2-3-step chains applied to the same starting number — same operations,
    testing execution accuracy under repetition, not new concepts.
13. **Percentage-of-quantity, several phrasings** — "What percentage of £5 is 50p?" (percentage-as-the-unknown,
    not "find 20% of X" — the *direction* of the percentage question varies across a paper).
14. **Line graph → inferred/derived reading** — baby weight-gain graph, "at the end of which week did she gain
    **most** weight" requires computing week-on-week differences from a line graph, not reading one point.
15. **"Which of these is NOT a [shape]"** — 5 drawn shapes, spot the non-example (quadrilateral, cuboid,
    translation). **Only 2 of this exact pattern found in Summit's 2,320-question bank.**
16. **Given-formula, apply-it directly** — the question states the rule *inline* ("subtract 2 from the number
    of sides and multiply by 180") then asks the student to apply it once — tests careful arithmetic
    execution of a stated procedure, not recalled geometry facts.
17. **"Which statement is NOT true" against a data source** — a bar chart plus 5 claims, each claim testing a
    *different* skill (ratio, sum-of-all, doubling, difference) — the student must verify all 5, not just
    compute one thing. **Only 2 of this exact pattern found in Summit's bank** (same as #15's count, often
    the same broader "spot the false statement" family).
18. **Verify-a-stated-conversion-rule across 5 worked examples** — "Henry says km→miles is ÷8×5. Which of
    these is NOT correct?" then 5 fully-worked (km, miles) pairs to check — combines "apply a rule" with
    "spot the deliberately wrong one," a distinct format from #16.
19. **Sequential fraction-of-remainder** — "Ali eats 1/3 of a pizza. His sister eats 1/4 of what's **left**.
    What fraction is left after both?" — the second fraction operates on the *remainder*, not the original
    whole; a very common trap format entirely distinct from a single "what is 1/3 of 36" question.
20. **Inverse/working-backward rate problems** — roasting-meat instructions give a rate (30 min per 450g) and
    a *total time*; the student must work backward to find the weight, i.e. run the rate calculation in
    reverse rather than forward.
21. **Ratio-recipe "parts" problems** — "2 parts red, 17 parts yellow, 1 part blue paint... how much red is
    needed for 40 litres total?" — real cooking/mixing-ratio framing, total-parts division.
22. **Venn diagram set-membership, "which number COULD go here"** — two overlapping "multiples of 4" /
    "multiples of 3" loops with some cells pre-filled, asks which candidate number satisfies the shaded
    (intersection or difference) region — genuine logical-AND/set reasoning, not just multiples recall.
23. **Multi-clue number-riddle chains** ("logic puzzle" dressed as arithmetic) — "Callum thinks of a two-digit
    number. Its digits add to 5. It is prime. Its square is a three-digit number. What is it?" — 3-4
    simultaneous constraints narrowing to one answer, distinct from a single-step "solve for x."
24. **Compounding-halving/geometric-pattern word problems** — frog jumping toward a pond edge, each jump
    halving the remaining distance, "how far after 3 jumps" — repeated proportional reduction, illustrated
    with a simple dashed-arc diagram.

## What's conspicuously ABSENT from Summit's bank (verified by grep, not guesswork)

- Struck-through "offer price" discount tables (#9) — 0 real equivalents found.
- "Which statement is NOT true against a data source" (#17) and "which of these is NOT a [shape]" (#15) —
  combined, only 2 in 2,320 questions, despite this being one of the single most common GL archetypes (found
  4 separate times across just these 2 booklets: Q20 quadrilateral, Q24 cuboid, Q26 translation, Q42/Q35
  statement-verification).
- "Verify a stated rule across worked examples" (#18) — a distinct trap format from both "solve using the
  rule" and generic "spot the error," not confirmed present.
- Multi-clue number-riddles (#23) — Summit has "which of these is a prime/square number" single-fact
  questions, but the *chained*-clue riddle format (3-4 simultaneous constraints) needs checking per-mock, not
  confirmed systematically present.
- Sequential fraction-of-remainder (#19) is a specific trap shape worth auditing for — distinct from a single
  "find the fraction of an amount" question, which Summit has plenty of.

## Reusable prompt template

```
Generate {N} original GL-style Maths questions from research/gl-maths-question-bank.md,
matching one of the 24 real archetypes listed there — not just a topic tag.
- Interleave archetypes/topics question-to-question; do not block them by topic.
- Prioritise the archetypes flagged as under-represented in our bank: struck-through discount-table
  word problems (#9), "which statement is NOT true against a chart" (#17), "which of these is NOT a
  [shape]" (#15), verify-a-stated-rule-across-examples (#18), sequential fraction-of-remainder (#19),
  and multi-clue number riddles (#23).
- Keep MCQ A-E, 5 options, one correct answer, GL's real distractor discipline: wrong options should
  represent a specific real mistake (e.g. using the wrong operation, forgetting a filtering step,
  off-by-one on a rate reversal), not random noise.
- Output as Question objects per src/types/platform.ts (subject: "Maths"), with correctAnswer,
  markScheme, and explanation for each.
```
