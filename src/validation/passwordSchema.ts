import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(5, "Password must contain 5 characters")
  .max(20, "Password should not exceed 5 characters");
