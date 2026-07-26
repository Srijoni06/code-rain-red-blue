import { createFileRoute } from "@tanstack/react-router";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { QrBlock } from "@/components/QrBlock";
import { N30Mascot } from "@/components/N30Mascot";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/project-exhibition/register")({
  head: () => ({
    meta: [
      { title: "Exhibition Registration — GenAI CoE Summit 2027" },
      { name: "description", content: "Register your team or project for the open Project Exhibition at the GenAI CoE Summit 2027." },
      { property: "og:title", content: "Exhibition Registration — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Register for the open Project Exhibition." },
    ],
  }),
  component: ExhibitionRegister,
});

type Member = { name: string; email: string };
type FormValues = {
  teamName: string;
  members: Member[];
  institution: string;
  projectTitle: string;
  category: string;
  contact: string;
};

function ExhibitionRegister() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      teamName: "",
      members: [{ name: "", email: "" }],
      institution: "",
      projectTitle: "",
      category: "",
      contact: "",
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "members" });

  const onSubmit = (_data: FormValues) => {
    setSubmitted(true);
    toast.success("Signal received. Welcome to the construct.");
  };

  if (submitted) {
    return (
      <SiteFrame>
        <PagePanel>
          <div className="flex flex-col items-center gap-6 text-center">
            <N30Mascot size="md" />
            <GlitchTitle className="text-3xl sm:text-5xl">Entry logged</GlitchTitle>
            <p className="font-mono text-sm text-foreground/80">
              &gt; Your project is now part of the exhibition. We'll be in touch.
            </p>
          </div>
        </PagePanel>
      </SiteFrame>
    );
  }

  return (
    <SiteFrame>
      <PagePanel>
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
              &gt; /project-exhibition/register
            </p>
            <GlitchTitle className="mt-3 text-3xl sm:text-5xl">
              Register your project
            </GlitchTitle>
          </div>
          <QrBlock caption="Scan to register for Exhibition" size={120} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <Field label="Team / Individual name" error={errors.teamName?.message}>
            <input {...register("teamName", { required: "Required" })} className={inputCls} />
          </Field>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
              Members ({fields.length})
            </label>
            <div className="space-y-3">
              {fields.map((f, i) => (
                <div key={f.id} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <input
                    placeholder={`Member ${i + 1} name`}
                    {...register(`members.${i}.name` as const, { required: true })}
                    className={inputCls}
                  />
                  <input
                    placeholder={`Member ${i + 1} email`}
                    type="email"
                    {...register(`members.${i}.email` as const, { required: true })}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => fields.length > 1 && remove(i)}
                    className="rounded border border-[var(--neon-red)]/60 px-3 font-mono text-xs text-[var(--neon-red)] hover-red-glow"
                    aria-label="Remove member"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ name: "", email: "" })}
              disabled={fields.length >= 8}
              className="mt-3 inline-flex items-center gap-2 rounded border border-[var(--neon-blue)]/60 px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow disabled:opacity-40"
            >
              <Plus className="h-4 w-4" /> Add member
            </button>
          </div>

          <Field label="College / Institution / Organization" error={errors.institution?.message}>
            <input {...register("institution", { required: "Required" })} className={inputCls} />
          </Field>

          <Field label="Project title" error={errors.projectTitle?.message}>
            <input {...register("projectTitle", { required: "Required" })} className={inputCls} />
          </Field>

          <Field label="Project category / domain" error={errors.category?.message}>
            <select {...register("category", { required: "Required" })} className={inputCls}>
              <option value="">Select category…</option>
              <option value="ai-ml">AI / ML</option>
              <option value="genai">Generative AI</option>
              <option value="web3">Web3</option>
              <option value="iot">IoT / Hardware</option>
              <option value="open">Open Innovation</option>
              <option value="other">Other — TBA</option>
            </select>
          </Field>

          <Field label="Contact number" error={errors.contact?.message}>
            <input {...register("contact", { required: "Required" })} className={inputCls} />
          </Field>

          <button
            type="submit"
            className="mt-4 self-start rounded border border-[var(--neon-red)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-red)] hover-red-glow"
          >
            [ Submit Entry ]
          </button>
        </form>
      </PagePanel>
    </SiteFrame>
  );
}

const inputCls =
  "w-full rounded border border-border/60 bg-black px-3 py-2 font-mono text-sm text-foreground focus:border-[var(--neon-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--neon-blue)]";

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block font-mono text-xs text-[var(--neon-red)]">{error}</span>}
    </label>
  );
}
