import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "n30-status-dismissed-at";
const ONE_DAY = 86_400_000;

export function RegistrationStatusBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const ts = raw ? Number(raw) : 0;
      if (!ts || Date.now() - ts > ONE_DAY) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}
    setVisible(false);
  };

  return (
    <div className="sticky top-[64px] z-30 border-y border-[var(--neon-blue)]/40 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 sm:px-6">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-[var(--neon-blue)] sm:text-xs">
          &gt; Registration status:
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-[var(--neon-red)] sm:text-xs">
          OPENING SOON
        </span>
        <div className="relative h-2 flex-1 overflow-hidden rounded border border-[var(--neon-blue)]/40 bg-black">
          <div
            className="h-full w-1/4 bg-gradient-to-r from-[var(--neon-red)] to-[var(--neon-blue)]"
            style={{ animation: "status-load 3s ease-in-out infinite" }}
          />
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-foreground/60 hover:text-[var(--neon-red)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
