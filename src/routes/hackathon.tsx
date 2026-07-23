import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/hackathon")({
  head: () => ({
    meta: [
      { title: "Hackathon — GenAI CoE Summit 2027" },
      { name: "description", content: "48-hour hackathon at the GenAI CoE Summit 2027, IEM-UEM. Tracks, prizes and rules coming soon." },
      { property: "og:title", content: "Hackathon — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Enter the 48-hour GenAI hackathon at STPI Sector V, Kolkata." },
    ],
  }),
  component: HackathonPage,
});

const SECTIONS = [
  { title: "Theme", body: "The overarching theme will be announced in the run-up to the Summit." },
  { title: "Tracks", body: "Multiple tracks across GenAI applications, tooling, and infrastructure. Details TBA." },
  { title: "Timeline", body: "Kickoff → Build phase → Judging. Exact hours TBA." },
  { title: "Prizes", body: "Cash prizes, GPU credits, mentorship, and industry follow-ups. Details TBA." },
  { title: "Rules", body: "Team-based participation. Original work only. Full rulebook publishes with registration." },
];

function HackathonPage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; /hackathon
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">
          Enter the Hackathon
        </GlitchTitle>
        <p className="mt-4 max-w-2xl font-mono text-sm text-foreground/80">
          Two days. One system. Ship something real. Register early — spots
          are limited.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-md border p-6 ${
                i % 2 === 0
                  ? "border-[var(--neon-red)]/60 hover-red-glow"
                  : "border-[var(--neon-blue)]/60 hover-blue-glow"
              } bg-black/70`}
            >
              <h3
                className={`font-display text-lg font-black uppercase tracking-widest ${
                  i % 2 === 0 ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"
                }`}
              >
                {s.title}
              </h3>
              <p className="mt-3 font-mono text-sm text-foreground/80">{s.body}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                &gt; details to be announced
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
            FAQ
          </h2>
          <Accordion type="single" collapsible className="mt-4">
            {[
              ["Who can participate?", "Students, professionals, and independent builders. Team size and eligibility details TBA."],
              ["Is there a registration fee?", "Fee structure will be announced with the registration launch."],
              ["Do I need a team to register?", "You can register as a team or as an individual looking for a team."],
              ["Where and when?", "STPI, Sector V, Kolkata · January 2027. Exact dates TBA."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-border/50">
                <AccordionTrigger className="font-mono text-sm text-foreground/90">{q}</AccordionTrigger>
                <AccordionContent className="font-mono text-sm text-foreground/70">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </PagePanel>

      {/* Sticky register */}
      <Link
        to="/hackathon/register"
        className="fixed bottom-6 right-6 z-30 rounded-full border border-[var(--neon-red)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-red)] hover-red-glow"
        style={{ boxShadow: "var(--glow-red)" }}
      >
        [ Register for Hackathon ]
      </Link>
    </SiteFrame>
  );
}
