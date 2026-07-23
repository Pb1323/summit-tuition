# Summit Tuition — Status (Plain English)

Last updated: 2026-07-23 (drafted two new practice test papers matching Ripon Grammar School's exact exam format, for your review — see below)

This is a plain-English summary of where the whole project stands — the product, what's live, what's mid-build, and the business side. Written so you can skim it without needing to read code. Technical detail lives in `CLAUDE.md` and `README.md` if you ever need it.

---

## Done (session — 2026-07-23, Ripon Grammar School style test papers)

- Built two new practice test papers that exactly match the format and question counts of Ripon Grammar School's (North Yorkshire) entrance exam, ahead of their exam changing format this September: one covering English + Verbal Reasoning (45 minutes, 58 questions), one covering Non-Verbal Reasoning + Maths (55 minutes, 65 questions).
- Most of the questions were reused from the existing question bank where they already fit (all 25 Maths questions, and about half of the Verbal/Non-Verbal Reasoning questions). New content written from scratch: a brand-new short story for the reading comprehension section, new spelling/grammar questions, and enough new Verbal and Non-Verbal Reasoning questions to hit the exact counts needed.
- **Both papers are drafts only — not visible to students yet.** They're sitting behind the same "not published" switch used for any mock still being reviewed, so nothing changes for current students until you look them over and decide to publish.
- Double-checked the question counts, marks, and no duplicate/broken questions with an automated check, and confirmed the whole site still builds and passes all checks cleanly.

## Done (session — 2026-07-22, WhatsApp redirect + housekeeping)

- A WhatsApp broadcast accidentally linked the main site homepage instead of `/welcome` and couldn't be corrected after sending, so the homepage (`/`) now temporarily redirects to `/welcome` (which already has a "Prefer the full site?" link at the bottom for everyone else). **This needs removing again in a day or two** once the WhatsApp traffic has passed — it's marked with a big comment in `next.config.ts` so it isn't forgotten, but flagging it here too.
- Housekeeping: found and committed some real, finished work that had been sitting uncommitted locally (an auto-doc-update hook, and documentation updates to the mock-ops/question-visual-design skill files) — no functional site change, just catching up git. Also cleared out stray local tool-state folders (`.codex/`, `.impeccable/`, a duplicate `impeccable` skill copy) that aren't part of the actual site, and deleted 6 leftover local branches from old sessions whose work was already merged into `main` (verified before deleting, nothing lost). Committed a small Supabase security-advisor fix script (`scripts/enable-rls-note-tables.sql`) that was also sitting uncommitted.

## Done (session — 2026-07-21, same day follow-up — segmented tabs, 2-mock official sample, Study Notes preview)

- Redesigned the Pro/Max (and Group/Private) tab buttons on `/welcome` into a proper segmented switch — the kind you tap left/right on — with a "tap to compare" hint above it, so it's obvious they're switchable without making the buttons bigger.
- "Learn more about Pro" is now its own proper button again (not a tiny link).
- The "what you actually get" box on the Pro/Max card now says "6 new full-length mocks released every month — around 100 questions each" (your figure), alongside the Study Notes and marked-report lines you were happy with.
- The mock-preview flow used to offer 6 small "showcase" mocks. Cut down to exactly 2 — one Maths, one English — 5 questions each, and every one of the 5 questions uses a different chart/diagram so it doesn't feel like the same template repeated. There are now two proper buttons on the Pro/Max card, "Maths Mock" and "English Mock", that jump straight into the matching one — no picker screen, no "preview" wording, framed as trying a real Summit mock. The copy also now says "Unlock Pro" for more, exactly as you asked.
- Brand new `/notes-preview` page: shows exactly one real Study Notes lesson (not a whole topic, not a whole comprehension block), fading out to a blur about 70% of the way down with an "Unlock with Pro/Max" button that takes you to the pricing page. Linked from the Pro/Max card as "Preview a Study Notes lesson".
- On the "why parents choose us" section, the exam-coverage line now says "Building towards a bank of 100+ mocks — 26 full-length papers already live today...". Flagging this one directly: we genuinely only have 26 real mocks live right now, so I couldn't put "100+ mocks" as a flat present-tense claim without it being false advertising — I phrased it as an honest forward target sitting next to the real, current number instead. If you want a different way of framing that ambition, let me know.

## Done (session — 2026-07-21, /welcome mobile cleanup + Holiday Booster loop fix + pricing CTA prominence)

- Removed the "SUMMIT / Full site" bar from the very top of `/welcome` — you said it looked weird on phone, so it's gone; the link back to the full site is still there at the bottom of the page.
- Shortened the taster question wording — the diagrams already show the numbers you need, so the questions no longer repeat them or over-explain the maths rule in the question itself.
- Found and fixed a real bug you spotted: the "View Holiday Dates" button, when shown ON the Holiday Booster page itself, just linked back to the same page — a dead loop that never actually showed you anything new. It now says "Enquire About Holiday Booster" and takes you to the booking/call page instead, everywhere it appears.
- Made the Pro/Max (and Group/Private) "buy" buttons bigger and more obvious, and turned the small "Learn more" button into a plain link so it doesn't compete with the main button for attention.
- Added a short "what you actually get" list under the Pro/Max pricing card (26 mocks, 140+ Study Notes lessons, a marked report every time) plus a new "Preview mock quality" button that takes parents straight to the free mock preview. Note: you'd asked for figures like "6 mocks a month" and "1000+ pages of notes" — I used the real, counted numbers instead (26 total mocks, ~149 Study Notes lessons) since those specific figures aren't accurate for what's actually built, and I didn't want the site making a claim we can't back up.

## Done (session — 2026-07-21, free-mock bugfix, Notes locking, taster-question polish)

- You said you couldn't see the free-mock gating behaviour working. Found the real bug: if you'd already used your one free mock and came back to the page, it very briefly showed the wrong "mocks left" count before correcting itself — in the developer preview this shows up as a jarring on-screen error, which is almost certainly what you saw. Fixed properly so it never happens again.
- Study Notes pages (Maths and English) now clearly show a lock icon and "Unlock with Pro" label on any topic a free account hasn't got access to yet — before, every topic looked identical and you'd only find out it was locked after clicking in. This matches the same locked/unlocked look used on the new free-mock picker.
- Taster questions: swapped the order of two of the sample questions, and fixed one diagram where the angle labels were overlapping the triangle shape.
- `/welcome`'s "why parents choose us" section now uses real numbers instead of vague claims: 26 full-length mocks, 140+ Study Notes lessons, and "Pro costs less than a single private tutoring session per month."

## Done (session — 2026-07-21, free-mock funnel, harder taster questions, and pausing Stripe checkout)

- Built a proper "free trial mock" funnel: a new page (`/free-mock`) lets any visitor — no account needed — try a real 10-question mock straight away. After that one, they're asked to make a free account for a couple more (still 10 questions each), and after those, they're pushed towards upgrading to Pro. There's a "try a free mock while you wait" button on the taster-booking page too. Built 6 small sample mocks (3 maths, 3 English) just for this — separate from the real mock library.
- Made the 10 sample questions shown on the homepage and `/welcome` genuinely harder: they were too easy before (plain arithmetic). Now every maths question is built around a graph, chart, or geometry diagram and needs two steps of thinking, not one — closer to what a strong Year 8/9 pupil would find challenging, while still being 11+ exam content.
- Reworked the "book a call" page: when someone arrives from a Pro/Max/tuition "buy" button rather than the genuinely free taster session, the page now makes clear this call is the step before paying (not just another free chat), and it puts your WhatsApp number front and centre, above the calendar booking box.
- At your request: switched off every "Pay Now" style button site-wide for now (Pro, Max, and the same buttons on `/welcome`) so they all point people towards phoning/WhatsApp-ing you instead of trying to check out with Stripe — you didn't want customers to hit a checkout flow that isn't fully ready. This is a single on/off switch, so turning real payments back on later is one change, not a rebuild.
- Added Group and Private tuition pricing onto `/welcome` as well, right underneath the Pro/Max pricing, since you wanted those pushed more too.

## Done (session — 2026-07-21, Summit Stretch mock check-up + new Maths visuals skill)

You asked me to go back over the older "Summit Stretch" mocks (from before the newer, stricter Elite-quality rules) and check they still hold up, using the mock-writing skills as the checklist.

- Found and fixed 3 real problems: two mocks that were labelled "Elite" in their title but not actually gated as Elite (so Pro-tier accounts were getting them for free), six questions across the older English "Stretch Paper" mocks that referenced a specific paragraph but weren't actually linked to it, and one story passage that had accidentally lost a sentence from a few of its paragraphs and was a bit too short. All fixed, verified, and pushed live (including re-running the database sync step so the fixes show up on the real site, not just in the code).
- Also checked the shorter Maths "stretch" papers and the two extra-long 100-question English papers against the newer, bigger Elite format. These were already working fine and clearly labelled as their own distinct thing (a "Number Focus" paper, a "Geometry Focus" paper, etc.) rather than broken attempts at the full format — you decided to leave their content exactly as it is rather than rebuild them to match the Elite size.
- Built a new skill specifically about making the Maths mock diagrams (the little charts/shapes/number lines) look genuinely impressive rather than just "there" — covering variety (no repeated identical diagrams in one paper), visual polish (gradients, shadows, hover effects already used elsewhere on the site), and a checklist to run before calling a new Maths mock's visuals finished.

## Done (session — 2026-07-21, share-readiness check before sending the site to other people)

Founder asked for the site to be checked end-to-end before sharing it more widely: welcome page → book a free call/taster or message on WhatsApp → clear pricing pushing people to the free taster → paying goes to WhatsApp too. Tested the whole flow live (local dev server + the actual production site) rather than just reading code.

- **Confirmed working**: `/welcome` → "Book Free Taster Session" opens a dedicated taster-mode booking page (separate from the generic parent-call page); the booking form really does email the founder in production (Resend email keys and a real Calendly calendar are already set in Vercel, so this isn't a dead end); Stripe isn't configured in production on purpose, so anyone trying to pay for Pro/Max on the main pricing page correctly gets a "Message Us on WhatsApp" button with the plan name pre-filled.
- **Bug found and fixed**: the Pro/Max pricing tabs specifically on `/welcome` (the page shared over WhatsApp) were the one place on the site that skipped the WhatsApp step — tapping "Start Pro"/"Start Max" there just opened a plain enquiry form instead of trying to pay. Fixed so `/welcome` now behaves exactly like the rest of the site.
- Also folded in an already-in-progress rewrite of the free-taster booking page (calendar shown first, enquiry form as a fallback, taster-specific copy) that was sitting unsaved locally.
- Re-ran the full check (typecheck, lint, production build) after the fix — all clean.
- **Second bug found via an actual browser-driven test of sign-up** (not just reading code): the registration page's own text said "sign in straight away", but after creating an account it actually sent the new student to the login page and made them type their password again — a real drop-off risk on a mobile marketing funnel. Fixed so creating an account now signs the student straight into their dashboard. Verified with a real end-to-end browser test (fill form → submit → lands on `/dashboard` with the account's name and free mocks showing).
- Confirmed separately (didn't need a fix): the "Book a Free Call/Taster" enquiry form really does reach the founder in production — real email keys and a real Calendly calendar are already configured live, not the dev placeholder.
- **Not done this session**: `.claude/settings.json` and some Claude Code skill files, plus an in-progress new `/free-mock` page/component, had unsaved changes from other work happening in parallel in the same folder — left those alone since they're a different session's unfinished work, not part of the website checks asked for here.

---

## Done (session — 2026-07-21, WhatsApp manual-payment fallback + free-mock paywall)

Founder is marketing today and doesn't want the site to look unfinished around payment, but real Stripe checkout is still blocked on buying a domain and finishing Stripe's business/bank activation (see the 2026-07-20 Stripe entry below). Rather than exposing bank details publicly, agreed on a temporary manual flow: WhatsApp the founder directly, quote your registered email, get manually upgraded once payment lands. Also added a freemium conversion mechanic requested by the founder: unpaid accounts now hit a paywall halfway through any mock they can access.

- **WhatsApp fallback replaces the old "Checkout coming soon" dead-end** (`src/components/ui/checkout-button.tsx`): whenever Stripe isn't configured in the current environment (i.e. production right now, since live keys are deliberately not in Vercel yet), the Pro/Max buttons on `/pricing` (and the practice-pack buttons on `/practice-packs`) now show a "Message Us on WhatsApp" button that opens `wa.me` with a pre-filled message naming the product and asking for the visitor's registered email, instead of a disabled "coming soon" button. Number lives in `src/data/site.ts` (`SITE.whatsappNumber`, `"447726951811"` — E.164 without the leading `+`). This is a pure UI-layer change — local dev with real test-mode Stripe keys still goes through actual Checkout unaffected; only environments without Stripe configured (i.e. prod today) show the WhatsApp fallback.
- **Free-mock halfway paywall** (`src/components/platform/mock-room-shell.tsx`): any student whose `paymentStatus !== "paid"` (i.e. hasn't completed a real payment — the same flag the Stripe webhook sets) now hits a "Free preview limit reached" screen once they reach the halfway point (`Math.ceil(questions.length / 2)`) of any mock they open, with a "See Pro & Max" button to `/pricing#platform` and the same WhatsApp CTA. Everything answered before the cutoff is still saved as normal; they can navigate back to review/edit earlier (unblocked) questions freely, they just can't progress past the halfway mark. Paid accounts and admin preview mode are never gated. This naturally only ever applies to the mocks free/unpaid accounts can open at all (the existing `unlockedMockIds` lock already restricts free accounts to free mocks), so no extra scoping was needed. The halfway cutoff is intentionally hardcoded, not admin-configurable, per founder's explicit "keep that manual for now" instruction.
- Small supporting change: `src/components/ui/button.tsx`'s `Button` now forwards `target`/`rel` through to the underlying `next/link` when `href` is set (needed for the WhatsApp links to open in a new tab) — previously unsupported, now a general capability any future external link can use.
- Verified `npm run typecheck`, `npm run lint` (0 errors, same pre-existing warnings), and `npm run build` all pass after these changes.
- **Not done this session**: no admin UI to configure the paywall threshold or the WhatsApp number/message — both are hardcoded, per founder's request, until Stripe live mode replaces this whole flow.

---

## Done (session — 2026-07-21, WhatsApp launch-day conversion funnel)

Founder is marketing today via a WhatsApp group: parents click through to the site and need to be impressed fast, then convert. Rebuilt the two entry points parents will actually land on — `/` (full site) and `/welcome` (the mobile-first WhatsApp-share landing page) — into the same funnel order: **try it → book free taster/call or create account → simple Pro/Max pricing → tuition → diagnostic pointer → Holiday Booster "most popular" close**.

- **`FreeSampleMock` rebuilt** (`src/components/sections/free-sample-mock.tsx`): now 10 questions (was 5) — 5 maths with small animated SVG diagrams (order-of-operations equation build, fraction pie fill, ratio bar split, perimeter square, percentage discount bar) and 5 English **"spot the grammar mistake"** questions (sentence split into lettered segments, tap the one with the error, or "No mistake") replacing the old plain comprehension-retrieval question. All original content, no third-party paper text.
- **New `/account` gateway page** (`src/app/account/page.tsx`): exactly two buttons — "Create New Account" → `/register`, "Sign Into Existing Account" → `/login` — nothing else on the page. Every "Create Account" CTA site-wide (homepage, `/welcome` hero, `/welcome` sticky bar) now points here instead of straight to `/register`.
- **Homepage (`src/app/page.tsx`) reordered**: sample mock → new "Book a free taster / free call / Create Account" two-card section → simplified Pro/Max-only pricing (unchanged tiers, just reordered and re-labelled "Pro or Max — that's it") → tuition comparison → a small diagnostic-assessment pointer banner → diagnostic detail section → (unchanged trust/how-it-works content) → **Holiday Booster now has its own "Most Popular" / "everything, all included" closing section at the very bottom of the page**, replacing the old small footer banner. Removed now-redundant sections (`Start Here` cards, `ProductLadder`, the duplicate Max upsell block, `Upsells`/`UPSELL_PRODUCTS` grid, `YearGroupPicker`) that were adding noise around the same funnel.
- **`/welcome` (the actual WhatsApp-share page) got the same treatment**: added the `FreeSampleMock` teaser near the top (it previously didn't show any sample questions at all), added a taster/free-call card, simplified `WelcomePricingTabs` down to just Pro/Max tabs (dropped Group/Private/Holiday tabs — tuition and Holiday Booster now have their own sections instead), and added a matching Holiday Booster "Most Popular" closing card above the existing footer CTA.
- Verified `npm.cmd run typecheck`, `npm.cmd run lint` (0 errors, same pre-existing warnings as before), and `npm.cmd run build` all pass; smoke-tested `/`, `/welcome`, `/account` on a local dev server and confirmed the new sections render.
- **Not done this session** (flagged to founder, out of scope for a 30-minute pass): no WhatsApp-specific analytics/UTM tracking added, no A/B test, no changes to `/register` or `/login` forms themselves, no changes to Stripe/production env vars.

---

## Done (session — 2026-07-20, Stripe test-mode checkout wired for Pro/Max)

Founder connected the Stripe MCP plugin in test mode and asked to finish the previously-scaffolded checkout flow. Founder does not yet have a custom domain (buying one in a few days) or updated bank details (new card arriving, business bank details to follow) — real/live payments are explicitly on hold until then, so this pass built a working **skeleton**: real test-mode Stripe objects and a fully wired checkout flow, deliberately left off in production until live-mode activation.

- Created 4 test-mode Stripe Products+Prices via the Stripe MCP tools: Pro (£39/month, `price_1TvOO7R2MwXT1VWa3fsFVPnM`), Max (£69/month, `price_1TvOO9R2MwXT1VWaP1MjSCX7`), Diagnostic Assessment (£145 one-off, `price_1TvOMpR2MwXT1VWakmwXiDNx`), Holiday Booster (£50 one-off, `price_1TvOMsR2MwXT1VWajl26bitS`) — all test mode only, account `acct_1TvFZBR2MwXT1VWa`. (Note: Pro/Max were first created at £29/£60 matching the founder's initial message, then archived and recreated at £39/£69 once a concurrent session's pricing-page edit — already merged before this pass — turned out to be the current real price. Diagnostic/Holiday Prices exist for future self-serve use but aren't wired to a checkout button yet — those two stay on their existing "enquire" links by design.)
- Wired the actual `stripePriceId`s into `src/data/pricing.ts`'s Pro/Max tiers, and updated `src/components/ui/pricing-card.tsx` so a tier with a `stripePriceId` now renders the existing `CheckoutButton` (real `/api/checkout` → Stripe Checkout Session → redirect) instead of a plain link; tiers without one (Diagnostic/Group/Private/Holiday) keep their original enquiry-link `Button`. No changes were needed to `src/lib/stripe.ts`, `/api/checkout`, or the webhook route — that scaffolding was already correct.
- Fixed a real bug found while testing locally: Stripe Checkout's `success_url`/`cancel_url` always redirected to the hardcoded production fallback (`https://www.summittuition.co.uk`) even in local dev, because `src/data/site.ts`'s `SITE.url` reads `NEXT_PUBLIC_SITE_URL` but that var was never set anywhere (not in local `.env`, not confirmed in Vercel). No code change was needed — just set `NEXT_PUBLIC_SITE_URL="http://localhost:3000"` in local `.env`. **Update, 2026-07-21: this has since been set in the Vercel dashboard** (Production + Preview) to `https://summit-tuition.vercel.app` — verified live via `vercel env ls` and the deployed page's own `og:url` tag, so this is done, not outstanding.
- Verified end-to-end locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook` + `npm run dev`, clicked "Start Pro" on `/pricing`, real Stripe-hosted Checkout page loaded, paid with `4242 4242 4242 4242`, redirected back to `localhost:3000/pricing?checkout=success`, webhook fired.
- `npm run typecheck` and `npm run lint` both pass clean (0 errors) after these changes.

### Explicitly deferred / next steps (in order, don't skip ahead)

1. ~~Today, no blockers: set `NEXT_PUBLIC_SITE_URL` in the Vercel dashboard~~ — **done as of 2026-07-21**, confirmed set to `https://summit-tuition.vercel.app` (the real current prod URL — there is no custom domain live yet, despite marketing copy referencing summittuition.co.uk). Deliberately do **not** add `STRIPE_SECRET_KEY`/`STRIPE_WEBHOOK_SECRET` to Vercel yet — leaving Stripe unconfigured in prod is what makes `/api/checkout` and `CheckoutButton` gracefully show "Checkout coming soon → get in touch" instead of a real-looking checkout button real customers can't actually complete (no live mode yet).
2. **When the domain is bought (~days away)**: point it at Vercel, then update `NEXT_PUBLIC_SITE_URL` again to the new domain.
3. **When the new card/bank details land (~tomorrow)**: complete Stripe's business activation (Dashboard → "Activate your account" — business details + bank account for payouts). This is the actual gate on Live mode, nothing code-side blocks on it.
4. **Once Live mode is active**: recreate the same 4 Products/Prices in live mode (test-mode objects/IDs don't carry over), swap the live price IDs into `src/data/pricing.ts`, register a live webhook endpoint in the Stripe Dashboard (`https://<domain>/api/stripe/webhook` — a Dashboard step, not `stripe listen`) and get its webhook secret, then add the live `STRIPE_SECRET_KEY`/`STRIPE_WEBHOOK_SECRET` to Vercel and do one real end-to-end test.
5. **Also worth deciding before real customers pay** (not blocking): the webhook only handles `checkout.session.completed` (marks `paymentStatus: "paid"`, no auto plan-assignment/mock-unlock — that's still a manual admin step by design). There's no handling yet for `invoice.payment_failed` or `customer.subscription.deleted`, so a Pro/Max subscriber whose card fails or who cancels won't be automatically downgraded/locked out.

---

## Done (same day, third follow-up — pricing rebrand goes everywhere, plus a new free-sample-mock widget)

Founder asked for the Free/Pro/Max rebrand to be consistent across the whole site (not just the pricing page), and for a new interactive feature on the homepage: a "try before you sign up" sample mock.

- Went through every remaining page that still mentioned the old product names — the homepage, the tuition comparison page, the site footer, the contact/booking forms, the FAQ, the terms page, and the safeguarding page — and updated them all to Pro/Max/Free language.
- The homepage used to have three separate, cluttered sections repeating the old products; these are now one clean Pro/Max section.
- The three old dedicated pages for the retired products now automatically send visitors to the pricing page instead of showing outdated content.
- Added a new feature: right under the homepage's main banner, visitors can now try 5 real sample questions (4 maths, 1 comprehension) with no account needed. After the 5th question, it stops and shows their score with a "Register Free" or "See Pro & Max" button — the goal is to let people feel the product before committing to anything.
- Rechecked in a real running copy of the site that the new questions work, scoring correctly, and that the old pages properly redirect.

---

## Done (session — 2026-07-20, 4th Elite English mock)

Added a 4th full-length Elite-difficulty English paper (`english-gl-11-elite`, "English GL-Style Full Paper IV — Elite"), matching the same structure and difficulty as the existing 3 Elite English papers (`english-gl-8/9/10-elite`) — same 54-question, 4-section GL layout (28 comprehension, 9 spelling, 9 grammar-mistake, 8 cloze), same "Summit Stretch" difficulty label.

- New original passage, "The Lighthouse Keeper's Ledger" (`passage-lighthouse-keepers-ledger`), 6 paragraphs, same length/register as the other Elite passages. Not copied from any third-party source.
- 54 new questions (`eh300–327`, `esp300–308`, `egr300–308`, `ecl300–307`) — all-new ids, no collisions with the existing bank.
- Given the past history of bugs on English mocks (cloze options rendering with the wrong letter, comprehension section misclassification), specifically verified before calling this done: ran a standalone script resolving all 54 question ids against the live question bank, confirming zero duplicate/missing ids, every `correctAnswer` actually present in that question's `options`, every comprehension question's `passageId` resolves to a real passage, section classification via `getEnglishSectionId()` comes out exactly 28/9/9/8 (matching the GL 52/17/17/15% weighting) with zero "undefined", and ran the mock through the real `evaluateMockQuality()` checker used by the admin Quality Checks tab — status came back "Ready" with all 21 checks passing and no warnings.
- Verified `npm run typecheck` and `npm run lint` both pass clean (0 errors, only the same pre-existing unrelated warnings as baseline).
- `npm run build` wasn't re-verified this session — another build process was already running concurrently (this project runs parallel agent sessions) and this was a pure data addition with no new code paths, already covered by the typecheck above.

---

## Done (session — 2026-07-20, Free/Pro/Max pricing rebrand, first pass — time-boxed to ~30 min)

Founder decided to move from named products (Weekly Mock Club/Practice Paper Simulator/Complete 11+ Programme) to a Free/Pro/Max tier ladder for the digital platform (mocks + Study Notes), while Group/Private Tuition, Holiday Booster, and Diagnostic Assessment stay separate, non-tiered products as before (confirmed with founder before building). Stripe checkout wiring is explicitly deferred — this pass is data model + pricing page only, admin still assigns plans manually.

- **`src/data/platform.ts`**: `PRODUCT_PLANS` rebuilt as Free (£0)/Pro (originally £29/mo, now £39/mo — see streamlining pass below)/Max (originally £60/mo, now £69/mo), plus Diagnostic/Group/Private/Holiday kept as non-gating entries with real prices (previously all placeholder `£X`). Free/Pro/Max's `includedMockIds`/`includedNoteIds` are **computed dynamically** from `MOCKS`/`NOTE_PAGES` at module load (`FREE_MOCK_IDS`/`PRO_MOCK_IDS`/`MAX_MOCK_IDS` filtering on existing `mock.isFree`/`mock.tier === "Elite"` fields) rather than hand-typed id lists — deliberate choice so newly added mocks are automatically covered by the right tier without ever having to remember to update this file again. Pro = everything except `tier: "Elite"` mocks; Max = everything including Elite. Moved this block to after the `MOCKS` array (was previously before it, with empty placeholder arrays) since the computation needs `MOCKS` to exist first.
- **`src/data/pricing.ts`**: `MOCK_CLUB_PRICING`/`PRACTICE_SIMULATOR_PRICING`/`PROGRAMME_PRICING` replaced by one `PLATFORM_TIER_PRICING` array (Free/Pro/Max cards); old names kept as **backward-compat aliases** (`MOCK_CLUB_PRICING`/`PRACTICE_SIMULATOR_PRICING` → Pro card, `PROGRAMME_PRICING` → Max card) purely so the still-unmigrated dedicated pages below don't break — not a real second pricing system.
- **`src/data/products.ts`**: `PRODUCT_LADDER` entries for group-tuition/practice-paper-simulator/weekly-mock-club/complete-programme replaced with free/pro/max entries (linking to `/pricing#platform` and `/register`); tuition/holiday entries untouched.
- **`src/app/pricing/page.tsx`**: updated the "not sure where to start" card copy and meta description off the old product names.
- Verified `npm run typecheck` (0 errors) and `npm run lint` (0 errors, same pre-existing warnings as baseline) after the change.

### Explicitly deferred (not done this pass, due to the 30-minute time box)

- **Dedicated marketing pages still show old branding**: `/weekly-mock-club`, `/practice-paper-simulator`, `/complete-programme` still exist as routes with their original copy/headings (they still work — via the backward-compat pricing aliases above — but they weren't rewritten to Free/Pro/Max language, and nothing yet redirects them to `/pricing`). Same for `nav.ts`'s footer "Products" column, which still links to/labels these by their old names.
- **No Stripe Price IDs wired to the new tiers yet** — founder is separately setting up the Stripe MCP/plugin integration; once that's authorized and Price objects exist for Free/Pro/Max, `/api/checkout` needs real `priceId`s plumbed through from the pricing cards.
- **£60/month for Max is a judgment call, not confirmed with the founder**: they picked "£60" matching the old Complete 11+ Programme price, which was `/week` (because it bundled tuition). Since Max is now digital-only, billing it `/week` at the same £60 would make it far pricier than intended relative to Pro's £29/month — changed the cadence to `/month` to keep the ladder coherent, but the founder should sanity-check this actual number before launch.
- **No re-check of `ProductCategory` type / other consumers of `PRODUCT_LADDER` categories** (`"programme"`, `"practice"` categories are now unused) — harmless (not a type error) but worth a cleanup pass later.

## Done (same day, immediate follow-up — pricing streamlining pass)

Founder feedback right after the first pass: didn't like the small-caps "Most guided route" style label on each pricing card, wanted Pro repriced to £39/month and Max to £69/month, and wanted fewer options shown on the buying page so people are pushed toward Pro instead of being presented with a wall of choices.

- Removed the uppercase eyebrow line ("Most guided route"/"Focused start"/"Flexible plan") from every pricing card.
- Pro is now £39/month, Max is now £69/month everywhere (pricing page, product ladder, and the admin-facing plan list).
- The main pricing page now only shows **Pro and Max** as sellable cards — Free isn't gone, it's just no longer presented as something to "buy" alongside the paid tiers; there's a small text link under the cards for people who want to register free first. Pro stays the visually featured option.
- The `/welcome` mobile page's pricing tab strip was relabelled from the old Mock Club/Complete Programme names to Pro/Max, with Pro as the tab that opens by default.
- Rechecked in a real running copy of the site (not just the code) that the new prices show up correctly and the old caps-style label is gone.

---

## Done (branch `worktree-english-gl-mock-rebuild`, 2026-07-20 — finishing pass, merged to main)

This branch was already mid-flight from a prior session (see the 2026-07-19 entry below for why it was deliberately left alone). This session merged latest `main` in (already done, verified), then finished and verified the rest. **Merged into `main` — no longer local-only.**

- **Confirmed section structure works across the whole English mock roster, not just the one regenerated mock**: `english-sections.ts`'s tag-based `getEnglishSectionId()` classifies all 13 published English mocks (the new generator-built one, the 3 hand-authored Elite mocks, the 6 older `-stretch` papers, the 2 `-100` mocks, and the tiny diagnostic sample) cleanly into all 4 GL sections with zero "undefined" — verified with a standalone script, not just by inspection. Section grouping/ordering is derived at render time from tags, so existing mocks didn't need physical regeneration to get correct section behaviour.
- **Found and fixed a real, severe version of the exact bug this branch exists to solve**: `ClozeGapRenderer` (`src/components/platform/ui.tsx`) was recomputing its own options list straight from `question.options` (raw source order), completely ignoring `QuestionRenderer`'s per-question `seededShuffle`. Every cloze template in `mock-generation.ts` hardcodes the correct answer as `options[0]`, so every cloze question in every mock was rendering its correct letter as "A" with zero variation — not just "predictable," literally constant. Fixed by adding an `options` prop to `ClozeGapRenderer` and having `QuestionRenderer` pass its already-shuffled list through. Verified two ways: a standalone script mirroring the shuffle logic (correct letters now spread A-E per mock), and live in a running dev server (screenshotted a real cloze question with the correct answer sitting under letter C, not A).
- **Confirmed the segment-format "spot the error" fix (`SegmentMistakeAnswer`) was already structurally sound**, not a shuffle band-aid: the sentence clauses stay in fixed reading order (they have to, to stay grammatical) but which *letter* labels which clause is reshuffled per question via a second, separate `seededShuffle(pool, question.id + "-letters")`. Screenshotted live — letters render as e.g. B, E, A, D with "No mistake" as C, genuinely non-sequential.
- **Found and fixed a second real bug in the side-by-side comprehension layout**: `mock-room-shell.tsx` deliberately omitted the `passage` prop when calling `QuestionRenderer` for comprehension questions (to avoid `QuestionRenderer` rendering its own duplicate copy of the passage already shown in the sticky left column) — but that same omission fooled `QuestionRenderer`'s quality-warning check, so every comprehension question showed a spurious "Linked passage not found" draft warning in admin preview. Fixed with a new `hidePassage` flag: `QuestionRenderer` now still receives the real `passage` (so the warning check is accurate) but suppresses only its own inline render.
- **Visually verified the side-by-side comprehension layout in a real dev server** (not just compiled/typechecked): took Playwright screenshots of the admin preview at desktop and mobile widths — sticky, independently-scrollable passage in the left column, question/options in the right column at desktop; collapses to a single stacked column (passage above question) below the `lg` breakpoint on mobile. Also screenshotted a spelling/punctuation segment-format question and a cloze question mid-mock to confirm section ordering (comprehension → spelling → punctuation → cloze) actually happens in the running app, not just in data.
- **Fixed 2 pre-existing, unrelated broken e2e tests** found while running the full `test:e2e` suite: both tests in `tests/admin-nav-and-mock-room.spec.ts` were timing out because that file's local login helper only set the `summit_session` cookie — but demo mode (no `DATABASE_URL`) reads the logged-in session from `localStorage`, not the cookie (already correctly documented in `tests/helpers.ts`, which every other spec file already used). This predates the branch entirely (the file was last touched before the 2026-07-17 session-forging security fix that made the old cookie-only approach stop working) — swapped it to use the shared `loginAsDemoUser` helper. `npm run test:e2e` went from 5/8 to 7/8 passing.
- **Left one remaining e2e failure alone, confirmed as pre-existing flaky, not a regression**: `new-features.spec.ts`'s "admin edits a student's lessons-remaining count" test — completely unrelated to English mocks, already self-documented in its own code comments as having a save-then-reload race condition. Reran it in isolation with retries: failed, then passed identically on retry, confirming it's flaky infra rather than something this branch's changes broke.
- Full verification suite run clean: `npm run typecheck` (0 errors), `npm run lint` (0 errors, 1 pre-existing unrelated warning), `npm run build` (all routes compile), `npm run test:e2e` (7/8, 1 known pre-existing flake documented above).
- **Judgment call**: did not regenerate every existing English mock onto the literal new `generateEnglishGLStyleMock()` pipeline output — only one demonstration mock (`english-gl-stretch-r1`) was built that way, per the prior session's commit. Instead relied on the fact that section grouping/ordering is derived dynamically from question tags (not stored mock structure), so every existing mock already gets correct 4-section behaviour without being rewritten. Flagging this explicitly in case the founder wanted every mock physically rebuilt onto the new generator, not just correctly classified/ordered — that would be a larger, separate content-authoring pass.

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
