import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/docs-layout.tsx", [
    index("routes/overview.tsx"),
    route("installation", "routes/installation.tsx"),
    route("getting-started", "routes/getting-started.tsx"),
    route("channel-strips", "routes/channel-strips.tsx"),
    route("channel-strips/:slug", "routes/channel-strip.tsx"),
  ]),
] satisfies RouteConfig;
