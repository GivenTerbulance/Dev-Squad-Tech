"use client";

import ReviewForm from "@/features/reviews/ReviewForm";

export default function ReviewsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Reviews</h1>
      <ReviewForm />
    </div>
  );
}
