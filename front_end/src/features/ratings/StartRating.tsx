"use client";

import { useState } from "react";

type StarRatingProps = {
  rating?: number;              // initial rating
  onChange?: (rating: number) => void; // callback when user selects
  max?: number;                 // number of stars
};

export default function StarRating({ rating = 0, onChange, max = 5 }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(rating);

  const handleClick = (value: number) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((value) => (
        <button
          key={value}
          type="button"
          className={`text-2xl transition-colors ${
            value <= (hovered || selected) ? "text-yellow-400" : "text-gray-300"
          }`}
          onMouseEnter={() => setHovered(value)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleClick(value)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
