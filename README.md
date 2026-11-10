# Stripline docs

The documentation site for Stripline: overview, installation, getting started, and a page per supported
channel strip with its mapping.

React + React Router (framework mode) + Tailwind, shadcn-style components (Base UI). Every page is prerendered
to static HTML at build time; there is no server.

The channel strip pages are generated from `data/`: a copy of the profiles the bridge ships and of the shared
controls, taken from the protocol repo.

## Run it

```bash
git clone https://github.com/EddieGmz/stripline-docs
cd stripline-docs
npm install

npm run dev        # http://localhost:5173/stripline-docs/
npm run build      # static site in dist/
```

The site is served under `/stripline-docs/` (GitHub Pages). For another address set `DOCS_BASE`, e.g.
`DOCS_BASE=/ npm run build` for a custom domain.

## Publishing

Pushing to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/pages.yml`).
Once, in the repository: *Settings → Pages → Source: GitHub Actions*.

## Updating the channel strips

The pages follow the files in `data/`. When a bridge release adds or changes a profile, copy them again from the
protocol the bridge was built with (its `protocol/` folder), then commit:

```bash
rm data/profiles/*.json
cp ../stripline-bridge/protocol/profiles/*.json data/profiles/
cp ../stripline-bridge/protocol/schema/controls.json data/
```

## Layout

| Path | What |
|---|---|
| `app/routes/` | One file per page; `docs-layout.tsx` is the sidebar |
| `data/` | Copy of the profiles and the shared controls |
| `app/data/profiles.server.ts` | Reads them at build time |
| `app/components/ui/` | Card, Table, Tabs |
| `app/app.css` | The look: paper, ink, one accent; Fraunces and Raleway |
| `scripts/pages.mjs` | Lays the build out for GitHub Pages in `dist/` |
