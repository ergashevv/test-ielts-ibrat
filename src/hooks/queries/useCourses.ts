import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { coursesService } from "@/services";

export function useCourses() {
  return useQuery({
    queryKey: queryKeys.courses.list(),
    queryFn: () => coursesService.list(),
  });
}
