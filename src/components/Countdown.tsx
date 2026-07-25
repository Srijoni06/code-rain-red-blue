import { useEffect, useState } from "react";

// Optional real countdown once a target date is set.
// When targetIso is null, renders a "standby" terminal readout.
export function Countdown({ targetIso = null as string | null }: { targetIso?: string | null }) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    if (!targetIso) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [targetIso]);

  if (!targetIso) {
    return (
      <div
        className="mt-6 inline-flex items-center gap-3 rounded border border-[var(--neon-blue)]/50 bg-black/70 px-4 py-3 font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)] sm:text-sm"
        style={{ boxShadow: "var(--glow-blue)" }}
      >
        <span className="text-[var(--neon-red)]">&gt;</span>
        <span>AWAITING DATE CONFIRMATION</span>
        <span className="caret" aria-hidden="true" />
      </div>
    );
  }

  const target = new Date(targetIso).getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  return (
    <div className="mt-6 grid grid-cols-4 gap-3 sm:max-w-md">
      {[
        ["Days", days],
        ["Hrs", hours],
        ["Min", mins],
        ["Sec", secs],
      ].map(([label, val]) => (
        <div
          key={label as string}
          className="rounded border border-[var(--neon-red)]/60 bg-black/80 p-3 text-center"
          style={{ boxShadow: "var(--glow-red)" }}
        >
          <div className="font-display text-2xl font-black text-[var(--neon-red)] sm:text-3xl">
            {String(val as number).padStart(2, "0")}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
            {label as string}
          </div>
        </div>
      ))}
    </div>
  );
}
