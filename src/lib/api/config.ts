export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  useMock: process.env.NEXT_PUBLIC_USE_MOCK === "true",
  timeoutMs: 20_000,
} as const;
