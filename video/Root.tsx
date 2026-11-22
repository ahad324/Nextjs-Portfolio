import { Composition, Still } from "remotion";
import { Intro } from "./Intro";
import { Poster } from "./Poster";
import { FPS, TOTAL_FRAMES } from "./timeline";

export function Root() {
  return (
    <>
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Still id="Poster" component={Poster} width={1920} height={1080} />
    </>
  );
}
