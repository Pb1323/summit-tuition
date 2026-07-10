# Summit Tuition Project Context

Last updated: 2026-07-09

## Sibling Projects In This Repo

This repo root also contains two other, separate Next.js projects living alongside this one (not part of this app, each has its own PROJECT_CONTEXT.md):

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

Key models:
- `User`, `Session`, `MockUnlock`.
- `MockExam`, `Question`, `Passage`, `Attempt`.
- `ReferenceSource`, `ProductPlan`, `EmailTemplate`.
- `PaymentRequest`.

Full model/enum list from `prisma/schema.prisma`: enums `Role`, `Subject`, `ReferenceStyle`, `AttemptStatus`, `PaymentStatus`, `PaymentRequestStatus`; models `User`, `Session`, `MockExam`, `Question`, `Passage`, `Attempt`, `MockUnlock`, `ReferenceSource`, `ProductPlan`, `EmailTemplate`, `PaymentRequest`.

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

- Mock room visuals have been polished with dedicated renderers in `src/components/platform/question-visuals.tsx`.
- The mock room supports compact 50-question navigation, keyboard left/right movement, flagging, draft resume, submit confirmation, and admin preview mode.
- Admin mock command centre includes overview, drafts, published, generator, visual showcase, attempts, references, quality checks, and archive.
- Clone and archive buttons now work:
  - Clone duplicates a mock and its questions as an unpublished `Admin draft`.
  - Archive unpublishes a mock, sets `tier` to `Archived`, and moves it to the Archive section.
- Playwright coverage includes admin nav/session persistence and 50-question navigator desktop/mobile screenshots.

## Design Notes

- Keep the app as a product/tool first, not a generic landing page.
- Use existing components in `src/components/ui`, `src/components/layout`, `src/components/sections`, and `src/components/platform`.
- The current visual identity uses navy, gold, cream, white, and restrained motion.
- Do not add PDF downloads or printable mocks.
- Do not copy third-party paper content. Reference sources are metadata only.

## Known Limitations

- Auth/session/password handling works for the demo and current app but still needs production hardening.
- Full mock content is bundled client-side for demo speed; move sensitive content server-side before production.
- Stripe is scaffolded but not live until keys/webhook are configured.
- Email provider is a placeholder and logs in development.
- Generated mocks and admin draft edits need durable database persistence/versioning in a later pass.
- Clone/archive currently follow the existing local draft mock model rather than writing to Prisma.

## Environment Variables (from `.env.example`)

- App: `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_SHORT_NAME`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`.
- Booking embed: `NEXT_PUBLIC_CALENDLY_URL`.
- Database: `DATABASE_URL`, optional `DIRECT_URL` (Supabase Postgres recommended; without it the app runs on the localStorage demo fallback).
- Auth/session: `AUTH_SECRET`, `AUTH_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
- Admin seed: `ADMIN_EMAIL` (defaults to `admin@summittuition.local`), `ADMIN_PASSWORD` (never commit a real one).
- Stripe: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.
- Email (Resend-compatible): `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_NOTIFICATION_EMAIL`.
- AI mock generation: `MOCK_GENERATION_PROVIDER` (default `deterministic`), `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_BASE_URL`, `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`.
- `ADMIN_GENERATION_SECRET` — temporary guard for server-side admin AI generation until cookie auth/database is fully adopted in the UI.

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
- Marketing sections: `src/components/sections/*`.
- Layout/UI primitives: `src/components/layout/*`, `src/components/ui/*`, `src/components/motion/*`.
- Tests: `tests/admin-nav-and-mock-room.spec.ts`.
- Research notes: `research/*.md`.
