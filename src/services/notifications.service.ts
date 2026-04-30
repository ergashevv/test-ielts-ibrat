import { api, apiConfig, endpoints } from "@/lib/api";
import { emptyPage, type Envelope, type Paginated } from "@/lib/api/types";

export interface Notification {
  _id: string;
  title: string;
  body?: string;
  isRead: boolean;
  createdAt: string;
  type?: string;
}

export const notificationsService = {
  list: async (params?: {
    page?: number;
    limit?: number;
    userId?: string;
  }): Promise<Paginated<Notification>> => {
    if (apiConfig.useMock) return emptyPage<Notification>(params?.limit ?? 20);
    return api.get<Paginated<Notification>>(endpoints.notifications.list, { params });
  },

  unreadCount: async (): Promise<number> => {
    if (apiConfig.useMock) return 0;
    const res = await api.get<Envelope<{ count: number }>>(
      endpoints.notifications.unreadCount,
    );
    return res.data.count;
  },

  markRead: async (id: string): Promise<void> => {
    if (apiConfig.useMock) return;
    await api.post<unknown>(endpoints.notifications.read(id));
  },
};
