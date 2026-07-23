import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { SiteFrame } from "@/components/SiteFrame";
import { GlitchTitle } from "@/components/GlitchTitle";
import { PagePanel } from "@/components/PagePanel";
import { QrBlock } from "@/components/QrBlock";
import { N30Mascot } from "@/components/N30Mascot";

export const Route = createFileRoute("/showcase/register")({
  head: () => ({
    meta: [
      { title: "Showcase Registration — GenAI CoE Summit 2027" },
      { name: "description", content: "Register to attend the Project Showcase at the GenAI CoE Summit 2027, IEM-UEM." },
      { property: "og:title", content: "Showcase Registration — GenAI CoE Summit 2027" },
      { property: "og:description", content: "Reserve your seat for the Project Showcase." },
    ],
  }),
  component: ShowcaseRegister,
});

type FormValues = {
  name: string;
  org: string;
  designation: string;
  email: string;
  phone: string;
  reason: string;
};

function ShowcaseRegister() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit = () => {
    setSubmitted(true);
    toast.success("Seat locked. See you inside the construct.");
  };

  if (submitted) {
    return (
      <SiteFrame>
        <PagePanel>
          <div className="flex flex-col items-center gap-6 text-center">
            <N30Mascot size="md" />
            <GlitchTitle className="text-3xl sm:text-5xl">Registered</GlitchTitle>
            <p className="font-mono text-sm text-foreground/80">
              &gt; Your seat for the Showcase is confirmed.
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
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
              &gt; /showcase/register
            </p>
            <GlitchTitle className="mt-3 text-3xl sm:text-5xl">
              Register to attend
            </GlitchTitle>
          </div>
          <QrBlock caption="Scan to register for Showcase" size={120} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" error={errors.name?.message}>
            <input {...register("name", { required: "Required" })} className={inputCls} />
          </Field>
          <Field label="Organization / College" error={errors.org?.message}>
            <input {...register("org", { required: "Required" })} className={inputCls} />
          </Field>
          <Field label="Designation" error={errors.designation?.message}>
            <input {...register("designation", { required: "Required" })} className={inputCls} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" {...register("email", { required: "Required" })} className={inputCls} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input {...register("phone", { required: "Required" })} className={inputCls} />
          </Field>
          <Field label="Reason for attending" error={errors.reason?.message}>
            <select {...register("reason", { required: "Required" })} className={inputCls}>
              <option value="">Select…</option>
              <option value="investor">Investor</option>
              <option value="industry">Industry</option>
              <option value="student">Student</option>
              <option value="academic">Academic</option>
              <option value="other">Other</option>
            </select>
          </Field>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded border border-[var(--neon-blue)] bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow"
            >
              [ Submit ]
            </button>
          </div>
        </form>
      </PagePanel>
    </SiteFrame>
  );
}

const inputCls =
  "w-full rounded border border-border/60 bg-black px-3 py-2 font-mono text-sm text-foreground focus:border-[var(--neon-red)] focus:outline-none focus:ring-1 focus:ring-[var(--neon-red)]";

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
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--neon-red)]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block font-mono text-xs text-[var(--neon-red)]">{error}</span>}
    </label>
  );
}
