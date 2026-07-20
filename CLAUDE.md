@AGENTS.md

# Summit Tuition Project Context

Last updated: 2026-07-20 (Free/Pro/Max rebrand applied site-wide + new homepage free-sample-mock widget — see `status.md`). Plain-English project status and forward-looking roadmap live in `status.md` and `TODO.md` — read those first for current state/next steps; this file is the technical companion, and it's what's auto-loaded into every session (unlike `status.md`/`TODO.md`, which must be read explicitly).

## Sibling Projects In This Repo

This repo root also contains two other, separate Next.js projects living alongside this one (not part of this app, each has its own CLAUDE.md/PROJECT_CONTEXT.md):

- `india-study-platform/` — a CBSE/India-focused study platform, currently mostly planning docs + data, see `india-study-platform/PROJECT_CONTEXT.md`.
- `summit-gcse-tuition/` — a GCSE-focused tuition site, a separate runnable Next.js app, see `summit-gcse-tuition/PROJECT_CONTEXT.md`.

There is also a `legacy/` folder in this root which is an older site snapshot, intentionally excluded from lint/typecheck/git-relevant tooling.

## Purpose

Summit Tuition is a premium online 11+ tuition and mock exam platform. It combines a marketing site with a working student/admin platform for online-only English and Maths mocks, manual student approval, mock unlocks, draft mock generation, admin marking, report release, and review mode.

Update this file before every push so a new chat/model can recover the project state quickly.

## Tech Stack

- Next.js 16.2.9 App Router under `src/app`.
- React 19.2.4 and TypeScript.
- Tailwind CSS v4 via `src/app/globals.css` and `@tailwindcss/postcss`.
- Prisma 7 with generated client output in `src/generated/prisma`.
- PostgreSQL when `DATABASE_URL` is configured.
- Local browser `localStorage` fallback for demo mode when the database is not configured.
- Playwright e2e tests in `tests/`.
- Stripe checkout scaffolding exists but stays safe/disabled until real keys are configured.

Important: this repo has `AGENTS.md` warning that this is a newer Next.js with breaking changes. Read relevant local docs in `node_modules/next/dist/docs/` before editing Next-specific code.

## Current Health

- `npm.cmd run typecheck` passes.
- `npm.cmd run lint` passes (1 pre-existing unrelated warning in `tests/student-mock-flow.spec.ts`, 0 errors).
- `npm.cmd run build` passes.
- `npm.cmd run test:e2e` passes 7/8; the 1 remaining failure (`new-features.spec.ts` lessons-remaining test) is a pre-existing, self-documented flaky race condition in the admin lessons-editor save flow, unrelated to English mocks — confirmed flaky (fails then passes identically on retry), not a regression.
- PowerShell blocks `npm.ps1`, so use `npm.cmd` on Windows.
- Current working tree had pre-existing edits excluding `legacy/` from lint/typecheck and fixing the README root directory note.
- `legacy/` is an older site snapshot and is intentionally ignored by git/lint/typecheck.
- `next/font/google` was removed from `src/app/layout.tsx`; the app now uses a system font stack in `src/app/globals.css` so builds do not depend on fetching Google Fonts.

## Main Product Flows

- Public marketing routes explain diagnostic assessments, tuition, mocks, practice packs, pricing, FAQs, policies, and booking/contact.
- Students open interactive Study Notes at `/notes` (subject index) and `/notes/maths/[topic]` (Numbers, Fractions/Decimals/Percentages, Ratio & Proportion, Algebra, Geometry, Averages & Statistics), wired in from the student dashboard.
- Students register at `/register`, choose a plan, and get instant account access — there is no manual approval gate on signup (`approved: true` is set at registration in both the demo and DB-backed paths). The real manual step is per-mock unlocking, not account approval.
- Admin signs in at `/login`, opens `/admin`, assigns plans, and unlocks mocks. Admin can still pause/re-approve or reject an existing account (`/api/admin/students/[id]/approve`, `reject`) — this is for suspending accounts after the fact, not gating new signups. The "Paused Student Accounts" panel on `/admin` only ever lists accounts an admin has manually paused.
- Students open `/dashboard`, start unlocked online mocks, autosave drafts, submit attempts, and now see raw scores immediately on submission (2026-07-17 goal-gradient change — see Recent Feature State) while waiting for the full marked report/feedback to be released by admin.
- Admin opens `/admin/mocks` to inspect mocks, generate draft mocks, publish/unpublish, preview as student, review attempts, add feedback, and release reports.
- Released attempts can be reviewed by students at `/mocks/[id]/review`.

## Important Routes

- `/` landing page.
- `/login`, `/register`, `/dashboard`, `/dashboard/settings` (name/password/dark-mode toggle), `/dashboard/family` (parent view: lessons remaining, upcoming lessons, payment-status placeholder).
- `/welcome` — lightweight mobile-first landing page (no heavy motion) for sharing outside the main desktop-oriented site, e.g. via WhatsApp. Redesigned 2026-07-17 with pricing tabs (`src/components/sections/welcome-pricing-tabs.tsx`: Mock Club, Group/Private Tuition, Holiday Booster, Complete Programme) and a sticky bottom booking bar (`welcome-sticky-cta.tsx`).
- `/admin`, `/admin/students`, `/admin/mocks`, `/admin/mocks/[id]/preview`.
- `/mocks`, `/mocks/[id]`, `/mocks/[id]/review`, `/mocks/[id]/report` (student-facing printable PDF report, released attempts only), `/mocks/[id]/print` (printable practice mocks — `printOnly: true`, no score/report, see Design Notes).
- `/admin/homework` — worksheet generator: pick subject/topic/difficulty/count from the question bank, print/PDF a worksheet + answer key.
- `/notes`, `/notes/maths`, `/notes/maths/numbers`, `/notes/maths/fractions-decimals-percentages`, `/notes/maths/ratio-proportion`, `/notes/maths/algebra`, `/notes/maths/geometry`, `/notes/maths/averages-statistics`.
- `/notes/english`, `/notes/english/grammar` (+ 5 topic pages), `/notes/english/comprehension`, `/notes/english/spelling`, `/notes/english/cloze` (each strand's first topic live; see Recent Feature State below).
- Marketing pages: `/pricing`, `/contact`, `/book-a-call`, `/about`, `/faq`, `/tuition`, `/tuition/group`, `/tuition/private`, `/diagnostic-assessment`, `/practice-packs`, `/holiday-booster`, `/privacy-policy`, `/terms`, `/safeguarding`. `/weekly-mock-club`, `/practice-paper-simulator`, `/complete-programme` still exist as page files but are redirected to `/pricing#platform` via `next.config.ts` (2026-07-20) — don't link to them, and don't bother updating their copy.

## Server/API Routes

- Auth: `src/app/api/auth/login/route.ts`, `register`, `logout`.
- Platform bootstrap: `src/app/api/platform/bootstrap/route.ts`.
- Admin student actions: approve, reject, assign plan, unlock mock, unlock first mock.
- Admin mock publishing: `src/app/api/admin/mocks/[id]/publish/route.ts`.
- Admin reports: feedback and release routes.
- Attempts: submit and score routes.
- Checkout and Stripe webhook scaffold: `src/app/api/checkout/route.ts`, `src/app/api/stripe/webhook/route.ts`.
- Contact form placeholder: `src/app/api/contact/route.ts`.

## Data Model

Prisma schema lives in `prisma/schema.prisma`.

Models: `User`, `Session`, `MockExam`, `Question`, `Passage`, `Attempt`, `MockUnlock`, `ReferenceSource`, `ProductPlan`, `EmailTemplate`, `PaymentRequest`. Enums: `Role`, `Subject`, `ReferenceStyle`, `AttemptStatus`, `PaymentStatus`, `PaymentRequestStatus`.

`ProductPlan` has `includedMockIds`/`includedNoteIds` (2026-07-17): assigning a plan to a student additively grants that bundle's mocks/notes via `set-content`/`assign-plan` admin routes — see Recent Feature State. The demo/seed catalog (`src/data/platform.ts`) plans are now Free/Pro/Max (2026-07-20, see Recent Feature State) plus Diagnostic/Group/Private/Holiday as separate non-gating entries; Free/Pro/Max's included-id lists are computed dynamically from `MOCKS`/`NOTE_PAGES` at module load, not hand-maintained.

Schema CLI commands (`migrate`/`push`) must use `DIRECT_URL` (port 5432), not the pooled `DATABASE_URL` — the pgbouncer transaction pooler on 6543 hangs indefinitely on schema commands. `prisma.config.ts` is already wired for this.

Seed/static catalog lives in `src/data/platform.ts`:
- Demo admin and students.
- Product plan placeholders.
- Original English passage.
- Original Maths/English sample questions.
- Published diagnostic sample mocks.
- Future VR/NVR placeholder mock shells.
- Sample attempts and reference sources.
- Email template placeholders.

## State Architecture

- `src/context/platform-context.tsx` is the client state bridge.
- It uses `useSyncExternalStore` with local memory plus `localStorage`.
- It calls server APIs where implemented, then falls back to local demo behavior.
- `src/lib/server/platform-store.ts` loads DB-backed bootstrap data when `DATABASE_URL` exists, otherwise returns seed/demo data.
- Generated draft mocks, question edits, clone/archive actions, and reference style edits are currently local/demo admin state, not durable database versioning.

## Recent Feature State

Full narrative history of what was built/changed and when now lives in `status.md` (read explicitly when needed) — this section only keeps facts a session needs to not regress or duplicate existing work.

- **Study Notes** (`src/components/notes/**`, `src/app/notes/**`): letterhead-styled study pages, separate from mocks. `notes-shell.tsx`/`notes-blocks.tsx` render content from `notes-content/*.ts`, paired with SVG diagrams in `notes-diagrams/*.tsx`. Theming in `notes-theme.ts`; CSS namespaced `nt-`/`notes-`.
  - **Maths**: 6 topics, 18 subtopics, fully live.
  - **English** (`/notes/english`, strand picker → Grammar/Comprehension/Spelling/Cloze): Grammar 5 of ~10 topics live (46 subtopics); Comprehension/Spelling/Cloze each have 1 of 10 topics live. Remaining scope tracked in `TODO.md`.
  - Notes progress now persists locally on-device (not yet synced via DB) — unblocks the gamification backlog in `TODO.md`.
- Mock data lives in `src/data/platform.ts`; question-id prefixes are namespaced per mock batch (`mh`, `mp`/`mq`/`mr`/`ms`, etc.) to avoid collisions — follow that convention when adding new mocks.
- Mock room visuals render via `src/components/platform/question-visuals.tsx` with hover/focus interactivity and animated draw-ins (`.qv-hit`/`.qv-mark`/`.qv-tooltip` in `globals.css`, respects `prefers-reduced-motion`). NVR/VR renderers are separate and untouched by the Maths visual work.
- Mock room: compact 50-question navigation, keyboard left/right, flagging, draft resume, submit confirmation, admin preview mode, timer show/hide toggle.
- Admin mock command centre: overview, drafts, published, generator, visual showcase, attempts, references, quality checks, archive. Clone duplicates a mock as unpublished `Admin draft`; Archive unpublishes + sets `tier: "Archived"`.
- VR/NVR practice mocks (`vr-placeholder`, `nvr-placeholder`) each have a first batch of 20 real questions and are switched on for students; full-length content still pending (`published: false`, `tier: "Future"`) — see `TODO.md`. Flagged in `COMPETITOR_GAP_ANALYSIS.md` as the biggest content gap vs. competitors.
- Admin note-progress/unlock API routes: `src/app/api/admin/notes/`, `src/app/api/admin/students/[id]/unlock-note/`, `src/app/api/admin/mocks/[id]/set-free/`.
- `QuestionRenderer` (`src/components/platform/ui.tsx`) applies a deterministic per-question `seededShuffle` to multiple-choice/cloze options app-wide (stable across renders) — don'+chr(39)+'t reintroduce a fixed/predictable option order. Segment-format "find the mistake" questions (`SegmentMistakeAnswer`) keep the sentence clauses in fixed reading order (they have to, to stay grammatically sensible) but shuffle which *letter* labels which clause per question via a second `seededShuffle(pool, question.id + "-letters")` — this is what actually fixes the correct-letter-clustering bug, not the option shuffle. `ClozeGapRenderer` must receive the already-shuffled `options` from `QuestionRenderer` (a dedicated `options` prop) rather than reading `question.options` itself — every cloze template in `mock-generation.ts` hardcodes the correct answer at `options[0]`, so a caller that forgets to pass the shuffled list will silently make every cloze question'+chr(39)+'s correct letter "A" (this exact regression existed and was fixed 2026-07-20).
- **English mock section structure** (`src/lib/english-sections.ts`): every English mock'+chr(39)+'s questions are grouped into GL'+chr(39)+'s real fixed section order at render time — comprehension → spelling → punctuation → cloze — via `getEnglishSectionId()`, which reads tags/questionType rather than a stored field, so it works for both generator output and hand-authored fixtures. `ENGLISH_SECTIONS` holds the researched GL weights (52/17/17/15%, see `research/gl-english-question-bank.md`) used both for section-size allocation in `mock-generation.ts`'+chr(39)+'s `generateEnglishGLStyleMock()` and for `mock-quality.ts`'+chr(39)+'s balance check. All 13 published English mocks (including the pre-existing Elite/stretch/100-question ones, not just the new generator output) classify cleanly into all 4 sections with zero "undefined" — reclassification via tags, not physical mock regeneration, is what makes this work across the whole roster.
- **Comprehension side-by-side mock-room layout** (`mock-room-shell.tsx`): comprehension questions render in a two-column grid — the linked passage in a sticky, independently-scrollable left column (`lg:sticky lg:top-24`, via `EnglishPassageRenderer`'+chr(39)+'s `scrollClassName` prop) and the question/answers in the right column, collapsing to one stacked column below `lg`. `QuestionRenderer` still needs the real `passage` prop passed through in this layout (for its own quality-warning check) but with the new `hidePassage` flag set, so it doesn'+chr(39)+'t also render its own inline copy of the passage underneath.
- A once-per-section `SectionInterstitial` ("Section N of 4" + GL-style instructions + "Begin this section") shows the first time a student'+chr(39)+'s active question enters a new section, plus a persistent section-progress strip in the mock-room toolbar.
- Elite mock descriptions intentionally omit expected score bands (tutor-facing calibration info, not for students).
- Student dashboard has no "locked mocks" section by design — students should only see mocks they can access.
- `src/lib/assessment.ts` has `autoGenerateReport()`/`patternDescription()` (built on `analyseAttempt()`) powering the admin "Auto-fill statistics report" button and the student review page's missed-marks-per-topic + pattern label.
- Student account settings live at `/dashboard/settings`: name/password change (`/api/account/update`, DB-backed when configured, no-op-but-ok in demo mode) and a dashboard-scoped dark mode toggle (`data-dashboard-theme` attribute + CSS variable overrides in `globals.css` — not a full site theme system).
- Parent/family view at `/dashboard/family`: `lessonsRemaining`/`upcomingLessons` optional fields on `StudentAccount`/`User`, currently admin-editable via an inline collapsible editor on the admin students page — no real booking system yet, and the payment section explicitly states it populates once Stripe is connected.
- A demo student test account exists for founder testing: `student-demo-testing` / Priya Chen (`priya.demo@summittuition.local`). No isolated staging environment — `npm run dev` on localhost is the recommended pre-push testing workflow.
- Admin students UX: `AdminStudentsWorkspace`'s top panel only ever lists accounts an admin has manually paused (`approved: false`) — it is NOT a new-signup review queue (registration grants instant access, see Main Product Flows). The rest of the page uses a collapsed-by-default `UnlockPanel` per student (search, grouped-by-subject unlock/lock-all, running unlock count) rather than one flat block of checkboxes.
- Admin Attempts tab (`admin-mocks-command-centre.tsx`) resolves the real student name from `usePlatform()`'s `users` list per `attempt.studentId` — don't reintroduce a hardcoded placeholder name.
- Elite-difficulty mock roster includes `maths-elite-1` (80 questions, all 6 Maths topics) and four full-length Elite English papers, all 54 marks/54 questions in the same 28 comprehension/9 spelling/9 grammar-mistake/8 cloze GL layout: `english-gl-8-elite` ("The Cartographer's Apprentice"), `english-gl-9-elite` ("The Glass-Blower's Legacy"), `english-gl-10-elite` ("The Weaver's Last Thread"), and `english-gl-11-elite` ("The Lighthouse Keeper's Ledger", added 2026-07-20). Deferred Elite mocks are tracked in `TODO.md`.
- **2026-07-17 session**: fixed a critical demo-mode auth bypass — demo sessions (no `DATABASE_URL`) previously encoded the raw user id directly in the `summit_session` cookie, so setting `summit_session=admin-1` forged admin access with no login. Demo sessions now use an unguessable random token backed by an in-memory map, matching the DB-backed model; production also now hard-refuses to fall into demo auth if `DATABASE_URL` is missing, instead of silently degrading. Pricing page also fixed: layout was branching on `tiers.length === 3` but every group now has exactly one tier post-consolidation, so every section rendered as a single cramped card — replaced with one unified responsive grid.
- **2026-07-17 session**: student dashboard applies goal-gradient/reciprocity UX patterns — onboarding never shows 0% (registration + free mock unlock always count as complete steps), and raw scores surface immediately on submission instead of being withheld until report release (`src/components/platform/dashboards.tsx`).
- **2026-07-17 session**: `ProductPlan` bundles — `includedMockIds`/`includedNoteIds` fields let admins define what each plan grants via a new bundle editor on the admin students page; assigning a plan to a student now additively unlocks its bundle (`src/app/api/admin/plans/[id]/set-content/route.ts`, `assign-plan/route.ts`).
- **2026-07-20 session (first pass, time-boxed)**: Pricing rebranded from named products to a **Free/Pro/Max** tier ladder for the digital platform (mocks + Study Notes) — Free (£0): 1 diagnostic-style mock/subject + first Study Notes topic per strand; Pro: full mock library except `tier: "Elite"` mocks, all Study Notes; Max: everything Pro has plus Elite-difficulty mocks. Group/Private Tuition, Holiday Booster, and Diagnostic Assessment remain separate, non-tiered products, unchanged. `PRODUCT_PLANS` in `src/data/platform.ts` now computes Free/Pro/Max's included mock/note ids dynamically from existing `mock.isFree`/`mock.tier`/`note.isFree` fields (see Data Model) instead of hand-typed lists. `src/data/pricing.ts`'s old `MOCK_CLUB_PRICING`/`PRACTICE_SIMULATOR_PRICING`/`PROGRAMME_PRICING` exports are now backward-compat aliases onto the new `PLATFORM_TIER_PRICING` (Pro/Pro/Max respectively) so the not-yet-migrated dedicated pages keep compiling. **Not yet done**: the dedicated `/weekly-mock-club`, `/practice-paper-simulator`, `/complete-programme` marketing pages and `nav.ts`'s footer still show old product names/copy; no Stripe Price IDs wired to the new tiers yet (Stripe integration setup was in progress separately this session, blocked on interactive OAuth).
- **2026-07-20 session (same-day streamlining follow-up)**: founder feedback on the first pass — removed `PricingCard`'s uppercase "Most guided route/Focused start/Flexible plan" eyebrow line entirely; repriced Pro to **£39/month** and Max to **£69/month** (`/month` billing confirmed for Max, not `/week`, since it no longer bundles tuition); the main `/pricing` buying grid (`PLATFORM_TIER_PRICING_FOR_SALE` in `src/data/pricing.ts`) now deliberately excludes the Free tier to reduce choice overload and push Pro — Free is still fully functional via `/register`, just not shown as a card to "buy" alongside Pro/Max, with a small text link left in its place. `/welcome`'s `WelcomePricingTabs` relabelled its Mock Club/Complete Programme tabs to Pro/Max and now opens on the Pro tab by default.
- **2026-07-20 session (same-day, site-wide follow-up)**: extended the rebrand everywhere the old product names still appeared — homepage (`src/app/page.tsx`), tuition comparison table, nav footer, contact/book-a-call product dropdowns (`InterestedProduct` union in `src/types/contact.ts`), FAQ, terms, safeguarding copy, and demo/seed account `plan` strings. Homepage's three separate Mock Club/Simulator/Complete Programme sections were merged into one Pro/Max section using `PLATFORM_TIER_PRICING_FOR_SALE`. `comparison-table.tsx` dropped its third "Complete Programme" column (retired) down to Group vs. Private only; `ComparisonRow` type lost its `programme` field to match. `/weekly-mock-club`, `/practice-paper-simulator`, `/complete-programme` page files are untouched but now unreachable — `next.config.ts` redirects all three to `/pricing#platform` since nothing links to them and their copy was never rewritten (cheaper than a full content rewrite of pages nothing points at). New component `src/components/sections/free-sample-mock.tsx` (`FreeSampleMock`) — a self-contained, no-login-required 5-question interactive teaser (4 original maths MCQs + 1 real retrieval question/passage excerpt reused from the free diagnostic sample mock's `e1`/`passage-hilltop-observatory`) placed directly under the hero on the homepage; after question 5 it locks into a score + "Register Free" / "See Pro & Max" CTA panel rather than continuing indefinitely — deliberately separate from the existing single-question `TryAQuestion` already embedded in the hero visual, which was left as-is.

## Design Notes

- Keep the app as a product/tool first, not a generic landing page.
- Use existing components in `src/components/ui`, `src/components/layout`, `src/components/sections`, and `src/components/platform`.
- The current visual identity uses navy, gold, cream, white, and restrained motion.
- Scored mocks stay online-only — do not add PDF downloads or print views of the exam content itself. The one exception: once a report is released, the student's *marked report* (score, topic breakdown, missed questions) is printable/PDF-able at `/mocks/[id]/report`, mirroring the admin's `/admin/reports/[attemptId]` view (`AdminAttemptReport` with `audience="student"`) — this was a deliberate 2026-07-19 fix, not a regression of the "no PDF" rule, which still applies to the underlying mock questions/content.
- A separate "Printable Practice" mock category is allowed: mocks with `printOnly: true` on `MockExam`, rendered via a plain browser `@media print` view (`/mocks/[id]/print`, `src/app/globals.css`) — no PDF generation library, no score, no report. Keep this category clearly distinct from scored online mocks in UI copy.
- Do not copy third-party paper content. Reference sources are metadata only.

## Known Limitations

- Auth/session/password handling works for the demo and current app; the critical demo-mode session-forging bypass was fixed 2026-07-17 (see Recent Feature State), but the area still hasn't had a full production security hardening pass.
- Full mock content is bundled client-side for demo speed; move sensitive content server-side before production.
- Stripe is scaffolded but not live until keys/webhook are configured.
- Email provider is a placeholder and logs in development.
- Generated mocks and admin draft edits need durable database persistence/versioning in a later pass.
- Clone/archive currently follow the existing local draft mock model rather than writing to Prisma.

## Environment Variables

Full list with defaults lives in `.env.example` — read it directly when you need exact names. Notable non-obvious ones: `DATABASE_URL` unset falls back to localStorage demo mode; `ADMIN_GENERATION_SECRET` is a temporary guard for server-side admin AI generation until cookie auth/database is fully adopted in the UI; `MOCK_GENERATION_PROVIDER` defaults to `deterministic` (no AI key needed) with `OPENAI_*`/`ANTHROPIC_*` as opt-in.

## How To Run Locally

```bash
npm install
copy .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm.cmd run dev
```

Open `http://localhost:3000`. Works with zero env vars set (falls back to in-browser demo/localStorage mode); set `DATABASE_URL` for a shared Postgres-backed instance across browsers. See README.md "Master Admin Setup" and "Student And Mock Access Test" sections above for the manual walkthrough.

## Verification

Use these commands on Windows:

```bash
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

If Playwright needs the local server, the config uses `scripts/playwright-dev-server.ps1`.

## Files By Area

- Config: `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `playwright.config.ts`, `prisma.config.ts`.
- App shell: `src/app/layout.tsx`, `src/app/globals.css`.
- Shared data: `src/data/site.ts`, `pricing.ts`, `products.ts`, `platform.ts`, `nav.ts`, `faq.ts`, `sample-report.ts`.
- Shared types: `src/types/platform.ts`, `pricing.ts`, `product.ts`, `nav.ts`, `faq.ts`, `contact.ts`.
- Server libs: `src/lib/server/auth.ts`, `db.ts`, `platform-store.ts`, `ai-generation.ts`.
- Domain libs: `src/lib/assessment.ts`, `mock-generation.ts`, `mock-quality.ts`, `stripe.ts`, `utils.ts`.
- Platform UI: `src/components/platform/*`.
- Study Notes: `src/components/notes/*`, `src/app/notes/**`.
- Marketing sections: `src/components/sections/*`.
- Layout/UI primitives: `src/components/layout/*`, `src/components/ui/*`, `src/components/motion/*`.
- Tests: `tests/admin-nav-and-mock-room.spec.ts`, `admin-approve-and-unlock-flow.spec.ts`, `student-mock-flow.spec.ts`, `new-features.spec.ts`, shared login helper in `tests/helpers.ts` (demo mode needs both the `summit_session` cookie and the `summit-platform-session-v1` localStorage key set — see its doc comment; a spec file that only sets the cookie will silently redirect to /login and hang every subsequent locator).
- Research notes: `research/*.md`.
