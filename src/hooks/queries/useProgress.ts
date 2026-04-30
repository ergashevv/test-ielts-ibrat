import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { progressService } from "@/services/progress.service";

export function useEnrolledPracticums(studentId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.progress.enrolled(studentId ?? ""),
    queryFn: () => progressService.enrolled(studentId as string),
    enabled: Boolean(studentId),
  });
}
