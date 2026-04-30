import { api, apiConfig, endpoints } from "@/lib/api";
import { emptyPage, type Paginated } from "@/lib/api/types";

/**
 * A Module under a Practicum (e.g. IELTS → Reading|Writing|Listening|Speaking).
 * Frontend `courseId` maps to `module.name` (lower-cased).
 */
export interface ApiModule {
  _id: string;
  name: string;
  description?: string;
  lessonsCount?: number;
  order?: number;
  progress?: number;
}

export const modulesService = {
  list: async (practicumId: string): Promise<Paginated<ApiModule>> => {
    if (apiConfig.useMock) return emptyPage<ApiModule>();
    return api.get<Paginated<ApiModule>>(
      endpoints.practicums.modules(practicumId),
      { params: { limit: 100 } },
    );
  },
};
