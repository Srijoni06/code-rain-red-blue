import { Link } from "@tanstack/react-router";
import { QrBlock } from "./QrBlock";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--neon-red)]/30 bg-black/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div
            aria-label="Gen AI CoE logo"
            className="mb-3 grid h-14 w-14 place-items-center rounded border border-[var(--neon-blue)]/60 bg-black font-display text-xs font-bold uppercase text-[var(--neon-blue)]"
            style={{ boxShadow: "var(--glow-blue)" }}
          >
            CoE
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            GenAI CoE Summit 2027
            <br />
            IEM-UEM · Kolkata
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-[var(--neon-red)]">
            Navigate
          </h4>
          <ul className="space-y-2 font-mono text-xs text-foreground/80">
            <li><Link to="/hackathon" className="hover:text-[var(--neon-blue)]">Hackathon</Link></li>
            <li><Link to="/showcase" className="hover:text-[var(--neon-blue)]">Project Showcase</Link></li>
            <li><Link to="/schedule" className="hover:text-[var(--neon-blue)]">Schedule</Link></li>
            <li><Link to="/speakers" className="hover:text-[var(--neon-blue)]">Speakers</Link></li>
            <li><Link to="/n30" className="hover:text-[var(--neon-blue)]">Meet N30</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-[var(--neon-blue)]">
            Contact
          </h4>
          <ul className="space-y-2 font-mono text-xs text-foreground/80">
            <li>email@genaicoe.example</li>
            <li>+91 · TBA</li>
            <li className="flex gap-3 pt-2">
              <a href="#" className="hover:text-[var(--neon-red)]">X</a>
              <a href="#" className="hover:text-[var(--neon-red)]">LinkedIn</a>
              <a href="#" className="hover:text-[var(--neon-red)]">Instagram</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h4 className="font-display text-sm uppercase tracking-widest text-[var(--neon-red)]">
            Scan
          </h4>
          <QrBlock caption="Home URL" size={110} />
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        © 2027 Gen AI Center of Excellence · IEM-UEM
      </div>
    </footer>
  );
}
