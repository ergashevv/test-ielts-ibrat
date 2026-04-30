import { api, apiConfig, endpoints } from "@/lib/api";
import type { Envelope } from "@/lib/api/types";

/**
 * Real shape from GET /plans?isActive=true (Round 3 #7).
 */
export interface Plan {
  _id: string;
  title: string;
  price: number;
  currency: string;
  durationInDays: number;
  isActive: boolean;
  isTrial: boolean | null;
  coinPrice: number;
  features: string[];
}

export interface ActivePlan {
  _id: string;
  name: string;
  expiresAt: string;
}

export const plansService = {
  list: async (params?: { isActive?: boolean }): Promise<Plan[]> => {
    if (apiConfig.useMock) return [];
    const res = await api.get<Envelope<Plan[]>>(endpoints.plans.list, { params });
    return res.data;
  },

  detail: async (id: string): Promise<Plan | null> => {
    if (apiConfig.useMock) return null;
    const res = await api.get<Envelope<Plan>>(endpoints.plans.detail(id));
    return res.data;
  },

  me: async (): Promise<ActivePlan | null> => {
    if (apiConfig.useMock) return null;
    const res = await api.get<Envelope<ActivePlan | null>>(endpoints.plans.me);
    return res.data;
  },
};
