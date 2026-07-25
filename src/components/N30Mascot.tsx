import { useEffect, useRef, useState } from "react";
import n30Asset from "@/assets/n30.png.asset.json";
import { cn } from "@/lib/utils";

const LINES = [
  "Some doors only open once.",
  "The code remembers everything.",
  "Two days. One system. Choose wisely.",
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
  const [tilt, setTilt] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const dims = {
    sm: "w-20",
    md: "w-48",
    lg: "w-72",
    xl: "w-[26rem] max-w-full",
  }[size];

  // Occasional slow "blink" — briefly dim the image for lifelike idle
  useEffect(() => {
    if (!interactive) return;
    let cancelled = false;
    const loop = () => {
      const next = 3500 + Math.random() * 3500;
      setTimeout(() => {
        if (cancelled) return;
        setBlinking(true);
        setTimeout(() => !cancelled && setBlinking(false), 140);
        loop();
      }, next);
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, [interactive]);

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    setTilt(Math.max(-6, Math.min(6, dx / 20)));
  };
  const onLeave = () => setTilt(0);

  const onClick = () => {
    if (!interactive) return;
    setGlitching(true);
    const line = LINES[Math.floor(Math.random() * LINES.length)];
    setBubble(line);
    setTimeout(() => setGlitching(false), 450);
    setTimeout(() => setBubble(null), 3500);
  };

  return (
    <div
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {bubble && (
        <div
          className="pointer-events-none absolute -top-4 left-1/2 z-20 w-max max-w-[240px] -translate-x-1/2 -translate-y-full rounded border border-[var(--neon-blue)] bg-black/95 px-3 py-2 font-mono text-xs text-[var(--neon-blue)] animate-fade-in"
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
        style={{ transform: `rotate(${tilt}deg)`, transition: "transform 200ms ease-out" }}
      >
        <img
          src={n30Asset.url}
          alt="N30 — GenAI CoE Summit mascot"
          width={512}
          height={768}
          loading="lazy"
          className={cn(
            dims,
            "select-none drop-shadow-[0_0_25px_rgba(0,184,255,0.35)] transition-transform duration-200 group-hover:scale-105",
            glitching && "n30-glitching",
            blinking && "n30-blink",
          )}
          draggable={false}
        />
      </button>
    </div>
  );
}
