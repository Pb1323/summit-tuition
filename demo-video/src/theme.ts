import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Summit Tuition brand palette — keep in sync with the main app's
// src/app/globals.css if the brand colors ever change there.
export const COLORS = {
  navy: "#172033",
  navyDeep: "#0d1420",
  gold: "#f59e0b",
  goldSoft: "#fbbf24",
  cream: "#f5f1e6",
  white: "#ffffff",
  slate: "#8b93a7",
} as const;

const { fontFamily: frauncesFamily } = loadFraunces("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const FONT_SERIF = frauncesFamily;
export const FONT_SANS = interFamily;

// Slow, confident easing — no bounce, no overshoot.
export const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);
export const EASE_IN_OUT = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
