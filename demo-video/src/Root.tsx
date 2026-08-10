import "./index.css";
import { DemoVideoComposition } from "./Composition";
import { SummitShortComposition } from "./shorts/ShortComposition";
import { CardShortComposition } from "./shorts/cards/CardComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <DemoVideoComposition />
      <SummitShortComposition />
      <CardShortComposition />
    </>
  );
};
