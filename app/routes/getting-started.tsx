import { Crumb, GuidePager, Step, Steps } from "~/components/docs";
import type { Route } from "./+types/getting-started";

export const meta: Route.MetaFunction = () => [
  { title: "Getting started · Stripline" },
];

export default function GettingStarted() {
  return (
    <>
      <Crumb />
      <h1>Getting started</h1>
      <Steps>
        <Step title="Open the console">
          Start the Stripline app. It waits for bridges; nothing to set up.
        </Step>
        <Step title="Add the bridge to a track">
          In REAPER: <i>FX → Stripline</i>. Its window shows{" "}
          <i>Connected to console</i>.
        </Step>
        <Step title="Scan once">
          Press <b>Plugins…</b>, then <b>Scan for channel strips</b>. Only the
          supported plugins are read, from the standard VST3 folders and any
          custom folder path you add.
        </Step>
        <Step title="Choose the channel strip">
          <b>Choose plugin…</b> lists them by company. The strip appears on the
          console in the plugin's colours.
        </Step>
        <Step title="Mix">
          Turn knobs on the console or in the plugin window: both follow each
          other. Double-click a strip header to open the hosted plugin.
        </Step>
      </Steps>
      <h2>
        Around the <em>console</em>
      </h2>
      <ul>
        <li>
          <b>VU / IN / FILT / EQ / DYN</b> in the top bar show or hide those
          parts on every strip.
        </li>
        <li>
          <b>Tracks</b> chooses which tracks are on the console. Alt-click a
          track to show only that one.
        </li>
        <li>
          The transport follows REAPER: <kbd>Space</kbd> play/stop,{" "}
          <kbd>Enter</kbd> pause, <kbd>R</kbd> repeat.
        </li>
        <li>
          The peak light on a VU stays on after a clip until you click the
          meter.
        </li>
      </ul>
      <GuidePager at="/getting-started" />
    </>
  );
}
