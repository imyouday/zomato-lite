export function RatingPill({
  value,
  size = "md",
}: {
  value: number | null;
  size?: "md" | "lg";
}) {
  if (value === null) return null;
  const num = size === "lg" ? "text-2xl" : "text-sm";
  const star = size === "lg" ? "h-4 w-4" : "h-3 w-3";
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-[#24963F] px-2 py-1 text-white">
      <svg viewBox="0 0 20 20" aria-hidden="true" className={star}>
        <path
          fill="currentColor"
          d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85L10 1.5z"
        />
      </svg>
      <span className={`font-semibold leading-none ${num}`}>{value.toFixed(1)}</span>
      <span className={size === "lg" ? "text-sm leading-none opacity-80" : "text-[10px] leading-none opacity-75"}>
        /5
      </span>
    </span>
  );
}

export function ratingLabel(value: number | null): string {
  if (value === null) return "No ratings yet";
  if (value >= 4.5) return "Excellent";
  if (value >= 4.0) return "Very Good";
  if (value >= 3.0) return "Good";
  if (value >= 2.0) return "Average";
  return "It needs work";
}