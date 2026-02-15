import { httpClient, type ApiFailure } from "@/shared/lib";
import { type Result, fail } from "@/shared/domain";
import {
  type LoginInput,
  type GetAuthOutput,
  checkGetAuthContract,
} from "@/features/auth/contracts";

export const authService = {
  login: async (input: LoginInput): Promise<Result<void, ApiFailure>> => {
    return httpClient.post<void>("auth", input);
  },

  logout: async (): Promise<Result<void, ApiFailure>> => {
    return httpClient.delete<void>("auth");
  },

  checkAuth: async (): Promise<Result<GetAuthOutput, ApiFailure>> => {
    const result = await httpClient.get<unknown>("auth");
    if (!result.success) {
      return fail(result.failure);
    }

    const outputCheck = checkGetAuthContract(result.data);
    if (!outputCheck.success) {
      return fail({ message: "Invalid response from server", status: 500 });
    }

    return outputCheck;
  },
};
