import { api, apiConfig, endpoints } from "@/lib/api";
import { emptyPage, type Paginated } from "@/lib/api/types";

/**
 * Public-facing practicum row. Confirmed via Postman audit (2026-04-30):
 * each frontend course (Reading/Writing/Listening/Speaking) is its own
 * practicum, NOT a module of a single IELTS practicum.
 */
export interface ApiPracticum {
  _id: string;
  name: string;
  description?: string;
  order?: number;
  isActive?: boolean;
  isPublic?: boolean;
  imageUrl?: string;
  modulesCount?: number;
}

export const practicumsService = {
  listPublic: async (): Promise<Paginated<ApiPracticum>> => {
    if (apiConfig.useMock) return emptyPage<ApiPracticum>();
    return api.get<Paginated<ApiPracticum>>(endpoints.practicums.public, {
      params: { limit: 100 },
    });
  },
};
