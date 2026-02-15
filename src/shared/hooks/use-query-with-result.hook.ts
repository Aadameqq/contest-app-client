import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { type Result } from "@/shared/domain";
import { type ApiFailure } from "@/shared/lib";

export const useQueryWithResult = <TData, TError = ApiFailure>(
  options: UseQueryOptions<Result<TData, TError>, never, Result<TData, TError>>,
) => {
  const query = useQuery({
    ...options,
    throwOnError: false,
  });

  return {
    ...query,
    data: query.data?.success ? query.data.data : undefined,
    error: query.data?.success === false ? query.data.failure : undefined,
  };
};
