export function HeroArt({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustration of a burrito on a plate"
      className={
        "relative overflow-hidden bg-[#E23744] " + (className ?? "")
      }
    >
      <svg
        viewBox="0 0 600 320"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="zl-hero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF7E8B" />
            <stop offset="1" stopColor="#C02432" />
          </linearGradient>
          <radialGradient id="zl-glow" cx="0.5" cy="0.4" r="0.8">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="320" fill="url(#zl-hero)" />
        <rect width="600" height="320" fill="url(#zl-glow)" />

        <g opacity="0.14" fill="#ffffff">
          <circle cx="80" cy="60" r="90" />
          <circle cx="560" cy="300" r="130" />
          <circle cx="520" cy="50" r="50" />
        </g>

        <g transform="rotate(-6 300 165)">
          <ellipse cx="300" cy="252" rx="200" ry="22" fill="#000000" opacity="0.12" />

          <g transform="translate(300 165)">
            <ellipse cx="0" cy="0" rx="205" ry="82" fill="#F6C98C" />
            <ellipse cx="-14" cy="2" rx="190" ry="70" fill="#F7D19B" />

            <ellipse cx="-30" cy="-6" rx="150" ry="48" fill="#E8A85B" />

            <ellipse cx="-52" cy="6" rx="70" ry="26" fill="#C97741" />
            <ellipse cx="30" cy="-14" rx="34" ry="18" fill="#8FBF5C" />
            <ellipse cx="52" cy="14" rx="30" ry="15" fill="#E23744" />
            <ellipse cx="8" cy="18" rx="26" ry="13" fill="#FFC24D" />
            <ellipse cx="-90" cy="-12" rx="24" ry="12" fill="#F5EFDC" />
            <ellipse cx="96" cy="-6" rx="22" ry="11" fill="#F5EFDC" />
            <ellipse cx="20" cy="-2" rx="14" ry="9" fill="#E8A85B" />

            <g stroke="#F6C98C" strokeWidth="16" strokeLinecap="round">
              <path d="M-90 52 Q 70 96 210 44" fill="none" />
            </g>
          </g>

          <g transform="translate(388 110) rotate(16)">
            <rect x="-40" y="-28" width="80" height="56" rx="6" fill="#E8E4D8" />
            <rect x="-28" y="-34" width="64" height="70" rx="6" fill="#CFCAB8" />
          </g>

          <g stroke="#ffffff" strokeOpacity="0.65" strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M205 62 q 10 -16 0 -30" />
            <path d="M300 58 q 10 -16 0 -32" />
            <path d="M392 62 q 10 -16 0 -30" />
          </g>
        </g>
      </svg>
    </div>
  );
}