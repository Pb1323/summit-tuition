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
4. Select the correct root directory. If this repo is imported directly, keep the root as `/`. If it is inside a larger monorepo, select `Tuition+mocks`.
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
- `DATABASE_URL` for the future hosted database
- `AUTH_SECRET`, `AUTH_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` for the future production auth layer
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

No password is committed. On first local sign-in, enter that email and choose a password of at least 8 characters. The demo stores a local password hash in browser `localStorage`.

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
6. Approve the student, assign a plan and unlock `Maths GL-Style Mock 1` or `English GL-Style Mock 1`.
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

Current storage is demo/local-only:

- accounts, approvals, attempts, report release state and admin edits are stored in browser `localStorage`
- seed data is static TypeScript in `src/data/platform.ts`
- no SQLite, Prisma, JSON file writes or persistent local filesystem storage are used
- API routes are serverless-safe placeholders and do not rely on local disk writes

Production TODO:

- move users, password hashes, sessions, approvals, unlocks, attempts, reports, products and reference library entries into hosted Postgres
- suitable providers include Neon, Supabase, Vercel Postgres or another managed Postgres provider
- add real auth such as Auth.js/NextAuth, Clerk, Supabase Auth or a server-side session implementation
- keep mock content and mark schemes server-side so full question data is not shipped publicly to the browser
- use Stripe webhooks to record paid/pending access requests, then keep manual admin approval as the unlock step

## Admin Approval Flow

1. Student registers at `/register`.
2. Student chooses a requested plan.
3. Payment status remains pending/paid structure only in the demo.
4. Admin signs in at `/login`.
5. Admin opens `/admin`.
6. Admin approves/unapproves the student, assigns plan/tier and manually unlocks specific mocks.

## Create And Publish Mocks

In `/admin`:

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

## Content Rules

- No PDF downloads.
- No printable versions.
- Mocks require login.
- Only approved students with unlocked mocks can sit online exams.
- Full mock content is kept in app data for this demo; move it server-side before production.
- Reference sources are used only to infer structure, timing, difficulty and topic distribution.
- Do not copy copyrighted GL, CEM, MME or third-party question text, passages, diagrams or mark schemes unless explicitly licensed.

## Known Production Limitations

- Auth is intentionally demo/localStorage-based and hydration-safe, but not production security.
- Full mock question data is currently bundled client-side for demo speed.
- Stripe checkout is structured but not live until keys and webhook handling are added.
- Email templates are placeholders only; no real email provider is configured.
- Admin-created mocks and references persist only in the current browser until a database is added.
- The online mock room has casual copy/print deterrents, not DRM.

## Verification Commands

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

