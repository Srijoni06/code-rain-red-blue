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
import {
  Trophy,
  Award,
  Medal,
  Gift,
  Sparkles,
  Building2,
  Brain,
  Globe2,
  Cpu,
  Lightbulb,
  Layers,
  ScrollText,
  Gavel,
  UploadCloud,
  UsersRound,
} from "lucide-react";

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

const PRIZES = [
  { icon: <Trophy />, title: "1st Place", body: "Grand prize — TBA", tone: "red" as const },
  { icon: <Award />, title: "2nd Place", body: "Runner-up prize — TBA", tone: "blue" as const },
  { icon: <Medal />, title: "3rd Place", body: "Third place prize — TBA", tone: "red" as const },
  { icon: <Gift />, title: "Swag", body: "Every participant walks out kitted.", tone: "blue" as const },
  { icon: <Sparkles />, title: "Perks", body: "GPU credits, API access, mentorship.", tone: "red" as const },
  { icon: <Building2 />, title: "Sponsor Rewards", body: "Bounties from partner sponsors.", tone: "blue" as const },
];

const TRACKS = [
  { icon: <Brain />, name: "AI / ML", desc: "Applied models, agents, evals, tooling. — TBA" },
  { icon: <Globe2 />, name: "Web3", desc: "On-chain AI, verifiable compute. — TBA" },
  { icon: <Lightbulb />, name: "Open Innovation", desc: "Anything goes — surprise us. — TBA" },
  { icon: <Cpu />, name: "Systems & Infra", desc: "Runtime, inference, MLOps. — TBA" },
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
              <h3 className={`font-display text-lg font-black uppercase tracking-widest ${i % 2 === 0 ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"}`}>
                {s.title}
              </h3>
              <p className="mt-3 font-mono text-sm text-foreground/80">{s.body}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                &gt; details to be announced
              </p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
            Event Tracks &amp; Categories
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((t, i) => (
              <div
                key={t.name}
                className={`rounded-md border p-5 bg-black/70 ${
                  i % 2 === 0
                    ? "border-[var(--neon-red)]/60 hover-red-glow"
                    : "border-[var(--neon-blue)]/60 hover-blue-glow"
                }`}
              >
                <div className={i % 2 === 0 ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"}>{t.icon}</div>
                <h3 className={`mt-3 font-display text-lg font-black uppercase tracking-widest ${i % 2 === 0 ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"}`}>
                  {t.name}
                </h3>
                <p className="mt-2 font-mono text-xs text-foreground/70">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
            Prize Pool &amp; Benefits
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRIZES.map((p, i) => (
              <div
                key={p.title}
                className={`rounded-md border p-6 bg-black/70 ${
                  p.tone === "red"
                    ? "border-[var(--neon-red)]/60 hover-red-glow"
                    : "border-[var(--neon-blue)]/60 hover-blue-glow"
                }`}
                style={{
                  boxShadow: i < 3 ? (p.tone === "red" ? "var(--glow-red)" : "var(--glow-blue)") : undefined,
                }}
              >
                <div className={p.tone === "red" ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"}>{p.icon}</div>
                <h3 className={`mt-3 font-display text-lg font-black uppercase tracking-widest ${p.tone === "red" ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]"}`}>
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-sm text-foreground/80">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
            Hacker Resources
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <ResCard icon={<Layers />} title="Tech Stack" tone="red">
              <ul className="list-disc pl-4">
                <li>Any modern language / framework</li>
                <li>Sponsor APIs (TBA)</li>
                <li>GPU credits (TBA)</li>
                <li>Vector DBs, model hosting — TBA</li>
              </ul>
            </ResCard>
            <ResCard icon={<Gavel />} title="Judging Criteria" tone="blue">
              <ul className="list-disc pl-4">
                <li>Impact &amp; originality</li>
                <li>Technical execution</li>
                <li>Design &amp; UX</li>
                <li>Presentation — full rubric TBA</li>
              </ul>
            </ResCard>
            <ResCard icon={<UploadCloud />} title="Submission Guidelines" tone="red">
              <ol className="list-decimal pl-4">
                <li>Push to a public repo</li>
                <li>Record a 2-minute demo</li>
                <li>Submit via the portal (TBA)</li>
                <li>Deadline is deadline. No extensions.</li>
              </ol>
            </ResCard>
            <ResCard icon={<UsersRound />} title="Team Formation" tone="blue">
              <p>
                Solo? Squad? Somewhere in between? Find teammates on our{" "}
                <a href="#" className="text-[var(--neon-blue)] underline">Discord</a>.
                Teams of 2–5 recommended.
              </p>
            </ResCard>
          </div>
        </section>

        <div className="mt-16">
          <h2 className="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
            <ScrollText className="h-6 w-6" /> FAQ
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

function ResCard({
  icon,
  title,
  tone,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tone: "red" | "blue";
  children: React.ReactNode;
}) {
  const border = tone === "red" ? "border-[var(--neon-red)]/60" : "border-[var(--neon-blue)]/60";
  const color = tone === "red" ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]";
  return (
    <div className={`rounded-md border ${border} bg-black/70 p-6`}>
      <div className={color}>{icon}</div>
      <h3 className={`mt-3 font-display text-lg font-black uppercase tracking-widest ${color}`}>
        {title}
      </h3>
      <div className="mt-3 space-y-2 font-mono text-sm text-foreground/80">{children}</div>
    </div>
  );
}
