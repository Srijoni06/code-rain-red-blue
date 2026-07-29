import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{
    data: {
      client?: { name?: string; client_id?: string };
      redirect_uri?: string;
      scope?: string;
      redirect_url?: string;
      redirect_to?: string;
    } | null;
    error: { message: string } | null;
  }>;
  approveAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
  denyAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
};

const authOAuth = () =>
  (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

function isSafeNext(n: string) {
  return typeof n === "string" && n.startsWith("/") && !n.startsWith("//");
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id:
      typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get(
      "authorization_id",
    )!;
    const { data, error } = await authOAuth().getAuthorizationDetails(
      authorizationId,
    );
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
      return data;
    }
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="relative z-10 mx-auto max-w-lg px-6 py-24 text-center font-mono text-sm text-[var(--neon-red)]">
      Could not load this authorization request:{" "}
      {String((error as Error)?.message ?? error)}
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await authOAuth().approveAuthorization(authorization_id)
      : await authOAuth().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an external app";

  return (
    <main className="relative z-10 mx-auto max-w-lg px-6 py-16">
      <div className="page-panel rounded-md border border-[var(--neon-blue)]/40 p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; authorize connection
        </p>
        <h1 className="mt-3 font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
          Connect {clientName} to your Summit account
        </h1>
        <p className="mt-4 font-mono text-sm text-foreground/80">
          This lets {clientName} use the GenAI CoE Summit tools as you.
        </p>
        <p className="mt-2 font-mono text-xs text-foreground/60">
          This does not bypass this app's permissions or backend policies.
        </p>
        {details?.scope ? (
          <p className="mt-4 font-mono text-xs text-foreground/60">
            Requested scope: <span className="text-[var(--neon-blue)]">{details.scope}</span>
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="mt-4 font-mono text-xs text-[var(--neon-red)]">
            {error}
          </p>
        ) : null}
        <div className="mt-8 flex gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="rounded border border-[var(--neon-red)] px-5 py-2 font-mono text-xs uppercase tracking-widest text-[var(--neon-red)] hover-red-glow disabled:opacity-50"
          >
            Approve
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="rounded border border-[var(--neon-blue)] px-5 py-2 font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow disabled:opacity-50"
          >
            Deny
          </button>
        </div>
      </div>
    </main>
  );
}

export { isSafeNext };
