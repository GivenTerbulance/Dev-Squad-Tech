"use client";

import { useState } from "react";
import { Feedback, mockFeedback } from "./mock";
import FeedbackList from "./FeedbackList";
import { feedbackSchema, FeedbackInput } from "./schema";
import { z } from "zod";


export default function FeedbackForm() {
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedback);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data: FeedbackInput = feedbackSchema.parse({ service, message });

    const newFeedback = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setService("");
    setMessage("");
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
        className="border p-2 rounded mr-2 mb-2"
        required
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded mr-2 mb-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Feedback
      </button>

      <div className="mt-4">
        <FeedbackList />
      </div>
    </form>
  );
}
