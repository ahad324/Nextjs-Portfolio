import { Composition } from "remotion";
import { Intro } from "./Intro";
import { FPS, TOTAL_FRAMES } from "./timeline";

export function Root() {
  return <Composition id="Intro" component={Intro} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />;
}
