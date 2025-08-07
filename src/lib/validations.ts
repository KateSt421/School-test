import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  website: z.string().url("Invalid URL").or(z.literal("")).optional(),
  company: z.object({
    name: z.string().min(1, "Company name is required")
  })
});

export type UserFormSchema = z.infer<typeof userSchema>;