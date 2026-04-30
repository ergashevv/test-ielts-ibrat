import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { lessonsService } from "@/services/lessons.service";

export function useLessons(
  practicumId: string | undefined,
  moduleId: string | undefined,
) {
  return useQuery({
    queryKey: queryKeys.lessons.list(practicumId ?? "", moduleId ?? ""),
    queryFn: () =>
      lessonsService.list(practicumId as string, moduleId as string),
    enabled: Boolean(practicumId && moduleId),
  });
}

export function useLessonDetail(
  practicumId: string | undefined,
  moduleId: string | undefined,
  lessonId: string | undefined,
) {
  return useQuery({
    queryKey: queryKeys.lessons.detail(
      practicumId ?? "",
      moduleId ?? "",
      lessonId ?? "",
    ),
    queryFn: () =>
      lessonsService.detail(
        practicumId as string,
        moduleId as string,
        lessonId as string,
      ),
    enabled: Boolean(practicumId && moduleId && lessonId),
  });
}
