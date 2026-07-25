import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "n30-welcome-shown";

export function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") return;
    } catch {}
    const t = setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 max-w-xs animate-fade-in rounded border border-[var(--neon-blue)] bg-black/95 p-4 font-mono text-xs text-[var(--neon-blue)] shadow-lg"
      style={{ boxShadow: "var(--glow-blue)" }}
      role="status"
    >
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-2 text-foreground/60 hover:text-[var(--neon-red)]"
        aria-label="Close"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <p className="pr-4">
        <span className="text-[var(--neon-red)]">&gt;</span> New updates coming soon. Stay tuned.
      </p>
    </div>
  );
}
