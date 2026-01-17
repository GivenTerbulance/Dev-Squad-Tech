"use client";

import { useState } from "react";
import { Feedback, mockFeedback } from "./mock";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedback);

  const handleDelete = (id: string) => {
    setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  return (
    <div>
      {feedbacks.map((f) => (
        <div key={f.id} className="bg-white p-4 rounded shadow mb-2">
          <p className="font-semibold">{f.service}</p>
          <p>{f.message}</p>
          <p className="text-gray-400 text-sm">{f.createdAt}</p>
          <button
            onClick={() => handleDelete(f.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
