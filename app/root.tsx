import { isRouteErrorResponse, Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
  },
];

// Dark or light before the first paint: the saved choice, else the system's.
const MODE_SCRIPT = `try{var m=localStorage.getItem("mode");document.documentElement.dataset.mode=m||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){}`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: MODE_SCRIPT }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="prose relative mx-auto max-w-2xl px-6 py-20">
      <h1>{notFound ? "Page not found" : "Something went wrong"}</h1>
      <p>
        {notFound ? "There's no page at this address." : "This page couldn't be shown."}{" "}
        <Link to="/">Back to the overview</Link>.
      </p>
    </main>
  );
}
