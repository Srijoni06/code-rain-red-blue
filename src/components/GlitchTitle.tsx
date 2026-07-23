import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlitchTitle({
  children,
  className,
  as: Tag = "h1",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      data-text={children}
      className={cn(
        "glitch font-display font-black uppercase tracking-widest",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
