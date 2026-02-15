import { httpClient, type ApiFailure } from "@/shared/lib";
import { type Result, fail } from "@/shared/domain";
import {
  type CreateUserInput,
  type GetUserOutput,
  checkGetUserContract,
} from "@/features/auth/contracts";

export const userService = {
  register: async (
    input: CreateUserInput,
  ): Promise<Result<void, ApiFailure>> => {
    return httpClient.post<void>("users", input);
  },

  getCurrentUser: async (): Promise<Result<GetUserOutput, ApiFailure>> => {
    const result = await httpClient.get<unknown>("users/@me");
    if (!result.success) {
      return fail(result.failure);
    }

    const outputCheck = checkGetUserContract(result.data);
    if (!outputCheck.success) {
      return fail({ message: "Invalid response from server", status: 500 });
    }

    return outputCheck;
  },
};
