import { api, apiConfig, endpoints } from "@/lib/api";

/**
 * Real shape from GET /streaks/current (Round 3 #6).
 */
export interface StreakAim {
  _id: string;
  title: string;
  issueAfterDays: number;
  coins: number;
  isActive: boolean;
  targetCoins: number;
  totalCoins: number;
  selected: boolean;
  achieved: boolean;
  awarded: boolean;
  remainingDays: number;
  progressPercent: number;
}

export interface StreakSnapshot {
  _id: string;
  user: string;
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string | null;
  freezesLeft: number;
  lastBrokenStreak: number;
  dayStartsAt: string;
  aim?: StreakAim | null;
  purchasedFreezes?: unknown[];
  weeklyStreak?: Record<string, boolean>;
  createdAt?: string;
  updatedAt?: string;
}

export interface StreakTarget {
  _id: string;
  title: string;
  issueAfterDays: number;
  targetCoins: number;
}

export const streakService = {
  current: async (): Promise<StreakSnapshot> => {
    if (apiConfig.useMock) {
      return {
        _id: "mock-streak",
        user: "mock-user",
        currentStreak: 0,
        longestStreak: 0,
        lastCheckIn: null,
        freezesLeft: 0,
        lastBrokenStreak: 0,
        dayStartsAt: "00:00",
      };
    }
    return api.get<StreakSnapshot>(endpoints.streak.current);
  },

  targets: async (): Promise<StreakTarget[]> => {
    if (apiConfig.useMock) return [];
    return api.get<StreakTarget[]>(endpoints.streak.targets);
  },

  checkIn: async (): Promise<StreakSnapshot> => {
    if (apiConfig.useMock) {
      const snap = await streakService.current();
      return { ...snap, currentStreak: snap.currentStreak + 1 };
    }
    return api.get<StreakSnapshot>(endpoints.streak.checkIn);
  },

  recovery: async (): Promise<StreakSnapshot> => {
    if (apiConfig.useMock) return streakService.current();
    return api.post<StreakSnapshot>(endpoints.streak.recovery);
  },
};
