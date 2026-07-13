# Summit Tuition

Premium online 11+ mock exam platform for English and Maths mocks, manual access approval, admin marking, report release and progress review.

## Run Locally

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

Open `http://localhost:3000`.

## Deploying To Vercel

1. Push this repo to GitHub.
2. Go to Vercel and click **New Project**.
3. Import the GitHub repo.
4. Select the correct root directory. If this repo is imported directly, keep the root as `/`. If it is inside a larger monorepo, select `Summit-Tuition`.
5. Framework preset: **Next.js**.
6. Add environment variables from `.env.example`.
7. Deploy.
8. After deploy, set `NEXT_PUBLIC_SITE_URL`, `AUTH_URL` and `NEXTAUTH_URL` to the Vercel production URL.
9. Redeploy after environment variable changes.
10. For real payments, add the Stripe webhook URL from the Vercel deployment to the Stripe dashboard and set `STRIPE_WEBHOOK_SECRET`.

Package scripts are Vercel-compatible:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

No `vercel.json` is needed for the current app.

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Do not commit real secrets.

Key variables:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_SHORT_NAME`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CALENDLY_URL`
- `DATABASE_URL` for hosted Postgres persistence
- `DIRECT_URL` if your Postgres provider supplies a separate direct migration URL
- `AUTH_SECRET`, `AUTH_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` for deployment/session configuration
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` only for a future seed script, never a real committed secret
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Master Admin Setup

The seeded master admin email is stored in `src/data/platform.ts`:

```text
admin@summittuition.local
```

No password is committed. With `DATABASE_URL` configured, create/update the master admin by sending a `PUT` request to `/api/auth/login` with `ADMIN_EMAIL` and `ADMIN_PASSWORD`, or run the same request locally before deployment. Without a database, local demo fallback still lets the seeded admin sign in in one browser profile.

To test admin locally:

1. Visit `/login`.
2. Use `admin@summittuition.local`.
3. Enter any password with at least 8 characters on first run.
4. You should land on `/admin`.

## Student And Mock Access Test

1. Visit `/register`.
2. Create a student account and choose a plan.
3. Sign in at `/login`.
4. The account is pending until admin approves it.
5. Sign in as admin and open `/admin`.
6. Approve the student, assign a plan and unlock `Maths Diagnostic Sample` or `English Diagnostic Sample`.
7. Return to `/dashboard` as the student.
8. Start the mock, answer questions and submit.
9. Sign in as admin, add feedback and release the report.
10. Return as the student and open review mode from `/dashboard`.

## Seed Data

Seeded data lives in `src/data/platform.ts`:

- master admin account shell
- sample approved and pending students
- sample Maths and English GL-style mocks
- original questions, mark schemes and explanations
- original English passage
- sample completed attempt with released report
- sample submitted attempt with pending report
- GL/non-GL/unknown reference library entries
- products, pricing placeholders and email placeholders

## Edit The Brand

Change `src/data/site.ts`, or set:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_SHORT_NAME`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

The brand name, short name, metadata, email, phone, URL and social links are centralised there.

## Products And Prices

Marketing pricing lives in `src/data/pricing.ts`.
Platform/admin placeholders live in `src/data/platform.ts` under `PRODUCT_PLANS`.

## Stripe

Checkout structure exists:

- `src/app/api/checkout/route.ts`
- `src/lib/stripe.ts`
- `src/components/ui/checkout-button.tsx`

Until `STRIPE_SECRET_KEY` is configured, checkout returns a safe "Checkout coming soon" state.

Payment must not automatically unlock content. In production, Stripe payment success should create or update a pending access request. Admin then manually approves the student and unlocks specific mocks.

## Database And Storage

With `DATABASE_URL` configured, the important testing flows are server/database-backed:

- student registration and pending approval
- admin approval/rejection
- plan assignment
- mock unlocks
- submitted attempts
- admin feedback and report release
- server sessions

The app still keeps a browser `localStorage` fallback for local demo mode when `DATABASE_URL` is missing. In Vercel, configure hosted Postgres so admin and student state is shared across browsers and devices.

The static catalog in `src/data/platform.ts` is used as an idempotent seed source for products, reference sources, sample mocks, questions, passages and email placeholders. Fake named students are not required for production testing.

## Supabase / Postgres Setup

Supabase is used as hosted Postgres only; Supabase Auth is not required for this version.

1. Create a Supabase project.
2. Copy the Postgres connection string.
3. Add `DATABASE_URL` to Vercel. Use the pooled connection string for serverless if Supabase recommends it.
4. Add `DIRECT_URL` if you use a separate direct connection for migrations.
5. Run the schema push against the database:

```bash
npm run prisma:push
```

6. Deploy or redeploy Vercel.
7. Create the master admin by calling:

```bash
curl -X PUT "$NEXT_PUBLIC_SITE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -H "x-admin-bootstrap-secret: $ADMIN_BOOTSTRAP_SECRET" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}"
```

This endpoint is gated by `ADMIN_BOOTSTRAP_SECRET` — set it in Vercel before deploying, and pass it via the `x-admin-bootstrap-secret` header. Without a matching secret the endpoint refuses the request, so an attacker who merely knows/guesses `ADMIN_EMAIL` cannot take over the admin account. Consider unsetting `ADMIN_BOOTSTRAP_SECRET` in Vercel again once the admin account is created, and only restoring it temporarily if you need to rotate the admin password this way in future.

8. Sign in as admin, visit `/admin/students`, and approve/unlock registered students.
9. Register a student in another browser/profile and confirm that the pending student appears in admin.

## Admin Approval Flow

1. Student registers at `/register`.
2. Student chooses a requested plan.
3. Payment status remains pending/paid structure only in the demo.
4. Admin signs in at `/login`.
5. Admin opens `/admin` or `/admin/students`.
6. Admin approves/unapproves the student, assigns plan/tier and manually unlocks specific mocks.
7. For a quick demo, admin can use **Create Test Student** and **Approve + Unlock First Mock**.

When `DATABASE_URL` is configured, approval is cross-browser and cross-device because admin pages load users from the database. The localStorage path is fallback-only for local demos without Postgres.

## Create And Publish Mocks

In `/admin/mocks`:

- publish/unpublish mocks
- view the question bank
- add reference URLs
- classify references as GL-style, non-GL or unknown
- generate an original GL-style draft mock from selected GL-style reference metadata

The default flow is GL only. Non-GL references are separated and are not used for default mock generation.

## Release Reports

After a student submits a mock, the student sees:

```text
Your mock has been submitted. Your result and review will be released after marking.
```

Admin can view submitted attempts, add manual feedback and release the report. Once released, the student can see score, topic breakdown, weak topics, explanations, mark schemes and full review mode.

## Add Future VR/NVR

Types already support `VR` and `NVR`, including future question types. Add questions to `QUESTIONS`, add question IDs to a draft mock in `MOCKS`, and publish when ready. NVR diagrams should use generated SVG/canvas/code data, not copied paper assets.

## Study Notes

Interactive study notes live at `/notes` (subject index) and `/notes/maths/[topic]`, separate from the mock/exam system. Content and diagrams are defined in `src/components/notes/notes-content/*.ts` and `src/components/notes/notes-diagrams/*.tsx`; see `CLAUDE.md` for the full file map.

## Content Rules

- No PDF downloads.
- No printable versions.
- Mocks require login.
- Only approved students with unlocked mocks can sit online exams.
- Full mock content is kept in app data for this demo; move it server-side before production.
- Reference sources are used only to infer structure, timing, difficulty and topic distribution.
- Do not copy copyrighted GL, CEM, MME or third-party question text, passages, diagrams or mark schemes unless explicitly licensed.

## Known Production Limitations

- Server sessions and password hashes are implemented for the current app, but a full production auth hardening pass is still recommended before taking real payments or sensitive student data.
- Full mock question data is currently bundled client-side for demo speed.
- Stripe checkout is structured but not live until keys and webhook handling are added.
- Email templates are placeholders only; no real email provider is configured.
- Admin-generated mocks still need full database persistence/versioning in a later pass.
- The online mock room has casual copy/print deterrents, not DRM.

## Verification Commands

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
```
