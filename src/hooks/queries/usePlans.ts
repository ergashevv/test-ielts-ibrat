import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { plansService } from "@/services/plans.service";

export function usePlans(params?: { isActive?: boolean }) {
  return useQuery({
    queryKey: queryKeys.plans.list(params),
    queryFn: () => plansService.list(params),
  });
}

export function useActivePlan() {
  return useQuery({
    queryKey: queryKeys.plans.activeMe(),
    queryFn: () => plansService.me(),
  });
}
