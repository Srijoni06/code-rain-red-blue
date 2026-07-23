import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Project Showcase — GenAI CoE Summit 2027" },
      { name: "description", content: "Six flagship projects from the GenAI CoE presented to investors and industry at IEM-UEM." },
      { property: "og:title", content: "Project Showcase — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Six flagship GenAI projects. One stage." },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
          &gt; /showcase
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Project Showcase</GlitchTitle>
        <p className="mt-6 max-w-3xl font-mono text-sm text-foreground/80 sm:text-base">
          Six flagship projects developed under the GenAI CoE, presented to an
          audience of industry leaders, investors, and innovators.
        </p>

        <div className="mt-10 rounded-md border border-[var(--neon-blue)]/60 bg-black/70 p-6">
          <h2 className="font-display text-xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
            Presentation Format
          </h2>
          <ul className="mt-4 space-y-2 font-mono text-sm text-foreground/80">
            <li>&gt; 10-minute pitch per project</li>
            <li>&gt; Live demo and technical deep-dive</li>
            <li>&gt; Q&amp;A with the panel</li>
            <li>&gt; One-on-one investor room after each session</li>
          </ul>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-md border p-6 ${
                i % 2 === 0
                  ? "border-[var(--neon-red)]/60"
                  : "border-[var(--neon-blue)]/60"
              } bg-black/70`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Project {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className={`mt-3 font-display text-lg font-black uppercase tracking-widest ${
                  i % 2 === 0 ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"
                }`}
              >
                Details coming soon
              </h3>
              <p className="mt-3 font-mono text-xs text-foreground/70">
                &gt; A flagship build from the GenAI CoE.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/showcase/register"
            className="rounded border border-[var(--neon-blue)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow"
          >
            [ Register to Attend ]
          </Link>
        </div>
      </PagePanel>
    </SiteFrame>
  );
}
