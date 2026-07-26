import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/genai-coe-logo.png.asset.json";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/hackathon", label: "Hackathon" },
  { to: "/showcase", label: "Showcase" },
  { to: "/project-exhibition", label: "Exhibition" },
  { to: "/schedule", label: "Schedule" },
  { to: "/speakers", label: "Speakers" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/n30", label: "N30" },
  { to: "/venue", label: "Venue" },
  { to: "/highlights", label: "Highlights" },
  { to: "/contact", label: "Contact" },
] as const;

const REGISTER_LINKS = [
  { to: "/hackathon/register", label: "Hackathon" },
  { to: "/showcase/register", label: "Project Showcase" },
  { to: "/project-exhibition/register", label: "Project Exhibition" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const regRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (regRef.current && !regRef.current.contains(e.target as Node)) {
        setRegOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur-md transition-all",
        scrolled
          ? "bg-black/85 rgb-border border-x-0 border-t-0"
          : "bg-black/40 border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={logoAsset.url}
            alt="Gen AI Center of Excellence — IEM"
            className="h-11 w-auto object-contain sm:h-12"
            style={{ padding: "2px" }}
          />
          <span className="hidden font-display text-sm font-black uppercase tracking-widest text-foreground/90 xl:block">
            Summit <span className="text-[var(--neon-blue)]">2027</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded px-2.5 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground/80 transition-colors hover:text-[var(--neon-blue)]"
                activeProps={{ className: "text-[var(--neon-red)]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div ref={regRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setRegOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={regOpen}
              className="inline-flex items-center gap-1 rounded border border-[var(--neon-red)] bg-black px-3 py-2 font-display text-[11px] font-black uppercase tracking-widest text-[var(--neon-red)] hover-red-glow"
            >
              [ Register ]
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {regOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded border border-[var(--neon-blue)]/50 bg-black/95 p-1 shadow-lg backdrop-blur"
              >
                {REGISTER_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setRegOpen(false)}
                    className="block rounded px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground/80 hover:bg-[var(--neon-blue)]/10 hover:text-[var(--neon-blue)]"
                  >
                    &gt; {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            className="text-foreground xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-[var(--neon-blue)]/40 bg-black/95 xl:hidden">
          <ul className="flex flex-col p-4">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 font-mono text-sm uppercase tracking-widest text-foreground/80 hover:text-[var(--neon-red)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border/40 pt-2">
              <p className="px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--neon-red)]">
                &gt; Register
              </p>
              {REGISTER_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 font-mono text-sm uppercase tracking-widest text-foreground/80 hover:text-[var(--neon-blue)]"
                >
                  &gt; {l.label}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
