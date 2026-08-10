import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { CardBackground } from "./CardBackground";
import { Starburst } from "./Starburst";
import { CardText } from "./CardText";
import { ShortScene } from "../components/ShortScene";
import { CARD_SCRIPT } from "./cardScript";

const OPPOSITE = { tl: "br", tr: "bl", bl: "tr", br: "tl" } as const;

const offsets: number[] = [];
{
  let cursor = 0;
  for (const beat of CARD_SCRIPT) {
    offsets.push(cursor);
    cursor += beat.durationInFrames;
  }
}

export const TOTAL_CARD_DURATION =
  offsets[offsets.length - 1] + CARD_SCRIPT[CARD_SCRIPT.length - 1].durationInFrames;

export const CardShortVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <CardBackground />

      {CARD_SCRIPT.map((beat, i) => (
        <Sequence key={i} from={offsets[i]} durationInFrames={beat.durationInFrames} layout="none">
          <ShortScene durationInFrames={beat.durationInFrames} fadeInFrames={4} fadeOutFrames={4}>
            <Starburst corner={beat.corner} />
            <Starburst corner={OPPOSITE[beat.corner]} delay={4} size={170} />
            <CardText {...beat} />
          </ShortScene>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const CardShortComposition: React.FC = () => {
  return (
    <Composition
      id="CardShort"
      component={CardShortVideo}
      durationInFrames={TOTAL_CARD_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
