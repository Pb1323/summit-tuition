import { loadFont as loadLiterata } from "@remotion/google-fonts/Literata";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Vertical "short" template palette — deliberately separate from the main
// demo-video's navy/gold theme (src/theme.ts). Warm beige/orange/cream,
// inspired by kinetic-typography AI-explainer shorts. Not a copy of any
// single brand's exact colors/logo — swap SHORT_COLORS below if the target
// palette needs to shift.
export const SHORT_COLORS = {
  beige: "#f2ede1",
  beigeAlt: "#e9e1cf",
  orange: "#d97757",
  orangeSoft: "#e8967a",
  ink: "#2b241c",
  cream: "#fffdf8",
} as const;

const { fontFamily: literataFamily } = loadLiterata("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const SHORT_FONT_SERIF = literataFamily;
export const SHORT_FONT_SANS = interFamily;

export const SHORT_EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);
