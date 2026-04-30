"use client";
import React from "react";
import { motion } from "framer-motion";
import { CourseTheme } from "@/types";
import { useStreak, getStreakGradient } from "@/context/StreakContext";

interface TaskProgressBarProps {
    progress?: number;
    segments?: {
        total: number;
        active: number;
    };
    className?: string;
    variant?: "exercise" | "step"; // "exercise" (thick/16px) vs "step" (thin/4px)
    courseTheme?: CourseTheme;
    streakAware?: boolean;
}

const DEFAULT_GRADIENT = "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)";

export function TaskProgressBar({
    progress,
    segments,
    className = "",
    variant = "exercise",
    courseTheme,
    streakAware = true,
}: TaskProgressBarProps) {
    const { streak } = useStreak();
    const value = segments
        ? (segments.active / segments.total) * 100
        : (progress ?? 0);

    const baseGradient = courseTheme?.gradient || DEFAULT_GRADIENT;
    const fillGradient = streakAware ? getStreakGradient(streak, baseGradient) : baseGradient;

    // Designing based on Figma:
    // - Step variant: 4px height (h-1), segmented with 10px gap
    if (variant === "step" && segments) {
        return (
            <div className={`w-full h-1 flex gap-[10px] items-center ${className}`}>
                {Array.from({ length: segments.total }).map((_, i) => (
                    <div
                        key={i}
                        className="h-full flex-1 rounded-full transition-all duration-500"
                        style={{
                            background: i < segments.active
                                ? fillGradient
                                : "#E2E8F0"
                        }}
                    />
                ))}
            </div>
        );
    }

    // Exercise variant: 16px height (h-4), continuous
    const heightClass = variant === "exercise" ? "h-4" : "h-1";

    return (
        <div className={`w-full ${heightClass} bg-[#E2E8F0] rounded-full overflow-hidden ${className}`}>
            <motion.div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                    width: `${value}%`,
                    background: fillGradient
                }}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
            />
        </div>
    );
}
