import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";
import type { BeatWord } from "./BeatText";

type CaptionBarProps = {
  kicker?: string;
  words: BeatWord[];
};

const WORD_STAGGER = 3; // tight — Hormozi-style captions pop fast, not float in slowly

/**
 * Bottom ~42% caption zone: bold all-caps Inter, hard scale-pop per word
 * (overshoot then settle, no gentle float-up), accent words get an orange
 * highlight pill instead of just a color change. This replaces the old
 * BeatText reveal, which read as soft kinetic-typography decoration rather
 * than the punchy captions the reference genre actually uses.
 */
export const CaptionBar: React.FC<CaptionBarProps> = ({ kicker, words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 12,
  });

  // Long single "words" (e.g. a URL) blow past the frame at full caption
  // size — scale the whole line down to keep clear of the left/right edges.
  const longestWord = Math.max(...words.map((w) => w.text.length));
  const fontSize = longestWord > 18 ? 40 : longestWord > 12 ? 52 : 64;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "42%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Platform UI (captions/buttons) typically overlays the bottom
        // ~250px of a 1920-tall short — keep our own content clear of it.
        justifyContent: "center",
        padding: "0 72px 220px",
      }}
    >
      {kicker ? (
        <div
          style={{
            fontFamily: SHORT_FONT_SANS,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: SHORT_COLORS.ink,
            opacity: 0.55 * kickerProgress,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {kicker}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: 10,
          columnGap: 14,
        }}
      >
        {words.map((word, i) => {
          const delay = (kicker ? 6 : 0) + i * WORD_STAGGER;
          // Hard overshoot pop: 0 -> 1.18 -> 1.0, fast (Hormozi-style "snap").
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 11, mass: 0.4, stiffness: 220 },
            durationInFrames: 10,
          });
          const scale = 0.4 + progress * 0.6 + Math.max(0, progress - 0.6) * 0.3;
          // Tiny per-word rotation jitter for an organic, non-robotic feel.
          const jitter = ((i * 37) % 7) - 3;

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontFamily: SHORT_FONT_SANS,
                fontWeight: 800,
                fontSize,
                lineHeight: 1.05,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: word.accent ? SHORT_COLORS.cream : SHORT_COLORS.ink,
                backgroundColor: word.accent
                  ? SHORT_COLORS.orange
                  : "transparent",
                padding: word.accent ? "4px 16px" : 0,
                borderRadius: 10,
                opacity: Math.min(1, progress * 1.4),
                transform: `scale(${scale}) rotate(${jitter * (1 - progress)}deg)`,
                textShadow: word.accent
                  ? "none"
                  : "0 2px 0 rgba(43,36,28,0.06)",
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
