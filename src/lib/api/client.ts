import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

import { apiConfig } from "./config";
import { normalizeAxiosError } from "./errors";

const AUTH_PATHS = new Set(["/login", "/login/otp"]);
let redirectingToLogin = false;

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  if (redirectingToLogin) return;
  if (AUTH_PATHS.has(window.location.pathname)) return;
  redirectingToLogin = true;
  window.location.href = "/login";
};

const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: apiConfig.timeoutMs,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use((config) => {
    const token = Cookies.get("m_at");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        Cookies.remove("m_at");
        Cookies.remove("m_rt");
        redirectToLogin();
      }
      return Promise.reject(normalizeAxiosError(error));
    },
  );

  return instance;
};

export const apiClient = createApiClient();

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((r) => r.data),
  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, body, config).then((r) => r.data),
  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, body, config).then((r) => r.data),
  patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, body, config).then((r) => r.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((r) => r.data),
};
