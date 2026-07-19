# Summit Tuition — To-Do / Roadmap

Last updated: 2026-07-19 (founder punch-list session — see `status.md` for full detail). Companion to `status.md` (current state) — this file is the forward-looking list: what's next now, and what's parked for later. Plain English, not a spec.

I could only find two backlog docs matching "meters/badges/certificates" from an earlier brainstorm — see the note at the bottom if there's a third one I'm missing (couldn't find a distinct "worksheets" item anywhere — note a printable **Homework Generator** now exists, `/admin/homework`, added 2026-07-19, so this may now be resolved).

## Just done (2026-07-19 founder punch list)

- [x] Fixed released reports never producing a student-visible PDF (`/mocks/[id]/report`).
- [x] Homework worksheet generator (`/admin/homework`).
- [x] Prepositions & Conjunctions, Complete-the-Sentence, Inference, Homophones, Grammatical Cloze Strategy each expanded to 9 subtopics.
- [x] 2 more Maths Elite mocks (`maths-elite-2`, `maths-elite-3`) — the item below is now done.
- [x] `maths-elite-1` visual ratio fixed (0% → 68.75%).

## Carried over / still open from this session

- [ ] **English mock letter-labelling predictability, comprehension side-by-side layout, question-block section ordering** — a separate background agent (`worktree-english-gl-mock-rebuild`) was mid-rebuild of exactly this when the 2026-07-19 session ran; deliberately left alone to avoid clashing. Check that branch's status next session — it may be ready to review/merge, or may need finishing.
- [ ] **Real PMC/JMC question bank** — founder asked for one; not attempted, no source past papers available and copying real competition content would be a copyright problem. Original competition-style questions were written instead (5 per new Elite Maths mock, tagged `competition-style`). If a real bank is still wanted, it needs the founder to supply/license actual source material.
- [ ] **3D/immersive diagram overhaul for Notes** (Spline/React-Three-Fiber/GSAP-style) — founder asked for more visually impressive interactive diagrams generally; the existing Notes system is deliberately SVG-based and a second, heavier 3D stack is an architectural decision that needs scoping, not a quick add.

---

## Just done (2026-07-13 interactivity pass)

- [x] Audited every English Notes diagram — confirmed all ~76 English subtopics were reusing one of three generic shared "click the word/sentence/gap" components with no real diagram surface.
- [x] Added 4 new bespoke diagram components and wired them into the highest-value subtopics: pronoun-antecedent arrow diagram (4 Pronoun Errors subtopics), parallel-structure list aligner (Parts of Speech Errors), word-anatomy prefix/root/suffix breakdown (5 Spelling Patterns subtopics), cloze context-clue highlighter (4 Cloze subtopics).
- [x] Upgraded the shared Comprehension click-evidence component (hover-scan + "found it" pop) — uplifts all 10 Comprehension subtopics at once.
- [x] Enriched the 3 weakest of the 18 Maths diagrams (percent-of-amount, pie-chart-explorer, scale-factor-linker) with a second interactive layer each.
- [x] Fixed `eslint.config.mjs` ignoring generated `playwright-report/` and a stray `.claude/worktrees/` checkout that were silently breaking `npm run lint`.

## Now (next up)

- [ ] **2 more Maths Elite mocks (80Q, all-topics) + 2 more English Elite mocks** — a 2026-07-16 session shipped one of each (`maths-elite-1`, `english-gl-10-elite`) hand-authored to the existing Elite quality bar (new original passage + 54 marks for English, 80 fresh questions across all 6 Maths topics). The remaining 2+2 requested by the user were explicitly deferred this session to protect the time/token budget — same authoring approach (new passage per English mock, fresh questions per Maths mock, no recycling from other mocks' question banks) should be used when picked back up.

- [ ] **Second interactivity pass over remaining ~41 English subtopics** still on the plain shared components (rest of Grammar beyond the 5 touched subtopics, 6 of 10 Spelling subtopics, 6 of 10 Cloze subtopics) — spot-check each, don't force a diagram where the concept doesn't need one.
- [ ] **Comprehension strand** — only the shared component was upgraded this pass; the strand itself (`literal-comprehension-retrieval`, 10 subtopics) is still the only Comprehension topic live.
- [ ] **Spelling strand** — likewise still only `spelling-patterns-rules` (10 subtopics) live.
- [ ] **Cloze strand** — likewise still only `what-is-cloze` (10 subtopics) live.
- [ ] **VR (Verbal Reasoning) content** — replace the empty `vr-placeholder` mock (currently 0 questions) with a real first batch: sequences, analogies, word codes, missing letters.
- [ ] **NVR (Non-Verbal Reasoning) content** — replace the empty `nvr-placeholder` mock (currently 0 questions) with a real first batch: series, analogies, matrices, rotations/reflections, odd-one-out.
- [ ] **Real progress-saving for Study Notes** — now saved locally on-device (shipped in an earlier session) but not yet synced across devices via the database. This is the prerequisite for everything in the "Gamification" section below.
- [ ] **Remaining 14 of 18 Maths diagrams** — not audited for a second interactive layer this pass; lower priority than English per explicit user instruction, but worth a look next time Maths comes up.

## Next (once the above lands)

- [ ] Finish the remaining Grammar topics (5 of ~10 planned topics done: Parts of Speech, Agreement & Sentence-Level, Pronoun Errors, Apostrophes & Possession, Commonly Confused Words). Still to do: a deeper Prepositions & Conjunctions topic, and Complete-the-Sentence/Best-Fit Word Choice.
- [ ] Batch out the rest of Comprehension/Spelling/Cloze topic-by-topic (10 topics × 10 subtopics each, per strand) once each strand's first topic is approved.
- [ ] Expand VR/NVR beyond the first batch to a full mock's worth of questions per subject, and get both mocks published (currently `published: false`, `tier: "Future"`).

## Gamification & premium-craft backlog (parked — needs progress-saving groundwork first)

From `docs/ideas/11plus-premium-craft-and-gamification.md` (2026-07-11 brainstorm, not started except a small visual-only slice already shipped: drop caps, pull-quotes, gold-shimmer badges).

**The core reward system idea:** one unifying visual — a wax-seal — used consistently everywhere, rather than mixing badges/stars/trophies/streaks (which was explicitly called out as what makes gamification feel cheap instead of premium).

- [ ] **Mastery meters per subtopic** — "Developing → Secure → Mastered" instead of a plain progress bar (tracks accuracy over multiple attempts, not just one pass/fail).
- [ ] **Wax-seal badges** — an achievement renders as an embossed gold wax seal with a small heraldic motif and a subtle stamp animation, not a cartoon medal.
- [ ] **Certificate of Mastery per strand** — once every topic in a strand is "Mastered," generate an exportable, nicely typeset PDF certificate (navy/gold).
- [ ] **Honours page / "Record of Achievement"** — a permanent page listing every seal earned and strand completed, like a school prize-giving ledger.
- [ ] **Spaced-repetition resurfacing** — a "Mastered" subtopic quietly resurfaces one review question a week later ("Keep your Mastery").
- [ ] **Skill map / "Grand Tour"** — a navigable map where each strand is a region and subtopics are waypoints that light up as completed.
- [ ] **Rank titles** (e.g. Apprentice → Scholar → Fellow → Laureate) instead of numeric XP.
- [ ] **Timed "Trial" mode** — a mixed-question gauntlet under a countdown, "beat your own record" only (never other students, for privacy).
- [ ] Smaller visual-craft items: gold foil hover shimmer on buttons, signature illustrated motif per strand, custom pencil cursor on clickable text, contextual hover/long-press definitions on any bolded term (not just the glossary strip), "This connects to: X" cross-page concept links.

**Why parked:** all of the above needs a student's progress to actually persist across visits — that's the "progress-saving" item in the Now section above, which unblocks this whole list.

## Wider feature backlog (parked, unscoped, unprioritized)

From a 2026-07-11 brainstorm covering the whole platform, not just Notes. Your own "highest ROI, pick 5" shortlist from that session was:
1. Premium exam-style UI/UX
2. Interactive geometry (nets, 3D shapes, transformations)
3. Adaptive learning with topic mastery
4. Realistic mock exam mode
5. Rich analytics dashboards (student/tutor/parent)

Full raw list, for reference (nothing here started):
- **UI/UX**: Duolingo/Khan Academy-style redesign, animated transitions, dark mode, skeleton loading, micro-animations, confetti for perfect scores, animated progress bars, accessibility passes.
- **Question experience**: exam-style layout, flag for review, eliminate answer, highlight question text, zoomable diagrams, full-screen mode, calculator popup, keyboard shortcuts, confidence rating, bookmarking.
- **Analytics**: topic mastery, weakest topics, accuracy over time, difficulty heatmaps, progress graphs, predicted exam score, daily streak, XP, achievement badges.
- **Better questions**: multi-variant generation, randomised numbers/names/contexts, adaptive difficulty, AI hints, step-by-step explanations, distractor analysis.
- **Better geometry**: interactive nets (folding, rotate, hover-highlight faces), interactive 3D shapes, live mirror-line reflections, transformation animations, drag-the-angle-arm with protractor overlay.
- **NVR-specific**: animated hole-punch folding (step-by-step, click-where-holes-appear, replay, adjustable speed), animated matrix questions, shape morphing, drag-missing-piece.
- **Mock exams**: real exam mode, pause/resume, review page, question navigator, mark for review, auto-submit, exam summary, parent report.
- **Tutor features**: student progress view, live dashboard, homework assignment, completion tracking, compare students, export reports, per-student notes.
- **AI features**: explain wrong answers, generate similar questions, AI tutor chat, personal study plan, auto-detect weak topics, revision reminders.
- **Performance**: faster loading, image optimisation, lazy loading, better caching, PWA/offline support.
- **Gamification (general)**: XP, coins, unlockable avatars, daily quests, weekly challenges, seasonal events, levels, leaderboards.
- **Bigger standalone projects**: adaptive learning engine, visual question builder for tutors, interactive geometry engine, GL/CEM-precise exam simulator, student mastery-map dashboard, parent dashboard, AI explanation/hint system, spaced repetition for previously-wrong questions.

## A note on "worksheets"

You mentioned an ideas doc with meters/badges/certificates *and* worksheets — I found the meters/badges/certificates part (the gamification doc above), but nothing calling out a specific "worksheets" feature in either backlog doc I could find. If you meant something like **printable/exportable worksheet PDFs**, that would currently conflict with the platform's existing "no PDF downloads, no printable versions" content rule (in `README.md`/`CLAUDE.md`) — worth flagging in case that rule needs revisiting, or if you meant something else entirely (e.g. a worksheet-style question format inside the platform, still online-only). Let me know which you meant and I'll fold it in properly.
