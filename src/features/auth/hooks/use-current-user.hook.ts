import { useQueryWithResult } from "@/shared/hooks";
import { userService } from "../services";

export const useCurrentUser = () => {
  return useQueryWithResult({
    queryKey: ["user", "current"],
    queryFn: userService.getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
};
