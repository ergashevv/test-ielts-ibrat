import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { streakService } from "@/services/streak.service";

export function useStreakSnapshot() {
  return useQuery({
    queryKey: queryKeys.streak.me(),
    queryFn: () => streakService.current(),
  });
}

export function useStreakCheckIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => streakService.checkIn(),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.streak.me(), data);
    },
  });
}

export function useStreakRecovery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => streakService.recovery(),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.streak.me(), data);
    },
  });
}
