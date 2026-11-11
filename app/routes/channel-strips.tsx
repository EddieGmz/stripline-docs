import { Fragment } from "react";
import { useNavigate } from "react-router";
import { Crumb, GuidePager } from "~/components/docs";
import {
  Table,
  TableCell,
  TableGroup,
  TableHead,
  TableRow,
} from "~/components/ui/table";
import { summaries } from "~/data/profiles.server";
import type { Route } from "./+types/channel-strips";

export const meta: Route.MetaFunction = () => [
  { title: "Channel strips · Stripline" },
];

export function loader() {
  return { strips: summaries() };
}

export default function ChannelStrips({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { strips } = loaderData;
  return (
    <>
      <Crumb />
      <h1>
        Channel <em>strips</em>
      </h1>
      <p className="lede">
        The {strips.length} plugins Stripline supports, and how each one maps
        onto the console.
      </p>
      <p>
        <b>Shared</b> counts the console's common controls the plugin has
        (input, filters, four EQ bands, compressor, gate, output). <b>Own</b>{" "}
        counts the additional controls only that plugin has that are mapped on
        the stripline's extra slots, or as automation-only parameters.
      </p>
      <Table>
        <thead>
          <tr>
            <TableHead>Plugin</TableHead>
            <TableHead>Shared</TableHead>
            <TableHead>Own</TableHead>
          </tr>
        </thead>
        <tbody>
          {strips.map((s, i) => (
            <Fragment key={s.slug}>
              {s.vendor !== strips[i - 1]?.vendor && (
                <TableGroup colSpan={3}>{s.vendor}</TableGroup>
              )}
              <TableRow
                className="cursor-pointer hover:bg-sidebar"
                onClick={() => navigate(`/channel-strips/${s.slug}`)}
              >
                <TableCell>
                  <a
                    href={`channel-strips/${s.slug}`}
                    onClick={(e) => e.preventDefault()}
                    className="font-semibold text-foreground! no-underline!"
                  >
                    {s.name}
                  </a>
                </TableCell>
                <TableCell>
                  <span className="mr-2 inline-block h-1.5 w-16 overflow-hidden rounded-full bg-muted align-middle">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${(s.mapped / s.total) * 100}%` }}
                    />
                  </span>
                  {s.mapped}/{s.total}
                </TableCell>
                <TableCell>{s.own}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </Table>
      <GuidePager at="/channel-strips" />
    </>
  );
}
