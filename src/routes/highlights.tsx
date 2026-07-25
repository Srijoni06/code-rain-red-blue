import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { Image as ImageIcon, Play, Trophy } from "lucide-react";

export const Route = createFileRoute("/highlights")({
  head: () => ({
    meta: [
      { title: "Highlights — GenAI CoE Summit 2027" },
      { name: "description", content: "Winners, leaderboard, photos, and recordings from the GenAI CoE Summit 2027." },
      { property: "og:title", content: "Highlights — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Coming after Summit 2027 — winners, photos, recordings." },
    ],
  }),
  component: HighlightsPage,
});

function HighlightsPage() {
  return (
    <SiteFrame>
      <PagePanel>
        <div
          className="mb-10 rounded-md border border-[var(--neon-red)]/60 bg-black/85 p-4 text-center font-mono text-xs uppercase tracking-widest text-[var(--neon-red)] sm:text-sm"
          style={{ boxShadow: "var(--glow-red)" }}
        >
          &gt; Coming after Summit 2027
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; /highlights
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Highlights</GlitchTitle>
        <p className="mt-4 max-w-2xl font-mono text-sm text-foreground/80">
          Leaderboards, winners, photos, and full session recordings will land here
          once the Summit closes.
        </p>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
            <Trophy className="h-6 w-6" /> Leaderboard
          </h2>
          <div className="mt-4 overflow-hidden rounded-md border border-[var(--neon-red)]/40 bg-black/70">
            <table className="w-full font-mono text-sm">
              <thead className="border-b border-border/60 text-[var(--neon-blue)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-widest">Rank</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-widest">Team</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-widest">Score</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((r) => (
                  <tr key={r} className="border-b border-border/40">
                    <td className="px-4 py-3 text-[var(--neon-red)]">#{r}</td>
                    <td className="px-4 py-3 text-foreground/70">Team TBA</td>
                    <td className="px-4 py-3 text-foreground/50">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
            Winners Gallery
          </h2>
          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-3">
            {["1st", "2nd", "3rd"].map((p, i) => (
              <div
                key={p}
                className={`aspect-video grid place-items-center rounded-md border bg-black/60 ${
                  i === 0 ? "border-[var(--neon-red)]/60" : "border-[var(--neon-blue)]/40"
                }`}
                style={i === 0 ? { boxShadow: "var(--glow-red)" } : undefined}
              >
                <div className="flex flex-col items-center gap-2">
                  <Trophy className={`h-8 w-8 ${i === 0 ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]/70"}`} />
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground/70">
                    {p} Place — TBA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
            Event Photos
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square grid place-items-center rounded-md border bg-black/60 ${
                  i % 2 === 0 ? "border-[var(--neon-red)]/40" : "border-[var(--neon-blue)]/40"
                }`}
              >
                <ImageIcon className={`h-7 w-7 ${i % 2 === 0 ? "text-[var(--neon-red)]/50" : "text-[var(--neon-blue)]/50"}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
            Recordings
          </h2>
          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video grid place-items-center rounded-md border border-[var(--neon-blue)]/40 bg-black/60"
              >
                <div className="flex flex-col items-center gap-2">
                  <Play className="h-10 w-10 text-[var(--neon-blue)]/70" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Session #{i + 1} — TBA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PagePanel>
    </SiteFrame>
  );
}
