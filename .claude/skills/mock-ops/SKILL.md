---
name: mock-ops
description: Day-to-day operational workflow for running the Summit Tuition platform as a solo founder — approving students, unlocking/publishing mocks, auditing mock quality, and checking pre-push health. Use when asked to walk the admin flow, audit mocks, or before pushing changes.
---

# Summit Tuition day-to-day ops

Solo-founder workflow for running the platform in `src/`, not a general Next.js
guide — see `CLAUDE.md` (repo root) for architecture and current state,
and re-read it first since it's meant to be kept current.

## Core admin flow (student lifecycle)

Signup is now frictionless, not gated — this changed from the original
manual-approval model, so don't assume a fresh registration needs an admin
to unblock it:

1. Student registers (`/register`, `src/app/api/auth/register/route.ts`) →
   **auto-approved immediately** (`approved: true` on create, no pending
   state), and auto-granted whichever mocks/notes strands are currently
   marked `isFree` (one English mock, one Maths mock, one notes strand by
   convention) via `MockUnlock`/`NoteUnlock` upserts done inline in the
   register route.
2. Founder marks which mock/notes strand is "free" from the admin panel
   (`set-free` routes: `src/app/api/admin/mocks/[id]/set-free/route.ts`,
   `src/app/api/admin/notes/[id]/set-free/route.ts`) — this is what new
   signups actually receive, so check these before assuming a student has
   no access.
3. Admin grants further access per student from `/admin` (assign a plan,
   unlock additional mocks via `unlock mock`/`unlock first mock` routes,
   unlock additional notes strands via
   `src/app/api/admin/students/[id]/unlock-note/route.ts` —
   `src/context/platform-context.tsx` bridges all of this to the UI).
4. Admin can permanently delete a student account (`admin-students-workspace.tsx`
   / `dashboards.tsx` "Delete account" button, gated behind `window.confirm`;
   cascades attempts/unlocks via the existing reject route) — treat this as a
   real destructive action when testing, not a no-op toggle.
5. Student attempts the mock at `/mocks/[id]`, autosaves drafts, submits.
6. Admin reviews the attempt in `/admin/mocks`, adds feedback, releases the report.
7. Student reviews released attempt at `/mocks/[id]/review`.

When asked to "test the full flow" or "walk through admin," drive exactly this
sequence rather than re-deriving it — it's the one path every other feature
hangs off. **`CLAUDE.md`'s "remain pending until admin approval" line is now
stale** — flag/fix it if you're touching that doc, since 35da448 (Frictionless
signup) changed the model but didn't update every line of prose describing it.

## Auth/session hardening (as of `ce0b717`)

- `PUT /api/auth/login` (creates/resets the master admin) now requires an
  `ADMIN_BOOTSTRAP_SECRET` header match (`x-admin-bootstrap-secret`) — it used
  to be reachable by anyone who knew `ADMIN_EMAIL`, a full account-takeover
  hole. Don't remove this gate or make it optional.
- A lightweight in-memory rate limiter (`src/lib/server/rate-limit.ts`,
  `isRateLimited`/`clientIp`) is applied per-IP and per-email on login,
  registration, the admin bootstrap endpoint, and the contact form. It's
  fixed-window and per-instance (doesn't share state across Vercel serverless
  instances/regions) — explicitly *defense-in-depth*, not a hard guarantee;
  don't present it as solving brute-forcing at scale.
- `getPlatformBootstrap`/`platform-store.ts` now redacts `correctAnswer`,
  `markScheme`, and `explanation` from every question shipped to a
  non-admin **unless** it belongs to an attempt with a released report
  (`redactQuestionsForStudent`, `revealedQuestionIds`) — previously every
  question for every mock (even unsat ones) shipped answers to the client on
  every page load. Grading in `/api/attempts/submit` reads question data
  independently server-side, so redaction doesn't affect scoring — if you
  touch scoring, keep it that way (don't make submit depend on the
  client-visible, possibly-redacted question object).
- When adding any new field to `Question` that could reveal an answer
  (a new visual payload, a new hint field, etc.), extend
  `redactQuestionsForStudent` to strip it too — it's an allowlist of what's
  safe to ship, not automatic.

## Mock content pipeline

- `src/lib/mock-generation.ts` generates Maths/English mocks from a
  `ReferenceSource` (`GenerateMockInput.subject` is currently typed to
  `"Maths" | "English"` only — NVR/VR generation doesn't exist yet, see
  [[question-visual-design]] for what's needed to add it).
- Generated mocks are drafts (`src/components/platform/admin-mocks-command-centre.tsx`)
  until published; publish/unpublish/clone/archive all live there.
- `src/lib/mock-quality.ts` runs structural checks (visual ratio, passage
  length, paragraph refs) — treat a quality-check failure as a blocker before
  publishing, not a suggestion.

## Before every push

Run, in order, and don't skip on time pressure — `CLAUDE.md` states
these currently pass, so a regression here is a signal something's wrong:

```bash
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

PowerShell blocks `npm.ps1` on this machine — always use `npm.cmd`, not `npm`.

Update `CLAUDE.md` before pushing if the change affects architecture,
routes, data model, or known limitations — it's the recovery point for a cold
session and goes stale fast otherwise.

## Known limitations to keep in mind when scoping new work

- Generated draft mocks and admin edits are local/demo state, not durably
  versioned in Prisma yet.
- Stripe is scaffolded but inert until real keys/webhook are configured —
  don't assume checkout is live.
- Auth/session handling has had a real hardening pass (bootstrap gate, rate
  limits, answer redaction — see above) but is still not fully
  production-audited — flag this before any change that widens what an
  unauthenticated or student-role request can do, and double-check any new
  admin/student-boundary route follows the same pattern as the ones above
  rather than assuming the boundary is already airtight everywhere.
- Clone/archive follow the local draft mock model, not Prisma writes.
- `src/data/platform.ts` accumulates large mock/question additions from
  parallel sessions — always check `git status` before editing it, and never
  resolve, continue, or abort an in-progress merge/cherry-pick you didn't
  start without asking first.
