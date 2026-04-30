import { api, apiConfig, endpoints } from "@/lib/api";
import type { Envelope } from "@/lib/api/types";
import { mockUser } from "@/data/mock";
import type { User } from "@/types";

export interface SendOtpPayload {
  phone: string;
}

export interface SendOtpResponse {
  message: string;
}

export interface VerifyOtpPayload {
  phone: string;
  code: string;
}

export interface GoogleLoginPayload {
  idToken: string;
}

/**
 * Auth uses HttpOnly cookies (`token`, `refreshToken`) — set by the server,
 * not visible to JS. Call sites just receive the user envelope on success.
 */
export const authService = {
  sendOtp: async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
    if (apiConfig.useMock) {
      return { message: "OTP sent" };
    }
    const res = await api.post<Envelope<SendOtpResponse>>(
      endpoints.auth.sendOtp,
      payload,
    );
    return res.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<User> => {
    if (apiConfig.useMock) {
      return mockUser;
    }
    const res = await api.post<Envelope<User>>(endpoints.auth.verifyOtp, payload);
    return res.data;
  },

  googleLogin: async (payload: GoogleLoginPayload): Promise<User> => {
    if (apiConfig.useMock) {
      return mockUser;
    }
    const res = await api.post<Envelope<User>>(
      endpoints.auth.googleLogin,
      payload,
    );
    return res.data;
  },

  logout: async (): Promise<void> => {
    if (apiConfig.useMock) return;
    await api.post<unknown>(endpoints.auth.logout);
  },

  exists: async (phone: string): Promise<{ exists: boolean }> => {
    if (apiConfig.useMock) return { exists: false };
    const res = await api.post<Envelope<{ exists: boolean }>>(endpoints.auth.exists, {
      phone,
    });
    return res.data;
  },
};
