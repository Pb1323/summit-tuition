---
name: notes-authoring
description: Write and wire up new Study Notes content (topics/subtopics) for Summit Tuition's interactive notes system, for any subject — Maths, English, Verbal Reasoning, Non-Verbal Reasoning. Use when adding a new notes topic, a new strand, a new subject to /notes, or a new bespoke interactive diagram for a notes subtopic.
---

# Study Notes authoring (Maths / English / VR / NVR)

Scope check: this skill is for the **Study Notes** system
(`src/components/notes/**`, `src/app/notes/**`) — bespoke, letterhead-styled
lesson pages, separate from the mock-exam question system. The mock-room
question diagrams (`QuestionVisual`, `question-visuals.tsx`) are a different,
data-driven system covered by the `question-visual-design` skill — don't reuse
`VisualRenderer`/`frame()` patterns here, and don't reuse `notes-theme.ts`
there.

## Mental model

One generic renderer, `NotesTopicPage` (`src/components/notes/notes-shell.tsx`),
draws every topic page: sticky navy header with search/focus-mode/export,
a sidebar of subtopics with per-subtopic mastery rings, and a scrolling body
of `<section>`s — one per subtopic — each built from the same fixed block
sequence (`src/components/notes/notes-blocks.tsx`): tier badge → objective →
"why this matters" → collapsible concept card → glossary chip strip →
navy-framed interactive `Diagram` → worked example (fast method + numbered
steps + answer) → reveal-to-check self-check → practice questions → common
mistakes box → exam tip box.

A **topic** is one `TopicContent` object (`src/components/notes/types.ts`)
containing an array of ~8-10 `Subtopic` objects, tiered `Foundation` →
`Standard` → `Extension`. Content is pure data; `NotesTopicPage` never
changes per subject — the interactive `Diagram: ComponentType` per subtopic
is the only bespoke React per subtopic, everything else is strings.

## Site hierarchy and routing

- `/notes` — subject picker (`src/app/notes/page.tsx`, `SUBJECTS` array with
  `available: true/false`). A subject with `available: false` renders as a
  greyed "Coming soon" card and is not linked.
- Below a subject, one of two shapes exists today:
  - **No strand layer** (Maths): `/notes/maths/[topic-slug]` goes straight to
    a topic page. `src/app/notes/maths/page.tsx` lists topics directly.
  - **Strand layer** (English, and now VR): `/notes/english/[strand]` is a
    strand picker (`src/app/notes/english/page.tsx`, `STRANDS` array, same
    `available` convention), `/notes/english/[strand]/page.tsx` lists that
    strand's topics (a "hub" page), `/notes/english/[strand]/[topic-slug]/page.tsx`
    is the actual `NotesTopicPage`. Reach for the strand layer whenever a
    subject naturally splits into distinct skill families the way English
    splits into Comprehension/Grammar/Spelling/Cloze — this is exactly the
    shape used for Verbal Reasoning (see below), since VR's ~18 GL archetypes
    group far more naturally into strands than into one flat topic list like
    Maths.
- A strand/topic hub page (see `src/app/notes/english/comprehension/page.tsx`
  or `.../grammar/page.tsx` for the canonical pattern) is a client component:
  `RequireAuth role="student"` → `RequireNoteAccess noteId="..."` → a
  `Container` with a back-link, `PremiumBadge`, `<h1>`, description, then a
  card grid over a local `TOPICS: TopicContent[]` array, each card linking to
  `/notes/<subject>/<strand>/<topic.slug>`.
- A leaf topic page (see `src/app/notes/english/comprehension/inference/page.tsx`)
  is just `RequireAuth` → `RequireNoteAccess noteId="..."` →
  `<NotesTopicPage topic={theTopicObject} />`.

## Wiring a brand-new topic — checklist

1. Add/extend content in `src/components/notes/notes-content/<topic-slug>.ts`
   — export one `const xTopic: TopicContent = {...}`. `slug` must match the
   route folder; `subjectSlug` is the top-level subject route segment (e.g.
   `"english"`, `"verbal-reasoning"`) used for the shell's breadcrumb link,
   *not* the strand.
2. Add any new bespoke `Diagram` components to
   `src/components/notes/notes-diagrams/<topic-slug>-demos.tsx`. Convention:
   one small reusable interactive primitive component (e.g.
   `ClickEvidencePassage`, `ClickErrorSentence`) parameterised by
   instruction/data/correct-answer/correction/hint, then one thin named
   export per subtopic that just calls it with that subtopic's content — see
   `literal-comprehension-demos.tsx` for ten subtopics built from one
   `ClickEvidencePassage` primitive. Reach for a genuinely new primitive only
   when the interaction shape actually differs (e.g. Maths topics use
   hand-built SVG diagrams like `balance-scale-equation.tsx`, because there's
   no text passage to click).
3. Pick a `Subtopic.kind` matching the practice-question interaction:
   omitted/`"fill"` (free-text self-marking, `PracticeQuestion[]`, good
   default for anything with a single typed/short answer — numbers, single
   words, codes), `"click-error"` (click the wrong word in a sentence),
   `"click-evidence"` (click the sentence/option that answers a question —
   also reusable for "click the correct one of N options" generally),
   `"cloze-fill"` (click a word from an option bank to fill one gap). Don't
   invent a fifth `kind` without also adding its renderer to
   `notes-blocks.tsx` and its question-shape type to `types.ts`.
4. If this is a new topic in an *existing* strand/topic hub, just add the
   import + array entry to that hub's `TOPICS` array and create the leaf
   `page.tsx`. If it's the first topic in a **new strand or subject**, also:
   - Add the strand/subject to the parent picker's array with
     `available: true` (flip from `false`).
   - Create the hub `page.tsx` (topics list) and the strand-picker `page.tsx`
     if new subject.
   - Add a `NotePage` gating entry to `NOTE_PAGES` in `src/data/platform.ts`
     — gating is per-strand for strand-layer subjects (one `NotePage.id` like
     `"english-grammar"` unlocks every topic under that strand) and per-topic
     for flat subjects (one id per Maths topic). Use `isFree: true` for
     exactly one topic (the sampler) the way `english-comprehension` and
     `maths-numbers` are free; everything else `isFree: false` and unlocked
     by admin/plan.
5. `TopicContent["subject"]` is a closed union in `types.ts` — extend it
   (not `as any`) the first time a new subject is added; it should track
   `src/types/platform.ts`'s `Subject` type (`"English" | "Maths" | "VR" | "NVR"`).

## Content-writing bar (matches Maths/English quality)

Every subtopic needs, in full, not stubbed: a one-sentence `objective`, a
`whyMatters` sentence explaining the exam-marks payoff (not just "it's
useful"), 3-5 `conceptBullets` with the key term in
`<b style="color:#C9A24B">...</b>` on first mention, a `conceptNote` with a
`<b>label:</b>` lead-in, 3-5 `glossary` terms, a full `worked` example with a
*different* fast method vs step-by-step method (not the same text twice), a
`selfCheck` with a genuinely gradeable true/false or short-answer prompt, 3
`questions` (not fewer) each with a `hint` that doesn't give the answer away
and a `correction`/`accept` that would make sense read after getting it
right, 2 `mistakes`, one `examTip`, and 4-6 `searchTerms` (lowercase, no
duplication of the title verbatim) for the in-page search box. Tier the run
of subtopics Foundation → Standard → Extension, roughly 2-3 / 4 / 3-4.

## Progress and gating are already generic — don't touch

`notes-progress.ts` (localStorage, keyed by `topic.slug`) and
`RequireNoteAccess` (`src/components/platform/ui.tsx`, checks
`note.isFree || admin || student.unlockedNoteIds`) work for any subject
automatically once the `NotePage` entry and route exist — no per-subject
code needed there.
