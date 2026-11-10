import type { Config } from "@react-router/dev/config";
import { strips } from "./app/data/profiles.server";

/** Where the site is served from: GitHub Pages serves it under /stripline-docs/. */
export const BASE = process.env.DOCS_BASE ?? "/stripline-docs/";

export default {
  // A static site: every page is rendered to HTML at build time, no server.
  ssr: false,
  basename: BASE,
  prerender: () => [
    "/",
    "/installation",
    "/getting-started",
    "/channel-strips",
    ...strips().map((s) => `/channel-strips/${s.slug}`),
  ],
} satisfies Config;
