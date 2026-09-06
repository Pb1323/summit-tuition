import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { CheckeredBackground } from "./components/CheckeredBackground";
import { ShortScene } from "./components/ShortScene";
import { TopZone } from "./components/TopZone";
import { CaptionBar } from "./components/CaptionBar";
import { AccentUnderline } from "./components/AccentUnderline";
import { QuestionMockup } from "./components/mockups/QuestionMockup";
import { ScoreMockup } from "./components/mockups/ScoreMockup";
import { NotesMockup } from "./components/mockups/NotesMockup";
import { DashboardMockup } from "./components/mockups/DashboardMockup";
import { SCRIPT, type MockupKind } from "./script";

const MOCKUPS: Record<MockupKind, React.FC> = {
  dashboard: DashboardMockup,
  question: QuestionMockup,
  score: ScoreMockup,
  notes: NotesMockup,
};

const offsets: number[] = [];
{
  let cursor = 0;
  for (const beat of SCRIPT) {
    offsets.push(cursor);
    cursor += beat.durationInFrames;
  }
}

export const TOTAL_SHORT_DURATION =
  offsets[offsets.length - 1] + SCRIPT[SCRIPT.length - 1].durationInFrames;

export const SummitShortVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Persistent background — never resets between beats. */}
      <CheckeredBackground />

      {SCRIPT.map((beat, i) => {
        const Mockup = MOCKUPS[beat.mockup];
        return (
          <Sequence
            key={i}
            from={offsets[i]}
            durationInFrames={beat.durationInFrames}
            layout="none"
          >
            {/* Fast in/out — hard-cut pacing rather than a soft crossfade. */}
            <ShortScene durationInFrames={beat.durationInFrames} fadeInFrames={4} fadeOutFrames={4}>
              <TopZone tilt={beat.tilt}>
                <Mockup />
              </TopZone>
              <CaptionBar kicker={beat.kicker} words={beat.words} />
              {beat.underline ? (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: "20%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <AccentUnderline delay={(beat.kicker ? 6 : 0) + beat.words.length * 3 + 6} />
                </div>
              ) : null}
            </ShortScene>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const SummitShortComposition: React.FC = () => {
  return (
    <Composition
      id="SummitShort"
      component={SummitShortVideo}
      durationInFrames={TOTAL_SHORT_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
