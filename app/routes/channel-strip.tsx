import { Fragment, useState } from "react";
import { data, Link } from "react-router";
import { Callout, Crumb, Pager } from "~/components/docs";
import { Card } from "~/components/ui/card";
import { Table, TableCell, TableGroup, TableHead, TableRow } from "~/components/ui/table";
import { strips } from "~/data/profiles.server";
import type { Route } from "./+types/channel-strip";

export function loader({ params }: Route.LoaderArgs) {
  const all = strips();
  const i = all.findIndex((s) => s.slug === params.slug);
  if (i < 0) throw data(null, { status: 404 });
  const link = (s?: (typeof all)[number]) => (s ? { to: `/channel-strips/${s.slug}`, title: s.name } : undefined);
  return { strip: all[i], prev: link(all[i - 1]), next: link(all[i + 1]) };
}

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: `${loaderData?.strip.name ?? "Channel strip"} · Stripline` },
  { name: "description", content: `How ${loaderData?.strip.name} maps onto the Stripline console.` },
];

function Stat({ value, total, label }: { value: number; total?: number; label: string }) {
  return (
    <Card className="min-w-[150px] px-4 py-3">
      <b className="block font-display text-[26px] leading-tight font-semibold">
        {value}
        {total !== undefined && <span className="text-[17px] text-muted-foreground">/{total}</span>}
      </b>
      <span className="text-[12.5px] text-muted-foreground">{label}</span>
    </Card>
  );
}

export default function ChannelStrip({ loaderData }: Route.ComponentProps) {
  const { strip, prev, next } = loaderData;
  const [onlyMapped, setOnlyMapped] = useState(false);
  const mapped = strip.shared.filter((r) => r.param).length;
  const rows = onlyMapped ? strip.shared.filter((r) => r.param) : strip.shared;

  return (
    <>
      <Crumb>
        <Link to="/channel-strips">Channel strips</Link> · {strip.vendor}
      </Crumb>
      <h1>{strip.name}</h1>
      <p className="text-sm text-muted-foreground">
        {strip.vendor}
        {strip.shell && " · inside the Waves WaveShell"}
      </p>
      <div className="my-5 flex flex-wrap gap-3">
        <Stat value={mapped} total={strip.shared.length} label="shared controls" />
        <Stat value={strip.own.length} label="own controls" />
        <Stat value={strip.shared.length - mapped} label="not on this plugin" />
      </div>
      {strip.notes && <Callout>{strip.notes}</Callout>}

      <h2>
        Shared <em>controls</em>
      </h2>
      <p>The console's common knobs and buttons, and the plugin parameter each one drives.</p>
      <label className="mt-3.5 inline-flex cursor-pointer items-center gap-2 text-[13px] text-muted-foreground">
        <input
          type="checkbox"
          checked={onlyMapped}
          onChange={(e) => setOnlyMapped(e.target.checked)}
          className="accent-(--primary)"
        />
        Hide controls this plugin doesn't have
      </label>
      <Table>
        <thead>
          <tr>
            <TableHead className="w-[24%]">Console</TableHead>
            <TableHead>Plugin parameter</TableHead>
            <TableHead className="w-[24%]">Behaviour</TableHead>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <Fragment key={r.id}>
              {r.group !== rows[i - 1]?.group && <TableGroup colSpan={3}>{r.group}</TableGroup>}
              {r.param ? (
                <TableRow>
                  <TableCell>{r.label}</TableCell>
                  <TableCell className="font-mono text-[12.5px] text-foreground">{r.param}</TableCell>
                  <TableCell>{r.behaviour}</TableCell>
                </TableRow>
              ) : (
                <TableRow className="text-muted-foreground">
                  <TableCell>{r.label}</TableCell>
                  <TableCell className="italic">not on this plugin</TableCell>
                  <TableCell />
                </TableRow>
              )}
            </Fragment>
          ))}
        </tbody>
      </Table>

      {strip.own.length > 0 && (
        <>
          <h2>
            The plugin's <em>own</em> controls
          </h2>
          <p>
            Controls only this plugin has. Most sit in the strip's extra slots under a short label (hover one on the
            console for its full name); the rest are automation-only, as bridge parameters named after the plugin's
            control.
          </p>
          <Table>
            <thead>
              <tr>
                <TableHead>Label</TableHead>
                <TableHead>Plugin parameter</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Behaviour</TableHead>
              </tr>
            </thead>
            <tbody>
              {strip.own.map((o, i) => (
                <TableRow key={`${o.label}-${i}`}>
                  <TableCell>
                    <span className="rounded bg-code px-1.5 py-px font-mono text-xs whitespace-nowrap text-foreground">
                      {o.label}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-[12.5px] text-foreground">{o.param ?? "—"}</TableCell>
                  <TableCell className={o.section ? undefined : "text-muted-foreground"}>
                    {o.section ?? "Automation only"}
                  </TableCell>
                  <TableCell>
                    {o.behaviour}
                    {o.steps ? `, ${o.steps} steps` : ""}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <Pager prev={prev} next={next} />
    </>
  );
}
