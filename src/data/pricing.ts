import type { PricingTier } from "@/types/pricing";

export const DIAGNOSTIC_PRICING: PricingTier[] = [
  {
    id: "diagnostic",
    name: "Diagnostic Assessment",
    description: "A one-off assessment across English, maths, verbal and non-verbal reasoning.",
    price: "£145",
    period: "one-off",
    features: [
      "Full assessment, all four 11+ areas",
      "Overall readiness score",
      "Subject-by-subject breakdown",
      "Topic weakness analysis",
      "Timing and accuracy analysis",
      "Recommended learning plan",
      "20-minute results call with a tutor",
    ],
    cta: "Book Diagnostic Assessment",
    ctaHref: "/book-a-call?product=diagnostic-assessment",
    billingMode: "one-off",
  },
];

export const MOCK_CLUB_PRICING: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Mock Club",
    description: "For families who want consistent, low-cost exam practice.",
    price: "£39",
    period: "/month",
    features: [
      "One weekly timed mock",
      "Score report after every mock",
      "Subject breakdown",
      "Parent email summary",
    ],
    cta: "Join Starter",
    ctaHref: "/book-a-call?product=weekly-mock-club&tier=starter",
    billingMode: "subscription",
  },
  {
    id: "plus",
    name: "Mock Club Plus",
    description: "Our most popular plan — practice plus the analysis to act on it.",
    price: "£69",
    period: "/month",
    features: [
      "Everything in Starter",
      "Detailed mistake breakdown",
      "Topic weakness analysis",
      "Recommended practice after each mock",
      "Monthly progress trend",
    ],
    cta: "Join Plus",
    ctaHref: "/book-a-call?product=weekly-mock-club&tier=plus",
    badge: "Most Popular",
    highlighted: true,
    billingMode: "subscription",
  },
  {
    id: "premium",
    name: "Mock Club Premium",
    description: "Full support for families who want a tutor reviewing every result.",
    price: "£119",
    period: "/month",
    features: [
      "Everything in Plus",
      "Monthly mock review session",
      "Parent progress call",
      "Personalised improvement plan",
      "Priority holiday course access",
    ],
    cta: "Join Premium",
    ctaHref: "/book-a-call?product=weekly-mock-club&tier=premium",
    billingMode: "subscription",
  },
];

export const PRACTICE_SIMULATOR_PRICING: PricingTier[] = [
  {
    id: "simulator",
    name: "Practice Paper Simulator",
    description: "Unlimited timed practice papers with instant scoring.",
    price: "£19",
    period: "/month",
    features: [
      "Unlimited timed practice papers",
      "Instant scoring after every attempt",
      "Topic-level breakdown",
      "Accuracy and timing tracking",
      "Full attempt history",
      "Parent dashboard access",
    ],
    cta: "Try Practice Paper Simulator",
    ctaHref: "/book-a-call?product=practice-paper-simulator",
    billingMode: "subscription",
  },
];

export const GROUP_TUITION_PRICING: PricingTier[] = [
  {
    id: "group",
    name: "Group Tuition",
    description: "Small-group weekly classes covering the full 11+ curriculum.",
    price: "£15",
    period: "/session",
    features: [
      "Weekly small-group class (max 6 students)",
      "Structured term-by-term curriculum",
      "English, maths, verbal and non-verbal reasoning",
      "Termly progress report",
      "Homework set after every session",
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
    description: "1:1 sessions built entirely around your child's weak areas.",
    price: "£30",
    period: "/session",
    features: [
      "1:1 sessions, fully personalised",
      "Built around diagnostic results",
      "Flexible weekly scheduling",
      "Tutor notes after every session",
      "Direct messaging with your tutor",
      "First session available as a trial",
    ],
    cta: "Enquire About Private Tuition",
    ctaHref: "/book-a-call?product=private-tuition",
    billingMode: "subscription",
  },
];

export const PROGRAMME_PRICING: PricingTier[] = [
  {
    id: "programme",
    name: "Complete 11+ Programme",
    description: "Tuition, mocks, diagnostics and reporting in one managed plan.",
    price: "£249",
    period: "/month",
    features: [
      "Initial diagnostic assessment",
      "Weekly group tuition",
      "Weekly mock exams",
      "Full Practice Paper Simulator access",
      "Monthly progress reports",
      "Ongoing weak-area tracking",
      "Termly parent check-in call",
      "Discount on holiday booster courses",
      "Personalised improvement plan",
    ],
    cta: "Apply for Complete Programme",
    ctaHref: "/book-a-call?product=complete-programme",
    badge: "Best Value",
    highlighted: true,
    billingMode: "subscription",
  },
];

export const HOLIDAY_PRICING: PricingTier[] = [
  {
    id: "holiday",
    name: "Holiday Booster Course",
    description: "An intensive, focused course during Easter, half-term or summer.",
    price: "£225",
    period: "/course",
    features: [
      "3-day intensive course",
      "Small group sizes",
      "All four 11+ subject areas covered",
      "Daily mini-mock with feedback",
      "Take-home revision pack",
    ],
    cta: "View Holiday Dates",
    ctaHref: "/holiday-booster",
    billingMode: "one-off",
  },
];

export const ALL_PRICING_GROUPS: { id: string; title: string; tiers: PricingTier[] }[] = [
  { id: "diagnostic", title: "Diagnostic Assessment", tiers: DIAGNOSTIC_PRICING },
  { id: "simulator", title: "Practice Paper Simulator", tiers: PRACTICE_SIMULATOR_PRICING },
  { id: "mocks", title: "Weekly Mock Club", tiers: MOCK_CLUB_PRICING },
  { id: "group", title: "Group Tuition", tiers: GROUP_TUITION_PRICING },
  { id: "private", title: "Private Tuition", tiers: PRIVATE_TUITION_PRICING },
  { id: "programme", title: "Complete 11+ Programme", tiers: PROGRAMME_PRICING },
  { id: "holiday", title: "Holiday Booster", tiers: HOLIDAY_PRICING },
];
