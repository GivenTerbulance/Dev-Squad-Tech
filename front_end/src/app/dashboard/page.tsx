"use client";

import { mockUserSummary, mockReviews, mockFeedback } from "@/features/dashboard/mock";
import { Review, Feedback, UserSummary } from "@/features/dashboard/types";

export default function DashboardPage() {
  const user: UserSummary = mockUserSummary;
  const reviews: Review[] = mockReviews;
  const feedbacks: Feedback[] = mockFeedback;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="text-gray-700 mb-6">Here’s a summary of your activity.</p>

      {/* User Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-xl mb-2">Total Reviews</h2>
          <p className="text-gray-600 text-2xl">{user.totalReviews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-xl mb-2">Total Feedback</h2>
          <p className="text-gray-600 text-2xl">{user.totalFeedback}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-xl mb-2">Average Rating</h2>
          <p className="text-gray-600 text-2xl">{user.averageRating.toFixed(1)}</p>
        </div>
      </div>

      {/* Recent Reviews */}
      <h2 className="text-2xl font-semibold mb-2">Recent Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{r.service}</p>
            <p>Rating: {r.rating} ⭐</p>
            <p className="text-gray-600">{r.comment}</p>
            <p className="text-gray-400 text-sm">{r.createdAt}</p>
          </div>
        ))}
      </div>

      {/* Recent Feedback */}
      <h2 className="text-2xl font-semibold mb-2">Recent Feedback</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feedbacks.map((f) => (
          <div key={f.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{f.service}</p>
            <p className="text-gray-600">{f.message}</p>
            <p className="text-gray-400 text-sm">{f.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
