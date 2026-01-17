"use client";

import { Review, mockReviews } from "./mock";
import { useState } from "react";

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div>
      {reviews.map((r) => (
        <div key={r.id} className="bg-white p-4 rounded shadow mb-2">
          <p className="font-semibold">{r.service}</p>
          <p>Rating: {r.rating} ⭐</p>
          <p>{r.comment}</p>
          <p className="text-gray-400 text-sm">{r.createdAt}</p>
          <button
            onClick={() => handleDelete(r.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
