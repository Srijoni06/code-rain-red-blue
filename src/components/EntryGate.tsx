import { useEffect, useState } from "react";
import { TerminalTyping } from "./TerminalTyping";

const ENTERED_KEY = "n30-entered";

export function EntryGate({ onEnter }: { onEnter: () => void }) {
  const [transitioning, setTransitioning] = useState(false);

  const choose = (_pill: "red" | "blue") => {
    setTransitioning(true);
    try {
      sessionStorage.setItem(ENTERED_KEY, "1");
    } catch {}
    setTimeout(onEnter, 700);
  };

  return (
    <div
      className={`relative z-20 flex min-h-screen flex-col items-center justify-center px-4 text-center ${
        transitioning ? "n30-glitching" : ""
      }`}
    >
      <div className="mb-10 font-mono text-lg text-[var(--neon-green)] sm:text-2xl">
        <TerminalTyping
          text="Wake up... The GenAI CoE Summit has you."
          speed={55}
        />
      </div>
      <p className="mb-8 max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Two paths. One system. Choose your entry.
      </p>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <button
          onClick={() => choose("red")}
          className="red-glow hover-red-glow rounded-full bg-black px-10 py-4 font-display text-lg font-black uppercase tracking-[0.3em] text-[var(--neon-red)] transition-all"
        >
          Red Pill
        </button>
        <button
          onClick={() => choose("blue")}
          className="blue-glow hover-blue-glow rounded-full bg-black px-10 py-4 font-display text-lg font-black uppercase tracking-[0.3em] text-[var(--neon-blue)] transition-all"
        >
          Blue Pill
        </button>
      </div>
      <p className="mt-16 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        &gt; either path leads to the summit
      </p>
    </div>
  );
}

export function useEntryGate() {
  const [entered, setEntered] = useState(true); // default true to avoid SSR flash
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    try {
      setEntered(sessionStorage.getItem(ENTERED_KEY) === "1");
    } catch {
      setEntered(true);
    }
  }, []);
  return {
    entered,
    hydrated,
    enter: () => setEntered(true),
  };
}
