# Summit Tuition — Status (Plain English)

Last updated: 2026-07-19 (founder punch-list session — report PDF fix, homework generator, notes expansion, 2 new Elite Maths mocks, maths-elite-1 visual retrofit)

This is a plain-English summary of where the whole project stands — the product, what's live, what's mid-build, and the business side. Written so you can skim it without needing to read code. Technical detail lives in `CLAUDE.md` and `README.md` if you ever need it.

---

## Done (session — 2026-07-19, founder punch list)

Ran a 2-hour autonomous session against a founder punch list, parallelised across several isolated `git worktree` background agents (merged back into `main` one at a time, verifying `typecheck`/`lint`/`build` after each merge) while a separate, unrelated background agent (`worktree-english-gl-mock-rebuild`) was mid-flight rebuilding English mock structure — deliberately left that one alone rather than risk clashing, see "Deliberately not done" below.

- **Fixed a real bug**: releasing a student's report never actually produced anything printable on the student side — students only ever got the plain in-app `StudentReportView`, while the polished PDF-style report (`AdminAttemptReport`) was gated to admin-only at `/admin/reports/[attemptId]`. Added `/mocks/[id]/report` reusing the same component in a student-audience mode, with print/Save-as-PDF buttons linked from the dashboard and mock-card report states.
- **New admin feature**: Homework Generator (`/admin/homework`) — pick subject/topic/difficulty/count from the existing question bank, generates a randomised worksheet with a premium letterhead and a separate answer-key page, printable straight to PDF via the same `gl-print` A4 system already used for reports.
- **Hero mountain flag** repositioned so it visibly plants at the summit instead of down the slope.
- **Study Notes expanded**: 5 English topics (Prepositions & Conjunctions, Complete-the-Sentence, Inference, Homophones, Grammatical Cloze Strategy) brought from ~4 subtopics each up to the full Foundation(2)/Standard(4)/Extension(3) shape (9 each), closing the depth gap `TODO.md` had flagged.
- **Diagram interactivity pass**: 12 English subtopics (6 Apostrophes/Possession, 4 Complete-the-Sentence, 2 Prepositions/Conjunctions) and 3 of the remaining untouched Maths diagrams (`fraction-percent-bar`, `sequence-step-visualizer`, `expression-balance`) gained a genuine second interactive layer, not just a colour change.
- **Maths mock visual-quality audit + fix**: found `maths-elite-1` (the newest 80-question Elite mock) had a 0% visual ratio — failing the platform's own 30% minimum quality check — while every sibling mock sat at 32-78%. Retrofitted accurate `QuestionVisual` diagrams into 55/80 questions (68.75% ratio, 7 visual types).
- **Two new full-length Maths mocks**: `maths-elite-2`, `maths-elite-3` (80 questions each, all 6 Maths topics, ~50% stretch difficulty, 36-37% visual ratio), grouped as the "Full Practice Mock Exams Set". Each includes 5 original competition-style puzzle questions (tagged `competition-style`/`original-puzzle`, explanation text explicitly states they're original and not reproductions) — real PMC/JMC past papers weren't available to source from, so these are inspired-by-style, not extracted content.

### Deliberately not done this session

- **Letter-labelling predictability, comprehension side-by-side layout, question-block section ordering (comprehension→spelling→grammar→cloze scaled to ~80Q)** — all explicitly requested by the founder, but a separate background agent (`worktree-english-gl-mock-rebuild`) was already mid-rebuild of exactly this (GL-ratio section sizing, new `SpotTheErrorRenderer`/`ClozeGapRenderer`, `mock-room-shell.tsx` section grouping) when this session started. Piling on top of live in-progress work in the same files risked real conflicts, so this was left to that agent — worth checking its status next session.
- **Full PMC/JMC question bank extraction** — not attempted. No source past papers were available to extract from, and reproducing real competition questions would be a copyright problem (same principle as the existing "don't copy third-party paper content" rule). Original competition-style questions were written instead (see above) rather than a real extracted bank.
- **3D/immersive diagram overhaul** (the founder's Spline/React-Three-Fiber/GSAP research) — not started. The existing Study Notes diagram system is deliberately SVG-based, matching `notes-theme.ts`'s premium-but-restrained visual language; introducing a second, heavier 3D rendering stack into Notes (separate from the marketing hero's existing R3F scene) is a bigger architectural decision than fit in this session — flagging for a scoped follow-up rather than guessing at it.
- One background sub-session hit its usage/session limit mid-task with 4 of 5 notes topics' work sitting fully-written but uncommitted in its worktree — recovered and committed by hand rather than re-running the work, no content was lost.

## Done (2026-07-19, docs sync)

- Found `CLAUDE.md` and `status.md` were 5 commits stale (last touched 2026-07-17 12:39, but work continued through 21:47 that day). Updated both to reflect: the critical demo-mode auth bypass fix, the `/welcome` page redesign (pricing tabs + sticky CTA), the goal-gradient student dashboard changes (instant raw scores, no more 0% onboarding), and the new `ProductPlan` bundle fields (`includedMockIds`/`includedNoteIds`).
- Set up a Claude Code hook (see `.claude/settings.json`) that fires after every `git commit` in this repo and reminds the session to refresh `CLAUDE.md`/`status.md` before finishing, so this gap doesn't reopen silently.

## Done (session — 2026-07-17, security fix + welcome redesign + plan bundles)

- **Critical security fix**: demo-mode sessions (no `DATABASE_URL`) encoded the raw user id directly in the `summit_session` cookie — anyone could set `summit_session=admin-1` and get admin access with zero login. Fixed to use an unguessable random token backed by an in-memory map. Production also now hard-refuses to silently fall back to demo auth if `DATABASE_URL` is missing.
- **Pricing page layout bug fixed**: every product group now has exactly one tier after an earlier consolidation, but the layout still branched on "3 tiers" and rendered a single cramped card per section — replaced with one unified responsive grid.
- **`/welcome` mobile landing page redesigned** to match the main site's visual polish: added pricing tabs (Mock Club, Group/Private Tuition, Holiday Booster, Complete Programme) and a sticky bottom booking bar so parents can compare plans and book without losing their place.
- **Student dashboard UX**: applied "goal-gradient" and "reciprocity" patterns — new students never see 0% onboarding progress (registering + unlocking the free mock now count as completed steps immediately), and raw scores show the moment a mock is submitted instead of being withheld until the full report is released.
- **Plan bundles shipped**: `ProductPlan` now has `includedMockIds`/`includedNoteIds`; admins can define what each plan includes via a new bundle editor, and assigning a plan to a student now automatically unlocks everything in that bundle. Also fixed `prisma.config.ts` to use the direct (non-pooled) database URL for schema CLI commands — the pooled connection was hanging on `migrate`/`push`.

## Done (this session — 2026-07-16, follow-up fixes)

- **Two production DB fixes**: (1) `npm run db:seed` was run against the shared prod database — new mocks/questions/passages from the previous session hadn't reached the live site since it's DB-backed, not the static seed file. (2) Found the *actual* clunky "Students and manual access" table the user meant (a second, separate one on the main `/admin` dashboard, distinct from the one already fixed on `/admin/students`) — removed the duplicate, now reuses the same grouped/searchable unlock panel everywhere.
- **Report preview corrected**: the "preview before releasing" feature initially pointed to a new, differently-styled page. User clarified they wanted it to match an existing real report PDF (`Lupin-English-GL-Style-II-Report.pdf`) — which turned out to already be almost exactly what `AdminAttemptReport`/`/admin/reports/[attemptId]` produces (donut score, marks-by-topic bars, skill spotlight, every-question-missed). Repointed "Preview report" links there and added the one missing section from the reference PDF: **"What they don't know yet"** — a deduped plain-English rule explanation per missed sub-skill.
- **Per-student lessons editor**: added `lessonsRemaining`/`upcomingLessons` (date/time/note rows) to the `User` model, pushed directly to the shared production Supabase DB (via the *direct* non-pooled connection — `prisma db push` hangs indefinitely over the pgbouncer transaction pooler on port 6543; use the `DIRECT_URL` on port 5432 with `--url` for any future schema pushes), plus an inline collapsible editor on the admin students page. This backs the parent/family dashboard view (`/dashboard/family`) with real per-student data instead of only the static demo seed.

## Done (this session — 2026-07-16, operational punch list)

A 2-hour autonomous session working through a founder-facing operational checklist (bugs found while actually running the platform, plus new features). Ran solo without stopping for review between items; verified with `npm run typecheck` / `npm run lint` / `npm run build` (all clean) before committing.

- **Fixed a real bug**: the admin Attempts tab (`src/components/platform/admin-mocks-command-centre.tsx`) showed a hardcoded "Generic demo account" for every attempt instead of the actual student's name — `users` was never pulled from `usePlatform()`. Now looks up `attempt.studentId` against the real user list.
- **Fixed clunky admin student-unlock UX**: the old "All Student Accounts" panel rendered ~30 unlabeled checkboxes per student in one flat wrapped block (30 mocks/notes × 6 students = visually overwhelming). Replaced with a collapsed-by-default `UnlockPanel` per student — search box, grouped by subject with per-subject unlock/lock-all buttons, and a running "X/Y unlocked" count (`admin-students-workspace.tsx`).
- **Added a demo student account** (`student-demo-testing` / Priya Chen, `priya.demo@summittuition.local`) for the founder's own manual testing. Decided against building isolated per-user staging/feature-flag infrastructure — `npm run dev` on localhost covers pre-push testing at effectively zero cost, so that's the recommended workflow instead.
- **Student account settings** (`/dashboard/settings`): change name, change password (new `/api/account/update` route, DB-backed when configured, no-op-but-ok in demo mode), and a dashboard-scoped dark mode toggle (`data-dashboard-theme` attribute + CSS variable overrides in `globals.css`, not a full site theme system).
- **Parent/family view** (`/dashboard/family`): lessons remaining, upcoming lesson date/time, and a payment-status placeholder that explicitly says payments populate once Stripe is connected. Added `lessonsRemaining`/`upcomingLessons` as optional fields on `StudentAccount` — currently admin-editable seed data only, no real booking system yet.
- **Mobile WhatsApp landing page** (`/welcome`): a short, lightweight, mobile-first page (no heavy motion components) for sharing a link outside the main desktop-oriented landing page. Still inherits the shared Header/Footer.
- **Printable practice mocks** — a new mock category distinct from scored online mocks: `MockExam.printOnly`, a `/mocks/[id]/print` browser-print view (`@media print` CSS, no PDF library, no score/report), and one placeholder mock (`maths-print-sample`, reusing the existing `m1`-`m9` diagnostic questions). **Updated `CLAUDE.md`'s Design Notes** — the old blanket "no printable mocks" rule now explicitly carves out this print-only category while keeping scored mocks online-only.
- **Two new Elite-difficulty mocks**, hand-authored to match the existing Elite quality bar: `maths-elite-1` (80 original questions spanning all 6 Maths topics, ~45% stretch difficulty, calibrated toward a ~65% average) and `english-gl-10-elite` (a new original passage, "The Weaver's Last Thread", + 54 marks: 28 comprehension, 9 spelling, 9 grammar, 8 cloze, matching the `english-gl-8-elite`/`-9-elite` structure exactly). The user originally asked for 3 of each; scoped down to 1+1 this session to protect quality over quantity — the other 4 are logged in `TODO.md`.

## Done (previous session — 2026-07-14, Verbal Reasoning notes launched)

User asked for a reusable playbook for building more Study Notes content, plus a first real attempt at Verbal Reasoning notes (previously just a "Coming soon" card). Note: this session shared the working tree with another concurrent agent session — one intermediate attempt got wiped by a `git clean`/`checkout` from that other process before anything was committed; the work below is the successfully-committed redo.

- **New skill**: `.claude/skills/notes-authoring/SKILL.md` — documents the whole notes content model (topic/subtopic data shape, the shared page shell, the four practice-question interaction types, subject/strand/topic routing, and the gating system) so a future session can add a new notes topic for any subject without re-deriving the pattern from scratch.
- **Verbal Reasoning notes are now live**, matching the same premium/interactive style as the Maths and English notes. Based on real GL Assessment past-paper research already in the project (not guessed): Verbal Reasoning is split into 4 skill families (Word Relationships, Codes & Ciphers, Word Building, Number & Logic Puzzles) — mirroring how English is split into strands.
- Built out the first one in full: **Word Relationships** (synonyms, antonyms, odd one out, analogies, plus alphabet-letter analogies, trap words, and exam strategy) — 10 subtopics, each with a concept explainer, glossary, a new interactive "click the word" diagram, a worked example, a self-check, 3 practice questions, common mistakes and an exam tip. The other 3 Verbal Reasoning skill families are visible as "Coming soon" cards, not yet built.
- Verified with `npm run typecheck` (clean) before committing; committed and pushed as a single scoped commit (`3da5d8a`) touching only the 10 new/changed files for this feature.

## Done (previous session — Study Notes interactivity pass)

User asked to push the Study Notes feature further before a Claude usage window reset, explicitly prioritising "more interactive for English" first. Audited every English diagram component and found all ~76 English subtopics (Grammar/Spelling/Comprehension/Cloze) funnel through one of three generic shared components (click-the-word, click-the-sentence, click-the-gap) — genuinely just worksheet-style exercises with no diagram surface at all.

- **New bespoke diagram components** (`src/components/notes/notes-diagrams/`): `reference-arrow-diagram.tsx` (clickable pronoun-to-antecedent arrow diagram, tests a reading and colours it gold/red with an explanation), `parallel-list-aligner.tsx` (aligns list items with grammatical "form tags", click-to-fix pops mismatched rows into alignment), `word-anatomy-breakdown.tsx` (segments a word into prefix/root/suffix blocks, hover for the rule, click to compare against the common misspelling), `context-clue-highlighter.tsx` (dotted-underline clue words in a cloze sentence, click to reveal why each points to the answer).
- **Wired into the highest-value subtopics**: 4 Pronoun Errors subtopics (number agreement, ambiguous reference, reflexive misuse, who/whom), Parallel Structure (Parts of Speech Errors), 5 Spelling Patterns subtopics (able/ible, ance/ence, doubling consonants, y-to-i, silent e), 4 Cloze subtopics.
- **Upgraded the shared Comprehension component** (`click-evidence-passage.tsx`, used by all 10 Comprehension subtopics at once): added hover-scan highlighting while reading, plus a "found it" magnifying-glass pop-in on the correct sentence — uplifts every Comprehension subtopic for free.
- **Maths enrichment**: added a genuine second interactive layer to the 3 weakest of the 18 Maths diagrams (fewest lines, no hover affordances) — `percent-of-amount.tsx` (reference tick marks + a "show the working" step-by-step reveal), `pie-chart-explorer.tsx` (a "show as fractions" toggle that re-renders each slice's share as a simplified fraction), `scale-factor-linker.tsx` (hover/focus a scale button to preview the resulting ratio before committing with a click).
- **Fixed a repo hygiene issue found along the way**: `npm run lint` was silently producing 3000+ warnings/errors from a generated `playwright-report/` trace bundle and a stray `.claude/worktrees/` checkout that eslint wasn't ignoring — neither is app source. Added both to `eslint.config.mjs`'s ignore list; lint is clean again.
- All of the above verified with `npm run typecheck`, `npm run lint`, and a full `npm run build` (every affected notes route — pronoun-errors, parts-of-speech-errors, spelling-patterns-rules, what-is-cloze, literal-comprehension-retrieval — statically prerenders with no errors). Three separate commits, each pushed immediately.

## In Progress / Deliberately Not Done This Session

- **Verbal Reasoning: 3 of 4 skill families still unbuilt** — Codes & Ciphers, Word Building, and Number & Logic Puzzles are named and stubbed as "Coming soon" on `/notes/verbal-reasoning` but have no content yet. Non-Verbal Reasoning notes weren't touched at all this session (still fully "Coming soon"). The GL archetype research needed to plan all of these already exists in `research/gl-vr-nvr-question-bank.md`.
- **14 of the 18 Maths diagrams untouched** — only the 3 weakest were enriched given the time budget; the rest were already reasonably interactive (hooks + click handlers) and lower priority per the user's explicit "English first" instruction.
- **~41 remaining English subtopics still on the plain shared components** (untouched): the other Grammar subtopics beyond the 5 touched, the other 6 Spelling subtopics, the other 6 Cloze subtopics, and (implicitly) any future Comprehension subtopics beyond the shared-component upgrade. These are lower-value to enrich (many are genuinely fine as plain click exercises — not every subtopic needs a bespoke diagram) but were not audited one-by-one for a second pass.
- **Priority 3 (new English content topics) not started**: remaining Grammar topics (Prepositions & Conjunctions, Complete-the-Sentence/Best-Fit), and 2nd topics for Comprehension/Spelling/Cloze. Ran out of safely-committable budget before starting — each needs a new content data file + new diagram(s) + a new route folder, and starting one without finishing it would risk leaving main in a half-built state, which was the one thing to avoid. See `TODO.md`, unchanged from before this session.

## Next Up

- **User action needed** — same three items as before, still outstanding (needs the user's own account access):
  1. Set up email delivery (Resend account + API key) and an admin notification address so enquiries/bookings actually reach someone.
  2. Connect a real shared database (e.g. Supabase Postgres) so student accounts/mocks aren't stuck in each browser's local storage.
  3. Set `ADMIN_BOOTSTRAP_SECRET`, `AUTH_SECRET`, and a real `ADMIN_PASSWORD` in the Vercel dashboard (not local `.env`).
- Next Notes session: either (a) build out the remaining 3 Verbal Reasoning skill families using the new `notes-authoring` skill, (b) do a second interactivity pass over the remaining ~41 plain English subtopics (spot-check, don't force a diagram on every one), or (c) start Priority 3 content build-out (remaining Grammar topics, 2nd topics for Comprehension/Spelling/Cloze) — user's call.
- Full backlog lives in `TODO.md`.

## Decisions / Notes

- Verbal Reasoning notes use a strand layer (like English: subject → strand → topic), not a flat topic list (like Maths) — VR's ~18 GL question-type archetypes group naturally into 4 skill families, closer to how English splits into Comprehension/Grammar/Spelling/Cloze.
- This repo had two agent sessions running against the same working tree in parallel this session — confirmed with the user, no lasting damage, but a reminder for future sessions to commit early/often rather than doing many edits before a single verify-then-commit step.
- User confirmed: fix the mock-content-exposure issue, but explicitly leave VR/NVR mocks alone for now (unchanged from prior session).
- `.env.example` is intentionally not committed to git (covered by `.gitignore`'s `.env*` rule) — it's a local-only reference file, so the new `ADMIN_BOOTSTRAP_SECRET` line added to it won't show up in git history.
- Design judgment call this session: rather than replace all ~76 English subtopic demos, upgraded the three *shared* base components where an upgrade is safe/universal (Comprehension's hover+found-it effect applies to all 10 subtopics for free) and reserved genuinely bespoke new diagrams (arrows, aligners, anatomy breakdowns, clue highlighters) for subtopics where the concept is visual enough to earn one — matching the brief's "don't force a diagram onto content that doesn't need one."

---

## 1. What this actually is

Summit Tuition is an online 11+ exam prep platform: a marketing website plus a working student/admin system for sitting practice mocks (English and Maths), getting them marked, and reviewing results. It's built to look and feel premium (navy/gold/cream branding), not like a generic worksheet site.

There are two other, unrelated projects sitting in the same repo folder that you should ignore for this status doc — `india-study-platform/` (a separate CBSE/India-focused idea, mostly planning docs) and `summit-gcse-tuition/` (a separate GCSE site). Neither is part of what's described below.

## 2. How to run it / where it lives

- Runs locally with `npm install` then `npm run dev`, opens at `localhost:3000`.
- Deployed on **Vercel**. Production environment variables (database connection, admin email, etc.) live in the Vercel dashboard — editing your local `.env` file does **not** change what's live in production.
- Without a database configured, the whole app still works using your browser's local storage as fake demo data — handy for testing, but that data doesn't sync between browsers/devices. With a real Postgres database plugged in (`DATABASE_URL`), everything becomes properly shared/persistent.
- Payments (Stripe) are wired up in the code but switched off — no real card payments can happen until Stripe keys are added.

## 3. What's actually working right now (the core platform)

- **Marketing site** — homepage, pricing, FAQs, about, tuition options, diagnostic assessment page, booking, policies. This is the public-facing side people land on before signing up.
- **Student sign-up** — a student registers, picks a plan, and gets instant account access. There is no manual review gate on signup — the real manual step is you unlocking specific mocks for them, not approving the account itself. (The admin panel still has a pause/re-approve toggle for suspending an existing account after the fact.)
- **Admin panel** (`/admin`) — you sign in, assign plans, and manually unlock specific mocks for specific students. You can also pause or reject an account if needed.
- **Mock exams** — students sit English and Maths mocks online (GL 11+ style — arithmetic, fractions, ratio, algebra, geometry, comprehension, grammar, spelling, cloze, etc.), the system autosaves their answers as they go, and they submit at the end.
- **Marking & reports** — after a student submits, you (admin) review it, add feedback, and release the report. Only then does the student see their score, a breakdown by topic, their weak spots, and full answer explanations.
- **No PDFs, no printing** — deliberately kept online-only; this was a specific decision to protect the content and keep everything inside the platform.

## 4. Study Notes (the newest feature — what we've been actively building)

This is a separate section of the site from the mocks — think of it as a revision-notes library the student can browse any time, not a timed test. It lives at `/notes`.

Each "page" (we call it a subtopic) is a self-contained mini-lesson: a plain-English explanation, a glossary of key terms, an interactive exercise you click through, a worked example, a quick self-check question, three practice questions with instant right/wrong feedback, a "common mistakes" box, and an exam tip. It's designed to feel like a nicely typeset textbook page, not a plain webpage.

### Maths — done

Six topics are fully built and live: **Numbers**, **Fractions/Decimals/Percentages**, **Ratio & Proportion**, **Algebra**, **Geometry**, **Averages & Statistics**. Each has 3 subtopic pages with its own custom interactive diagram (e.g. a place-value house, a factor-sorting Venn diagram, a balance-scale for equations). That's 18 pages total, all working.

### English — in progress, Grammar strand started

The full plan (from an earlier brainstorm) is a 400-page curriculum split into 4 "strands": **Comprehension**, **Grammar** ("spot the mistake" style), **Spelling** ("spot the mistake" style), and **Cloze** (fill-the-gap passages). Only **Grammar** has been started so far — Comprehension, Spelling and Cloze haven't been touched yet.

Grammar so far has **5 topics live, 46 subtopic pages total**:

| Topic                             | Subtopics | What it covers                                                                                                                                                                                                                                |
| --------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parts of Speech Errors            | 10        | Nouns, verbs, adjectives, adverbs, pronouns, prepositions, conjunctions, determiners, confusing one part of speech for another, spotting the odd one out                                                                                      |
| Agreement & Sentence-Level Errors | 6         | Subject-verb agreement, tense consistency, comparatives/superlatives, double negatives, misplaced modifiers, parallel structure                                                                                                               |
| Pronoun Errors                    | 10        | Subject vs. object pronouns, possessive vs. contraction, pronoun-antecedent agreement, ambiguous reference, reflexive misuse, who/whom, relative pronouns, demonstrative pronouns, indefinite pronouns, hypercorrection ("between you and I") |
| Apostrophes & Possession          | 10        | Contractions vs. possessives, singular/plural/irregular/joint possession, decades & letters, the "greengrocer's apostrophe," possessive pronouns, names ending in s, mixed review                                                             |
| Commonly Confused Words           | 10        | Homophones, affect/effect-type pairs, fewer/less, practice/practise-type pairs, idioms, formal vs. informal wording, look-alike words, near-synonyms, mixed review                                                                            |

The interaction style for all of Grammar is "click the word that's wrong in this sentence" — one consistent format reused across all 46 pages so it only had to be designed once.

**Where the pages sit:** `/notes/english` → strand picker → `/notes/english/grammar` → topic picker → each topic's own page with all its subtopics stacked on one scrollable page.

### What's not started yet in English

- **Comprehension strand** — 0 of 100 planned pages (retrieval, inference, vocabulary-in-context, figurative language, author's purpose, text structure, summarising, prediction, comparing texts, fact vs. opinion).
- **Spelling strand** — 0 of 100 planned pages (spelling patterns, homophones, prefixes/suffixes, silent letters, double letters, plurals, commonly misspelled words, etc.).
- **Cloze strand** — 0 of 100 planned pages (missing-word and missing-letter passages).
- Within Grammar itself, a few of the original 10 planned topics haven't been built as their own dedicated topic yet: **Prepositions & Conjunctions** (deeper dive — the basics are covered inside "Parts of Speech Errors" already), and **Complete the Sentence / Best-Fit Word Choice**.

### A technical note worth knowing (not urgent)

Right now none of the Notes pages remember a student's progress between visits — no "you've mastered this subtopic" saved anywhere. That's fine for now, but the gamification ideas below (mastery meters, wax-seal badges, certificates) all need that kind of saved progress to work, so it's worth deciding on that before too many more pages get built on top of the current setup.

## 5. Ideas on the shelf (brainstormed, not built)

Two idea documents exist purely as backlogs — nothing in them has been built:

- **Visual/gamification polish** (`docs/ideas/11plus-premium-craft-and-gamification.md`) — things like drop-cap first letters, gold shimmer hover effects, a "mastery meter" per subtopic (Developing → Secure → Mastered), wax-seal-style achievement badges, a timed "Trial" mode, and printable "Certificate of Mastery" PDFs. A first small slice of this (drop caps, pull-quotes, gold-shimmer badges) was already applied site-wide as an editorial polish pass. The bigger gamification layer (wax seals, mastery tracking, certificates) is deliberately not started — it needs the "remember progress" groundwork mentioned above first.
- **General feature backlog** — a wider dump of UI/UX, geometry, AI, and gamification ideas from an earlier brainstorm, also untouched.

## 6. The business side (from earlier research, not code)

This part isn't about the software — it's what was researched about actually getting paying customers:

- **The market**: 11+ tutoring is genuinely growing (roughly 1 in 3 UK kids in this age group now gets private tuition, higher in London), so this isn't a shrinking or saturated niche.
- **Competitors**: the main direct rivals are Atom Learning (expensive, £40-70/mo) and EdifyPod (cheap, under £20/mo, currently rated best overall). Going head-to-head on price against EdifyPod is a losing move — the researched advantage is **trust**: several competitors have real, documented complaints about cutting off access, confusing billing, and wrong answers from markers. Summit's manual approval + human marking + everything-in-one-place model directly answers that.
- **Biggest content gap in the whole market**: Verbal Reasoning and Non-Verbal Reasoning practice is weak everywhere, including on Summit right now (those mock sections exist as placeholders with no real questions yet). This was flagged as the single highest-leverage thing to build next from a "get customers" point of view — separate from the Study Notes work we've been doing.
- **Getting the first customers**: the recommended path is a blend — a handful of paid 1:1 tutoring clients (closes fast, higher £ per family) plus a slower-building subscription base underneath, funded by a low-cost diagnostic assessment as the entry point. The single most valuable next step flagged was simply **getting your first 3 customer reviews** — there are currently none, and reviews are the #1 thing parents check before booking.
- **Where to find early customers without ad spend**: Chinese Saturday/supplementary schools, Hindu temples/cultural centres, and primary school PTA talks were identified as realistic, low-cost channels — because these are places parents are already primed for "extra tuition" conversations, not cold audiences.

## 7. Known limitations (things that work for a demo but need hardening before real money/data is on the line)

- Login/sessions work but haven't had a full production security hardening pass.
- Mock exam content is currently loaded into the student's browser directly, which is fine for a demo but should move to a more locked-down server-side setup before this is protecting content you don't want copied.
- Stripe payments are built but switched off — nothing charges real cards yet.
- Emails (e.g. approval notifications) are placeholders — nothing actually sends yet.
- Admin-generated mock papers and edits aren't fully saved to the permanent database yet — some of that is still "temporary" state.

## 8. What's sitting uncommitted right now

The 3 new Grammar topics from today's session (Pronoun Errors, Apostrophes & Possession, Commonly Confused Words — 30 pages) are built, tested, and working, but **not yet committed to git**. There are also a few other unrelated files showing as changed in the working tree that weren't part of this session's work (some site-wide styling and a data file) — I haven't touched or investigated those, so treat them as someone else's in-progress work, not something this status reflects on.

---

## Questions for you

1. **Should I commit and push the 3 new Grammar topics now?** (Pronoun Errors, Apostrophes & Possession, Commonly Confused Words.) I held off since you didn't ask for a commit this session, but your standing preference on file is to auto-push once things are working — let me know if that still holds for Notes content specifically.
2. **Keep going on Grammar, or switch strands?** Grammar has 5 of ~10 planned topics done (46 pages). Do you want the remaining Grammar topics finished first, or should the next batch start the first page of Comprehension/Spelling/Cloze instead (to lock those templates the way Grammar's is now locked)?
3. **VR/NVR content** was flagged in the business research as the single biggest gap versus competitors — separate from Study Notes. Do you want that prioritised over more Notes pages at some point soon, or keep the current focus?
4. **Progress-saving groundwork** — do you want me to look at adding real save-progress (so mastery meters / badges / certificates become possible later), or keep Notes content-only for now and revisit that later?
5. Anything from the business/marketing docs you want acted on now (e.g. setting up a Google Business Profile, drafting outreach messages to Chinese schools/temples), or is that purely for your own reference at this stage?
