import type { LadderProduct, UpsellProduct } from "@/types/product";

export const PRODUCT_LADDER: LadderProduct[] = [
  {
    slug: "free-call",
    name: "Free Parent Call",
    audience: "Parents who aren't sure where to start",
    benefit: "A 15-minute call to talk through your child's stage and the right next step.",
    price: "Free",
    href: "/book-a-call",
    category: "call",
  },
  {
    slug: "diagnostic-assessment",
    name: "Diagnostic Assessment",
    audience: "Parents who want a clear starting point",
    benefit: "A full assessment across all four 11+ areas, with a detailed written report.",
    price: "From £145",
    href: "/diagnostic-assessment",
    category: "assessment",
    featured: true,
  },
  {
    slug: "practice-paper-simulator",
    name: "Practice Paper Simulator",
    audience: "Children who want regular timed practice",
    benefit: "Online timed papers with instant scoring and topic-level breakdowns.",
    price: "From £19/month",
    href: "/practice-paper-simulator",
    category: "practice",
  },
  {
    slug: "weekly-mock-club",
    name: "Weekly Mock Club",
    audience: "Children who need consistent exam practice",
    benefit: "Weekly timed mocks under exam conditions, with a parent report every week.",
    price: "From £39/month",
    href: "/weekly-mock-club",
    category: "mocks",
    featured: true,
  },
  {
    slug: "group-tuition",
    name: "Group Tuition",
    audience: "Children who learn well alongside others",
    benefit: "Small-group weekly classes covering the full 11+ curriculum.",
    price: "From £89/month",
    href: "/tuition/group",
    category: "tuition",
  },
  {
    slug: "private-tuition",
    name: "Private Tuition",
    audience: "Children who need focused, 1:1 support",
    benefit: "Personalised sessions targeted directly at your child's weak areas.",
    price: "From £48/session",
    href: "/tuition/private",
    category: "tuition",
  },
  {
    slug: "complete-programme",
    name: "Complete 11+ Programme",
    audience: "Parents who want one complete system, fully managed",
    benefit: "Tuition, mocks, diagnostics and reporting combined into a single plan.",
    price: "From £249/month",
    href: "/complete-programme",
    category: "programme",
    featured: true,
  },
  {
    slug: "holiday-booster",
    name: "Holiday Booster Courses",
    audience: "Children who want a focused intensive push",
    benefit: "Short, high-intensity courses over Easter, half-term and summer.",
    price: "From £225/course",
    href: "/holiday-booster",
    category: "holiday",
  },
];

export const UPSELL_PRODUCTS: UpsellProduct[] = [
  {
    name: "Mock Review Add-On",
    description:
      "A detailed walkthrough of every mistake from your child's last mock, with weak-topic analysis and recommended homework.",
    price: "£25 per mock",
    href: "/weekly-mock-club#review-add-on",
  },
  {
    name: "Vocabulary Booster Pack",
    description:
      "A structured pack covering the synonym, antonym and comprehension vocabulary most often tested at 11+.",
    price: "£18",
    href: "/practice-packs#vocabulary",
  },
  {
    name: "Maths Problem Solving Pack",
    description:
      "Targeted practice for multi-step word problems, the area that trips up the most otherwise-strong candidates.",
    price: "£18",
    href: "/practice-packs#maths",
  },
  {
    name: "Comprehension Booster Pack",
    description:
      "Inference, retrieval and summary questions, with model answers and marking guidance for parents.",
    price: "£18",
    href: "/practice-packs#comprehension",
  },
  {
    name: "Holiday Intensive",
    description:
      "A focused two-day push on a single subject, scheduled around the school holidays.",
    price: "From £145",
    href: "/holiday-booster",
  },
  {
    name: "Parent Strategy Session",
    description:
      "A 1:1 call to walk through results, choose target schools' formats, and plan the next three months.",
    price: "£65",
    href: "/book-a-call",
  },
];
