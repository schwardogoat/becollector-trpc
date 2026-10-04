import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),

  BETTER_AUTH_SECRET: z.string().min(32),

  BETTER_AUTH_URL: z.url(),

  FRONTEND_URL: z.url().default("http://localhost:5173"),
});

export const env = envSchema.parse(process.env);
