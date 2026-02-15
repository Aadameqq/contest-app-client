import { fail, success, Result } from "@/shared/domain/result.domain";

export type ApiFailure = {
  message: string;
  code?: string;
  status?: number;
};

export type HttpClientInput = {
  path: string;
  baseUrl?: string;
  config?: RequestInit;
};

const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/";

const parseResponseBody = async <T>(response: Response): Promise<T> => {
  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
  } catch {
    // Body is empty or not JSON
  }
  return {} as T;
};

const request = async <T>({
  path,
  baseUrl = DEFAULT_BASE_URL,
  config = {},
}: HttpClientInput): Promise<Result<T, ApiFailure>> => {
  const url = `${baseUrl}${path}`;
  try {
    const response = await fetch(url, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    if (!response.ok) {
      const errorData =
        await parseResponseBody<Record<string, string>>(response);
      return fail({
        status: response.status,
        message: errorData.message || errorData.title || "Request failed",
      });
    }

    const data = await parseResponseBody<T>(response);
    return success(data);
  } catch (error) {
    return fail({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const httpClient = {
  get: <T>(path: string, config?: RequestInit) => {
    return request<T>({ path, config: { ...config, method: "GET" } });
  },

  post: <T>(path: string, body: unknown, config?: RequestInit) => {
    return request<T>({
      path,
      config: {
        ...config,
        method: "POST",
        body: JSON.stringify(body),
      },
    });
  },

  put: <T>(path: string, body: unknown, config?: RequestInit) => {
    return request<T>({
      path,
      config: {
        ...config,
        method: "PUT",
        body: JSON.stringify(body),
      },
    });
  },

  patch: <T>(path: string, body: unknown, config?: RequestInit) => {
    return request<T>({
      path,
      config: {
        ...config,
        method: "PATCH",
        body: JSON.stringify(body),
      },
    });
  },

  delete: <T>(path: string, config?: RequestInit) => {
    return request<T>({ path, config: { ...config, method: "DELETE" } });
  },
};
