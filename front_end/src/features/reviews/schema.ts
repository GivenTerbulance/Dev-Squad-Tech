import { z } from "zod";

export const reviewSchema = z.object({
  service: z.string().min(2, "Service name is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating can be at most 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
