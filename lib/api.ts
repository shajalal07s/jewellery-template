import axiosInstance from "./axios";
import { env } from "@/config/env";
import type { ApiErrorResponse } from "@/types/common";

type TryCatchResult<T> = { data: T; error: null } | { data: null; error: ApiErrorResponse };

export async function apiRequest<T>(
  config: Parameters<typeof axiosInstance.request>[0]
): Promise<TryCatchResult<T>> {
  try {
    const response = await axiosInstance.request<T>(config);
    return { data: response.data, error: null };
  } catch (err) {
    const error = normalizeError(err);
    return { data: null, error };
  }
}

function normalizeError(err: unknown): ApiErrorResponse {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as { response?: { data?: Partial<ApiErrorResponse> } }).response;
    return {
      message: response?.data?.message ?? "Something went wrong",
      errors: response?.data?.errors,
      statusCode: response?.data?.statusCode,
    };
  }
  return { message: "Something went wrong" };
}

export function getApiUrl(path: string): string {
  return `${env.apiUrl}${path}`;
}
