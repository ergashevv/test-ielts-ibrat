import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { promosService } from "@/services";

export function usePromos() {
  return useQuery({
    queryKey: queryKeys.promos.list(),
    queryFn: () => promosService.list(),
  });
}
