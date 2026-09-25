# Due-diligence pack — what a buyer will ask for, and what we actually have

Built 2026-09-24/25, part of the exit-options research (`trig_01CiQghu245DBsNMu3mEnRK3`, resumed after two usage-cap cutoffs). Nothing here was sent or shown to anyone — it's a gap list for whoever eventually runs the sale.

## 1. Code & technical
| Buyer will want | Status |
|---|---|
| Full source repo access (or a clean export) | **Have** — Pb1323/summit-tuition, private GitHub repo |
| Build/deploy instructions, env var list | **Have**, in the repo's own `CLAUDE.md`/README — needs a final read-through to strip any personal shortcuts (e.g. "use npm.cmd not npm" is fine to keep, any hardcoded personal paths are not) |
| Dependency/license audit (no GPL-incompatible packages, no expired API keys baked in) | **Gap** — never run an automated license-checker (e.g. `npx license-checker`) or secret-scan over the repo |
| Hosting/infra transfer plan (Vercel project, DB) | **Gap** — no documented step-by-step for transferring the Vercel project + Postgres instance to a new owner's account |
| Test coverage / Playwright e2e suite | **Have** — Playwright e2e exists per the project's own docs |

## 2. Content / IP
| Buyer will want | Status |
|---|---|
| Confirmation the question bank is original, not copied from GL Assessment/CEM/publishers | **Partial** — comprehension passages are tagged `source = original` (46/46) in the DB; the maths/VR/NVR/English *questions* were hand-authored per the mock-authoring skills, but there is **no signed originality statement or authorship log** a buyer's lawyer would want |
| Confirmation no copyrighted third-party past papers were reproduced | **Gap** — worth a manual spot-check pass before any sale conversation gets serious; the platform's own research folder (`research/gl-*-question-bank.md`, `research/official-reference/`) references real exam-board formats for authoring guidance, which is fine, but a buyer will ask explicitly whether any verbatim third-party text made it into a published mock |
| IP assignment — confirm the founder (Pranav, minor) actually owns what's being sold, not a school/employer | **Gap, and the most important one.** Pranav is 15; there is no documented assignment of IP to him personally or to a company entity. A buyer's lawyer will ask "who legally owns this and can they sign a sale contract" — a minor generally cannot sign a binding commercial contract in England & Wales without a parent/guardian party to it. **This needs Srinivas's / a parent's involvement structurally, not just as an approver, before any real sale proceeds** |
| Trademark/brand check (is "Summit Tuition" clear to use/transfer?) | **Gap** — no UK trademark search done |

## 3. Data protection (GDPR)
| Buyer will want | Status |
|---|---|
| Confirmation of lawful basis for storing student data (17 accounts, 128 attempts) | **Gap** — no documented lawful basis / privacy notice on file that this research found |
| Data Processing Agreement template for the transfer of any student data to a new owner | **Gap** — and arguably the safest answer is **don't transfer real student data at all**; sell the platform + content, wipe or exclude the 17 real accounts, let the buyer onboard their own students |
| ICO registration status (data controllers processing personal data generally must register) | **Unconfirmed** — not established in this research; check before any live-data transfer is even considered |
| Under-18 data handling (11+ candidates are children) | **Gap** — no documented parental-consent flow found; this is a real regulatory exposure independent of the sale, worth flagging even if the platform isn't sold |

## 4. Revenue / financials
| Buyer will want | Status |
|---|---|
| Bank/Stripe statements proving revenue | **Gap** — this research found "2 Stripe payment requests on record" in the live DB and a past "~£12k ARR" figure referenced in project docs, but **no statements are in this repo to evidence either number** |
| P&L / cost breakdown (hosting, any paid tools) | **Gap** — not compiled anywhere found |
| Customer/retention data (currently ~1 active student) | **Have** (from the DB counts above) — but this is a weak number for a buyer and should be presented honestly as "asset sale," not "revenue business," per Part 1's recommendation |

## Net effect on the sale
The single biggest blocker is not technical — it's **who can legally sign a sale contract**, since the operator is a minor. Before targeting any of the 25 strategic buyers or listing on a marketplace, get a parent/guardian (or a company entity, if one exists/is created) positioned as the contracting party. Everything else here (license audit, originality statement, GDPR cleanup, financial evidence) is doable in a few days; the IP-ownership/contracting-party question is not something this research can resolve and should go to the family, not a buyer.
