/**
 * The channel strips, read at build time from data/: a copy of the profiles the bridge ships
 * (protocol/profiles) and of the shared controls (protocol/schema/controls.json). Every page
 * is prerendered, so this runs only during the build.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DATA = join(process.cwd(), "data");

export interface SharedRow {
  id: string;
  group: string;
  label: string;
  /** The plugin's own parameter name, or null when the plugin has no such control. */
  param: string | null;
  behaviour: string | null;
}

export interface OwnRow {
  label: string;
  param: string | null;
  /** Where it sits on the strip (GLOBAL, IN, FILT, EQ, COMP, GATE), or null: automation only. */
  section: string | null;
  behaviour: string | null;
  steps?: number;
}

export interface Strip {
  slug: string;
  name: string;
  vendor: string;
  notes: string;
  shell: boolean;
  shared: SharedRow[];
  own: OwnRow[];
}

export type StripSummary = Pick<Strip, "slug" | "name" | "vendor"> & {
  mapped: number;
  total: number;
  own: number;
};

interface Control {
  id: string;
  group: string;
  label: string;
}

// The profile format is checked by the protocol's own schema; here only what the pages show.
interface Mapping {
  available?: boolean;
  type?: string;
  param?: { name?: string };
  curve?: { invert?: boolean };
  invert?: boolean;
}
interface Profile {
  name: string;
  notes?: string;
  plugin: { vendor: string; shell?: boolean };
  mappings: Record<string, Mapping>;
  extras?: { id: string; label: string; mapping?: Mapping; choices?: unknown[] }[];
  strip?: Record<string, unknown>;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function behaviour(m: Mapping | undefined): string | null {
  if (!m || m.available === false || !m.type) return null;
  const kind = { continuous: "Continuous", stepped: "Stepped", even: "Stepped", switch: "Switch" }[m.type] ?? m.type;
  return m.curve?.invert || m.invert ? `${kind}, inverted` : kind;
}

/** Where each extra control is placed on the strip, and the label it gets there. */
function placements(strip: Record<string, unknown> = {}) {
  const at = new Map<string, { section: string; label?: string }>();
  const add = (section: string, item: unknown) => {
    const id = typeof item === "string" ? item : (item as { control: string }).control;
    const label = typeof item === "string" ? undefined : (item as { label?: string }).label;
    at.set(id, { section, label });
  };
  ((strip.global as unknown[]) ?? []).forEach((i) => add("Global", i));
  for (const s of ["in", "filt", "eq", "comp", "gate"]) {
    const part = (strip[s] ?? {}) as { knobs?: unknown[]; buttons?: unknown[] };
    [...(part.knobs ?? []), ...(part.buttons ?? [])].forEach((i) => add(s.toUpperCase(), i));
  }
  return at;
}

let cache: Strip[] | null = null;

export function strips(): Strip[] {
  if (cache) return cache;
  const controls: Control[] = JSON.parse(readFileSync(join(DATA, "controls.json"), "utf8")).controls;
  const dir = join(DATA, "profiles");
  cache = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")) as Profile)
    .map((p): Strip => {
      const at = placements(p.strip);
      return {
        slug: slugify(p.name),
        name: p.name,
        vendor: p.plugin.vendor,
        notes: p.notes ?? "",
        shell: !!p.plugin.shell,
        shared: controls.map((c) => {
          const m = p.mappings[c.id];
          return { id: c.id, group: c.group, label: c.label, param: m?.param?.name ?? null, behaviour: behaviour(m) };
        }),
        own: (p.extras ?? []).map((e) => {
          const place = at.get(`x.${e.id}`);
          return {
            label: place?.label ?? e.label,
            param: e.mapping?.param?.name ?? null,
            section: place?.section ?? null,
            behaviour: behaviour(e.mapping),
            steps: e.choices?.length,
          };
        }),
      };
    })
    .sort((a, b) => a.vendor.localeCompare(b.vendor) || a.name.localeCompare(b.name, undefined, { numeric: true }));
  return cache;
}

export function summaries(): StripSummary[] {
  return strips().map((s) => ({
    slug: s.slug,
    name: s.name,
    vendor: s.vendor,
    mapped: s.shared.filter((r) => r.param).length,
    total: s.shared.length,
    own: s.own.length,
  }));
}
