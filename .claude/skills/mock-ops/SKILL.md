---
name: mock-ops
description: Day-to-day operational workflow for running the Summit Tuition platform as a solo founder — approving students, unlocking/publishing mocks, auditing mock quality, and checking pre-push health. Use when asked to walk the admin flow, audit mocks, or before pushing changes.
---

# Summit Tuition day-to-day ops

Solo-founder workflow for running the platform in `src/`, not a general Next.js
guide — see `CLAUDE.md` (repo root) for architecture and current state,
and re-read it first since it's meant to be kept current.

## Core admin flow (student lifecycle)

1. Student registers (`/register`) → stays pending.
2. Admin (`/admin` → `src/app/api/admin` student routes) approves, assigns a plan.
3. Admin unlocks a mock for the student (`unlock mock` / `unlock first mock` routes, `src/context/platform-context.tsx` bridges this to the UI).
4. Student attempts the mock at `/mocks/[id]`, autosaves drafts, submits.
5. Admin reviews the attempt in `/admin/mocks`, adds feedback, releases the report.
6. Student reviews released attempt at `/mocks/[id]/review`.

When asked to "test the full flow" or "walk through admin," drive exactly this
sequence rather than re-deriving it — it's the one path every other feature
hangs off.

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
- Auth/session handling is demo-grade, not production-hardened — flag this
  before any change that widens what an unauthenticated or student-role
  request can do.
- Clone/archive follow the local draft mock model, not Prisma writes.
