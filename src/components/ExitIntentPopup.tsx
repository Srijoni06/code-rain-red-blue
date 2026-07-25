import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

const KEY = "n30-exit-shown";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") return;
    } catch {}
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        document.removeEventListener("mouseout", onLeave);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", onLeave);
    }, 5000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!visible) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Signal locked. We'll ping you when the gate opens.");
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur">
      <div
        className="relative w-full max-w-md rounded-md border border-[var(--neon-red)] bg-black/95 p-6 animate-scale-in"
        style={{ boxShadow: "var(--glow-red)" }}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 text-foreground/60 hover:text-[var(--neon-red)]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
          &gt; wait
        </p>
        <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-widest text-foreground">
          Before you go
        </h3>
        <p className="mt-3 font-mono text-sm text-foreground/80">
          Registrations open soon. Want us to notify you?
        </p>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded border border-border/60 bg-black px-3 py-2 font-mono text-sm text-foreground focus:border-[var(--neon-blue)] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded border border-[var(--neon-blue)] bg-black px-4 py-2 font-display text-xs font-black uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow"
          >
            Notify me
          </button>
        </form>
      </div>
    </div>
  );
}
