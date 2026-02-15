import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { type Result } from "@/shared/domain";
import { type ApiFailure } from "@/shared/lib";

export const useMutationWithResult = <TData, TVariables, TError = ApiFailure>(
  options: UseMutationOptions<Result<TData, TError>, never, TVariables>,
) => {
  const mutation = useMutation({
    ...options,
    throwOnError: false,
  });

  return {
    ...mutation,
    data: mutation.data?.success ? mutation.data.data : undefined,
    error: mutation.data?.success === false ? mutation.data.failure : undefined,
  };
};
