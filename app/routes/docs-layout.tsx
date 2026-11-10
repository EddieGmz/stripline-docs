import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { GUIDE } from "~/components/docs";
import { Logo } from "~/components/logo";
import { summaries } from "~/data/profiles.server";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/docs-layout";

export function loader() {
  return { strips: summaries().map(({ slug, name, vendor }) => ({ slug, name, vendor })) };
}

const link = ({ isActive }: { isActive: boolean }) =>
  cn(
    "-mx-2.5 my-px block rounded-[7px] px-2.5 py-1 text-sm no-underline transition-colors",
    isActive ? "bg-primary-soft font-semibold text-primary" : "text-text hover:bg-muted hover:text-foreground",
  );

function ModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.mode === "dark"), []);
  const toggle = () => {
    const next = !dark;
    document.documentElement.dataset.mode = next ? "dark" : "light";
    try {
      localStorage.setItem("mode", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };
  return (
    <button
      type="button"
      onClick={toggle}
      className="mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-[12.5px] text-muted-foreground hover:border-muted-foreground hover:text-foreground"
    >
      {dark ? <Sun className="size-3.5" aria-hidden="true" /> : <Moon className="size-3.5" aria-hidden="true" />}
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}

export default function DocsLayout({ loaderData }: Route.ComponentProps) {
  let vendor = "";
  return (
    <div className="relative z-10 grid min-h-screen grid-cols-[250px_minmax(0,1fr)] max-md:grid-cols-1">
      <aside className="sticky top-0 h-screen overflow-y-auto border-r border-border bg-sidebar/60 px-6.5 py-6.5 max-md:static max-md:h-auto max-md:border-r-0 max-md:border-b">
        <Link to="/" className="flex items-center gap-2.5 font-display text-[22px] font-semibold text-foreground no-underline">
          <Logo />
          <span>
            Strip<em className="font-normal text-primary">line</em>
          </span>
        </Link>
        <div className="mt-1.5 mb-5 text-xs text-muted-foreground">Documentation</div>
        <nav aria-label="Documentation">
          <h6 className="mt-5 mb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">Guide</h6>
          {GUIDE.slice(0, 3).map((g) => (
            <NavLink key={g.to} to={g.to} end className={link}>
              {g.title}
            </NavLink>
          ))}
          <h6 className="mt-5 mb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">Reference</h6>
          <NavLink to="/channel-strips" end className={link}>
            Channel strips <small className="text-xs text-muted-foreground">{loaderData.strips.length}</small>
          </NavLink>
          {loaderData.strips.map((s) => {
            const heading = s.vendor !== vendor;
            vendor = s.vendor;
            return (
              <div key={s.slug}>
                {heading && <div className="mt-2.5 mb-0.5 font-display text-xs text-muted-foreground italic">{s.vendor}</div>}
                <NavLink to={`/channel-strips/${s.slug}`} className={link}>
                  {s.name}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <ModeToggle />
      </aside>
      <main className="px-14 pt-12 pb-24 max-md:px-5.5 max-md:pt-8">
        <article className="prose max-w-[760px]">
          <Outlet />
        </article>
      </main>
    </div>
  );
}
