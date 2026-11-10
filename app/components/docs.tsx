import { Info } from "lucide-react";
import { Link } from "react-router";
import { cardClass } from "~/components/ui/card";
import { cn } from "~/lib/utils";

/** The guide pages in reading order, for the sidebar and the previous/next links. */
export const GUIDE = [
  { to: "/", title: "Overview" },
  { to: "/installation", title: "Installation" },
  { to: "/getting-started", title: "Getting started" },
  { to: "/channel-strips", title: "Channel strips" },
] as const;

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4.5 flex gap-3 rounded-lg border border-primary/25 bg-primary-soft px-4 py-3 text-[14.5px]">
      <Info className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

/** Numbered steps on a line, each with a bold title. */
export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="steps my-4 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="relative ml-3.5 border-l border-border pb-4.5 pl-11 [counter-increment:step] last:border-transparent before:absolute before:-top-px before:-left-3.5 before:grid before:size-7 before:place-items-center before:rounded-full before:border before:border-border-strong before:bg-card before:font-display before:text-sm before:font-semibold before:text-primary before:content-[counter(step)]">
      <b className="mb-0.5 block">{title}</b>
      {children}
    </li>
  );
}

export function Pager({ prev, next }: { prev?: { to: string; title: string }; next?: { to: string; title: string } }) {
  const cell = cn(cardClass, "flex-1 px-4 py-3 no-underline! transition hover:-translate-y-0.5 hover:shadow-lift");
  return (
    <nav className="mt-12 flex gap-3.5" aria-label="Previous and next page">
      {prev ? (
        <Link to={prev.to} className={cell}>
          <small className="block text-xs text-muted-foreground">Previous</small>
          <span className="font-display text-[17px] text-foreground">{prev.title}</span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link to={next.to} className={cn(cell, "text-right")}>
          <small className="block text-xs text-muted-foreground">Next</small>
          <span className="font-display text-[17px] text-foreground">{next.title}</span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}

/** Previous/next for a guide page. */
export function GuidePager({ at }: { at: string }) {
  const i = GUIDE.findIndex((g) => g.to === at);
  return <Pager prev={GUIDE[i - 1]} next={GUIDE[i + 1]} />;
}

export function Crumb({ children }: { children?: React.ReactNode }) {
  return <div className="mb-2.5 text-[13px] text-muted-foreground">{children ?? "Docs"}</div>;
}
