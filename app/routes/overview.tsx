import { Link } from "react-router";
import { Callout, Crumb, GuidePager } from "~/components/docs";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { summaries } from "~/data/profiles.server";
import type { Route } from "./+types/overview";

export const meta: Route.MetaFunction = () => [
  { title: "Stripline · Documentation" },
  {
    name: "description",
    content:
      "Every channel strip plugin in your REAPER session, side by side on one console.",
  },
];

export function loader() {
  return { count: summaries().length };
}

export default function Overview({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Crumb />
      <h1>
        Every channel strip, on <em>one</em> console.
      </h1>
      <p className="lede">
        Stripline puts channel strip plugins in your REAPER session side by
        side, like a console. Directly inspired by solutions such as{" "}
        <Link to="https://www.uaudio.com/collections/luna" target="_blank">
          Luna
        </Link>
        ,{" "}
        <Link to="https://solidstatelogic.com/products/ssl-360" target="_blank">
          SSL 360
        </Link>
        ,{" "}
        <Link to="https://www.waves.com/plugins/cla-mixhub" target="_blank">
          CLA MixHub
        </Link>
        , and{" "}
        <Link
          to="https://store.harrisonaudio.com/all-products/mixbus-12"
          target="_blank"
        >
          Harrison Mixbus
        </Link>
      </p>
      <div className="my-5.5 grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
        <Card className="px-4.5 py-2">
          <CardTitle className="mt-2">The bridge</CardTitle>
          <CardDescription>
            A VST3 plugin you put on each track. It hosts your channel strip and
            passes audio straight through it.
          </CardDescription>
        </Card>
        <Card className="px-4.5 py-2">
          <CardTitle className="mt-2">The console</CardTitle>
          <CardDescription>
            A desktop app showing every track as a strip: input, filters, EQ,
            dynamics, fader, meters.
          </CardDescription>
        </Card>
        <Card className="px-4.5 py-2">
          <CardTitle className="mt-2">Profiles</CardTitle>
          <CardDescription>
            Built into the bridge. Each one maps a plugin's own parameters onto
            the console's knobs.
          </CardDescription>
        </Card>
      </div>
      <h2>
        Premises (please read <em>carefully</em>)
      </h2>
      <ul>
        <li>
          This tool is almost entirely <b>vibed-coded</b>
        </li>
        <li>
          I've experience as a Software Developer, but I'm <b>not</b> an Audio
          Plugin Developer
        </li>
        <li>
          I'm passionate about music, but I'm <b>not</b> a mixing engineer
        </li>
        <li>
          I use it almost exclusively for educational purposes, to play and
          practice doing mixes, and to learn how to listen for the different
          characteristics and nuances of the channel strips.
        </li>
      </ul>
      <h2>
        How it <em>works</em>
      </h2>
      <p>
        Each bridge connects to the console on your computer. Turn a knob on the
        console and the hosted plugin moves; turn it in the plugin window and
        the console follows. The console shows the plugin's own value text, so
        what you read is what the plugin does.
      </p>
      <ul>
        <li>
          Audio runs only through the hosted plugin. The bridge adds no
          processing and reports the plugin's latency.
        </li>
        <li>
          The bridge exposes 36 shared controls as its own parameters, so
          automation works the same whichever plugin is inside.
        </li>
      </ul>
      <Callout>
        <b>VST3 only, plugins with mapped profile only</b>. See mapped{" "}
        <Link to="/channel-strips">Channel strips</Link>.
      </Callout>
      <GuidePager at="/" />
    </>
  );
}
