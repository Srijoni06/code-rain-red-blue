import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors & Partners — GenAI CoE Summit 2027" },
      { name: "description", content: "Sponsors and partners of the GenAI CoE Summit 2027 at IEM-UEM. Tier details to be announced." },
      { property: "og:title", content: "Sponsors & Partners — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Title, Gold, Silver, Bronze, and community partners powering the Summit." },
    ],
  }),
  component: SponsorsPage,
});

const TIERS = [
  { name: "Title Sponsor", count: 1, tone: "red" as const, big: true },
  { name: "Gold", count: 3, tone: "red" as const, big: false },
  { name: "Silver", count: 4, tone: "blue" as const, big: false },
  { name: "Bronze", count: 6, tone: "blue" as const, big: false },
  { name: "Community Partners", count: 8, tone: "red" as const, big: false },
];

function SponsorsPage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
          &gt; /sponsors
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Sponsors &amp; Partners</GlitchTitle>
        <p className="mt-4 max-w-2xl font-mono text-sm text-foreground/80">
          Powering two days inside the machine. Full sponsor lineup coming soon.
        </p>

        <div className="mt-12 space-y-14">
          {TIERS.map((tier) => (
            <section key={tier.name}>
              <h2
                className={`font-display text-xl font-black uppercase tracking-widest sm:text-2xl ${
                  tier.tone === "red" ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"
                }`}
              >
                {tier.name}
              </h2>
              <div
                className={`mt-4 grid gap-4 ${
                  tier.big ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {Array.from({ length: tier.count }).map((_, i) => (
                  <div
                    key={i}
                    className={`${tier.big ? "aspect-[3/1]" : "aspect-[3/2]"} grid place-items-center rounded-md border bg-black/60 ${
                      tier.tone === "red"
                        ? "border-[var(--neon-red)]/40 hover-red-glow"
                        : "border-[var(--neon-blue)]/40 hover-blue-glow"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Building2
                        className={`${tier.big ? "h-12 w-12" : "h-8 w-8"} ${
                          tier.tone === "red" ? "text-[var(--neon-red)]/60" : "text-[var(--neon-blue)]/60"
                        }`}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Logo TBA
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </PagePanel>
    </SiteFrame>
  );
}
