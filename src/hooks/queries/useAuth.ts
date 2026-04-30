import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import {
  authService,
  type GoogleLoginPayload,
  type SendOtpPayload,
  type VerifyOtpPayload,
} from "@/services/auth.service";

export function useSendOtp() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => authService.sendOtp(payload),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
  });
}

export function useGoogleSignIn() {
  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) =>
      authService.googleLogin(payload),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Drop user-scoped caches without refetching — next user may differ,
      // and any refetch would 401 anyway after the cookie is cleared.
      queryClient.removeQueries({ queryKey: queryKeys.user.all });
      queryClient.removeQueries({ queryKey: queryKeys.progress.all });
      queryClient.removeQueries({ queryKey: queryKeys.streak.all });
      queryClient.removeQueries({ queryKey: queryKeys.plans.all });
      queryClient.removeQueries({ queryKey: queryKeys.notifications.all });
      queryClient.removeQueries({ queryKey: queryKeys.lessons.all });
      queryClient.removeQueries({ queryKey: queryKeys.practicums.all });
      queryClient.removeQueries({ queryKey: queryKeys.courses.all });
    },
  });
}
