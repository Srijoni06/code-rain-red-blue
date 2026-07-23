import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { RabbitIcon } from "@/components/motifs";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GenAI CoE Summit 2027" },
      { name: "description", content: "Contact the Gen AI Center of Excellence, IEM-UEM about the GenAI CoE Summit 2027." },
      { property: "og:title", content: "Contact — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Reach the Gen AI Center of Excellence, IEM-UEM." },
    ],
  }),
  component: ContactPage,
});

type FormValues = { name: string; email: string; message: string };

function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const onSubmit = () => {
    toast.success("Message received. We'll reach you through the wire.");
    reset();
  };
  return (
    <SiteFrame>
      <PagePanel>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; /contact
        </p>
        <GlitchTitle className="mt-4 text-4xl sm:text-6xl">Contact</GlitchTitle>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-black uppercase tracking-widest text-[var(--neon-red)]">
              About Gen AI CoE
            </h2>
            <p className="mt-4 font-mono text-sm text-foreground/80">
              The Gen AI Center of Excellence at IEM-UEM is a research and
              product studio focused on applied generative AI — training the
              next wave of builders and shipping real systems with industry.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-sm text-foreground/80">
              <li>&gt; email: contact@genaicoe.example</li>
              <li>&gt; phone: +91 · TBA</li>
              <li className="flex gap-3 pt-2">
                <a href="#" className="text-[var(--neon-blue)] hover:underline">X</a>
                <a href="#" className="text-[var(--neon-blue)] hover:underline">LinkedIn</a>
                <a href="#" className="text-[var(--neon-blue)] hover:underline">Instagram</a>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3 text-[var(--neon-green)]/70">
              <RabbitIcon className="h-6 w-6" />
              <p className="font-mono text-[11px] uppercase tracking-widest">
                Curiosity is the first step through the door.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">Name</span>
              <input {...register("name", { required: true })} className={inputCls} />
              {errors.name && <span className="text-xs text-[var(--neon-red)]">Required</span>}
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">Email</span>
              <input type="email" {...register("email", { required: true })} className={inputCls} />
              {errors.email && <span className="text-xs text-[var(--neon-red)]">Required</span>}
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">Message</span>
              <textarea rows={5} {...register("message", { required: true })} className={inputCls} />
              {errors.message && <span className="text-xs text-[var(--neon-red)]">Required</span>}
            </label>
            <button
              type="submit"
              className="self-start rounded border border-[var(--neon-blue)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow"
            >
              [ Send ]
            </button>
          </form>
        </div>
      </PagePanel>
    </SiteFrame>
  );
}

const inputCls =
  "w-full rounded border border-border/60 bg-black px-3 py-2 font-mono text-sm text-foreground focus:border-[var(--neon-red)] focus:outline-none focus:ring-1 focus:ring-[var(--neon-red)]";
