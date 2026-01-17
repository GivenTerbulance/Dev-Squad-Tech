import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
