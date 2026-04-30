import Cookies from "js-cookie";
import { api, apiConfig, endpoints } from "@/lib/api";
import type { Envelope } from "@/lib/api/types";
import { mockUser } from "@/data/mock";
import type { User } from "@/types";

export interface SendOtpPayload {
  phone: string;
  captcha: string;
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

export interface AuthResponse {
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user?: User; // In case it's returned, but based on screenshot it's not
}

/**
 * Auth tokens (m_at, m_rt) are returned in the response body.
 * We save them to cookies manually for the middleware and subsequent requests.
 */
export const authService = {
  sendOtp: async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
    if (apiConfig.useMock) {
      return { message: "OTP sent" };
    }
    const res = await api.post<SendOtpResponse>(
      endpoints.auth.sendOtp,
      payload,
      { withCredentials: false },
    );
    return res;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<User> => {
    if (apiConfig.useMock) {
      return mockUser;
    }
    const res = await api.post<AuthResponse>(
      endpoints.auth.verifyOtp,
      payload,
    );
    const { tokens, user } = res;

    // Save tokens using the names found in the response
    Cookies.set("m_at", tokens.accessToken, { expires: 7, sameSite: "lax" });
    Cookies.set("m_rt", tokens.refreshToken, { expires: 30, sameSite: "lax" });

    // If backend doesn't return user, we might need a placeholder or fetch it
    return user || ({ id: "me" } as User);
  },

  googleLogin: async (payload: GoogleLoginPayload): Promise<User> => {
    if (apiConfig.useMock) {
      return mockUser;
    }
    const res = await api.post<AuthResponse>(
      endpoints.auth.googleLogin,
      payload,
    );
    const { tokens, user } = res;

    Cookies.set("m_at", tokens.accessToken, { expires: 7, sameSite: "lax" });
    Cookies.set("m_rt", tokens.refreshToken, { expires: 30, sameSite: "lax" });

    return user || ({ id: "me" } as User);
  },

  logout: async (): Promise<void> => {
    if (apiConfig.useMock) return;
    try {
      await api.post<unknown>(endpoints.auth.logout);
    } finally {
      Cookies.remove("m_at");
      Cookies.remove("m_rt");
    }
  },

  exists: async (phone: string): Promise<{ exists: boolean }> => {
    if (apiConfig.useMock) return { exists: false };
    const res = await api.post<Envelope<{ exists: boolean }>>(endpoints.auth.exists, {
      phone,
    });
    return res.data;
  },
};
