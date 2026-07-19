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

export const MOCK_CLUB_PRICING: PricingTier[] = [
  {
    id: "mock-club",
    name: "Weekly Mock Club",
    description: "6 full mock exams and around 600 questions a month, marked with a parent report every week.",
    price: "£29",
    period: "/month",
    features: [
      "6 full mock exams a month",
      "~600 questions a month",
      "Marked with a report after every mock",
      "Subject and topic-level breakdown",
      "Weekly parent email summary",
    ],
    cta: "Join Mock Club",
    ctaHref: "/book-a-call?product=weekly-mock-club",
    badge: "Most Popular",
    highlighted: true,
    billingMode: "subscription",
  },
];

export const PRACTICE_SIMULATOR_PRICING: PricingTier[] = [
  {
    id: "simulator",
    name: "Practice Paper Simulator",
    description: "4 practice papers and around 150 questions a month, plus practice by individual topic.",
    price: "£19",
    period: "/month",
    features: [
      "4 full practice papers a month",
      "~150 questions a month",
      "Practice by individual topic",
      "Instant scoring after every attempt",
      "Topic-level breakdown",
      "Full attempt history",
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
    cta: "View Holiday Dates",
    ctaHref: "/holiday-booster",
    billingMode: "one-off",
  },
];

export const PROGRAMME_PRICING: PricingTier[] = [
  {
    id: "programme",
    name: "Complete 11+ Programme",
    description: "Everything — diagnostics, practice papers, weekly mocks and tuition, combined into one managed plan.",
    price: "£60",
    period: "/week",
    features: [
      "Everything: diagnostics, practice papers, mocks and tuition",
      "Initial diagnostic assessment",
      "Weekly group tuition",
      "Weekly mock exams",
      "Full Practice Paper Simulator access",
      "Monthly progress reports",
      "Termly parent check-in call",
      "Discount on holiday booster courses",
    ],
    cta: "Apply for Complete Programme",
    ctaHref: "/book-a-call?product=complete-programme",
    badge: "Best Value",
    highlighted: true,
    billingMode: "subscription",
  },
];

export const ALL_PRICING_GROUPS: { id: string; title: string; tiers: PricingTier[] }[] = [
  { id: "group", title: "Group Tuition", tiers: GROUP_TUITION_PRICING },
  { id: "simulator", title: "Practice Paper Simulator", tiers: PRACTICE_SIMULATOR_PRICING },
  { id: "mocks", title: "Weekly Mock Club", tiers: MOCK_CLUB_PRICING },
  { id: "private", title: "Private Tuition", tiers: PRIVATE_TUITION_PRICING },
  { id: "holiday", title: "Holiday Booster", tiers: HOLIDAY_PRICING },
  { id: "programme", title: "Complete 11+ Programme", tiers: PROGRAMME_PRICING },
  { id: "diagnostic", title: "Diagnostic Assessment", tiers: DIAGNOSTIC_PRICING },
];
