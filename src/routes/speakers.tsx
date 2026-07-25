import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { TerminalTyping } from "@/components/TerminalTyping";
import { AgentSilhouette } from "@/components/motifs";
import { User, Building2 } from "lucide-react";

export const Route = createFileRoute("/speakers")({
  head: () => ({
    meta: [
      { title: "Speakers & Panel — GenAI CoE Summit 2027" },
      { name: "description", content: "Panel speakers for the GenAI CoE Summit 2027 at IEM-UEM. Names to be announced." },
      { property: "og:title", content: "Speakers & Panel — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Practitioners on what actually ships." },
    ],
  }),
  component: SpeakersPage,
});

function SpeakersPage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
          &gt; /speakers
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Speakers &amp; Panel</GlitchTitle>
        <p className="mt-4 max-w-3xl font-mono text-sm text-foreground/80">
          A curated panel of practitioners across research, product, and
          industry — bringing what actually ships in production GenAI.
        </p>

        <div className="relative mt-10">
          <AgentSilhouette className="pointer-events-none absolute -right-4 -top-4 h-56 w-40 text-white/[0.04]" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => {
              const red = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`rounded-md border p-6 ${
                    red ? "border-[var(--neon-red)]/60" : "border-[var(--neon-blue)]/60"
                  } bg-black/70`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`grid h-16 w-16 shrink-0 place-items-center rounded-full border ${
                        red
                          ? "border-[var(--neon-red)]/60 text-[var(--neon-red)]"
                          : "border-[var(--neon-blue)]/60 text-[var(--neon-blue)]"
                      }`}
                    >
                      <User className="h-8 w-8" />
                    </div>
                    <div
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded border border-dashed ${
                        red
                          ? "border-[var(--neon-blue)]/40 text-[var(--neon-blue)]/60"
                          : "border-[var(--neon-red)]/40 text-[var(--neon-red)]/60"
                      } bg-black/60`}
                      aria-label="Company logo placeholder"
                    >
                      <Building2 className="h-6 w-6" />
                    </div>
                  </div>
                  <h3
                    className={`mt-4 font-display text-lg font-black uppercase tracking-widest ${
                      red ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"
                    }`}
                  >
                    Speaker Name TBA
                  </h3>
                  <p className="mt-2 font-mono text-xs text-foreground/70">
                    &gt; Role and organization to be announced
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <AgentSilhouette className="h-5 w-4 text-white/40" />
            Something is always watching the code.
          </div>
        </div>

        <div className="mt-14 rounded-md border border-[var(--neon-green)]/40 bg-black/80 p-6" style={{ boxShadow: "0 0 24px rgba(0,255,156,0.15)" }}>
          <p className="font-mono text-sm text-[var(--neon-green)]">
            <TerminalTyping
              text="> The answer you seek already knows your name."
              speed={70}
            />
          </p>
        </div>
      </PagePanel>
    </SiteFrame>
  );
}
