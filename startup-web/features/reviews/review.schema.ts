import { z } from "zod";

export const CreateReviewSchema = z.object({
    rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
    comment: z.string().max(1000, "Comment cannot exceed 1000 characters").optional(),
});

export type CreateReviewData = z.infer<typeof CreateReviewSchema>;
