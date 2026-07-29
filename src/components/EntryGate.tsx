import { useEffect, useState } from "react";
import { TerminalTyping } from "./TerminalTyping";

const ENTERED_KEY = "n30-entered";
const BLUE_TAKEN_KEY = "n30-blue-taken";

type Mode = "gate" | "safe" | "returning";

export function EntryGate({ onEnter }: { onEnter: () => void }) {
  const [mode, setMode] = useState<Mode>("gate");
  const [blueTaken, setBlueTaken] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    try {
      setBlueTaken(sessionStorage.getItem(BLUE_TAKEN_KEY) === "1");
    } catch {}
  }, []);

  const takeRed = () => {
    setTransitioning(true);
    try {
      sessionStorage.setItem(ENTERED_KEY, "1");
    } catch {}
    setTimeout(onEnter, 700);
  };

  const takeBlue = () => {
    try {
      sessionStorage.setItem(BLUE_TAKEN_KEY, "1");
    } catch {}
    setBlueTaken(true);
    setMode("safe");
  };

  // Safe room auto-return
  useEffect(() => {
    if (mode !== "safe") return;
    const t = setTimeout(() => setMode("returning"), 4500);
    return () => clearTimeout(t);
  }, [mode]);

  // After brief fade back
  useEffect(() => {
    if (mode !== "returning") return;
    const t = setTimeout(() => setMode("gate"), 700);
    return () => clearTimeout(t);
  }, [mode]);

  if (mode === "safe" || mode === "returning") {
    return (
      <SafeRoom
        fading={mode === "returning"}
        onDismiss={() => setMode("returning")}
      />
    );
  }

  return (
    <main
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
      <p className="mb-2 max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {blueTaken
          ? "Some paths lead back to where you started. There is only one way forward now."
          : "Two paths. One system. Choose your entry."}
      </p>
      {!blueTaken && (
        <p className="mb-6 max-w-md font-mono text-xs italic tracking-wide text-[var(--neon-red)]/80">
          Choose red, and follow the path into Wonderland.
        </p>
      )}
      <div className={`mt-6 flex flex-col items-center gap-6 sm:flex-row`}>
        <button
          onClick={takeRed}
          className={`rounded-full bg-black px-10 py-4 font-display text-lg font-black uppercase tracking-[0.3em] text-[var(--neon-red)] transition-all ${
            blueTaken ? "red-glow-strong" : "red-glow hover-red-glow"
          }`}
        >
          Red Pill
        </button>
        {!blueTaken && (
          <button
            onClick={takeBlue}
            className="blue-glow hover-blue-glow rounded-full bg-black px-10 py-4 font-display text-lg font-black uppercase tracking-[0.3em] text-[var(--neon-blue)] transition-all"
          >
            Blue Pill
          </button>
        )}
      </div>
      <p className="mt-16 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        &gt; the summit awaits
      </p>
    </main>
  );

}

function SafeRoom({ fading, onDismiss }: { fading: boolean; onDismiss: () => void }) {
  return (
    <div
      onClick={onDismiss}
      className={`fixed inset-0 z-[80] flex flex-col items-center justify-center gap-8 transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      } safe-room-flash`}
      style={{
        backgroundColor: "#f5f1e8",
        color: "#333",
        cursor: "pointer",
      }}
    >
      <div
        className="h-14 w-14 rounded-full border-4 border-neutral-300 border-t-neutral-500"
        style={{ animation: "spin 1.2s linear infinite" }}
      />
      <p className="max-w-md text-center font-mono text-sm text-neutral-600 sm:text-base">
        Everything is fine. There is nothing to see here.
      </p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
        …
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
