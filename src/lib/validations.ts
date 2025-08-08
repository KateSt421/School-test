import { z } from "zod";

// Валидатор для доменного имени (example.com, example.net и т.д.)
const domainSchema = z.string()
  .refine(value => {
    if (value === "") return true; // Пустая строка разрешена
    // Регулярное выражение для проверки доменного имени
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(value);
  }, {
    message: "Must be a valid domain name (e.g., example.com)"
  });

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  website: z.union([
    domainSchema,
    z.string().url("Invalid URL") // Также разрешаем полные URL
  ]).optional(),
  company: z.object({
    name: z.string().min(1, "Company name is required")
  })
});

export type UserFormSchema = z.infer<typeof userSchema>;