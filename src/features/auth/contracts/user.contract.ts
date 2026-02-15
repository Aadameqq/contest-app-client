import { z } from "zod";
import { createContract } from "@/shared/lib";

export type CreateUserInput = {
  email: string;
  password: string;
};

const getUserOutputSchema = z.object({
  id: z.string().nullable(),
  email: z.string().nullable(),
  roles: z.array(z.string()).nullable(),
});

export type GetUserOutput = z.infer<typeof getUserOutputSchema>;
export const checkGetUserContract = createContract(getUserOutputSchema);
