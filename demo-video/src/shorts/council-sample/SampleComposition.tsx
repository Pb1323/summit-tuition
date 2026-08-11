import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { CardBackground } from "../cards/CardBackground";
import { Starburst } from "../cards/Starburst";
import { CardText } from "../cards/CardText";
import { ShortScene } from "../components/ShortScene";
import { ChatBubbleScene } from "./ChatBubbleScene";
import { SwarmScene } from "./SwarmScene";
import { AdviserScene } from "./AdviserScene";
import { RoundTableScene } from "./RoundTableScene";
import { BulletListScene } from "./BulletListScene";
import { TypingScene } from "./TypingScene";
import { SAMPLE_SCRIPT, type Corner } from "./sampleScript";

const OPPOSITE: Record<Corner, Corner> = { tl: "br", tr: "bl", bl: "tr", br: "tl" };

const offsets: number[] = [];
{
  let cursor = 0;
  for (const beat of SAMPLE_SCRIPT) {
    offsets.push(cursor);
    cursor += beat.duration;
  }
}

export const TOTAL_SAMPLE_DURATION =
  offsets[offsets.length - 1] + SAMPLE_SCRIPT[SAMPLE_SCRIPT.length - 1].duration;

export const CouncilSampleVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <CardBackground />

      {SAMPLE_SCRIPT.map((beat, i) => (
        <Sequence key={i} from={offsets[i]} durationInFrames={beat.duration} layout="none">
          <ShortScene durationInFrames={beat.duration} fadeInFrames={4} fadeOutFrames={4}>
            <Starburst corner={beat.corner} size={beat.kind === "burst" ? 320 : 220} />
            <Starburst corner={OPPOSITE[beat.corner]} delay={4} size={beat.kind === "burst" ? 260 : 170} />

            {beat.kind === "card" ? (
              <CardText
                heading={beat.heading}
                pill={beat.pill}
                sub={beat.sub}
                underline={beat.underline}
                durationInFrames={beat.duration}
                corner={beat.corner}
              />
            ) : null}
            {beat.kind === "chat" ? <ChatBubbleScene bubbles={beat.bubbles} /> : null}
            {beat.kind === "swarm" ? <SwarmScene count={beat.count} caption={beat.caption} /> : null}
            {beat.kind === "adviser" ? (
              <AdviserScene title={beat.title} description={beat.description} />
            ) : null}
            {beat.kind === "table" ? (
              <RoundTableScene showChairman={beat.showChairman} caption={beat.caption} />
            ) : null}
            {beat.kind === "bullets" ? <BulletListScene lines={beat.lines} /> : null}
            {beat.kind === "typing" ? (
              <TypingScene fullText={beat.fullText} caption={beat.caption} />
            ) : null}
          </ShortScene>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const CouncilSampleComposition: React.FC = () => {
  return (
    <Composition
      id="CouncilSample"
      component={CouncilSampleVideo}
      durationInFrames={TOTAL_SAMPLE_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
