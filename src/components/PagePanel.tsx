import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PagePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative z-10 min-h-screen", className)}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="page-panel rounded-md border border-border/60 p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
