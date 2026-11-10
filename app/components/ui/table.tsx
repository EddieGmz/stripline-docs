import * as React from "react";
import { cn } from "~/lib/utils";

/** shadcn Table, wrapped in a card. */
export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="my-3 overflow-x-auto rounded-lg border border-border bg-card shadow-soft">
      <table data-slot="table" className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "border-b border-border-strong bg-sidebar px-2.5 py-2 text-left text-[11.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn("border-b border-border last:border-b-0", className)} {...props} />;
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("px-2.5 py-[7px] align-top", className)} {...props} />;
}

/** A heading row inside a table (a vendor, a control group). */
export function TableGroup({ children, colSpan }: { children: React.ReactNode; colSpan: number }) {
  return (
    <tr className="border-b border-border bg-sidebar">
      <td colSpan={colSpan} className="px-2.5 pt-2 pb-1.5 font-display text-[14.5px] text-foreground italic">
        {children}
      </td>
    </tr>
  );
}
