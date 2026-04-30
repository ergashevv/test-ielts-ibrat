import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { modulesService } from "@/services/modules.service";

export function useModules(practicumId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.practicums.modules(practicumId ?? ""),
    queryFn: () => modulesService.list(practicumId as string),
    enabled: Boolean(practicumId),
  });
}
