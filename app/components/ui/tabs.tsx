import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "~/lib/utils";

/** shadcn Tabs (Base UI). */
export function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("my-4", className)} {...props} />;
}

export function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex gap-0.5 rounded-[9px] bg-muted p-[3px]", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer rounded-[7px] px-3.5 py-1 text-sm font-semibold text-muted-foreground transition-colors",
        "hover:text-foreground data-[active]:bg-card data-[active]:text-foreground data-[active]:shadow-soft",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("pt-4", className)} {...props} />;
}
