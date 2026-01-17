import type { Review, Feedback, UserSummary } from "./types";

export const mockUserSummary: UserSummary = {
  name: "Teboho Given",
  email: "teboho@example.com",
  totalReviews: 5,
  totalFeedback: 3,
  averageRating: 4.6,
};

export const mockReviews: Review[] = [
  { id: "1", service: "Haircut", rating: 5, comment: "Great service!", createdAt: "2026-01-10" },
  { id: "2", service: "Shampoo", rating: 4, comment: "Good experience.", createdAt: "2026-01-09" },
  { id: "3", service: "Manicure", rating: 5, comment: "Loved it!", createdAt: "2026-01-08" },
];

export const mockFeedback: Feedback[] = [
  { id: "1", service: "Haircut", message: "Please add more appointment slots.", createdAt: "2026-01-10" },
  { id: "2", service: "Shampoo", message: "Loved the new shampoo!", createdAt: "2026-01-09" },
];
