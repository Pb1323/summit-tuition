import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SHORT_COLORS, SHORT_FONT_SANS } from "../theme";

export type CardBeat = {
  /** Big bold statement, split into words for a staggered reveal. */
  heading: string;
  /** Optional emphasized phrase shown as a black pill under the heading. */
  pill?: string;
  /** Optional smaller line under the pill (or heading, if no pill). */
  sub?: string;
  durationInFrames: number;
  corner: "tl" | "tr" | "bl" | "br";
  /** Underline the sub line (used on the final CTA card). */
  underline?: boolean;
};

const WORD_STAGGER = 3;

/**
 * One "text card" beat: word-by-word bold headline, an optional black pill
 * badge for the punchline phrase, and an optional smaller line underneath —
 * the flat card layout from kinetic-typography explainer shorts (as opposed
 * to the screen-recording-with-caption-bar layout in ../ShortComposition.tsx).
 */
export const CardText: React.FC<CardBeat> = ({ heading, pill, sub, underline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = heading.split(" ");
  const headingEnd = (words.length - 1) * WORD_STAGGER + 18;

  const pillProgress = spring({
    frame: frame - headingEnd,
    fps,
    config: { damping: 13, mass: 0.6 },
    durationInFrames: 16,
  });

  const subDelay = headingEnd + (pill ? 10 : 0);
  const subProgress = spring({
    frame: frame - subDelay,
    fps,
    config: { damping: 200 },
    durationInFrames: 14,
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
        padding: "0 96px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: 4,
          columnGap: 18,
        }}
      >
        {words.map((word, i) => {
          const delay = i * WORD_STAGGER;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, mass: 0.55 },
            durationInFrames: 16,
          });
          return (
            <span
              key={i}
              style={{
                fontFamily: SHORT_FONT_SANS,
                fontWeight: 700,
                fontSize: 76,
                lineHeight: 1.12,
                color: SHORT_COLORS.ink,
                opacity: progress,
                transform: `translateY(${(1 - progress) * 30}px)`,
                textAlign: "center",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {pill ? (
        <div
          style={{
            marginTop: 26,
            padding: "16px 34px",
            borderRadius: 16,
            backgroundColor: SHORT_COLORS.ink,
            opacity: pillProgress,
            transform: `translateY(${(1 - pillProgress) * 24}px) scale(${0.9 + pillProgress * 0.1})`,
          }}
        >
          <span
            style={{
              fontFamily: SHORT_FONT_SANS,
              fontWeight: 800,
              fontSize: 62,
              color: SHORT_COLORS.cream,
              letterSpacing: 0.5,
            }}
          >
            {pill}
          </span>
        </div>
      ) : null}

      {sub ? (
        <div
          style={{
            marginTop: 22,
            fontFamily: SHORT_FONT_SANS,
            fontWeight: 500,
            fontSize: 40,
            color: SHORT_COLORS.ink,
            opacity: subProgress,
            transform: `translateY(${(1 - subProgress) * 16}px)`,
            textAlign: "center",
            borderBottom: underline ? `4px solid ${SHORT_COLORS.orange}` : "none",
            paddingBottom: underline ? 8 : 0,
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};
