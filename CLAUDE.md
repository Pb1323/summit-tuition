@AGENTS.md

# Summit Tuition Project Context

Last updated: 2026-07-13. Plain-English project status and forward-looking roadmap live in `status.md` and `TODO.md` — read those first for current state/next steps; this file is the technical companion, and it's what's auto-loaded into every session (unlike `status.md`/`TODO.md`, which must be read explicitly).

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
- `npm.cmd run lint` passes.
- `npm.cmd run build` passes.
- PowerShell blocks `npm.ps1`, so use `npm.cmd` on Windows.
- Current working tree had pre-existing edits excluding `legacy/` from lint/typecheck and fixing the README root directory note.
- `legacy/` is an older site snapshot and is intentionally ignored by git/lint/typecheck.
- `next/font/google` was removed from `src/app/layout.tsx`; the app now uses a system font stack in `src/app/globals.css` so builds do not depend on fetching Google Fonts.

## Main Product Flows

- Public marketing routes explain diagnostic assessments, tuition, mocks, practice packs, pricing, FAQs, policies, and booking/contact.
- Students open interactive Study Notes at `/notes` (subject index) and `/notes/maths/[topic]` (Numbers, Fractions/Decimals/Percentages, Ratio & Proportion, Algebra, Geometry, Averages & Statistics), wired in from the student dashboard.
- Students register at `/register`, choose a plan, and remain pending until admin approval.
- Admin signs in at `/login`, opens `/admin`, approves students, assigns plans, and unlocks mocks.
- Students open `/dashboard`, start unlocked online mocks, autosave drafts, submit attempts, then wait for admin release.
- Admin opens `/admin/mocks` to inspect mocks, generate draft mocks, publish/unpublish, preview as student, review attempts, add feedback, and release reports.
- Released attempts can be reviewed by students at `/mocks/[id]/review`.

## Important Routes

- `/` landing page.
- `/login`, `/register`, `/dashboard`.
- `/admin`, `/admin/students`, `/admin/mocks`, `/admin/mocks/[id]/preview`.
- `/mocks`, `/mocks/[id]`, `/mocks/[id]/review`.
- `/notes`, `/notes/maths`, `/notes/maths/numbers`, `/notes/maths/fractions-decimals-percentages`, `/notes/maths/ratio-proportion`, `/notes/maths/algebra`, `/notes/maths/geometry`, `/notes/maths/averages-statistics`.
- `/notes/english`, `/notes/english/grammar` (+ 5 topic pages), `/notes/english/comprehension`, `/notes/english/spelling`, `/notes/english/cloze` (each strand's first topic live; see Recent Feature State below).
- Marketing pages: `/pricing`, `/contact`, `/book-a-call`, `/about`, `/faq`, `/tuition`, `/tuition/group`, `/tuition/private`, `/diagnostic-assessment`, `/weekly-mock-club`, `/practice-paper-simulator`, `/practice-packs`, `/complete-programme`, `/holiday-booster`, `/privacy-policy`, `/terms`, `/safeguarding`.

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
- `QuestionRenderer` (`src/components/platform/ui.tsx`) applies a deterministic per-question `seededShuffle` to multiple-choice/cloze options app-wide (stable across renders) — don't reintroduce a fixed/predictable option order. Segment-format "find the mistake" questions keep fixed lettered order since letters map to sentence positions, not shuffleable content.
- Elite mock descriptions intentionally omit expected score bands (tutor-facing calibration info, not for students).
- Student dashboard has no "locked mocks" section by design — students should only see mocks they can access.
- `src/lib/assessment.ts` has `autoGenerateReport()`/`patternDescription()` (built on `analyseAttempt()`) powering the admin "Auto-fill statistics report" button and the student review page's missed-marks-per-topic + pattern label.

## Design Notes

- Keep the app as a product/tool first, not a generic landing page.
- Use existing components in `src/components/ui`, `src/components/layout`, `src/components/sections`, and `src/components/platform`.
- The current visual identity uses navy, gold, cream, white, and restrained motion.
- Scored mocks stay online-only — do not add PDF downloads or print views for marked mocks.
- A separate "Printable Practice" mock category is allowed: mocks with `printOnly: true` on `MockExam`, rendered via a plain browser `@media print` view (`/mocks/[id]/print`, `src/app/globals.css`) — no PDF generation library, no score, no report. Keep this category clearly distinct from scored online mocks in UI copy.
- Do not copy third-party paper content. Reference sources are metadata only.

## Known Limitations

- Auth/session/password handling works for the demo and current app but still needs production hardening.
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
- Tests: `tests/admin-nav-and-mock-room.spec.ts`.
- Research notes: `research/*.md`.
