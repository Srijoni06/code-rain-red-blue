import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { N30Mascot } from "@/components/N30Mascot";
import { SpoonIcon } from "@/components/motifs";
import { TerminalTyping } from "@/components/TerminalTyping";

export const Route = createFileRoute("/n30")({
  head: () => ({
    meta: [
      { title: "Meet N30 — GenAI CoE Summit 2027" },
      { name: "description", content: "N30 — the construct-born guide to the GenAI CoE Summit 2027 at IEM-UEM." },
      { property: "og:title", content: "Meet N30 — Guide to the Summit" },
      { property: "og:description", content: "A construct born from the Summit's own systems." },
    ],
  }),
  component: N30Page,
});

function N30Page() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
          &gt; /n30
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Meet N30</GlitchTitle>

        <div className="mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex justify-center">
            <N30Mascot size="xl" />
          </div>
          <div className="rounded-md border border-[var(--neon-blue)]/60 bg-black/85 p-6 font-mono text-sm text-foreground/85" style={{ boxShadow: "var(--glow-blue)" }}>
            <p className="text-[var(--neon-green)]">
              <TerminalTyping text="> ACCESSING FILE..." speed={40} />
            </p>
            <div className="mt-4 space-y-2 leading-relaxed">
              <p><span className="text-[var(--neon-red)]">NAME:</span> N30</p>
              <p><span className="text-[var(--neon-red)]">ROLE:</span> Guide to the GenAI CoE Summit</p>
              <p>
                <span className="text-[var(--neon-red)]">ORIGIN:</span> A construct born from the Summit's own systems, here to guide hackers, builders, and dreamers through two days inside the machine.
              </p>
            </div>
          </div>
        </div>

        {/* Spoon motif */}
        <div className="mt-14 flex items-center gap-4 rounded-md border border-[var(--neon-red)]/40 bg-black/60 p-6">
          <SpoonIcon className="h-10 w-10 text-[var(--neon-red)]" />
          <p className="font-mono text-sm uppercase tracking-widest text-foreground/80">
            The spoon was never the point. The Summit is.
          </p>
        </div>
      </PagePanel>
    </SiteFrame>
  );
}
