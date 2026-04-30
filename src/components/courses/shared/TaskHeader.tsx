"use client";
import React from "react";
import { X } from "lucide-react";
import { TaskProgressBar } from "./TaskProgressBar";
import { CourseTheme } from "@/types";

interface TaskHeaderProps {
    onClose?: () => void;
    progress?: number;
    segments?: {
        total: number;
        active: number;
    };
    maxWidth?: string;
    showStepCount?: boolean;
    variant?: "exercise" | "step";
    showProgressBar?: boolean;
    title?: string;
    courseTheme?: CourseTheme;
}

export function TaskHeader({
    onClose = () => { },
    progress,
    segments,
    maxWidth = "964px",
    showStepCount = false,
    variant = "exercise",
    showProgressBar = true,
    title,
    courseTheme,
}: TaskHeaderProps) {
    return (
        <div className="w-full flex justify-center pt-8 px-8 pb-6 items-center gap-[10px] z-30">
            <button
                onClick={onClose}
                className="text-[#64748B] hover:text-[#0F172A] transition-colors shrink-0"
            >
                <X size={24} strokeWidth={2} />
            </button>
            <div className={`w-full flex items-center gap-4`} style={{ maxWidth }}>
                {title ? (
                    <span className="text-[18px] font-bold text-[#0F172A] flex-1">
                        {title}
                    </span>
                ) : showProgressBar ? (
                    <TaskProgressBar
                        progress={progress}
                        segments={segments}
                        variant={variant}
                        className="flex-1"
                        courseTheme={courseTheme}
                    />
                ) : (
                    <div className="flex-1" />
                )}
                {showStepCount && segments && (
                    <span className="text-[17px] font-bold text-[#94A3B8] min-w-[50px] text-right">
                        {segments.active}/{segments.total}
                    </span>
                )}
            </div>
        </div>
    );
}
