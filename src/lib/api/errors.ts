import { AxiosError } from "axios";

export interface ApiErrorShape {
  status: number;
  code: string;
  message: string;
  data?: unknown;
  requestId?: string;
}

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    data?: unknown;
  };
  requestId?: string;
}

export class ApiError extends Error implements ApiErrorShape {
  status: number;
  code: string;
  data?: unknown;
  requestId?: string;

  constructor({ status, code, message, data, requestId }: ApiErrorShape) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
    this.requestId = requestId;
  }
}

export function normalizeAxiosError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  let normalized: ApiError;

  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const body = error.response?.data as ApiErrorBody | undefined;
    const errBody = body?.error;

    normalized = new ApiError({
      status,
      code: errBody?.code ?? error.code ?? "unknown_error",
      message: errBody?.message ?? error.message ?? "Request failed",
      data: errBody?.data,
      requestId: body?.requestId,
    });
  } else {
    normalized = new ApiError({
      status: 0,
      code: "unknown_error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }

  if (process.env.NODE_ENV !== "production") {
    const url =
      error instanceof AxiosError
        ? `${error.config?.method?.toUpperCase() ?? ""} ${error.config?.url ?? ""}`.trim()
        : "";
    console.error(
      `[api] ${normalized.status} ${normalized.code}${url ? ` — ${url}` : ""} — ${normalized.message}${
        normalized.requestId ? ` (req ${normalized.requestId})` : ""
      }`,
    );
  }

  return normalized;
}
