import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — GenAI CoE Summit 2027" },
      { name: "description", content: "Two-day schedule for the GenAI CoE Summit 2027 at IEM-UEM. Session details to be finalized." },
      { property: "og:title", content: "Schedule — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Day 1 and Day 2, mapped end-to-end." },
    ],
  }),
  component: SchedulePage,
});

const SLOTS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

function SchedulePage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; /schedule
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Schedule</GlitchTitle>
        <p className="mt-4 max-w-2xl font-mono text-sm text-foreground/80">
          Two days. Session details to be finalized closer to the Summit.
        </p>

        <h2 className="mt-10 font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
          Day-by-day sessions
        </h2>


        <Tabs defaultValue="d1" className="mt-8">
          <TabsList className="bg-black/70">
            <TabsTrigger value="d1" className="font-mono text-xs uppercase tracking-widest data-[state=active]:text-[var(--neon-red)]">
              Day 1
            </TabsTrigger>
            <TabsTrigger value="d2" className="font-mono text-xs uppercase tracking-widest data-[state=active]:text-[var(--neon-blue)]">
              Day 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="d1" className="mt-6">
            <ScheduleList tone="red" />
          </TabsContent>
          <TabsContent value="d2" className="mt-6">
            <ScheduleList tone="blue" />
          </TabsContent>
        </Tabs>
      </PagePanel>
    </SiteFrame>
  );
}

function ScheduleList({ tone }: { tone: "red" | "blue" }) {
  const color = tone === "red" ? "text-[var(--neon-red)]" : "text-[var(--neon-blue)]";
  const border = tone === "red" ? "border-[var(--neon-red)]/40" : "border-[var(--neon-blue)]/40";
  return (
    <ul className="space-y-3">
      {SLOTS.map((t) => (
        <li key={t} className={`flex items-center gap-6 rounded border ${border} bg-black/60 p-4`}>
          <span className={`font-display text-xl font-black tracking-widest ${color}`}>{t}</span>
          <span className="font-mono text-sm text-foreground/70">
            &gt; Session details to be finalized
          </span>
        </li>
      ))}
    </ul>
  );
}
