// Lays out the build for GitHub Pages in dist/: React Router writes the prerendered pages under
// build/client/<basename>/ and the assets beside it, while Pages serves one folder at the basename.
// The SPA fallback becomes 404.html, so unknown addresses show the site's own "not found" page.
import { cpSync, existsSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = (process.env.DOCS_BASE ?? "/stripline-docs/").replace(/^\/|\/$/g, "");
const client = "build/client";
const dist = "dist";

rmSync(dist, { recursive: true, force: true });
const fallback = join(client, "index.html");
const pages = base ? join(client, base) : client;
if (base) {
  renameSync(fallback, join(client, "404.html"));
  cpSync(client, dist, { recursive: true, filter: (src) => src !== pages });
  cpSync(pages, dist, { recursive: true });
} else {
  cpSync(client, dist, { recursive: true });
}
writeFileSync(join(dist, ".nojekyll"), "");
if (!existsSync(join(dist, "index.html"))) throw new Error("dist/index.html missing");
console.log(`dist/ ready for /${base}/`);
