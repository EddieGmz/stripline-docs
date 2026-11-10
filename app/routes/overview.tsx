import { Link } from "react-router";
import { Callout, Crumb, GuidePager } from "~/components/docs";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { summaries } from "~/data/profiles.server";
import type { Route } from "./+types/overview";

export const meta: Route.MetaFunction = () => [
  { title: "Stripline · Documentation" },
  { name: "description", content: "Every channel strip plugin in your REAPER session, side by side on one console." },
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
        Stripline puts the channel strip plugins in your REAPER session side by side, like a hardware console. One knob
        layout for every plugin, so a session mixed with an SSL, a Neve and an API reads the same.
      </p>
      <div className="my-5.5 grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
        <Card className="px-4.5 py-4">
          <CardTitle>The bridge</CardTitle>
          <CardDescription>
            A VST3 plugin you put on each track. It hosts your channel strip and passes audio straight through it.
          </CardDescription>
        </Card>
        <Card className="px-4.5 py-4">
          <CardTitle>The console</CardTitle>
          <CardDescription>
            A desktop app showing every track as a strip: input, filters, EQ, dynamics, fader, meters.
          </CardDescription>
        </Card>
        <Card className="px-4.5 py-4">
          <CardTitle>Profiles</CardTitle>
          <CardDescription>
            Built into the bridge. Each one maps a plugin's own parameters onto the console's knobs.
          </CardDescription>
        </Card>
      </div>
      <h2>
        How it <em>works</em>
      </h2>
      <p>
        Each bridge connects to the console on your computer. Turn a knob on the console and the hosted plugin moves;
        turn it in the plugin window and the console follows. The console shows the plugin's own value text, so what
        you read is what the plugin does.
      </p>
      <ul>
        <li>Audio runs only through the hosted plugin. The bridge adds no processing and reports the plugin's latency.</li>
        <li>
          The bridge exposes 36 shared controls as its own parameters, so automation works the same whichever plugin is
          inside.
        </li>
        <li>In REAPER, strips follow the track order, mute and solo act on the track, and the transport follows REAPER.</li>
      </ul>
      <Callout>
        <b>VST3 only, known plugins only.</b> Stripline hosts the {loaderData.count} channel strips it has a profile for.
        See <Link to="/channel-strips">Channel strips</Link>.
      </Callout>
      <GuidePager at="/" />
    </>
  );
}
