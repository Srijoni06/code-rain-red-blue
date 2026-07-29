import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

function isSafeNext(n: unknown): n is string {
  return typeof n === "string" && n.startsWith("/") && !n.startsWith("//");
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: isSafeNext(s.next) ? s.next : "/",
  }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      if (search.next.startsWith("/")) {
        window.location.href = search.next;
        throw redirect({ to: "/" });
      }
      throw redirect({ to: "/" });
    }
  },
  component: AuthPage,
});

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) {
        if (next.startsWith("/") && !next.startsWith("//")) {
          window.location.href = next;
        } else {
          navigate({ to: "/" });
        }
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setBusy(false);
      }
    } else {
      const emailRedirectTo =
        next.startsWith("/") && !next.startsWith("//")
          ? `${window.location.origin}${next}`
          : window.location.origin;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });
      if (error) {
        setError(error.message);
      } else {
        setInfo("Check your email to confirm the account, then sign in.");
      }
      setBusy(false);
    }
  }

  return (
    <main className="relative z-10 mx-auto max-w-md px-6 py-16">
      <div className="page-panel rounded-md border border-[var(--neon-blue)]/40 p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)]">
          &gt; access terminal
        </p>
        <h1 className="mt-3 font-display text-2xl font-black uppercase tracking-widest text-[var(--neon-red)]">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 font-mono text-xs text-foreground/70">
          The construct requires identification.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block font-mono text-xs uppercase tracking-widest text-foreground/70">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-[var(--neon-blue)]/40 bg-black/60 px-3 py-2 font-mono text-sm text-foreground focus:border-[var(--neon-blue)] focus:outline-none"
            />
          </label>
          <label className="block font-mono text-xs uppercase tracking-widest text-foreground/70">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border border-[var(--neon-blue)]/40 bg-black/60 px-3 py-2 font-mono text-sm text-foreground focus:border-[var(--neon-blue)] focus:outline-none"
            />
          </label>
          {error && (
            <p role="alert" className="font-mono text-xs text-[var(--neon-red)]">
              {error}
            </p>
          )}
          {info && (
            <p className="font-mono text-xs text-[var(--neon-blue)]">{info}</p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded border border-[var(--neon-red)] px-5 py-2 font-mono text-xs uppercase tracking-widest text-[var(--neon-red)] hover-red-glow disabled:opacity-50"
          >
            {busy ? "..." : mode === "signin" ? "Enter" : "Register"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setInfo(null);
          }}
          className="mt-6 w-full font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)] hover:underline"
        >
          {mode === "signin" ? "Need an account? Register" : "Have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
