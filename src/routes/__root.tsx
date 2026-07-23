import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CodeRain } from "@/components/CodeRain";
import { N30Mascot } from "@/components/N30Mascot";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="page-panel max-w-lg rounded-md border border-[var(--neon-red)]/40 p-8 text-center">
        <N30Mascot size="md" interactive={false} />
        <h1 className="mt-6 font-display text-4xl font-black uppercase tracking-widest text-[var(--neon-red)]">
          404
        </h1>
        <p className="mt-2 font-mono text-sm text-foreground/80">
          There is no page. Only the illusion of one.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded border border-[var(--neon-blue)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow"
        >
          Return to the construct
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="page-panel max-w-md rounded-md border border-[var(--neon-red)]/40 p-8 text-center">
        <h1 className="font-display text-xl font-black uppercase tracking-widest text-[var(--neon-red)]">
          System error
        </h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          A glitch in the code. Try again.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded border border-[var(--neon-red)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-[var(--neon-red)] hover-red-glow"
          >
            Retry
          </button>
          <a
            href="/"
            className="rounded border border-[var(--neon-blue)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-[var(--neon-blue)] hover-blue-glow"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GenAI CoE Summit 2027 — IEM-UEM" },
      {
        name: "description",
        content:
          "Two-day GenAI CoE Summit at STPI Sector V, Kolkata — January 2027. Hackathon, project showcase, panels. Organized by Gen AI Center of Excellence, IEM-UEM.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GenAI CoE Summit 2027" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800;900&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body style={{ backgroundColor: "#000" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CodeRain />
      <div className="scanlines" aria-hidden="true" />
      <Outlet />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#000",
            border: "1px solid #00b8ff",
            color: "#00b8ff",
            fontFamily: "JetBrains Mono, monospace",
          },
        }}
      />
    </QueryClientProvider>
  );
}
