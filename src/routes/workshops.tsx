import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { Braces, Database, Workflow, Terminal } from "lucide-react";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Generative AI Workshops — GenAI CoE Summit 2027" },
      {
        name: "description",
        content:
          "Hands-on generative AI workshops at the GenAI CoE Summit 2027 — LLM orchestration, vector databases, agent pipelines and evals.",
      },
      { property: "og:title", content: "Generative AI Workshops — GenAI CoE Summit 2027" },
      {
        property: "og:description",
        content:
          "Hands-on GenAI workshops: LLM orchestration, vector DBs, agent pipelines, evals.",
      },
      { property: "og:url", content: "https://code-rain-red-blue.lovable.app/workshops" },
    ],
    links: [
      { rel: "canonical", href: "https://code-rain-red-blue.lovable.app/workshops" },
    ],
  }),
  component: WorkshopsPage,
});

const WORKSHOPS = [
  {
    icon: <Workflow />,
    title: "LLM Orchestration",
    body: "Chain models, tools, and memory. Build agents that stay on task — and know when to stop.",
    tone: "red" as const,
  },
  {
    icon: <Database />,
    title: "Vector Databases",
    body: "Embeddings, indexes, retrieval strategies. Ship RAG that survives real traffic.",
    tone: "blue" as const,
  },
  {
    icon: <Braces />,
    title: "Evals & Guardrails",
    body: "Measure what matters. Catch regressions before your users do.",
    tone: "red" as const,
  },
  {
    icon: <Terminal />,
    title: "Prompt Engineering, Practical",
    body: "Prompts as production code — versioned, tested, and shipped like everything else.",
    tone: "blue" as const,
  },
];

function WorkshopsPage() {
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; /workshops
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">
          Generative AI Workshops
        </GlitchTitle>
        <p className="mt-4 max-w-2xl font-mono text-sm text-foreground/80">
          Hands-on sessions for builders — LLM orchestration, vector databases,
          evals, and prompt engineering. Sessions run across both days.
          Full agenda TBA.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
            Featured tracks
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {WORKSHOPS.map((w) => (
              <div
                key={w.title}
                className={`rounded-md border p-6 bg-black/70 ${
                  w.tone === "red"
                    ? "border-[var(--neon-red)]/60 hover-red-glow"
                    : "border-[var(--neon-blue)]/60 hover-blue-glow"
                }`}
              >
                <div
                  className={
                    w.tone === "red"
                      ? "text-[var(--neon-red)]"
                      : "text-[var(--neon-blue)]"
                  }
                >
                  {w.icon}
                </div>
                <h3
                  className={`mt-3 font-display text-lg font-black uppercase tracking-widest ${
                    w.tone === "red"
                      ? "text-[var(--neon-red)]"
                      : "text-[var(--neon-blue)]"
                  }`}
                >
                  {w.title}
                </h3>
                <p className="mt-2 font-mono text-sm text-foreground/80">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-blue)]">
            Who these are for
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-sm text-foreground/80">
            Engineers, researchers, and students shipping generative AI in
            production — or trying to. Bring a laptop. Bring questions.
          </p>
        </section>
      </PagePanel>
    </SiteFrame>
  );
}
