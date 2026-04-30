import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { tasksService } from "@/services";
import type { CourseId } from "@/types";

export function useTasks(courseId: CourseId, stepId: string) {
  return useQuery({
    queryKey: queryKeys.tasks.forStep(courseId, stepId),
    queryFn: () => tasksService.fetchForStep(courseId, stepId),
  });
}
