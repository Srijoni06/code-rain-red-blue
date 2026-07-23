import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import ogImage from "@/assets/og-summit.jpg.asset.json";
import { EntryGate, useEntryGate } from "@/components/EntryGate";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { N30Mascot } from "@/components/N30Mascot";
import { PagePanel } from "@/components/PagePanel";
import { RabbitIcon } from "@/components/motifs";
import { Code2, Presentation, Users, CalendarDays, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GenAI CoE Summit 2027 — IEM-UEM · January 2027 · Kolkata" },
      {
        name: "description",
        content:
          "Two-day GenAI summit by the Gen AI Center of Excellence, IEM-UEM. Hackathon, project showcase, panels at STPI Sector V, Kolkata.",
      },
      { property: "og:title", content: "GenAI CoE Summit 2027 — Enter the construct" },
      {
        property: "og:description",
        content:
          "Two days inside the machine. Hackathon, showcase, panels. STPI Sector V, Kolkata · January 2027.",
      },
      { property: "og:image", content: ogImage.url },
      { name: "twitter:image", content: ogImage.url },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  const { entered, hydrated, enter } = useEntryGate();
  const [, setNonce] = useState(0);

  if (!hydrated) return null; // avoid SSR/entry flash
  if (!entered) {
    return (
      <EntryGate
        onEnter={() => {
          enter();
          setNonce((n) => n + 1);
        }}
      />
    );
  }

  return (
    <SiteFrame>
      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="page-panel rounded-md border border-border/60 p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="inline-block rounded border border-[var(--neon-blue)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--neon-blue)]">
                January 2027 · STPI, Sector V, Kolkata
              </span>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                &gt; Exact dates to be announced
              </p>
              <GlitchTitle className="mt-6 text-5xl leading-none sm:text-7xl lg:text-8xl">
                GenAI CoE Summit 2027
              </GlitchTitle>
              <p className="mt-6 max-w-2xl font-mono text-sm text-foreground/80 sm:text-base">
                Organized by the{" "}
                <span className="text-[var(--neon-blue)]">
                  Gen AI Center of Excellence
                </span>
                , IEM-UEM. Two days inside the machine — hackathon, showcase,
                panels, and the people building what comes next.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/hackathon"
                  className="rounded border border-[var(--neon-red)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-red)] hover-red-glow"
                >
                  [ Explore Hackathon ]
                </Link>
                <Link
                  to="/schedule"
                  className="rounded border border-[var(--neon-blue)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow"
                >
                  [ View Schedule ]
                </Link>
              </div>
            </div>
            <div className="relative hidden justify-self-end lg:block">
              <N30Mascot size="lg" />
            </div>
          </div>
          <div className="mt-10 flex justify-center lg:hidden">
            <N30Mascot size="md" />
          </div>

          {/* White rabbit motif */}
          <div className="mt-10 flex items-center gap-3 text-[var(--neon-green)]/70">
            <RabbitIcon className="h-6 w-6" />
            <p className="font-mono text-[11px] uppercase tracking-widest">
              Curiosity is the first step through the door.
            </p>
          </div>
        </div>
      </section>

      {/* About the Summit */}
      <Section title="About the Summit" accent="red">
        <p>
          The GenAI CoE Summit is a two-day gathering at STPI Sector V,
          Kolkata — where builders, researchers, students, and industry meet
          around generative AI. Hack all night. Ship in the morning. Watch
          six flagship projects go head-to-head in front of investors and
          panelists.
        </p>
      </Section>

      {/* About CoE */}
      <Section title="About Gen AI CoE / IEM-UEM" accent="blue">
        <p>
          The Gen AI Center of Excellence at IEM-UEM is a research and
          product studio focused on applied generative AI — building
          production systems, training students on real workloads, and
          partnering with industry to move ideas from paper to deployment.
        </p>
      </Section>

      {/* Highlights */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="page-panel rounded-md border border-border/60 p-6 sm:p-10">
          <h2 className="mb-8 font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
            Highlights
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <HighlightCard icon={<Code2 />} title="Hackathon" desc="48 hours. Real problems. Real prizes." to="/hackathon" tone="red" />
            <HighlightCard icon={<Presentation />} title="Project Showcase" desc="Six flagship builds meet the industry." to="/showcase" tone="blue" />
            <HighlightCard icon={<Users />} title="Panel Discussions" desc="Practitioners on what actually ships." to="/speakers" tone="red" />
            <HighlightCard icon={<CalendarDays />} title="Schedule" desc="Two days, mapped end-to-end." to="/schedule" tone="blue" />
          </div>
        </div>
      </section>

      {/* Venue teaser */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="page-panel flex flex-col items-start gap-6 rounded-md border border-border/60 p-6 sm:flex-row sm:items-center sm:p-10">
          <div className="grid h-32 w-full place-items-center rounded border border-[var(--neon-blue)]/60 bg-gradient-to-br from-[#00b8ff22] to-transparent sm:w-64" style={{ boxShadow: "var(--glow-blue)" }}>
            <MapPin className="h-10 w-10 text-[var(--neon-blue)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
              STPI, Sector V, Kolkata
            </h3>
            <p className="mt-2 font-mono text-sm text-foreground/80">
              Right in the middle of Kolkata's tech corridor.
            </p>
            <Link to="/venue" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-[var(--neon-red)] hover:underline">
              &gt; View venue details
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function Section({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent: "red" | "blue";
}) {
  const color = accent === "red" ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]";
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-panel rounded-md border border-border/60 p-6 sm:p-10">
        <h2 className={`font-display text-2xl font-black uppercase tracking-widest ${color}`}>
          {title}
        </h2>
        <div className="mt-4 max-w-3xl font-mono text-sm text-foreground/85 sm:text-base">
          {children}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  icon,
  title,
  desc,
  to,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  to: string;
  tone: "red" | "blue";
}) {
  const border = tone === "red" ? "border-[var(--neon-red)]/60" : "border-[var(--neon-blue)]/60";
  const color = tone === "red" ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]";
  const hover = tone === "red" ? "hover-red-glow" : "hover-blue-glow";
  return (
    <Link
      // @ts-expect-error dynamic route string
      to={to}
      className={`block rounded-md border ${border} bg-black/70 p-5 ${hover}`}
    >
      <div className={`mb-3 ${color}`}>{icon}</div>
      <h3 className={`font-display text-lg font-black uppercase tracking-widest ${color}`}>
        {title}
      </h3>
      <p className="mt-2 font-mono text-xs text-foreground/70">{desc}</p>
    </Link>
  );
}
