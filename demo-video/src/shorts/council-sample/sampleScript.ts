import type { Bubble } from "./ChatBubbleScene";

export type Corner = "tl" | "tr" | "bl" | "br";

export type SampleBeat =
  | { kind: "card"; duration: number; corner: Corner; heading: string; pill?: string; sub?: string; underline?: boolean }
  | { kind: "chat"; duration: number; corner: Corner; bubbles: Bubble[] }
  | { kind: "swarm"; duration: number; corner: Corner; count?: number; caption?: string }
  | { kind: "adviser"; duration: number; corner: Corner; title: string; description: string }
  | { kind: "table"; duration: number; corner: Corner; showChairman?: boolean; caption?: string }
  | { kind: "bullets"; duration: number; corner: Corner; lines: string[] }
  | { kind: "typing"; duration: number; corner: Corner; fullText: string; caption?: string }
  | { kind: "burst"; duration: number; corner: Corner };

// Sample script exercising every beat "widget" found in the reference video's
// shot list, with fresh wording (not the source's exact script/branding).
export const SAMPLE_SCRIPT: SampleBeat[] = [
  {
    kind: "card",
    duration: 75,
    corner: "tl",
    heading: "Claude agrees with everything you say.",
    pill: "YES-MAN",
    sub: "Here's the fix.",
  },
  {
    kind: "chat",
    duration: 90,
    corner: "br",
    bubbles: [
      { from: "user", text: "Is this a good idea?" },
      { from: "ai", text: "Yes! Great idea." },
      { from: "user", text: "...are you sure?" },
    ],
  },
  { kind: "burst", duration: 18, corner: "tl" },
  {
    kind: "swarm",
    duration: 85,
    corner: "tr",
    count: 10,
    caption: "So it argues with itself first.",
  },
  {
    kind: "adviser",
    duration: 70,
    corner: "tl",
    title: "The Contrarian",
    description: "Hunts for the flaw in what you just said.",
  },
  {
    kind: "adviser",
    duration: 70,
    corner: "br",
    title: "The Outsider",
    description: "Reacts with zero context, zero bias.",
  },
  {
    kind: "adviser",
    duration: 70,
    corner: "tl",
    title: "The Executor",
    description: "Only cares what to do right now.",
  },
  {
    kind: "bullets",
    duration: 95,
    corner: "br",
    lines: [
      "They read each other's answers.",
      "They find the blind spots.",
      "They push back on each other.",
    ],
  },
  {
    kind: "table",
    duration: 90,
    corner: "tl",
    showChairman: true,
    caption: "Then a chairman weighs it all.",
  },
  {
    kind: "typing",
    duration: 90,
    corner: "br",
    caption: "You just type two words.",
    fullText: "Council this",
  },
  {
    kind: "card",
    duration: 100,
    corner: "tl",
    heading: "The final call.",
    pill: "COUNCIL THIS",
    sub: "Save this for your next big decision.",
    underline: true,
  },
];
