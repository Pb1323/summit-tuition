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
    slug: "free",
    name: "Free",
    audience: "Parents who want to try the platform first",
    benefit: "One diagnostic-style mock per subject and the first Study Notes topic in every strand — no card required.",
    price: "£0",
    href: "/register",
    category: "mocks",
  },
  {
    slug: "pro",
    name: "Pro",
    audience: "Children who need consistent exam practice",
    benefit: "Full mock library access and complete Study Notes across every subject, marked with a report every week.",
    price: "From £29/month",
    href: "/pricing#platform",
    category: "mocks",
    featured: true,
  },
  {
    slug: "max",
    name: "Max",
    audience: "Children aiming for the top bands who want the hardest papers",
    benefit: "Everything in Pro, plus Elite-difficulty mocks, unlimited attempts and priority report turnaround.",
    price: "From £60/month",
    href: "/pricing#platform",
    category: "mocks",
  },
  {
    slug: "group-tuition",
    name: "Group Tuition",
    audience: "Children who learn well alongside others",
    benefit: "Small-group weekly classes covering the full 11+ curriculum. 4 lessons a month or more.",
    price: "From £15/session",
    href: "/tuition/group",
    category: "tuition",
  },
  {
    slug: "private-tuition",
    name: "Private Tuition",
    audience: "Children who need focused, 1:1 support",
    benefit: "Personalised sessions targeted directly at your child's weak areas. 4 lessons a month or more.",
    price: "From £30/session",
    href: "/tuition/private",
    category: "tuition",
  },
  {
    slug: "holiday-booster",
    name: "Holiday Booster Courses",
    audience: "Children who want a focused intensive push",
    benefit: "Private tuition, mocks and holiday help combined into one intensive week.",
    price: "From £50/week",
    href: "/holiday-booster",
    category: "holiday",
  },
  {
    slug: "diagnostic-assessment",
    name: "Diagnostic Assessment",
    audience: "Parents who want a clear starting point",
    benefit: "A one-time, 3-hour assessment with a full 10-page evaluation report.",
    price: "From £145",
    href: "/diagnostic-assessment",
    category: "assessment",
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
