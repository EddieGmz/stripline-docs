import * as React from "react";
import { cn } from "~/lib/utils";

/** The card surface, for links and other elements styled as a card. */
export const cardClass = "rounded-lg border border-border bg-card shadow-soft";

/** shadcn Card, in the paper style: warm surface, hairline border, soft shadow. */
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card" className={cn(cardClass, className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("mb-1 text-[17px]", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-sm", className)} {...props} />;
}
