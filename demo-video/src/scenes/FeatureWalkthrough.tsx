import React from "react";
import { interpolate, Sequence, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { BrowserFrame } from "../components/BrowserFrame";
import { KenBurns } from "../components/KenBurns";
import { COLORS, EASE_OUT, FONT_SANS, FONT_SERIF } from "../theme";

export const BEAT_DURATION = 300; // 10s @ 30fps
const BEAT_OVERLAP = 20;
export const FEATURE_WALKTHROUGH_DURATION = BEAT_DURATION * 3;

type Beat = {
  eyebrow: string;
  title: string;
  description: string;
  mockLabel: string;
  visual: React.ReactNode;
};

const TimerVisual: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      backgroundColor: COLORS.cream,
    }}
  >
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: 16,
        letterSpacing: 2,
        color: COLORS.slate,
        textTransform: "uppercase",
      }}
    >
      Section 2 of 4 — Comprehension
    </div>
    <div
      style={{
        fontFamily: FONT_SERIF,
        fontSize: 96,
        color: COLORS.navy,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      21:08
    </div>
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: 18,
        color: COLORS.slate,
      }}
    >
      Full exam-hall conditions — no pausing, no answers shown early
    </div>
  </div>
);

const MarkingVisual: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: 32,
      backgroundColor: COLORS.cream,
    }}
  >
    {[
      { q: "Q41 — Fractions of an amount", ok: true },
      { q: "Q42 — Ratio & proportion", ok: true },
      { q: "Q43 — Spot the grammar mistake", ok: false },
      { q: "Q44 — Cloze: missing word", ok: true },
    ].map((row) => (
      <div
        key={row.q}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: COLORS.white,
          borderRadius: 8,
          padding: "14px 20px",
          fontFamily: FONT_SANS,
          fontSize: 20,
          color: COLORS.navy,
        }}
      >
        <span>{row.q}</span>
        <span
          style={{
            color: row.ok ? "#2f8a4e" : "#c0392b",
            fontWeight: 700,
          }}
        >
          {row.ok ? "Correct" : "Missed"}
        </span>
      </div>
    ))}
    <div
      style={{
        marginTop: 8,
        fontFamily: FONT_SERIF,
        fontSize: 22,
        color: COLORS.gold,
        textAlign: "right",
      }}
    >
      Marked instantly — no waiting on a tutor's red pen
    </div>
  </div>
);

const BreakdownVisual: React.FC = () => {
  const topics = [
    { name: "Algebra", pct: 92 },
    { name: "Comprehension", pct: 61 },
    { name: "Grammar", pct: 78 },
    { name: "Ratio & Proportion", pct: 45 },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        padding: 32,
        justifyContent: "center",
        backgroundColor: COLORS.cream,
      }}
    >
      {topics.map((t) => (
        <div key={t.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONT_SANS,
              fontSize: 18,
              color: COLORS.navy,
            }}
          >
            <span>{t.name}</span>
            <span style={{ fontWeight: 700 }}>{t.pct}%</span>
          </div>
          <div
            style={{
              height: 14,
              borderRadius: 999,
              backgroundColor: "#e3ded0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${t.pct}%`,
                borderRadius: 999,
                backgroundColor:
                  t.pct < 55 ? COLORS.gold : COLORS.navy,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const BEATS: Beat[] = [
  {
    eyebrow: "01 — Exam conditions",
    title: "Proctored. Timed. No shortcuts.",
    description:
      "Every mock runs under real exam-hall conditions — a fixed clock, one attempt, no peeking at answers.",
    mockLabel: "REAL SCREENSHOT HERE — timed mock room, section timer",
    visual: <TimerVisual />,
  },
  {
    eyebrow: "02 — Marking",
    title: "Marked the moment it's submitted.",
    description:
      "No red pen, no two-week wait. Every answer is checked against a standardized mark scheme instantly.",
    mockLabel: "REAL SCREENSHOT HERE — automated marking / submission",
    visual: <MarkingVisual />,
  },
  {
    eyebrow: "03 — Feedback",
    title: "A real answer for parents.",
    description:
      "A topic-by-topic breakdown shows exactly where a child is ready — and where they aren't, yet.",
    mockLabel: "REAL SCREENSHOT HERE — parent-facing report / topic breakdown",
    visual: <BreakdownVisual />,
  },
];

const FeatureBeat: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, BEAT_DURATION - 20, BEAT_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const textX = interpolate(frame, [0, 30], [-24, 0], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visualScale = interpolate(frame, [0, 30], [0.95, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 90,
        padding: "0 130px",
      }}
    >
      <div
        style={{
          flex: "0 0 560px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          transform: `translateX(${textX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 18,
            letterSpacing: 2,
            color: COLORS.gold,
            textTransform: "uppercase",
          }}
        >
          {beat.eyebrow}
        </div>
        <div
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 54,
            color: COLORS.cream,
            lineHeight: 1.15,
          }}
        >
          {beat.title}
        </div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            color: COLORS.slate,
            lineHeight: 1.5,
          }}
        >
          {beat.description}
        </div>
      </div>
      <div
        style={{
          flex: "0 0 760px",
          transform: `scale(${visualScale})`,
        }}
      >
        <BrowserFrame width={760} height={480}>
          <KenBurns durationInFrames={BEAT_DURATION} endScale={1.04}>
            {beat.visual}
          </KenBurns>
        </BrowserFrame>
        <div
          style={{
            marginTop: 12,
            fontFamily: FONT_SANS,
            fontSize: 13,
            color: COLORS.slate,
            opacity: 0.7,
          }}
        >
          {beat.mockLabel}
        </div>
      </div>
    </div>
  );
};

export const FeatureWalkthrough: React.FC = () => {
  return (
    <Scene durationInFrames={FEATURE_WALKTHROUGH_DURATION}>
      {BEATS.map((beat, i) => (
        <Sequence
          key={beat.title}
          from={i * (BEAT_DURATION - BEAT_OVERLAP)}
          durationInFrames={BEAT_DURATION}
          layout="none"
        >
          <FeatureBeat beat={beat} />
        </Sequence>
      ))}
    </Scene>
  );
};
