import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/genai-coe-logo.png.asset.json";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/hackathon", label: "Hackathon" },
  { to: "/showcase", label: "Showcase" },
  { to: "/schedule", label: "Schedule" },
  { to: "/speakers", label: "Speakers" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/n30", label: "N30" },
  { to: "/venue", label: "Venue" },
  { to: "/highlights", label: "Highlights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

        <button
          className="text-foreground xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
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
          </ul>
        </div>
      )}
    </header>
  );
}
