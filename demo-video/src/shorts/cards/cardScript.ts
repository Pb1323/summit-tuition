import type { CardBeat } from "./CardText";

// Demo script for the "text card" template — style-matched to a
// kinetic-typography AI-explainer short (dot grid + bold statement + pill
// highlight + corner starbursts), NOT a copy of any specific creator's exact
// wording, branding, or watermark. Swap this content per video; the
// components in this folder (CardBackground/Starburst/CardText) stay fixed.
export const CARD_SCRIPT: CardBeat[] = [
  {
    heading: "Claude agrees with everything you say.",
    pill: "YES-MAN",
    sub: "Until you try this.",
    durationInFrames: 85,
    corner: "tl",
  },
  {
    heading: "It's not a prompt trick.",
    pill: "IT'S A COUNCIL",
    durationInFrames: 80,
    corner: "br",
  },
  {
    heading: "Your idea goes in front of five advisers at once.",
    durationInFrames: 105,
    corner: "tl",
  },
  {
    heading: "One hunts for the fatal flaw in what you just said.",
    durationInFrames: 105,
    corner: "br",
  },
  {
    heading: "One asks if you're even solving the right problem.",
    durationInFrames: 105,
    corner: "tl",
  },
  {
    heading: "One only cares what to do right now.",
    durationInFrames: 90,
    corner: "br",
  },
  {
    heading: "They read each other's answers. Then they push back.",
    durationInFrames: 105,
    corner: "tl",
  },
  {
    heading: "A chairman weighs it all and gives the final call.",
    durationInFrames: 105,
    corner: "br",
  },
  {
    heading: "Type two words:",
    pill: "COUNCIL THIS",
    sub: "Save this for your next big decision.",
    durationInFrames: 110,
    corner: "tl",
    underline: true,
  },
];
