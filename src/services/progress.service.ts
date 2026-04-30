import { api, apiConfig, endpoints } from "@/lib/api";
import { emptyPage, type Paginated } from "@/lib/api/types";

/**
 * Module-level progress is read off the enrolled-practicum row (Round 3 #2):
 *   GET /students/:studentId/practicums  →  data[].progress (0–100)
 *
 * Per-lesson completion comes from the student-scoped lesson detail (Round 2),
 * via `lesson.completed` flag — wired in tasks.service when needed.
 */
export interface EnrolledPracticum {
  _id: string;
  practicum: { _id: string; name: string };
  progress: number;
  isEligible: boolean;
  isPaid: boolean;
}

export const progressService = {
  enrolled: async (studentId: string): Promise<Paginated<EnrolledPracticum>> => {
    if (apiConfig.useMock) return emptyPage<EnrolledPracticum>();
    return api.get<Paginated<EnrolledPracticum>>(
      endpoints.practicums.enrolled(studentId),
      { params: { select: "practicum", limit: 100 } },
    );
  },
};
