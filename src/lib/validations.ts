import { z } from "zod";
import { UserFormValues } from "@/types/user";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  website: z.string().url("Invalid URL").or(z.literal("")).optional(),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().min(1, "Suite is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required")
  }),
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    catchPhrase: z.string().optional(),
    bs: z.string().optional()
  })
});

export type UserFormSchema = z.infer<typeof userSchema>;