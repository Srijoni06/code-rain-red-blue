import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";

export const Route = createFileRoute("/project-exhibition")({
  head: () => ({
    meta: [
      { title: "Project Exhibition — GenAI CoE Summit 2027" },
      { name: "description", content: "Open project exhibition running across both days of the GenAI CoE Summit 2027 at IEM-UEM." },
      { property: "og:title", content: "Project Exhibition — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Showcase your project across both days of the Summit." },
    ],
  }),
  component: ExhibitionLayout,
});

function ExhibitionLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/project-exhibition/register");
  if (isChild) return <Outlet />;
  return <ExhibitionPage />;
}

function ExhibitionPage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; /project-exhibition
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Project Exhibition</GlitchTitle>
        <p className="mt-6 max-w-3xl font-mono text-sm text-foreground/80 sm:text-base">
          An open exhibition running across both days of the GenAI CoE Summit 2027.
          Teams and individuals can showcase their own projects to peers, mentors,
          industry, and investors.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-[var(--neon-red)]/60 bg-black/70 p-6">
            <h2 className="font-display text-xl font-black uppercase tracking-widest text-[var(--neon-red)]">
              Format &amp; Eligibility
            </h2>
            <p className="mt-4 font-mono text-sm text-foreground/80">
              &gt; Details TBA. Open to teams and individuals across institutions and
              industry. Any AI, data, or emerging-tech project welcome.
            </p>
          </div>
          <div className="rounded-md border border-[var(--neon-blue)]/60 bg-black/70 p-6">
            <h2 className="font-display text-xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
              Exhibition Guidelines
            </h2>
            <ul className="mt-4 space-y-2 font-mono text-sm text-foreground/80">
              <li>&gt; Submission format — TBA</li>
              <li>&gt; Booth / display setup — TBA</li>
              <li>&gt; Judging &amp; viewing structure — TBA</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-md border border-[var(--neon-red)]/60 bg-black/70 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
            &gt; TIMELINE
          </p>
          <p className="mt-3 font-mono text-sm text-foreground/80">
            Runs across both days of GenAI CoE Summit 2027 — distinct from the 1-day
            Hackathon and from the flagship 6-project Showcase.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/project-exhibition/register"
            className="rounded border border-[var(--neon-red)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-red)] hover-red-glow"
          >
            [ Register for Exhibition ]
          </Link>
        </div>
      </PagePanel>
    </SiteFrame>
  );
}
