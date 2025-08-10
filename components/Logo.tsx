export function Logo({ wordmark = false, className = "" }: { wordmark?: boolean; className?: string }) {
  if (wordmark) {
    return (
      <svg className={className} viewBox="0 0 640 120" aria-label="fokus">
        <defs>
          <linearGradient id="fx" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5A9CEA" />
            <stop offset="100%" stopColor="#95CAF6" />
          </linearGradient>
        </defs>
        <g fill="#0E0F13">
          <text x="110" y="84" fontSize="72" fontFamily="Inter, ui-sans-serif" fontWeight="700" letterSpacing="-0.02em">
            fokus
          </text>
        </g>
        <circle cx="60" cy="60" r="34" fill="none" stroke="url(#fx)" strokeWidth="10" />
        <circle cx="60" cy="60" r="12" fill="url(#fx)" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 256 256" aria-label="fokus mark">
      <defs>
        <linearGradient id="fxg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5A9CEA" />
          <stop offset="100%" stopColor="#95CAF6" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="56" fill="#F1F2F8" />
      <circle cx="128" cy="128" r="86" fill="none" stroke="url(#fxg)" strokeWidth="12" />
      <circle cx="128" cy="128" r="28" fill="url(#fxg)" />
    </svg>
  );
}
