import { Linkedin, Instagram, MessageCircle, Slack } from "lucide-react";

const LINKS = [
  { href: "#", label: "Discord", Icon: MessageCircle },
  { href: "#", label: "Slack", Icon: Slack },
  { href: "#", label: "LinkedIn", Icon: Linkedin },
  { href: "#", label: "Instagram", Icon: Instagram },
];

export function CommunityLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {LINKS.map(({ href, label, Icon }, i) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={`grid h-9 w-9 place-items-center rounded border transition-all ${
            i % 2 === 0
              ? "border-[var(--neon-red)]/60 text-[var(--neon-red)] hover-red-glow"
              : "border-[var(--neon-blue)]/60 text-[var(--neon-blue)] hover-blue-glow"
          }`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
