"use client";

import { useState } from "react";
import { Star } from "@/components/rating";

export function StarPicker({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value || 0;

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((i) => {
        const label = i === 1 ? "1 star" : `${i} stars`;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            aria-label={label}
            className="cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744]"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              onChange(i);
              setHover(0);
            }}
          >
            <Star filled={i <= shown} />
          </button>
        );
      })}
    </div>
  );
}