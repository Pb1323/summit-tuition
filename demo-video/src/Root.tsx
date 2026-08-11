import "./index.css";
import { DemoVideoComposition } from "./Composition";
import { SummitShortComposition } from "./shorts/ShortComposition";
import { CardShortComposition } from "./shorts/cards/CardComposition";
import { CouncilSampleComposition } from "./shorts/council-sample/SampleComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <DemoVideoComposition />
      <SummitShortComposition />
      <CardShortComposition />
      <CouncilSampleComposition />
    </>
  );
};
