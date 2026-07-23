// Small SVG matrix motifs — rabbit, spoon, agent silhouette.

export function RabbitIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 42c-4-4-4-12 0-16 3-3 8-3 10 0" />
      <path d="M42 42c4-4 4-12 0-16-3-3-8-3-10 0" />
      <ellipse cx="32" cy="46" rx="12" ry="10" />
      <circle cx="27" cy="45" r="1.2" fill="currentColor" />
      <circle cx="37" cy="45" r="1.2" fill="currentColor" />
      <path d="M30 50c1 1 3 1 4 0" />
      <path d="M20 58c4 0 8-1 12-2 4 1 8 2 12 2" />
    </svg>
  );
}

export function SpoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="18" rx="8" ry="12" transform="rotate(-30 20 18)" />
      <path d="M26 26 C 34 34, 44 42, 52 56" />
    </svg>
  );
}

export function AgentSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 96"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="32" cy="18" r="10" />
      <rect x="24" y="24" width="16" height="4" />
      <path d="M14 44 L 32 30 L 50 44 L 50 96 L 14 96 Z" />
      <rect x="27" y="15" width="10" height="4" fill="black" />
    </svg>
  );
}
