import { z } from "zod";
import { createContract } from "@/shared/lib";

export type LoginInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const getAuthOutputSchema = z.object({
  isAuthenticated: z.boolean(),
});

export type GetAuthOutput = z.infer<typeof getAuthOutputSchema>;
export const checkGetAuthContract = createContract(getAuthOutputSchema);
