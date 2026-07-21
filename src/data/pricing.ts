import type { PricingTier } from "@/types/pricing";

export const DIAGNOSTIC_PRICING: PricingTier[] = [
  {
    id: "diagnostic",
    name: "Diagnostic Assessment",
    description: "A one-time, 3-hour assessment in a single sitting — multiple mock exams and assessments, with a full 10-page evaluation report.",
    price: "£145",
    period: "one-off",
    features: [
      "One-time, 3 hours in a single sitting",
      "Multiple mock exams and assessments",
      "Full 10-page evaluation report",
      "Overall readiness score",
      "Subject-by-subject breakdown",
      "Topic weakness, timing and accuracy analysis",
      "20-minute results call with a tutor",
    ],
    cta: "Book Diagnostic Assessment",
    ctaHref: "/book-a-call?product=diagnostic-assessment",
    billingMode: "one-off",
  },
];

export const PLATFORM_TIER_PRICING: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    description: "A taste of the platform — one mock per subject and the first Study Notes topic in every strand.",
    price: "£0",
    period: "forever",
    features: [
      "1 diagnostic-style mock per subject",
      "First Study Notes topic in every strand",
      "Instant scoring on every attempt",
      "No card required",
    ],
    cta: "Register Free",
    ctaHref: "/register",
    billingMode: "subscription",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Full weekly mock access and complete Study Notes across every subject.",
    price: "£39",
    period: "/month",
    features: [
      "Full mock library (excl. Elite papers)",
      "Complete Study Notes, every subject",
      "Marked with a report after every mock",
      "Subject and topic-level breakdown",
      "Weekly parent email summary",
    ],
    cta: "Start Pro",
    ctaHref: "/book-a-call?product=pro",
    badge: "Most Popular",
    highlighted: true,
    billingMode: "subscription",
    stripePriceId: "price_1TvOO7R2MwXT1VWa3fsFVPnM",
  },
  {
    id: "max",
    name: "Max",
    description: "Everything in Pro, plus Elite-difficulty mocks and priority reporting.",
    price: "£69",
    period: "/month",
    features: [
      "Everything in Pro",
      "Elite-difficulty mock papers",
      "Unlimited mock attempts",
      "Priority report turnaround",
      "Discount on holiday booster courses",
    ],
    cta: "Start Max",
    ctaHref: "/book-a-call?product=max",
    badge: "Best Value",
    billingMode: "subscription",
    stripePriceId: "price_1TvOO9R2MwXT1VWaP1MjSCX7",
  },
];

export const GROUP_TUITION_PRICING: PricingTier[] = [
  {
    id: "group",
    name: "Group Tuition",
    description: "Small-group weekly classes covering the full 11+ curriculum — 4 lessons a month or more.",
    price: "£15",
    period: "/session",
    features: [
      "4 lessons a month or more",
      "Weekly small-group class (max 6 students)",
      "Structured term-by-term curriculum",
      "English, maths, verbal and non-verbal reasoning",
      "Termly progress report",
      "First session available as a trial",
    ],
    cta: "Enquire About Group Tuition",
    ctaHref: "/book-a-call?product=group-tuition",
    billingMode: "subscription",
  },
];

export const PRIVATE_TUITION_PRICING: PricingTier[] = [
  {
    id: "private",
    name: "Private Tuition",
    description: "1:1 sessions built entirely around your child's weak areas — 4 lessons a month or more.",
    price: "£30",
    period: "/session",
    features: [
      "4 lessons a month or more",
      "1:1 sessions, fully personalised",
      "Built around diagnostic results",
      "Tutor notes after every session",
      "Direct messaging with your tutor",
      "First session available as a trial",
    ],
    cta: "Enquire About Private Tuition",
    ctaHref: "/book-a-call?product=private-tuition",
    billingMode: "subscription",
  },
];

export const HOLIDAY_PRICING: PricingTier[] = [
  {
    id: "holiday",
    name: "Holiday Booster Course",
    description: "Private tuition, mock exams and holiday support combined into one intensive week.",
    price: "£50",
    period: "/week",
    features: [
      "Private tuition + mocks + holiday help",
      "Small group sizes",
      "All four 11+ subject areas covered",
      "Daily mini-mock with feedback",
      "Take-home revision pack",
    ],
    cta: "Enquire About Holiday Booster",
    ctaHref: "/book-a-call?product=holiday-booster",
    billingMode: "one-off",
  },
];

/** Back-compat aliases: dedicated pages (weekly-mock-club, practice-paper-simulator,
 * complete-programme) still import these names pending a full content rewrite onto
 * the Free/Pro/Max ladder — see status.md. */
export const MOCK_CLUB_PRICING = PLATFORM_TIER_PRICING.filter((tier) => tier.id === "pro");
export const PRACTICE_SIMULATOR_PRICING = PLATFORM_TIER_PRICING.filter((tier) => tier.id === "pro");
export const PROGRAMME_PRICING = PLATFORM_TIER_PRICING.filter((tier) => tier.id === "max");

/** Free is intentionally left out of the main buying grid — it's the registration
 * path (`/register`), not something to shop for alongside paid tiers. Streamlines
 * the buying decision down to Pro vs. Max, with Pro pushed as the default choice. */
export const PLATFORM_TIER_PRICING_FOR_SALE = PLATFORM_TIER_PRICING.filter((tier) => tier.id !== "free");

export const ALL_PRICING_GROUPS: { id: string; title: string; tiers: PricingTier[] }[] = [
  { id: "platform", title: "Pro / Max", tiers: PLATFORM_TIER_PRICING_FOR_SALE },
  { id: "group", title: "Group Tuition", tiers: GROUP_TUITION_PRICING },
  { id: "private", title: "Private Tuition", tiers: PRIVATE_TUITION_PRICING },
  { id: "holiday", title: "Holiday Booster", tiers: HOLIDAY_PRICING },
  { id: "diagnostic", title: "Diagnostic Assessment", tiers: DIAGNOSTIC_PRICING },
];
