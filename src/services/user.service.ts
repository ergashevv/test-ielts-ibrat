import { api, apiConfig, endpoints } from "@/lib/api";
import type { Envelope } from "@/lib/api/types";
import { mockUser } from "@/data/mock";
import type { User } from "@/types";

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface ApiUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  coins?: number;
  xp?: number;
  level?: number;
  plan?: { _id: string; name: string; expiresAt: string } | null;
}

const fromApi = (u: ApiUser): User => ({
  id: u._id,
  firstName: u.firstName,
  lastName: u.lastName,
  fullName: [u.firstName, u.lastName].filter(Boolean).join(" "),
  email: "",
  phone: u.phone,
  avatar: u.avatar,
  avatarUrl: u.avatar,
  coins: u.coins,
  xp: u.xp,
  level: u.level,
  plan: u.plan,
});

export const userService = {
  me: async (): Promise<User> => {
    if (apiConfig.useMock) return mockUser;
    const res = await api.get<ApiUser>(endpoints.user.me);
    return fromApi(res);
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<User> => {
    if (apiConfig.useMock) return { ...mockUser, ...payload };
    const res = await api.put<ApiUser>(endpoints.user.update(id), payload);
    return fromApi(res);
  },

  delete: async (id: string): Promise<void> => {
    if (apiConfig.useMock) return;
    await api.delete<unknown>(endpoints.user.delete(id));
  },
};

export interface AvatarResource {
  _id: string;
  url: string;
}

export const avatarService = {
  upload: async (file: File): Promise<AvatarResource> => {
    if (apiConfig.useMock) {
      return { _id: "mock", url: mockUser.avatarUrl ?? "/Avatar.svg" };
    }
    const form = new FormData();
    form.append("file", file);
    const res = await api.post<AvatarResource>(endpoints.avatar.create, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },
  replace: async (id: string, file: File): Promise<AvatarResource> => {
    if (apiConfig.useMock) {
      return { _id: id, url: mockUser.avatarUrl ?? "/Avatar.svg" };
    }
    const form = new FormData();
    form.append("file", file);
    const res = await api.put<AvatarResource>(
      endpoints.avatar.update(id),
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res;
  },
};
