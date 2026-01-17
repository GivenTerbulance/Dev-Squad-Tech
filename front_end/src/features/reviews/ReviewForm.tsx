"use client";

import { useState } from "react";
import { Review, mockReviews } from "./mock";
import ReviewList from "./ReviewList";
import StarRating from "@/features/ratings/StarRating";
import { reviewSchema, ReviewInput } from "./schema"; // add this import
import { z } from "zod";

export default function ReviewForm() {
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Validate inputs before creating review
    const data: ReviewInput = reviewSchema.parse({ service, rating, comment });

    const newReview = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setService("");
    setRating(0);
    setComment("");
  } catch (err) {
    if (err instanceof z.ZodError) {
      alert(err.errors.map(e => e.message).join("\n"));
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Service"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="border p-2 rounded mr-2"
        required
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min={1} max={5}
        className="border p-2 rounded mr-2"
        required
      />
      <input
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 rounded mr-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Review
      </button>

      <div className="mt-4">
        <ReviewList />
      </div>
      
    </form>
  );
}
