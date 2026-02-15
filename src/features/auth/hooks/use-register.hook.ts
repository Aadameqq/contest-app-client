import { useMutationWithResult } from "@/shared/hooks";
import { userService } from "../services";
import { type CreateUserInput } from "../contracts";

export const useRegister = () => {
  return useMutationWithResult({
    mutationFn: (input: CreateUserInput) => userService.register(input),
  });
};
