# Summit Tuition — exit options beyond cold emails

Built 2026-09-24 (re-run of the failed cloud routine `trig_01CiQghu245DBsNMu3mEnRK3`). Research only: **nothing was listed, no account was created, nobody was contacted.** The one email output is a Gmail draft to self.

**Hard exclusions kept throughout:** Teachitright / Chris Pearse (live conversation), anything in the Bucks/Burnham/High Wycombe/Maidenhead/Reading "hold" area, and every name already in `leads/*.csv` or `SELLING-THE-PLATFORM.md` (see `sale/_excluded-names.txt`, 209 names).

**Files in this folder**
- `EXIT-OPTIONS.md` — this file (all four parts + recommendation)
- `strategic-buyers.csv` — the 25 new strategic targets as a sheet
- `DUE-DILIGENCE-CHECKLIST.md` — what a buyer will ask for, and our gaps
- `LISTING-DRAFT.md` — marketplace listing copy (not posted)
- `TEASER.md` — 1-page anonymised teaser (not sent)
- `_excluded-names.txt` — dedupe list (from the earlier failed run)

## Asset facts used below (checked against the production DB, read-only, 2026-09-24)

| Item | Count |
|---|---|
| Mock exams (all published) | **159**: English 48, Maths 32, VR 28, NVR 17, Chemistry 13, Biology 11, Physics 10 |
| Mock style tag | 114 GL-style, 9 non-GL, 36 untagged |
| Questions | **7,426**: English 2,045, Maths 1,604, VR 1,585, NVR 664, Chemistry 598, Biology 484, Physics 446 |
| Comprehension passages | 46, all tagged `source = original` |
| Study-notes pages | 39 |
| User accounts / submitted attempts | 17 / 128 |
| Stripe payment requests on record | 2 |

Read-only counts from a throwaway script (deleted). No personal data was read. Revenue: past milestone of ~£12k ARR (per earlier docs, **not yet evidenced with statements in this repo**); today only one active student (Lupin), so the platform is close to **pre-revenue** in marketplace terms.

---

## 1. Marketplaces and brokers

### Fee and eligibility table (from each platform's own pricing page, fetched 2026-09-24)

| Venue | Seller fee | Listing requirement | Fits Summit? | Source |
|---|---|---|---|---|
| **Acquire.com** | $25/mo listing (asks under $250k) + **8% closing fee** on deals under $250k | No hard revenue floor on the standard listing; the "Guided" tier needs $100k+ revenue | **Yes** — the best-known place where software/SaaS buyers look. A near-zero-revenue asset will get little attention | [acquire.com/seller-pricing](https://acquire.com/seller-pricing/) |
| **Flippa** | Listing $29 (under $10k) or $49–$599 ($10k–$49.9k band, by package) + **10% success fee** | None beyond verification; NDA costs $199 extra on cheaper tiers | **Yes** — biggest audience, also the most tyre-kickers. Plan for the 10% | [flippa.com/pricing](https://flippa.com/pricing) |
| **Microns.io** | Free listing; success fee **10%** ($1k+), **8%** ($10k+), 6% ($100k+) | **Must be profitable, 5+ months old, have paying customers; "we don't accept pre-revenue projects"** | **Probably not today.** Only eligible if Summit can show current paying customers | [microns.io/pricing](https://www.microns.io/pricing) |
| **Little Exits** (was Tiny Acquisitions, rebranded April 2024) | Free to list per older reports; buyers pay for access. Current seller fee **not shown** on the site | Aimed at projects under $100k | Possible, small audience. **Weak source:** fees not confirmed on the live site | [littleexits.com](https://littleexits.com/), [rebrand notice](https://newsletter.littleexits.com/posts/tiny-acquisitions-is-rebranding-to-little-exits) |
| **SideProjectors** | Free, **no commission**; paid "featured" placement optional | None. You handle due diligence and payment yourself | Yes as a free extra listing; low-value buyers | [sideprojectors.com](https://www.sideprojectors.com/) (fees from third-party reviews, e.g. [KDnuggets](https://www.kdnuggets.com/selling-your-side-project-10-marketplaces-data-scientists-need-to-know)) — **medium confidence** |
| **Empire Flippers** | Broker commission (not shown on requirements page) | **$2,000/mo net profit averaged over 12 months + 12 months' revenue history** | **No** — fails both tests. Sister site Money Nomad takes smaller businesses | [empireflippers.com/business-listing-requirements](https://empireflippers.com/business-listing-requirements/) |
| **FE International** | 10–15% commission (third-party figure) | Aimed at larger SaaS | **No** — too small | [startupa.ge summary](https://startupa.ge/blog/best-startup-marketplaces-buy-sell-saas) — weak, secondary |
| **Rightbiz** (UK) | Online-business listing **£12/month, 0% commission** | None | **Yes, UK audience.** Tutoring-business buyers browse here | [rightbiz.co.uk online-business register](https://www.rightbiz.co.uk/online-businesses/register/) |
| **BusinessesForSale.com** (UK) | Private-seller packages (price not captured; page blocked the fetcher) | None | Yes, UK audience. It is where the one real 11+ comparable below is listed | [uk.businessesforsale.com education](https://uk.businessesforsale.com/uk/search/education-businesses-for-sale) |
| Traditional UK business brokers | Usually 8–10% commission, often plus upfront fees | Want profitable businesses | **No** at £15k. The fee is not worth it | [ukbusinessbrokers.com fees guide](https://ukbusinessbrokers.com/broker-fees-how-much-do-business-brokers-charge/) — secondary |

**Net proceeds at a £15k (~$20k) sale:** Acquire about £13.8k (8% + a few months' listing), Flippa about £13.4k (10% + ~£40 listing), Rightbiz/SideProjectors about £14.9k (no commission, but no escrow or vetting either — use Escrow.com or a solicitor).

### What multiples say (and why they mostly don't apply)

- Flippa's own 2025 data: the **$10k–$100k band sold at an average 1.8x profit** (top quartile 3.9x). $100k–$250k: 2.1x. Source: [Flippa 2025 recap](https://flippa.com/blog/2025-online-business-ma-insights-from-flippa/).
- Flippa's education category over 18 months: **4.1x profit / 3.2x revenue** — but these are mostly larger deals. A Flippa broker quoted there says owner-operated businesses under $1M ARR sell on **2x–4x profit**, not on revenue. Source: [Flippa SaaS multiples](https://flippa.com/blog/saas-multiples/).
- FE International (edtech): owner-operated edtech trades at **3x–10x annual earnings**, lower end for small founder-run firms. Source: [FE International edtech valuation](https://www.feinternational.com/blog/edtech-business-valuation).

**So what:** with profit near zero today, a multiple gives about £0. **At £15k you are selling an asset, not a business.** Price it on replacement cost (content + working platform) and on what it could earn for a buyer who already has students. Earlier estimate: £10k–£20k to rebuild with AI help (Step 13). The listing should say "asset sale" plainly. On a marketplace, a £15k ask for a pre-revenue asset will probably be negotiated down; expect offers of **£5k–£10k** unless revenue is shown (my inference, not a sourced figure).

### Real comparables (links)

| Listing / deal | Numbers | What it tells us | Source |
|---|---|---|---|
| **11+ tutoring business, Aylesbury (Bucks), for sale** | Asking **£85,000**; turnover **£108,897**; 20+ years; 90%+ pass rates; 52 pupils registered for 2027; owners retiring. The listing names "online mock tests and digital learning resources" as an **untapped growth opportunity** | The strongest comparable found. Shows (a) what a real 11+ business with revenue is priced at, and (b) that 11+ operators still lack online mocks. Whoever buys it is a natural buyer for Summit's platform. **Bucks is near Chris's area — treat the new owner as a hold-area lead** | [BusinessesForSale listing](https://uk.businessesforsale.com/uk/11-tutoring-business-for-sale.aspx) (page blocked the fetcher; numbers are from the search-engine snippet — **re-check by hand**) |
| **TMUAGuru** (UK admissions-test prep web app, built solo at 17) | Acquired by **UniAdmissions** (Oxbridge prep company). Price not disclosed. Thousands of users, hundreds of paying customers in 6 months | A UK exam-prep product built by a teenager and bought by a **strategic** buyer, not through a marketplace. Close to Pranav's story | [Indie Hackers post](https://www.indiehackers.com/post/solo-built-a-web-app-at-17-battled-a-monopoly-and-got-acquired-at-21-fe0f04e974) (link now 404s; acquirer confirmed via [tmuaguru.com](https://tmuaguru.com/)) — **price unknown** |
| **PhonicsMaker.com** (Flippa, live) | Asking **$100,000**; ~$5.8k MRR; 312 paying subs; 1 year old; 3.3x profit | Edtech SaaS with real revenue is priced on revenue. Ours has none today, so it can't use this model | [flippa.com/11990705](https://flippa.com/11990705) |
| **Sumazon.com** (Flippa, SOLD) | $42k TTM revenue, $31k profit, 287 subs; price not public | Edtech with AI-generated practice exams does sell on Flippa, but through a broker, and with revenue | [Flippa listing](https://flippa.com/12018706-ai-powered-edtech-saas-with-42k-ttm-revenue-31k-profit-74-margin-287-active-subs-and-90k-users-low-overhead-high-retention-ready-to-scale) |
| **HUNARly** (UK online tutoring platform, for sale) | 16 freelance tutors, fully online; price not captured | UK online-tutoring assets do get listed on BusinessesForSale | [BusinessesForSale search](https://uk.businessesforsale.com/uk/search/education-businesses-for-sale) — **details not verified** |

**Not found:** a sold 11+/GCSE question bank or mock platform with a public price. Flippa's "Study guides and tutorials" category was empty when checked. Don't claim a precise market comparable in any pitch.

### Recommendation for Part 1
1. **Don't list yet.** First get 2–3 months of real payments through Stripe (Step 3 in SELLING-THE-PLATFORM.md). That makes Microns an option and helps on Acquire/Flippa.
2. When listing: **Acquire.com (main) + Rightbiz (UK, £12/mo, 0% commission)** together. Add Flippa only if Acquire gets no response in 4–6 weeks. Skip brokers.
3. Pitch it as an **asset sale**: code + 7,426 questions + 159 mocks + domain, 2–4 weeks of handover. Put the ask at £15k, with an unpublished floor of £8k (same as Step 13).
