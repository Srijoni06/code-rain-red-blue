import { useState } from "react";
import n30Asset from "@/assets/n30.png.asset.json";
import { cn } from "@/lib/utils";

const LINES = [
  "Some doors only open once.",
  "The code remembers everything.",
  "Two days. One system. Choose wisely.",
  "Signal received. Welcome to the construct.",
];

export function N30Mascot({
  size = "md",
  className,
  interactive = true,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  interactive?: boolean;
}) {
  const [glitching, setGlitching] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);

  const dims = {
    sm: "w-24",
    md: "w-56",
    lg: "w-80",
    xl: "w-[28rem] max-w-full",
  }[size];

  const onClick = () => {
    if (!interactive) return;
    setGlitching(true);
    setBubble(LINES[idx % LINES.length]);
    setIdx((i) => i + 1);
    setTimeout(() => setGlitching(false), 450);
    setTimeout(() => setBubble(null), 3500);
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {bubble && (
        <div
          className="absolute -top-4 left-1/2 z-20 w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded border border-[var(--neon-blue)] bg-black/95 px-3 py-2 font-mono text-xs text-[var(--neon-blue)]"
          style={{ boxShadow: "var(--glow-blue)" }}
        >
          <span className="text-[var(--neon-red)]">&gt;</span> {bubble}
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        aria-label="N30 mascot"
        className={cn(
          "group relative block bg-transparent p-0",
          interactive && "cursor-pointer",
          "float-idle",
        )}
      >
        <img
          src={n30Asset.url}
          alt="N30 — GenAI CoE Summit mascot"
          width={512}
          height={768}
          loading="lazy"
          className={cn(
            dims,
            "select-none drop-shadow-[0_0_25px_rgba(0,184,255,0.35)] transition-transform group-hover:scale-[1.02]",
            glitching && "n30-glitching",
          )}
          draggable={false}
        />
      </button>
    </div>
  );
}
