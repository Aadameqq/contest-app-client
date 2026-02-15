export type Result<T, F> =
  | { success: true; data: T }
  | { success: false; failure: F };

export const success = <T>(data: T): Result<T, never> => ({
  success: true,
  data,
});

export const fail = <F>(failure: F): Result<never, F> => ({
  success: false,
  failure,
});
