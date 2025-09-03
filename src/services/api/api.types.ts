import { z } from "zod";

/**
 * Schema for user information returned from the backend
 * Based on actual backend response structure
 */
export const UserInfoSchema = z.object({
  id: z.number(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  subscription: z.object({
    planName: z.string(),
    planType: z.string(),
  }),
  role: z.number(),
  quota: z.object({
    percent: z.number(),
    availableAmount: z.number(),
    initialLeftover: z.number(),
    limit: z.number(),
  }),
  team: z.object({
    id: z.string(),
    name: z.string(),
  }),
  roles: z.array(z.string()),
});

/**
 * Type for user information returned from the backend
 */
export type UserInfo = z.infer<typeof UserInfoSchema>;
