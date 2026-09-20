const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ariaHidden: true,
};

function sz(extra?: string) {
  return ["h-4 w-4", extra].filter(Boolean).join(" ");
}

export function Pin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden={base.ariaHidden} className={sz(className)} {...base}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ForkKnife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden={base.ariaHidden} className={sz(className)} {...base}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3" />
      <path d="M21 15v7" />
    </svg>
  );
}

export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden={base.ariaHidden} className={sz(className)} {...base}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function Share({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden={base.ariaHidden} className={sz(className)} {...base}>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v13" />
    </svg>
  );
}

export function StarFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" role="img" aria-hidden={base.ariaHidden} className={sz(className).replace("h-4 w-4", "h-3.5 w-3.5")}>
      <path
        fill="currentColor"
        d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85L10 1.5z"
      />
    </svg>
  );
}