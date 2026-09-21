# QUEST / Future Stories (FSCE) — structured question bank

**Internal reference only. Do not send this file, or its contents, to Chris Pearse or any other external party.** It documents research findings and source citations for the build session, not sample content itself.

See `quest-board-profile.md` and `future-stories-board-profile.md` for full narrative detail and full source lists; this file is the condensed, build-facing summary. See `quest-future-stories-pairing-decision.md` for which board supplies which subject.

## Build target 1: Maths sample ← Future Stories / FSCE (Reading School's Adventure + Beacon papers)

### Format
- Two source papers combine to form the Maths content: **Adventure** (MCQ, mixed with English, 50 Q / 50 min total for the whole paper) and **Beacon** (short written answers, working shown, 45 min total for the whole paper).
- No VR/NVR — never include either in this mock.
- Calculator policy: not confirmed by any source; default to **non-calculator** (standard UK 11+ convention) and flag this assumption in the mock's description field, per this project's existing convention of noting unconfirmed assumptions.
- Mark scheme style: MCQ scanned/machine-marked (Adventure); written answers marked by trained markers against a published scheme, working shown (Beacon). For Summit's platform this maps to `questionType: "multiple_choice"` for Adventure-style items and either `"multiple_choice"` (if reduced to MCQ for auto-marking, matching how Summit already handles most Maths content) or hand-marked `"written_response"` (if preserving Beacon's genuine free-response/working-shown character) — build session's call; note that Summit's existing Maths mocks are overwhelmingly auto-marked MCQ/fill, so a hand-marked Beacon-style section would be a first for a "sample" mock and adds marking overhead Chris would need told about.

### Topic list (source: multiple independent FSCE guides, consistent with each other)
- Number & place value: rounding, negative numbers, Roman numerals
- Four operations: addition, subtraction, multiplication, division
- Factors, and prime/square/cube numbers
- Fractions, decimals and percentages
- Ratio and proportion
- Geometry (shape properties, angles — specific sub-topics not found)
- Statistics (chart/graph/table reading — specific sub-topics not found)
- Problem-solving / applying knowledge (explicitly the FSCE design emphasis — "assesses how well children can apply their knowledge, rather than simply recall facts")
- Curriculum ceiling: most sources say **up to end of Year 5** content only (one conflicting source says "full Year 6 curriculum" — see STATUS gap); build to the Year-5 ceiling to be safe.

### Diagram/visual needs
Standard KS2 Maths visual set Summit already builds (see `.claude/skills/maths-mock-authoring` and `maths-mock-visual-craft`): geometry shape diagrams, bar charts, tables, fraction bars, number lines. No genuinely new visual renderer is required for this sample. Recreate any figure as original SVG per the project's no-third-party-content rule — nothing here should be modeled closely enough on a specific FSCE-published diagram to risk resembling copied exam content; these are generic KS2 diagram types available from any curriculum-aligned source.

### Sources
See `future-stories-board-profile.md` §4 and its full source list. Key ones for Maths specifically: [Exam Papers Plus FSCE overview](https://exampapersplus.co.uk/advice/11-plus-year-6/future-stories-community-enterprise-fsce-what-you-need-to-know/), [Atom Learning FSCE guide](https://www.atomlearning.com/blog/fsce-11-plus), [Cognito FSCE guide](https://cognito.org/blog/fsce-11-plus-guide), [Prep4All FSCE guide](https://prep4all.co.uk/fsce-11-plus-exam-guide), [PiAcademy FSCE guide](https://piacademy.co.uk/blog/fsce-11-plus-exam-advice/).

## Build target 2: English sample ← QUEST (Part 2, Creative Comprehension module)

### Format
- Non-adaptive — every candidate sees the same fixed set of questions, which is exactly why this module (not Part 1) is safe to build as a static mock (see pairing-decision file).
- Structure: **one theme**, **6-7 linked source materials** presented together (examples cited: a map, a graph, a data table, a news-style article, an image), then a set of questions requiring candidates to cross-reference across sources to answer — not single-passage retrieval.
- Runs roughly 40 minutes in the real exam (shared with Puzzles & Problem-Solving — the Creative Comprehension portion alone would be shorter; exact split not found). For a standalone "sample," keep to a realistic subset (e.g. 4-5 sources, 10-15 questions) rather than assuming the full real-exam length, and say so explicitly as a "sample/taster," matching Summit's existing convention for `-style` mocks that are illustrative rather than full-length replicas.
- Question format: not confirmed as MCQ vs written vs mixed by any source — build session should default to Summit's standard auto-marked MCQ format (matching the rest of the platform) unless a stronger signal is found, and flag this as an assumption in the mock description.

### Skills tested (source: Atom Learning + independent tutoring guides, consistent)
- Cross-referencing multiple sources sharing one theme
- Extracting and comparing data from different formats (textual, tabular, graphical, pictorial)
- Critical thinking / synthesis under time pressure
- (Framed by QUEST's own marketing as testing curiosity, adaptability, perseverance — soft-skill framing, not a specific curriculum topic list, since this isn't a curriculum-recall task by design)

### Diagram/visual needs — genuinely new work required
Unlike the Maths sample, this needs at least one new `QuestionVisual`/renderer type not currently in `question-visuals.tsx` or `showcase-visuals.tsx`:
- An original stylised "map" visual (simple route/landmark map — invented place names, not a real geographic location) — **new type**.
- A themed data table and a bar/line graph — Summit already has `table`/`barChart`/`lineGraph` visual types (see `src/components/platform/question-visuals.tsx`), reusable here, just needs new invented data tied to the chosen theme.
- A styled "article/source" text block distinct from the existing `EnglishPassageRenderer` passage styling — since Creative Comprehension sources are meant to look like discrete artefacts (a news clipping, a leaflet) laid out alongside the map/graph/table, not one continuous passage — likely a new lightweight component, not a new SVG renderer.
- All original vector art per the project's no-third-party-content rule; use `.claude/skills/question-visual-design` for palette/style conventions (navy/gold/cream, existing hover/animation patterns) so it matches the rest of the platform's diagram set rather than looking bolted-on.

### Sources
See `quest-board-profile.md` §3 and its full source list. Key ones for Part 2/Creative Comprehension specifically: [Atom Learning "Cracking Quest Part 2"](https://www.atomlearning.com/blog/quest-admissions-part-2-exam-guide), [Atom Learning "Familiarisation Tests for Quest Admissions Part 2"](https://resources.atomlearning.co.uk/en/knowledge/familiarisation-tests-for-quest-admissions-part-2), [Leading Tuition Part 2 guide](https://www.leadingtuition.co.uk/blog/quest-assessment-part-2-guide/), [Exam Papers Plus Quest guide](https://exampapersplus.co.uk/advice/news-and-insight/a-guide-to-quest-entrance-assessments/), [Pretest Plus Quest parent guide](https://pretestplus.co.uk/11-quest-admissions-the-pretest-plus-parent-guide/).

## What NOT to build this round (explicitly out of scope)

- CEM content of any kind — out of scope per the task brief.
- A QUEST Part 1 Maths mock (adaptive-format problem — see pairing decision).
- An FSCE Discovery creative-writing mock (platform can't auto-mark free-text essays).
- Any FSCE Compass (foundation-subjects: Science/History/Geography/Computing/D&T) content — no diagram/renderer support exists for this yet and it wasn't the chosen subject pairing.
- Any QUEST Part 1 NVR/VR content — not part of either chosen sample.
