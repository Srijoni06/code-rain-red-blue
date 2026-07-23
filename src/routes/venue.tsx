import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";

export const Route = createFileRoute("/venue")({
  head: () => ({
    meta: [
      { title: "Venue — GenAI CoE Summit 2027 · STPI Sector V, Kolkata" },
      { name: "description", content: "STPI, Sector V, Salt Lake, Kolkata — venue for the GenAI CoE Summit 2027." },
      { property: "og:title", content: "Venue — STPI Sector V, Kolkata" },
      { property: "og:description", content: "Right in the middle of Kolkata's tech corridor." },
    ],
  }),
  component: VenuePage,
});

function VenuePage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; /venue
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Venue</GlitchTitle>

        <div className="mt-8 overflow-hidden rounded-md border border-[var(--neon-blue)]/60" style={{ boxShadow: "var(--glow-blue)" }}>
          <iframe
            title="STPI Sector V Kolkata map"
            src="https://www.google.com/maps?q=STPI+Sector+V+Kolkata&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-md border border-[var(--neon-red)]/60 bg-black/70 p-6">
            <h3 className="font-display text-lg font-black uppercase tracking-widest text-[var(--neon-red)]">
              Address
            </h3>
            <p className="mt-3 font-mono text-sm text-foreground/80">
              STPI (Software Technology Parks of India)
              <br />
              Block GP, Sector V, Salt Lake
              <br />
              Kolkata, West Bengal 700091
            </p>
          </div>
          <div className="rounded-md border border-[var(--neon-blue)]/60 bg-black/70 p-6">
            <h3 className="font-display text-lg font-black uppercase tracking-widest text-[var(--neon-blue)]">
              Getting there
            </h3>
            <p className="mt-3 font-mono text-sm text-foreground/80">
              &gt; Metro: Karunamoyee (nearest)
              <br />
              &gt; Ride-hail: 25 min from central Kolkata
              <br />
              &gt; Nearby landmarks: TBA
            </p>
          </div>
        </div>
      </PagePanel>
    </SiteFrame>
  );
}
