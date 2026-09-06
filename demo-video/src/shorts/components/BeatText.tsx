import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SERIF, SHORT_FONT_SANS } from "../theme";
import { AccentUnderline } from "./AccentUnderline";

export type BeatWord = {
  text: string;
  accent?: boolean;
};

type BeatTextProps = {
  /** Small uppercase label above the headline, e.g. "THE PROBLEM". Optional. */
  kicker?: string;
  /** Headline words, each rendered as its own staggered reveal. */
  words: BeatWord[];
  /** Frame (within this beat's own Sequence) each word should start entering. */
  wordStagger?: number;
  /** Draw an accent underline beneath the headline once it's fully in (CTA beats). */
  underline?: boolean;
};

const WORD_STAGGER_DEFAULT = 4;

/**
 * One kinetic-typography "beat": a kicker + a headline that reveals
 * word-by-word with a soft upward spring, then holds with a slow
 * continuous zoom (the "punch-in" feel from the reference shorts) for the
 * remainder of its Sequence, then the parent Scene wrapper fades it out.
 */
export const BeatText: React.FC<BeatTextProps> = ({
  kicker,
  words,
  wordStagger = WORD_STAGGER_DEFAULT,
  underline = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slow continuous zoom across the whole beat — the "top-half zoom" feel,
  // applied to the full text block here since this template is text-only.
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  const kickerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 15,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 90px",
        transform: `scale(${zoom})`,
      }}
    >
      {kicker ? (
        <div
          style={{
            fontFamily: SHORT_FONT_SANS,
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: SHORT_COLORS.orange,
            opacity: kickerProgress,
            transform: `translateY(${(1 - kickerProgress) * 18}px)`,
            marginBottom: 28,
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
          rowGap: 6,
          columnGap: 20,
        }}
      >
        {words.map((word, i) => {
          const delay = (kicker ? 10 : 0) + i * wordStagger;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, mass: 0.6 },
            durationInFrames: 18,
          });

          return (
            <span
              key={i}
              style={{
                fontFamily: SHORT_FONT_SERIF,
                fontWeight: 600,
                fontSize: 92,
                lineHeight: 1.08,
                color: word.accent ? SHORT_COLORS.orange : SHORT_COLORS.ink,
                opacity: progress,
                transform: `translateY(${(1 - progress) * 40}px) scale(${
                  0.85 + progress * 0.15
                })`,
                textAlign: "center",
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {underline ? (
        <AccentUnderline delay={(kicker ? 10 : 0) + words.length * wordStagger} />
      ) : null}
    </div>
  );
};
