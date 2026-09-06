import type { BeatWord } from "./components/BeatText";

export type MockupKind = "dashboard" | "question" | "score" | "notes";

export type Beat = {
  kicker?: string;
  words: BeatWord[];
  durationInFrames: number;
  /** Which recreated product screen shows in the top "screen recording" zone. */
  mockup: MockupKind;
  /** Slight per-beat tilt on the mockup card so consecutive beats don't look identical. */
  tilt?: number;
  /** Show the drawn underline accent under the caption (used on the CTA beat). */
  underline?: boolean;
};

// Real Summit Tuition marketing beats — swap the copy/mockup pairing here for
// a new video. Keep each beat to roughly 2-5 words; captions pop fast
// (Hormozi-style), so more than that starts to feel cluttered at this pace.
export const SCRIPT: Beat[] = [
  {
    kicker: "THE PROBLEM",
    words: [{ text: "Most" }, { text: "mocks" }, { text: "don't" }, { text: "feel" }, { text: "real.", accent: true }],
    durationInFrames: 75,
    mockup: "dashboard",
    tilt: -1.2,
  },
  {
    kicker: "SUMMIT TUITION",
    words: [{ text: "Real" }, { text: "school-style", accent: true }, { text: "papers." }],
    durationInFrames: 70,
    mockup: "question",
    tilt: 0.8,
  },
  {
    words: [{ text: "Marked" }, { text: "instantly.", accent: true }],
    durationInFrames: 65,
    mockup: "score",
    tilt: -0.6,
  },
  {
    words: [{ text: "Topic-by-topic" }, { text: "breakdown.", accent: true }],
    durationInFrames: 70,
    mockup: "score",
    tilt: 1,
  },
  {
    words: [{ text: "Study" }, { text: "notes", accent: true }, { text: "for" }, { text: "every" }, { text: "topic." }],
    durationInFrames: 70,
    mockup: "notes",
    tilt: -0.8,
  },
  {
    kicker: "FREE TO TRY",
    words: [{ text: "summit-tuition.vercel.app", accent: true }],
    durationInFrames: 95,
    mockup: "dashboard",
    tilt: 0,
    underline: true,
  },
];
