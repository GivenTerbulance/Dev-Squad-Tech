import { z } from "zod";

export const UpdateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    image: z.string().url("Invalid image URL").nullish(),
});

export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;
