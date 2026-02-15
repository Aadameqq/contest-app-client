import { z } from "zod";
import { type Result, success, fail } from "@/shared/domain";

export type ContractViolation = {
  issues: Record<string, string[]>;
};

export const createContract = <T>(schema: z.ZodType<T>) => {
  return (data: unknown): Result<T, ContractViolation> => {
    const parsed = schema.safeParse(data);

    if (parsed.success) {
      return success(parsed.data);
    }

    const issues: Record<string, string[]> = {};

    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");

      if (!issues[path]) {
        issues[path] = [];
      }

      issues[path].push(issue.message);
    }

    return fail({
      issues: issues,
    });
  };
};
