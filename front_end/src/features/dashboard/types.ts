export type Review = {
  id: string;
  service: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Feedback = {
  id: string;
  service: string;
  message: string;
  createdAt: string;
};

export type UserSummary = {
  name: string;
  email: string;
  totalReviews: number;
  totalFeedback: number;
  averageRating: number;
};
