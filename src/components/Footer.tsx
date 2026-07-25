import { Link } from "@tanstack/react-router";
import { QrBlock } from "./QrBlock";
import { CommunityLinks } from "./CommunityLinks";
import logoAsset from "@/assets/genai-coe-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--neon-red)]/30 bg-black/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <img
            src={logoAsset.url}
            alt="Gen AI Center of Excellence — IEM"
            className="mb-4 h-20 w-auto object-contain"
          />
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
            <li><Link to="/sponsors" className="hover:text-[var(--neon-blue)]">Sponsors</Link></li>
            <li><Link to="/highlights" className="hover:text-[var(--neon-blue)]">Highlights</Link></li>
            <li><Link to="/n30" className="hover:text-[var(--neon-blue)]">Meet N30</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-[var(--neon-blue)]">
            Contact
          </h4>
          <ul className="space-y-2 font-mono text-xs text-foreground/80">
            <li>contact@genaicoe.example</li>
            <li>+91 · TBA</li>
          </ul>
          <div className="mt-4">
            <CommunityLinks />
          </div>
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
