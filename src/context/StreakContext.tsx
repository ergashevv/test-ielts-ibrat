"use client";
import { createContext, useCallback, useContext, useState, ReactNode } from "react";

interface StreakContextType {
    streak: number;
    pendingReward: number | null;
    registerCorrect: () => void;
    registerIncorrect: () => void;
    dismissReward: () => void;
    resetStreak: () => void;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const STREAK_REWARD_INTERVAL = 5;

export function StreakProvider({ children }: { children: ReactNode }) {
    const [streak, setStreak] = useState(0);
    const [pendingReward, setPendingReward] = useState<number | null>(null);

    const registerCorrect = useCallback(() => {
        setStreak((prev) => {
            const next = prev + 1;
            if (next > 0 && next % STREAK_REWARD_INTERVAL === 0) {
                setPendingReward(next);
            }
            return next;
        });
    }, []);

    const registerIncorrect = useCallback(() => {
        setStreak(0);
        setPendingReward(null);
    }, []);

    const dismissReward = useCallback(() => {
        setPendingReward(null);
    }, []);

    const resetStreak = useCallback(() => {
        setStreak(0);
        setPendingReward(null);
    }, []);

    return (
        <StreakContext.Provider
            value={{ streak, pendingReward, registerCorrect, registerIncorrect, dismissReward, resetStreak }}
        >
            {children}
        </StreakContext.Provider>
    );
}

export function useStreak() {
    const ctx = useContext(StreakContext);
    if (ctx === undefined) {
        throw new Error("useStreak must be used within a StreakProvider");
    }
    return ctx;
}

export function getStreakGradient(streak: number, defaultGradient: string): string {
    if (streak >= 10) {
        return "linear-gradient(180deg, #FFB23E 0%, #FF5722 100%)";
    }
    if (streak >= 5) {
        return "linear-gradient(180deg, #FFD86B 0%, #FFA726 100%)";
    }
    return defaultGradient;
}
