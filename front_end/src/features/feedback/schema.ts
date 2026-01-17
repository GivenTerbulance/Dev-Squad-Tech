import { z } from "zod";

export const feedbackSchema = z.object({
  service: z.string().min(2, "Service is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
