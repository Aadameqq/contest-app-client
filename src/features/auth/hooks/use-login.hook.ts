import { useMutationWithResult } from "@/shared/hooks";
import { authService } from "../services";
import { type LoginInput } from "../contracts";

export const useLogin = () => {
  return useMutationWithResult({
    mutationFn: (input: LoginInput) => authService.login(input),
  });
};
