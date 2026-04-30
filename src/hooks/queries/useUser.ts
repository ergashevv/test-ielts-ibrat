import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import {
  avatarService,
  userService,
  type UpdateUserPayload,
} from "@/services/user.service";
import type { User } from "@/types";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.user.me(),
    queryFn: () => userService.me(),
  });
}

export function useUpdateMe(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => userService.update(userId, payload),
    onSuccess: (user: User) => {
      queryClient.setQueryData(queryKeys.user.me(), user);
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => avatarService.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: (userId: string) => userService.delete(userId),
  });
}
