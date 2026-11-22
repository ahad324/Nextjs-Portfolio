import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence } from "remotion";
import score from "./assets/score.wav";
import { Backdrop } from "./components/Backdrop";
import { CloseScene } from "./scenes/Close";
import { CodeScene } from "./scenes/Code";
import { DeployScene } from "./scenes/Deploy";
import { OpenScene } from "./scenes/Open";
import { SystemScene } from "./scenes/System";
import { timeline as T } from "./timeline";

/**
 * The intro film: idea → code → system → production → signature.
 * Deliberately different from the website — it shows the work, not the site.
 */
export function Intro() {
  return (
    <AbsoluteFill>
      <Backdrop />
      <Sequence from={T.open.from} durationInFrames={T.open.duration}>
        <OpenScene />
      </Sequence>
      <Sequence from={T.code.from} durationInFrames={T.code.duration}>
        <CodeScene />
      </Sequence>
      <Sequence from={T.system.from} durationInFrames={T.system.duration}>
        <SystemScene />
      </Sequence>
      <Sequence from={T.deploy.from} durationInFrames={T.deploy.duration}>
        <DeployScene />
      </Sequence>
      <Sequence from={T.close.from} durationInFrames={T.close.duration}>
        <CloseScene />
      </Sequence>
      <Audio src={score} />
    </AbsoluteFill>
  );
}
